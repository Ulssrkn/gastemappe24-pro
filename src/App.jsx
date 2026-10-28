import React, { useState, useEffect } from 'react';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Globe, Phone, Plus, Trash2, 
  QrCode, Check, Image as ImageIcon,
  ChevronRight, CloudSun, Menu, X, ArrowRight, Upload, AlertCircle
} from 'lucide-react';

export default function App() {
  // Navigation & Screen States
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'services', 'events', 'chat', 'admin'
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Active Image Index for Slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fully Dynamic Hotel Data (No Hard-coded Names)
  const [hotel, setHotel] = useState({
    logoUrl: '', // Sol üst küçük otel logosu
    name: 'Ihre Unterkunft', // Varsayılan dinamik otel ismi
    welcomeGreeting: 'Hallo, schön dass du da bist.',
    wifiSsid: 'Hotel_Guest_WiFi',
    wifiPass: 'welcome2026',
    phone: '+49 123 456789',
    weatherTemp: '19°C',
    weatherDesc: 'Sonnig',
    // 5 fotoğraflık dinamik medya dizisi (Karşılama ve Slider aynı diziyi kullanır)
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
    ]
  });

  // Admin Medya Yükleme Bildirimleri
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // URL Query Parametresi ile Admin Modu
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
      setShowWelcomeScreen(false);
      setActiveTab('admin');
    }
  }, []);

  // Fotoğraf Yükleme İşleyicisi (Max 5 Fotoğraf & Max 5MB)
  const handleImageUpload = (e) => {
    setUploadError('');
    setUploadSuccess('');
    const files = Array.from(e.target.files);

    if (hotel.images.length + files.length > 5) {
      setUploadError('Maximale Anzahl von 5 Fotos erreicht! (En fazla 5 fotoğraf yükleyebilirsiniz)');
      return;
    }

    files.forEach((file) => {
      // 5 MB = 5 * 1024 * 1024 bytes
      if (file.size > 5 * 1024 * 1024) {
        setUploadError(`Die Datei "${file.name}" überschreitet 5MB! (Maksimum dosya boyutu 5MB olmalıdır)`);
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

  // Fotoğraf Silme
  const handleRemoveImage = (indexToRemove) => {
    setHotel((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Logo Yükleme İşleyicisi (Max 2MB)
  const handleLogoUpload = (e) => {
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
  // 1. ÖNCELİK: BİREBİR KARŞILAMA (WELCOME / LANDING) EKRANI
  // -------------------------------------------------------------
  if (showWelcomeScreen) {
    return (
      <div className="min-h-screen bg-slate-950 max-w-md mx-auto shadow-2xl relative overflow-hidden flex flex-col justify-between font-sans">
        {/* Arka Plan Görseli (Medya dizisinin ilk elemanı) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'} 
            alt="Welcome Background" 
            className="w-full h-full object-cover object-center brightness-75 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
        </div>

        {/* Üst Bar / Logo / Admin Butonu */}
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
            onClick={() => { setIsAdmin(true); setShowWelcomeScreen(false); setActiveTab('admin'); }}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition text-white"
            title="Admin Panel"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Alt Bilgi & Giriş Butonu */}
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
  // 2. ANA MİSAFİR PANELİ & ADMIN PANELİ
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-24 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      
      {/* İSTEDİĞİN HEADER MİMARİSİ: Sol üstte Otel Logosı + Adı | Sağ üstte Menü Navigasyonu */}
      <header className="p-5 pt-7 pb-3 bg-stone-50 border-b border-stone-200/60 sticky top-0 z-40 backdrop-blur-md bg-stone-50/90">
        <div className="flex justify-between items-center">
          
          {/* Sol Üst: Otel Logosu & Hemen Altında İsmi */}
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

          {/* Sağ Üst: Menü Navigasyonu Butonu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 bg-white border border-stone-200 text-slate-700 rounded-xl shadow-sm hover:bg-stone-100 transition"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Açılır Açılır Menü Navigasyonu */}
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
              onClick={() => { setIsAdmin(!isAdmin); setIsMenuOpen(false); if (!isAdmin) setActiveTab('admin'); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${isAdmin ? 'bg-amber-500 text-white' : 'text-amber-800 bg-amber-50/50 hover:bg-amber-100/50'}`}
            >
              <span>{isAdmin ? '⚙️ Admin Modundan Çık' : '⚙️ Admin Girişi'}</span>
            </button>
          </div>
        )}
      </header>

      {/* İÇERİK ALANI */}
      <main className="p-5 space-y-5">
        
        {/* MISAFIR HOME SEKMESI */}
        {activeTab === 'home' && (
          <div className="space-y-5">
            
            {/* İSTEDİĞİN SLIDER MİMARİSİ: Karşılama ekranı ile aynı fotoğrafları kullanan 5'li Slider */}
            <div className="relative rounded-2xl overflow-hidden shadow-md h-52 bg-slate-900 group">
              <img 
                src={hotel.images[currentSlide] || hotel.images[0]} 
                alt={`Slide ${currentSlide}`} 
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Slider Noktaları (Dots) */}
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

              {/* Slide Sayacı */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <ImageIcon className="w-3 h-3" /> {currentSlide + 1}/{hotel.images.length}
              </div>
            </div>

            {/* Hava Durumu Widget'ı */}
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

            {/* Gästemappe Hızlı Giriş Kartı */}
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

            {/* Schnellzugriff (Hızlı Erişim) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Schnellzugriff</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/80 space-y-2 hover:border-amber-400 transition cursor-pointer">
                  <div className="p-2.5 bg-stone-100 text-slate-700 rounded-xl w-fit">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">WLAN</h4>
                    <p className="text-[10px] text-slate-500">Zugangsdaten & Passwort</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/80 space-y-2 hover:border-amber-400 transition cursor-pointer">
                  <div className="p-2.5 bg-stone-100 text-slate-700 rounded-xl w-fit">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Rezeption</h4>
                    <p className="text-[10px] text-slate-500">Direkt Anrufen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. DÜZELTİLMİŞ & STABİL ADMIN PANELİ */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'admin' && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-amber-500 text-white p-4 rounded-2xl shadow-md flex justify-between items-center">
              <div>
                <h2 className="font-bold text-sm">Verwaltung (Admin Panel)</h2>
                <p className="text-[10px] text-amber-100">Hotel-Medien & Einstellungen</p>
              </div>
              <button 
                onClick={() => { setShowWelcomeScreen(true); setActiveTab('home'); }}
                className="bg-white/20 text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-white/30 transition"
              >
                Vorschau (Önizleme)
              </button>
            </div>

            {/* OTEL LOGO YÜKLEME ALANI */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-3">
              <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-600" /> Otel Logosu (Max 2MB)
              </h3>
              <div className="flex items-center gap-4">
                {hotel.logoUrl ? (
                  <img src={hotel.logoUrl} alt="Logo Prev" className="w-12 h-12 rounded-xl object-cover border" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-stone-100 border border-dashed flex items-center justify-center text-[10px] text-stone-400">
                    No Logo
                  </div>
                )}
                <label className="bg-stone-100 hover:bg-stone-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition">
                  Logo Seç / Değiştir
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* FOTOĞRAF YÜKLEME ALANI (MAX 5 FOTO & MAX 5MB) */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-4">
              <div>
                <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-600" /> Willkommen & Slider Fotos (Max 5 Fotos, max 5MB)
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Bu fotoğraflar hem karşılama ekranında hem de ana sayfa slider'ında görünür.
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

              {/* Yüklü Fotoğraf Listesi */}
              <div className="grid grid-cols-3 gap-2">
                {hotel.images.map((img, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden h-20 group border border-slate-200">
                    <img src={img} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full shadow-md hover:bg-rose-700 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {hotel.images.length < 5 && (
                  <label className="border-2 border-dashed border-stone-300 rounded-xl h-20 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition">
                    <Plus className="w-5 h-5 text-stone-400" />
                    <span className="text-[10px] text-stone-500 font-medium mt-1">Foto hinzufügen</span>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* OTEL ADI & TEMEL BİLGİ DÜZENLEME */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-3">
              <h3 className="font-bold text-xs text-slate-900">Hotel Details</h3>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hotel Name</label>
                <input 
                  type="text" 
                  value={hotel.name}
                  onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
                  className="w-full p-2.5 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Begrüßungstext (Karşılama Metni)</label>
                <input 
                  type="text" 
                  value={hotel.welcomeGreeting}
                  onChange={(e) => setHotel({ ...hotel, welcomeGreeting: e.target.value })}
                  className="w-full p-2.5 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
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

        {isAdmin && (
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'admin' ? 'text-amber-600 font-extrabold' : 'text-stone-400'}`}
          >
            <Settings className="w-5 h-5" />
            <span>Admin</span>
          </button>
        )}
      </nav>

    </div>
  );
}