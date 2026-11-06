import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Scroll, Save, Eye, EyeOff, Palette, TrendingUp, Users, Activity, HelpCircle
} from 'lucide-react';

const supabaseUrl = 'https://YOUR-SUPABASE-URL.supabase.co';
const supabaseAnonKey = 'YOUR-SUPABASE-ANON-KEY';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const translations = {
  de: {
    welcomeBadge: "Digitale Gästemappe",
    welcomeButton: "Los geht's",
    greetingHello: "Hallo,",
    greetingWelcome: "schön dass du da bist.",
    navHome: "Home",
    navGaestemappe: "Gästemappe",
    navReview: "Bewerten",
    navRoute: "Anfahrt",
    weatherTitle: "Heiter",
    weatherSub: "Aktuelles Wetter vor Ort",
    wlanTitle: "WLAN",
    parkingTitle: "Parkplatz",
    breakfastTitle: "Frühstück",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Zurück zur Übersicht",
    adminTitle: "Verwaltung & Analytik (Dashboard)",
    guestViewBtn: "Gastansicht öffnen",
    saveBtn: "Änderungen speichern",
    savedMsg: "Gespeichert!",
    trialTitle: "30-Tage Testversion (PRO)",
    trialDaysLeft: "Tage verbleibend",
    statsScans: "QR-Code Scans (Gesamt)",
    statsActiveRooms: "Aktive Zimmer-Zugriffe",
    statsTopCategory: "Beliebteste Kategorie",
    statsPeakTime: "Besuchs-Spitzenzeit",
    qrTitle: "QR-Code & Print-Center",
    printA4: "Druckvorlage A4",
    printA5: "Druckvorlage A5",
    printCard: "Visitenkarte",
    sec1Title: "1. Unterkunft Informationen & Kontaktdaten",
    sec2Title: "2. Design & Farb-Themen (8 Optionen)",
    sec3Title: "3. Logo hochladen",
    sec4Title: "4. Bilderverwaltung (Slider)",
    sec5Title: "5. Schnellzugriff (Aktivieren / Deaktivieren)",
    sec6Title: "6. Gästemappe Kategorien (Dinamik Preset System)",
    lblHotelName: "Unterkunft Name",
    lblPhone: "Telefon",
    lblEmailField: "E-Mail",
    lblAddress: "Adresse",
    lblWebsite: "Webseite",
    lblGoogleReview: "Google Review Link",
    lblWifiSsid: "WLAN SSID",
    lblWifiPass: "WLAN Passwort",
    lblBreakfastTime: "Frühstückszeiten",
    lblCheckInOut: "Check-in / Check-out Infos",
    lblParkingInfo: "Parkplatz Info",
    btnLogoUpload: "Logo Wählen / Ändern",
    btnAddCategory: "Kategorie aus Katalog hinzufügen",
    modalTitle: "Katalog: Kategorie & Inhaltsvorlage auswählen",
    addBtn: "Hinzufügen",
    editTitle: "Name / Titel",
    customTextWarning: "⚠️ Dieser eigene Text wird für alle 10 Sprachen unverändert übernommen (keine automatische Übersetzung).",
    activeCard: "Karte anzeigen",
    inactiveCard: "Karte ausblenden"
  },
  en: {
    welcomeBadge: "Digital Guest Directory",
    welcomeButton: "Let's go",
    greetingHello: "Hello,",
    greetingWelcome: "glad you're here.",
    navHome: "Home",
    navGaestemappe: "Directory",
    navReview: "Review",
    navRoute: "Route",
    weatherTitle: "Sunny",
    weatherSub: "Current local weather",
    wlanTitle: "WiFi",
    parkingTitle: "Parking",
    breakfastTitle: "Breakfast",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Back to Overview",
    adminTitle: "Management & Analytics (Dashboard)",
    guestViewBtn: "Open Guest View",
    saveBtn: "Save Changes",
    savedMsg: "Saved!",
    trialTitle: "30-Day Trial (PRO)",
    trialDaysLeft: "Days remaining",
    statsScans: "QR Code Scans (Total)",
    statsActiveRooms: "Active Room Access",
    statsTopCategory: "Top Category",
    statsPeakTime: "Peak Hours",
    qrTitle: "QR Code & Print Center",
    printA4: "Print Template A4",
    printA5: "Print Template A5",
    printCard: "Business Card",
    sec1Title: "1. Property Information & Contacts",
    sec2Title: "2. Design & Color Themes (8 Options)",
    sec3Title: "3. Upload Logo",
    sec4Title: "4. Image Management (Slider)",
    sec5Title: "5. Quick Access (Enable / Disable Cards)",
    sec6Title: "6. Directory Categories (Dynamic Preset System)",
    lblHotelName: "Property Name",
    lblPhone: "Phone",
    lblEmailField: "E-Mail",
    lblAddress: "Address",
    lblWebsite: "Website",
    lblGoogleReview: "Google Review Link",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "WiFi Password",
    lblBreakfastTime: "Breakfast Hours",
    lblCheckInOut: "Check-in / Check-out Info",
    lblParkingInfo: "Parking Info",
    btnLogoUpload: "Select / Change Logo",
    btnAddCategory: "Add Category from Catalog",
    modalTitle: "Catalog: Select Category & Preset Template",
    addBtn: "Add",
    editTitle: "Name / Title",
    customTextWarning: "⚠️ This custom text is kept as-is across all 10 languages (no automatic translation).",
    activeCard: "Show Card",
    inactiveCard: "Hide Card"
  },
  tr: {
    welcomeBadge: "Dijital Misafir Rehberi",
    welcomeButton: "Başlayalım",
    greetingHello: "Merhaba,",
    greetingWelcome: "hoş geldiniz, iyi ki buradasınız.",
    navHome: "Ana Sayfa",
    navGaestemappe: "Rehber",
    navReview: "Değerlendir",
    navRoute: "Yol Tarifi",
    weatherTitle: "Güneşli",
    weatherSub: "Güncel Konum Havası",
    wlanTitle: "WLAN",
    parkingTitle: "Otopark",
    breakfastTitle: "Kahvaltı",
    checkInOutTitle: "Giriş / Çıkış",
    detailBack: "Geri Dön",
    adminTitle: "Yönetim Paneli & Analitik (Dashboard)",
    guestViewBtn: "Misafir Görünümünü Aç",
    saveBtn: "Değişiklikleri Kaydet",
    savedMsg: "Kaydedildi!",
    trialTitle: "30 Günlük Deneme (PRO)",
    trialDaysLeft: "Gün kaldı",
    statsScans: "QR Kod Taramaları (Toplam)",
    statsActiveRooms: "Aktif Oda Erişimi",
    statsTopCategory: "En Çok Tıklanan Kategori",
    statsPeakTime: "Yoğun Kullanım Saati",
    qrTitle: "QR Kod & Baskı Merkezi",
    printA4: "A4 Baskı Şablonu",
    printA5: "A5 Baskı Şablonu",
    printCard: "Kartvizit Şablonu",
    sec1Title: "1. Tesis Bilgileri & İletişim",
    sec2Title: "2. Renk Temaları (8 Seçenek)",
    sec3Title: "3. Logo Yükleme",
    sec4Title: "4. Resim Yönetimi (Slider)",
    sec5Title: "5. Hızlı Erişim (Kartları Aç / Kapat)",
    sec6Title: "6. Rehber Kategorileri (Dinamik Preset Mapping)",
    lblHotelName: "Tesis / Otel Adı",
    lblPhone: "Telefon",
    lblEmailField: "E-Posta",
    lblAddress: "Adres",
    lblWebsite: "Web Sitesi",
    lblGoogleReview: "Google Yorum Linki",
    lblWifiSsid: "WiFi Ağ Adı (SSID)",
    lblWifiPass: "WiFi Şifresi",
    lblBreakfastTime: "Kahvaltı Saatleri",
    lblCheckInOut: "Giriş / Çıkış Bilgileri",
    lblParkingInfo: "Otopark Bilgisi",
    btnLogoUpload: "Logo Seç / Değiştir",
    btnAddCategory: "Katalogdan Kategori Ekle",
    modalTitle: "Katalog: Kategori ve İçerik Şablonu Seçin",
    addBtn: "Ekle",
    editTitle: "İsim / Başlık",
    customTextWarning: "⚠️ Bu özel metin 10 dilde de aynı kalacaktır (otomatik çeviri yapılmaz).",
    activeCard: "Kartı Göster",
    inactiveCard: "Kartı Gizle"
  }
};

