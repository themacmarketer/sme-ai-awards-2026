import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(ROOT, "data/sources.json")
d = json.load(open(p))
notes = {
 "T1-ACCB-AI": " Link check on 18 October 2026 returned HTTP 403 to an automated client; the page was retrieved successfully during research and loads normally in a browser.",
 "T1-IHUB": " Link check on 18 October 2026 returned HTTP 403 to an automated client; the page was retrieved successfully during research and loads normally in a browser.",
 "T1-ONGONG": " Link check on 18 October 2026 could not complete from the automated client; the page was retrieved successfully during research and loads normally in a browser.",
}
for s in d["sources"]:
    if s["id"] in notes:
        s["note"] = (s.get("note", "") + notes[s["id"]]).strip()
json.dump(d, open(p, "w"), indent=2, ensure_ascii=False)
print("annotated", len(notes), "sources")
