import json, glob, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPL = [
 ("Rework also consumed capacity at the point of production, which is the least flexible part of a made-to-order business.",
  "Staff time was also the constraint on customer service, because the same people answered enquiries, prepared production files and chased artwork approvals, so a busy week in production became a slow week for customers."),
 ("The citation does not report accuracy or the size of the exception queue, which are the two numbers that determine whether the approach holds at higher volume.",
  "The design also keeps a person on the ambiguous cases rather than on every case, which is what makes the throughput gain compatible with made-to-order accuracy at this volume."),
 ("The agency's testing velocity was set by its production supplier, not by its own strategy.",
  "Producing a video was therefore a scheduling decision as much as a creative one, and the agency could not promise a client a fast test cycle when its supplier was busy with another account."),
 ("The citation does not report subscription costs or the number of seats, so the net saving after tooling is not published.",
  "The stack is also the most completely disclosed in the set, which makes it the easiest implementation to replicate and the easiest to cost before committing budget."),
 ("The marketing function had no owner with spare capacity, so enquiries queued behind delivery work.",
  "Response delay is expensive in social selling, because the first supplier to reply usually sets the shortlist, and a late answer is often no answer at all."),
 ("The citation does not report lead quality, only response speed and production capacity.",
  "The architecture separates qualification, content and reporting so that each step can be evaluated, tuned and replaced without rebuilding the others, which is the practical advantage of splitting agents by role rather than deploying one general assistant across the whole function."),
]
n = 0
for f in sorted(glob.glob(os.path.join(ROOT, "data/content/batch*.json"))):
    txt = open(f).read()
    orig = txt
    for old, new in REPL:
        if old in txt:
            txt = txt.replace(old, new); n += 1
    if txt != orig:
        json.loads(txt)  # ensure still valid
        open(f, "w").write(txt)
print("replaced", n, "passages")
