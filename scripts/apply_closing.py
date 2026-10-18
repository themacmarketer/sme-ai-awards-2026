import json, glob, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
patch = json.load(open(os.path.join(ROOT,"data/content/scqa-closing.json")))["additions"]
add = {p["slug"]: p["a"] for p in patch}
n=0
for f in sorted(glob.glob(os.path.join(ROOT,"data/content/batch*.json"))):
    rows=json.load(open(f)); changed=False
    for r in rows:
        extra=add.get(r["slug"])
        if not extra or extra in r["scqa"]["a"]: continue
        r["scqa"]["a"]=r["scqa"]["a"].rstrip()+" "+extra; n+=1; changed=True
    if changed: json.dump(rows, open(f,"w"), indent=2, ensure_ascii=False)
print("appended", n)
