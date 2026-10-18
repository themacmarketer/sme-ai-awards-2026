"""Homepage screenshot capture.

Captures the public homepage of each winner with a company URL, at a fixed desktop viewport.
Writes PNG files to public/shots and a manifest to data/screenshots.json.

Usage: python3 scripts/capture_shots.py [--limit N]
"""

import json, os, subprocess, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AB = os.path.expanduser(
    "~/.workbuddy-ai/binaries/node/workspace/node_modules/agent-browser/bin/agent-browser-darwin-arm64"
)
OUT = os.path.join(ROOT, "public", "shots")
MANIFEST = os.path.join(ROOT, "data", "screenshots.json")
CAPTURED = "2026-10-18"

winners = json.load(open(os.path.join(ROOT, "data", "winners.json")))["winners"]
targets = [w for w in winners if w.get("companyUrl")]
limit = None
if "--limit" in sys.argv:
    limit = int(sys.argv[sys.argv.index("--limit") + 1])
    targets = targets[:limit]


def run(*args, timeout=90):
    return subprocess.run([AB, *args], capture_output=True, text=True, timeout=timeout)


run("set", "viewport", "1280", "800")
run("set", "media", "light")

results = []
if os.path.exists(MANIFEST):
    results = json.load(open(MANIFEST)).get("screenshots", [])
done = {r["slug"] for r in results if r.get("status") == "captured"}

for i, w in enumerate(targets, 1):
    slug, url = w["slug"], w["companyUrl"]
    path = os.path.join(OUT, f"{slug}.png")
    if slug in done:
        print(f"[{i}/{len(targets)}] skip {slug}")
        continue
    entry = {"slug": slug, "name": w["name"], "url": url, "capturedAt": CAPTURED}
    try:
        run("open", url, timeout=60)
        time.sleep(3)
        title = run("eval", "document.title").stdout.strip()[:200]
        body_len = run("eval", "document.body.innerText.length").stdout.strip()[:12]
        shot = run("screenshot", path, timeout=60)
        if "Screenshot saved" not in shot.stdout or not os.path.exists(path):
            entry.update(status="failed", detail=shot.stdout[-160:] or shot.stderr[-160:])
        else:
            entry.update(status="captured", title=title, bodyLength=body_len)
    except subprocess.TimeoutExpired:
        entry.update(status="timeout")
    except Exception as e:
        entry.update(status="error", detail=str(e)[:160])
    results = [r for r in results if r["slug"] != slug] + [entry]
    json.dump({"capturedAt": CAPTURED, "screenshots": results}, open(MANIFEST, "w"), indent=2)
    print(f"[{i}/{len(targets)}] {entry['status']:9} {slug}")

run("close")
ok = sum(1 for r in results if r.get("status") == "captured")
print(f"\n{ok} captured of {len(targets)} attempted")
