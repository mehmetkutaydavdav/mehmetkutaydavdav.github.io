/* ============================================================
   AYARLAR — sitenin adı ve tanıtım yazısı
   ============================================================ */

const ayarlar = {
  ad:      "Kutay",              // üst köşede ve altta görünür
  ikinciAd:"Atlası",             // eğik yazılan kısım, boş bırakabilirsin
  baslik:  "Nerede durduğumun|haritası.",   // | işareti satır kırar
  giris:   "Bu sayfadaki her kare, çekildiği yere sabitlenmiş durumda. Haritadaki bir noktaya dokun ya da listeden bir kare seç — ikisi birbirini takip ediyor.",
  altYazi: "Fotoğraflar bana ait"
};

/* ============================================================
   FOTOĞRAF LİSTESİ

   Sitede değiştireceğin tek dosya burası.
   index.html'e hiç dokunma — onu ben güncelleyeceğim ve
   yeni sürüm gönderdiğimde bu dosya olduğu gibi kalacak.

   Yeni fotoğraf eklemek için aşağıdaki satırlardan birini
   kopyala, altına yapıştır, bilgileri değiştir.
   Her satırın sonunda virgül olmalı, sonuncusunda olmasa da olur.

   ALANLAR
     title  Fotoğrafın adı. Boş bırakırsan başlıksız görünür.
     place  "Semt, Şehir" ya da sadece "Şehir".
            Filtre çubuğu buradaki son kelimeyi kullanıyor.
     lat    Enlem. Kuzey artı, güney eksi.
     lng    Boylam. Doğu artı, batı eksi.
            Bilmiyorsan: Google Haritalar'da yere sağ tıkla,
            çıkan iki sayıya tıklayınca kopyalanır. İlki lat.
     date   "2025-06-14" biçiminde. Yıl-ay-gün.
     cam    Fotoğraf makinesi.
     lens   Objektif.
     exp    Poz bilgisi. Serbest metin, istediğini yazabilirsin.
     src    Fotoğrafın yolu: "fotograflar/web/dosyaadi.jpg"
            Boş bırakırsan yerine renk geçişi görünür.
     tone   src boşken kullanılan iki renk. src doluysa önemsiz.
     teknik  İsteğe bağlı. Satıra "teknik: false," eklersen makine,
            objektif ve poz bilgisi o fotoğrafta gizlenir.
            Hiç yazmazsan görünür.
   ============================================================ */

const frames = [

  {
    title: "Institut de France",
    place: "Pont de Arts, Paris",
    lat: 48.858911, lng: 2.337807,
    date: "2025-05-19",
    cam: "Canon Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/10 · f/4.5 · ISO 6400",
    src: "fotograflar/web/img-4926.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Topkapı'nın Çinileri",
    place: "Topkapı Palace, Istanbul",
    lat: 41.012705, lng: 28.9833,
    date: "2025-11-03",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/4.5 · ISO 2500",
    src: "fotograflar/web/img-6696.jpg",
    tone: ["#15272B","#5E8F86"]
  }

];
