import React, { useState, useEffect } from 'react';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Scroll, Save, Eye, EyeOff
} from 'lucide-react';

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
    schnellzugriffTitle: "Schnellzugriff",
    wlanTitle: "WLAN",
    parkingTitle: "Parkplatz",
    breakfastTitle: "Frühstück",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Zurück zur Übersicht",
    adminTitle: "Verwaltung (Dashboard)",
    guestViewBtn: "Gastansicht öffnen",
    saveBtn: "Änderungen speichern",
    savedMsg: "Gespeichert!",
    logoutBtn: "Abmelden",
    trialTitle: "30-Tage Testversion (PRO)",
    trialDaysLeft: "Tage verbleibend",
    statsScans: "QR-Code Scans",
    statsActiveRooms: "Aktive Zimmer-Zugriffe",
    qrTitle: "QR-Code & Print-Center",
    printA4: "Druckvorlage A4",
    printA5: "Druckvorlage A5",
    printCard: "Visitenkarte",
    sec1Title: "1. Unterkunft Informationen & Kontaktdaten",
    sec2Title: "2. Logo hochladen",
    sec3Title: "3. Bilderverwaltung (Slider)",
    sec4Title: "4. Schnellzugriff (Aktivieren / Deaktivieren)",
    sec5Title: "5. Gästemappe Kategorien (Hibrit Şablonlar & Özel Değerler)",
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
    modalTitle: "Katalog: Kategorie auswählen",
    addBtn: "Hinzufügen",
    editTitle: "Name / Titel (z.B. Pool Bar)",
    editCustomVal1: "Individuelle Zeit / Info (z.B. 08:00 - 22:00)",
    editCustomVal2: "Individuelle Nummer / Detail (z.B. Durchwahl 9)",
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
    schnellzugriffTitle: "Quick Access",
    wlanTitle: "WiFi",
    parkingTitle: "Parking",
    breakfastTitle: "Breakfast",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Back to Overview",
    adminTitle: "Management (Dashboard)",
    guestViewBtn: "Open Guest View",
    saveBtn: "Save Changes",
    savedMsg: "Saved!",
    logoutBtn: "Log out",
    trialTitle: "30-Day Trial (PRO)",
    trialDaysLeft: "Days remaining",
    statsScans: "QR Code Scans",
    statsActiveRooms: "Active Room Access",
    qrTitle: "QR Code & Print Center",
    printA4: "Print Template A4",
    printA5: "Print Template A5",
    printCard: "Business Card",
    sec1Title: "1. Property Information & Contacts",
    sec2Title: "2. Upload Logo",
    sec3Title: "3. Image Management (Slider)",
    sec4Title: "4. Quick Access (Enable / Disable Cards)",
    sec5Title: "5. Directory Categories (Hybrid Templates & Custom Values)",
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
    modalTitle: "Catalog: Select Category",
    addBtn: "Add",
    editTitle: "Name / Title (e.g. Pool Bar)",
    editCustomVal1: "Custom Time / Info (e.g. 08:00 - 22:00)",
    editCustomVal2: "Custom Number / Detail (e.g. Ext. 9)",
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
    schnellzugriffTitle: "Hızlı Erişim",
    wlanTitle: "WLAN",
    parkingTitle: "Otopark",
    breakfastTitle: "Kahvaltı",
    checkInOutTitle: "Giriş / Çıkış",
    detailBack: "Geri Dön",
    adminTitle: "Yönetim Paneli (Dashboard)",
    guestViewBtn: "Misafir Görünümünü Aç",
    saveBtn: "Değişiklikleri Kaydet",
    savedMsg: "Kaydedildi!",
    logoutBtn: "Çıkış Yap",
    trialTitle: "30 Günlük Deneme (PRO)",
    trialDaysLeft: "Gün kaldı",
    statsScans: "QR Kod Taramaları",
    statsActiveRooms: "Aktif Oda Erişimi",
    qrTitle: "QR Kod & Baskı Merkezi",
    printA4: "A4 Baskı Şablonu",
    printA5: "A5 Baskı Şablonu",
    printCard: "Kartvizit Şablonu",
    sec1Title: "1. Tesis Bilgileri & İletişim",
    sec2Title: "2. Logo Yükleme",
    sec3Title: "3. Resim Yönetimi (Slider)",
    sec4Title: "4. Hızlı Erişim (Kartları Aç / Kapat)",
    sec5Title: "5. Rehber Kategorileri (Hibrit Şablonlar & Özel Değerler)",
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
    modalTitle: "Hazır Katalog: Kategori Seçin",
    addBtn: "Ekle",
    editTitle: "İsim / Başlık (Örn: Pool Bar)",
    editCustomVal1: "Özel Saat / Zaman (Örn: 08:00 - 22:00)",
    editCustomVal2: "Özel Numara / Detay (Örn: Dahili 9)",
    activeCard: "Kartı Göster",
    inactiveCard: "Kartı Gizle"
  }
};

