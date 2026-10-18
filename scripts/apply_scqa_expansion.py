import json, glob, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
patch = json.load(open(os.path.join(ROOT, "data/content/scqa-expansion.json")))["additions"]
add = {p["slug"]: p for p in patch}
applied = skipped = 0
for f in sorted(glob.glob(os.path.join(ROOT, "data/content/batch*.json"))):
    rows = json.load(open(f))
    changed = False
    for r in rows:
        p = add.get(r["slug"])
        if not p:
            continue
        for key in ("c", "a"):
            extra = p.get(key)
            if not extra:
                continue
            if extra in r["scqa"][key]:
                skipped += 1
                continue
            r["scqa"][key] = r["scqa"][key].rstrip() + " " + extra
            applied += 1
            changed = True
    if changed:
        json.dump(rows, open(f, "w"), indent=2, ensure_ascii=False)
print(f"applied {applied} additions, skipped {skipped} already present")
