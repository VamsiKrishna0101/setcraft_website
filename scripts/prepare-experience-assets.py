"""Create small, undistorted local screen textures for the 3D phone."""
from pathlib import Path
from PIL import Image, ImageOps
import json

website = Path(__file__).resolve().parents[1]
assets = website / 'public/assets'
entries = []
for folder, dimensions in [('screens', (384, 832)), ('screens-desktop', (680, 1474))]:
    destination = assets / 'experience' / folder
    destination.mkdir(parents=True, exist_ok=True)
    for name in ['today', 'plan', 'training', 'body', 'nutrition', 'progress']:
        source = assets / 'screens' / f'{name}.webp'
        with Image.open(source) as original:
            image = ImageOps.contain(original.convert('RGB'), dimensions, Image.Resampling.LANCZOS)
            canvas = Image.new('RGB', dimensions, '#000000')
            canvas.paste(image, ((dimensions[0] - image.width) // 2, 0))
            target = destination / f'{name}.webp'
            canvas.save(target, 'WEBP', quality=86 if folder.endswith('desktop') else 83, method=6)
        entries.append({'file': f'{folder}/{target.name}', 'source': f'/assets/screens/{name}.webp', 'dimensions': dimensions, 'bytes': target.stat().st_size})
(assets / 'experience/textures.manifest.json').write_text(json.dumps(entries, indent=2) + '\n', encoding='utf-8')
print(f'Prepared {len(entries)} 3D screen textures: {sum(item["bytes"] for item in entries):,} bytes total.')
