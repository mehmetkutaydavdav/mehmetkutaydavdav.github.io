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
    title: "Söğüt'te Gün Batımı",
    place: "Söğüt, Marmaris",
    lat: 36.650118, lng: 28.096682,
    date: "2026-08-05",
    ulke: "Türkiye", sehir: "Muğla",
    cam: "Canon EOS 760D", lens: "Canon EF-S 18-135mm f/3.5-5.6 IS STM", exp: "1/20 · f/22 · ISO 100",
    src: "fotograflar/web/img-9027.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "The Domes of Paris",
    place: "Paris",
    lat: 48.85815, lng: 2.294689,
    date: "2026-06-17",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/11 · ISO 100",
    src: "fotograflar/web/img-8732.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "The Statue With No Hand",
    place: "Palais Royale, Paris",
    lat: 48.864171, lng: 2.337415,
    date: "2026-06-16",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/3200 · f/5 · ISO 200",
    src: "fotograflar/web/img-8504.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Église de la Madeleine",
    place: "8th Arrondissement, Paris",
    lat: 48.868561, lng: 2.323313,
    date: "2026-06-16",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/1000 · f/9 · ISO 400",
    src: "fotograflar/web/img-8639.jpg",
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
    title: "Statue of Henry IV",
    place: "Paris",
    lat: 48.858927, lng: 2.33912,
    date: "2026-06-13",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "", exp: "ISO 200",
    src: "fotograflar/web/img-8339-2.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Golden Hour Along the Seine",
    place: "Paris",
    lat: 48.858902, lng: 2.339216,
    date: "2026-06-13",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/200 · f/8 · ISO 200",
    src: "fotograflar/web/img-8346.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "The Seine",
    place: "Paris",
    lat: 48.853717, lng: 2.344823,
    date: "2026-06-13",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/9 · ISO 100",
    src: "fotograflar/web/img-8316.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "<3",
    place: "Barcelona",
    lat: 41.389211, lng: 2.186407,
    date: "2026-03-07",
    ulke: "İspanya", sehir: "Barselona",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/640 · f/5 · ISO 800",
    src: "fotograflar/web/img-5720.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Cabel Car",
    place: "",
    lat: 41.374584, lng: 2.178233,
    date: "2026-03-07",
    ulke: "İspanya", sehir: "Barselona",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/2500 · f/6.3 · ISO 200",
    src: "fotograflar/web/img-5652.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Mercat de la Boqueria",
    place: "Barcelona",
    lat: 41.382106, lng: 2.172467,
    date: "2026-03-06",
    ulke: "İspanya", sehir: "Barselona",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/9 · ISO 1600",
    src: "fotograflar/web/img-5578.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "\"İmrahor\"",
    place: "Üsküdar",
    lat: 41.023664, lng: 29.007888,
    date: "2026-01-18",
    ulke: "Türkiye", sehir: "İstanbul",
    cam: "Canon EOS 760D", lens: "Canon EF-S 18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/6.3 · ISO 200",
    src: "fotograflar/web/img-4672.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Kız Kulesi",
    place: "Üsküdar",
    lat: 41.022327, lng: 29.00727,
    date: "2026-01-18",
    ulke: "Türkiye", sehir: "İstanbul",
    cam: "Canon EOS 760D", lens: "Canon EF-S 18-135mm f/3.5-5.6 IS STM", exp: "1/60 · f/11 · ISO 100",
    src: "fotograflar/web/img-4675-2.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Kabataş'ın Tekneleri",
    place: "Kabataş, İstanbul",
    lat: 41.036187, lng: 28.994733,
    date: "2026-01-18",
    ulke: "Türkiye", sehir: "İstanbul",
    cam: "Canon EOS 760D", lens: "Canon EF-S 18-135mm f/3.5-5.6 IS STM", exp: "1/320 · f/4 · ISO 200",
    src: "fotograflar/web/img-4663.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Kılıç Ali Paşa Cami",
    place: "Beyoğlu, İstanbul",
    lat: 41.028616, lng: 28.979793,
    date: "2025-11-27",
    ulke: "Türkiye", sehir: "İstanbul",
    cam: "Canon EOS 760D", lens: "Canon EF-S 18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/20 · ISO 400",
    src: "fotograflar/web/img-1510-1-1-1-1-1-1-1.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Tophane-i Amire",
    place: "Beyoğlu, İstanbul",
    lat: 41.027775, lng: 28.981458,
    date: "2025-11-27",
    ulke: "Türkiye", sehir: "İstanbul",
    cam: "Canon EOS 760D", lens: "Canon EF-S 18-135mm f/3.5-5.6 IS STM", exp: "1/200 · f/14 · ISO 200",
    src: "fotograflar/web/img-1418-3.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Nusretiye Cami",
    place: "Beyoğlu, İstanbul",
    lat: 41.027574, lng: 28.981765,
    date: "2025-11-27",
    ulke: "Türkiye", sehir: "İstanbul",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/320 · f/18 · ISO 800",
    src: "fotograflar/web/img-1458.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Dolmabahçe",
    place: "Kabataş, istanbul",
    lat: 41.036003, lng: 28.994755,
    date: "2025-11-27",
    ulke: "Türkiye", sehir: "İstanbul",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/320 · f/20 · ISO 400",
    src: "fotograflar/web/img-1544.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Beşiktaş İskelesi",
    place: "Beşiktaş",
    lat: 41.040887, lng: 29.007361,
    date: "2025-11-27",
    ulke: "Türkiye", sehir: "İstanbul",
    cam: "Canon EOS 760D", lens: "Canon EF-S 18-135mm f/3.5-5.6 IS STM", exp: "1/500 · f/9 · ISO 200",
    src: "fotograflar/web/img-1546-2.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Topkapı'nın Çinileri",
    place: "Fatih, Istanbul",
    lat: 41.01, lng: 28.98,
    date: "2025-11-03",
    ulke: "Türkiye", sehir: "İstanbul",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/4.5 · ISO 2500",
    src: "fotograflar/web/img-6696.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Ancient City Knidos",
    place: "Muğla, Türkiye",
    lat: 36.686213, lng: 27.374855,
    date: "2025-08-21",
    ulke: "Türkiye", sehir: "Datça",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/1600 · f/5.6 · ISO 100",
    src: "fotograflar/web/img-6501.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Hedef Bulundu!",
    place: "Datça, Muğla",
    lat: 36.720919, lng: 27.686978,
    date: "2025-08-20",
    ulke: "Türkiye", sehir: "Datça",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/100 · f/5.6 · ISO 3200",
    src: "fotograflar/web/img-6432.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Paris Air Show'da Ay Yıldız",
    place: "Paris",
    lat: 48.958297, lng: 2.439201,
    date: "2025-06-17",
    ulke: "Fransa", sehir: "Sarcelles",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/8 · ISO 100",
    src: "fotograflar/web/img-5767.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Magestic",
    place: "Paris",
    lat: 48.850154, lng: 2.348116,
    date: "2025-06-17",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/250 · f/5.6 · ISO 100",
    src: "fotograflar/web/img-5707.jpg",
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
    title: "Dusk Crescent",
    place: "Menton, France",
    lat: 43.768405, lng: 7.491522,
    date: "2025-05-29",
    ulke: "Fransa", sehir: "Menton",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/200 · f/5.6 · ISO 400",
    src: "fotograflar/web/img-5245.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "La Recyclerie",
    place: "18th Arr, Paris",
    lat: 48.89751, lng: 2.343281,
    date: "2025-05-24",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/4000 · f/5 · ISO 800",
    src: "fotograflar/web/img-4981.jpg",
    tone: ["#15272B","#5E8F86"]
  },

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
    title: "Img 4870",
    place: "",
    lat: null, lng: null,
    date: "2025-05-18",
    ulke: "", sehir: "",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/500 · f/5.6 · ISO 100",
    src: "fotograflar/web/img-4870.jpg",
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
    title: "Clécy",
    place: "Clécy, Normandy",
    lat: 48.915903, lng: -0.478332,
    date: "2025-05-01",
    ulke: "Fransa", sehir: "Clécy",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/400 · f/5.6 · ISO 100",
    src: "fotograflar/web/img-4486.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "The Golden Dome and Other Metal Thing",
    place: "Paris",
    lat: 48.853963, lng: 2.315483,
    date: "2025-04-29",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/500 · f/8 · ISO 100",
    src: "fotograflar/web/img-4448.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Arenberg Castle, KU Leuven",
    place: "Leuven, Belgium",
    lat: 50.861503, lng: 4.6858,
    date: "2025-04-20",
    ulke: "Belçika", sehir: "Leuven",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/1000 · f/7.1 · ISO 100",
    src: "fotograflar/web/img-4286.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "I Could Easily Live Here",
    place: "Ghent, Belgium",
    lat: 51.045256, lng: 3.720732,
    date: "2025-04-19",
    ulke: "Belçika", sehir: "Gent",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/320 · f/5.6 · ISO 100",
    src: "fotograflar/web/img-4274.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "The Old Mill of Vernon",
    place: "Vernon, France",
    lat: 49.097449, lng: 1.488596,
    date: "2025-04-06",
    ulke: "Fransa", sehir: "Vernon",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/640 · f/8 · ISO 100",
    src: "fotograflar/web/img-4039.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Meaux",
    place: "Meuax, France",
    lat: 48.956752, lng: 2.882125,
    date: "2025-04-04",
    ulke: "Fransa", sehir: "Meaux",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/800 · f/8 · ISO 100",
    src: "fotograflar/web/img-3984.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Galerie de Paleontologie",
    place: "5th Arr, Paris",
    lat: 48.843229, lng: 2.363243,
    date: "2025-02-14",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/40 · f/6.3 · ISO 500",
    src: "fotograflar/web/img-3222.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "The City of Light",
    place: "Paris",
    lat: 48.866256, lng: 2.322912,
    date: "2025-02-10",
    ulke: "Fransa", sehir: "Paris",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/8 · f/8 · ISO 1600",
    src: "fotograflar/web/img-2851.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Plaza Mayor's Exit 1",
    place: "Madrid, Spain",
    lat: 40.414856, lng: -3.707587,
    date: "2024-02-06",
    ulke: "İspanya", sehir: "Madrid",
    cam: "Canon PowerShot G11", lens: "6mm", exp: "1/400 · f/2.8 · ISO 400",
    src: "fotograflar/web/img-3825.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "Plaza Mayor's Exit 2",
    place: "Madrid, Spain",
    lat: 40.414427, lng: -3.707493,
    date: "2024-02-06",
    ulke: "İspanya", sehir: "Madrid",
    cam: "Canon PowerShot G11", lens: "6mm", exp: "1/320 · f/2.8 · ISO 400",
    src: "fotograflar/web/img-3827.jpg",
    tone: ["#15272B","#5E8F86"]
  },

  {
    title: "No Yellow Filter",
    place: "Boğaziçi, İstanbul",
    lat: 41.083259, lng: 29.048407,
    date: "2025-07-26",
    ulke: "", sehir: "",
    cam: "Canon EOS 760D", lens: "EF-S18-135mm f/3.5-5.6 IS STM", exp: "1/500 · f/11 · ISO 100",
    src: "fotograflar/web/img-6046-2.jpg",
    tone: ["#15272B","#5E8F86"]
  }

];
