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
    lat: 48.86, lng: 2.34,
    date: "2025-05-19",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/10 · f/4.5 · ISO 6400",
    src: "fotograflar/web/img-4926.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Aşk bir çocuğun parmaklarının ucundadır",
    place: "Barcelona",
    lat: 41.389211, lng: 2.186407,
    date: "2026-03-07",
    ulke: "İspanya", sehir: "Barselona",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/640 · f/5 · ISO 800",
    src: "fotograflar/web/img-5720.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Topkapı'nın Çinileri",
    place: "Topkapı Palace, Istanbul",
    lat: 41.01, lng: 28.98,
    date: "2025-11-03",
    ulke: "Türkiye", sehir: "İstanbul",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/4.5 · ISO 2500",
    src: "fotograflar/web/img-6696.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Saint-Michel",
    place: "Mont Saint Michel, Normandy",
    lat: 48.62373, lng: -1.515076,
    date: "2025-05-03",
    ulke: "Fransa", sehir: "Pontorson",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/10 · ISO 100",
    src: "fotograflar/web/img-4630.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Pantheon",
    place: "Jardin du Luxembourg, Paris",
    lat: 48.84786, lng: 2.338439,
    date: "2026-06-14",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/10 · f/4.5 · ISO 6400",
    src: "fotograflar/web/img-8373.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Hotel de Ville Menton",
    place: "Menton, France",
    lat: 43.775388, lng: 7.502978,
    date: "2025-05-29",
    ulke: "Fransa", sehir: "Menton",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/1000 · f/5.6 · ISO 100",
    src: "fotograflar/web/img-5207.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Forest House",
    place: "Strasbourg, France",
    lat: 48.580355, lng: 7.739334,
    date: "2025-05-18",
    ulke: "Fransa", sehir: "Strazburg",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/500 · f/7.1 · ISO 100",
    src: "fotograflar/web/img-4760.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Clecy",
    place: "Clecy, Normandy",
    lat: 48.915903, lng: -0.478332,
    date: "2025-05-01",
    ulke: "Fransa", sehir: "Clécy",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/5.6 · ISO 100",
    src: "fotograflar/web/img-4486.jpg",
    tone: ["#15272B","#5E8F86"]
  }

];
