"""
Script to generate public/xp-dark.png from public/xp.png.
Recolours near-white wordmark pixels to navy #0B1440 while preserving
the amber/gold chevron and anti-aliased edge alpha channels.
"""

import os
from PIL import Image
import numpy as np

def generate_dark_logo(src_path="public/xp.png", out_path="public/xp-dark.png"):
    if not os.path.exists(src_path):
        raise FileNotFoundError(f"Source logo not found at {src_path}")

    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img).copy()

    # Criteria for white / near-white text:
    # 1. Non-transparent: Alpha > 0
    # 2. Near white / neutral: R > 150, G > 150, B > 150
    # 3. Not amber chevron: in the amber chevron, blue is low (B < 100) while R is high
    is_non_transparent = arr[:, :, 3] > 0
    is_white_text = (
        is_non_transparent &
        (arr[:, :, 0] > 160) &
        (arr[:, :, 1] > 160) &
        (arr[:, :, 2] > 140)
    )

    # Target navy color: #0B1440 -> (11, 20, 64)
    target_r, target_g, target_b = 11, 20, 64

    # Apply recoloring to white text pixels only
    arr[is_white_text, 0] = target_r
    arr[is_white_text, 1] = target_g
    arr[is_white_text, 2] = target_b
    # Alpha channel arr[:, :, 3] is left untouched to maintain clean anti-aliasing!

    out_img = Image.fromarray(arr, "RGBA")
    out_img.save(out_path, format="PNG", optimize=True)
    print(f"Successfully generated {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    generate_dark_logo()
