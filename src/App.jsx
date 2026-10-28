import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Wifi, Utensils, Info, MapPin, Calendar, MessageSquare, 
  Settings, LogOut, Globe, Phone, Clock, Plus, Trash2, Edit3, 
  QrCode, Check, Award, Coffee, Tv, Shield, Heart, Navigation, Send, Key
} from 'lucide-react';

// Supabase Entegrasyonu
const SUPABASE_URL = 'https://bkjvzyosvsizysmslgj.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');
  const [isAdmin, setIsAdmin] = useState(false);
  const [lang, setLang] = useState('de');
  
  // Otel Temel Verileri
  const [hotelData, setHotelData] = useState({
    name: 'Hotel Sonnenschein',
    subtitle: 'Boutique & Spa Resort',
    welcomeTitle: 'Herzlich Willkommen!',
    welcomeText: 'Wir freuen uns sehr, Sie bei uns begrüßen zu dürfen. Genießen Sie Ihren Aufenthalt mit unserer digitalen Gästemappe.',
    wifiSsid: 'Hotel_Guest_WiFi',
    wifiPass: 'welcome2026',
    phone: '+49 123 456789',
    address: 'Hauptstraße 12, 67150 Niederkirchen',
    checkOutTime: '11:00 Uhr',
    breakfastTime: '07:00 - 10:30 Uhr',
  });

  // Hizmet & Menü Kategorileri
  const [categories, setCategories] = useState([
    { id: '1', title: 'Restaurant & Bar', icon: 'Utensils', desc: 'Speisekarten, Öffnungszeiten & Tischreservierung' },
    { id: '2', title: 'Wellness & SPA', icon: 'Heart', desc: 'Sauna, Massagen & Entspannungsbereiche' },
    { id: '3', title: 'Zimmerservice & A-Z', icon: 'Coffee', desc: 'Wäscheservice, Kissenmenü & Rezeption' },
    { id: '4', title: 'Umgebung & Ausflüge', icon: 'MapPin', desc: 'Regionale Sehenswürdigkeiten & Wandertouren' },
  ]);

  // Restoran / Menü İçeriği
  const [menuItems, setMenuItems] = useState([
    { id: 'm1', name: 'Pfälzer Saumagen', price: '16.50 €', desc: 'Mit Sauerkraut und Kartoffelpüree', cat: 'Restaurant' },
    { id: 'm2', name: 'Riesling aus der Region (0.2l)', price: '6.00 €', desc: 'Trocken, Weingut Deidesheim', cat: 'Bar' },
  ]);

  // Geribildirim Formu State
  const [feedback, setFeedback] = useState({ room: '', message: '', sent: false });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (feedback.message.trim()) {
      setFeedback({ ...feedback, sent: true });
      setTimeout(() => setFeedback({ room: '', message: '', sent: false }), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 pb-24 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      
      {/* HEADER: Premium Mobil Uygulama Başlığı */}
      <header className="bg-slate-900 text-white p-6 rounded-b-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-4 relative z-10">
          <span className="text-[10px] tracking-widest font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full uppercase">
            Gastemappe24 Pro
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-md transition"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-bold">{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`p-1.5 rounded-lg transition ${isAdmin ? 'bg-amber-400 text-slate-900 font-bold' : 'bg-white/10 text-white hover:bg-white/20'}`}
              title="Admin Panel"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl font-black tracking-tight text-white">{hotelData.name}</h1>
          <p className="text-xs text-slate-400 font-medium">{hotelData.subtitle}</p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{hotelData.address}</span>
          </div>
        </div>
      </header>

      {/* Admin Panel Modu Aktif Uyarısı */}
      {isAdmin && (
        <div className="bg-amber-400/20 border-b border-amber-300/40 px-4 py-2 text-xs text-amber-900 font-bold flex justify-between items-center backdrop-blur-sm">
          <span>⚙️ Yönetici Paneli Modu</span>
          <button onClick={() => setIsAdmin(false)} className="underline hover:text-amber-950">Çıkış</button>
        </div>
      )}

      {/* İÇERİK ALANI */}
      <main className="p-4 space-y-4">
        
        {/* TAB 1: Genel Bakış & Wi-Fi */}
        {activeTab === 'welcome' && (
          <div className="space-y-4 animate-fade-in">
            
            {/* Wi-Fi Kartı (Hızlı Kopyalama & Bağlantı) */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
                    <Wifi className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">WLAN / Wi-Fi</h3>
                    <p className="text-[11px] text-emerald-100">Kostenfreies Highspeed Internet</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-white/10 backdrop-blur-md grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="block text-[10px] text-emerald-200/70 uppercase font-semibold">Netzwerk</span>
                  <span className="font-mono font-bold">{hotelData.wifiSsid}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-emerald-200/70 uppercase font-semibold">Passwort</span>
                  <span className="font-mono font-bold text-amber-300">{hotelData.wifiPass}</span>
                </div>
              </div>
            </div>

            {/* Hoş Geldiniz Mesajı */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                {hotelData.welcomeTitle}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">{hotelData.welcomeText}</p>
            </div>

            {/* Hızlı Bilgi Kartları (Önemli Saatler) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Frühstück</span>
                  <span className="text-xs font-bold text-slate-800">{hotelData.breakfastTime}</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-3">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Check-Out</span>
                  <span className="text-xs font-bold text-slate-800">{hotelData.checkOutTime}</span>
                </div>
              </div>
            </div>

            {/* Hızlı İletişim Butonları */}
            <div className="grid grid-cols-2 gap-3">
              <a 
                href={`tel:${hotelData.phone}`} 
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-3.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition"
              >
                <Phone className="w-4 h-4" /> Rezeption Rufen
              </a>
              <button 
                onClick={() => setActiveTab('feedback')}
                className="flex items-center justify-center gap-2 bg-slate-900 text-white p-3.5 rounded-xl font-bold text-xs shadow-md hover:bg-slate-800 transition"
              >
                <MessageSquare className="w-4 h-4" /> Feedback
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Hizmetler & A-Z Kategoriler */}
        {activeTab === 'services' && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 px-1 uppercase tracking-wider text-slate-500">
              Hotel Services & Angebote
            </h2>
            
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex justify-between items-center hover:border-emerald-500 transition cursor-pointer">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-slate-100 text-slate-800 rounded-xl">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{cat.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{cat.desc}</p>
                  </div>
                </div>
                <span className="text-slate-400 font-bold text-sm">&rarr;</span>
              </div>
            ))}

            {/* Örnek Menü / Ürünler */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 space-y-3 mt-4">
              <h3 className="font-bold text-xs text-slate-900 border-b pb-2">Empfehlungen des Hauses</h3>
              {menuItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-xs border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <div>
                    <span className="font-bold text-slate-800 block">{item.name}</span>
                    <span className="text-[10px] text-slate-500">{item.desc}</span>
                  </div>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Canlı QR Kod & Yönetici Ayarları */}
        {activeTab === 'admin' && isAdmin && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-600" /> Hotel QR Code Generator
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dieser QR-Code leitet Ihre Gäste direkt zu dieser digitalen Gästemappe weiter. Sie können ihn ausdrucken und auf den Zimmern platzieren.
              </p>

              <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300 text-center flex flex-col items-center justify-center">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.origin + '?hotel=hotel-new-start')}`} 
                  alt="Hotel QR Code" 
                  className="w-44 h-44 rounded-xl shadow-md border bg-white p-2"
                />
                <span className="text-[11px] text-slate-500 mt-3 font-mono">Scan to open Gastemappe</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Geri Bildirim Formu */}
        {activeTab === 'feedback' && (
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Ihre Meinung ist uns wichtig</h2>
              <p className="text-xs text-slate-500 mt-1">Haben Sie Wünsche oder Feedback an die Rezeption?</p>
            </div>

            {feedback.sent ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 text-xs font-medium flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                Vielen Dank! Ihre Nachricht wurde erfolgreich an die Rezeption übermittelt.
              </div>
            ) : (
              <form onSubmit={handleSendFeedback} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Zimmernummer (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="z.B. Zimmer 104"
                    value={feedback.room}
                    onChange={(e) => setFeedback({ ...feedback, room: e.target.value })}
                    className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Ihre Nachricht *</label>
                  <textarea 
                    required
                    rows="4" 
                    placeholder="Wie können wir Ihren Aufenthalt noch angenehmer gestalten?"
                    value={feedback.message}
                    onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                    className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition flex items-center justify-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Nachricht Senden
                </button>
              </form>
            )}
          </div>
        )}

      </main>

      {/* BOTTOM NAVIGATION: Belturo / Guestary Kalitesinde Mobil Alt Menü */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-6 py-2.5 flex justify-between items-center z-50 shadow-2xl">
        <button 
          onClick={() => setActiveTab('welcome')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'welcome' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Info className="w-5 h-5" />
          <span>Übersicht</span>
        </button>

        <button 
          onClick={() => setActiveTab('services')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'services' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Utensils className="w-5 h-5" />
          <span>Services</span>
        </button>

        <button 
          onClick={() => setActiveTab('feedback')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'feedback' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Feedback</span>
        </button>

        {isAdmin && (
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${activeTab === 'admin' ? 'text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <QrCode className="w-5 h-5" />
            <span>Admin QR</span>
          </button>
        )}
      </nav>

    </div>
  );
}