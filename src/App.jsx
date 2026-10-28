import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Wifi, Info, Coffee, Utensils, MapPin, Phone, Globe, Instagram, Facebook, 
  Settings, Plus, Trash2, Edit3, Check, X, Shield, BarChart2, QrCode, 
  Image as ImageIcon, Share2, Award, Heart, HelpCircle, AlertCircle, ChevronRight
} from 'lucide-react';

// --- SUPABASE BAĞLANTISI (YENİ PROJE) ---
const SUPABASE_URL = 'https://bkjvzyosvsizysmslgj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJranZ6eW9zdnNpenlzeW1zbGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyMDY2NDMsImV4cCI6MjEwODc4MjY0M30.EjYcIlGDL3iIb9frrqnumf8-nv2U9e6hm88hyM5r4PM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [hotelSlug, setHotelSlug] = useState('hotel-new-start');
  const [accommodation, setAccommodation] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states for Admin
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatContent, setNewCatContent] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('📌');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('hotel') || 'hotel-new-start';
    const adminMode = params.get('admin') === 'true';
    setHotelSlug(slug);
    setIsAdmin(adminMode);

    fetchData(slug);
  }, []);

  const fetchData = async (slug) => {
    setLoading(true);
    try {
      // 1. Fetch Accommodation
      let { data: accData, error: accErr } = await supabase
        .from('accommodations')
        .select('*')
        .eq('id', slug)
        .single();

      if (accErr && accErr.code === 'PGRST116') {
        // Fallback default if not found
        accData = {
          id: slug,
          name: 'Hotel New Start',
          tagline: 'Willkommen in Ihrem neuen Lieblingsort!',
          wifi_name: 'NewStart_Guest',
          wifi_pass: 'Start2026!',
          address: 'Musterstraße 1, 67146 Deidesheim',
          qr_scans: 0,
          link_clicks: 0,
          logo_url: '🏨',
          images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80']
        };
      }
      setAccommodation(accData);

      // Increment scan count for guest view
      if (!isAdmin && accData) {
        await supabase
          .from('accommodations')
          .update({ qr_scans: (accData.qr_scans || 0) + 1 })
          .eq('id', slug);
      }

      // 2. Fetch Categories
      let { data: catData, error: catErr } = await supabase
        .from('categories')
        .select('*')
        .eq('hotel_slug', slug)
        .order('sort_order', { ascending: true });

      if (!catErr && catData) {
        setCategories(catData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatTitle || !newCatContent) return;

    const newCat = {
      hotel_slug: hotelSlug,
      title: newCatTitle,
      desc_text: newCatDesc,
      content: newCatContent,
      icon: newCatIcon || '📌',
      tab_type: 'overview',
      sort_order: categories.length + 1
    };

    const { data, error } = await supabase
      .from('categories')
      .insert([newCat])
      .select();

    if (!error && data) {
      setCategories([...categories, data[0]]);
      setNewCatTitle('');
      setNewCatDesc('');
      setNewCatContent('');
    }
  };

  const handleDeleteCategory = async (id) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">gastemappe24-pro yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{accommodation?.logo_url || '🏨'}</span>
            <div>
              <h1 className="font-bold text-slate-800 text-lg leading-tight">
                {accommodation?.name || 'Hotel New Start'}
              </h1>
              <p className="text-xs text-slate-500">{accommodation?.tagline}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAdmin(!isAdmin)} 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
              isAdmin ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isAdmin ? 'Admin Kapat' : 'Admin'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Admin Dashboard */}
        {isAdmin && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <h2 className="font-bold text-amber-900 text-sm flex items-center space-x-2">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Yönetici Paneli (gastemappe24-pro)</span>
              </h2>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-3 rounded-xl border border-amber-100 text-center">
                <span className="text-xs text-slate-500 block">QR Okuma</span>
                <span className="text-xl font-bold text-amber-600">{accommodation?.qr_scans || 0}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-amber-100 text-center">
                <span className="text-xs text-slate-500 block">Kategori Sayısı</span>
                <span className="text-xl font-bold text-amber-600">{categories.length}</span>
              </div>
            </div>

            {/* Add New Category Form */}
            <form onSubmit={handleAddCategory} className="bg-white p-3 rounded-xl border border-amber-100 space-y-3">
              <h3 className="font-semibold text-xs text-slate-700">Yeni Bilgi/Kategori Ekle</h3>
              <input 
                type="text" 
                placeholder="Başlık (ör. Kahvaltı Saatleri)" 
                value={newCatTitle} 
                onChange={(e) => setNewCatTitle(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:border-amber-500"
              />
              <input 
                type="text" 
                placeholder="Kısa Açıklama (ör. 07:00 - 10:30)" 
                value={newCatDesc} 
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:border-amber-500"
              />
              <textarea 
                placeholder="Detaylı İçerik..." 
                value={newCatContent} 
                onChange={(e) => setNewCatContent(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:border-amber-500 h-20"
              />
              <button 
                type="submit" 
                className="w-full bg-amber-600 text-white font-semibold text-xs py-2.5 rounded-lg hover:bg-amber-700 transition"
              >
                Kategori Ekle
              </button>
            </form>
          </div>
        )}

        {/* Guest View Features */}
        {/* Wi-Fi Card */}
        {accommodation?.wifi_name && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-4 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-blue-200" />
              <h3 className="font-semibold text-sm">WLAN / Wi-Fi Bilgileri</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-blue-200">Ağ Adı:</span>
                <span className="font-bold">{accommodation.wifi_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Şifre:</span>
                <span className="font-mono bg-white/20 px-2 py-0.5 rounded">{accommodation.wifi_pass}</span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Categories List */}
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{cat.title}</h4>
                    {cat.desc_text && <p className="text-xs text-slate-500">{cat.desc_text}</p>}
                  </div>
                </div>
                {isAdmin && (
                  <button 
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-600 border-t border-slate-100 pt-2 leading-relaxed">
                {cat.content}
              </p>
            </div>
          ))}
        </div>

        {/* Hotel Address & Contact */}
        {accommodation?.address && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-600">
            <div className="flex items-center space-x-2 font-semibold text-slate-800">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Adres ve İletişim</span>
            </div>
            <p>{accommodation.address}</p>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="text-center py-6 text-xs text-slate-400">
        Powered by <strong className="text-slate-600">gastemappe24-pro</strong>
      </footer>
    </div>
  );
}