const themeColors = [
  { id: 'amber', name: 'Amber Warm', bg: 'bg-amber-900', text: 'text-amber-900', bgLight: 'bg-amber-50', border: 'border-amber-900/40', hex: '#78350f' },
  { id: 'emerald', name: 'Forest Emerald', bg: 'bg-emerald-800', text: 'text-emerald-800', bgLight: 'bg-emerald-50', border: 'border-emerald-800/40', hex: '#065f46' },
  { id: 'indigo', name: 'Royal Indigo', bg: 'bg-indigo-900', text: 'text-indigo-900', bgLight: 'bg-indigo-50', border: 'border-indigo-900/40', hex: '#312e81' },
  { id: 'rose', name: 'Rose Luxury', bg: 'bg-rose-800', text: 'text-rose-800', bgLight: 'bg-rose-50', border: 'border-rose-800/40', hex: '#9f1239' },
  { id: 'slate', name: 'Classic Slate', bg: 'bg-slate-900', text: 'text-slate-900', bgLight: 'bg-slate-100', border: 'border-slate-900/40', hex: '#0f172a' },
  { id: 'violet', name: 'Deep Violet', bg: 'bg-violet-900', text: 'text-violet-900', bgLight: 'bg-violet-50', border: 'border-violet-900/40', hex: '#581c87' },
  { id: 'cyan', name: 'Ocean Cyan', bg: 'bg-cyan-800', text: 'text-cyan-800', bgLight: 'bg-cyan-50', border: 'border-cyan-800/40', hex: '#155e75' },
  { id: 'orange', name: 'Sunset Orange', bg: 'bg-orange-700', text: 'text-orange-700', bgLight: 'bg-orange-50', border: 'border-orange-700/40', hex: '#c2410c' }
];

