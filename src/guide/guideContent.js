export const themeColors = [
  { id: 'amber', name: 'Amber Warm', bg: 'bg-amber-900', text: 'text-amber-900', bgLight: 'bg-amber-50', border: 'border-amber-900/40' },
  { id: 'emerald', name: 'Forest Emerald', bg: 'bg-emerald-800', text: 'text-emerald-800', bgLight: 'bg-emerald-50', border: 'border-emerald-800/40' },
  { id: 'indigo', name: 'Royal Indigo', bg: 'bg-indigo-900', text: 'text-indigo-900', bgLight: 'bg-indigo-50', border: 'border-indigo-900/40' },
  { id: 'rose', name: 'Rose Luxury', bg: 'bg-rose-800', text: 'text-rose-800', bgLight: 'bg-rose-50', border: 'border-rose-800/40' },
  { id: 'slate', name: 'Classic Slate', bg: 'bg-slate-900', text: 'text-slate-900', bgLight: 'bg-slate-100', border: 'border-slate-900/40' },
  { id: 'violet', name: 'Deep Violet', bg: 'bg-violet-900', text: 'text-violet-900', bgLight: 'bg-violet-50', border: 'border-violet-900/40' },
  { id: 'cyan', name: 'Ocean Cyan', bg: 'bg-cyan-800', text: 'text-cyan-800', bgLight: 'bg-cyan-50', border: 'border-cyan-800/40' },
  { id: 'orange', name: 'Sunset Orange', bg: 'bg-orange-700', text: 'text-orange-700', bgLight: 'bg-orange-50', border: 'border-orange-700/40' }
];
export const quickAccessDefaults = {
  de:{wifi:{title:'WLAN',description:'Verbinden Sie sich mit unserem Gäste-WLAN.'},parking:{title:'Parkplatz',description:'Kostenfreie Parkplätze am Haus verfügbar.'},breakfast:{title:'Frühstück',description:'Frühstückszeiten: 07:30–10:30 Uhr.'},checkin:{title:'Check-in / Check-out',description:'Check-in ab 15:00 Uhr · Check-out bis 11:00 Uhr.'}},
  en:{wifi:{title:'Wi-Fi',description:'Connect to our guest Wi-Fi.'},parking:{title:'Parking',description:'Free parking is available at the property.'},breakfast:{title:'Breakfast',description:'Breakfast hours: 07:30–10:30.'},checkin:{title:'Check-in / Check-out',description:'Check-in from 3:00 PM · Check-out until 11:00 AM.'}},
  tr:{wifi:{title:'Kablosuz İnternet',description:'Misafir Wi-Fi ağımıza bağlanabilirsiniz.'},parking:{title:'Otopark',description:'Tesisimizde ücretsiz otopark mevcuttur.'},breakfast:{title:'Kahvaltı',description:'Kahvaltı saatleri: 07:30–10:30.'},checkin:{title:'Giriş / Çıkış',description:'Giriş 15:00 itibarıyla · Çıkış 11:00’e kadar.'}},
  fr:{wifi:{title:'Wi-Fi',description:'Connectez-vous à notre Wi-Fi client.'},parking:{title:'Parking',description:'Un parking gratuit est disponible sur place.'},breakfast:{title:'Petit-déjeuner',description:'Horaires : 07h30–10h30.'},checkin:{title:'Arrivée / Départ',description:'Arrivée dès 15h · Départ avant 11h.'}},
  hr:{wifi:{title:'Wi-Fi',description:'Povežite se s našom Wi-Fi mrežom za goste.'},parking:{title:'Parkiralište',description:'Besplatno parkiralište dostupno je u sklopu objekta.'},breakfast:{title:'Doručak',description:'Vrijeme doručka: 07:30–10:30.'},checkin:{title:'Prijava / Odjava',description:'Prijava od 15:00 · Odjava do 11:00.'}},
  it:{wifi:{title:'Wi-Fi',description:'Connettiti alla nostra rete Wi-Fi per gli ospiti.'},parking:{title:'Parcheggio',description:'Parcheggio gratuito disponibile presso la struttura.'},breakfast:{title:'Colazione',description:'Orario colazione: 07:30–10:30.'},checkin:{title:'Check-in / Check-out',description:'Check-in dalle 15:00 · Check-out entro le 11:00.'}},
  es:{wifi:{title:'Wi-Fi',description:'Conéctese a nuestra red Wi-Fi para huéspedes.'},parking:{title:'Aparcamiento',description:'Hay aparcamiento gratuito en el establecimiento.'},breakfast:{title:'Desayuno',description:'Horario del desayuno: 07:30–10:30.'},checkin:{title:'Entrada / Salida',description:'Entrada desde las 15:00 · Salida hasta las 11:00.'}},
  sv:{wifi:{title:'Wi-Fi',description:'Anslut till vårt gäst-Wi-Fi.'},parking:{title:'Parkering',description:'Gratis parkering finns vid boendet.'},breakfast:{title:'Frukost',description:'Frukosttider: 07.30–10.30.'},checkin:{title:'Incheckning / Utcheckning',description:'Incheckning från 15.00 · Utcheckning senast 11.00.'}},
  no:{wifi:{title:'Wi-Fi',description:'Koble til vårt gjeste-Wi-Fi.'},parking:{title:'Parkering',description:'Gratis parkering er tilgjengelig på stedet.'},breakfast:{title:'Frokost',description:'Frokosttider: 07:30–10:30.'},checkin:{title:'Innsjekking / Utsjekking',description:'Innsjekking fra 15:00 · Utsjekking innen 11:00.'}},
  sq:{wifi:{title:'Wi-Fi',description:'Lidhu me rrjetin tonë Wi-Fi për mysafirët.'},parking:{title:'Parkim',description:'Parkim falas është i disponueshëm në ambientet tona.'},breakfast:{title:'Mëngjesi',description:'Orari i mëngjesit: 07:30–10:30.'},checkin:{title:'Hyrja / Dalja',description:'Hyrja nga ora 15:00 · Dalja deri në 11:00.'}}
};
export const emptyHotel = (name = '') => ({
  name, logoUrl: '', locationTitle: '', address: '', phone: '', email: '', website: '',
  reviewPlatform: 'google', googleReviewUrl: '', wifiSsid: '', wifiPass: '',
  publishGuestWifi: false, breakfastTime: '', checkInOut: '', parkingInfo: '',
  showWifi: false, showParking: false, showBreakfast: false, showCheckInOut: false,
  quickAccessContent: {}, themeColor: 'amber', images: [],
});
export const demoHotel = () => ({
  ...emptyHotel('Boutique Hotel & Suites'),
  breakfastTime: '07:30 – 10:30', checkInOut: 'Check-in 15:00 · Check-out 11:00',
  parkingInfo: quickAccessDefaults.de.parking.description,
  showBreakfast: true, showCheckInOut: true, showParking: true,
});
export const normalizeHotel = (saved, name) => ({
  ...emptyHotel(name), ...(saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}),
  images: Array.isArray(saved?.images) ? saved.images : [],
});
export const demoCategories = [
  { id: 'demo-wifi', categoryId: 'cat_hotel', presetId: 'wifi_internet', icon: 'Wifi',
    fieldValues: { wifi_available: true, network_name: 'Hotel-Guest-WiFi' } },
  { id: 'demo-sustainability', categoryId: 'cat_safety', presetId: 'cert_sustainability', icon: 'Award' },
];
