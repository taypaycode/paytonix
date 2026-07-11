"""
scripts/enhance_logos_contrast.py
Key out baked-in black backgrounds and lift shadow tones for dark raster logos.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageEnhance


ROOT = Path(__file__).resolve().parents[1]
LOGOS_DIR = ROOT / "public" / "logos"
OUTPUT_DIR = LOGOS_DIR / "enhanced"


def trim_transparent(image: Image.Image, padding: int = 8) -> Image.Image:
    """Crop an RGBA image to its non-transparent bounds with optional padding."""
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if bbox is None:
        return image

    left = max(bbox[0] - padding, 0)
    top = max(bbox[1] - padding, 0)
    right = min(bbox[2] + padding, image.width)
    bottom = min(bbox[3] + padding, image.height)
    return image.crop((left, top, right, bottom))


def raster_key_black_and_boost(
    source: Path,
    destination: Path,
    *,
    bg_threshold: int = 30,
    lift: int = 36,
    gain: float = 2.1,
    brightness: float = 1.08,
    contrast: float = 1.12,
) -> None:
    """
    Remove near-black backgrounds and boost muted foreground tones.

    Useful when a raster logo embeds dark text or marks on a black field and
    cannot be replaced with an SVG or transparent brand asset.

    Args:
        source: Input logo path.
        destination: Output PNG path with transparency.
        bg_threshold: Pixels at or below this max RGB channel become transparent.
        lift: Baseline tone added after gain to pull shadow detail off zero.
        gain: Multiplier applied to surviving RGB channels before lift.
        brightness: Post-process brightness factor.
        contrast: Post-process contrast factor.
    """
    image = Image.open(source).convert("RGBA")
    pixels = image.load()
    width, height = image.size
    output = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    out_pixels = output.load()

    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if alpha < 16:
                continue

            if max(red, green, blue) <= bg_threshold:
                continue

            boosted = tuple(
                min(255, int(channel * gain + lift)) for channel in (red, green, blue)
            )
            out_pixels[x, y] = (*boosted, 255)

    output = trim_transparent(output)
    output = ImageEnhance.Brightness(output).enhance(brightness)
    output = ImageEnhance.Contrast(output).enhance(contrast)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output.save(destination, "PNG")


def main() -> None:
    """Generate contrast-enhanced raster logos for the landing page."""
    raster_key_black_and_boost(
        LOGOS_DIR / "icon_Icon-01.png",
        OUTPUT_DIR / "tawkify.png",
        bg_threshold=8,
        lift=48,
        gain=3.2,
        brightness=1.12,
        contrast=1.18,
    )
    raster_key_black_and_boost(
        LOGOS_DIR / "adaptigent.webp",
        OUTPUT_DIR / "adaptigent.png",
        bg_threshold=28,
        lift=34,
        gain=2.2,
    )

    print(f"Wrote enhanced logo assets to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
