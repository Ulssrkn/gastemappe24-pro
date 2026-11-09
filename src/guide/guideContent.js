export const themeColors = [
  { id: 'amber', name: 'Amber Warm', bg: 'bg-amber-900', text: 'text-amber-900', bgLight: 'bg-amber-50', border: 'border-amber-900/40' },
  { id: 'emerald', name: 'Forest Emerald', bg: 'bg-emerald-800', text: 'text-emerald-800', bgLight: 'bg-emerald-50', border: 'border-emerald-800/40' },
  { id: 'indigo', name: 'Royal Indigo', bg: 'bg-indigo-900', text: 'text-indigo-900', bgLight: 'bg-indigo-50', border: 'border-indigo-900/40' },
  { id: 'rose', name: 'Rose Luxury', bg: 'bg-rose-800', text: 'text-rose-800', bgLight: 'bg-rose-50', border: 'border-rose-800/40' },
  { id: 'slate', name: 'Classic Slate', bg: 'bg-slate-900', text: 'text-slate-900', bgLight: 'bg-slate-100', border: 'border-slate-900/40' },
  { id: 'violet', name: 'Deep Violet', bg: 'bg-violet-900', text: 'text-violet-900', bgLight: 'bg-violet-50', border: 'border-violet-900/40' },
  { id: 'cyan', name: 'Ocean Cyan', bg: 'bg-cyan-800', text: 'text-cyan-800', bgLight: 'bg-cyan-50', border: 'border-cyan-800/40' },
  { id: 'orange', name: 'Sunset Orange', bg: 'bg-orange-700', text: 'text-orange-700', bgLight: 'bg-orange-50', border: 'border-orange-700/40' }
];
export const quickAccessDefaults = {
  de:{wifi:{title:'WLAN',description:'Verbinden Sie sich mit unserem Gäste-WLAN.'},parking:{title:'Parkplatz',description:'Kostenfreie Parkplätze am Haus verfügbar.'},breakfast:{title:'Frühstück',description:'Frühstückszeiten: 07:30–10:30 Uhr.'},checkin:{title:'Check-in / Check-out',description:'Check-in ab 15:00 Uhr · Check-out bis 11:00 Uhr.'}},
  en:{wifi:{title:'Wi-Fi',description:'Connect to our guest Wi-Fi.'},parking:{title:'Parking',description:'Free parking is available at the property.'},breakfast:{title:'Breakfast',description:'Breakfast hours: 07:30–10:30.'},checkin:{title:'Check-in / Check-out',description:'Check-in from 3:00 PM · Check-out until 11:00 AM.'}},
  tr:{wifi:{title:'Kablosuz İnternet',description:'Misafir Wi-Fi ağımıza bağlanabilirsiniz.'},parking:{title:'Otopark',description:'Tesisimizde ücretsiz otopark mevcuttur.'},breakfast:{title:'Kahvaltı',description:'Kahvaltı saatleri: 07:30–10:30.'},checkin:{title:'Giriş / Çıkış',description:'Giriş 15:00 itibarıyla · Çıkış 11:00’e kadar.'}},
  fr:{wifi:{title:'Wi-Fi',description:'Connectez-vous à notre Wi-Fi client.'},parking:{title:'Parking',description:'Un parking gratuit est disponible sur place.'},breakfast:{title:'Petit-déjeuner',description:'Horaires : 07h30–10h30.'},checkin:{title:'Arrivée / Départ',description:'Arrivée dès 15h · Départ avant 11h.'}},
  hr:{wifi:{title:'Wi-Fi',description:'Povežite se s našom Wi-Fi mrežom za goste.'},parking:{title:'Parkiralište',description:'Besplatno parkiralište dostupno je u sklopu objekta.'},breakfast:{title:'Doručak',description:'Vrijeme doručka: 07:30–10:30.'},checkin:{title:'Prijava / Odjava',description:'Prijava od 15:00 · Odjava do 11:00.'}},
  it:{wifi:{title:'Wi-Fi',description:'Connettiti alla nostra rete Wi-Fi per gli ospiti.'},parking:{title:'Parcheggio',description:'Parcheggio gratuito disponibile presso la struttura.'},breakfast:{title:'Colazione',description:'Orario colazione: 07:30–10:30.'},checkin:{title:'Check-in / Check-out',description:'Check-in dalle 15:00 · Check-out entro le 11:00.'}},
  es:{wifi:{title:'Wi-Fi',description:'Conéctese a nuestra red Wi-Fi para huéspedes.'},parking:{title:'Aparcamiento',description:'Hay aparcamiento gratuito en el establecimiento.'},breakfast:{title:'Desayuno',description:'Horario del desayuno: 07:30–10:30.'},checkin:{title:'Entrada / Salida',description:'Entrada desde las 15:00 · Salida hasta las 11:00.'}},
  sv:{wifi:{title:'Wi-Fi',description:'Anslut till vårt gäst-Wi-Fi.'},parking:{title:'Parkering',description:'Gratis parkering finns vid boendet.'},breakfast:{title:'Frukost',description:'Frukosttider: 07.30–10.30.'},checkin:{title:'Incheckning / Utcheckning',description:'Incheckning från 15.00 · Utcheckning senast 11.00.'}},
  no:{wifi:{title:'Wi-Fi',description:'Koble til vårt gjeste-Wi-Fi.'},parking:{title:'Parkering',description:'Gratis parkering er tilgjengelig på stedet.'},breakfast:{title:'Frokost',description:'Frokosttider: 07:30–10:30.'},checkin:{title:'Innsjekking / Utsjekking',description:'Innsjekking fra 15:00 · Utsjekking innen 11:00.'}},
  sq:{wifi:{title:'Wi-Fi',description:'Lidhu me rrjetin tonë Wi-Fi për mysafirët.'},parking:{title:'Parkim',description:'Parkim falas është i disponueshëm në ambientet tona.'},breakfast:{title:'Mëngjesi',description:'Orari i mëngjesit: 07:30–10:30.'},checkin:{title:'Hyrja / Dalja',description:'Hyrja nga ora 15:00 · Dalja deri në 11:00.'}}
};
export const emptyHotel = (name = '') => ({
  name, logoUrl: '', locationTitle: '', address: '', phone: '', email: '', website: '',
  reviewPlatform: 'google', googleReviewUrl: '', wifiSsid: '', wifiPass: '',
  publishGuestWifi: false, breakfastTime: '', checkInOut: '', parkingInfo: '',
  showWifi: false, showParking: false, showBreakfast: false, showCheckInOut: false,
  quickAccessContent: {}, themeColor: 'amber', images: [],
});
const demoLanguages = ['de', 'en', 'tr', 'fr', 'es', 'hr', 'sq', 'sv', 'nb', 'it'];
const translated = (...values) => Object.fromEntries(demoLanguages.map((language, index) => [language, values[index]]));
const demoCard = (title, description, options = {}) => ({
  titleTranslations: translated(...title),
  descriptionTranslations: translated(...description),
  ...(options.hours ? { hours: options.hours } : {}),
  ...(options.address ? { address: options.address } : {}),
  ...(options.url ? { url: options.url } : {}),
});

