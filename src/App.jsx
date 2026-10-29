import React, { useState } from 'react';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, CloudSun, Menu, X, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Key, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, Timer, BarChart3, Zap
} from 'lucide-react';

const translations = {
  de: {
    welcomeBadge: "Digitale Gästemappe",
    welcomeButton: "Los geht's",
    navHome: "Home",
    navGaestemappe: "Gästemappe",
    navAdmin: "Admin",
    schnellzugriffTitle: "Schnellzugriff",
    wlanTitle: "WLAN",
    parkingTitle: "Parkplatz",
    breakfastTitle: "Frühstück",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Zurück zur Übersicht",
    detailLabel: "Detailinfo",
    adminTitle: "Verwaltung (Admin Panel)",
    adminUnlockMode: "Bearbeitungsmodus Aktiv",
    adminLockMode: "Ansichtsmodus (Geschützt)",
    adminBtnLock: "Sperren",
    adminBtnUnlock: "Entsperren",
    trialTitle: "30-Tage Testversion (PRO)",
    trialDaysLeft: "Tage verbleibend",
    trialUpgradeBtn: "Jetzt PRO Lizenz sichern",
    statsTitle: "Nutzungsstatistik",
    statsScans: "QR-Code Scans (Gäste-Aufrufe)",
    statsActiveRooms: "Aktive Zimmer-Zugriffe",
    qrTitle: "QR-Code & Print-Center (A4, A5, Visitenkarte)",
    qrSubtitle: "Erstellen Sie professionelle Aufsteller für Ihre Zimmer und Rezeption.",
    printA4: "Druckvorlage A4",
    printA5: "Druckvorlage A5",
    printCard: "Druckvorlage Visitenkarte",
    sec1Title: "1. Hotelinformationen & Kontaktdaten",
    sec2Title: "2. Logo hochladen (Max. 2 MB)",
    sec3Title: "3. Bilderverwaltung (Max. 5 Bilder, max. 5 MB pro Bild)",
    sec4Title: "4. Bilder für den Willkommensbildschirm und den Startseiten-Slider",
    sec5Title: "5. Schnellzugriff (Standard & Max. 2 Custom)",
    sec6Title: "6. Kategorien der Gästemappe",
    lblHotelName: "Hotel Name",
    lblGreeting: "Begrüßungstext",
    lblPhone: "Telefon",
    lblEmail: "E-Mail",
    lblAddress: "Adresse",
    lblWebsite: "Webseite",
    lblWifiSsid: "WLAN SSID",
    lblWifiPass: "WLAN Passwort",
    lblBreakfastTime: "Frühstückszeiten",
    lblCheckInOut: "Check-in / Check-out Infos",
    lblParkingInfo: "Parkplatz Info",
    btnLogoUpload: "Logo Seç / Değiştir",
    btnAddCategory: "Neue Kategorie hinzufügen",
    btnCatSubmit: "Kategorie Hinzufügen"
  }
};

