import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();
    const source = String(body.source || 'research-updates').trim();
    const name = String(body.name || '').trim();
    const firmType = String(body.firmType || body.firm_type || '').trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    const isResearchUpdates = source === 'research-updates';
    const tag = isResearchUpdates
      ? 'sme-ai:research-updates'
      : source === 'playbook'
      ? 'sme-ai:playbook'
      : 'sme-ai:email-course';

    const subscriberRecord = {
      email,
      name,
      firmType,
      source,
      tag,
      segment: isResearchUpdates ? 'research-updates-only' : `${source}-subscribers`,
      // Strict rule: research-updates MUST NOT receive promotional emails
      allowPromotions: !isResearchUpdates,
      allowedTopics: isResearchUpdates
        ? ['grade-changes', 'corrections', 'edition-announcements']
        : ['all'],
      createdAt: new Date().toISOString(),
    };

    // 1. Record to local append-only subscriber ledger
    try {
      const logDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
      fs.appendFileSync(
        path.join(logDir, 'subscribers.jsonl'),
        JSON.stringify(subscriberRecord) + '\n',
        'utf8'
      );
    } catch (e) {
      console.error('Failed to append to local subscribers.jsonl', e);
    }

    // 2. Forward to email platform webhook or API if configured
    const webhookUrl = process.env.MAKE_WEBHOOK_EMAIL_ENCHARGE || process.env.MAKE_WEBHOOK_EMAIL_VBOUT;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscriberRecord),
        });
      } catch (err) {
        console.error('Webhook sync failed', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: isResearchUpdates
        ? 'Subscribed to research revisions and edition notifications.'
        : 'Subscribed successfully.',
      tag,
      segment: subscriberRecord.segment,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}
