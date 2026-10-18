import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(ROOT, "data/content/scqa-expansion.json")
d = json.load(open(p))
new = {
 "limteh-project": {
   "c": "Staff time was also the constraint on customer service, because the same people answered enquiries, prepared production files and chased artwork approvals, so a busy week in production became a slow week for customers.",
   "a": "The design also keeps a person on the ambiguous cases rather than on every case, which is what makes the throughput gain compatible with made-to-order accuracy at this volume."
 },
 "brew-interactive": {
   "c": "Producing a video was therefore a scheduling decision as much as a creative one, and the agency could not promise a client a fast test cycle when its supplier was busy with another account.",
   "a": "The stack is also the most completely disclosed in the set, which makes it the easiest implementation to replicate and the easiest to cost before committing budget."
 },
 "mclink-asia": {
   "c": "Response delay is expensive in social selling, because the first supplier to reply usually sets the shortlist, and a late answer is often no answer at all.",
   "a": "The architecture separates qualification, content and reporting so that each step can be evaluated, tuned and replaced without rebuilding the others, which is the practical advantage of splitting agents by role rather than deploying one general assistant across the whole function."
 },
}
for row in d["additions"]:
    if row["slug"] in new:
        row.update(new[row["slug"]])
json.dump(d, open(p, "w"), indent=2, ensure_ascii=False)
print("patched", ", ".join(new))
