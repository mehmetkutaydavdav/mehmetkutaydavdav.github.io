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
    astronomi/
      index.html          Gök cisimleri ve etkileşimli görünümler.
      astronomi.css       Yalnızca astronomi sayfasının stilleri.
      cisimler.js         Türkçe içerik, özellikler ve NASA kaynakları.
      sahne.js            Bağımsız Canvas 2D çizimleri.
      astronomi.js        Arama, filtreler, seçim ve oynatma kontrolleri.

## Astronomi

`astronomi/index.html` dosyasını aç veya ana sayfadaki **Astronomi** kartına tıkla.
Kurulum ve derleme gerekmiyor; GitHub Pages ve yerel dosya olarak çalışır.
Görünümler ağdan görsel, doku veya JavaScript kütüphanesi indirmez. Yazı tipleri,
sitenin diğer sayfaları gibi Google Fonts'tan gelir; çevrimdışıyken sistem
yazı tipleri kullanılır.

- 24 cisim: sekiz gezegen, Güneş, Ay, cüce gezegenler, buzlu uydular,
  Bennu, 67P, yıldız türleri, kara delik, Orion Bulutsusu ve iki galaksi.
- İsim veya tür ara; **Güneş sistemi**, **Yıldızlar**, **Derin uzay** ile süz.
- Çizimi sürükle; klavyede çizime odaklanıp ok tuşlarını kullan.
  Boşluk tuşu oynatır/duraklatır. Hız, yalnızca görsel hareketi etkiler.
- Cisim seçimleri bağlantıya yazılır: `astronomi/index.html#kara-delik`.
  Tarayıcının geri/ileri düğmeleri önceki seçimlere döner.
- Azaltılmış hareket tercihinde animasyon duraklatılmış başlar.
  Sayfa veya çizim görünmüyorken animasyon durur.
- JavaScript kapalıysa Satürn'ün sabit çizimi ve bilgileri görünür.

Bilgi eklemek/düzeltmek için `cisimler.js` dosyasındaki kayıtları düzenle.
Her kayıtta kaynak bağlantısını, yaklaşık değerleri ve çizim notunu koru.
Yeni bir cisim için benzersiz `id` kullan; `kind`, `sahne.js` içinde desteklenen
bir çizim türü olmalı. Cisim sayısı katalogdan otomatik hesaplanır. Yeni çizim türleri `sahne.js` içinde eklenebilir. İleride olay
simülasyonları aynı klasörde ayrı sayfalar olarak genişletilebilir.

**Bilimsel kapsam:** Görünümler şematiktir; ortak ölçek, gerçek zamanlı hareket,
güncel gökyüzü konumu veya fiziksel simülasyon sunmaz. Kara delik görünümü
genel görelilik hesabı yapmaz; galaksi dönüşü bir inceleme hareketidir.
Kaynaklar her cismin kartında bulunur. İçerik kontrolü: 12 Eylül 2026.

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

## Güncelleme yaparken

Yeni dosya sürümü aldığında **şu ikisine dokunma**:

    atlas/fotograflar.js      Ayarların ve kare listen
    atlas/fotograflar/        Fotoğraflarının kendisi

Bu ikisi sana ait, verdiğim paketlerde yer almaz. `atlas`
klasörünü olduğu gibi değiştirirsen fotoğrafların silinir —
sadece `atlas/index.html` dosyasını değiştir.

## Yayınlamak

GitHub'da `kullaniciadin.github.io` adıyla herkese açık bir depo
aç, klasördeki her şeyi yükle. Settings → Pages'te main / (root)
seçili olsun.

## Gizlilik

Haritadaki koordinatlar birebir gerçek. Ev ya da iş yerinde
çekilmiş kareler için ekleyicideki **Yaklaşıklaştır** düğmesini
kullan — konumu yaklaşık bir kilometreye yuvarlar.


## Astronomi kataloğu

Astronomi sayfası 24 cisim içerir. Yakınlaştırma ve ışık açısı kaydırıcıları,
sürükleme / ok tuşları, oynat-duraklat ve hız seçimiyle görünüm değişir.
Sıfırla düğmesi bakış, yakınlaştırma, ışık ve hızı başlangıca döndürür.
Koyu mavi-siyah tema yalnızca bu sayfaya aittir.

Gezegen haritaları seçildikçe yerel dosyalardan yüklenir; ağ gerekmez.
Dünya'nın gece ışıkları ve bulutları ayrı katmanlardır. Harita yüklenemezse
şematik yüzey kalır. Doku lisansları astronomi/dokular/KAYNAKLAR.md içindedir.
Görünümler öğretici modellerdir: ortak ölçek, gerçek zamanlı hız,
güncel hava durumu veya bilimsel hassasiyetli fizik simülasyonu sunmaz.
