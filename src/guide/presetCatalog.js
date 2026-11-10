import { hotelPresets, additionalPresets } from '../hotelPresets.js';

export const mainCategories = [
{id:'cat_hotel',name:{de:'Hotel & Unterkunft',en:'Hotel & Accommodation',tr:'Otel ve Tesis',fr:'Hôtel & hébergement',es:'Hotel y alojamiento',cs:'Hotel a ubytování',hr:'Hotel i smještaj',sq:'Hotel dhe akomodim',sv:'Hotell och boende',nb:'Hotell og overnatting',it:'Hotel e alloggio'},icon:'Building'},
{id:'cat_food',name:{de:'Essen & Trinken',en:'Food & Drinks',tr:'Yeme & İçme',fr:'Restauration',es:'Comida y bebidas',cs:'Jídlo a nápoje',hr:'Hrana i piće',sq:'Ushqim dhe pije',sv:'Mat och dryck',nb:'Mat og drikke',it:'Cibo e bevande'},icon:'Utensils'},
{id:'cat_wellness',name:{de:'Wellness & Spa',en:'Wellness & Spa',tr:'Wellness & Spa',fr:'Bien-être & spa',es:'Bienestar y spa',cs:'Wellness a spa',hr:'Wellness i spa',sq:'Wellness dhe spa',sv:'Wellness och spa',nb:'Velvære og spa',it:'Benessere e spa'},icon:'Sparkles'},
{id:'cat_leisure',name:{de:'Freizeit & Aktivitäten',en:'Leisure & Activities',tr:'Boş Zaman & Aktiviteler',fr:'Loisirs & activités',es:'Ocio y actividades',cs:'Volný čas a aktivity',hr:'Slobodno vrijeme i aktivnosti',sq:'Kohë e lirë dhe aktivitete',sv:'Fritid och aktiviteter',nb:'Fritid og aktiviteter',it:'Tempo libero e attività'},icon:'Compass'},
{id:'cat_environment',name:{de:'Umgebung & Ausflüge',en:'Area & Excursions',tr:'Çevre & Geziler',fr:'Environs & excursions',es:'Entorno y excursiones',cs:'Okolí a výlety',hr:'Okolica i izleti',sq:'Rrethina dhe ekskursione',sv:'Område och utflykter',nb:'Område og utflukter',it:'Dintorni ed escursioni'},icon:'MapPin'},
{id:'cat_mobility',name:{de:'Anreise & Mobilität',en:'Arrival & Mobility',tr:'Ulaşım & Mobilite',fr:'Arrivée & mobilité',es:'Llegada y movilidad',cs:'Příjezd a mobilita',hr:'Dolazak i mobilnost',sq:'Mbërritja dhe lëvizshmëria',sv:'Ankomst och mobilitet',nb:'Ankomst og mobilitet',it:'Arrivo e mobilità'},icon:'Car'},
{id:'cat_service',name:{de:'Service & Informationen',en:'Service & Information',tr:'Hizmet & Bilgiler',fr:'Services & informations',es:'Servicios e información',cs:'Služby a informace',hr:'Usluge i informacije',sq:'Shërbime dhe informacione',sv:'Service och information',nb:'Service og informasjon',it:'Servizi e informazioni'},icon:'Phone'},
{id:'cat_safety',name:{de:'Regeln & Sicherheit',en:'Rules & Safety',tr:'Kurallar & Güvenlik',fr:'Règles & sécurité',es:'Normas y seguridad',cs:'Pravidla a bezpečnost',hr:'Pravila i sigurnost',sq:'Rregulla dhe siguria',sv:'Regler och säkerhet',nb:'Regler og sikkerhet',it:'Regole e sicurezza'},icon:'ShieldCheck'}
];

