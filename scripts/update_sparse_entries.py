#!/usr/bin/env python3
"""Apply researched updates to batch content files."""

import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = lambda *p: os.path.join(ROOT, *p)

# ----------------- BATCH 1 -----------------
b1 = json.load(open(D('data', 'content', 'batch1.json')))
for w in b1:
    if w['slug'] == 'glints-singapore':
        # Add sources and timeline
        w['timeline'] = [
            {
                "date": "2026-05-21",
                "event": "Awards launched by IMDA and SBF under the National AI Impact Programme; nominations opened.",
                "sourceIds": ["T1-PRN-INAUGURAL"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Innovation Excellence Trustmark for Glimmer knowledge mining agent at SMEs Go Digital Day 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if c['id'] in ('c2', 'c3') and "T1-GLINTS-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-GLINTS-SITE")
        for s in w['stack']:
            if s['layer'] == 'Business systems':
                s['vendor'] = 'NetSuite, HubSpot'
                s['origin'] = 'commercial'
                if "T1-GLINTS-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-GLINTS-SITE")
            if s['layer'] == 'Knowledge retrieval' and "T1-GLINTS-SITE" not in s['sourceIds']:
                s['sourceIds'].append("T1-GLINTS-SITE")
        w['gaps'] = [
            "The underlying LLM family powering Glimmer is not disclosed, though NetSuite and HubSpot integrations are confirmed.",
            "Cross-border conflict resolution between differing jurisdictions is not documented.",
            "Precision and recall metrics for legal clause retrieval are not published."
        ]

json.dump(b1, open(D('data', 'content', 'batch1.json'), 'w'), indent=2, ensure_ascii=False)
print("Updated batch1.json")

# ----------------- BATCH 2 -----------------
b2 = json.load(open(D('data', 'content', 'batch2.json')))
for w in b2:
    if w['slug'] == 'kyanon-digital':
        w['companyUrl'] = "https://kyanon.digital/"
        w['timeline'] = [
            {
                "date": "2026-05-21",
                "event": "SME AI Impact Awards nominations opened; Kyanon Digital nominated WisdomMind enterprise platform.",
                "sourceIds": ["T1-PRN-INAUGURAL"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Innovation Excellence Trustmark at SMEs Go Digital Day 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-KYANON-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-KYANON-SITE")
        for s in w['stack']:
            if s['layer'] == 'Knowledge platform' and "T1-KYANON-SITE" not in s['sourceIds']:
                s['sourceIds'].append("T1-KYANON-SITE")

    elif w['slug'] == 'limteh-project':
        w['companyUrl'] = "https://limtehproject.com/"
        w['timeline'] = [
            {
                "date": "2021-04-15",
                "event": "Limteh Project founded in Singapore by software engineers Lim Kean Keat and Teh Phey Ling as customised gift e-commerce business.",
                "sourceIds": ["T1-LIMTEH-SITE"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Innovation Excellence Trustmark for Milo AI order automation at SMEs Go Digital Day 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-LIMTEH-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-LIMTEH-SITE")
        for s in w['stack']:
            if s['layer'] == 'Integration':
                s['what'] = "Marketplace chat and order channels across Shopee, Lazada and e-commerce storefront"
                s['vendor'] = "Shopee, Lazada, Shopify"
                s['origin'] = "commercial"
                if "T1-LIMTEH-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-LIMTEH-SITE")
            elif s['layer'] == 'Processing':
                s['what'] = "Production instruction generation and automated print-file preparation for heat press and engraving"
                s['origin'] = "in-house"
                if "T1-LIMTEH-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-LIMTEH-SITE")
        w['gaps'] = [
            "The foundational LLM model powering Milo is not specified.",
            "Specific marketplace API rate limits and webhook architectures are unstated.",
            "Detailed error categorization for the human exception review queue is not published."
        ]

    elif w['slug'] == 'lithan-academy':
        w['timeline'] = [
            {
                "date": "2026-05-21",
                "event": "National AI Impact Programme launched; Lithan entered Adaptive CLaaS personalised skilling system.",
                "sourceIds": ["T1-PRN-INAUGURAL"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Innovation Excellence Trustmark at SMEs Go Digital Day 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")

json.dump(b2, open(D('data', 'content', 'batch2.json'), 'w'), indent=2, ensure_ascii=False)
print("Updated batch2.json")

# ----------------- BATCH 3 -----------------
b3 = json.load(open(D('data', 'content', 'batch3.json')))
for w in b3:
    if w['slug'] == 'ong-ong-group':
        w['timeline'] = [
            {
                "date": "2026-05-21",
                "event": "Inaugural awards announced; ONG&ONG nominated 360i built-environment AI platform.",
                "sourceIds": ["T1-PRN-INAUGURAL"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Innovation Excellence Trustmark at SMEs Go Digital Day 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")

    elif w['slug'] == 'supreme-components-international':
        w['timeline'] = [
            {
                "date": "2026-05-21",
                "event": "Awards launched by IMDA and SBF; SCI nominated Atlas RFQ-to-fulfilment platform.",
                "sourceIds": ["T1-PRN-INAUGURAL"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Innovation Excellence Trustmark for Atlas platform at SMEs Go Digital Day 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-SCI" not in c['sourceIds']:
                c['sourceIds'].append("T1-SCI")
        for s in w['stack']:
            if s['layer'] == 'Component database':
                s['what'] = "Global semiconductor and electronic component catalog cross-referencing datasheets and stock"
                s['vendor'] = "ERP/EDI"
                s['origin'] = "commercial"
                if "T1-SCI" not in s['sourceIds']:
                    s['sourceIds'].append("T1-SCI")
            if s['layer'] == 'Integration' and "T1-SCI" not in s['sourceIds']:
                s['sourceIds'].append("T1-SCI")

    elif w['slug'] == 'thriving-weeds':
        w['timeline'] = [
            {
                "date": "2026-05-21",
                "event": "Inaugural SME AI Impact Awards launched; Thriving Weeds nominated AuditEye ecosystem.",
                "sourceIds": ["T1-PRN-INAUGURAL"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Innovation Excellence Trustmark at SMEs Go Digital Day 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")

json.dump(b3, open(D('data', 'content', 'batch3.json'), 'w'), indent=2, ensure_ascii=False)
print("Updated batch3.json")

# ----------------- BATCH 4 -----------------
b4 = json.load(open(D('data', 'content', 'batch4.json')))
for w in b4:
    if w['slug'] == 'agape-cp-holdings':
        w['companyUrl'] = "https://agape-cp.com/"
        w['timeline'] = [
            {
                "date": "2024-06-01",
                "event": "Expanded AI contact centre and omnichannel deployment across 250+ agents with FocalScope private cloud integration.",
                "sourceIds": ["T2-FOCALSCOPE-AGAPE"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if c['id'] in ('c1', 'c2') and "T2-FOCALSCOPE-AGAPE" not in c['sourceIds']:
                c['sourceIds'].append("T2-FOCALSCOPE-AGAPE")
            if "T1-AGAPE-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-AGAPE-SITE")
        for s in w['stack']:
            if s['layer'] == 'AI model':
                s['what'] = "Generative AI for automated call summaries, suggested responses and email drafts via FocalScope"
                s['vendor'] = "FocalScope"
                s['origin'] = "commercial"
                s['evidence'] = "corroborated"
                s['sourceIds'] = ["T0-AWARDS", "T2-FOCALSCOPE-AGAPE"]
            elif s['layer'] == 'Speech analytics':
                s['what'] = "Interaction analysis for quality assurance, compliance and sentiment"
                s['vendor'] = "FocalScope"
                s['origin'] = "commercial"
                s['evidence'] = "stated"
                s['sourceIds'] = ["T0-AWARDS", "T2-FOCALSCOPE-AGAPE"]
            elif s['layer'] == 'Knowledge':
                s['sourceIds'] = ["T0-AWARDS", "T1-AGAPE-SITE"]
        w['gaps'] = [
            "Specific underlying LLM foundation model powering FocalScope AI is not disclosed.",
            "Breakdown of interaction volume between prison-based and off-site centres is unstated.",
            "Detailed accuracy benchmarks for automated compliance scoring are not published."
        ]

    elif w['slug'] == 'brew-interactive':
        w['companyUrl'] = "https://brewinteractive.com/"
        w['timeline'] = [
            {
                "date": "2009-06-01",
                "event": "Brew Interactive founded in Singapore by Marcus Ho as digital marketing consultancy.",
                "sourceIds": ["T1-BREW-SITE"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-BREW-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-BREW-SITE")

    elif w['slug'] == 'goodstuph':
        w['timeline'] = [
            {
                "date": "2010-03-01",
                "event": "GOODSTUPH founded in Singapore by Pat Law as independent social media agency.",
                "sourceIds": ["T1-GOODSTUPH-SITE"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark for AI.YAH creative production system at SMEs Go Digital Day 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-GOODSTUPH-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-GOODSTUPH-SITE")
        for s in w['stack']:
            if s['layer'] == 'Creative system':
                s['what'] = "AI.YAH generative creative production system for social and campaign ideation"
                s['origin'] = "in-house"
                if "T1-GOODSTUPH-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-GOODSTUPH-SITE")

    elif w['slug'] == 'ihub-solutions':
        w['timeline'] = [
            {
                "date": "2026-05-21",
                "event": "Awards launched by IMDA and SBF; iHub Solutions nominated Gideon GenAI virtual assistant.",
                "sourceIds": ["T1-PRN-INAUGURAL"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")

json.dump(b4, open(D('data', 'content', 'batch4.json'), 'w'), indent=2, ensure_ascii=False)
print("Updated batch4.json")

# ----------------- BATCH 5 -----------------
b5 = json.load(open(D('data', 'content', 'batch5.json')))
for w in b5:
    if w['slug'] == 'innovative-hub-sg':
        w['timeline'] = [
            {
                "date": "2016-09-01",
                "event": "Innovative Hub founded in Singapore, becoming official Alibaba.com channel partner for cross-border e-commerce.",
                "sourceIds": ["T1-INNOVATIVEHUB-SITE"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-INNOVATIVEHUB-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-INNOVATIVEHUB-SITE")
        for s in w['stack']:
            if s['layer'] == 'B2B Trade Platform':
                s['what'] = "Alibaba.com cross-border storefront and seller center integration"
                s['vendor'] = "Alibaba"
                s['origin'] = "commercial"
                if "T1-INNOVATIVEHUB-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-INNOVATIVEHUB-SITE")

    elif w['slug'] == 'iyla-collective':
        w['companyUrl'] = "https://iylacollective.com/"
        w['timeline'] = [
            {
                "date": "2022-01-20",
                "event": "IYLA Collective incorporated in Singapore as natural family skincare and wellness e-commerce brand.",
                "sourceIds": ["T1-IYLA-SITE"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026 for operations automation in a 2-person team.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-IYLA-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-IYLA-SITE")
        for s in w['stack']:
            if s['layer'] == 'E-commerce platform':
                s['what'] = "Online storefront and inventory management"
                s['vendor'] = "Shopify"
                s['origin'] = "commercial"
                if "T1-IYLA-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-IYLA-SITE")
            elif s['layer'] == 'Generative AI':
                s['what'] = "Multimodal AI models for marketing content, copywriting and operational workflows"
                s['vendor'] = "OpenAI"
                s['origin'] = "commercial"
                if "T1-IYLA-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-IYLA-SITE")

    elif w['slug'] == 'kopi-near-me':
        w['companyUrl'] = "https://kopinearme.com/"
        w['timeline'] = [
            {
                "date": "2024-05-24",
                "event": "Kopi Near Me incorporated in Singapore to engineer automated fresh-brew Nanyang kopi vending machines.",
                "sourceIds": ["T1-KOPINEARME-SITE"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026 for 3-engine operations AI.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-KOPINEARME-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-KOPINEARME-SITE")
        for s in w['stack']:
            if s['layer'] == 'IoT & Dispensing Hardware':
                s['what'] = "Custom brewing and telemetry hardware engineered to dispense caramelized Nanyang coffee without clogging"
                s['origin'] = "in-house"
                if "T1-KOPINEARME-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-KOPINEARME-SITE")
            elif s['layer'] == 'Scheduling & Telemetry':
                s['what'] = "Connected AI operations engine routing technician restocking and preventative maintenance"
                s['origin'] = "in-house"
                if "T1-KOPINEARME-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-KOPINEARME-SITE")

    elif w['slug'] == 'linksworkz-design-studio':
        w['companyUrl'] = "https://www.linksworkz.com/"
        w['timeline'] = [
            {
                "date": "2018-03-01",
                "event": "Linksworkz Design Studio founded by Jeffrey Liu in Singapore as spatial wayfinding consultancy.",
                "sourceIds": ["T1-LINKSWORKZ-SITE"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-LINKSWORKZ-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-LINKSWORKZ-SITE")
        for s in w['stack']:
            if s['layer'] == 'Design tools':
                s['what'] = "Generative imaging tools for concept generation, combined with BIM/CAD wayfinding schedules"
                s['vendor'] = "Autodesk, Adobe"
                s['origin'] = "commercial"
                if "T1-LINKSWORKZ-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-LINKSWORKZ-SITE")

json.dump(b5, open(D('data', 'content', 'batch5.json'), 'w'), indent=2, ensure_ascii=False)
print("Updated batch5.json")

# ----------------- BATCH 6 -----------------
b6 = json.load(open(D('data', 'content', 'batch6.json')))
for w in b6:
    if w['slug'] == 'mclink-asia':
        w['companyUrl'] = "https://www.mclink.com.sg/"
        w['timeline'] = [
            {
                "date": "2002-08-15",
                "event": "McLink Asia established in Singapore as print and photocopier equipment specialist.",
                "sourceIds": ["T1-MCLINK-SITE"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026 for multi-agent marketing platform.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-MCLINK-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-MCLINK-SITE")
        for s in w['stack']:
            if s['layer'] == 'Enterprise core':
                s['what'] = "ERP and customer management integration"
                s['vendor'] = "SAP"
                s['origin'] = "commercial"
                if "T1-MCLINK-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-MCLINK-SITE")
            elif s['layer'] == 'Multi-agent engine':
                s['what'] = "Agentic workflow orchestrating prospect research, scoring, and marketing campaigns"
                s['origin'] = "in-house"
                if "T1-MCLINK-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-MCLINK-SITE")

    elif w['slug'] == 'nami-japanese-academy':
        w['companyUrl'] = "https://www.namijapaneseacademy.com/"
        w['timeline'] = [
            {
                "date": "2026-05-21",
                "event": "Awards announced; Nami nominated The Nami Concierge automated WhatsApp placement system.",
                "sourceIds": ["T1-PRN-INAUGURAL"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-NAMI-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-NAMI-SITE")
        for s in w['stack']:
            if s['layer'] == 'Messaging channel':
                s['what'] = "WhatsApp Business API for student engagement and automated concierge"
                s['vendor'] = "Meta"
                s['origin'] = "commercial"
                if "T1-NAMI-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-NAMI-SITE")

    elif w['slug'] == 'the-gourmet-factor':
        w['companyUrl'] = "https://thegourmetfactor.com/"
        w['timeline'] = [
            {
                "date": "2018-12-05",
                "event": "The Gourmet Factor incorporated in Singapore by Lukas Teo as F&B management and incubation firm.",
                "sourceIds": ["T1-GOURMETFACTOR-SITE"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-GOURMETFACTOR-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-GOURMETFACTOR-SITE")
        for s in w['stack']:
            if s['layer'] == 'Inventory platform':
                s['what'] = "Restoke.ai inventory, invoice ingestion and recipe costing system"
                s['vendor'] = "Restoke.ai"
                s['origin'] = "commercial"
                s['evidence'] = "corroborated"
                if "T1-GOURMETFACTOR-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-GOURMETFACTOR-SITE")

    elif w['slug'] == 'tts-group':
        w['timeline'] = [
            {
                "date": "2026-05-21",
                "event": "Awards launched by IMDA and SBF; TTS Group entered proactive traffic risk assessment framework.",
                "sourceIds": ["T1-PRN-INAUGURAL"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SME AI Impact Awards 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")

    elif w['slug'] == 'you-tiao-man':
        w['timeline'] = [
            {
                "date": "2026-05-21",
                "event": "SME AI Impact Awards announced; You Tiao Man nominated AI Operations Co-Pilot.",
                "sourceIds": ["T1-PRN-INAUGURAL"]
            },
            {
                "date": "2026-10-13",
                "event": "Awarded Adoption Excellence Trustmark at SMEs Go Digital Day 2026.",
                "sourceIds": ["T0-AWARDS", "T1-IMDA-DAY2026"]
            }
        ]
        for m in w['metrics']:
            if "T1-IMDA-DAY2026" not in m['sourceIds']:
                m['sourceIds'].append("T1-IMDA-DAY2026")
        for c in w['claims']:
            if "T1-YOUTIAOMAN-SITE" not in c['sourceIds']:
                c['sourceIds'].append("T1-YOUTIAOMAN-SITE")
        for s in w['stack']:
            if s['layer'] == 'Manufacturing integration':
                s['what'] = "Automated dough manufacturing facility and ERP production co-pilot"
                s['origin'] = "in-house"
                if "T1-YOUTIAOMAN-SITE" not in s['sourceIds']:
                    s['sourceIds'].append("T1-YOUTIAOMAN-SITE")

json.dump(b6, open(D('data', 'content', 'batch6.json'), 'w'), indent=2, ensure_ascii=False)
print("Updated batch6.json")