// DİNAMİK PRESET MAPPING SİSTEMİ (İstediğin 8 Ana Grup ve Özel Alan Haritalamaları)
const categoryPresets = [
  // 1. 🏨 Hotel & Unterkunft
  { 
    id: 'hotel_info', 
    group: '🏨 Hotel & Unterkunft', 
    title: { de: 'Hotelinformationen', en: 'Hotel Information', tr: 'Otel Bilgileri' }, 
    subtitle: { de: 'Rezeption & Erreichbarkeit', en: 'Reception & Access', tr: 'Resepsiyon ve Ulaşılabilirlik' },
    fieldsType: 'rezeption',
    features: ['24h Rezeption', 'Gepäckaufbewahrung', 'Aufzug', 'Mehrsprachiges Personal'],
    icon: 'Building' 
  },
  { 
    id: 'wifi_internet', 
    group: '🏨 Hotel & Unterkunft', 
    title: { de: 'WLAN & Internet', en: 'WiFi & Internet', tr: 'WLAN ve İnternet' }, 
    subtitle: { de: 'Zugangsdaten & Highspeed', en: 'Credentials & Highspeed', tr: 'Giriş Bilgileri ve Yüksek Hız' },
    fieldsType: 'wifi',
    features: ['Kostenloses WLAN', 'Im gesamten Hotel', 'Highspeed Glasfaser', 'Passwort erforderlich'],
    icon: 'Wifi' 
  },
  { 
    id: 'checkin_checkout', 
    group: '🏨 Hotel & Unterkunft', 
    title: { de: 'Check-in & Check-out', en: 'Check-in & Check-out', tr: 'Giriş ve Çıkış Saatleri' }, 
    subtitle: { de: 'Zeiten & Express Abwicklung', en: 'Times & Express Departure', tr: 'Saatler ve Hızlı Çıkış' },
    fieldsType: 'checkinout',
    features: ['Express Check-out', 'Schlüsselabgabe an Rezeption', 'Gepäckaufbewahrung bei Abreise', 'Late Check-out auf Anfrage'],
    icon: 'Clock' 
  },
  { 
    id: 'room_info', 
    group: '🏨 Hotel & Unterkunft', 
    title: { de: 'Zimmerinformationen', en: 'Room Information', tr: 'Oda Bilgileri' }, 
    subtitle: { de: 'Klimaanlage, Safe & TV', en: 'AC, Safe & TV', tr: 'Klima, Kasa ve TV' },
    fieldsType: 'room',
    features: ['Zimmersafe', 'Klimaanlage', 'Flachbild-TV', 'Haartrockner', 'Wasserkocher', 'Nichtraucherzimmer'],
    icon: 'Bed' 
  },
  { 
    id: 'house_rules', 
    group: '🏨 Hotel & Unterkunft', 
    title: { de: 'Hausordnung', en: 'House Rules', tr: 'Ev Kuralları' }, 
    subtitle: { de: 'Ruhezeiten & Richtlinien', en: 'Quiet Hours & Policies', tr: 'Sessizlik Saatleri ve Kurallar' },
    fieldsType: 'houserules',
    features: ['Nachtruhe ab 22:00 Uhr', '100% Nichtraucherhotel', 'Keine Partys gestattet'],
    icon: 'ShieldCheck' 
  },

  // 2. 🍽️ Essen & Trinken
  { 
    id: 'fruehstueck', 
    group: '🍽️ Essen & Trinken', 
    title: { de: 'Frühstück', en: 'Breakfast', tr: 'Kahvaltı' }, 
    subtitle: { de: 'Zeiten & Buffetangebot', en: 'Hours & Buffet Menu', tr: 'Saatler ve Açık Büfe' },
    fieldsType: 'dining',
    features: ['Reichhaltiges Buffet', 'Bio-Produkte', 'Glutenfreie Optionen', 'Vegan & Laktosefrei', 'Kaffee inklusive'],
    icon: 'Coffee' 
  },
  { 
    id: 'restaurant', 
    group: '🍽️ Essen & Trinken', 
    title: { de: 'Restaurant', en: 'Restaurant', tr: 'Restoran' }, 
    subtitle: { de: 'Speisekarte & Küchenzeiten', en: 'Menu & Kitchen Hours', tr: 'Menü ve Mutfak Saatleri' },
    fieldsType: 'dining',
    features: ['À la carte', 'Regionale Küche', 'Saisonale Spezialitäten', 'Kindergerichte', 'Außenterrasse'],
    icon: 'Utensils' 
  },
  { 
    id: 'bar_lounge', 
    group: '🍽️ Essen & Trinken', 
    title: { de: 'Bar & Lounge', en: 'Bar & Lounge', tr: 'Bar ve Lounge' }, 
    subtitle: { de: 'Cocktails & Abendausklang', en: 'Cocktails & Evening Lounge', tr: 'Kokteyller ve Gece İçecekleri' },
    fieldsType: 'dining',
    features: ['Cocktailkarte', 'Lokale Weine', 'Snacks', 'Hintergrundmusik'],
    icon: 'Wine' 
  },

  // 3. 🧖 Wellness & Spa
  { 
    id: 'pool_aqua', 
    group: '🧖 Wellness & Spa', 
    title: { de: 'Pool & Aqua', en: 'Pool & Aqua Area', tr: 'Havuz ve Aqua' }, 
    subtitle: { de: 'Beheizter Pool & Liegen', en: 'Heated Pool & Sunbeds', tr: 'Isıtmalı Havuz ve Şezlonglar' },
    fieldsType: 'generic_hours',
    features: ['Beheizter Indoor-Pool', 'Outdoor Sunbeds', 'Pool-Handtücher inklusive', 'Kinderbecken'],
    icon: 'Waves' 
  },
  { 
    id: 'sauna_spa', 
    group: '🧖 Wellness & Spa', 
    title: { de: 'Sauna & Spa', en: 'Sauna & Spa', tr: 'Sauna ve Spa' }, 
    subtitle: { de: 'Finnische Sauna & Dampfbad', en: 'Finnish Sauna & Steam Room', tr: 'Fin Saunası ve Buhar Odası' },
    fieldsType: 'generic_hours',
    features: ['Finnische Sauna', 'Bio-Sauna', 'Dampfbad', 'Ruheraum mit Teebar'],
    icon: 'Sparkles' 
  },
  { 
    id: 'fitness', 
    group: '🧖 Wellness & Spa', 
    title: { de: 'Fitness Center', en: 'Fitness Center', tr: 'Fitness Merkezi' }, 
    subtitle: { de: 'Geräte & Öffnungszeiten', en: 'Equipment & Hours', tr: 'Ekipmanlar ve Çalışma Saatleri' },
    fieldsType: 'generic_hours',
    features: ['Cardio-Geräte', 'Hantelbereich', 'Yogamatten', '24/7 Zugang'],
    icon: 'Dumbbell' 
  },

  // 4. 🎯 Freizeit & Aktivitäten
  { 
    id: 'fahrradverleih', 
    group: '🎯 Freizeit & Aktivitäten', 
    title: { de: 'Fahrradverleih', en: 'Bike Rental', tr: 'Bisiklet Kiralama' }, 
    subtitle: { de: 'E-Bikes & Touren', en: 'E-Bikes & Routes', tr: 'E-Bisiklet ve Rotalar' },
    fieldsType: 'rental',
    features: ['E-Bikes verfūgbar', 'Trekkingbikes', 'Helmverleih inklusive', 'Radwanderkarten'],
    icon: 'Compass' 
  },

  // 5. 📍 Umgebung & Ausflüge
  { 
    id: 'sehenswuerdigkeiten', 
    group: '📍 Umgebung & Ausflüge', 
    title: { de: 'Sehenswürdigkeiten', en: 'Attractions', tr: 'Görülecek Yerler' }, 
    subtitle: { de: 'Highlights & Altstadt', en: 'Highlights & Old Town', tr: 'Bölgesel Görülecek Yerler' },
    fieldsType: 'generic_info',
    features: ['Historische Altstadt', 'Wanderwege', 'Weinberge', 'Stadtpläne an Rezeption'],
    icon: 'MapPin' 
  },

  // 6. 🚗 Anreise & Mobilität
  { 
    id: 'parkplatz_ev', 
    group: '🚗 Anreise & Mobilität', 
    title: { de: 'Parkplatz & E-Laden', en: 'Parking & EV Charging', tr: 'Otopark ve Şarj' }, 
    subtitle: { de: 'Stellplätze & Ladestation', en: 'Spaces & Charger', tr: 'Park Yerleri ve Şarj İstasyonu' },
    fieldsType: 'parking',
    features: ['Kostenfreie Parkplätze', 'Tiefgarage', 'E-Ladesäule 22kW', 'Motorrad-Stellplätze'],
    icon: 'Car' 
  },

  // 7. ℹ️ Service & Informationen
  { 
    id: 'rezeption_service', 
    group: 'ℹ️ Service & Informationen', 
    title: { de: 'Rezeption & Service', en: 'Reception Service', tr: 'Resepsiyon ve Hizmetler' }, 
    subtitle: { de: 'Wäsche, Taxi & Weckruf', en: 'Laundry, Taxi & Alarm', tr: 'Çamaşır, Taksi ve Uyandırma' },
    fieldsType: 'rezeption',
    features: ['Weckdienst', 'Wäscheservice', 'Taxi-Rufservice', 'Ticket-Druckservice'],
    icon: 'Phone' 
  },

  // 8. 📋 Regeln & Sicherheit
  { 
    id: 'sicherheit_notfall', 
    group: '📋 Regeln & Sicherheit', 
    title: { de: 'Sicherheit & Notfall', en: 'Safety & Emergency', tr: 'Güvenlik ve Acil Durum' }, 
    subtitle: { de: 'Notruf & Brandschutz', en: 'Emergency Contacts & Fire Safety', tr: 'Acil Numaralar ve Yangın Güvenliği' },
    fieldsType: 'emergency',
    features: ['24/7 Notfalltelefon', 'Feuerlöscher auf allen Etagen', 'Erste-Hilfe-Kasten an Rezeption'],
    icon: 'ShieldCheck' 
  }
];

