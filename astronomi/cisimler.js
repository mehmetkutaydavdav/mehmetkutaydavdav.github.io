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
