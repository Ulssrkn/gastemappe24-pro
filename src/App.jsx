import React, { useState } from 'react';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, CloudSun, Menu, X, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Key, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, Timer, BarChart3, Zap
} from 'lucide-react';
import { translations } from './translations';

export default function App() {
  const [lang, setLang] = useState('de');
  const t = translations[lang] || translations.de;

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
          <title>QR-Code ${format} - ${hotel.name}</title>
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
            .footer { border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 20px; font-size: 11px; color: #64748b; line-height: 1.5; }
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
            onClick={() => { setShowWelcomeScreen(false); setActiveTab('admin'); setSelectedCategory(null); }}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition text-white"
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
            className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-sm shadow-2xl hover:bg-slate-100 transition flex items-center justify-center gap-2 active:scale-98"
          >
            <span>{t.welcomeButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-24 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      
      {/* UNLOCK MODAL */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800">
                <Lock className="w-5 h-5" />
                <h2 className="font-bold text-base text-slate-900">Bearbeiten entsperren</h2>
              </div>
              <button onClick={() => setShowUnlockModal(false)} className="text-stone-400 font-bold">✕</button>
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

      {/* HEADER WITH LANGUAGE SELECTOR */}
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

          <div className="flex items-center gap-2">
            {/* 10 Dilli Dil Seçici */}
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-white border border-stone-200 text-slate-700 text-xs font-semibold rounded-xl px-2 py-2 focus:outline-none focus:ring-2 focus:ring-amber-800 cursor-pointer shadow-sm"
            >
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

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 bg-white border border-stone-200 text-slate-700 rounded-xl shadow-sm hover:bg-stone-100 transition"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-3 p-3 bg-white rounded-2xl shadow-xl border border-stone-200 space-y-1">
            <button 
              onClick={() => { setActiveTab('home'); setSelectedCategory(null); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === 'home' && !selectedCategory ? 'bg-amber-50 text-amber-900' : 'text-slate-600 hover:bg-stone-50'}`}
            >
              <span>{t.navHome}</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            <button 
              onClick={() => { setActiveTab('services'); setSelectedCategory(null); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === 'services' ? 'bg-amber-50 text-amber-900' : 'text-slate-600 hover:bg-stone-50'}`}
            >
              <span>{t.navGaestemappe}</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            <button 
              onClick={() => { setActiveTab('admin'); setSelectedCategory(null); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === 'admin' ? 'bg-amber-800 text-white' : 'text-amber-800 bg-amber-50/50 hover:bg-amber-100/50'}`}
            >
              <span>⚙️ {t.navAdmin}</span>
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="p-5 space-y-5">
        
        {/* CATEGORY DETAILS */}
        {selectedCategory ? (
          <div className="space-y-4">
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
              <div className="space-y-5">
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
                    </div>

                    {/* CHECK-IN / OUT */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/80 space-y-2 flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-amber-800">
                        <Clock className="w-5 h-5" />
                        <span className="font-bold text-xs text-slate-900">{t.checkInOutTitle}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-snug">{hotel.checkInOut}</p>
                    </div>

                    {/* CUSTOM QUICK LINKS */}
                    {customQuickLinks.map((item) => (
                      <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/80 space-y-2 flex flex-col justify-between relative group">
                        <div className="flex items-center gap-2 text-amber-800">
                          {renderCategoryIcon(item.iconName)}
                          <span className="font-bold text-xs text-slate-900">{item.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. GÄSTEMAPPE CATEGORIES */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{t.navGaestemappe}</h2>
                <div className="grid grid-cols-1 gap-2.5">
                  {categories.map((cat) => (
                    <div 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex items-center justify-between cursor-pointer hover:border-amber-800 transition group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="p-2.5 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition">
                          {renderCategoryIcon(cat.iconName)}
                        </div>
                        <div>
                          <h3 className="font-bold text-xs text-slate-900 group-hover:text-amber-800 transition">{cat.title}</h3>
                          <p className="text-[11px] text-slate-500 mt-0.5">{cat.subtitle}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. ADMIN PANEL */}
            {activeTab === 'admin' && (
              <div className="space-y-5">
                {/* ADMIN HEADER */}
                <div className="bg-amber-800 text-white p-4 rounded-2xl shadow-md flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-sm">{t.adminTitle}</h2>
                    <p className="text-[10px] text-amber-200">
                      {isEditUnlocked ? `🔓 ${t.adminUnlockMode}` : `🔒 ${t.adminLockMode}`}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      if (isEditUnlocked) { setIsEditUnlocked(false); } 
                      else { setShowUnlockModal(true); }
                    }}
                    className="bg-white/20 text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-white/30 transition flex items-center gap-1.5"
                  >
                    {isEditUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    {isEditUnlocked ? t.adminBtnLock : t.adminBtnUnlock}
                  </button>
                </div>

                {/* 30 GÜNLÜK TRIAL SAYAÇ & CANLI QR İSTATİSTİĞİ */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-2xl shadow-xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                        <Timer className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block">{t.trialTitle}</span>
                        <span className="text-sm font-black text-white">{daysLeft} {t.trialDaysLeft}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert('PRO Lizenz Upgrade-Prozess wird geöffnet...')}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-2 rounded-xl text-[11px] font-black shadow-lg transition flex items-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>PRO</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 font-medium block">{t.statsScans}</span>
                        <span className="text-base font-black text-emerald-400">{scanCount}</span>
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
                    <img src={qrCodeUrl} alt="QR Code" className="w-36 h-36 mx-auto rounded-lg" />
                    <span className="text-[10px] text-stone-400 font-mono mt-2 block">{hotelUrl}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <button onClick={() => handlePrint('A4')} className="bg-amber-50 hover:bg-amber-100 text-amber-900 py-2.5 px-2 rounded-xl text-[11px] font-bold transition flex flex-col items-center gap-1 border border-amber-200">
                      <Printer className="w-4 h-4" />
                      <span>{t.printA4}</span>
                    </button>
                    <button onClick={() => handlePrint('A5')} className="bg-amber-50 hover:bg-amber-100 text-amber-900 py-2.5 px-2 rounded-xl text-[11px] font-bold transition flex flex-col items-center gap-1 border border-amber-200">
                      <Printer className="w-4 h-4" />
                      <span>{t.printA5}</span>
                    </button>
                    <button onClick={() => handlePrint('Card')} className="bg-amber-50 hover:bg-amber-100 text-amber-900 py-2.5 px-2 rounded-xl text-[11px] font-bold transition flex flex-col items-center gap-1 border border-amber-200">
                      <Printer className="w-4 h-4" />
                      <span>{t.printCard}</span>
                    </button>
                  </div>
                </div>

                {/* 1. EDIT FORM (HOTEL DETAILS) */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-4">
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider border-b pb-2">{t.sec1Title}</h3>
                  
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-500 font-medium mb-1">{t.lblHotelName}</label>
                      <input 
                        type="text" 
                        disabled={!isEditUnlocked}
                        value={hotel.name} 
                        onChange={(e) => setHotel({...hotel, name: e.target.value})}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 disabled:opacity-6