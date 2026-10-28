import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-supabase-js';
import { 
  Wifi, Utensils, Info, MapPin, Calendar, MessageSquare, 
  Settings, LogOut, Globe, Phone, Clock, Plus, Trash2, Edit3, QrCode, Check
} from 'lucide-react';

// Supabase Bağlantısı
const SUPABASE_URL = 'https://bkjvzyosvsizysmslgj.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Kendi Anon Key'iniz
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');
  const [isAdmin, setIsAdmin] = useState(false);
  const [lang, setLang] = useState('de');
  const [hotelData, setHotelData] = useState({
    name: 'Hotel Sonnenschein',
    welcomeTitle: 'Herzlich Willkommen!',
    welcomeText: 'Wir freuen uns, Sie als unseren Gast begrüßen zu dürfen.',
    wifiSsid: 'Hotel_Guest_WiFi',
    wifiPass: 'welcome2026',
    phone: '+49 123 456789',
    address: 'Hauptstraße 12, 67150 Niederkirchen'
  });

  const [categories, setCategories] = useState([
    { id: '1', title: 'Restaurant & Bar', icon: 'Utensils' },
    { id: '2', title: 'Services & SPA', icon: 'Info' },
    { id: '3', title: 'Umgebung & Ausflüge', icon: 'MapPin' }
  ]);

  useEffect(() => {
    // URL parametrelerinden admin veya otel bilgisini kontrol et
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      
      {/* Üst Header / Branding */}
      <header className="bg-emerald-600 text-white p-5 rounded-b-3xl shadow-lg relative">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold tracking-wider bg-emerald-700/60 px-3 py-1 rounded-full uppercase">
            Digitale Gästemappe
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg backdrop-blur-sm transition"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang.toUpperCase()}
            </button>
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`p-1.5 rounded-lg transition ${isAdmin ? 'bg-amber-400 text-slate-900' : 'bg-white/20 text-white'}`}
              title="Admin Panel"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{hotelData.name}</h1>
        <p className="text-xs text-emerald-100 flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3" /> {hotelData.address}
        </p>
      </header>

      {/* Admin Bildirimi Barı */}
      {isAdmin && (
        <div className="bg-amber-100 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex justify-between items-center font-medium">
          <span>⚙️ Admin Modu Aktif</span>
          <button onClick={() => setIsAdmin(false)} className="underline text-amber-800">Çıkış</button>
        </div>
      )}

      {/* Ana İçerik Alanı */}
      <main className="p-4 space-y-4">
        
        {/* TAB 1: Hoş Geldiniz & Wi-Fi */}
        {activeTab === 'welcome' && (
          <div className="space-y-4 animate-fade-in">
            {/* Wi-Fi Kartı (Belturo/Guestary Tarzı Hızlı Erişim) */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 rounded-2xl shadow-md relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">WLAN / Wi-Fi Access</h3>
                    <p className="text-xs text-slate-400">Kostenloses Highspeed-Internet</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 bg-white/10 p-3 rounded-xl backdrop-blur-md flex justify-between items-center text-xs">
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase tracking-wider">Netzwerk</span>
                  <span className="font-mono font-bold text-emerald-300">{hotelData.wifiSsid}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase tracking-wider">Passwort</span>
                  <span className="font-mono font-bold text-emerald-300">{hotelData.wifiPass}</span>
                </div>
              </div>
            </div>

            {/* Hoş Geldiniz Mesajı */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-2">
              <h2 className="text-lg font-bold text-slate-900">{hotelData.welcomeTitle}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{hotelData.welcomeText}</p>
            </div>

            {/* Hızlı İletişim Butonları */}
            <div className="grid grid-cols-2 gap-3">
              <a 
                href={`tel:${hotelData.phone}`} 
                className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 font-medium text-xs hover:bg-emerald-100 transition"
              >
                <Phone className="w-4 h-4" /> Rezeption Rufen
              </a>
              <button 
                onClick={() => setActiveTab('feedback')}
                className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 p-3 rounded-xl border border-slate-200 font-medium text-xs hover:bg-slate-200 transition"
              >
                <MessageSquare className="w-4 h-4" /> Feedback
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Hizmetler & Kategoriler */}
        {activeTab === 'services' && (
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 px-1">Hotel Services & Infos</h2>
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:border-emerald-200 transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{cat.title}</h4>
                    <p className="text-xs text-slate-500">Öffnungszeiten & Speisekarte</p>
                  </div>
                </div>
                <span className="text-xs text-emerald-600 font-semibold">&rarr;</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: QR Kod & Admin Ayarları */}
        {activeTab === 'admin' && isAdmin && (
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-600" /> QR Code Generator
            </h2>
            <p className="text-xs text-slate-500">Drucken Sie diesen QR-Code für Ihre Hotelzimmer aus.</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 text-center flex flex-col items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.origin + '?hotel=hotel-new-start')}`} 
                alt="Hotel QR Code" 
                className="w-36 h-36 rounded-lg shadow-sm"
              />
              <span className="text-[11px] text-slate-400 mt-2 font-mono">Scan for Digital Guest Map</span>
            </div>
          </div>
        )}

        {/* TAB 4: Geri Bildirim Formu */}
        {activeTab === 'feedback' && (
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <h2 className="text-base font-bold text-slate-900">Ihre Meinung ist uns wichtig</h2>
            <p className="text-xs text-slate-500">Wie gefällt Ihnen Ihr Aufenthalt?</p>
            <textarea 
              rows="4" 
              placeholder="Ihre Nachricht an die Rezeption..."
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
            <button className="w-full bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700 transition">
              Nachricht Senden
            </button>
          </div>
        )}

      </main>

      {/* Belturo / Guestary Tarzı Alt Mobil Gezinme Menüsü (Bottom Navigation) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-slate-200 px-6 py-2 flex justify-between items-center z-50">
        <button 
          onClick={() => setActiveTab('welcome')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'welcome' ? 'text-emerald-600' : 'text-slate-400'}`}
        >
          <Info className="w-5 h-5" />
          <span>Übersicht</span>
        </button>
        <button 
          onClick={() => setActiveTab('services')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'services' ? 'text-emerald-600' : 'text-slate-400'}`}
        >
          <Utensils className="w-5 h-5" />
          <span>Services</span>
        </button>
        <button 
          onClick={() => setActiveTab('feedback')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'feedback' ? 'text-emerald-600' : 'text-slate-400'}`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Feedback</span>
        </button>
        {isAdmin && (
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'admin' ? 'text-amber-600' : 'text-slate-400'}`}
          >
            <QrCode className="w-5 h-5" />
            <span>Admin QR</span>
          </button>
        )}
      </nav>

    </div>
  );
}