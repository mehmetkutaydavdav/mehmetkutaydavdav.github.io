/* İçerik kataloğu. Klasik script: index.html dosyası file:// ile de açılabilir.
   Sayılar yaklaşık, dönüş süreleri uzak yıldızlara göre; yörünge uzaklıkları ortalama.
   Her kaydın kaynağı sayfada gösterilir. Kontrol tarihi: 12 Eylül 2026. */
window.AstroCatalog = [
  {
    id: 'gunes', name: 'Güneş', kind: 'sun', category: 'yildizlar', group: 'Yıldızlar',
    type: 'Yıldız · ana kol', subtitle: 'Bize en yakın yıldız', sceneLabel: 'Işığın başladığı yer',
    intro: 'Gündüz gökyüzünü dolduran tanıdık yıldızımız. Çekirdeğinde hidrojeni helyuma dönüştürerek uzaya enerji yayıyor.',
    facts: [['Çap', '≈ 1,4 milyon', 'km'], ['Fotosfer sıcaklığı', '≈ 5.500', '°C'], ['Çekirdek sıcaklığı', '≈ 15 milyon', '°C'], ['Ekvatorunda bir dönüş', '≈ 25', 'Dünya günü']],
    highlight: 'Güneş katı değil. Ekvatoru ve kutupları aynı sürede dönmüyor.',
    appearance: 'Parlak bir plazma küresi. Görünen yüzeyindeki küçük desenler, sıcak maddenin yükselip soğuyarak alçalmasıyla oluşur. Koyu güneş lekeleri çevrelerine göre daha serin bölgelerdir.',
    question: 'Güneş bir ateş topu mu?',
    explanation: 'Bir odun ateşi gibi yanmıyor. Çekirdeğindeki çok yüksek sıcaklık ve basınç, atom çekirdeklerinin birleşmesini sağlıyor. Nükleer füzyon denen bu süreç açığa enerji çıkarıyor.',
    modelNote: 'Sıcak tonlar ve parlama temsili. Bu bir teleskop görüntüsü değil; yüzey desenleri ve hareket hızı sadeleştirildi.',
    source: 'https://science.nasa.gov/sun/facts/'
  },
  {
    id: 'dunya', name: 'Dünya', kind: 'earth', category: 'gunes-sistemi', group: 'Güneş sistemi',
    type: 'Gezegen · kayalık', subtitle: 'Bizim mavi noktamız', sceneLabel: 'Okyanuslar, kara ve bulutlar',
    intro: 'Sıvı su okyanusları, ince bir atmosfer ve bildiğimiz tek yaşam. Şimdilik evrende ev diyebildiğimiz yer burası.',
    facts: [['Ekvator çapı', '≈ 12.756', 'km'], ['Bir dönüş', '≈ 23,9', 'saat'], ['Bir yıl', '≈ 365,25', 'gün'], ['Yüzeydeki su', '≈ %71', 'yüzey alanı']],
    highlight: 'Gördüğün mavi, yüzeyin büyük bölümünü kaplayan okyanuslardan geliyor.',
    appearance: 'Okyanusların mavisi, karaların yeşil ve kahverengi tonları, beyaz bulutlar. Kenardaki ince mavi parıltı atmosferi temsil ediyor. Karanlık yarı, o sırada geceyi yaşayan taraf.',
    question: 'Mevsimler neden değişiyor?',
    explanation: 'Asıl neden Güneş’e yaklaşıp uzaklaşmamız değil, dönme eksenimizin eğik olması. Yıl boyunca iki yarımküre güneş ışığını farklı açılarla ve farklı sürelerde alıyor.',
    modelNote: 'Kıtalar ve bulutlar şematik; gerçek bir harita veya güncel hava durumu gösterilmiyor. Aydınlatma ve dönüş hızı temsili.',
    source: 'https://science.nasa.gov/earth/facts/'
  },
  {
    id: 'ay', name: 'Ay', kind: 'moon', category: 'gunes-sistemi', group: 'Güneş sistemi',
    type: 'Doğal uydu · kayalık', subtitle: 'Dünya’nın yol arkadaşı', sceneLabel: 'Çarpışmaların izleri',
    intro: 'Gece gökyüzünün en tanıdık yüzü. Kendi ışığını üretmiyor; Güneş’ten aldığı ışığı bize yansıtıyor.',
    facts: [['Çap', '≈ 3.476', 'km'], ['Dünya’ya uzaklık', '≈ 384.400', 'km · ortalama'], ['Dolanım süresi', '≈ 27', 'Dünya günü'], ['Evre döngüsü', '≈ 29,5', 'Dünya günü']],
    highlight: 'Ay da kendi etrafında dönüyor. Dönüşü Dünya çevresindeki dolanımıyla eşleştiği için bize hep yaklaşık aynı yüzünü gösteriyor.',
    appearance: 'Açık renkli, kraterli araziler ve daha koyu düzlükler. Eskiden deniz sanılan bu koyu bölgeler, çok eski lavların soğumasıyla oluşmuş bazalt ovalarıdır.',
    question: 'Ay’ın karanlık yüzü var mı?',
    explanation: 'Sürekli karanlıkta kalan bir yarımküresi yok. Uzak yüzü de güneş ışığı alır. Ay’ın evreleri ise aydınlık yarısının Dünya’dan ne kadarını görebildiğimize bağlıdır.',
    modelNote: 'Ay’ı dışarıdan çevirebildiğin serbest bir görünüm. Bu hareket Dünya’dan gördüğümüz görünüm ya da bugünkü Ay evresi değil; kraterler şematik.',
    source: 'https://science.nasa.gov/moon/facts/'
  },
  {
    id: 'mars', name: 'Mars', kind: 'mars', category: 'gunes-sistemi', group: 'Güneş sistemi',
    type: 'Gezegen · kayalık', subtitle: 'Kızıl komşumuz', sceneLabel: 'Tozun boyadığı dünya',
    intro: 'Soğuk, tozlu ve ince atmosferli bir dünya. Kurumuş akarsu izleri, geçmişte bugünkünden çok farklı bir Mars olduğunu anlatıyor.',
    facts: [['Ortalama çap', '≈ 6.780', 'km'], ['Bir dönüş', '≈ 24,6', 'saat'], ['Bir yıl', '≈ 687', 'Dünya günü'], ['Doğal uyduları', '2', 'Phobos ve Deimos']],
    highlight: 'Mars’ın kızıllığı demir minerallerinin oksitlenmesinden geliyor. Kısacası, yüzeyin renginde pasın payı var.',
    appearance: 'Kiremit renkli ovalar, daha koyu kaya alanları ve açık renkli kutuplar. İnce atmosferi nedeniyle Dünya’daki gibi kalın bulut örtüsü görmüyoruz.',
    question: 'Mars’ta bir gün nasıl olurdu?',
    explanation: 'Bir Mars günü Dünya’dakine çok yakın sürer. Yılı ise neredeyse iki Dünya yılıdır. Ekseni eğik olduğu için mevsimleri de var, ama bu mevsimler daha uzun sürüyor.',
    modelNote: 'Yüzey desenleri ve kutup başlıkları temsili; gerçek yükseklik haritası değil. Görsel dönüş hızı gerçek zamanla eşleşmiyor.',
    source: 'https://science.nasa.gov/mars/facts/'
  },
  {
    id: 'jupiter', name: 'Jüpiter', kind: 'jupiter', category: 'gunes-sistemi', group: 'Güneş sistemi',
    type: 'Gezegen · gaz devi', subtitle: 'Gezegenlerin en büyüğü', sceneLabel: 'Bulutlardan bir dünya',
    intro: 'Güneş sisteminin en büyük gezegeni. Çizgili görünümü, hızla dönen dev bir atmosferdeki açık ve koyu bulut kuşaklarından geliyor.',
    facts: [['Ortalama çap', '≈ 139.800', 'km'], ['Bir dönüş', '≈ 9,9', 'saat'], ['Bir yıl', '≈ 12', 'Dünya yılı'], ['Güneş’e uzaklık', '≈ 778 milyon', 'km']],
    highlight: 'Büyük Kırmızı Leke bir yüzey izi değil: yüzlerce yıldır gözlenen dev bir atmosfer fırtınası.',
    appearance: 'Krem ve kahverengi bulut kuşakları, birbirine ters yönde esen güçlü rüzgârların ayırdığı bölgeler. Kırmızı oval, Büyük Kırmızı Leke’yi temsil ediyor.',
    question: 'Bu kadar büyükken nasıl bu kadar hızlı?',
    explanation: 'Kendi ekseninde yaklaşık on saatte dönüyor. Bu hızlı dönüş güçlü hava akımlarını şekillendiriyor. Gördüğümüz şey katı bir zemin değil, atmosferin üst bulutları.',
    modelNote: 'Bulut kuşakları ve fırtına şematik. Ayrıntılı hava akımları hesaplanmıyor; görsel dönüş hızları gezegenler arasında bilimsel bir karşılaştırma sunmuyor.',
    source: 'https://science.nasa.gov/jupiter/jupiter-facts/'
  },
  {
    id: 'saturn', name: 'Satürn', kind: 'saturn', category: 'gunes-sistemi', group: 'Güneş sistemi',
    type: 'Gezegen · gaz devi', subtitle: 'Halkalı gaz devi', sceneLabel: 'Buzdan bir imza',
    intro: 'Bir gezegenden fazlası gibi görünen, buzdan halkalarıyla çevrili bir dünya. Güneş sisteminin ikinci büyük gezegeni.',
    facts: [['Ekvator çapı', '≈ 120.500', 'km'], ['Bir dönüş', '≈ 10,7', 'saat'], ['Bir yıl', '≈ 29,4', 'Dünya yılı'], ['Güneş’e uzaklık', '≈ 1,4 milyar', 'km']],
    highlight: 'Halkalar tek parça değil. Her biri kendi yörüngesinde dolanan sayısız buz ve kaya parçasından oluşuyor.',
    appearance: 'Soluk altın renkli bulut kuşaklarına ve gezegeni çevreleyen ince halkalara. Bakış açımız değiştikçe halkalar geniş bir elips ya da incecik bir çizgi gibi görünebilir.',
    question: 'Üzerine inebilir miydik?',
    explanation: 'Satürn’ün üzerinde yürünecek katı bir yüzeyi yok. Derinlere indikçe gaz giderek yoğunlaşır; basınç ve sıcaklık çok yükselir.',
    modelNote: 'Halkalar, yüzey desenleri ve ışıklandırma sadeleştirildi. Çizimi çevirmek bakış açısını değiştirir; halka parçalarının tek tek yörüngeleri hesaplanmıyor.',
    source: 'https://science.nasa.gov/saturn/facts/'
  },
  {
    id: 'notron-yildizi', name: 'Nötron yıldızı', kind: 'neutron', category: 'yildizlar', group: 'Yıldızlar',
    type: 'Yıldız kalıntısı · örnek pulsar', subtitle: 'Küçücük bir dev', sceneLabel: 'Kozmik bir deniz feneri',
    intro: 'Büyük bir yıldızın ölümünden geriye kalabilen, inanılmaz derecede yoğun bir çekirdek. Bir şehir ölçeğindeki hacme Güneş’ten fazla kütle sığabiliyor.',
    facts: [['Boyut ölçeği', 'Bir şehir', 'yaklaşık onlarca kilometre'], ['Yapı', 'Çok yoğun', 'yıldız çekirdeği'], ['Köken', 'Süpernova', 'büyük yıldızın çöküşü'], ['Örnek tür', 'Pulsar', 'düzenli ışınım atımları']],
    highlight: 'Her nötron yıldızını pulsar olarak görmeyiz. Işınım demeti Dünya’yı tararsa düzenli atımlar yakalayabiliriz.',
    appearance: 'Küçük, parlak kalıntı ve manyetik kutuplardan çıkan temsili ışınım demetleri. Eğimli demetler yıldız döndükçe bir deniz fenerinin ışığı gibi uzayı tarıyor.',
    question: 'Yıldız yanıp sönüyor mu?',
    explanation: 'Pulsarın ışınımını periyodik olarak görmemizin nedeni çoğunlukla dönmesi. Demet görüş doğrultumuzu taradığında atım alırız; yıldızın kendisinin açılıp kapanması gerekmiyor.',
    modelNote: 'Belirli bir yıldız değil, şematik bir pulsar örneği. Demetler görünür kılındı; dönüş çok yavaşlatıldı ve gerçek ışık eğrisi hesaplanmıyor.',
    source: 'https://science.nasa.gov/universe/stars/types/'
  },
  {
    id: 'kara-delik', name: 'Kara delik', kind: 'blackhole', category: 'derin-uzay', group: 'Derin uzay',
    type: 'Kara delik · temsili örnek', subtitle: 'Işığın kaçamadığı sınır', sceneLabel: 'Karanlığın çevresindeki ışık',
    intro: 'Madde çok küçük bir bölgeye sıkıştığında uzayzamanı olağanüstü büker. Olay ufkunun içinden dışarıya ışık bile ulaşamaz.',
    facts: [['Sınır', 'Olay ufku', 'geri dönüşün olmadığı sınır'], ['Görünen ışık', 'Çevresindeki gaz', 'sıcak birikim diski'], ['Boyut', 'Kütleye bağlı', 'tek bir çapı yok'], ['Gözlem', 'Çevreye etkisi', 'ışık ve yörüngeler']],
    highlight: 'Parlayan kısım kara deliğin kendisi değil. Çevresindeki sıcak maddeyi ve bu ışığın bükülmüş görünümünü görüyoruz.',
    appearance: 'Ortada karanlık bir bölge ve çevresinde sıcak gazı temsil eden bir disk. Diskin arkası, ışığın bükülmesi nedeniyle üstte ve altta da görünüyormuş gibi resmediliyor.',
    question: 'Her şeyi içine çeker mi?',
    explanation: 'Uzaktan bakınca çekimi aynı kütledeki başka bir cismin çekimi gibi davranır; kozmik bir elektrik süpürgesi değildir. Çevresindeki cisimler uygun hız ve uzaklıkta yörüngede kalabilir.',
    modelNote: 'Birikim diski olan bir kara deliğin şeması. Her kara deliğin parlak diski yoktur. Işık bükülmesi temsili; genel görelilik veya fiziksel ışın izleme hesabı yapılmıyor.',
    source: 'https://science.nasa.gov/universe/black-holes/'
  },
  {
    id: 'orion', name: 'Orion Bulutsusu', kind: 'nebula', category: 'derin-uzay', group: 'Derin uzay',
    type: 'Bulutsu · yıldız oluşum bölgesi', subtitle: 'Bir yıldız doğumevi', sceneLabel: 'Gaz, toz ve yeni başlangıçlar',
    intro: 'Orion takımyıldızında, genç yıldızlarla dolu büyük bir gaz ve toz bulutu. Yeni yıldızların doğuşuna yakın sayılabilecek bir pencere.',
    facts: [['Katalog adı', 'M42', 'Messier 42'], ['Dünya’ya uzaklık', '≈ 1.500', 'ışık yılı'], ['Takımyıldız', 'Orion', 'Avcı'], ['Merkez küme', 'Trapez', 'parlak genç yıldızlar']],
    highlight: 'Merkezindeki genç, sıcak yıldızların yaydığı morötesi ışık, çevredeki gazın parlamasında rol oynuyor.',
    appearance: 'İç içe geçen dağınık gaz bulutları, karanlık toz bölgeleri ve aralarındaki parlak yıldızlar. Bulutsunun belirgin bir katı yüzeyi veya küre biçimi yok.',
    question: 'Bir buluttan nasıl yıldız çıkar?',
    explanation: 'Gaz ve tozun yoğun bölgeleri kütleçekimiyle büzüşebilir. Madde toplandıkça merkez ısınır. Uygun koşullarda füzyon başlar ve yeni bir yıldız doğar.',
    modelNote: 'Orion’dan esinlenen temsili bir bulut; gerçek gökyüzü haritası değil. Renkler anlatım için seçildi, yavaş hareket derinlik hissi verir; gerçek zamanlı gaz akışı gösterilmiyor.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/'
  },
  {
    id: 'samanyolu', name: 'Samanyolu', kind: 'galaxy', category: 'derin-uzay', group: 'Derin uzay',
    type: 'Galaksi · çubuklu sarmal', subtitle: 'Yıldızlardan bir ada', sceneLabel: 'İçinde olduğumuz büyük resim',
    intro: 'Güneş’in de içinde bulunduğu galaksi. Yıldızları, gazı ve tozu kütleçekimiyle bir arada tutulan dev bir yapı.',
    facts: [['Yıldız diski çapı', '> 100.000', 'ışık yılı'], ['Yapı', 'Sarmal disk', 'merkezde çubuk'], ['Güneş’in galaktik turu', '≈ 240 milyon', 'Dünya yılı'], ['Komşuluk', 'Yerel Grup', 'galaksiler topluluğu']],
    highlight: 'Gökyüzündeki soluk Samanyolu kuşağı, galaksimizin diskini içeriden ve kenara doğru görmemizden kaynaklanıyor.',
    appearance: 'Parlak bir merkez, merkezden uzanan çubuk ve çevresindeki sarmal kollar. Mavimsi bölgeler genç, sıcak yıldızların bulunduğu alanları temsil ediyor.',
    question: 'Kendi galaksimizi dışarıdan gördük mü?',
    explanation: 'Hayır. İçerideyiz; bu, ölçümlerden çıkardığımız yapının bir çizimi. Kolların görünümünü, yıldızları ve gaz bulutlarını haritalayarak anlamaya çalışıyoruz.',
    modelNote: 'Samanyolu’nun dışarıdan temsili görünümü; bir fotoğraf değil. Kol yapısı sadeleştirildi; döndürme bir inceleme hareketi, yıldızların gerçek yörüngeleri değil.',
    source: 'https://science.nasa.gov/universe/galaxies/'
  }
];