export default function App() {
  const [lang] = useState('de');
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  
  const [isEditUnlocked, setIsEditUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedWifi, setCopiedWifi] = useState(false);

  // Trial & QR İstatistik State'leri
  const [scanCount] = useState(142);
  const [daysLeft] = useState(24);

  // Otel Bilgileri
  const [hotel, setHotel] = useState({
    logoUrl: '', 
    name: 'Mein Hotel', 
    welcomeGreeting: 'Herzlich Willkommen!',
    phone: '+49 123 456789',
    email: 'info@mein-hotel.de',
    address: 'Hauptstraße 1, 67150 Deidesheim',
    website: 'www.mein-hotel.de',
    wifiSsid: 'Guest_WiFi',
    wifiPass: 'pass2026',
    breakfastTime: '07:00 - 10:30 Uhr',
    checkInOut: 'Check-in: ab 15:00 | Check-out: bis 11:00',
    parkingInfo: 'Kostenfreie Parkplätze am Haus verfügbar.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ]
  });

  const hotelSlug = hotel.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const hotelUrl = `https://gastemappe24-pro.vercel.app/?hotel=${hotelSlug}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(hotelUrl)}`;

  // PDF Baskı Fonksiyonu
  const handlePrint = (format) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>QR-Code ${format} ${hotel.name}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; text-align: center; color: #1e293b; margin: 0; padding: 40px; background: #fff; }
            .container { max-width: ${format === 'A4' ? '600px' : format === 'A5' ? '450px' : '300px'}; margin: 0 auto; border: 2px solid #e2e8f0; border-radius: 24px; padding: 40px 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
            .logo { width: 80px; height: 80px; object-fit: cover; border-radius: 16px; margin-bottom: 15px; border: 1px solid #cbd5e1; }
            .hotel-name { font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; margin-bottom: 5px; }
            .greeting { font-size: 16px; font-weight: 700; color: #b45309; margin-bottom: 5px; }
            .guide-title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 25px; }
            .qr-box { background: #f8fafc; padding: 20px; border-radius: 20px; display: inline-block; border: 1px solid #e2e8f0; margin-bottom: 25px; }
            .qr-img { width: 200px; height: 200px; display: block; }
            .instructions { font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 30px; }
            .footer { border-top: 1px solid #e2e8f0; pt-3; margin-top: 20px; font-size: 11px; color: #64748b; line-height: 1.5; }
            @media print { body { padding: 0; } .container { border: none; box-shadow: none; } }
          </style>
        </head>
        <body>
          <div class="container">
            ${hotel.logoUrl ? `<img src="${hotel.logoUrl}" class="logo" />` : ''}
            <div class="hotel-name">${hotel.name}</div>
            <div class="greeting">${hotel.welcomeGreeting}</div>
            <div class="guide-title">Digitaler Gästemappe</div>
            
            <div class="qr-box">
              <img src="${qrCodeUrl}" class="qr-img" />
            </div>

            <div class="instructions">📱 Kamera öffnen & QR-Code scannen</div>

            <div class="footer">
              <b>${hotel.address}</b><br/>
              Tel: ${hotel.phone} | E-Mail: ${hotel.email}<br/>
              Web: ${hotel.website}
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const [customQuickLinks, setCustomQuickLinks] = useState([]);
  const [newQuick, setNewQuick] = useState({ title: '', description: '', iconName: 'Info' });

  const [categories, setCategories] = useState([
    {
      id: 'gastronomie',
      title: 'Gastronomie & Bar',
      subtitle: 'Speisekarten & Öffnungszeiten',
      content: 'Genießen Sie unsere regionale Küche und erlesene Weine.',
      iconName: 'Utensils'
    },
    {
      id: 'wellness',
      title: 'Wellness & SPA',
      subtitle: 'Sauna & Massagen',
      content: 'Entspannen Sie in unserem modernen Wellnessbereich.',
      iconName: 'Heart'
    },
    {
      id: 'az_guide',
      title: 'Wichtiges von A bis Z',
      subtitle: 'Rezeption, Wäsche & Infos',
      content: 'Wichtige Informationen für Ihren Aufenthalt auf einen Blick.',
      iconName: 'Info'
    }
  ]);

  const [newCat, setNewCat] = useState({ title: '', subtitle: '', content: '', iconName: 'Info' });
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const copyWifiPassword = () => {
    navigator.clipboard.writeText(hotel.wifiPass);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2500);
  };

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'Rina21091987') {
      setIsEditUnlocked(true);
      setShowUnlockModal(false);
      setShowWelcomeScreen(false);
      setActiveTab('admin');
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleAddCustomQuick = (e) => {
    e.preventDefault();
    if (!newQuick.title.trim()) return;
    if (customQuickLinks.length >= 2) {
      alert('Sie können maximal 2 eigene Schnellzugriffe hinzufügen.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      title: newQuick.title,
      description: newQuick.description || 'Details',
      iconName: newQuick.iconName
    };

    setCustomQuickLinks([...customQuickLinks, newItem]);
    setNewQuick({ title: '', description: '', iconName: 'Info' });
  };

  const handleDeleteCustomQuick = (id) => {
    setCustomQuickLinks(customQuickLinks.filter(item => item.id !== id));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCat.title.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      title: newCat.title,
      subtitle: newCat.subtitle || 'Informationen',
      content: newCat.content || 'Details folgen in Kürze.',
      iconName: newCat.iconName
    };

    setCategories([...categories, newItem]);
    setNewCat({ title: '', subtitle: '', content: '', iconName: 'Info' });
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const renderCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-5 h-5 text-amber-800" />;
      case 'Heart': return <Heart className="w-5 h-5 text-amber-800" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-800" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-800" />;
      case 'Car': return <Car className="w-5 h-5 text-amber-800" />;
      case 'Phone': return <Phone className="w-5 h-5 text-amber-800" />;
      case 'Globe': return <Globe className="w-5 h-5 text-amber-800" />;
      default: return <Info className="w-5 h-5 text-amber-800" />;
    }
  };

  const handleImageUpload = (e) => {
    if (!isEditUnlocked) { setShowUnlockModal(true); return; }
    setUploadError('');
    setUploadSuccess('');
    const files = Array.from(e.target.files);

    if (hotel.images.length + files.length > 5) {
      setUploadError('Maximale Anzahl von 5 Fotos erreicht!');
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError(`Die Datei "${file.name}" überschreitet 5MB!`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setHotel((prev) => ({ ...prev, images: [...prev.images, reader.result] }));
        setUploadSuccess('Foto erfolgreich hinzugefügt!');
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    if (!isEditUnlocked) { setShowUnlockModal(true); return; }
    setHotel((prev) => ({ ...prev, images: prev.images.filter((_, idx) => idx !== indexToRemove) }));
  };

  const handleLogoUpload = (e) => {
    if (!isEditUnlocked) { setShowUnlockModal(true); return; }
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('Das Logo darf maximal 2MB groß sein.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => { setHotel((prev) => ({ ...prev, logoUrl: reader.result })); };
      reader.readAsDataURL(file);
    }
  };

  // 1. WELCOME SCREEN
  if (showWelcomeScreen) {
    return (
      <div className="min-h-screen bg-slate-950 max-w-md mx-auto shadow-2xl relative overflow-hidden flex flex-col justify-between font-sans">
        <div className="absolute inset-0 z-0">
          <img 
            src={hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'} 
            alt="Welcome Background" 
            className="w-full h-full object-cover object-center brightness-75 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
        </div>

        <div className="relative z-10 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            {hotel.logoUrl ? (
              <img src={hotel.logoUrl} alt="Hotel Logo" className="w-8 h-8 rounded-lg object-cover bg-white/10 backdrop-blur-md p-1 border border-white/20" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-xs border border-white/20">
                {hotel.name.charAt(0)}
              </div>
            )}
            <span className="text-xs font-bold tracking-wider uppercase opacity-90">{hotel.name}</span>
          </div>

          <button 
            type="button"
            onClick={() => setShowUnlockModal(true)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition text-white cursor-pointer"
            title="Admin Panel"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="relative z-10 p-6 space-y-4 text-white">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">
              {t.welcomeBadge}
            </span>
            <h1 className="text-3xl font-black tracking-tight pt-2 drop-shadow-md">
              {hotel.welcomeGreeting}
            </h1>
          </div>

          <button 
            onClick={() => setShowWelcomeScreen(false)}
            className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-sm shadow-2xl hover:bg-slate-100 transition flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <span>{t.welcomeButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* WELCOME SCREEN IÇINDEKI UNLOCK MODAL */}
        {showUnlockModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl space-y-4 animate-fade-in text-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-800">
                  <Lock className="w-5 h-5" />
                  <h2 className="font-bold text-base text-slate-900">Bearbeiten entsperren</h2>
                </div>
                <button onClick={() => setShowUnlockModal(false)} className="text-stone-400 font-bold p-1">✕</button>
              </div>
              <p className="text-xs text-stone-500">
                Bitte geben Sie das Entwickler-Passwort ein (Rina21091987), um Änderungen vorzunehmen.
              </p>
              <form onSubmit={handleUnlockSubmit} className="space-y-3">
                <input 
                  type="password" 
                  placeholder="Passwort..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full p-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 font-mono"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-[11px] text-rose-600 font-bold">Falsches Passwort!</p>
                )}
                <button type="submit" className="w-full bg-amber-800 text-white py-3 rounded-xl text-xs font-bold shadow-md">
                  Entsperren
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-24 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      
      {/* UNLOCK MODAL (ANA EKRAN) */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800">
                <Lock className="w-5 h-5" />
                <h2 className="font-bold text-base text-slate-900">Bearbeiten entsperren</h2>
              </div>
              <button onClick={() => setShowUnlockModal(false)} className="text-stone-400 font-bold p-1">✕</button>
            </div>
            <p className="text-xs text-stone-500">
              Bitte geben Sie das Entwickler-Passwort ein (Rina21091987), um Änderungen vorzunehmen.
            </p>
            <form onSubmit={handleUnlockSubmit} className="space-y-3">
              <input 
                type="password" 
                placeholder="Passwort..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-3 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 font-mono"
                autoFocus
              />
              {passwordError && (
                <p className="text-[11px] text-rose-600 font-bold">Falsches Passwort!</p>
              )}
              <button type="submit" className="w-full bg-amber-800 text-white py-3 rounded-xl text-xs font-bold shadow-md">
                Entsperren
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SADELEŞTİRİLMİŞ HEADER (HAYALET BUTON TAMAMEN TEMİZLENDİ) */}
      <header className="p-5 pt-7 pb-3 bg-stone-50 border-b border-stone-200/60 sticky top-0 z-40 backdrop-blur-md bg-stone-50/90">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {hotel.logoUrl ? (
              <img src={hotel.logoUrl} alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-stone-200 shadow-sm" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {hotel.name.charAt(0)}
              </div>
            )}
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 block">WILLKOMMEN BEI</span>
              <h2 className="text-sm font-extrabold text-slate-900 leading-tight">{hotel.name}</h2>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-5 space-y-5">
        
        {/* CATEGORY DETAILS */}
        {selectedCategory ? (
          <div className="space-y-4 animate-fade-in">
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-amber-800 flex items-center gap-1 hover:underline mb-2"
            >
              &larr; {t.detailBack}
            </button>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-4">
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-800 font-bold">
                  {renderCategoryIcon(selectedCategory.iconName)}
                </div>
                <div>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase">{t.detailLabel}</span>
                  <h2 className="text-lg font-black mt-1 text-slate-900">{selectedCategory.title}</h2>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedCategory.content}</p>
            </div>
          </div>
        ) : (
          <>
            {/* 1. HOME TAB */}
            {activeTab === 'home' && (
              <div className="space-y-5 animate-fade-in">
                {/* Slider */}
                <div className="relative rounded-2xl overflow-hidden shadow-md h-48 bg-slate-900 group">
                  <img 
                    src={hotel.images[currentSlide] || hotel.images[0]} 
                    alt={`Slide ${currentSlide}`} 
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {hotel.images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                      {hotel.images.map((_, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-1.5 rounded-full transition-all ${currentSlide === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> {currentSlide + 1}/{hotel.images.length}
                  </div>
                </div>

                {/* SCHNELLZUGRIFF CARDS */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">{t.schnellzugriffTitle}</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* WLAN */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/80 space-y-2 flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-amber-800">
                        <Wifi className="w-5 h-5" />
                        <span className="font-bold text-xs text-slate-900">{t.wlanTitle}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono bg-stone-50 p-2 rounded-lg border">
                        <div>SSID: <b>{hotel.wifiSsid}</b></div>
                        <div className="flex justify-between items-center mt-1">
                          <span>Pass: {hotel.wifiPass}</span>
                          <button 
                            onClick={copyWifiPassword}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-1 rounded transition"
                          >
                            {copiedWifi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* PARKPLATZ */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/80 space-y-2 flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-amber-800">
                        <Car className="w-5 h-5" />
                        <span className="font-bold text-xs text-slate-900">{t.parkingTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{hotel.parkingInfo}</p>
                    </div>

                    {/* FRÜHSTÜCK */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/80 space-y-2 flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-amber-800">
                        <Coffee className="w-5 h-5" />
                        <span className="font-bold text-xs text-slate-900">{t.breakfastTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium">{hotel.breakfastTime}</p>
       {/* CHECK-IN / CHECK-OUT */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/80 space-y-2 flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-amber-800">
                        <Clock className="w-5 h-5" />
                        <span className="font-bold text-xs text-slate-900">{t.checkInOutTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{hotel.checkInOut}</p>
                    </div>
                  </div>
                </div>

                {/* GÄSTEMAPPE KATEGORIEN LISTESI */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">{t.navGaestemappe}</h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat)}
                        className="w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-sm hover:border-amber-800/40 transition flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center group-hover:scale-105 transition">
                            {renderCategoryIcon(cat.iconName)}
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900">{cat.title}</h4>
                            <p className="text-xs text-slate-500">{cat.subtitle}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. ADMIN TAB */}
            {activeTab === 'admin' && (
              <div className="space-y-5 animate-fade-in">
                {/* STATUS BAR */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isEditUnlocked ? <Unlock className="w-5 h-5 text-emerald-600" /> : <Lock className="w-5 h-5 text-amber-800" />}
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{t.adminTitle}</h3>
                      <p className="text-[10px] text-stone-500">
                        {isEditUnlocked ? t.adminUnlockMode : t.adminLockMode}
                      </p>
                    </div>
                  </div>
                  {isEditUnlocked ? (
                    <button 
                      onClick={() => setIsEditUnlocked(false)}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1.5 rounded-xl text-xs font-bold transition"
                    >
                      {t.adminBtnLock}
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowUnlockModal(true)}
                      className="bg-amber-800 hover:bg-amber-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow transition"
                    >
                      {t.adminBtnUnlock}
                    </button>
                  )}
                </div>

                {/* STATS & TRIAL CARDS */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{t.trialTitle}</span>
                    <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-mono font-bold">
                      {daysLeft} {t.trialDaysLeft}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                      <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 font-medium block">{t.statsScans}</span>
                        <span className="text-base font-black text-white">{scanCount}</span>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                      <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-lg">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 font-medium block">{t.statsActiveRooms}</span>
                        <span className="text-base font-black text-sky-400">100% aktiv</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDF PRINT-CENTER & QR CODE SECTION */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                    <QrCode className="w-4 h-4" />
                    <span>{t.qrTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                    {t.qrSubtitle}
                  </p>
                  
                  <div className="bg-stone-50 p-4 rounded-2xl inline-block border border-stone-200 shadow-inner my-2">
                    <img 
                      src={qrCodeUrl} 
                      alt="Hotel QR Code" 
                      className="w-36 h-36 mx-auto rounded-lg shadow-sm"
                    />
                    <span className="block text-[10px] text-slate-400 font-mono mt-2 truncate max-w-[200px] mx-auto">
                      {hotelUrl}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <button 
                      onClick={() => handlePrint('A4')}
                      className="bg-stone-900 hover:bg-black text-white p-2.5 rounded-xl text-[11px] font-bold shadow transition flex flex-col items-center gap-1"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                      <span>{t.printA4}</span>
                    </button>
                    <button 
                      onClick={() => handlePrint('A5')}
                      className="bg-stone-900 hover:bg-black text-white p-2.5 rounded-xl text-[11px] font-bold shadow transition flex flex-col items-center gap-1"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                      <span>{t.printA5}</span>
                    </button>
                    <button 
                      onClick={() => handlePrint('Visitenkarte')}
                      className="bg-stone-900 hover:bg-black text-white p-2.5 rounded-xl text-[11px] font-bold shadow transition flex flex-col items-center gap-1"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                      <span>{t.printCard}</span>
                    </button>
                  </div>
                </div>

                {/* STEP 1: Hotelinformationen & Kontaktdaten */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-3">
                  <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Edit3 className="w-4 h-4 text-amber-800" /> {t.sec1Title}
                  </h3>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblHotelName}</label>
                    <input 
                      type="text" 
                      value={hotel.name}
                      disabled={!isEditUnlocked}
                      onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
                      className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 text-stone-500 cursor-not-allowed' : ''}`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblGreeting}</label>
                    <input 
                      type="text" 
                      value={hotel.welcomeGreeting}
                      disabled={!isEditUnlocked}
                      onChange={(e) => setHotel({ ...hotel, welcomeGreeting: e.target.value })}
                      className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 text-stone-500 cursor-not-allowed' : ''}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblPhone}</label>
                      <input 
                        type="text" 
                        value={hotel.phone}
                        disabled={!isEditUnlocked}
                        onChange={(e) => setHotel({ ...hotel, phone: e.target.value })}
                        className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblEmail}</label>
                      <input 
                        type="text" 
                        value={hotel.email}
                        disabled={!isEditUnlocked}
                        onChange={(e) => setHotel({ ...hotel, email: e.target.value })}
                        className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblAddress}</label>
                    <input 
                      type="text" 
                      value={hotel.address}
                      disabled={!isEditUnlocked}
                      onChange={(e) => setHotel({ ...hotel, address: e.target.value })}
                      className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblWebsite}</label>
                    <input 
                      type="text" 
                      value={hotel.website}
                      disabled={!isEditUnlocked}
                      onChange={(e) => setHotel({ ...hotel, website: e.target.value })}
                      className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>

                {/* STEP 2: Logo hochladen */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-3">
                  <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-amber-800" /> {t.sec2Title}
                  </h3>
                  <div className="flex items-center gap-4">
                    {hotel.logoUrl ? (
                      <img src={hotel.logoUrl} alt="Logo Prev" className="w-12 h-12 rounded-xl object-cover border" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-stone-100 border border-dashed flex items-center justify-center text-[10px] text-stone-400">
                        No Logo
                      </div>
                    )}
                    <label className={`px-3 py-2 rounded-xl text-xs font-bold transition ${isEditUnlocked ? 'bg-stone-100 hover:bg-stone-200 text-slate-700 cursor-pointer' : 'bg-stone-100 text-stone-400 cursor-not-allowed'}`}>
                      {t.btnLogoUpload}
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* STEP 3 & 4: Bilderverwaltung */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-4">
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-amber-800" /> {t.sec3Title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium text-amber-800">
                      {t.sec4Title}
                    </p>
                  </div>

                  {uploadError && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}
                  {uploadSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-xl text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{uploadSuccess}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2">
                    {hotel.images.map((img, index) => (
                      <div key={index} className="relative rounded-xl overflow-hidden h-20 group border border-slate-200">
                        <img src={img} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                        {isEditUnlocked && (
                          <button 
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full shadow-md hover:bg-rose-700 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}

                    {hotel.images.length < 5 && (
                      <label className={`border-2 border-dashed border-stone-300 rounded-xl h-20 flex flex-col items-center justify-center transition ${isEditUnlocked ? 'cursor-pointer hover:border-amber-800 hover:bg-amber-50/50' : 'cursor-not-allowed opacity-60'}`}>
                        <Plus className="w-5 h-5 text-stone-400" />
                        <span className="text-[10px] text-stone-500 font-medium mt-1">Foto hinzufügen</span>
                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={!isEditUnlocked} />
                      </label>
                    )}
                  </div>
                </div>

                {/* STEP 5: Schnellzugriff */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-4">
                  <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Wifi className="w-4 h-4 text-amber-800" /> {t.sec5Title}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblWifiSsid}</label>
                      <input 
                        type="text" 
                        value={hotel.wifiSsid}
                        disabled={!isEditUnlocked}
                        onChange={(e) => setHotel({ ...hotel, wifiSsid: e.target.value })}
                        className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblWifiPass}</label>
                      <input 
                        type="text" 
                        value={hotel.wifiPass}
                        disabled={!isEditUnlocked}
                        onChange={(e) => setHotel({ ...hotel, wifiPass: e.target.value })}
                        className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblBreakfastTime}</label>
                      <input 
                        type="text" 
                        value={hotel.breakfastTime}
                        disabled={!isEditUnlocked}
                        onChange={(e) => setHotel({ ...hotel, breakfastTime: e.target.value })}
                        className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblCheckInOut}</label>
                      <input 
                        type="text" 
                        value={hotel.checkInOut}
                        disabled={!isEditUnlocked}
                        onChange={(e) => setHotel({ ...hotel, checkInOut: e.target.value })}
                        className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblParkingInfo}</label>
                      <input 
                        type="text" 
                        value={hotel.parkingInfo}
                        disabled={!isEditUnlocked}
                        onChange={(e) => setHotel({ ...hotel, parkingInfo: e.target.value })}
                        className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl ${!isEditUnlocked ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Özel Schnellzugriff Yönetimi */}
                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <h4 className="font-bold text-[11px] text-amber-800 uppercase">Eigene Schnellzugriffe (Aktuell: {customQuickLinks.length}/2)</h4>
                    
                    <div className="space-y-2">
                      {customQuickLinks.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                          <div className="flex items-center gap-2">
                            {renderCategoryIcon(item.iconName)}
                            <div>
                              <span className="font-bold text-slate-900 block">{item.title}</span>
                              <span className="text-[10px] text-slate-500">{item.description}</span>
                            </div>
                          </div>
                          {isEditUnlocked && (
                            <button 
                              onClick={() => handleDeleteCustomQuick(item.id)}
                              className="bg-rose-50 text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {isEditUnlocked && customQuickLinks.length < 2 && (
                      <form onSubmit={handleAddCustomQuick} className="space-y-2 pt-2">
                        <input 
                          type="text" 
                          placeholder="Titel (z.B. Fahrradverleih)"
                          value={newQuick.title}
                          onChange={(e) => setNewQuick({ ...newQuick, title: e.target.value })}
                          className="w-full p-2 text-xs border border-stone-200 rounded-xl"
                        />
                        <input 
                          type="text" 
                          placeholder="Beschreibung (z.B. An der Rezeption)"
                          value={newQuick.description}
                          onChange={(e) => setNewQuick({ ...newQuick, description: e.target.value })}
                          className="w-full p-2 text-xs border border-stone-200 rounded-xl"
                        />
                        <select 
                          value={newQuick.iconName}
                          onChange={(e) => setNewQuick({ ...newQuick, iconName: e.target.value })}
                          className="w-full p-2 text-xs border border-stone-200 rounded-xl bg-white"
                        >
                          <option value="Info">Info</option>
                          <option value="Phone">Telefon</option>
                          <option value="Globe">Webseite</option>
                          <option value="Coffee">Coffee</option>
                        </select>
                        <button type="submit" className="w-full bg-amber-800 text-white py-2 rounded-xl text-xs font-bold shadow-md hover:bg-amber-900 transition flex items-center justify-center gap-1">
                          <Plus className="w-3.5 h-3.5" /> Schnellzugriff hinzufügen
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* STEP 6: Kategorien der Gästemappe */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-4">
                  <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-amber-800" /> {t.sec6Title}
                  </h3>

                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                        <div className="flex items-center gap-2">
                          {renderCategoryIcon(cat.iconName)}
                          <div>
                            <span className="font-bold text-slate-900 block">{cat.title}</span>
                            <span className="text-[10px] text-slate-500">{cat.subtitle}</span>
                          </div>
                        </div>
                        {isEditUnlocked && (
                          <button 
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg transition"
                            title="Löschen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {isEditUnlocked ? (
                    <form onSubmit={handleAddCategory} className="pt-3 border-t border-stone-100 space-y-3">
                      <h4 className="font-bold text-[11px] text-amber-800 uppercase">{t.btnAddCategory}</h4>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Titel</label>
                        <input 
                          type="text" 
                          placeholder="z.B. Pool & Wellness"
                          value={newCat.title}
                          onChange={(e) => setNewCat({ ...newCat, title: e.target.value })}
                          className="w-full p-2.5 text-xs border border-stone-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Untertitel</label>
                        <input 
                          type="text" 
                          placeholder="z.B. Öffnungszeiten & Regeln"
                          value={newCat.subtitle}
                          onChange={(e) => setNewCat({ ...newCat, subtitle: e.target.value })}
                          className="w-full p-2.5 text-xs border border-stone-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Inhalt / Details</label>
                        <textarea 
                          rows="2"
                          placeholder="Ausführliche Beschreibung..."
                          value={newCat.content}
                          onChange={(e) => setNewCat({ ...newCat, content: e.target.value })}
                          className="w-full p-2.5 text-xs border border-stone-200 rounded-xl"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Icon Auswählen</label>
                        <select 
                          value={newCat.iconName}
                          onChange={(e) => setNewCat({ ...newCat, iconName: e.target.value })}
                          className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white"
                        >
                          <option value="Info">Info (Standard)</option>
                          <option value="Utensils">Gastronomie (Utensils)</option>
                          <option value="Heart">Wellness (Heart)</option>
                          <option value="Compass">Umgebung (Compass)</option>
                          <option value="Coffee">Frühstück (Coffee)</option>
                          <option value="Car">Parken (Car)</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full bg-amber-800 text-white py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-amber-900 transition flex items-center justify-center gap-1">
                        <Plus className="w-4 h-4" /> {t.btnCatSubmit}
                      </button>
                    </form>
                  ) : (
                    <p className="text-[10px] text-stone-400 italic text-center pt-2">Kategorien bearbeiten gesperrt. Bitte zuerst oben "Entsperren".</p>
                  )}
                </div>

              </div>
            )}
          </>
        )}

      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-stone-200/80 px-6 py-2 flex justify-between items-center z-50 shadow-2xl">
        <button 
          onClick={() => { setActiveTab('home'); setSelectedCategory(null); }}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'home' && !selectedCategory ? 'text-amber-800' : 'text-stone-400'}`}
        >
          <Info className="w-5 h-5" />
          <span>{t.navHome}</span>
        </button>

        <button 
          onClick={() => { setActiveTab('services'); setSelectedCategory(null); }}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'services' || selectedCategory ? 'text-amber-800' : 'text-stone-400'}`}
        >
          <Compass className="w-5 h-5" />
          <span>{t.navGaestemappe}</span>
        </button>

        <button 
          onClick={() => { setActiveTab('admin'); setSelectedCategory(null); }}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'admin' ? 'text-amber-800 font-extrabold' : 'text-stone-400'}`}
        >
          <Settings className="w-5 h-5" />
          <span>{t.navAdmin}</span>
        </button>
      </nav>

    </div>
  );
}