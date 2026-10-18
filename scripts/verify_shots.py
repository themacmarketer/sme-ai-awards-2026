"""Verify captured screenshots and convert usable ones to JPEG.

Re-opens each company homepage, waits for client-side rendering, and classifies the page.
Pages that show a bot challenge or a network error are rejected, retried once, and then
marked as failed rather than shipped. Only verified captures are converted to JPEG.

Outputs: public/shots/<slug>.jpg, data/screenshots.json
"""

import json, os, subprocess, time

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AB = os.path.expanduser(
    "~/.workbuddy-ai/binaries/node/workspace/node_modules/agent-browser/bin/agent-browser-darwin-arm64"
)
SHOTS = os.path.join(ROOT, "public", "shots")
MANIFEST = os.path.join(ROOT, "data", "screenshots.json")

BLOCK_SIGNS = [
    "performing security verification",
    "just a moment",
    "attention required",
    "access denied",
    "can't be reached",
    "err_tunnel",
    "err_connection",
    "err_name_not_resolved",
    "403 forbidden",
    "404 not found",
    "this site can",
    "verify you are human",
    "enable javascript and cookies to continue",
]


def run(*args, timeout=60):
    return subprocess.run([AB, *args], capture_output=True, text=True, timeout=timeout)


def probe(url):
    run("open", url, timeout=60)
    time.sleep(4)
    text = run("eval", "document.body.innerText.slice(0,4000)").stdout.lower()
    title = run("eval", "document.title").stdout.strip()
    length = run("eval", "document.body.innerText.length").stdout.strip()
    return text, title, length


run("set", "viewport", "1280", "800")
run("set", "media", "light")

data = json.load(open(MANIFEST))
results = []

for entry in data["screenshots"]:
    slug, url = entry["slug"], entry["url"]
    png = os.path.join(SHOTS, f"{slug}.png")
    jpg = os.path.join(SHOTS, f"{slug}.jpg")
    verdict, detail = "unknown", ""

    for attempt in (1, 2):
        try:
            text, title, length = probe(url)
        except subprocess.TimeoutExpired:
            verdict, detail = "timeout", "navigation timeout"
            continue
        hit = next((s for s in BLOCK_SIGNS if s in text), None)
        try:
            n = int(length.strip('"'))
        except Exception:
            n = 0
        if hit:
            verdict, detail = "blocked", f"page shows: {hit}"
            time.sleep(5)
            continue
        if n < 200:
            verdict, detail = "empty", f"body text length {n}"
            time.sleep(3)
            continue
        verdict, detail = "ok", f"{n} chars, title: {title[:60]}"
        break

    if verdict == "ok" and os.path.exists(png):
        im = Image.open(png).convert("RGB")
        im.save(jpg, "JPEG", quality=82, optimize=True, progressive=True)
        entry.update(status="captured", src=f"/shots/{slug}.jpg", verdict=verdict, detail=detail)
    else:
        entry.update(status="rejected", verdict=verdict, detail=detail)
        entry.pop("src", None)

    results.append(entry)
    print(f"{verdict:9} {slug:38} {detail[:70]}")

run("close")

data["screenshots"] = results
json.dump(data, open(MANIFEST, "w"), indent=2)

ok = sum(1 for r in results if r["status"] == "captured")
print(f"\n{ok} usable of {len(results)}. Rejected: {[r['slug'] for r in results if r['status'] != 'captured']}")