const categoryPresets = [
  { id: 'hotel_info', group: 'Hotel & Unterkunft', title: { de: 'Hotelinformationen', en: 'Hotel Information', tr: 'Otel Bilgileri' }, subtitle: { de: 'Rezeption, Zeiten & Services', en: 'Reception, hours & services', tr: 'Resepsiyon, saatler ve hizmetler' }, contentTpl: { de: 'Herzlich willkommen in unserem Haus. Unsere Rezeption ist von {val1} für Sie besetzt. Notfallnummer: {val2}', en: 'Welcome to our property. Our reception is open from {val1}. Emergency: {val2}', tr: 'Tesisimize hoş geldiniz. Resepsiyonumuz {val1} saatleri arasında hizmet vermektedir. Acil hat: {val2}' }, defaultVal1: '07:00 - 22:00 Uhr', defaultVal2: '+49 123 456', icon: 'Building' },
  { id: 'room_info', group: 'Hotel & Unterkunft', title: { de: 'Zimmerinformationen', en: 'Room Information', tr: 'Oda Bilgileri' }, subtitle: { de: 'Ausstattung & Safe', en: 'Amenities & safe', tr: 'Oda özellikleri ve kasa' }, contentTpl: { de: 'Alle Zimmer sind mit Safe und Föhn ausgestattet. Check-in Info: {val1}', en: 'All rooms are equipped with safe and hairdryer. Info: {val1}', tr: 'Tüm odalarda kasa ve saç kurutma makinesi mevcuttur. Bilgi: {val1}' }, defaultVal1: 'Nichtraucherzimmer', defaultVal2: '', icon: 'Bed' },
  { id: 'restaurant_dining', group: 'Essen & Trinken', title: { de: 'Restaurant & Bar', en: 'Restaurant & Bar', tr: 'Restoran ve Bar' }, subtitle: { de: 'Öffnungszeiten & Speisekarte', en: 'Hours & menu', tr: 'Çalışma saatleri ve menü' }, contentTpl: { de: 'Unser Bereich ist täglich von {val1} für Sie geöffnet. Details: {val2}', en: 'Our venue is open daily from {val1}. Details: {val2}', tr: 'Mekanımız her gün {val1} saatleri arasında açıktır. Detay: {val2}' }, defaultVal1: '18:00 - 21:30 Uhr', defaultVal2: 'Reservierung an der Rezeption', icon: 'Utensils' },
  { id: 'pool_aqua', group: 'Wellness & Spa', title: { de: 'Pool & Wellnessbereich', en: 'Pool & Wellness Area', tr: 'Havuz ve Wellness Alanı' }, subtitle: { de: 'Öffnungszeiten & Handtücher', en: 'Hours & towels', tr: 'Çalışma saatleri ve havlular' }, contentTpl: { de: 'Unser Poolbereich ist von {val1} geöffnet. Hinweis: {val2}', en: 'Our pool area is open from {val1}. Note: {val2}', tr: 'Havuz alanımız {val1} arası açıktır. Not: {val2}' }, defaultVal1: '07:00 - 20:00 Uhr', defaultVal2: 'Handtücher am Empfang erhältlich', icon: 'Waves' }
];

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

  const [scanCount] = useState(142);
  const [daysLeft] = useState(24);

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
      { id: '1', presetId: 'hotel_info', icon: 'Building', customTitle: '', val1: '07:00 - 22:00 Uhr', val2: '+49 123 456' },
      { id: '2', presetId: 'restaurant_dining', icon: 'Utensils', customTitle: '', val1: '18:00 - 21:30 Uhr', val2: 'Reservierung an der Rezeption' }
    ];
  });

  const handleSaveData = () => {
    localStorage.setItem('gm24_hotel', JSON.stringify(hotel));
    localStorage.setItem('gm24_categories', JSON.stringify(categories));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const hotelSlug = hotel.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
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
            <p style="font-size: 12px; font-weight: bold; color: #78350f;">Scannen Sie den QR-Code für alle Infos & Services</p>
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

  // HİBRİT PRESET: Sabit 10 dil şablonu + otelcinin değiştirebileceği val1 (saat/zaman) ve val2 (detay/numara) alanları
  const handleAddPresetCategory = (presetObj) => {
    setCategories([...categories, { 
      id: Date.now().toString(), 
      presetId: presetObj.id, 
      icon: presetObj.icon,
      customTitle: '',
      val1: presetObj.defaultVal1,
      val2: presetObj.defaultVal2
    }]);
    setIsCatalogModalOpen(false);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleUpdateCategoryField = (id, field, value) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
  };

  const copyWifiPassword = () => {
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

  const renderIcon = (iconName) => {
    const props = { className: `w-5 h-5 text-amber-900` };
    switch (iconName) {
      case 'Building': return <Building {...props} />;
      case 'Bed': return <Bed {...props} />;
      case 'Utensils': return <Utensils {...props} />;
      case 'Waves': return <Waves {...props} />;
      default: return <Info {...props} />;
    }
  };

  const groupedCategories = categories.reduce((acc, cat) => {
    const presetData = categoryPresets.find(p => p.id === cat.presetId);
    if (!presetData) return acc;
    const groupName = presetData.group;
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push({ ...cat, presetData });
    return acc;
  }, {});

  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] font-sans text-slate-800 p-6 md:p-10 space-y-8 relative pb-28">
        {isCatalogModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-extrabold text-lg text-slate-900">{t.modalTitle}</h2>
                <button onClick={() => setIsCatalogModalOpen(false)} className="text-stone-400 font-bold p-1 cursor-pointer">✕</button>
              </div>
              <div className="space-y-6">
                {Object.entries(
                  categoryPresets.reduce((acc, preset) => {
                    acc[preset.group] = acc[preset.group] || [];
                    acc[preset.group].push(preset);
                    return acc;
                  }, {})
                ).map(([groupName, presets]) => (
                  <div key={groupName} className="space-y-2">
                    <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider">{groupName}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {presets.map((preset) => {
                        const title = preset.title[lang] || preset.title.de;
                        const sub = preset.subtitle[lang] || preset.subtitle.de;
                        return (
                          <div key={preset.id} className="p-3 rounded-2xl border flex items-center justify-between transition bg-stone-50 hover:border-amber-900/40 cursor-pointer">
                            <div className="flex items-center gap-2.5">
                              {renderIcon(preset.icon)}
                              <div>
                                <span className="font-bold block text-xs text-slate-900">{title}</span>
                                <span className="text-[10px] text-stone-500 block">{sub}</span>
                              </div>
                            </div>
                            <button onClick={() => handleAddPresetCategory(preset)} className="bg-amber-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shadow hover:bg-amber-950 cursor-pointer flex items-center gap-1">
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
            <span className="bg-amber-900 text-white font-black px-3 py-1.5 rounded-xl text-sm">G</span>
            <span className="font-extrabold text-lg tracking-tight">gastemappe24 <span className="text-amber-800 text-xs uppercase px-1.5 py-0.5 bg-amber-100 rounded-md">PRO</span></span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{t.trialTitle} ({daysLeft} {t.trialDaysLeft})</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="text-[10px] text-stone-400 block">{t.statsScans}</span>
                  <span className="text-xl font-black">{scanCount}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="text-[10px] text-stone-400 block">{t.statsActiveRooms}</span>
                  <span className="text-xl font-black text-sky-400">100%</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-center space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                <QrCode className="w-4 h-4 text-amber-800" /> {t.qrTitle}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => handlePrint('A4')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printA4}</button>
                <button onClick={() => handlePrint('A5')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printA5}</button>
                <button onClick={() => handlePrint('Visitenkarte')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printCard}</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-8">
            
            {/* 1. ÜNİTE BİLGİLERİ & İLETİŞİM */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider">{t.sec1Title}</h3>
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

            {/* 2. LOGO YÜKLEME */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider">{t.sec2Title}</h3>
              <div className="flex items-center gap-4">
                {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-12 h-12 rounded-xl object-cover border" /> : <div className="w-12 h-12 rounded-xl bg-stone-100 border border-dashed flex items-center justify-center text-[10px] text-stone-400">No Logo</div>}
                <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition">
                  {t.btnLogoUpload}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* 3. BİLDERVERWALTUNG (SLİDER) */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider">{t.sec3Title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {hotel.images.map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden h-24 border">
                    <img src={img} alt="Slider" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* 4. HIZLI ERİŞİM KARTLARI */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider">{t.sec4Title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className={`p-4 rounded-2xl border transition ${hotel.showWifi ? 'bg-white border-stone-200' : 'bg-stone-100 border-stone-200 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-2"><Wifi className="w-4 h-4 text-amber-900" /> {t.wlanTitle}</span>
                    <button onClick={() => setHotel({ ...hotel, showWifi: !hotel.showWifi })} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1 ${hotel.showWifi ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                      {hotel.showWifi ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {hotel.showWifi ? t.activeCard : t.inactiveCard}
                    </button>
                  </div>
                  {hotel.showWifi && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input type="text" placeholder={t.lblWifiSsid} value={hotel.wifiSsid} onChange={(e) => setHotel({ ...hotel, wifiSsid: e.target.value })} className="p-2 text-xs border rounded-xl" />
                      <input type="text" placeholder={t.lblWifiPass} value={hotel.wifiPass} onChange={(e) => setHotel({ ...hotel, wifiPass: e.target.value })} className="p-2 text-xs border rounded-xl" />
                    </div>
                  )}
                </div>

                <div className={`p-4 rounded-2xl border transition ${hotel.showParking ? 'bg-white border-stone-200' : 'bg-stone-100 border-stone-200 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-2"><Car className="w-4 h-4 text-amber-900" /> {t.parkingTitle}</span>
                    <button onClick={() => setHotel({ ...hotel, showParking: !hotel.showParking })} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1 ${hotel.showParking ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                      {hotel.showParking ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {hotel.showParking ? t.activeCard : t.inactiveCard}
                    </button>
                  </div>
                  {hotel.showParking && (
                    <input type="text" placeholder={t.lblParkingInfo} value={hotel.parkingInfo} onChange={(e) => setHotel({ ...hotel, parkingInfo: e.target.value })} className="w-full p-2 text-xs border rounded-xl mt-2" />
                  )}
                </div>

                <div className={`p-4 rounded-2xl border transition ${hotel.showBreakfast ? 'bg-white border-stone-200' : 'bg-stone-100 border-stone-200 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-2"><Coffee className="w-4 h-4 text-amber-900" /> {t.breakfastTitle}</span>
                    <button onClick={() => setHotel({ ...hotel, showBreakfast: !hotel.showBreakfast })} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1 ${hotel.showBreakfast ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                      {hotel.showBreakfast ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {hotel.showBreakfast ? t.activeCard : t.inactiveCard}
                    </button>
                  </div>
                  {hotel.showBreakfast && (
                    <input type="text" placeholder={t.lblBreakfastTime} value={hotel.breakfastTime} onChange={(e) => setHotel({ ...hotel, breakfastTime: e.target.value })} className="w-full p-2 text-xs border rounded-xl mt-2" />
                  )}
                </div>

                <div className={`p-4 rounded-2xl border transition ${hotel.showCheckInOut ? 'bg-white border-stone-200' : 'bg-stone-100 border-stone-200 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-2"><Clock className="w-4 h-4 text-amber-900" /> {t.checkInOutTitle}</span>
                    <button onClick={() => setHotel({ ...hotel, showCheckInOut: !hotel.showCheckInOut })} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1 ${hotel.showCheckInOut ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                      {hotel.showCheckInOut ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {hotel.showCheckInOut ? t.activeCard : t.inactiveCard}
                    </button>
                  </div>
                  {hotel.showCheckInOut && (
                    <input type="text" placeholder={t.lblCheckInOut} value={hotel.checkInOut} onChange={(e) => setHotel({ ...hotel, checkInOut: e.target.value })} className="w-full p-2 text-xs border rounded-xl mt-2" />
                  )}
                </div>

              </div>
            </div>

            {/* 5. GÄSTEMAPPE KATEGORIEN (HİBRİT: Sabit Çeviri Şablonu + Otelcinin Değiştirebileceği Özel Değerler) */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider">{t.sec5Title}</h3>
                <button onClick={() => setIsCatalogModalOpen(true)} className="bg-amber-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:bg-amber-950 cursor-pointer flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> {t.btnAddCategory}
                </button>
              </div>
              
              <div className="space-y-6">
                {Object.entries(groupedCategories).map(([groupName, groupItems]) => (
                  <div key={groupName} className="space-y-3">
                    <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100/60 inline-block">{groupName}</h4>
                    <div className="space-y-3">
                      {groupItems.map((cat) => {
                        const presetObj = cat.presetData;
                        const baseTitle = presetObj ? (presetObj.title[lang] || presetObj.title.de) : '';
                        const displayTitle = cat.customTitle || baseTitle;

                        return (
                          <div key={cat.id} className="p-4 bg-stone-50 rounded-2xl border space-y-3 shadow-sm">
                            <div className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-2">
                                {renderIcon(cat.icon)}
                                <span className="font-bold text-xs text-slate-800">{displayTitle}</span>
                              </div>
                              <button onClick={() => handleDeleteCategory(cat.id)} className="bg-rose-50 text-rose-600 p-1.5 rounded-lg cursor-pointer hover:bg-rose-100"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div>
                                <label className="block text-[9px] font-bold text-stone-500 uppercase mb-0.5">{t.editTitle}</label>
                                <input 
                                  type="text" 
                                  placeholder={baseTitle}
                                  value={cat.customTitle || ''} 
                                  onChange={(e) => handleUpdateCategoryField(cat.id, 'customTitle', e.target.value)} 
                                  className="w-full p-2 text-xs border rounded-xl bg-white font-semibold" 
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-stone-500 uppercase mb-0.5">{t.editCustomVal1}</label>
                                <input 
                                  type="text" 
                                  value={cat.val1 || ''} 
                                  onChange={(e) => handleUpdateCategoryField(cat.id, 'val1', e.target.value)} 
                                  className="w-full p-2 text-xs border rounded-xl bg-white" 
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-stone-500 uppercase mb-0.5">{t.editCustomVal2}</label>
                                <input 
                                  type="text" 
                                  value={cat.val2 || ''} 
                                  onChange={(e) => handleUpdateCategoryField(cat.id, 'val2', e.target.value)} 
                                  className="w-full p-2 text-xs border rounded-xl bg-white" 
                                />
                              </div>
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
          <img src={hotel.images[0]} alt="Welcome" className="w-full h-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
        </div>

        <div className="relative z-10 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-white/20" /> : <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center font-bold text-xs">{hotel.name.charAt(0)}</div>}
            <span className="text-xs font-bold tracking-wider uppercase opacity-90">{hotel.name}</span>
          </div>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-black/40 border border-white/30 text-white text-xs font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer">
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
            <option value="it">🇮🇹 IT</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="tr">🇹🇷 TR</option>
            <option value="sv">🇸🇪 SV</option>
            <option value="no">🇳🇴 NO</option>
            <option value="hr">🇭🇷 HR</option>
            <option value="sq">🇦🇱 SQ</option>
          </select>
        </div>

        <div className="relative z-10 p-6 space-y-4 text-white">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">{t.welcomeBadge}</span>
            <h1 className="text-3xl font-black tracking-tight pt-2">{hotel.name}</h1>
          </div>
          <button onClick={() => setShowWelcomeScreen(false)} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-sm shadow-2xl hover:bg-slate-100 transition flex items-center justify-center gap-2 cursor-pointer">
            <span>{t.welcomeButton}</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const activeQuickCards = [
    hotel.showWifi && (
      <div key="wifi" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className="flex items-center gap-2 text-amber-900"><Wifi className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.wlanTitle}</span></div>
        <div className="text-[11px] text-slate-500 font-mono bg-stone-50 p-2 rounded-lg border">
          <div><b>{hotel.wifiSsid}</b></div>
          <div className="flex justify-between items-center mt-1">
            <span>{hotel.wifiPass}</span>
            <button onClick={copyWifiPassword} className="bg-amber-50 text-amber-900 p-1 rounded cursor-pointer">{copiedWifi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}</button>
          </div>
        </div>
      </div>
    ),
    hotel.showParking && (
      <div key="parking" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className="flex items-center gap-2 text-amber-900"><Car className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.parkingTitle}</span></div>
        <p className="text-[11px] text-slate-600">{hotel.parkingInfo}</p>
      </div>
    ),
    hotel.showBreakfast && (
      <div key="breakfast" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className="flex items-center gap-2 text-amber-900"><Coffee className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.breakfastTitle}</span></div>
        <p className="text-[11px] text-slate-600">{hotel.breakfastTime}</p>
      </div>
    ),
    hotel.showCheckInOut && (
      <div key="checkinout" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className="flex items-center gap-2 text-amber-900"><Clock className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.checkInOutTitle}</span></div>
        <p className="text-[11px] text-slate-600">{hotel.checkInOut}</p>
      </div>
    )
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-32 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      <header className="p-5 pt-6 pb-2 bg-stone-50 sticky top-0 z-40 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-9 h-9 rounded-xl object-cover border" /> : <div className="w-9 h-9 rounded-xl bg-amber-900 text-white flex items-center justify-center font-bold text-xs">{hotel.name.charAt(0)}</div>}
          <span className="text-xs font-bold tracking-wider uppercase text-slate-800">{hotel.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white border border-stone-200 text-slate-700 text-xs font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer shadow-sm">
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
            <option value="it">🇮🇹 IT</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="tr">🇹🇷 TR</option>
            <option value="sv">🇸🇪 SV</option>
            <option value="no">🇳🇴 NO</option>
            <option value="hr">🇭🇷 HR</option>
            <option value="sq">🇦🇱 SQ</option>
          </select>
          <button onClick={() => setAppMode('dashboard')} className="text-stone-300 hover:text-stone-600 p-1 text-xs cursor-pointer" title="Admin">🔑</button>
        </div>
      </header>

      <main className="p-5 space-y-5">
        {selectedCategory ? (
          <div className="space-y-4 animate-fade-in">
            <button onClick={() => setSelectedCategory(null)} className="text-xs font-bold text-amber-900 cursor-pointer">&larr; {t.detailBack}</button>
            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
              <h2 className="text-lg font-black text-slate-900">{selectedCategory.title}</h2>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedCategory.content}</p>
            </div>
          </div>
        ) : (
          activeTab === 'home' ? (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-0.5 pt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 block">{hotel.locationTitle}</span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">{t.greetingHello}<br /><span className="text-amber-900">{t.greetingWelcome}</span></h1>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-lg h-56 bg-slate-900 border border-stone-200">
                <img src={hotel.images[currentSlide] || hotel.images[0]} alt="Slide" className="w-full h-full object-cover" />
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-900"><Sun className="w-6 h-6" /></div>
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
                  <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider px-1">{groupName}</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {groupItems.map((cat) => {
                      const presetObj = cat.presetData;
                      const title = cat.customTitle || (presetObj.title[lang] || presetObj.title.de);
                      const sub = presetObj.subtitle[lang] || presetObj.subtitle.de;
                      
                      // Şablondaki {val1} ve {val2} yer tutucularını otelcinin girdiği özel değerlerle dinamik değiştiriyoruz
                      const rawTpl = presetObj.contentTpl[lang] || presetObj.contentTpl.de;
                      const content = rawTpl.replace('{val1}', cat.val1 || '').replace('{val2}', cat.val2 || '');

                      return (
                        <button key={cat.id} onClick={() => setSelectedCategory({ title, content })} className="w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between text-left cursor-pointer hover:border-amber-900/40 transition">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">{renderIcon(cat.icon)}</div>
                            <div>
                              <h5 className="text-sm font-extrabold text-slate-900">{title}</h5>
                              <p className="text-xs text-slate-500">{sub}</p>
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

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-stone-200/80 z-50 shadow-2xl">
        <nav className="px-3 py-2 flex justify-around items-center">
          <button onClick={() => { setActiveTab('home'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'home' && !selectedCategory ? 'text-amber-900' : 'text-stone-400'}`}>
            <Info className="w-5 h-5" /><span>{t.navHome}</span>
          </button>
          <button onClick={() => { setActiveTab('services'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'services' || selectedCategory ? 'text-amber-900' : 'text-stone-400'}`}>
            <Compass className="w-5 h-5" /><span>{t.navGaestemappe}</span>
          </button>
          <a href={hotel.googleReviewUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 text-[10px] font-bold text-stone-400 hover:text-amber-500 cursor-pointer">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" /><span>{t.navReview}</span>
          </a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 text-[10px] font-bold text-stone-400 hover:text-sky-600 cursor-pointer">
            <Navigation className="w-5 h-5 text-sky-600" /><span>{t.navRoute}</span>
          </a>
        </nav>
      </div>
    </div>
  );
}