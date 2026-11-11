"""Prepare web-sized copies of owned app assets; never changes mobile sources."""
from pathlib import Path
import json
import shutil
from PIL import Image

website = Path(__file__).resolve().parents[1]
mobile = website.parent / 'mobile'
assets = website / 'public' / 'assets'
screens = assets / 'screens'
screens.mkdir(parents=True, exist_ok=True)
sources = {
    'today': 'build/previews/training-readiness-today.png',
    'plan': 'build/previews/personal-plan-reveal-male.png',
    'training': 'build/previews/weekly-plan-day.png',
    'body': 'build/previews/body-progress.png',
    'nutrition': 'build/nutrition-preview.png',
    'progress': 'build/previews/exercise-progress.png',
}
manifest = []
for name, relative in sources.items():
    source = mobile / relative
    with Image.open(source) as image:
        image = image.convert('RGB')
        image.thumbnail((680, 1700), Image.Resampling.LANCZOS)
        destination = screens / f'{name}.webp'
        image.save(destination, 'WEBP', quality=88, method=6)
    manifest.append({'asset': f'screens/{name}.webp', 'source': f'mobile/{relative}', 'kind': 'actual app preview with fixture data', 'bytes': destination.stat().st_size})

with Image.open(mobile / 'assets/exercise_anatomy/graphite-atlas-v1.png') as atlas:
    for name, box in [('front', (68, 0, 480, 720)), ('back', (548, 0, 960, 720))]:
        target = assets / f'body-{name}.webp'
        atlas.crop(box).convert('RGB').save(target, 'WEBP', quality=89, method=6)
        manifest.append({'asset': target.name, 'source': 'mobile/assets/exercise_anatomy/graphite-atlas-v1.png', 'kind': 'original Setcraft artwork, cropped for presentation', 'bytes': target.stat().st_size})

shutil.copyfile(mobile / 'assets/branding/setcraft-mark.svg', assets / 'setcraft-mark.svg')

shutil.copyfile(mobile / 'assets/fonts/Inter.ttf', assets / 'inter.ttf')
(assets / 'asset-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'Prepared {len(manifest)} images and local brand/font assets in {assets}')
print(f'Total image size: {sum(item["bytes"] for item in manifest):,} bytes')
