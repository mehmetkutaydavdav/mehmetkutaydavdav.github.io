"""
Fotoğrafları siteye ekler.

Kullanım:
    pip install pillow
    python fotograflari_ekle.py ./fotograflar

Ne yapar:
  1. Klasördeki her JPG'nin EXIF verisini okur (tarih, koordinat, makine, objektif, poz)
  2. 1800px genişliğinde web sürümü + 400px küçük sürüm üretir
  3. index.html'e yapıştırılacak "frames" listesini ekrana yazar

Koordinatı olmayan fotoğraf için lat/lng boş kalır — elle doldurursun.
"""
import sys, os, json
from PIL import Image, ExifTags

GPS = {v: k for k, v in ExifTags.GPSTAGS.items()}
TAGS = {v: k for k, v in ExifTags.TAGS.items()}


def _deg(v, ref):
    d = float(v[0]) + float(v[1]) / 60 + float(v[2]) / 3600
    return -d if ref in ("S", "W") else round(d, 6)


def oku(yol):
    im = Image.open(yol)
    ex = im.getexif()
    ifd = ex.get_ifd(TAGS["ExifOffset"]) or {}
    gps = ex.get_ifd(TAGS["GPSInfo"]) or {}

    lat = lng = ""
    if GPS["GPSLatitude"] in gps:
        lat = _deg(gps[GPS["GPSLatitude"]], gps.get(GPS["GPSLatitudeRef"], "N"))
        lng = _deg(gps[GPS["GPSLongitude"]], gps.get(GPS["GPSLongitudeRef"], "E"))

    tarih = (ifd.get(TAGS["DateTimeOriginal"]) or "")[:10].replace(":", "-")
    poz = []
    if ifd.get(TAGS["ExposureTime"]):
        t = ifd[TAGS["ExposureTime"]]
        poz.append(f"1/{round(1/float(t))}" if float(t) < 1 else f"{float(t)}s")
    if ifd.get(TAGS["FNumber"]):
        poz.append(f"f/{float(ifd[TAGS['FNumber']]):g}")
    if ifd.get(TAGS["ISOSpeedRatings"]):
        poz.append(f"ISO {ifd[TAGS['ISOSpeedRatings']]}")

    return {
        "title": os.path.splitext(os.path.basename(yol))[0].replace("_", " "),
        "place": "",
        "lat": lat, "lng": lng,
        "date": tarih,
        "cam": f"{ex.get(TAGS['Make'],'')} {ex.get(TAGS['Model'],'')}".strip(),
        "lens": str(ifd.get(TAGS["LensModel"], "")),
        "exp": " · ".join(poz),
        "src": f"fotograflar/web/{os.path.basename(yol)}",
    }, im


def kucult(im, yol, ad):
    for klasor, genislik in (("web", 1800), ("kucuk", 400)):
        hedef = os.path.join(yol, klasor)
        os.makedirs(hedef, exist_ok=True)
        k = im.copy()
        k.thumbnail((genislik, genislik))
        k.convert("RGB").save(os.path.join(hedef, ad), quality=86, optimize=True)


klasor = sys.argv[1] if len(sys.argv) > 1 else "."
kayitlar = []
for ad in sorted(os.listdir(klasor)):
    if not ad.lower().endswith((".jpg", ".jpeg")):
        continue
    kayit, im = oku(os.path.join(klasor, ad))
    kucult(im, klasor, ad)
    kayitlar.append(kayit)
    print(f"  ✓ {ad}  {kayit['date']}  {kayit['lat']},{kayit['lng']}", file=sys.stderr)

print("\nconst frames = " + json.dumps(kayitlar, ensure_ascii=False, indent=2) + ";")
