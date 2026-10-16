"""Avatar pipeline: sample profile.png (AI pixel art, ~20px blocks, slightly irregular grid) into an art-pixel grid.

Writes src/scripts/avatar.json ({w, h, palette: [hex...], data: "<one char per cell, '.' = empty>"}),
used by the particle avatar, plus public/favicon.ico and public/apple-touch-icon.png (nearest-neighbor).
Usage, from the repo root: python3 -I scripts/avatar.py [src/assets/profile.png]   (needs Pillow)
"""
import json, sys, os
from collections import Counter
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else 'src/assets/profile.png'
im = Image.open(SRC).convert("RGBA")
px = im.load()
W, H = im.size


def diff(a, b):
    return sum(abs(a[i] - b[i]) for i in range(4))


def edge_hist(axis):
    h = [0] * (W if axis == 0 else H)
    for o in range(0, H if axis == 0 else W, 2):
        for i in range(1, len(h)):
            a = px[i, o] if axis == 0 else px[o, i]
            b = px[i - 1, o] if axis == 0 else px[o, i - 1]
            if diff(a, b) > 90:
                h[i] += 1
    return h


def fit(h, periods=range(180, 225)):  # periods 18.0 .. 22.4 px
    best = None
    for p10 in periods:
        p = p10 / 10
        for ph10 in range(0, int(p * 10), 5):
            ph = ph10 / 10
            s, k = 0, 0
            while ph + k * p < len(h):
                i = int(round(ph + k * p))
                s += max(h[max(0, i - 1):i + 2])
                k += 1
            score = s / k
            if best is None or score > best[0]:
                best = (score, p, ph)
    return best[1], best[2]


pc, phc = fit(edge_hist(0))
# art pixels are square: reuse the column period, fit only the row phase
pr, phr = fit(edge_hist(1), [int(round(pc * 10))])
cols = int((W - phc) // pc)
rows = int((H - phr) // pr)

cells = []
for r in range(rows):
    row = []
    for c in range(cols):
        cx = phc + (c + 0.5) * pc
        cy = phr + (r + 0.5) * pr
        votes = Counter()
        for dy in range(-4, 5, 2):
            for dx in range(-4, 5, 2):
                p = px[int(cx + dx), int(cy + dy)]
                votes[p] += 1
        p = votes.most_common(1)[0][0]
        row.append(p)
    cells.append(row)

# background = transparent / near-white cells reachable from the border (flood fill),
# so white details inside the figure (shirt icon, eye highlights) survive
is_bg_color = lambda p: p[3] < 128 or min(p[:3]) > 235
bg = set()
stack = [(r, c) for r in range(rows) for c in range(cols) if r in (0, rows - 1) or c in (0, cols - 1)]
while stack:
    r, c = stack.pop()
    if (r, c) in bg or not (0 <= r < rows and 0 <= c < cols) or not is_bg_color(cells[r][c]):
        continue
    bg.add((r, c))
    stack += [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)]
cells = [[None if (r, c) in bg else cells[r][c][:3] for c in range(cols)] for r in range(rows)]

# crop to bounding box
used_r = [r for r in range(rows) if any(cells[r])]
used_c = [c for c in range(cols) if any(cells[r][c] for r in range(rows))]
r0, r1, c0, c1 = used_r[0], used_r[-1] + 1, used_c[0], used_c[-1] + 1
cells = [row[c0:c1] for row in cells[r0:r1]]
gh, gw = len(cells), len(cells[0])

# quantize to a small palette
flat = Image.new("RGB", (gw, gh))
for r in range(gh):
    for c in range(gw):
        flat.putpixel((c, r), cells[r][c] or (255, 255, 255))
q = flat.quantize(colors=17, method=Image.Quantize.MEDIANCUT)
pal = q.getpalette()[: 17 * 3]
palette = []
idxmap = {}
chars = "0123456789abcdefghijklmnopqrstuvwxyz"
out = []
for r in range(gh):
    for c in range(gw):
        if cells[r][c] is None:
            out.append(".")
            continue
        i = q.getpixel((c, r))
        if i not in idxmap:
            rgb = tuple(pal[i * 3:i * 3 + 3])
            idxmap[i] = len(palette)
            palette.append("%02x%02x%02x" % rgb)
        out.append(chars[idxmap[i]])

data = "".join(out)
art = Image.new("RGBA", (gw, gh), (0, 0, 0, 0))
for r in range(gh):
    for c in range(gw):
        ch = data[r * gw + c]
        if ch != ".":
            art.putpixel((c, r), tuple(int(palette[chars.index(ch)][k:k + 2], 16) for k in (0, 2, 4)) + (255,))

# icons: the head (top square of the grid), scaled by whole numbers only
head = art.crop((0, 0, gw, gw))
head.resize((gw * 2, gw * 2), Image.NEAREST).save("public/favicon.ico", sizes=[(gw, gw), (gw * 2, gw * 2)], append_images=[head])
tile = Image.new("RGBA", (gw + 4, gw + 4), (242, 169, 59, 255))  # --accent
tile.alpha_composite(head, (2, 2))
tile.convert("RGB").resize((180, 180), Image.NEAREST).save("public/apple-touch-icon.png", optimize=True)

sys.stderr.write(f"grid col p={pc} ph={phc} row p={pr} ph={phr} -> {gw}x{gh}, {len(palette)} colors, {sum(ch != '.' for ch in data)} cells\n")
with open("src/scripts/avatar.json", "w") as f:
    json.dump({"w": gw, "h": gh, "palette": palette, "data": data}, f, separators=(",", ":"))