export const demoHotel = () => ({
  ...emptyHotel('Waldquell am Tegernsee · DEMO'),
  locationTitle: 'Tegernsee, Bayern, Deutschland',
  address: 'Tegernsee, Bayern, Deutschland',
  website: 'https://www.tegernsee.com/',
  wifiSsid: 'Waldquell_Guest',
  wifiPass: 'WALDQUELL-DEMO',
  publishGuestWifi: true,
  breakfastTime: '07:00–10:30',
  checkInOut: 'Check-in 15:00 · Check-out 11:00',
  parkingInfo: 'Kostenfreie Außenstellplätze, E-Ladestation nach Verfügbarkeit.',
  showWifi: true,
  showParking: true,
  showBreakfast: true,
  showCheckInOut: true,
  themeColor: 'emerald',
  quickAccessContent: {
    de: {
      wifi: { title: 'WLAN', description: 'Demo-Zugang: Waldquell_Guest · Passwort WALDQUELL-DEMO.' },
      parking: { title: 'Parken', description: 'Kostenfreie Außenstellplätze. Eine E-Ladestation ist nach Verfügbarkeit nutzbar.' },
      breakfast: { title: 'Frühstück', description: 'Täglich von 07:00 bis 10:30 Uhr im Seegarten.' },
      checkin: { title: 'An- und Abreise', description: 'Check-in ab 15:00 Uhr · Check-out bis 11:00 Uhr.' },
    },
    en: {
      wifi: { title: 'Wi-Fi', description: 'Demo access: Waldquell_Guest · password WALDQUELL-DEMO.' },
      parking: { title: 'Parking', description: 'Complimentary outdoor parking. EV charging is available subject to availability.' },
      breakfast: { title: 'Breakfast', description: 'Daily from 7:00 to 10:30 in the lake garden.' },
      checkin: { title: 'Arrival and departure', description: 'Check-in from 3:00 PM · check-out by 11:00 AM.' },
    },
    tr: {
      wifi: { title: 'Kablosuz internet', description: 'Demo bağlantısı: Waldquell_Guest · şifre WALDQUELL-DEMO.' },
      parking: { title: 'Otopark', description: 'Ücretsiz açık otopark. Elektrikli araç şarjı müsaitliğe bağlıdır.' },
      breakfast: { title: 'Kahvaltı', description: 'Her gün 07.00–10.30 saatleri arasında göl bahçesinde.' },
      checkin: { title: 'Giriş ve çıkış', description: 'Giriş 15.00’ten itibaren · çıkış 11.00’e kadar.' },
    },
    fr: {
      wifi: { title: 'Wi-Fi', description: 'Accès de démonstration : Waldquell_Guest · mot de passe WALDQUELL-DEMO.' },
      parking: { title: 'Parking', description: 'Parking extérieur gratuit. Borne de recharge selon disponibilité.' },
      breakfast: { title: 'Petit-déjeuner', description: 'Tous les jours de 7 h à 10 h 30 dans le jardin du lac.' },
      checkin: { title: 'Arrivée et départ', description: 'Arrivée à partir de 15 h · départ avant 11 h.' },
    },
    es: {
      wifi: { title: 'Wi-Fi', description: 'Acceso de demostración: Waldquell_Guest · contraseña WALDQUELL-DEMO.' },
      parking: { title: 'Aparcamiento', description: 'Aparcamiento exterior gratuito. Carga para vehículos eléctricos según disponibilidad.' },
      breakfast: { title: 'Desayuno', description: 'Todos los días de 7:00 a 10:30 en el jardín junto al lago.' },
      checkin: { title: 'Llegada y salida', description: 'Entrada desde las 15:00 · salida hasta las 11:00.' },
    },
    hr: {
      wifi: { title: 'Wi-Fi', description: 'Demo pristup: Waldquell_Guest · lozinka WALDQUELL-DEMO.' },
      parking: { title: 'Parkiranje', description: 'Besplatno vanjsko parkiralište. Punjenje električnih vozila ovisi o dostupnosti.' },
      breakfast: { title: 'Doručak', description: 'Svaki dan od 7:00 do 10:30 u vrtu uz jezero.' },
      checkin: { title: 'Dolazak i odlazak', description: 'Prijava od 15:00 · odjava do 11:00.' },
    },
    sq: {
      wifi: { title: 'Wi-Fi', description: 'Hyrje demo: Waldquell_Guest · fjalëkalimi WALDQUELL-DEMO.' },
      parking: { title: 'Parkim', description: 'Parkim falas në ambient të hapur. Karikimi EV varet nga disponueshmëria.' },
      breakfast: { title: 'Mëngjesi', description: 'Çdo ditë nga ora 07:00 deri në 10:30 në kopshtin pranë liqenit.' },
      checkin: { title: 'Mbërritja dhe largimi', description: 'Hyrja nga ora 15:00 · largimi deri në 11:00.' },
    },
    sv: {
      wifi: { title: 'Wi-Fi', description: 'Demotillgång: Waldquell_Guest · lösenord WALDQUELL-DEMO.' },
      parking: { title: 'Parkering', description: 'Kostnadsfri utomhusparkering. Laddning för elbil i mån av plats.' },
      breakfast: { title: 'Frukost', description: 'Varje dag kl. 07.00–10.30 i trädgården vid sjön.' },
      checkin: { title: 'Ankomst och avresa', description: 'Incheckning från 15.00 · utcheckning senast 11.00.' },
    },
    nb: {
      wifi: { title: 'Wi-Fi', description: 'Demotilgang: Waldquell_Guest · passord WALDQUELL-DEMO.' },
      parking: { title: 'Parkering', description: 'Gratis utendørs parkering. Lading av elbil etter tilgjengelighet.' },
      breakfast: { title: 'Frokost', description: 'Hver dag fra kl. 07.00 til 10.30 i hagen ved innsjøen.' },
      checkin: { title: 'Ankomst og avreise', description: 'Innsjekking fra kl. 15.00 · utsjekking innen kl. 11.00.' },
    },
    it: {
      wifi: { title: 'Wi-Fi', description: 'Accesso demo: Waldquell_Guest · password WALDQUELL-DEMO.' },
      parking: { title: 'Parcheggio', description: 'Parcheggio esterno gratuito. Ricarica per auto elettriche in base alla disponibilità.' },
      breakfast: { title: 'Colazione', description: 'Ogni giorno dalle 7:00 alle 10:30 nel giardino sul lago.' },
      checkin: { title: 'Arrivo e partenza', description: 'Check-in dalle 15:00 · check-out entro le 11:00.' },
    },
  },
  images: ['/demo/waldquell-tegernsee.png'],
});

