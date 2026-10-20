import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.companyName || !body.submitterEmail || !body.solutionName) {
      return NextResponse.json(
        { error: 'Missing required fields: companyName, submitterEmail, solutionName' },
        { status: 400 }
      );
    }

    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const submissionRecord = {
      id: submissionId,
      submittedAt: new Date().toISOString(),
      status: 'pending_review',
      data: body,
    };

    // Store submission in local data directory
    const submissionsPath = path.join(process.cwd(), 'data', 'submissions.json');
    let existing: unknown[] = [];
    try {
      const content = await fs.readFile(submissionsPath, 'utf-8');
      existing = JSON.parse(content);
    } catch {
      existing = [];
    }

    existing.push(submissionRecord);
    await fs.writeFile(submissionsPath, JSON.stringify(existing, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      submissionId,
      message: 'Self-audit and case submission received. Our research team will review the documentation against our 10-dimension rubric.',
    });
  } catch (err) {
    console.error('Submission intake error:', err);
    return NextResponse.json(
      { error: 'Failed to record submission' },
      { status: 500 }
    );
  }
}
