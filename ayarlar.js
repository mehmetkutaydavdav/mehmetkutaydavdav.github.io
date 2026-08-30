/* ============================================================
   SİTE AYARLARI
   Adın, tanıtım yazın ve ana sayfadaki kart listesi.

   Yeni bir bölüm ya da araç eklediğinde buraya bir satır ekle,
   ana sayfada kendiliğinden görünür. Başka hiçbir yeri
   değiştirmen gerekmiyor.

     ad      Kartın başlığı
     not     Bir iki cümle açıklama
     etiket  Üstteki küçük yazı
     yol     Tıklayınca gidilecek DOSYA. "atlas/index.html" gibi
             tam yaz — sadece "atlas/" yazarsan bilgisayarda
             klasör listesi açılır. Boş bırakırsan kart soluk
             görünür ve tıklanmaz ("yakında").
   ============================================================ */

const site = {
  ad:       "Mehmet Kutay",
  ikinciAd: "Davdav",
  tanim:    "Fotoğraf çekiyorum, bir şeyi üçüncü kez elle yaptığımda küçük bir araç yazıyorum. İkisi de burada.",
  altYazi:  "Buradaki her şey bana ait"
};

/* Senin bölümlerin — içerik */
const bolumler = [
  {
    ad: "Fotoğraf atlası",
    etiket: "Fotoğraf",
    not: "Çektiğim kareler, çekildikleri yere sabitlenmiş. Haritadan gez ya da listeden seç.",
    yol: "atlas/index.html"
  },
  {
    ad: "Sıradaki bölüm",
    etiket: "Yakında",
    not: "Başka bir hobi buraya gelecek.",
    yol: ""
  }
];

/* Araçlar — herkesin kendi için kullanabileceği şeyler */
const araclar = [
  {
    ad: "Fotoğraf ekleyici",
    etiket: "Fotoğraf · çalışıyor",
    not: "Fotoğrafı sürükle: çekim tarihini, koordinatını, makine ve poz bilgisini dosyanın içinden okur, haritada doğrular, web için küçültür. Dosya bilgisayarından çıkmıyor.",
    yol: "araclar/ekleyici.html"
  },
  {
    ad: "Işık takvimi",
    etiket: "Fotoğraf · yakında",
    not: "Bir konum ve tarih için altın saat, mavi saat ve güneşin doğduğu açı.",
    yol: ""
  },
  {
    ad: "Sıradaki araç",
    etiket: "Yakında",
    not: "Bir işi üçüncü kez elle yaptığımda buraya bir araç daha eklenecek.",
    yol: ""
  }
];
