#!/usr/bin/env python3
"""Merge canonical award data, authored case-study content and the source registry
into data/winners.json. Coverage scores are computed mechanically from the record."""

import json, glob, os, sys, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = lambda *p: os.path.join(ROOT, *p)

raw = json.load(open(D("data", "winners-raw.json")))
registry = {s["id"]: s for s in json.load(open(D("data", "sources.json")))["sources"]}

# Sources published by a party other than the winning company.
INDEPENDENT = {
    "T1-PRN-INAUGURAL", "T1-BT-LAUNCH", "T1-SFA-BLUEAQUA", "T2-GETGO-ZENDESK",
    "T3-GREENPHYTO-BLOOMBERG", "T3-1DOC-GSD", "T3-OCEANUS-SBR",
    "T3-KYANON-ANDERSEN", "T3-MENCAST-EDB", "T1-IMDA-DAY2026", "T2-FOCALSCOPE-AGAPE",
}

content = {}
for f in sorted(glob.glob(D("data", "content", "batch*.json"))):
    for rec in json.load(open(f)):
        if rec["idx"] in content:
            sys.exit(f"Duplicate content for index {rec['idx']} in {f}")
        content[rec["idx"]] = rec

missing = [i for i in range(len(raw["winners"])) if i not in content]
if missing:
    sys.exit(f"Missing authored content for canonical indexes: {missing}")

RESEARCHED = "2026-10-18T19:40:00+08:00"
EXTRACTED = raw["provenance"]["extractionTimestampSGT"]

winners = []
for w in raw["winners"]:
    idx = w["canonicalIndex"]
    c = content[idx]
    refs = set(["T0-AWARDS"])

    metrics = c["metrics"]
    for m in metrics:
        refs.update(m["sourceIds"])
    for cl in c["claims"]:
        refs.update(cl["sourceIds"])
    for st in c["stack"]:
        refs.update(st["sourceIds"])
    for t in c["timeline"]:
        refs.update(t["sourceIds"])

    unknown = refs - set(registry)
    if unknown:
        sys.exit(f"{c['slug']}: unknown source ids {unknown}")

    sources = []
    for sid in sorted(refs):
        s = dict(registry[sid])
        sources.append(s)

    # --- research coverage, 10 dimensions, computed from the record ---
    dims = {}
    dims["Company and industry context"] = 1 if len(w["companyProfile"]) > 40 else 0.5
    nch = len(w["keyChallenges"])
    dims["Business challenges"] = 1 if nch >= 3 else (0.5 if nch >= 1 else 0)
    dims["Named AI solution"] = 1 if w["aiSolution"]["name"] else 0
    nco = len(w["aiSolution"]["components"])
    dims["Solution components"] = 1 if nco >= 3 else (0.5 if nco >= 1 else 0)
    dims["Named technology vendors"] = 1 if any(s.get("vendor") for s in c["stack"]) else 0.5
    nn = len(c["documentedWorkflow"]["nodes"])
    dims["Documented workflow"] = 1 if nn >= 5 else (0.5 if nn >= 2 else 0)
    dims["Quantified outcomes"] = 1 if len(metrics) >= 3 else 0.5
    if refs & INDEPENDENT:
        dims["Independent corroboration"] = 1
    elif refs - {"T0-AWARDS"}:
        dims["Independent corroboration"] = 0.5
    else:
        dims["Independent corroboration"] = 0
    gov = [s for s in c["stack"] if s["layer"].lower() == "governance"]
    if gov and not gov[0]["what"].lower().startswith("not described"):
        dims["Governance and controls"] = 1
    elif gov:
        dims["Governance and controls"] = 0.5
    else:
        dims["Governance and controls"] = 0
    dims["Implementation timeline"] = 1 if len(c["timeline"]) >= 2 else 0.5

    coverage = round(sum(dims.values()) / len(dims) * 100)

    winners.append({
        "slug": c["slug"],
        "name": w["companyName"],
        "sector": w["sector"],
        "category": w["category"],
        **({"companyUrl": c["companyUrl"]} if c.get("companyUrl") else {}),
        "headline": c["headline"],
        "useCase": c["useCase"],
        "aiType": c["aiType"],
        "outcomes": c["outcomes"],
        "officialProfile": w["companyProfile"],
        "officialChallenges": [f"{x['title']}. {x['description']}" for x in w["keyChallenges"]],
        "officialSolution": w["aiSolution"]["name"],
        "officialComponents": [f"{x['title']}: {x['description']}" for x in w["aiSolution"]["components"]],
        "metrics": metrics,
        "scqa": c["scqa"],
        "takeaway": c["takeaway"],
        "claims": c["claims"],
        "stack": c["stack"],
        "timeline": c["timeline"],
        "documentedWorkflow": c["documentedWorkflow"],
        "illustrativeWorkflow": c["illustrativeWorkflow"],
        **({"inference": c["inference"]} if c.get("inference") else {}),
        "replication": c["replication"],
        "sources": sources,
        "gaps": c["gaps"],
        "confidence": c["confidence"],
        "coverage": coverage,
        "coverageDimensions": dims,
        "researchedAt": RESEARCHED,
        "updatedAt": RESEARCHED,
    })

slugs = [x["slug"] for x in winners]
dupes = [s for s, n in collections.Counter(slugs).items() if n > 1]
if dupes:
    sys.exit(f"Duplicate slugs: {dupes}")

count = lambda key: dict(sorted(collections.Counter(
    v for x in winners for v in ([x[key]] if isinstance(x[key], str) else x[key])
).items(), key=lambda kv: (-kv[1], kv[0])))

# Attach verified homepage screenshots (captured and classified separately).
shots_path = D("data", "screenshots.json")
if os.path.exists(shots_path):
    shots = {r["slug"]: r for r in json.load(open(shots_path))["screenshots"]}
    for x in winners:
        r = shots.get(x["slug"])
        if r and r.get("status") == "captured" and r.get("src"):
            x["screenshot"] = {
                "src": r["src"],
                "capturedAt": r["capturedAt"],
                "sourceUrl": r["url"],
            }

meta = {
    "title": "Singapore SME AI Impact Showcase",
    "tagline": "30 Singapore SMEs. Real AI implementations. Measurable business outcomes.",
    "canonicalSource": "https://smesgodigital.gov.sg/web/sme-ai-awards",
    "extractedAt": EXTRACTED,
    "researchedAt": RESEARCHED,
    "totalWinners": len(winners),
    "categories": [
        {"key": "innovation", "label": "Innovation Excellence", "count": sum(1 for x in winners if x["category"] == "innovation")},
        {"key": "adoption", "label": "Adoption Excellence", "count": sum(1 for x in winners if x["category"] == "adoption")},
    ],
    "evidenceGrades": count("confidence"),
    "sectors": count("sector"),
    "useCases": count("useCase"),
    "aiTypes": count("aiType"),
    "outcomes": count("outcomes"),
    "averageCoverage": round(sum(x["coverage"] for x in winners) / len(winners)),
}

json.dump({"meta": meta, "winners": winners}, open(D("data", "winners.json"), "w"),
          indent=2, ensure_ascii=False)

print(f"Wrote data/winners.json — {len(winners)} winners")
print("grades:", meta["evidenceGrades"])
print("categories:", [(c["key"], c["count"]) for c in meta["categories"]])
print("average coverage:", meta["averageCoverage"])
print("coverage range:", min(x["coverage"] for x in winners), "-", max(x["coverage"] for x in winners))
print("total sources referenced:", len({s["id"] for x in winners for s in x["sources"]}))
