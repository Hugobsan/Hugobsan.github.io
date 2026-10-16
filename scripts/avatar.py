"""Avatar pipeline: src/assets/profile.png (pixel art upscaled evenly, transparent background) -> art-pixel grid.

Writes src/scripts/avatar.json ({w, h, palette: [hex...], data: "<one char per cell, '.' = empty>"}), used by the
particle avatar, plus public/favicon.ico and public/apple-touch-icon.png (nearest-neighbor, whole-number scales).
Usage, from the repo root: python3 -I scripts/avatar.py <cols> <rows> [image]   e.g. 37 48   (needs Pillow)
"""
import json, sys
from PIL import Image

cols, rows = int(sys.argv[1]), int(sys.argv[2])
im = Image.open(sys.argv[3] if len(sys.argv) > 3 else "src/assets/profile.png").convert("RGBA")
art = im.crop(im.getchannel("A").getbbox()).resize((cols, rows), Image.NEAREST)

chars = "0123456789abcdefghijklmnopqrstuvwxyz"
palette, data = [], ""
for r in range(rows):
    for c in range(cols):
        px = art.getpixel((c, r))
        if px[3] < 128:
            data += "."
            continue
        hx = "%02x%02x%02x" % px[:3]
        if hx not in palette:
            palette.append(hx)
        data += chars[palette.index(hx)]
with open("src/scripts/avatar.json", "w") as f:
    json.dump({"w": cols, "h": rows, "palette": palette, "data": data}, f, separators=(",", ":"))

# icons: the head (top square of the grid), nearest-neighbor at whole-number scales only
head = art.crop((0, 0, cols, cols))
# favicon: a 32x32 window centred on the head at 1:1 (downscaling would drop art pixels), plus 2x
o = max(0, (cols - 32) // 2)
fav = head.crop((o, o, o + 32, o + 32)) if cols > 32 else head
fav.resize((fav.width * 2, fav.height * 2), Image.NEAREST).save(
    "public/favicon.ico", sizes=[fav.size, (fav.width * 2, fav.height * 2)], append_images=[fav])
# apple-touch-icon: the whole head on an accent tile, scaled by the largest whole factor that fits 180px
k = 180 // (cols + 2)
tile = Image.new("RGBA", (180 // k, 180 // k), (242, 169, 59, 255))  # --accent
tile.alpha_composite(head, ((tile.width - cols) // 2, (tile.height - cols) // 2))
tile.convert("RGB").resize((tile.width * k, tile.height * k), Image.NEAREST).save("public/apple-touch-icon.png", optimize=True)
print(f"{cols}x{rows}, {len(palette)} colors, {len(data) - data.count('.')} cells")