// --- EKSİKSİZ PRESET HAVUZU (TÜM KATEGORİLER DOLU) ---
const legacyCategoryPresets = [
  // HOTEL & UNTERKUNFT
  { id: 'hotel_info', categoryId: 'cat_hotel', icon: 'Building', title: { de: 'Hotelinformationen', en: 'Hotel Information', tr: 'Otel Bilgileri', fr: "Informations hôtel", hr: 'Informacije o hotelu' }, schema: [
    { key: 'reception_hours', type: 'text', label: { de: 'Rezeptionszeiten', en: 'Reception Hours', tr: 'Resepsiyon Saatleri', fr: 'Horaires réception', hr: 'Radno vrijeme recepcije' }, default: '07:00 - 22:00 Uhr', primary: true },
    { key: 'emergency_phone', type: 'text', label: { de: 'Notfallnummer', en: 'Emergency Phone', tr: 'Acil Durum Telefonu', fr: "Numéro d'urgence", hr: 'Broj za hitne slučajeve' }, default: '+49 123 456789', primary: true },
    { key: 'multilingual_staff', type: 'boolean', label: { de: 'Mehrsprachiges Personal', en: 'Multilingual Staff', tr: 'Çok Dilli Personel', fr: 'Personnel multilingue', hr: 'Višejezično osoblje' }, default: true, primary: true }
  ]},
  { id: 'room_info', categoryId: 'cat_hotel', icon: 'Bed', title: hotelPresets.find(p => p.id === 'HOT_006').title, schema: hotelPresets.find(p => p.id === 'HOT_006').schema },
  { id: 'sleep_comfort', categoryId: 'cat_hotel', icon: 'Bed', title: { de: 'Schlafkomfort', en: 'Sleep Comfort', tr: 'Uyku Konforu', fr: 'Confort du sommeil', hr: 'Udobnost spavanja' }, schema: [
    { key: 'pillow_menu', type: 'boolean', label: { de: 'Kissenmenü verfügbar', en: 'Pillows Menu Available', tr: 'Yastık Menüsü Mevcut', fr: 'Menu d\'oreillers', hr: 'Meni jastuka' }, default: true, primary: true },
    { key: 'mattress_type', type: 'text', label: { de: 'Matratzenart', en: 'Mattress Type', tr: 'Yatak Tipi', fr: 'Type de matelas', hr: 'Vrsta madraca' }, default: 'Orthopädisch / Premium', primary: true }
  ]},
  { id: 'wifi_internet', categoryId: 'cat_hotel', icon: 'Wifi', title: { de: 'WLAN & Internet', en: 'WiFi & Internet', tr: 'WLAN & İnternet', fr: 'Wi-Fi & Internet', hr: 'Wi-Fi i internet' }, schema: [
    { key: 'wifi_available', type: 'boolean', label: { de: 'WLAN verfügbar', en: 'WiFi Available', tr: 'WLAN Mevcut', fr: 'Wi-Fi disponible', hr: 'Wi-Fi dostupan' }, default: true, primary: true },
    { key: 'network_name', type: 'text', label: { de: 'Netzwerkname (SSID)', en: 'Network Name (SSID)', tr: 'Ağ Adı (SSID)', fr: 'Nom du réseau (SSID)', hr: 'Naziv mreže (SSID)' }, default: 'Hotel-Guest-WiFi', primary: true },
    { key: 'wifi_password', type: 'text', label: { de: 'Passwort', en: 'Password', tr: 'Şifre', fr: 'Mot de passe', hr: 'Lozinka' }, default: '', primary: true }
  ]},

  // ESSEN & TRINKEN
  { id: 'breakfast', categoryId: 'cat_food', icon: 'Coffee', title: { de: 'Frühstück', en: 'Breakfast', tr: 'Kahvaltı', fr: 'Petit-déjeuner', hr: 'Doručak' }, schema: [
    { key: 'breakfast_hours', type: 'text', label: { de: 'Frühstückszeiten', en: 'Breakfast Hours', tr: 'Kahvaltı Saatleri', fr: 'Horaires', hr: 'Vrijeme doručka' }, default: '07:00 - 10:30 Uhr', primary: true },
    { key: 'breakfast_type', type: 'select', label: { de: 'Frühstücksart', en: 'Breakfast Type', tr: 'Kahvaltı Türü', fr: 'Type', hr: 'Vrsta' }, options: ['Reichhaltiges Buffet', 'Kontinental', 'À la carte'], default: 'Reichhaltiges Buffet', primary: true }
  ]},
  { id: 'restaurant_bar', categoryId: 'cat_food', icon: 'Utensils', title: { de: 'Restaurant & Bar', en: 'Restaurant & Bar', tr: 'Restoran & Bar', fr: 'Restaurant & Bar', hr: 'Restoran i bar' }, schema: [
    { key: 'opening_hours', type: 'text', label: { de: 'Öffnungszeiten', en: 'Opening Hours', tr: 'Çalışma Saatleri', fr: 'Horaires', hr: 'Radno vrijeme' }, default: '12:00 - 23:00 Uhr', primary: true },
    { key: 'kitchen_warm', type: 'text', label: { de: 'Warme Küche bis', en: 'Hot food until', tr: 'Sıcak Yemek Bitiş', fr: 'Cuisine chaude jusqu\'à', hr: 'Topla kuhinja do' }, default: '21:30 Uhr', primary: false }
  ]},

  // NACHHALTIGKEIT & UMWELT
  { id: 'sustainability_concept', categoryId: 'cat_sustainability', icon: 'Recycle', title: { de: 'Nachhaltigkeitskonzept', en: 'Sustainability Concept', tr: 'Sürdürülebilirlik Konsepti', fr: 'Concept durable', hr: 'Održivost' }, schema: [
    { key: 'concept_description', type: 'text', label: { de: 'Kurzbeschreibung', en: 'Short Description', tr: 'Kısa Açıklama', fr: 'Description', hr: 'Opis' }, default: 'Wir setzen auf 100% Ökostrom und vermeiden Einwegplastik.', primary: true }
  ]},

  // ZERTIFIKATE & AUSZEICHNUNGEN
  { id: 'cert_sustainability', categoryId: 'cat_certificates', icon: 'Award', title: { de: 'Nachhaltigkeitszertifikate', en: 'Sustainability Certificates', tr: 'Sürdürülebilirlik Sertifikaları', fr: 'Certificats', hr: 'Certifikati' }, schema: [
    { key: 'cert_name', type: 'text', label: { de: 'Zertifikat Name', en: 'Certificate Name', tr: 'Sertifika Adı', fr: 'Nom', hr: 'Naziv' }, default: 'Green Sign / Green Key', primary: true },
    { key: 'cert_number', type: 'text', label: { de: 'Zertifikatsnummer', en: 'Certificate Number', tr: 'Sertifika No', fr: 'Numéro', hr: 'Broj' }, default: 'GK-2026-9876', primary: false }
  ]},

  // WELLNESS & SPA
  { id: 'wellness_spa', categoryId: 'cat_wellness', icon: 'Sparkles', title: { de: 'Wellness & Sauna', en: 'Wellness & Sauna', tr: 'Wellness & Sauna', fr: 'Wellness & Sauna', hr: 'Wellness i sauna' }, schema: [
    { key: 'spa_hours', type: 'text', label: { de: 'Öffnungszeiten Sauna', en: 'Sauna Hours', tr: 'Sauna Çalışma Saatleri', fr: 'Horaires sauna', hr: 'Radno vrijeme saune' }, default: '10:00 - 20:00 Uhr', primary: true },
    { key: 'bathrobe_service', type: 'boolean', label: { de: 'Bademantelservice auf Zimmer', en: 'Bathrobe Service', tr: 'Odalarda Bademantel Hizmeti', fr: 'Service de peignoir', hr: 'Usluga ogrtača' }, default: true, primary: true }
  ]},

  // FREIZEIT & AKTIVITÄTEN
  { id: 'leisure_activities', categoryId: 'cat_leisure', icon: 'Compass', title: { de: 'Freizeit & Ausflugsziele', en: 'Leisure & Excursions', tr: 'Eğlence & Gezilecek Yerler', fr: 'Loisirs', hr: 'Slobodno vrijeme' }, schema: [
    { key: 'bike_rental', type: 'boolean', label: { de: 'Fahrradverleih im Haus', en: 'Bike Rental Available', tr: 'Bisiklet Kiralama', fr: 'Location de vélos', hr: 'Najam bicikala' }, default: true, primary: true },
    { key: 'hiking_tips', type: 'text', label: { de: 'Wandertipps Region', en: 'Hiking Tips', tr: 'Yürüyüş Rotaları Önerisi', fr: 'Conseils rando', hr: 'Pješačke staze' }, default: 'Direktstart ab Hoteleingang in die Weinberge.', primary: false }
  ]},

  // ANREISE & MOBILITÄT
  { id: 'arrival_mobility', categoryId: 'cat_mobility', icon: 'Car', title: { de: 'Anreise & Parken', en: 'Arrival & Parking', tr: 'Ulaşım & Otopark', fr: 'Arrivée & Parking', hr: 'Dolazak i parking' }, schema: [
    { key: 'charging_station', type: 'boolean', label: { de: 'E-Ladestation vorhanden', en: 'EV Charging Station', tr: 'Elektrikli Araç Şarj İstasyonu', fr: 'Bornes de recharge EV', hr: 'Punionica za električna vozila' }, default: true, primary: true },
    { key: 'public_transport', type: 'text', label: { de: 'Öffentliche Verkehrsmittel', en: 'Public Transport', tr: 'Toplu Taşıma Bilgisi', fr: 'Transport en commun', hr: 'Javni prijevoz' }, default: 'Bahnhof in 500m Entfernung (Buslinie 501)', primary: false }
  ]},

  // SERVICE & INFORMATIONEN
  { id: 'service_info', categoryId: 'cat_service', icon: 'Phone', title: { de: 'Wichtige Services', en: 'Important Services', tr: 'Önemli Servisler', fr: 'Services', hr: 'Usluge' }, schema: [
    { key: 'laundry_service', type: 'boolean', label: { de: 'Wäscheservice / Reinigung', en: 'Laundry Service', tr: 'Çamaşırhane / Kuru Temizleme', fr: 'Service de blanchisserie', hr: 'Usluga pranja rublja' }, default: true, primary: true },
    { key: 'luggage_storage', type: 'boolean', label: { de: 'Gepäckaufbewahrung', en: 'Luggage Storage', tr: 'Emanet Bagaj Odası', fr: 'Bagagerie', hr: 'Skladištenje prtljage' }, default: true, primary: true }
  ]},

  // REGELN & SICHERHEIT
  { id: 'rules_safety', categoryId: 'cat_safety', icon: 'ShieldCheck', title: { de: 'Hausordnung & Sicherheit', en: 'House Rules & Safety', tr: 'Otel Kuralları & Güvenlik', fr: 'Règlement & Sécurité', hr: 'Pravila kuće i sigurnost' }, schema: [
    { key: 'smoking_policy', type: 'boolean', label: { de: 'Nichtraucherhotel (Rauchverbot in Zimmern)', en: 'Non-smoking Hotel', tr: 'Sigara İçilmeyen Tesis', fr: 'Hôtel non-fumeur', hr: 'Hotel nepušača' }, default: true, primary: true },
    { key: 'pet_policy', type: 'boolean', label: { de: 'Haustiere erlaubt', en: 'Pets Allowed', tr: 'Evcil Hayvan Kabul Edilir', fr: 'Animaux acceptés', hr: 'Kućni ljubimci dozvoljeni' }, default: false, primary: true }
  ]}
];

export const categoryPresets = [...legacyCategoryPresets, ...hotelPresets, ...additionalPresets];