export const normalizeHotel = (saved, name) => ({
  ...emptyHotel(name),
  ...(saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}),
  images: Array.isArray(saved?.images) ? saved.images : [],
});

export const demoCategories = [
  {
    id: 'demo-rooms',
    categoryId: 'cat_hotel',
    presetId: 'HOT_006',
    icon: 'Bed',
    fieldValues: {
      room_amenities: ['bed', 'roomSafe', 'air', 'heat', 'tv', 'smart', 'coffee', 'hair'],
      bed_types: ['king', 'queen', 'extra'],
      contentCards: [
        demoCard(
          ['Classic Doppelzimmer', 'Classic Double Room', 'Classic çift kişilik oda', 'Chambre double classique', 'Habitación doble clásica', 'Klasična dvokrevetna soba', 'Dhomë dyshe klasike', 'Klassiskt dubbelrum', 'Klassisk dobbeltrom', 'Camera doppia classica'],
          ['24 m² · Kingsize-Bett · Regendusche · Kaffee- und Teestation.', '24 m² · king-size bed · rainfall shower · coffee and tea station.', '24 m² · king size yatak · yağmur duşu · kahve ve çay köşesi.', '24 m² · lit king size · douche à effet pluie · plateau café et thé.', '24 m² · cama king · ducha efecto lluvia · rincón de café y té.', '24 m² · king size krevet · tuš s efektom kiše · kutak za kavu i čaj.', '24 m² · krevat king size · dush me shi · kënd kafeje dhe çaji.', '24 m² · king size-säng · regndusch · kaffe- och tehörna.', '24 m² · king-size-seng · regndusj · kaffe- og tekrok.', '24 m² · letto king size · doccia a pioggia · angolo caffè e tè.']
        ),
        demoCard(
          ['Panorama Junior Suite', 'Panorama Junior Suite', 'Panorama Junior Suite', 'Junior suite panoramique', 'Junior suite panorámica', 'Panorama Junior Suite', 'Junior Suite Panorama', 'Panorama Junior Suite', 'Panorama Junior Suite', 'Junior suite Panorama'],
          ['38 m² · Südbalkon · freier Blick auf die Berge · Sitzecke.', '38 m² · south-facing balcony · open mountain views · lounge area.', '38 m² · güneye bakan balkon · açık dağ manzarası · oturma alanı.', '38 m² · balcon exposé sud · vue dégagée sur les montagnes · coin salon.', '38 m² · balcón orientado al sur · vistas abiertas a la montaña · zona de estar.', '38 m² · balkon okrenut prema jugu · pogled na planine · kutak za sjedenje.', '38 m² · ballkon nga jugu · pamje e hapur e maleve · kënd ndenjeje.', '38 m² · balkong i söderläge · fri utsikt över bergen · sittgrupp.', '38 m² · sørvendt balkong · fri fjellutsikt · sittegruppe.', '38 m² · balcone esposto a sud · vista aperta sulle montagne · area salotto.']
        ),
        demoCard(
          ['Familiensuite', 'Family Suite', 'Aile süiti', 'Suite familiale', 'Suite familiar', 'Obiteljski apartman', 'Suitë familjare', 'Familjesvit', 'Familiesuite', 'Suite familiare'],
          ['46 m² · separates Schlafzimmer · Schlafsofa · Babybett auf Anfrage.', '46 m² · separate bedroom · sofa bed · cot on request.', '46 m² · ayrı yatak odası · açılır kanepe · talep üzerine bebek yatağı.', '46 m² · chambre séparée · canapé-lit · lit bébé sur demande.', '46 m² · dormitorio separado · sofá cama · cuna bajo petición.', '46 m² · odvojena spavaća soba · kauč na razvlačenje · dječji krevetić na upit.', '46 m² · dhomë gjumi më vete · divan-krevat · krevat fëmije sipas kërkesës.', '46 m² · separat sovrum · bäddsoffa · barnsäng på begäran.', '46 m² · separat soverom · sovesofa · babyseng på forespørsel.', '46 m² · camera separata · divano letto · culla su richiesta.']
        ),
      ],
    },
  },
  {
    id: 'demo-breakfast',
    categoryId: 'cat_food',
    presetId: 'FNB_001',
    icon: 'Coffee',
    fieldValues: {
      breakfast_hours: '07:00–10:30',
      breakfast_type: ['buffet', 'vegetarian', 'vegan', 'gluten'],
      contentCards: [
        demoCard(
          ['Frühstück im Seegarten', 'Breakfast in the lake garden', 'Göl bahçesinde kahvaltı', 'Petit-déjeuner au jardin du lac', 'Desayuno en el jardín del lago', 'Doručak u vrtu uz jezero', 'Mëngjes në kopshtin pranë liqenit', 'Frukost i sjöträdgården', 'Frokost i innsjøhagen', 'Colazione nel giardino sul lago'],
          ['Frisches Brot aus der Region, Obst, Käse, warme Eierspeisen sowie vegane und glutenfreie Optionen.', 'Fresh regional bread, fruit, cheese, warm egg dishes, plus vegan and gluten-free options.', 'Yöresel taze ekmek, meyve, peynir, sıcak yumurta seçenekleri ve vegan ile glutensiz alternatifler.', 'Pain frais de la région, fruits, fromages, plats aux œufs, options végétaliennes et sans gluten.', 'Pan fresco local, fruta, quesos, platos calientes de huevo y opciones veganas y sin gluten.', 'Svježi lokalni kruh, voće, sirevi, topla jela od jaja te veganske i bezglutenske opcije.', 'Bukë e freskët vendase, fruta, djathëra, vezë të ngrohta dhe mundësi vegane e pa gluten.', 'Färskt regionalt bröd, frukt, ost, varma äggrätter samt veganska och glutenfria alternativ.', 'Ferskt lokalt brød, frukt, ost, varme eggeretter og veganske og glutenfrie alternativer.', 'Pane fresco locale, frutta, formaggi, piatti caldi a base di uova e opzioni vegane e senza glutine.'],
          { hours: '07:00–10:30' }
        ),
      ],
    },
  },
  {
    id: 'demo-restaurant',
    categoryId: 'cat_food',
    presetId: 'FNB_002',
    icon: 'Utensils',
    fieldValues: {
      restaurant_hours: '12:00–21:30',
      restaurant_areas: ['indoor', 'terrace'],
      contentCards: [
        demoCard(
          ['Seestube Restaurant', 'Seestube Restaurant', 'Seestube Restoranı', 'Restaurant Seestube', 'Restaurante Seestube', 'Restoran Seestube', 'Restoranti Seestube', 'Restaurang Seestube', 'Seestube Restaurant', 'Ristorante Seestube'],
          ['Regionale Küche mit Blick auf den See. Warme Küche bis 21:00 Uhr; Tischreservierung empfohlen.', 'Regional cuisine with lake views. Hot meals until 9:00 PM; reservations recommended.', 'Göl manzaralı yöresel mutfak. Sıcak yemekler 21.00’e kadar; rezervasyon önerilir.', 'Cuisine régionale avec vue sur le lac. Cuisine chaude jusqu’à 21 h ; réservation conseillée.', 'Cocina regional con vistas al lago. Cocina caliente hasta las 21:00; se recomienda reservar.', 'Lokalna kuhinja s pogledom na jezero. Topla jela do 21:00; preporučujemo rezervaciju.', 'Kuzhinë vendase me pamje nga liqeni. Gatime të ngrohta deri në 21:00; rekomandohet rezervimi.', 'Regional mat med sjöutsikt. Varm mat till kl. 21.00; bord bokas gärna i förväg.', 'Lokal mat med utsikt over innsjøen. Varm mat til kl. 21.00; bordbestilling anbefales.', 'Cucina regionale con vista sul lago. Piatti caldi fino alle 21:00; si consiglia la prenotazione.'],
          { hours: '12:00–21:30' }
        ),
      ],
    },
  },
  {
    id: 'demo-bar',
    categoryId: 'cat_food',
    presetId: 'FNB_003',
    icon: 'Wine',
    fieldValues: {
      bar_hours: '16:00–23:00',
      contentCards: [
        demoCard(
          ['Kaminbar', 'Fireplace Bar', 'Şömine Barı', 'Bar de la cheminée', 'Bar de la chimenea', 'Bar uz kamin', 'Bar me oxhak', 'Eldstadsbar', 'Peisestue', 'Bar del camino'],
          ['Bayerische Biere, alkoholfreie Aperitifs und kleine regionale Snacks am Kamin.', 'Bavarian beers, alcohol-free aperitifs and small regional bites by the fire.', 'Şömine başında Bavyera biraları, alkolsüz aperitifler ve yöresel atıştırmalıklar.', 'Bières bavaroises, apéritifs sans alcool et petites spécialités au coin du feu.', 'Cervezas bávaras, aperitivos sin alcohol y pequeños aperitivos regionales junto al fuego.', 'Bavarska piva, bezalkoholni aperitivi i mali lokalni zalogaji uz kamin.', 'Birra bavareze, aperitivë pa alkool dhe ushqime të vogla vendase pranë zjarrit.', 'Bayerskt öl, alkoholfria aperitifer och små lokala tilltugg vid brasan.', 'Bayersk øl, alkoholfrie aperitiffer og små lokale retter ved peisen.', 'Birre bavaresi, aperitivi analcolici e piccoli assaggi locali accanto al camino.'],
          { hours: '16:00–23:00' }
        ),
      ],
    },
  },
  {
    id: 'demo-wellness',
    categoryId: 'cat_wellness',
    presetId: 'WEL_001',
    icon: 'Waves',
    fieldValues: {
      wellness_hours: '10:00–20:00',
      wellness_facilities: ['sauna', 'steam'],
      contentCards: [
        demoCard(
          ['Sauna & Dampfbad', 'Sauna & steam room', 'Sauna ve buhar odası', 'Sauna et hammam', 'Sauna y baño de vapor', 'Sauna i parna kupelj', 'Sauna dhe banjë me avull', 'Bastu och ångbad', 'Badstue og dampbad', 'Sauna e bagno turco'],
          ['Täglich 10:00–20:00. Ruhebereich mit Blick ins Grüne; Bademäntel liegen im Zimmer bereit.', 'Daily 10:00 AM–8:00 PM. Relaxation area overlooking the gardens; bathrobes are provided in your room.', 'Her gün 10.00–20.00. Bahçeye bakan dinlenme alanı; bornozlar odanızda hazır.', 'Tous les jours de 10 h à 20 h. Espace détente sur le jardin ; peignoirs fournis dans la chambre.', 'Todos los días de 10:00 a 20:00. Zona de descanso con vistas al jardín; albornoces en la habitación.', 'Svaki dan od 10:00 do 20:00. Prostor za odmor s pogledom na vrt; ogrtači su u sobi.', 'Çdo ditë 10:00–20:00. Zonë pushimi me pamje nga kopshti; rrobat e banjës gjenden në dhomë.', 'Dagligen 10.00–20.00. Vilorum med utsikt över trädgården; badrockar finns på rummet.', 'Hver dag kl. 10.00–20.00. Hvileområde med utsikt over hagen; badekåper ligger på rommet.', 'Tutti i giorni 10:00–20:00. Area relax con vista sul giardino; accappatoi in camera.'],
          { hours: '10:00–20:00' }
        ),
      ],
    },
  },
  {
    id: 'demo-leisure',
    categoryId: 'cat_leisure',
    presetId: 'FRE_002',
    icon: 'Bike',
    fieldValues: {
      tour_options: ['bikes', 'cycling'],
      contentCards: [
        demoCard(
          ['E-Bikes & Uferwege', 'E-bikes & lakeside paths', 'E-bisikletler ve göl yolları', 'Vélos électriques et chemins du lac', 'Bicicletas eléctricas y rutas junto al lago', 'E-bicikli i staze uz jezero', 'Biçikleta elektrike dhe shtigje buzë liqenit', 'Elcyklar och stigar vid sjön', 'El-sykler og stier langs innsjøen', 'E-bike e sentieri sul lago'],
          ['Leihräder nach Verfügbarkeit. Eine leichte Uferroute führt Richtung Rottach-Egern; Helme inklusive.', 'Rental bikes subject to availability. An easy lakeside route leads towards Rottach-Egern; helmets included.', 'Bisikletler müsaitliğe bağlıdır. Kolay göl rotası Rottach-Egern yönüne uzanır; kasklar dahil.', 'Vélos disponibles selon disponibilité. Itinéraire facile vers Rottach-Egern ; casques inclus.', 'Bicicletas según disponibilidad. Ruta sencilla junto al lago hacia Rottach-Egern; cascos incluidos.', 'Bicikli prema dostupnosti. Lagana staza uz jezero prema Rottach-Egernu; kacige uključene.', 'Biçikleta sipas disponueshmërisë. Rrugë e lehtë buzë liqenit drejt Rottach-Egern; helmetat përfshihen.', 'Cyklar i mån av tillgång. En lätt led längs sjön mot Rottach-Egern; hjälm ingår.', 'Sykler etter tilgjengelighet. En enkel rute langs innsjøen mot Rottach-Egern; hjelm inkludert.', 'Bici disponibili secondo disponibilità. Un facile percorso sul lago verso Rottach-Egern; caschi inclusi.'],
          { address: 'Tegernsee, Bayern' }
        ),
      ],
    },
  },
  {
    id: 'demo-sights',
    categoryId: 'cat_environment',
    presetId: 'UMG_001',
    icon: 'MapPin',
    fieldValues: {
      attraction_types: ['museum', 'nature', 'guided'],
      contentCards: [
        demoCard(
          ['Museum Tegernseer Tal', 'Museum of the Tegernsee Valley', 'Tegernsee Vadisi Müzesi', 'Musée de la vallée du Tegernsee', 'Museo del valle de Tegernsee', 'Muzej doline Tegernsee', 'Muzeu i luginës Tegernsee', 'Tegernseedalens museum', 'Tegernsee-dalens museum', 'Museo della valle del Tegernsee'],
          ['Kulturgeschichte der Region in einem historischen Pfarrhof; ein schönes Ziel für einen ruhigen Vormittag.', 'Regional history in a historic parish house; a lovely stop for a relaxed morning.', 'Tarihi bir papaz evinde bölgenin kültür tarihi; sakin bir sabah için güzel bir durak.', 'Histoire régionale dans un ancien presbytère ; une belle visite pour une matinée tranquille.', 'Historia regional en una antigua casa parroquial; una visita ideal para una mañana tranquila.', 'Povijest regije u povijesnom župnom dvoru; lijep izlet za mirno jutro.', 'Histori e rajonit në një shtëpi historike famullie; vizitë e këndshme për një mëngjes të qetë.', 'Regional kulturhistoria i ett historiskt prästgårdshus; ett fint besök en lugn förmiddag.', 'Lokalhistorie i et historisk prestegårdshus; et fint besøk en rolig formiddag.', 'Storia locale in una storica casa parrocchiale; una bella visita per una mattinata tranquilla.'],
          { address: 'Seestraße 17, 83684 Tegernsee', url: 'https://museumtegernseertal.de/' }
        ),
        demoCard(
          ['Schifffahrt Tegernsee', 'Tegernsee lake cruise', 'Tegernsee Göl Turu', 'Croisière sur le Tegernsee', 'Paseo en barco por el Tegernsee', 'Plovidba jezerom Tegernsee', 'Lundrim me varkë në liqenin Tegernsee', 'Båttur på Tegernsee', 'Båttur på Tegernsee', 'Giro in battello sul Tegernsee'],
          ['Entspannt zwischen den Uferorten fahren und See und Alpen aus einer neuen Perspektive erleben.', 'Cruise between lakeside villages and enjoy a fresh perspective on the lake and Alps.', 'Kıyı kasabaları arasında keyifli bir tur yapıp gölü ve Alpleri farklı bir açıdan görün.', 'Naviguez entre les villages et découvrez le lac et les Alpes sous un nouvel angle.', 'Navega entre pueblos ribereños y descubre el lago y los Alpes desde otra perspectiva.', 'Opušteno plovite između mjesta uz obalu i uživajte u novom pogledu na jezero i Alpe.', 'Lundroni mes fshatrave buzë liqenit dhe shijoni një pamje të re të liqenit dhe Alpeve.', 'Kryssa mellan byarna vid sjön och se sjön och Alperna från ett nytt perspektiv.', 'Cruise mellom landsbyene langs innsjøen og opplev innsjøen og Alpene fra en ny vinkel.', 'Naviga tra i borghi sul lago e scopri il lago e le Alpi da una prospettiva nuova.'],
          { address: 'Rathaussteg, 83684 Tegernsee', url: 'https://www.seenschifffahrt.de/de/tegernsee' }
        ),
        demoCard(
          ['Wallbergbahn', 'Wallberg cable car', 'Wallberg teleferiği', 'Téléphérique du Wallberg', 'Teleférico de Wallberg', 'Žičara Wallberg', 'Teleferiku i Wallbergut', 'Wallbergs linbana', 'Wallberg-taubanen', 'Funivia del Wallberg'],
          ['Mit der Seilbahn hinauf zu weiten Ausblicken über den See und die bayerischen Voralpen.', 'Ride the cable car for wide views over the lake and the Bavarian Alps.', 'Teleferikle gölün ve Bavyera Alpleri’nin geniş manzarasına çıkın.', 'Prenez le téléphérique pour admirer le lac et les Préalpes bavaroises.', 'Sube en teleférico para disfrutar de amplias vistas del lago y los Alpes bávaros.', 'Žičarom do širokog pogleda na jezero i bavarske predalpe.', 'Ngjituni me teleferik për pamje të gjera mbi liqenin dhe Alpet bavareze.', 'Ta linbanan upp för vidsträckt utsikt över sjön och de bayerska alperna.', 'Ta taubanen opp for vidstrakt utsikt over innsjøen og de bayerske Alpene.', 'Sali in funivia per ammirare il lago e le Prealpi bavaresi.'],
          { address: 'Wallbergstraße 26–28, 83700 Rottach-Egern', url: 'https://www.wallbergbahn.de/' }
        ),
      ],
    },
  },
  {
    id: 'demo-mobility',
    categoryId: 'cat_mobility',
    presetId: 'MOB_001',
    icon: 'Bus',
    fieldValues: {
      transport_types: ['bus', 'train'],
      transport_note: 'Bahnhof Tegernsee, Busse in die umliegenden Orte.',
      contentCards: [
        demoCard(
          ['Mit Bahn & Bus unterwegs', 'Getting around by train & bus', 'Tren ve otobüsle ulaşım', 'Se déplacer en train et en bus', 'Moverse en tren y autobús', 'Putovanje vlakom i autobusom', 'Lëvizja me tren dhe autobus', 'Res med tåg och buss', 'Reis med tog og buss', 'Spostarsi in treno e autobus'],
          ['Der Bahnhof Tegernsee liegt am Seeufer. Busverbindungen führen nach Rottach-Egern, Kreuth und Bad Wiessee.', 'Tegernsee station is by the lakeshore. Buses connect to Rottach-Egern, Kreuth and Bad Wiessee.', 'Tegernsee istasyonu göl kıyısındadır. Otobüsler Rottach-Egern, Kreuth ve Bad Wiessee’ye gider.', 'La gare de Tegernsee est au bord du lac. Des bus desservent Rottach-Egern, Kreuth et Bad Wiessee.', 'La estación de Tegernsee está junto al lago. Hay autobuses a Rottach-Egern, Kreuth y Bad Wiessee.', 'Kolodvor Tegernsee nalazi se uz jezero. Autobusi voze do Rottach-Egerna, Kreutha i Bad Wiesseeja.', 'Stacioni i Tegernsee është pranë liqenit. Autobusët shkojnë në Rottach-Egern, Kreuth dhe Bad Wiessee.', 'Tegernsee station ligger vid sjön. Bussar går till Rottach-Egern, Kreuth och Bad Wiessee.', 'Tegernsee stasjon ligger ved innsjøen. Busser går til Rottach-Egern, Kreuth og Bad Wiessee.', 'La stazione di Tegernsee è sul lago. Autobus per Rottach-Egern, Kreuth e Bad Wiessee.'],
          { address: 'Bahnhofplatz 5, 83684 Tegernsee' }
        ),
      ],
    },
  },
  {
    id: 'demo-service',
    categoryId: 'cat_service',
    presetId: 'SER_001',
    icon: 'Phone',
    fieldValues: {
      contact_channels: ['phone', 'email', 'reception'],
      contact_hours: '24/7',
      contentCards: [
        demoCard(
          ['Rezeption & Hilfe', 'Reception & help', 'Resepsiyon ve destek', 'Réception et assistance', 'Recepción y ayuda', 'Recepcija i pomoć', 'Recepsioni dhe ndihma', 'Reception och hjälp', 'Resepsjon og hjelp', 'Reception e assistenza'],
          ['Unser Demo-Team ist rund um die Uhr erreichbar. Für echte Betriebe lassen sich Kontakt, Telefonnummer und Servicezeiten individuell hinterlegen.', 'Our demo team is shown as available around the clock. Real properties can add their own contacts, phone number and service hours.', 'Demo ekibi örnektir ve günün her saati ulaşılabilir görünür. Gerçek işletmeler kendi iletişim, telefon ve hizmet saatlerini ekleyebilir.', 'Notre équipe de démonstration est indiquée comme disponible 24 h/24. Chaque établissement peut ajouter ses contacts et horaires.', 'El equipo de demostración figura disponible las 24 horas. Cada alojamiento puede añadir sus contactos y horarios.', 'Demo tim prikazan je kao dostupan 24 sata dnevno. Smještaji mogu unijeti vlastite kontakte i radno vrijeme.', 'Ekipi demo shfaqet i disponueshëm gjatë gjithë ditës. Çdo strukturë mund të vendosë kontaktet dhe oraret e veta.', 'Demoteamet visas som tillgängligt dygnet runt. Varje boende kan lägga in egna kontakter och tider.', 'Demoteamet vises som tilgjengelig hele døgnet. Hvert overnattingssted kan legge inn egne kontakter og tider.', 'Il team demo è indicato come disponibile 24 ore su 24. Ogni struttura può inserire i propri contatti e orari.']
        ),
      ],
    },
  },
  {
    id: 'demo-safety',
    categoryId: 'cat_safety',
    presetId: 'REG_001',
    icon: 'ShieldCheck',
    fieldValues: {
      house_rules: ['quiet', 'smokeFree'],
      rules_note: 'Ruhezeiten 22:00–07:00 · Nichtraucherbereiche im gesamten Haus.',
      contentCards: [
        demoCard(
          ['Ein gutes Miteinander', 'A comfortable stay for everyone', 'Herkes için huzurlu bir konaklama', 'Un séjour agréable pour tous', 'Una estancia agradable para todos', 'Ugodan boravak za sve', 'Qëndrim i këndshëm për të gjithë', 'En trivsam vistelse för alla', 'Et godt opphold for alle', 'Un soggiorno piacevole per tutti'],
          ['Ruhezeiten von 22:00 bis 07:00 Uhr. Das Haus ist rauchfrei; bitte sprich unser Team an, wenn du etwas brauchst.', 'Quiet hours are 10:00 PM–7:00 AM. The property is smoke-free; please contact the team if you need anything.', 'Sessizlik saatleri 22.00–07.00 arasındadır. Tesis genelinde sigara içilmez; ihtiyacınız olursa ekibimize ulaşın.', 'Heures calmes de 22 h à 7 h. L’établissement est non-fumeur ; contactez notre équipe en cas de besoin.', 'Horario de silencio de 22:00 a 7:00. Alojamiento libre de humo; contacta con el equipo si necesitas ayuda.', 'Vrijeme tišine je od 22:00 do 7:00. Objekt je nepušački; obratite se osoblju ako trebate pomoć.', 'Orari i qetësisë është 22:00–07:00. Ndalohet duhani në ambientet e hotelit; kontaktoni ekipin për ndihmë.', 'Tysta timmar är 22.00–07.00. Hela hotellet är rökfritt; kontakta personalen om du behöver hjälp.', 'Stilletid er kl. 22.00–07.00. Hele hotellet er røykfritt; kontakt personalet hvis du trenger hjelp.', 'Orario di silenzio 22:00–07:00. La struttura è non fumatori; contatta il team per qualsiasi necessità.']
        ),
      ],
    },
  },
  {
    id: 'demo-sustainability',
    categoryId: 'cat_certificates',
    presetId: 'cert_sustainability',
    icon: 'Award',
    fieldValues: {
      cert_name: 'Demo · Green Sign / Green Key',
      cert_number: 'Beispielangabe',
      contentCards: [
        demoCard(
          ['Bewusst unterwegs', 'Travel thoughtfully', 'Bilinçli konaklama', 'Voyager avec attention', 'Viajar con conciencia', 'Odgovorno putovanje', 'Udhëto me kujdes', 'Res med omtanke', 'Reis med omtanke', 'Viaggiare con consapevolezza'],
          ['Beispiel für Nachhaltigkeitsinformationen: regionale Produkte, sparsamer Wasserverbrauch und Mehrweg statt Einweg.', 'Example sustainability information: regional products, careful water use and reusable items instead of single-use.', 'Sürdürülebilirlik bilgisi örneği: yerel ürünler, ölçülü su kullanımı ve tek kullanımlık yerine tekrar kullanılabilir ürünler.', 'Exemple d’informations durables : produits régionaux, usage raisonné de l’eau et objets réutilisables.', 'Ejemplo de sostenibilidad: productos locales, ahorro de agua y artículos reutilizables en lugar de desechables.', 'Primjer održivosti: lokalni proizvodi, štedljiva potrošnja vode i višekratni proizvodi.', 'Shembull qëndrueshmërie: produkte vendase, kursim uji dhe përdorim i artikujve të ripërdorshëm.', 'Exempel på hållbarhet: regionala produkter, sparsam vattenanvändning och återanvändbara produkter.', 'Eksempel på bærekraft: lokale produkter, sparsomt vannforbruk og gjenbrukbare produkter.', 'Esempio di sostenibilità: prodotti locali, uso attento dell’acqua e articoli riutilizzabili.']
        ),
      ],
    },
  },
  {
    id: 'demo-sustainability-concept',
    categoryId: 'cat_sustainability',
    presetId: 'sustainability_concept',
    icon: 'Recycle',
    fieldValues: {
      concept_description: 'Regionale Produkte, 100 % Ökostrom und Mehrweg statt Einweg.',
      contentCards: [
        demoCard(
          ['Unser Nachhaltigkeitskonzept', 'Our sustainability approach', 'Sürdürülebilirlik yaklaşımımız', 'Notre approche durable', 'Nuestro enfoque sostenible', 'Naš pristup održivosti', 'Qasja jonë për qëndrueshmëri', 'Vårt hållbarhetsarbete', 'Vårt bærekraftsarbeid', 'Il nostro impegno per la sostenibilità'],
          ['Regionale Produkte beim Frühstück, Ökostrom im gesamten Haus und wiederverwendbare Pflegeprodukte.', 'Regional breakfast ingredients, renewable electricity throughout and refillable bathroom products.', 'Kahvaltıda yöresel ürünler, tesis genelinde yenilenebilir elektrik ve yeniden doldurulabilir banyo ürünleri.', 'Produits régionaux au petit-déjeuner, électricité renouvelable et produits de toilette rechargeables.', 'Productos locales en el desayuno, electricidad renovable y artículos de baño recargables.', 'Lokalni proizvodi za doručak, obnovljiva električna energija i punjivi proizvodi za kupaonicu.', 'Produkte vendase në mëngjes, energji e rinovueshme dhe produkte banjoje të rimbushshme.', 'Lokala frukostprodukter, förnybar el och påfyllningsbara badrumsprodukter.', 'Lokale frokostprodukter, fornybar strøm og påfyllbare baderomsprodukter.', 'Prodotti locali a colazione, elettricità rinnovabile e prodotti da bagno ricaricabili.']
        ),
      ],
    },
  },
];
