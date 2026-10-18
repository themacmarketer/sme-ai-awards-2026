from PIL import Image, ImageDraw, ImageFont
import os
W, H = 1200, 630
PAPER = (251, 250, 247); INK = (20, 20, 19); MUTED = (107, 104, 98)
ACCENT = (31, 75, 67); RULE = (222, 218, 210)
img = Image.new("RGB", (W, H), PAPER)
d = ImageDraw.Draw(img)
def font(paths, size):
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()
serif = ["/System/Library/Fonts/Supplemental/Georgia.ttf",
         "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
         "/System/Library/Fonts/Supplemental/Palatino.ttc"]
sans = ["/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc"]
mono = ["/System/Library/Fonts/Supplemental/Courier New.ttf"]
f_kicker = font(mono, 20); f_h1 = font(serif, 78); f_h2 = font(serif, 78)
f_body = font(sans, 25); f_stat = font(serif, 54); f_label = font(mono, 18)
d.rectangle([0,0,W,10], fill=INK)
d.text((72, 66), "SME AI IMPACT AWARDS 2026  ·  IMDA & SBF", font=f_kicker, fill=ACCENT)
d.text((72, 118), "Singapore SME", font=f_h1, fill=INK)
d.text((72, 200), "AI Impact Showcase", font=f_h2, fill=INK)
d.text((72, 320), "30 winners. Real implementations.", font=f_body, fill=(60,58,54))
d.text((72, 356), "Evidence-graded case studies, technology stacks", font=f_body, fill=MUTED)
d.text((72, 390), "and replication guidance for other SMEs.", font=f_body, fill=MUTED)
d.line([(72, 462), (W-72, 462)], fill=RULE, width=2)
stats = [("30","WINNERS"),("15 / 15","INNOVATION / ADOPTION"),("84%","AVG. COVERAGE")]
x = 72
for val, lab in stats:
    d.text((x, 492), val, font=f_stat, fill=INK)
    d.text((x, 556), lab, font=f_label, fill=MUTED)
    x += 360
img.save("public/og.png", optimize=True)
print("wrote public/og.png", img.size)
