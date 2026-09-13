/* JPL Table 1, epoch J2000.0; fitted Keplerian elements, not current osculating elements. */
(() => {
  const orbits={
    merkur:[.38709927,.20563593,7.00497902,252.25032350,77.45779628,48.33076593],
    venus:[.72333566,.00677672,3.39467605,181.97909950,131.60246718,76.67984255],
    dunya:[1.00000261,.01671123,-.00001531,100.46457166,102.93768193,0],
    mars:[1.52371034,.09339410,1.84969142,-4.55343205,-23.94362959,49.55953891],
    jupiter:[5.202887,.04838624,1.30439695,34.39644051,14.72847983,100.47390909],
    saturn:[9.53667594,.05386179,2.48599187,49.95424423,92.59887831,113.66242448],
    uranus:[19.18916464,.04725744,.77263783,313.23810451,170.95427630,74.01692503],
    neptun:[30.06992276,.00859048,1.77004347,-55.12002969,44.96476227,131.78422574]
  };
  const composition={
    merkur:['Karasal gezegen','Büyük demir ağırlıklı çekirdek, silikat manto ve kabuk. Sürekli atmosfer yerine O, Na, H, He ve K içeren çok seyrek bir ekzosfer.'],
    venus:['Karasal gezegen','Silikat kabuk/manto ve demirce zengin çekirdek. Atmosfer yaklaşık %96,5 CO₂ ve %3,5 N₂; bulutlar sülfürik asit damlacıkları içerir.'],
    dunya:['Karasal gezegen','Silikat manto/kabuk, demir-nikel çekirdek ve sıvı su hidrosferi. Kuru atmosfer yaklaşık %78 N₂, %21 O₂, %0,93 Ar; su buharı değişkendir.'],
    mars:['Karasal gezegen','Bazaltik kabuk, silikat manto ve demir-kükürt ağırlıklı çekirdek. Atmosfer CO₂ ağırlıklıdır; N₂ ve Ar azınlık bileşenlerdir.'],
    jupiter:['Gaz devi','H₂ ve He baskındır; atmosferde CH₄, NH₃, H₂O ve iz bileşenler bulunur. Derinde hidrojen metalik davranır; ağır elementler tek bir keskin çekirdeğe sınırlı olmayabilir.'],
    saturn:['Gaz devi','H₂/He zarfı, iz CH₄ ve NH₃; derin iç kısımda metalik hidrojen ve ağır elementler. Helyum ayrışması iç ısı bütçesine katkı sağlayabilir. Halkalar ağırlıklı olarak su buzudur.'],
    uranus:['Buz devi','H₂/He atmosferinde metan, kırmızı ışığı soğurur. İç yapı modelleri H₂O, NH₃, CH₄ ve kaya bileşenleri içerir; oranlar ve fazlar doğrudan ölçülmüş değildir.'],
    neptun:['Buz devi','H₂/He ve metan içeren atmosfer. Derin iç kısımda ağır elementler ve su/amonyak/metan türevleri öngörülür; katman yapısı model bağımlıdır.'],
    ay:['Farklılaşmış kayalık uydu','Anortozitik yüksek araziler, bazaltik maria ve regolit. Küçük metalik çekirdek; çarpışma kraterleri ve gelgit kilitlenmesi belirleyicidir.'],
    pluton:['Kuiper kuşağı cüce gezegeni','Kaya ve su buzu iç yapı; yüzeyde N₂, CH₄ ve CO buzları. Sputnik Planitia azot buzu ovasıdır. Atmosfer seyrek ve N₂ ağırlıklıdır.'],
    ceres:['Ana kuşak cüce gezegeni','Hidratlı mineraller, su buzu ve tuzlar. Occator içindeki yüksek albedolu birikimler karbonatlarla ilişkilidir.'],
    europa:['Buzlu Galile uydusu','Su buzu kabuğu, olası tuzlu sıvı su okyanusu, silikat iç yapı ve metalik çekirdek. Gelgit deformasyonu iç ısı kaynağıdır.'],
    titan:['Atmosferli buzlu uydu','N₂ ağırlıklı atmosfer ve CH₄ fotokimyası; organik aerosol pusu. Yüzeyde metan/etan sıvıları ve su buzu, derinde olası su okyanusu.'],
    enceladus:['Okyanus dünyası','Su buzu kabuğu ve küresel yeraltı okyanusu. Güney kutup püskürmeleri H₂O buharı, buz taneleri, tuzlar ve organik bileşikler taşır.'],
    bennu:['Karbonca zengin rubble-pile asteroit','Düşük albedolu regolit ve kaya blokları. Hidratlı mineraller ve organik bileşikler içerir; gevşek parçaların kütleçekimiyle birleştiği bir yapıdır.'],
    '67p':['Jüpiter ailesi kuyruklu yıldızı','İki loblu çekirdekte toz, su buzu ve CO₂/CO gibi uçucular bulunur. Süblimasyon komayı besler; iyon ve toz kuyruklarının dinamiği farklıdır.']
  };
  const stellar={
    gunes:['G2 V · main sequence','Çekirdekte proton–proton zinciriyle H → He füzyonu. G2 tayfsal sınıfı, V ise ana kol ışınım sınıfını belirtir.','T_eff ≈ 5.772 K; L = 1 L☉; R = 1 R☉. Fotosfer bileşimi ile çekirdek bileşimi aynı değildir.'],
    'kirmizi-dev':['Red giant branch · RGB','Bu model düşük/orta kütleli bir RGB yıldızını temsil eder: inert helyum çekirdeği ve hidrojen yakan kabuk. Genel bir kırmızı dev için tek tayfsal alt sınıf atanamaz.','H–R diyagramında sağ üst bölge: düşük T_eff, büyük yarıçap ve yüksek L. L = 4πR²σT_eff⁴.'],
    'beyaz-cuce':['White dwarf · yıldız kalıntısı','Çoğunlukla karbon–oksijen iç yapı; elektron dejenerasyon basıncı kütleçekimine karşı destek sağlar. Genel örneğe DA/DB tayfsal sınıfı atanmaz; DA hidrojen, DB helyum çizgileriyle tanımlanır.','Ana kol yıldızı değildir. Süregelen çekirdek füzyonu yerine depolanmış ısıyı yayarak soğur; yaklaşık Dünya boyutlarındadır.'],
    'notron-yildizi':['Neutron star · pulsar örneği','Çekirdek çökmesi süpernovasından kalan kompakt cisim. Pulsar sınıflaması, dönme ve manyetik eksen geometrisinin ürettiği periyodik ışınım atımlarıyla ilgilidir.','MK ana kol sınıflaması uygulanmaz. İç yapının yoğun madde hal denklemi araştırma konusudur; bütün nötron yıldızları pulsar olarak görülmez.']
  };
  for(const o of window.AstroCatalog){
    o.technical=[];
    if(composition[o.id]){const [type,body]=composition[o.id];o.technical.push(['Sınıf ve bileşim',type+' — '+body]);}
    if(stellar[o.id]){const [type,body,properties]=stellar[o.id];o.type=type;o.technical.push(['Yıldız sınıflandırması',body],['Fiziksel özellikler',properties],['Işınım ve gözlenen akı','L toplam ışınım gücüdür (W). İzotropik kaynak ve sönümleme yokken F = L/(4πd²), birimi W/m². Görünür parlaklık uzaklığa ve yıldızlararası sönümlemeye bağlıdır.']);}
    if(orbits[o.id]){const [a,e,i,L,peri,node]=orbits[o.id],wrap=x=>(x%360+360)%360;
      o.orbit=[['a · büyük yarı eksen',a,'au'],['e · dışmerkezlik',e,'boyutsuz'],['i · yörünge eğimi',i,'°'],['Ω · çıkış düğümü boylamı',node,'°'],['ω · günberi argümanı',wrap(peri-node),'°'],['M₀ · ortalama anomali',wrap(L-peri),'°']];
      o.orbitNote='J2000.0 epoğu; Güneş merkezli, J2000 ortalama ekliptiği ve ekinoksu. JPL 1800–2050 uyum elemanları; güncel oskülatör elemanlar değildir.'+(o.id==='dunya'?' Dünya satırı Dünya–Ay kütle merkezine aittir; sıfıra çok yakın negatif i, uyum tablosunun işaretli parametresidir.':'');
    }
    o.modelNote+=' Sürükleme gözlem yönünü değiştirir; gösterim hızı fiziksel dönüş/yörünge süresi değildir.';
  }
  const by=id=>window.AstroCatalog.find(o=>o.id===id);
  by('kara-delik').technical=[['Model ve sınırlar','Akresyon diski, relativistik Doppler ışınlanması ve kütleçekimsel merceklenme. Görünen kara delik gölgesi olay ufkunun geometrik sınırıyla aynı değildir. Bu çizim tam genel görelilik ışın izleme çözümü değildir.']];
  by('orion').technical=[['H II bölgesi ve yıldız oluşumu','Trapez kümesinin morötesi fotonları gazı iyonlaştırır. Yoğun moleküler bölgelerde termal destek, türbülans ve manyetik alanlarla rekabet eden kütleçekimi çöküşe yol açabilir. Basitleştirilmiş Jeans ölçütünde M > M_J; M_J ∝ T^(3/2)ρ^(-1/2).'],['Açısal momentum','Dış tork yokken J = Iω korunur. Büzülmede eylemsizlik momenti azalır; dönme hızlanır. Gerçek protostellar diskler açısal momentumu da taşır.']];
  for(const id of ['samanyolu','andromeda'])by(id).technical=[['Galaktik yapı','Yıldız diski, merkezi şişkinlik (bulge), yıldız/gaz bileşenleri ve karanlık madde halosu. Sarmal kollar katı bir çarkın kolları gibi birlikte dönmez; bu görünüm bir morfoloji modelidir.']];
  by('pluton').modelNote='New Horizons MVIC renk mozaiği (PIA11707) küreye kaplandı. Çözünürlük konuma göre değişir. Gözlenmeyen güney bölgesi nötr gri-bej ile tamamlandı: bu alanın rengi ve ayrıntısız görünümü gözlem verisi değildir. Ortak boyut ölçeği ve gerçek zamanlı dönüş kullanılmaz.';
})();