const renderSafeIcon = (iconName, currentTheme) => {
  const themeClass = currentTheme ? currentTheme.text : 'text-slate-800';
  const className = `w-5 h-5 ${themeClass}`;
  
  switch (iconName) {
    case 'Building': return <Building className={className} />;
    case 'Bed': return <Bed className={className} />;
    case 'Key': return <Key className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Waves': return <Waves className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'MapPin': return <MapPin className={className} />;
    case 'Car': return <Car className={className} />;
    case 'Phone': return <Phone className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Wifi': return <Wifi className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Wine': return <Wine className={className} />;
    case 'Dumbbell': return <Dumbbell className={className} />;
    default: return <Info className={className} />;
  }
};

export default function App() {
  const [lang, setLang] = useState('de');
  const t = translations[lang] || translations.de;

  const [appMode, setAppMode] = useState('guest'); 
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  
  const [currentSlide] = useState(0);
  const [copiedWifi, setCopiedWifi] = useState(false);

  const [scanCount] = useState(184);
  const [daysLeft] = useState(24);
  const [activeRooms] = useState(12);

  const [hotel, setHotel] = useState(() => {
    const saved = localStorage.getItem('gm24_hotel');
    const defaultData = {
      logoUrl: '', 
      name: 'Boutique Hotel & Suites', 
      locationTitle: 'REGION / STANDORT',
      address: 'Musterstraße 1, 12345 Musterstadt',
      phone: '+49 123 456789',
      email: 'info@meine-unterkunft.de',
      website: 'www.meine-unterkunft.de',
      googleReviewUrl: 'https://g.page/r/example/review',
      wifiSsid: 'Guest_WiFi',
      wifiPass: 'welcome2026',
      breakfastTime: '07:30 - 10:30 Uhr',
      checkInOut: 'Check-in: ab 15:00 | Check-out: bis 11:00',
      parkingInfo: 'Kostenfreie Parkplätze am Haus verfügbar.',
      showWifi: true,
      showParking: true,
      showBreakfast: true,
      showCheckInOut: true,
      themeColor: 'amber',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
      ]
    };
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('gm24_categories');
    return saved ? JSON.parse(saved) : [
      { 
        id: '1', 
        presetId: 'wifi_internet', 
        icon: 'Wifi', 
        customTitle: '', 
        fieldValues: { ssid: 'Hotel_Guest_WiFi', pass: 'welcome2026', type: 'Kostenlos im gesamten Hotel' },
        selectedFeatures: ['Kostenloses WLAN', 'Im gesamten Hotel', 'Highspeed Glasfaser'], 
        customText: 'Bei Verbindungsproblemen wenden Sie sich bitte an die Rezeption.' 
      },
      { 
        id: '2', 
        presetId: 'fruehstueck', 
        icon: 'Coffee', 
        customTitle: '', 
        fieldValues: { startTime: '07:30', endTime: '10:30', note: 'Frühstücksraum im Erdgeschoss' },
        selectedFeatures: ['Reichhaltiges Buffet', 'Kaffee inklusive'], 
        customText: 'Gerne bereiten wir Ihnen auch vegane Alternativen frisch zu.' 
      }
    ];
  });

  const currentTheme = themeColors.find(tc => tc.id === hotel.themeColor) || themeColors[0];

  const handleSaveData = async () => {
    try {
      const { error } = await supabase
        .from('hotels')
        .upsert({ 
          id: 'default-hotel-id', 
          name: hotel.name,
          phone: hotel.phone,
          email: hotel.email,
          address: hotel.address,
          categories: categories,
          theme_color: hotel.themeColor
        });

      if (error) throw error;
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error("Supabase kayıt hatası (Local fallback aktif):", err);
      localStorage.setItem('gm24_hotel', JSON.stringify(hotel));
      localStorage.setItem('gm24_categories', JSON.stringify(categories));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const hotelSlug = hotel.name ? hotel.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'hotel';
  const hotelUrl = `https://gastemappe24-pro.vercel.app/?hotel=${hotelSlug}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(hotelUrl)}`;

  const handlePrint = (format) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>QR-Code ${format} - ${hotel.name}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 40px; color: #1e293b; }
            .card { border: 2px solid #e2e8f0; border-radius: 24px; padding: 32px; max-width: 450px; margin: 0 auto; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
            .logo { max-height: 60px; margin-bottom: 12px; border-radius: 12px; }
            h1 { font-size: 22px; margin: 8px 0 4px 0; color: #0f172a; }
            p.sub { color: #64748b; font-size: 13px; margin-bottom: 20px; }
            .qr-img { width: 180px; height: 180px; margin: 16px 0; border: 8px solid #f8fafc; border-radius: 16px; }
            .info-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px; margin-top: 20px; text-align: left; font-size: 12px; line-height: 1.6; }
            .info-box strong { color: #0f172a; }
          </style>
        </head>
        <body>
          <div class="card">
            ${hotel.logoUrl ? `<img src="${hotel.logoUrl}" class="logo" />` : ''}
            <h1>${hotel.name}</h1>
            <p class="sub">Digitale Gästemappe / Digital Guest Directory</p>
            <img src="${qrCodeUrl}" class="qr-img" />
            <p style="font-size: 12px; font-weight: bold; color: ${currentTheme.hex};">Scannen Sie den QR-Code für alle Infos & Services</p>
            <div class="info-box">
              ${hotel.address ? `<div><strong>Adresse:</strong> ${hotel.address}</div>` : ''}
              ${hotel.phone ? `<div><strong>Telefon:</strong> ${hotel.phone}</div>` : ''}
              ${hotel.email ? `<div><strong>E-Mail:</strong> ${hotel.email}</div>` : ''}
              ${hotel.wifiSsid ? `<div style="margin-top:6px; padding-top:6px; border-top: 1px dashed #cbd5e1;"><strong>WLAN:</strong> ${hotel.wifiSsid} | <strong>Pass:</strong> ${hotel.wifiPass}</div>` : ''}
            </div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleAddPresetCategory = (presetObj) => {
    if (!presetObj) return;
    const newCategory = { 
      id: Date.now().toString(), 
      presetId: presetObj.id, 
      icon: presetObj.icon || 'Info',
      customTitle: '',
      fieldValues: {},
      selectedFeatures: presetObj.features ? [presetObj.features[0]] : [],
      customText: ''
    };
    setCategories(prev => [...prev, newCategory]);
    setIsCatalogModalOpen(false);
  };

  const handleDeleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const handleUpdateCategoryField = (id, field, value) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
  };

  const handleUpdateFieldValue = (catId, subKey, val) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        fieldValues: {
          ...(cat.fieldValues || {}),
          [subKey]: val
        }
      };
    }));
  };

  const handleToggleFeature = (catId, featureName) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      const current = cat.selectedFeatures || [];
      const updated = current.includes(featureName)
        ? current.filter(f => f !== featureName)
        : [...current, featureName];
      return { ...cat, selectedFeatures: updated };
    }));
  };

  const copyWifiPassword = () => {
    if (!hotel.wifiPass) return;
    navigator.clipboard.writeText(hotel.wifiPass);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2500);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setHotel((prev) => ({ ...prev, logoUrl: reader.result })); };
      reader.readAsDataURL(file);
    }
  };

  const groupedCategories = (categories || []).reduce((acc, cat) => {
    if (!cat) return acc;
    const presetData = categoryPresets.find(p => p.id === cat.presetId);
    if (!presetData) return acc;
    const groupName = presetData.group || 'Sonstige';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push({ ...cat, presetData });
    return acc;
  }, {});

  // DİNAMİK PRESET İÇERİK EDİTÖRÜ (Kategoriye Göre Yüklenen Alanlar)
  const renderDynamicPresetFields = (cat, presetObj) => {
    const fVals = cat.fieldValues || {};

    switch (presetObj.fieldsType) {
      case 'wifi':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-stone-200">
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">WLAN Netz-Name (SSID)</label>
              <input type="text" placeholder="Hotel-Guest-WiFi" value={fVals.ssid || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'ssid', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">WLAN Passwort</label>
              <input type="text" placeholder="welcome2026" value={fVals.pass || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'pass', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
          </div>
        );

      case 'dining':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-3 rounded-xl border border-stone-200">
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Öffnung von (Uhrzeit)</label>
              <input type="text" placeholder="07:30" value={fVals.startTime || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'startTime', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Öffnung bis (Uhrzeit)</label>
              <input type="text" placeholder="10:30" value={fVals.endTime || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'endTime', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Küche / Hinweis</label>
              <input type="text" placeholder="Mutfak son sipariş 21:30" value={fVals.note || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'note', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
          </div>
        );

      case 'checkinout':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-stone-200">
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Check-in Zeit (ab)</label>
              <input type="text" placeholder="ab 15:00 Uhr" value={fVals.checkIn || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'checkIn', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Check-out Zeit (bis)</label>
              <input type="text" placeholder="bis 11:00 Uhr" value={fVals.checkOut || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'checkOut', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
          </div>
        );

      case 'rezeption':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-stone-200">
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Rezeptions-Zeiten</label>
              <input type="text" placeholder="07:00 - 22:00 Uhr (oder 24/7)" value={fVals.hours || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'hours', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Notfall-Telefonnummer</label>
              <input type="text" placeholder="+49 123 456789" value={fVals.phone || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'phone', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
          </div>
        );

      case 'parking':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-stone-200">
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Parkplatz Gebühr / Info</label>
              <input type="text" placeholder="Kostenfrei am Haus" value={fVals.fee || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'fee', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
            <div>
              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Schranken-Code / E-Ladesäule</label>
              <input type="text" placeholder="Code: 1234 | 22kW Lader" value={fVals.extra || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'extra', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white p-3 rounded-xl border border-stone-200">
            <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Öffnungszeiten / Details</label>
            <input type="text" placeholder="Täglich von 08:00 bis 20:00 Uhr" value={fVals.general || ''} onChange={(e) => handleUpdateFieldValue(cat.id, 'general', e.target.value)} className="w-full p-2 text-xs border rounded-lg" />
          </div>
        );
    }
  };

  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] font-sans text-slate-800 p-6 md:p-10 space-y-8 relative pb-28">
        
        {/* Katalog Modal */}
        {isCatalogModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-extrabold text-lg text-slate-900">{t.modalTitle}</h2>
                <button onClick={() => setIsCatalogModalOpen(false)} className="text-stone-400 font-bold p-1 cursor-pointer hover:text-stone-700">✕</button>
              </div>
              <div className="space-y-6">
                {Object.entries(
                  categoryPresets.reduce((acc, preset) => {
                    const group = preset.group || 'Sonstige';
                    acc[group] = acc[group] || [];
                    acc[group].push(preset);
                    return acc;
                  }, {})
                ).map(([groupName, presets]) => (
                  <div key={groupName} className="space-y-2">
                    <h3 className={`text-xs font-black ${currentTheme.text} uppercase tracking-wider`}>{groupName}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {presets.map((preset) => {
                        const title = (preset.title && (preset.title[lang] || preset.title.de)) || 'Kategorie';
                        const sub = (preset.subtitle && (preset.subtitle[lang] || preset.subtitle.de)) || '';
                        return (
                          <div key={preset.id} className={`p-3 rounded-2xl border flex items-center justify-between transition bg-stone-50 hover:${currentTheme.border}`}>
                            <div className="flex items-center gap-2.5">
                              {renderSafeIcon(preset.icon, currentTheme)}
                              <div>
                                <span className="font-bold block text-xs text-slate-900">{title}</span>
                                {sub && <span className="text-[10px] text-stone-500 block">{sub}</span>}
                              </div>
                            </div>
                            <button onClick={() => handleAddPresetCategory(preset)} className={`${currentTheme.bg} text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shadow hover:opacity-90 cursor-pointer flex items-center gap-1`}>
                              <Plus className="w-3 h-3" /> {t.addBtn}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto flex justify-between items-center pb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className={`${currentTheme.bg} text-white font-black px-3 py-1.5 rounded-xl text-sm`}>G</span>
            <span className="font-extrabold text-lg tracking-tight">gastemappe24 <span className={`${currentTheme.text} text-xs uppercase px-1.5 py-0.5 ${currentTheme.bgLight} rounded-md`}>PRO</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSaveData} className="bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-800 transition cursor-pointer flex items-center gap-2 shadow-md">
              <Save className="w-4 h-4" /> {isSaved ? t.savedMsg : t.saveBtn}
            </button>
            <button onClick={() => { setAppMode('guest'); setShowWelcomeScreen(false); }} className="bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition cursor-pointer">
              {t.guestViewBtn}
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t.adminTitle}</h1>

          {/* İstatistik & Analitik Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-stone-400">
                <span className="text-[10px] uppercase font-bold tracking-wider">{t.statsScans}</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black">{scanCount}</div>
              <span className="text-[10px] text-emerald-400 font-semibold">↑ +18% diese Woche</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-stone-500">
                <span className="text-[10px] uppercase font-bold tracking-wider">{t.statsActiveRooms}</span>
                <Users className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{activeRooms} / 15</div>
              <span className="text-[10px] text-stone-400">80% Auslastung</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-stone-500">
                <span className="text-[10px] uppercase font-bold tracking-wider">{t.statsTopCategory}</span>
                <Activity className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-sm font-extrabold text-slate-900 truncate">Restaurant & Bar</div>
              <span className="text-[10px] text-stone-400">42 Aufrufe heute</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-stone-500">
                <span className="text-[10px] uppercase font-bold tracking-wider">{t.statsPeakTime}</span>
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-sm font-extrabold text-slate-900">08:00 - 10:00 Uhr</div>
              <span className="text-[10px] text-stone-400">Frühstückszeit</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-center space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                <QrCode className={`w-4 h-4 ${currentTheme.text}`} /> {t.qrTitle}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => handlePrint('A4')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printA4}</button>
                <button onClick={() => handlePrint('A5')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printA5}</button>
                <button onClick={() => handlePrint('Visitenkarte')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printCard}</button>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{t.trialTitle}</span>
                <div className="text-xl font-black">{daysLeft} {t.trialDaysLeft}</div>
              </div>
              <p className="text-[11px] text-stone-400 mt-2">PRO Version ist aktiv. Alle 10 Sprachen und Analysen sind freigeschaltet.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-8">
            
            {/* 1. Tesis İletişim Bilgileri */}
            <div className="space-y-4">
              <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec1Title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblHotelName}</label>
                  <input type="text" value={hotel.name} onChange={(e) => setHotel({ ...hotel, name: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblPhone}</label>
                  <input type="text" value={hotel.phone} onChange={(e) => setHotel({ ...hotel, phone: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblEmailField}</label>
                  <input type="text" value={hotel.email} onChange={(e) => setHotel({ ...hotel, email: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblAddress}</label>
                  <input type="text" value={hotel.address} onChange={(e) => setHotel({ ...hotel, address: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblWebsite}</label>
                  <input type="text" value={hotel.website} onChange={(e) => setHotel({ ...hotel, website: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblGoogleReview}</label>
                  <input type="text" value={hotel.googleReviewUrl} onChange={(e) => setHotel({ ...hotel, googleReviewUrl: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
              </div>
            </div>

            {/* 2. Renk Temaları */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider flex items-center gap-1.5`}><Palette className="w-4 h-4" /> {t.sec2Title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {themeColors.map((theme) => (
                  <button 
                    key={theme.id}
                    onClick={() => setHotel({ ...hotel, themeColor: theme.id })}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition cursor-pointer ${hotel.themeColor === theme.id ? 'border-slate-900 bg-stone-100 shadow-sm' : 'border-stone-200 bg-white hover:bg-stone-50'}`}
                  >
                    <div className={`w-6 h-6 rounded-full ${theme.bg} shadow-md flex items-center justify-center text-white`}>
                      {hotel.themeColor === theme.id && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <span className="font-bold block text-xs text-slate-900">{theme.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Logo & Slider */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec3Title}</h3>
              <div className="flex items-center gap-4">
                {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-12 h-12 rounded-xl object-cover border" /> : <div className="w-12 h-12 rounded-xl bg-stone-100 border border-dashed flex items-center justify-center text-[10px] text-stone-400">No Logo</div>}
                <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition">
                  {t.btnLogoUpload}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* 6. Dinamik Preset Mapping Alanı */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec6Title}</h3>
                <button onClick={() => setIsCatalogModalOpen(true)} className={`${currentTheme.bg} text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:opacity-95 cursor-pointer flex items-center gap-1.5`}>
                  <Plus className="w-4 h-4" /> {t.btnAddCategory}
                </button>
              </div>
              
              <div className="space-y-6">
                {Object.entries(groupedCategories).map(([groupName, groupItems]) => (
                  <div key={groupName} className="space-y-3">
                    <h4 className={`text-xs font-black ${currentTheme.text} uppercase tracking-wider ${currentTheme.bgLight} px-3 py-1.5 rounded-lg border border-stone-200/60 inline-block`}>{groupName}</h4>
                    <div className="space-y-4">
                      {(groupItems || []).map((cat) => {
                        const presetObj = cat.presetData;
                        const baseTitle = presetObj ? ((presetObj.title && (presetObj.title[lang] || presetObj.title.de)) || 'Kategorie') : '';
                        const displayTitle = cat.customTitle || baseTitle;

                        return (
                          <div key={cat.id} className="p-4 bg-stone-50 rounded-2xl border space-y-4 shadow-sm">
                            <div className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-2">
                                {renderSafeIcon(cat.icon, currentTheme)}
                                <span className="font-bold text-xs text-slate-800">{displayTitle}</span>
                              </div>
                              <button onClick={() => handleDeleteCategory(cat.id)} className="bg-rose-50 text-rose-600 p-1.5 rounded-lg cursor-pointer hover:bg-rose-100"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>

                            {/* 1. Başlık Düzenleme */}
                            <div>
                              <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">{t.editTitle}</label>
                              <input 
                                type="text" 
                                placeholder={baseTitle}
                                value={cat.customTitle || ''} 
                                onChange={(e) => handleUpdateCategoryField(cat.id, 'customTitle', e.target.value)} 
                                className="w-full p-2 text-xs border rounded-xl bg-white font-semibold" 
                              />
                            </div>

                            {/* 2. Kategoriye Özel Yüklenen Dinamik Alanlar */}
                            {presetObj && renderDynamicPresetFields(cat, presetObj)}

                            {/* 3. Booking.com Usulü Özellik İşaretleme Kutucukları (Checkboxes) */}
                            {presetObj && presetObj.features && presetObj.features.length > 0 && (
                              <div className="space-y-1.5 pt-1">
                                <label className="block text-[9px] font-extrabold text-stone-600 uppercase">Ausstattung & Services (Auswählen)</label>
                                <div className="flex flex-wrap gap-1.5">
                                  {presetObj.features.map((feat) => {
                                    const isSelected = (cat.selectedFeatures || []).includes(feat);
                                    return (
                                      <button
                                        key={feat}
                                        type="button"
                                        onClick={() => handleToggleFeature(cat.id, feat)}
                                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border transition cursor-pointer flex items-center gap-1 ${isSelected ? `${currentTheme.bg} text-white border-transparent` : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'}`}
                                      >
                                        {isSelected && <Check className="w-3 h-3" />}
                                        {feat}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* 4. Alan: Custom Text (Çeviri yapılmaz uyarısıyla) */}
                            <div className="pt-2 border-t border-stone-200/60 space-y-1">
                              <label className="block text-[9px] font-extrabold text-amber-700 uppercase">Eigene Beschreibung / Hinweistext (Keine Übersetzung)</label>
                              <textarea 
                                rows="2"
                                value={cat.customText || ''} 
                                onChange={(e) => handleUpdateCategoryField(cat.id, 'customText', e.target.value)} 
                                placeholder="Individueller Hinweistext für Ihre Gäste..."
                                className="w-full p-2.5 text-xs border border-amber-300 rounded-xl bg-amber-50/50" 
                              />
                              <p className="text-[10px] text-amber-800 font-semibold">{t.customTextWarning}</p>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (showWelcomeScreen) {
    return (
      <div className="min-h-screen bg-slate-950 max-w-md mx-auto shadow-2xl relative overflow-hidden flex flex-col justify-between font-sans">
        <div className="absolute inset-0 z-0">
          <img src={(hotel.images && hotel.images[0]) || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'} alt="Welcome" className="w-full h-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
        </div>

        <div className="relative z-10 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-white/20" /> : <div className={`w-8 h-8 rounded-lg ${currentTheme.bg} flex items-center justify-center font-bold text-xs`}>{(hotel.name || 'H').charAt(0)}</div>}
            <span className="text-xs font-bold tracking-wider uppercase opacity-90">{hotel.name}</span>
          </div>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-black/40 border border-white/30 text-white text-xs font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer">
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
            <option value="tr">🇹🇷 TR</option>
          </select>
        </div>

        <div className="relative z-10 p-6 space-y-4 text-white">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest font-extrabold uppercase bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full">{t.welcomeBadge}</span>
            <h1 className="text-3xl font-black tracking-tight pt-2">{hotel.name}</h1>
          </div>
          <button onClick={() => setShowWelcomeScreen(false)} className={`w-full ${currentTheme.bg} text-white py-4 rounded-2xl font-bold text-sm shadow-2xl hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer`}>
            <span>{t.welcomeButton}</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const activeQuickCards = [
    hotel.showWifi && (
      <div key="wifi" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Wifi className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.wlanTitle}</span></div>
        <div className="text-[11px] text-slate-500 font-mono bg-stone-50 p-2 rounded-lg border">
          <div><b>{hotel.wifiSsid}</b></div>
          <div className="flex justify-between items-center mt-1">
            <span>{hotel.wifiPass}</span>
            <button onClick={copyWifiPassword} className={`${currentTheme.bgLight} ${currentTheme.text} p-1 rounded cursor-pointer`}>{copiedWifi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}</button>
          </div>
        </div>
      </div>
    ),
    hotel.showParking && (
      <div key="parking" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Car className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.parkingTitle}</span></div>
        <p className="text-[11px] text-slate-600">{hotel.parkingInfo}</p>
      </div>
    ),
    hotel.showBreakfast && (
      <div key="breakfast" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Coffee className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.breakfastTitle}</span></div>
        <p className="text-[11px] text-slate-600">{hotel.breakfastTime}</p>
      </div>
    ),
    hotel.showCheckInOut && (
      <div key="checkinout" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Clock className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.checkInOutTitle}</span></div>
        <p className="text-[11px] text-slate-600">{hotel.checkInOut}</p>
      </div>
    )
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-32 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      <header className="p-5 pt-6 pb-2 bg-stone-50 sticky top-0 z-40 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-9 h-9 rounded-xl object-cover border" /> : <div className={`w-9 h-9 rounded-xl ${currentTheme.bg} text-white flex items-center justify-center font-bold text-xs`}>{(hotel.name || 'H').charAt(0)}</div>}
          <span className="text-xs font-bold tracking-wider uppercase text-slate-800">{hotel.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white border border-stone-200 text-slate-700 text-xs font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer shadow-sm">
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
            <option value="tr">🇹🇷 TR</option>
          </select>
          <button onClick={() => setAppMode('dashboard')} className="text-stone-300 hover:text-stone-600 p-1 text-xs cursor-pointer" title="Admin">🔑</button>
        </div>
      </header>

      <main className="p-5 space-y-5">
        {selectedCategory ? (
          <div className="space-y-4 animate-fade-in">
            <button onClick={() => setSelectedCategory(null)} className={`text-xs font-bold ${currentTheme.text} cursor-pointer flex items-center gap-1`}>&larr; {t.detailBack}</button>
            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
              <h2 className="text-lg font-black text-slate-900">{selectedCategory.title}</h2>
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
                {selectedCategory.fieldValues && Object.keys(selectedCategory.fieldValues).length > 0 && (
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1">
                    {Object.entries(selectedCategory.fieldValues).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-[11px]">
                        <span className="font-bold text-slate-500 uppercase">{k}:</span>
                        <span className="font-semibold text-slate-900">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedCategory.features && selectedCategory.features.length > 0 && (
                  <div className="pt-2">
                    <span className="font-bold text-[11px] block mb-1 text-slate-900">Ausstattung / Service:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCategory.features.map(f => (
                        <span key={f} className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold ${currentTheme.bgLight} ${currentTheme.text}`}>
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedCategory.customText && (
                  <div className="pt-3 border-t border-stone-100">
                    <p className="italic text-stone-600 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50">{selectedCategory.customText}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          activeTab === 'home' ? (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-0.5 pt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 block">{hotel.locationTitle}</span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">{t.greetingHello}<br /><span className={currentTheme.text}>{t.greetingWelcome}</span></h1>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-lg h-56 bg-slate-900 border border-stone-200">
                <img src={(hotel.images && hotel.images[currentSlide]) || (hotel.images && hotel.images[0]) || ''} alt="Slide" className="w-full h-full object-cover" />
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${currentTheme.bgLight} rounded-xl ${currentTheme.text}`}><Sun className="w-6 h-6" /></div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 uppercase">{t.weatherTitle}</div>
                    <div className="text-[11px] text-stone-500">{t.weatherSub}</div>
                  </div>
                </div>
                <div className="text-right"><div className="text-2xl font-black text-slate-900">16°C</div></div>
              </div>

              {activeQuickCards.length > 0 && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {activeQuickCards}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">{t.navGaestemappe}</h3>
              {Object.entries(groupedCategories).map(([groupName, groupItems]) => (
                <div key={groupName} className="space-y-2.5">
                  <h4 className={`text-xs font-black ${currentTheme.text} uppercase tracking-wider px-1`}>{groupName}</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {(groupItems || []).map((cat) => {
                      const presetObj = cat.presetData;
                      const title = cat.customTitle || (presetObj && presetObj.title && (presetObj.title[lang] || presetObj.title.de)) || 'Kategorie';
                      const sub = (presetObj && presetObj.subtitle && (presetObj.subtitle[lang] || presetObj.subtitle.de)) || '';

                      return (
                        <button key={cat.id} onClick={() => setSelectedCategory({ title, fieldValues: cat.fieldValues, features: cat.selectedFeatures, customText: cat.customText })} className={`w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between text-left cursor-pointer hover:${currentTheme.border} transition`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${currentTheme.bgLight} flex items-center justify-center`}>{renderSafeIcon(cat.icon, currentTheme)}</div>
                            <div>
                              <h5 className="text-sm font-extrabold text-slate-900">{title}</h5>
                              {sub && <p className="text-xs text-slate-500">{sub}</p>}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-stone-200/80 z-50 shadow-2xl">
        <nav className="px-3 py-2 flex justify-around items-center">
          <button onClick={() => { setActiveTab('home'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'home' && !selectedCategory ? currentTheme.text : 'text-stone-400'}`}>
            <Info className="w-5 h-5" /><span>{t.navHome}</span>
          </button>
          <button onClick={() => { setActiveTab('services'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'services' || selectedCategory ? currentTheme.text : 'text-stone-400'}`}>
            <Compass className="w-5 h-5" /><span>{t.navGaestemappe}</span>
          </button>
          <a href={hotel.googleReviewUrl} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}>
            <Star className="w-5 h-5 fill-current" /><span>{t.navReview}</span>
          </a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address || '')}`} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}>
            <Navigation className="w-5 h-5" /><span>{t.navRoute}</span>
          </a>
        </nav>
      </div>
    </div>
  );
}