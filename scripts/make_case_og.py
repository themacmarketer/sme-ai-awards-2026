"""Generate a 1200x630 Open Graph card for every case study.

Each card carries the company, sector, category, headline, principal metric and evidence grade,
so a shared link shows something specific rather than one generic image.
"""

import json, os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "og")
os.makedirs(OUT, exist_ok=True)

W, H = 1200, 630
PAPER = (251, 250, 247)
INK = (20, 20, 19)
MUTED = (107, 104, 98)
RULE = (222, 218, 210)
ACCENT = (31, 75, 67)
SLATE = (43, 58, 66)

SERIF = "/System/Library/Fonts/Supplemental/Georgia.ttf"
SERIF_B = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"
MONO = "/System/Library/Fonts/Supplemental/Courier New.ttf"


def font(path, size):
    for p in (path, SANS):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def wrap(draw, text, f, max_width, max_lines):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=f) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
            if len(lines) == max_lines:
                break
    if cur and len(lines) < max_lines:
        lines.append(cur)
    if len(lines) == max_lines:
        rest = words[len(" ".join(lines).split()):]
        if rest:
            lines[-1] = lines[-1].rstrip(",.;:") + "…"
    return lines


winners = json.load(open(os.path.join(ROOT, "data", "winners.json")))["winners"]

for w in winners:
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    d.rectangle([0, 0, W, 10], fill=INK)

    f_kick = font(MONO, 19)
    f_name = font(SERIF_B, 62)
    f_head = font(SANS, 27)
    f_metric = font(SERIF_B, 52)
    f_label = font(MONO, 17)
    f_small = font(SANS, 18)

    cat = "Innovation Excellence" if w["category"] == "innovation" else "Adoption Excellence"
    kicker = f"{cat.upper()}  ·  {w['sector'].upper()}"
    d.text((72, 62), kicker[:70], font=f_kick, fill=ACCENT)

    name = w["name"]
    size = 62
    while d.textlength(name, font=font(SERIF_B, size)) > W - 144 and size > 34:
        size -= 4
    d.text((72, 104), name, font=font(SERIF_B, size), fill=INK)

    y = 104 + size + 26
    for line in wrap(d, w["headline"], f_head, W - 150, 3):
        d.text((72, y), line, font=f_head, fill=(60, 58, 54))
        y += 38

    d.line([(72, H - 176), (W - 72, H - 176)], fill=RULE, width=2)

    m = w["metrics"][0]
    d.text((72, H - 152), m["label"].upper()[:44], font=f_label, fill=MUTED)
    mv = m["value"]
    msize = 52
    while d.textlength(mv, font=font(SERIF_B, msize)) > W - 460 and msize > 26:
        msize -= 2
    d.text((72, H - 128), mv, font=font(SERIF_B, msize), fill=ACCENT)

    d.text((W - 300, H - 132), f"EVIDENCE GRADE {w['confidence']}", font=f_label, fill=SLATE)
    d.text((W - 300, H - 108), f"{w['coverage']}% research coverage", font=f_small, fill=MUTED)

    d.text((72, H - 56), "SME AI Impact Awards 2026  ·  IMDA & SBF  ·  independent case study",
           font=f_small, fill=MUTED)

    img.save(os.path.join(OUT, f"{w['slug']}.png"), optimize=True)

print(f"wrote {len(winners)} cards to public/og")
