import React, { useState } from 'react';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Globe, Phone, Plus, Trash2, 
  QrCode, Check, Image as ImageIcon,
  ChevronRight, CloudSun, Menu, X, ArrowRight, Upload, AlertCircle, Lock, Unlock
} from 'lucide-react';

export default function App() {
  // Navigation & Screen States
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'services', 'admin'
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Admin Görünür ama Düzenleme Kilitli (Default: false)
  const [isEditUnlocked, setIsEditUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  // Active Image Index for Slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fully Dynamic Hotel Data (No Hard-coded Names)
  const [hotel, setHotel] = useState({
    logoUrl: '', 
    name: 'Ihre Unterkunft', 
    welcomeGreeting: 'Hallo, schön dass du da bist.',
    wifiSsid: 'Hotel_Guest_WiFi',
    wifiPass: 'welcome2026',
    phone: '+49 123 456789',
    weatherTemp: '19°C',
    weatherDesc: 'Sonnig',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
    ]
  });

  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Şifre ile Düzenleme Kilidini Açma
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

  // Fotoğraf Yükleme (Kilit Açıksa Çalışır)
  const handleImageUpload = (e) => {
    if (!isEditUnlocked) {
      setShowUnlockModal(true);
      return;
    }
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
        setHotel((prev) => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
        setUploadSuccess('Foto erfolgreich hinzugefügt!');
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    if (!isEditUnlocked) {
      setShowUnlockModal(true);
      return;
    }
    setHotel((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleLogoUpload = (e) => {
    if (!isEditUnlocked) {
      setShowUnlockModal(true);
      return;
    }
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('Das Logo darf maximal 2MB groß sein.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setHotel((prev) => ({ ...prev, logoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // -------------------------------------------------------------
  // KARŞILAMA (WELCOME / LANDING) EKRANI
  // -------------------------------------------------------------
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
            onClick={() => { setShowWelcomeScreen(false); setActiveTab('admin'); }}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition text-white"
            title="Admin Panel"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="relative z-10 p-6 space-y-4 text-white">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">
              Digitale Gästemappe
            </span>
            <h1 className="text-3xl font-black tracking-tight pt-2 drop-shadow-md">
              {hotel.welcomeGreeting}
            </h1>
          </div>

          <button 
            onClick={() => setShowWelcomeScreen(false)}
            className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-sm shadow-2xl hover:bg-slate-100 transition flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Los geht's</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ANA MİSAFİR PANELİ & ADMIN PANELİ
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-24 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      
      {/* ŞİFRE İSTEME MODALI (Yalnızca değişiklik yapılmak istendiğinde açılır) */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800">
                <Lock className="w-5 h-5" />
                <h2 className="font-bold text-base text-slate-900">Bearbeiten entsperren</h2>
              </div>
              <button onClick={() => setShowUnlockModal(false)} className="text-stone-400 font-bold">✕</button>
            </div>
            <p className="text-xs text-stone-500">
              Bitte geben Sie das Entwickler-Passwort ein, um Änderungen vorzunehmen.
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

      {/* HEADER */}
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

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 bg-white border border-stone-200 text-slate-700 rounded-xl shadow-sm hover:bg-stone-100 transition"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-3 p-3 bg-white rounded-2xl shadow-xl border border-stone-200 space-y-1 animate-fade-in">
            <button 
              onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === 'home' ? 'bg-amber-50 text-amber-900' : 'text-slate-600 hover:bg-stone-50'}`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            <button 
              onClick={() => { setActiveTab('services'); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === 'services' ? 'bg-amber-50 text-amber-900' : 'text-slate-600 hover:bg-stone-50'}`}
            >
              <span>Gästemappe & Services</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            <button 
              onClick={() => { setActiveTab('admin'); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === 'admin' ? 'bg-amber-800 text-white' : 'text-amber-800 bg-amber-50/50 hover:bg-amber-100/50'}`}
            >
              <span>⚙️ Admin Panel (Ansicht)</span>
            </button>
          </div>
        )}
      </header>

      {/* İÇERİK ALANI */}
      <main className="p-5 space-y-5">
        
        {/* HOME SEKMESI */}
        {activeTab === 'home' && (
          <div className="space-y-5">
            <div className="relative rounded-2xl overflow-hidden shadow-md h-52 bg-slate-900 group">
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

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-stone-200/80 flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900">{hotel.weatherTemp}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{hotel.weatherDesc}</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-stone-200/80 flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900">Vorhersage</span>
                  <span className="text-[10px] text-slate-500 font-medium">7 Tage Details</span>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('services')}
              className="bg-amber-100/70 p-4 rounded-2xl border border-amber-200/80 flex justify-between items-center cursor-pointer hover:bg-amber-100 transition shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-800 text-white rounded-xl shadow-sm">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-amber-950">Gästemappe</h4>
                  <p className="text-[11px] text-amber-900/80 mt-0.5">WLAN, Haus-Infos & Services</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-900" />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* HERKESİN GÖREBİLDİĞİ AMA KİLİTLİ ADMIN PANELİ */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'admin' && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-amber-800 text-white p-4 rounded-2xl shadow-md flex justify-between items-center">
              <div>
                <h2 className="font-bold text-sm">Verwaltung (Admin Panel)</h2>
                <p className="text-[10px] text-amber-200">
                  {isEditUnlocked ? '🔓 Bearbeitungsmodus Aktiv' : '🔒 Ansichtsmodus (Geschützt)'}
                </p>
              </div>
              <button 
                onClick={() => {
                  if (isEditUnlocked) {
                    setIsEditUnlocked(false);
                  } else {
                    setShowUnlockModal(true);
                  }
                }}
                className="bg-white/20 text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-white/30 transition flex items-center gap-1.5"
              >
                {isEditUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                {isEditUnlocked ? 'Sperren' : 'Entsperren'}
              </button>
            </div>

            {!isEditUnlocked && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0 text-amber-800" />
                <span>Dieses Admin-Panel ist im Nur-Lese-Modus. Klicken Sie oben auf "Entsperren", um Änderungen vorzunehmen.</span>
              </div>
            )}

            {/* LOGO YÖNETİMİ */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-3">
              <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-800" /> Otel Logosu (Max 2MB)
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
                  Logo Seç / Değiştir
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* FOTOĞRAF YÖNETİMİ */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-4">
              <div>
                <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-800" /> Willkommen & Slider Fotos (Max 5 Fotos)
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Karşılama ekranı ve ana sayfa slider'ı ortak olarak bu fotoğrafları kullanır.
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

            {/* OTEL BİLGİLERİ */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-3">
              <h3 className="font-bold text-xs text-slate-900">Hotel Details</h3>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hotel Name</label>
                <input 
                  type="text" 
                  value={hotel.name}
                  disabled={!isEditUnlocked}
                  onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
                  className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 ${!isEditUnlocked ? 'bg-stone-100 text-stone-500 cursor-not-allowed' : ''}`}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Begrüßungstext</label>
                <input 
                  type="text" 
                  value={hotel.welcomeGreeting}
                  disabled={!isEditUnlocked}
                  onChange={(e) => setHotel({ ...hotel, welcomeGreeting: e.target.value })}
                  className={`w-full p-2.5 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 ${!isEditUnlocked ? 'bg-stone-100 text-stone-500 cursor-not-allowed' : ''}`}
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-stone-200/80 px-6 py-2 flex justify-between items-center z-50 shadow-2xl">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'home' ? 'text-amber-800' : 'text-stone-400'}`}
        >
          <Info className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button 
          onClick={() => setActiveTab('services')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'services' ? 'text-amber-800' : 'text-stone-400'}`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Services</span>
        </button>

        <button 
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'admin' ? 'text-amber-800 font-extrabold' : 'text-stone-400'}`}
        >
          <Settings className="w-5 h-5" />
          <span>Admin</span>
        </button>
      </nav>

    </div>
  );
}