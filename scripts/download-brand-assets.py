"""Download unmodified official store badges and the Inter font license."""
from pathlib import Path
from urllib.request import Request, urlopen
import re

assets = Path(__file__).resolve().parents[1] / 'public' / 'assets'
assets.mkdir(parents=True, exist_ok=True)
sources = {
    'app-store.svg': 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg',
    'google-play.png': 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
    'Inter-LICENSE.txt': 'https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt',
}
for name, url in sources.items():
    with urlopen(Request(url, headers={'User-Agent': 'Setcraft-asset-preparation/1.0'}), timeout=30) as response:
        payload = response.read()
    (assets / name).write_bytes(payload)
    print(f'{name}: {len(payload):,} bytes from {url}', flush=True)

# Self-host Google's Latin-only variable font instead of loading the full TTF.
css_url = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'
font_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'}
with urlopen(Request(css_url, headers=font_headers), timeout=30) as response:
    font_css = response.read().decode('utf-8')
latin = re.search(r'/\* latin \*/\s*@font-face\s*\{([^}]+)\}', font_css)
if latin is None:
    raise RuntimeError('No Latin Inter font face was returned by Google Fonts.')
font_url = re.search(r'src:\s*url\((https://fonts\.gstatic\.com/[^)]+)\)', latin.group(1))
if font_url is None:
    raise RuntimeError('No official Google Fonts download URL was found.')
with urlopen(Request(font_url.group(1), headers=font_headers), timeout=30) as response:
    font_data = response.read()
if not font_data.startswith(b'wOF2'):
    raise RuntimeError('The downloaded font is not WOFF2.')
(assets / 'inter.woff2').write_bytes(font_data)
print(f'inter.woff2: {len(font_data):,} bytes from {font_url.group(1)}', flush=True)
