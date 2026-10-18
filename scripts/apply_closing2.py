import json, glob, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
add = {
 "lithan-academy": "Completion and pass rates would show whether faster production improved learning or merely accelerated it.",
 "supreme-components-international": "Only then does the time saving translate into margin rather than into spare capacity.",
 "catalyst-performance": "A second quarter of data would show whether the gains hold once the novelty of the rebuild fades.",
 "ihub-solutions": "The saving recurs monthly, which is what makes it worth engineering rather than buying as a one-off.",
 "innovative-hub-sg": "The ordering matters more than the tools chosen, because a check after the draft is what makes speed safe.",
 "iyla-collective": "The labour saving is recurring, while the content gain depends on how much the marketplaces will absorb.",
 "kopi-near-me": "Uptime and stock-out rates would be the next figures to publish, because they show whether availability improved.",
 "lil-but-mighty-education-centre": "Whether parents noticed the change, and whether it helped, is the measure the citation leaves out.",
 "nami-japanese-academy": "Messages handled per administrator is the figure to watch next, because it caps how far the model scales.",
 "you-tiao-man": "Volume is the real test, because the workflow has to hold when invoice count doubles.",
}
n=0
for f in sorted(glob.glob(os.path.join(ROOT,"data/content/batch*.json"))):
    rows=json.load(open(f)); changed=False
    for r in rows:
        extra=add.get(r["slug"])
        if not extra or extra in r["scqa"]["a"]: continue
        r["scqa"]["a"]=r["scqa"]["a"].rstrip()+" "+extra; n+=1; changed=True
    if changed: json.dump(rows, open(f,"w"), indent=2, ensure_ascii=False)
print("appended", n)
