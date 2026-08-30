# Kutay — kişisel site

Tek bir klasör. Sunucu, kurulum, hesap gerekmiyor.
`index.html`'e çift tıkla, site açılır.

## Klasör

    index.html            Ana sayfa. Kart listesini ayarlar.js'ten okur.
    ortak/
      ayarlar.js          Adın, tanıtım yazın ve ana sayfadaki kartlar.
      tema.css            Renkler, yazı tipleri, ortak parçalar.
    atlas/
      index.html          Fotoğraf haritası.
      fotograflar.js      Atlasın başlığı ve fotoğraf listen.
      fotograflar/web/    Fotoğraflar buraya yazılır.
    araclar/
      ekleyici.html       Fotoğraf ekleme aracı.
      fotograflari_ekle.py

## Yeni bölüm ya da araç eklemek

1. Yeni bir klasör aç, içine `index.html` koy
2. Sayfanın başına şunu ekle:
   `<link rel="stylesheet" href="../ortak/tema.css">`
   Böylece renkler, yazı tipleri ve üst çubuk kendiliğinden gelir.
3. Üst çubuğu diğer sayfalardaki gibi kur:

       <span class="marka">
         <a class="wordmark" href="../index.html" id="wordmark">Atlas</a>
         <span class="sep">/</span>
         <span class="sayfa">Aracın adı</span>
       </span>

4. `ortak/ayarlar.js` içindeki `bolumler` ya da `araclar`
   listesine bir satır ekle

Ana sayfada kendiliğinden görünür. Başka hiçbir dosyaya
dokunman gerekmiyor.

`yol` alanını boş bırakırsan kart soluk görünür ve tıklanmaz —
"yakında" demenin yolu bu.

## Fotoğraf eklemek

`araclar/ekleyici.html`'e çift tıkla.

1. **Klasörü bağla** → `atlas` klasörünü seç (Chrome ve Edge)
2. Fotoğrafları sürükle
3. Başlık ve yeri gir
4. **Haritada kontrol et** ile koordinatı doğrula,
   yanlışsa **Haritadan seç** ile düzelt
5. **Siteye kaydet**

Fotoğrafları küçültür, `atlas/fotograflar/web/` klasörüne yazar,
`atlas/fotograflar.js`'i günceller. Dosyanın en üstündeki
ayarlar bloğuna dokunmaz.

Firefox ve Safari'de klasör bağlama yok; orada indirip elle
taşırsın, sayfa anlatıyor.

## Yayınlamak

GitHub'da `kullaniciadin.github.io` adıyla herkese açık bir depo
aç, klasördeki her şeyi yükle. Settings → Pages'te main / (root)
seçili olsun.

## Gizlilik

Haritadaki koordinatlar birebir gerçek. Ev ya da iş yerinde
çekilmiş kareler için ekleyicideki **Yaklaşıklaştır** düğmesini
kullan — konumu yaklaşık bir kilometreye yuvarlar.