window.AstroCatalog.push(...[
  {
    "id": "merkur",
    "name": "Merkür",
    "kind": "mercury",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Gezegen · kayalık",
    "subtitle": "Güneş’e en yakın gezegen",
    "sceneLabel": "Güneş’e en yakın gezegen",
    "intro": "Kraterlerle kaplı küçük bir dünya. İnce ekzosferi ısıyı gündüzden geceye taşıyamaz.",
    "facts": [
      [
        "Çap",
        "≈ 4.880",
        "km"
      ],
      [
        "Bir yıl",
        "88",
        "Dünya günü"
      ],
      [
        "Bir dönüş",
        "≈ 59",
        "Dünya günü"
      ],
      [
        "Güneş günü",
        "176",
        "Dünya günü"
      ]
    ],
    "highlight": "Kalın bir atmosferi olmadığı için ısıyı tutamaz. Venüs’ün güçlü sera etkisi onu Merkür’den daha sıcak yapar.",
    "appearance": "Kraterlerle kaplı küçük bir dünya. İnce ekzosferi ısıyı gündüzden geceye taşıyamaz.",
    "question": "En sıcak gezegen neden Merkür değil?",
    "explanation": "Kalın bir atmosferi olmadığı için ısıyı tutamaz. Venüs’ün güçlü sera etkisi onu Merkür’den daha sıcak yapar.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/mercury/facts/"
  },
  {
    "id": "venus",
    "name": "Venüs",
    "kind": "venus",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Gezegen · kayalık",
    "subtitle": "Bulutların ardındaki sıcak dünya",
    "sceneLabel": "Bulutların ardındaki sıcak dünya",
    "intro": "Kalın karbondioksit atmosferi ve sülfürik asit bulutları yüzeyi gizler.",
    "facts": [
      [
        "Çap",
        "≈ 12.104",
        "km"
      ],
      [
        "Bir yıl",
        "225",
        "Dünya günü"
      ],
      [
        "Bir dönüş",
        "243",
        "Dünya günü"
      ],
      [
        "Yüzey sıcaklığı",
        "≈ 465",
        "°C"
      ]
    ],
    "highlight": "Kayalık bir yüzey var. Burada görünen açık renkli desenler yüzey değil, gezegeni saran bulut örtüsüdür.",
    "appearance": "Kalın karbondioksit atmosferi ve sülfürik asit bulutları yüzeyi gizler.",
    "question": "Bulutların altında ne var?",
    "explanation": "Kayalık bir yüzey var. Burada görünen açık renkli desenler yüzey değil, gezegeni saran bulut örtüsüdür.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "uranus",
    "name": "Uranüs",
    "kind": "uranus",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Gezegen · buz devi",
    "subtitle": "Yan yatmış bir dünya",
    "sceneLabel": "Yan yatmış bir dünya",
    "intro": "Mavi-yeşil atmosferinin altında sıcak ve yoğun maddeler bulunur. Buz devi adı, donmuş bir yüzey olduğu anlamına gelmez.",
    "facts": [
      [
        "Ekvator çapı",
        "≈ 51.118",
        "km"
      ],
      [
        "Bir yıl",
        "84",
        "Dünya yılı"
      ],
      [
        "Bir dönüş",
        "≈ 17",
        "saat"
      ],
      [
        "Eksen eğikliği",
        "≈ 98",
        "derece"
      ]
    ],
    "highlight": "Dönme ekseni yörünge düzlemine neredeyse paraleldir. Bu sıra dışı eğim, kutuplarında çok uzun gündüz ve geceler oluşturur.",
    "appearance": "Mavi-yeşil atmosferinin altında sıcak ve yoğun maddeler bulunur. Buz devi adı, donmuş bir yüzey olduğu anlamına gelmez.",
    "question": "Neden yan yatmış gibi?",
    "explanation": "Dönme ekseni yörünge düzlemine neredeyse paraleldir. Bu sıra dışı eğim, kutuplarında çok uzun gündüz ve geceler oluşturur.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/uranus/facts/"
  },
  {
    "id": "neptun",
    "name": "Neptün",
    "kind": "neptune",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Gezegen · buz devi",
    "subtitle": "Uzak, soğuk ve rüzgârlı",
    "sceneLabel": "Uzak, soğuk ve rüzgârlı",
    "intro": "Güneş sisteminin en uzak gezegeni. Atmosferinde hızlı rüzgârlar ve değişken fırtınalar vardır.",
    "facts": [
      [
        "Ekvator çapı",
        "≈ 49.528",
        "km"
      ],
      [
        "Bir yıl",
        "165",
        "Dünya yılı"
      ],
      [
        "Bir dönüş",
        "≈ 16",
        "saat"
      ],
      [
        "Güneş’e uzaklık",
        "≈ 4,5 milyar",
        "km"
      ]
    ],
    "highlight": "Atmosferdeki metan kırmızı ışığın bir bölümünü soğurur. Görsellerdeki mavi tonun doygunluğu görüntü işlemeye de bağlıdır.",
    "appearance": "Güneş sisteminin en uzak gezegeni. Atmosferinde hızlı rüzgârlar ve değişken fırtınalar vardır.",
    "question": "Mavisi nereden geliyor?",
    "explanation": "Atmosferdeki metan kırmızı ışığın bir bölümünü soğurur. Görsellerdeki mavi tonun doygunluğu görüntü işlemeye de bağlıdır.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/neptune/neptune-facts/"
  },
  {
    "id": "pluton",
    "name": "Plüton",
    "kind": "pluto",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Cüce gezegen",
    "subtitle": "Buzdan bir kalp",
    "sceneLabel": "Buzdan bir kalp",
    "intro": "Neptün’ün ötesinde, dağları ve azot buzuyla kaplı düzlükleri olan küçük bir dünya.",
    "facts": [
      [
        "Çap",
        "≈ 2.377",
        "km"
      ],
      [
        "Bir yıl",
        "248",
        "Dünya yılı"
      ],
      [
        "Bir dönüş",
        "≈ 6,4",
        "Dünya günü"
      ],
      [
        "Bölge",
        "Kuiper kuşağı",
        "Güneş sistemi"
      ]
    ],
    "highlight": "Güneş çevresinde döner ve yaklaşık küreseldir; ancak yörüngesinin çevresindeki bölgeye kütleçekimsel olarak egemen değildir.",
    "appearance": "Neptün’ün ötesinde, dağları ve azot buzuyla kaplı düzlükleri olan küçük bir dünya.",
    "question": "Neden cüce gezegen?",
    "explanation": "Güneş çevresinde döner ve yaklaşık küreseldir; ancak yörüngesinin çevresindeki bölgeye kütleçekimsel olarak egemen değildir.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/dwarf-planets/pluto/facts/"
  },
  {
    "id": "ceres",
    "name": "Ceres",
    "kind": "ceres",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Cüce gezegen",
    "subtitle": "Asteroit kuşağının en büyüğü",
    "sceneLabel": "Asteroit kuşağının en büyüğü",
    "intro": "Mars ve Jüpiter arasındaki kuşağın cüce gezegeni. Bazı kraterlerindeki parlak alanlar tuz birikimleridir.",
    "facts": [
      [
        "Çap",
        "≈ 952",
        "km"
      ],
      [
        "Bir yıl",
        "≈ 4,6",
        "Dünya yılı"
      ],
      [
        "Bir dönüş",
        "≈ 9",
        "saat"
      ],
      [
        "Bölge",
        "Asteroit kuşağı",
        "Mars ile Jüpiter arası"
      ]
    ],
    "highlight": "Bunlar ışık üreten şehirler değil, Güneş ışığını yansıtan açık renkli tuz birikimleridir.",
    "appearance": "Mars ve Jüpiter arasındaki kuşağın cüce gezegeni. Bazı kraterlerindeki parlak alanlar tuz birikimleridir.",
    "question": "Parlak noktalar ne?",
    "explanation": "Bunlar ışık üreten şehirler değil, Güneş ışığını yansıtan açık renkli tuz birikimleridir.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/dwarf-planets/ceres/facts/"
  },
  {
    "id": "europa",
    "name": "Europa",
    "kind": "europa",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Doğal uydu · buzlu",
    "subtitle": "Buz kabuğunun altındaki okyanus",
    "sceneLabel": "Buz kabuğunun altındaki okyanus",
    "intro": "Jüpiter’in çatlaklarla örülü buzlu uydusu. Gözlemler buz kabuğunun altında tuzlu bir okyanusa işaret ediyor.",
    "facts": [
      [
        "Çap",
        "≈ 3.122",
        "km"
      ],
      [
        "Dolanım",
        "≈ 3,6",
        "Dünya günü"
      ],
      [
        "Ana gezegen",
        "Jüpiter",
        "gaz devi"
      ],
      [
        "Dış katman",
        "Su buzu",
        "çatlaklı kabuk"
      ]
    ],
    "highlight": "Jüpiter ve komşu uyduların çekimi Europa’yı esnetir. Bu gelgit hareketleri iç yapısına enerji aktarır.",
    "appearance": "Jüpiter’in çatlaklarla örülü buzlu uydusu. Gözlemler buz kabuğunun altında tuzlu bir okyanusa işaret ediyor.",
    "question": "Okyanus nasıl sıvı kalabilir?",
    "explanation": "Jüpiter ve komşu uyduların çekimi Europa’yı esnetir. Bu gelgit hareketleri iç yapısına enerji aktarır.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/jupiter/moons/europa/"
  },
  {
    "id": "titan",
    "name": "Titan",
    "kind": "titan",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Doğal uydu · atmosferli",
    "subtitle": "Metan yağmurları",
    "sceneLabel": "Metan yağmurları",
    "intro": "Satürn’ün en büyük uydusu. Kalın atmosferindeki pus, yüzeyini görünür ışıkta gizler.",
    "facts": [
      [
        "Çap",
        "≈ 5.150",
        "km"
      ],
      [
        "Dolanım",
        "≈ 15,9",
        "Dünya günü"
      ],
      [
        "Ana gezegen",
        "Satürn",
        "gaz devi"
      ],
      [
        "Atmosfer",
        "Azot ağırlıklı",
        "yoğun pus"
      ]
    ],
    "highlight": "Yüzeydeki göller ve denizler büyük ölçüde metan ve etandan oluşur. Su ise bu soğuk ortamda kaya gibi sert buz halindedir.",
    "appearance": "Satürn’ün en büyük uydusu. Kalın atmosferindeki pus, yüzeyini görünür ışıkta gizler.",
    "question": "Gölleri su mu?",
    "explanation": "Yüzeydeki göller ve denizler büyük ölçüde metan ve etandan oluşur. Su ise bu soğuk ortamda kaya gibi sert buz halindedir.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/saturn/moons/titan/facts/"
  },
  {
    "id": "enceladus",
    "name": "Enceladus",
    "kind": "enceladus",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Doğal uydu · buzlu",
    "subtitle": "Uzaya püsküren okyanus",
    "sceneLabel": "Uzaya püsküren okyanus",
    "intro": "Küçük ve parlak bir Satürn uydusu. Güney kutbundaki çatlaklardan buz tanecikleri ve su buharı püskürür.",
    "facts": [
      [
        "Çap",
        "≈ 504",
        "km"
      ],
      [
        "Dolanım",
        "≈ 1,37",
        "Dünya günü"
      ],
      [
        "Ana gezegen",
        "Satürn",
        "gaz devi"
      ],
      [
        "Kabuk",
        "Su buzu",
        "altında okyanus"
      ]
    ],
    "highlight": "Uzaya taşınan malzeme, buz kabuğunun altındaki okyanustan örnekler sunar. Bu, yaşanabilir ortamları araştırmak için değerli bir ipucudur; yaşam bulunduğu anlamına gelmez.",
    "appearance": "Küçük ve parlak bir Satürn uydusu. Güney kutbundaki çatlaklardan buz tanecikleri ve su buharı püskürür.",
    "question": "Püskürmeler neden ilginç?",
    "explanation": "Uzaya taşınan malzeme, buz kabuğunun altındaki okyanustan örnekler sunar. Bu, yaşanabilir ortamları araştırmak için değerli bir ipucudur; yaşam bulunduğu anlamına gelmez.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/saturn/moons/enceladus/"
  },
  {
    "id": "bennu",
    "name": "Bennu",
    "kind": "bennu",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Asteroit",
    "subtitle": "Gevşek bir moloz yığını",
    "sceneLabel": "Gevşek bir moloz yığını",
    "intro": "Kayalar ve daha küçük parçaların kütleçekimiyle bir arada durduğu, karbon bakımından zengin bir asteroit.",
    "facts": [
      [
        "Genişlik",
        "≈ 500",
        "metre"
      ],
      [
        "Bir dönüş",
        "≈ 4,3",
        "saat"
      ],
      [
        "Sınıf",
        "Dünya’ya yakın",
        "asteroit"
      ],
      [
        "Örnek dönüşü",
        "2023",
        "OSIRIS-REx"
      ]
    ],
    "highlight": "Yüzeyi yekpare kaya gibi davranmaz. OSIRIS-REx örnek alırken çok gevşek bir malzemeyle karşılaştı.",
    "appearance": "Kayalar ve daha küçük parçaların kütleçekimiyle bir arada durduğu, karbon bakımından zengin bir asteroit.",
    "question": "Üzerine basmak nasıl olurdu?",
    "explanation": "Yüzeyi yekpare kaya gibi davranmaz. OSIRIS-REx örnek alırken çok gevşek bir malzemeyle karşılaştı.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/solar-system/asteroids/101955-bennu/"
  },
  {
    "id": "67p",
    "name": "67P",
    "kind": "comet",
    "category": "gunes-sistemi",
    "group": "Güneş sistemi",
    "type": "Kuyruklu yıldız",
    "subtitle": "İki loblu bir buz ve toz çekirdeği",
    "sceneLabel": "İki loblu bir buz ve toz çekirdeği",
    "intro": "Güneş’e yaklaşınca ısınan çekirdekten gaz ve toz ayrılır; çevresinde koma ve kuyruk gelişir.",
    "facts": [
      [
        "Tam adı",
        "Churyumov–Gerasimenko",
        "67P"
      ],
      [
        "Boyut",
        "Birkaç",
        "kilometre"
      ],
      [
        "Bir yıl",
        "≈ 6,45",
        "Dünya yılı"
      ],
      [
        "Ziyaretçi",
        "Rosetta",
        "ESA görevi"
      ]
    ],
    "highlight": "İyon kuyruğu Güneş rüzgârıyla Güneş’in ters yönüne taşınır. Toz kuyruğu ışınım basıncı ve yörünge hareketinin etkisiyle eğrilir.",
    "appearance": "Güneş’e yaklaşınca ısınan çekirdekten gaz ve toz ayrılır; çevresinde koma ve kuyruk gelişir.",
    "question": "Kuyruk nereye uzanır?",
    "explanation": "İyon kuyruğu Güneş rüzgârıyla Güneş’in ters yönüne taşınır. Toz kuyruğu ışınım basıncı ve yörünge hareketinin etkisiyle eğrilir.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/solar-system/comets/67p-churyumov-gerasimenko/"
  },
  {
    "id": "kirmizi-dev",
    "name": "Kırmızı dev",
    "kind": "redgiant",
    "category": "yildizlar",
    "group": "Yıldızlar",
    "type": "Yıldız · evrim evresi",
    "subtitle": "Genişleyen bir yıldız",
    "sceneLabel": "Genişleyen bir yıldız",
    "intro": "Çekirdeğindeki hidrojen azalan bazı yıldızlar genişler. Dış katmanları soğuyarak daha kırmızı görünür.",
    "facts": [
      [
        "Ölçek",
        "Genişlemiş",
        "yıldız"
      ],
      [
        "Yüzey",
        "Daha serin",
        "ana kol haline göre"
      ],
      [
        "Renk",
        "Turuncu–kırmızı",
        "sıcaklığa bağlı"
      ],
      [
        "Evre",
        "Geç dönem",
        "yıldız evrimi"
      ]
    ],
    "highlight": "Yüzeyi daha serin olsa da ışık yayan toplam alan çok büyümüştür. Bu nedenle toplam parlaklığı yüksek olabilir.",
    "appearance": "Çekirdeğindeki hidrojen azalan bazı yıldızlar genişler. Dış katmanları soğuyarak daha kırmızı görünür.",
    "question": "Soğuksa neden parlak?",
    "explanation": "Yüzeyi daha serin olsa da ışık yayan toplam alan çok büyümüştür. Bu nedenle toplam parlaklığı yüksek olabilir.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/universe/stars/types/"
  },
  {
    "id": "beyaz-cuce",
    "name": "Beyaz cüce",
    "kind": "whitedwarf",
    "category": "yildizlar",
    "group": "Yıldızlar",
    "type": "Yıldız kalıntısı",
    "subtitle": "Dünya boyutlarında bir çekirdek",
    "sceneLabel": "Dünya boyutlarında bir çekirdek",
    "intro": "Güneş benzeri bir yıldız dış katmanlarını attığında geriye çok yoğun ve sıcak bir çekirdek kalabilir.",
    "facts": [
      [
        "Boyut",
        "Dünya mertebesi",
        "yaklaşık"
      ],
      [
        "Yoğunluk",
        "Çok yüksek",
        "sıkışmış madde"
      ],
      [
        "Enerji",
        "Depolanmış ısı",
        "zamanla soğur"
      ],
      [
        "Tür",
        "Yıldız kalıntısı",
        "beyaz cüce"
      ]
    ],
    "highlight": "Yıldızın kütlesinin büyük bir bölümü çok küçük bir hacimde toplanmıştır. Sıradan maddeye göre son derece yoğundur.",
    "appearance": "Güneş benzeri bir yıldız dış katmanlarını attığında geriye çok yoğun ve sıcak bir çekirdek kalabilir.",
    "question": "Küçük ama nasıl ağır?",
    "explanation": "Yıldızın kütlesinin büyük bir bölümü çok küçük bir hacimde toplanmıştır. Sıradan maddeye göre son derece yoğundur.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/universe/stars/types/"
  },
  {
    "id": "andromeda",
    "name": "Andromeda",
    "kind": "andromeda",
    "category": "derin-uzay",
    "group": "Derin uzay",
    "type": "Galaksi · sarmal",
    "subtitle": "Komşu büyük galaksi",
    "sceneLabel": "Komşu büyük galaksi",
    "intro": "M31 adıyla da bilinen Andromeda, çok sayıda yıldızın, gazın ve tozun oluşturduğu büyük bir sarmal galaksidir.",
    "facts": [
      [
        "Uzaklık",
        "≈ 2,5 milyon",
        "ışık yılı"
      ],
      [
        "Katalog",
        "M31",
        "Messier"
      ],
      [
        "Tür",
        "Sarmal",
        "galaksi"
      ],
      [
        "Konum",
        "Andromeda",
        "takımyıldızı yönü"
      ]
    ],
    "highlight": "Evet. Buraya ulaşan ışık yaklaşık 2,5 milyon yıl önce yola çıktı. Uzağa bakmak aynı zamanda geçmişi görmek demektir.",
    "appearance": "M31 adıyla da bilinen Andromeda, çok sayıda yıldızın, gazın ve tozun oluşturduğu büyük bir sarmal galaksidir.",
    "question": "Geçmişe mi bakıyoruz?",
    "explanation": "Evet. Buraya ulaşan ışık yaklaşık 2,5 milyon yıl önce yola çıktı. Uzağa bakmak aynı zamanda geçmişi görmek demektir.",
    "modelNote": "Görünüm öğretici bir temsil; yüzey ayrıntıları, renkler ve hareket hızı gerçek gözlemle birebir eşleşmez.",
    "source": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/"
  }
]);

for (const object of window.AstroCatalog) {
  if (['sun','earth','moon','mars','jupiter','saturn','mercury','venus','uranus','neptune'].includes(object.kind))
    object.modelNote='Harita yüklenirse Solar System Scope dokusu, yüklenemezse şematik yüzey gösterilir. Renkler işlenmiştir; güncel hava durumu veya bugünkü evre gösterilmez. Aydınlatma ve dönüş hızı temsili.';
}
