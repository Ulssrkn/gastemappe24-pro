import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BedDouble, Building2, BarChart3, Check, ChevronRight, HelpCircle, Clock3, ExternalLink, FileImage, Home, LayoutDashboard, MapPin, Palette, QrCode, Settings, ShieldCheck, Sparkles, Wifi, Utensils, Car } from 'lucide-react';

const languages = [
  ['de', '🇩🇪 DE'], ['en', '🇬🇧 EN'], ['tr', '🇹🇷 TR'], ['fr', '🇫🇷 FR'], ['es', '🇪🇸 ES'],
  ['hr', '🇭🇷 HR'], ['sq', '🇦🇱 SQ'], ['sv', '🇸🇪 SV'], ['nb', '🇳🇴 NB'], ['it', '🇮🇹 IT'],
];

const words = {
  de: {
    profileFields: ['Hotelname', 'Adresse', 'E-Mail', 'Website'],
    dayUnit: 'Tage',
    nav: ['Start', 'Unterkünfte', 'Analytik', 'Bearbeiten'], demo: 'Demo-Ansicht · Beispieldaten · Änderungen werden nicht gespeichert',
    hello: 'Guten Morgen', area: 'Arbeitsbereich', property: 'Waldquell am Tegernsee', completion: 'Einrichtung', complete: 'abgeschlossen',
    steps: ['Unterkunftsprofil', 'Logo', 'Fotos', 'Schnellzugriffe', '5 Gästebereiche'], ready: 'Was deine Gäste wirklich nutzen',
    guideViews: 'Gästeguide-Aufrufe', actions: 'Nützliche Aktionen', increase: 'zum Vormonat', range: 'Letzte 30 Tage',
    trend: 'Gästeguide-Aufrufe im Zeitverlauf', top: 'Meistgeöffnete Bereiche', views: 'Aufrufe', useful: 'Nützliche Aktionen',
    properties: 'Deine Unterkünfte', propertiesSub: 'Alle Unterkünfte in deinem Arbeitsbereich auf einen Blick.',
    active: 'Aktiv', content: 'Gästebereiche', rooms: 'Zimmertypen', edit: 'Gästemappe bearbeiten',
    sections: ['Profil', 'Gästebereiche', 'Schnellzugriff', 'Design', 'Logo & Fotos', 'QR-Code'],
    overview: 'Übersicht', setupTitle: 'Deine Gästemappe wird sichtbar', setupText: 'Mit jedem Schritt wird der Aufenthalt deiner Gäste einfacher.',
    guestAreas: ['Sehenswürdigkeiten', 'Restaurants & Cafés', 'Anreise & Parken', 'Wellness & Spa', 'Wissenswertes'],
    quick: ['WLAN', 'Parken', 'Frühstück', 'An- und Abreise'], save: 'Demo ansehen', guestView: 'Gastansicht öffnen',
    locked: 'Nur ansehen', lockedText: 'Alle Einstellungen sind in dieser Demo schreibgeschützt.',
    topPage: 'Meistbesuchte Seite', clicks: 'Link-Klicks', pageHome: 'Startseite', insights: 'Gästeinteresse',
    demo: 'Demo', sampleProperty: 'Beispielunterkunft',
  },
  en: {
    profileFields: ['Property name', 'Address', 'Email', 'Website'],
    dayUnit: 'days',
    nav: ['Overview', 'Properties', 'Analytics', 'Edit guide'], demo: 'Demo view · Sample data · Changes are not saved',
    hello: 'Good morning', area: 'Workspace', property: 'Waldquell at Lake Tegernsee', completion: 'Setup', complete: 'complete',
    steps: ['Property profile', 'Logo', 'Photos', 'Quick access', '5 guest areas'], ready: 'What your guests really use',
    guideViews: 'Guest guide views', actions: 'Useful actions', increase: 'vs. previous month', range: 'Last 30 days',
    trend: 'Guest guide views over time', top: 'Most opened areas', views: 'Views', useful: 'Useful actions',
    properties: 'Your properties', propertiesSub: 'All properties in your workspace at a glance.',
    active: 'Active', content: 'Guest areas', rooms: 'Room types', edit: 'Edit guest guide',
    sections: ['Profile', 'Guest areas', 'Quick access', 'Design', 'Logo & photos', 'QR code'],
    overview: 'Overview', setupTitle: 'Your guest guide is taking shape', setupText: 'Every step makes your guests’ stay easier.',
    guestAreas: ['Things to do', 'Restaurants & cafés', 'Getting here & parking', 'Wellness & spa', 'Good to know'],
    quick: ['Wi-Fi', 'Parking', 'Breakfast', 'Arrival & departure'], save: 'Explore demo', guestView: 'Open guest view',
    locked: 'View only', lockedText: 'All settings in this demo are read-only.',
    topPage: 'Most visited page', clicks: 'Link clicks', pageHome: 'Home page', insights: 'Guest interests',
    demo: 'Demo', sampleProperty: 'Sample property',
  },
  tr: {
    profileFields: ['Tesis adı', 'Adres', 'E-posta', 'Website'],
    dayUnit: 'gün',
    nav: ['Başlangıç', 'Tesisler', 'Analitik', 'Düzenle'], demo: 'Demo görünümü · Örnek veriler · Değişiklikler kaydedilmez',
    hello: 'Günaydın', area: 'Çalışma alanı', property: 'Waldquell Tegernsee', completion: 'Kurulum', complete: 'tamamlandı',
    steps: ['Tesis profili', 'Logo', 'Fotoğraflar', 'Hızlı erişim', '5 misafir kategorisi'], ready: 'Misafirlerin neleri kullanıyor?',
    guideViews: 'Misafir rehberi görüntülemesi', actions: 'Faydalı işlemler', increase: 'geçen aya göre', range: 'Son 30 gün',
    trend: 'Misafir rehberi görüntülemeleri', top: 'En çok açılan bölümler', views: 'Görüntüleme', useful: 'Faydalı işlem',
    properties: 'Tesislerin', propertiesSub: 'Çalışma alanındaki tesisleri bir arada görüntüle.',
    active: 'Aktif', content: 'Misafir kategorileri', rooms: 'Oda tipleri', edit: 'Misafir rehberini düzenle',
    sections: ['Profil', 'Misafir kategorileri', 'Hızlı erişim', 'Tasarım', 'Logo ve fotoğraflar', 'QR kodu'],
    overview: 'Genel bakış', setupTitle: 'Misafir rehberin şekilleniyor', setupText: 'Her adım misafirlerinin konaklamasını kolaylaştırır.',
    guestAreas: ['Gezilecek yerler', 'Restoran ve kafeler', 'Ulaşım ve otopark', 'Wellness ve spa', 'Bilmekte fayda var'],
    quick: ['Wi-Fi', 'Otopark', 'Kahvaltı', 'Giriş ve çıkış'], save: 'Demoyu incele', guestView: 'Misafir görünümü',
    locked: 'Salt okunur', lockedText: 'Bu demodaki ayarlar görüntülenebilir, değiştirilemez.',
    topPage: 'En çok ziyaret edilen sayfa', clicks: 'Bağlantı tıklaması', pageHome: 'Ana sayfa', insights: 'Misafir ilgisi',
    demo: 'Demo', sampleProperty: 'Örnek tesis',
  },
  fr: {
    profileFields: ['Nom du logement', 'Adresse', 'E-mail', 'Site web'],
    dayUnit: 'jours',
    nav: ['Accueil', 'Hébergements', 'Analytique', 'Modifier'], demo: 'Démo · Données fictives · Aucune modification enregistrée',
    hello: 'Bonjour', area: 'Espace de travail', property: 'Waldquell au lac Tegernsee', completion: 'Configuration', complete: 'terminée',
    steps: ['Profil', 'Logo', 'Photos', 'Accès rapides', '5 espaces invités'], ready: 'Ce que vos clients utilisent vraiment',
    guideViews: 'Vues du guide', actions: 'Actions utiles', increase: 'par rapport au mois précédent', range: '30 derniers jours',
    trend: 'Vues du guide au fil du temps', top: 'Espaces les plus consultés', views: 'Vues', useful: 'Actions utiles',
    properties: 'Vos hébergements', propertiesSub: 'Tous les hébergements de votre espace.',
    active: 'Actif', content: 'Espaces invités', rooms: 'Types de chambres', edit: 'Modifier le guide',
    sections: ['Profil', 'Espaces invités', 'Accès rapide', 'Design', 'Logo et photos', 'QR code'],
    overview: 'Aperçu', setupTitle: 'Votre guide prend forme', setupText: 'Chaque étape facilite le séjour de vos clients.',
    guestAreas: ['À découvrir', 'Restaurants et cafés', 'Accès et parking', 'Bien-être et spa', 'À savoir'],
    quick: ['Wi-Fi', 'Parking', 'Petit-déjeuner', 'Arrivée et départ'], save: 'Voir la démo', guestView: 'Vue client',
    locked: 'Lecture seule', lockedText: 'Tous les réglages de cette démo sont en lecture seule.',
    topPage: 'Page la plus visitée', clicks: 'Clics sur les liens', pageHome: 'Page d’accueil', insights: 'Intérêts des clients',
    demo: 'Démo', sampleProperty: 'Hébergement exemple',
  },
  es: {
    profileFields: ['Nombre del alojamiento', 'Dirección', 'Correo electrónico', 'Sitio web'],
    dayUnit: 'días',
    nav: ['Inicio', 'Alojamientos', 'Analítica', 'Editar'], demo: 'Demo · Datos de ejemplo · No se guardan cambios',
    hello: 'Buenos días', area: 'Espacio de trabajo', property: 'Waldquell en el lago Tegernsee', completion: 'Configuración', complete: 'completada',
    steps: ['Perfil', 'Logotipo', 'Fotos', 'Accesos rápidos', '5 áreas para huéspedes'], ready: 'Lo que realmente usan tus huéspedes',
    guideViews: 'Visitas a la guía', actions: 'Acciones útiles', increase: 'frente al mes anterior', range: 'Últimos 30 días',
    trend: 'Visitas a la guía a lo largo del tiempo', top: 'Áreas más abiertas', views: 'Visitas', useful: 'Acciones útiles',
    properties: 'Tus alojamientos', propertiesSub: 'Todos los alojamientos de tu espacio de trabajo.',
    active: 'Activo', content: 'Áreas para huéspedes', rooms: 'Tipos de habitación', edit: 'Editar guía',
    sections: ['Perfil', 'Áreas para huéspedes', 'Acceso rápido', 'Diseño', 'Logo y fotos', 'Código QR'],
    overview: 'Resumen', setupTitle: 'Tu guía para huéspedes va tomando forma', setupText: 'Cada paso facilita la estancia de tus huéspedes.',
    guestAreas: ['Qué visitar', 'Restaurantes y cafés', 'Cómo llegar y aparcar', 'Bienestar y spa', 'Información útil'],
    quick: ['Wi-Fi', 'Aparcamiento', 'Desayuno', 'Llegada y salida'], save: 'Ver demo', guestView: 'Vista de huésped',
    locked: 'Solo lectura', lockedText: 'Todos los ajustes de esta demo son de solo lectura.',
    topPage: 'Página más visitada', clicks: 'Clics en enlaces', pageHome: 'Página de inicio', insights: 'Interés de huéspedes',
    demo: 'Demo', sampleProperty: 'Alojamiento de ejemplo',
  },
  hr: {
    profileFields: ['Naziv smještaja', 'Adresa', 'E-pošta', 'Web-stranica'],
    dayUnit: 'dana',
    nav: ['Početna', 'Smještaji', 'Analitika', 'Uredi'], demo: 'Demo prikaz · Primjer podataka · Promjene se ne spremaju',
    hello: 'Dobro jutro', area: 'Radni prostor', property: 'Waldquell na jezeru Tegernsee', completion: 'Postavljanje', complete: 'dovršeno',
    steps: ['Profil smještaja', 'Logotip', 'Fotografije', 'Brzi pristup', '5 područja za goste'], ready: 'Što vaši gosti zaista koriste',
    guideViews: 'Pregledi vodiča', actions: 'Korisne radnje', increase: 'u odnosu na prošli mjesec', range: 'Posljednjih 30 dana',
    trend: 'Pregledi vodiča tijekom vremena', top: 'Najčešće otvorena područja', views: 'Pregledi', useful: 'Korisne radnje',
    properties: 'Vaši smještaji', propertiesSub: 'Svi smještaji u vašem radnom prostoru.',
    active: 'Aktivno', content: 'Područja za goste', rooms: 'Vrste soba', edit: 'Uredi vodič za goste',
    sections: ['Profil', 'Područja za goste', 'Brzi pristup', 'Dizajn', 'Logotip i fotografije', 'QR kod'],
    overview: 'Pregled', setupTitle: 'Vaš vodič za goste poprima oblik', setupText: 'Svaki korak olakšava boravak vašim gostima.',
    guestAreas: ['Znamenitosti', 'Restorani i kafići', 'Dolazak i parking', 'Wellness i spa', 'Korisne informacije'],
    quick: ['Wi-Fi', 'Parking', 'Doručak', 'Dolazak i odlazak'], save: 'Pregledaj demo', guestView: 'Prikaz za goste',
    locked: 'Samo za pregled', lockedText: 'Sve postavke u ovom demu su samo za čitanje.',
    topPage: 'Najposjećenija stranica', clicks: 'Klikovi na poveznice', pageHome: 'Početna stranica', insights: 'Interesi gostiju',
    demo: 'Demo', sampleProperty: 'Primjer smještaja',
  },
  sq: {
    profileFields: ['Emri i akomodimit', 'Adresa', 'Email', 'Faqja e internetit'],
    dayUnit: 'ditë',
    nav: ['Kryefaqja', 'Akomodimet', 'Analitika', 'Redakto'], demo: 'Demo · Të dhëna shembull · Ndryshimet nuk ruhen',
    hello: 'Mirëmëngjes', area: 'Hapësira e punës', property: 'Waldquell pranë liqenit Tegernsee', completion: 'Konfigurimi', complete: 'i përfunduar',
    steps: ['Profili', 'Logoja', 'Fotot', 'Qasja e shpejtë', '5 kategori për mysafirët'], ready: 'Çfarë përdorin vërtet mysafirët',
    guideViews: 'Shikime të udhëzuesit', actions: 'Veprime të dobishme', increase: 'krahasuar me muajin e kaluar', range: '30 ditët e fundit',
    trend: 'Shikimet e udhëzuesit me kalimin e kohës', top: 'Kategoritë më të hapura', views: 'Shikime', useful: 'Veprime të dobishme',
    properties: 'Akomodimet tuaja', propertiesSub: 'Të gjitha akomodimet në hapësirën tuaj të punës.',
    active: 'Aktiv', content: 'Kategoritë për mysafirët', rooms: 'Llojet e dhomave', edit: 'Redakto udhëzuesin',
    sections: ['Profili', 'Kategoritë', 'Qasja e shpejtë', 'Dizajni', 'Logoja dhe fotot', 'Kodi QR'],
    overview: 'Përmbledhje', setupTitle: 'Udhëzuesi juaj po merr formë', setupText: 'Çdo hap e bën qëndrimin më të lehtë për mysafirët.',
    guestAreas: ['Vende për t’u vizituar', 'Restorante dhe kafene', 'Mbërritja dhe parkimi', 'Wellness dhe spa', 'Informacione të dobishme'],
    quick: ['Wi-Fi', 'Parkimi', 'Mëngjesi', 'Mbërritja dhe largimi'], save: 'Shiko demon', guestView: 'Pamja e mysafirëve',
    locked: 'Vetëm për shikim', lockedText: 'Cilësimet në këtë demo janë vetëm për lexim.',
    topPage: 'Faqja më e vizituar', clicks: 'Klikime lidhjesh', pageHome: 'Faqja kryesore', insights: 'Interesi i mysafirëve',
    demo: 'Demo', sampleProperty: 'Akomodim shembull',
  },
  sv: {
    profileFields: ['Boendets namn', 'Adress', 'E-post', 'Webbplats'],
    dayUnit: 'dagar',
    nav: ['Översikt', 'Boenden', 'Analys', 'Redigera'], demo: 'Demo · Exempeldata · Ändringar sparas inte',
    hello: 'God morgon', area: 'Arbetsyta', property: 'Waldquell vid Tegernsee', completion: 'Konfiguration', complete: 'klar',
    steps: ['Boendeprofil', 'Logotyp', 'Bilder', 'Snabbåtkomst', '5 gästområden'], ready: 'Vad dina gäster faktiskt använder',
    guideViews: 'Visningar av gästguiden', actions: 'Användbara åtgärder', increase: 'jämfört med föregående månad', range: 'Senaste 30 dagarna',
    trend: 'Visningar av gästguiden över tid', top: 'Mest öppnade områden', views: 'Visningar', useful: 'Användbara åtgärder',
    properties: 'Dina boenden', propertiesSub: 'Alla boenden i din arbetsyta.',
    active: 'Aktivt', content: 'Gästområden', rooms: 'Rumstyper', edit: 'Redigera gästguide',
    sections: ['Profil', 'Gästområden', 'Snabbåtkomst', 'Design', 'Logotyp och bilder', 'QR-kod'],
    overview: 'Översikt', setupTitle: 'Din gästguide tar form', setupText: 'Varje steg gör vistelsen enklare för dina gäster.',
    guestAreas: ['Sevärdheter', 'Restauranger och kaféer', 'Resa hit och parkering', 'Wellness och spa', 'Bra att veta'],
    quick: ['Wi-Fi', 'Parkering', 'Frukost', 'Ankomst och avresa'], save: 'Visa demo', guestView: 'Gästvy',
    locked: 'Endast visning', lockedText: 'Alla inställningar i demon är skrivskyddade.',
    topPage: 'Mest besökta sida', clicks: 'Länkklick', pageHome: 'Startsida', insights: 'Gästintresse',
    demo: 'Demo', sampleProperty: 'Exempelboende',
  },
  nb: {
    profileFields: ['Navn på overnattingssted', 'Adresse', 'E-post', 'Nettsted'],
    dayUnit: 'dager',
    nav: ['Oversikt', 'Overnatting', 'Analyse', 'Rediger'], demo: 'Demo · Eksempeldata · Endringer lagres ikke',
    hello: 'God morgen', area: 'Arbeidsområde', property: 'Waldquell ved Tegernsee', completion: 'Oppsett', complete: 'ferdig',
    steps: ['Overnattingsprofil', 'Logo', 'Bilder', 'Hurtigtilgang', '5 gjesteområder'], ready: 'Hva gjestene dine faktisk bruker',
    guideViews: 'Visninger av gjesteguiden', actions: 'Nyttige handlinger', increase: 'sammenlignet med forrige måned', range: 'Siste 30 dager',
    trend: 'Visninger av gjesteguiden over tid', top: 'Mest åpne områder', views: 'Visninger', useful: 'Nyttige handlinger',
    properties: 'Dine overnattingssteder', propertiesSub: 'Alle overnattingssteder i arbeidsområdet.',
    active: 'Aktiv', content: 'Gjesteområder', rooms: 'Romtyper', edit: 'Rediger gjesteguide',
    sections: ['Profil', 'Gjesteområder', 'Hurtigtilgang', 'Design', 'Logo og bilder', 'QR-kode'],
    overview: 'Oversikt', setupTitle: 'Gjesteguiden din tar form', setupText: 'Hvert trinn gjør oppholdet enklere for gjestene.',
    guestAreas: ['Severdigheter', 'Restauranter og kafeer', 'Reise og parkering', 'Velvære og spa', 'Kjekt å vite'],
    quick: ['Wi-Fi', 'Parkering', 'Frokost', 'Ankomst og avreise'], save: 'Utforsk demo', guestView: 'Gjesteside',
    locked: 'Kun visning', lockedText: 'Alle innstillinger i demoen er skrivebeskyttet.',
    topPage: 'Mest besøkte side', clicks: 'Lenkeklikk', pageHome: 'Hjemmeside', insights: 'Gjesteinteresse',
    demo: 'Demo', sampleProperty: 'Eksempelovernatting',
  },
  it: {
    profileFields: ['Nome struttura', 'Indirizzo', 'E-mail', 'Sito web'],
    dayUnit: 'giorni',
    nav: ['Panoramica', 'Strutture', 'Analisi', 'Modifica'], demo: 'Demo · Dati di esempio · Le modifiche non vengono salvate',
    hello: 'Buongiorno', area: 'Area di lavoro', property: 'Waldquell sul lago Tegernsee', completion: 'Configurazione', complete: 'completata',
    steps: ['Profilo struttura', 'Logo', 'Foto', 'Accesso rapido', '5 aree ospiti'], ready: 'Cosa usano davvero i tuoi ospiti',
    guideViews: 'Visualizzazioni della guida', actions: 'Azioni utili', increase: 'rispetto al mese precedente', range: 'Ultimi 30 giorni',
    trend: 'Visualizzazioni della guida nel tempo', top: 'Aree più aperte', views: 'Visualizzazioni', useful: 'Azioni utili',
    properties: 'Le tue strutture', propertiesSub: 'Tutte le strutture nell’area di lavoro.',
    active: 'Attiva', content: 'Aree ospiti', rooms: 'Tipi di camera', edit: 'Modifica la guida',
    sections: ['Profilo', 'Aree ospiti', 'Accesso rapido', 'Design', 'Logo e foto', 'Codice QR'],
    overview: 'Panoramica', setupTitle: 'La guida per gli ospiti prende forma', setupText: 'Ogni passaggio semplifica il soggiorno dei tuoi ospiti.',
    guestAreas: ['Luoghi da visitare', 'Ristoranti e bar', 'Come arrivare e parcheggio', 'Benessere e spa', 'Informazioni utili'],
    quick: ['Wi-Fi', 'Parcheggio', 'Colazione', 'Arrivo e partenza'], save: 'Esplora demo', guestView: 'Vista ospite',
    locked: 'Sola lettura', lockedText: 'Tutte le impostazioni della demo sono di sola lettura.',
    topPage: 'Pagina più visitata', clicks: 'Clic sui link', pageHome: 'Pagina iniziale', insights: 'Interesse degli ospiti',
    demo: 'Demo', sampleProperty: 'Struttura di esempio',
  },
};

const visits = [7, 9, 6, 12, 10, 14, 9, 17, 12, 15, 11, 19, 14, 12, 18, 13, 20, 16, 12, 18, 22, 17, 20, 24, 18, 25, 22, 28, 23, 30];
const topValues = [98, 67, 42, 38, 27];
const setupIcons = [Building2, Sparkles, FileImage, Wifi, LayoutDashboard];
const sections = ['overview', 'properties', 'analytics', 'edit'];
const editIcons = [Building2, LayoutDashboard, Sparkles, Palette, FileImage, QrCode];

function Metric({ icon: Icon, label, value, note, positive }) {
  return (
    <article className="flex min-w-0 items-start gap-4 border-b border-slate-200/80 py-5 md:border-b-0 md:border-r md:px-5 md:py-2 last:border-0">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-900"><Icon className="h-5 w-5" strokeWidth={2.4} /></span>
      <div className="min-w-0">
        <p className="text-xs font-bold text-slate-500">{label}</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <strong className="text-3xl font-black tracking-tight text-slate-950">{value}</strong>
          {positive && <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800"><ArrowUpRight className="h-3.5 w-3.5" />+18%</span>}
        </div>
        <p className="mt-1 text-xs text-slate-500">{note}</p>
      </div>
    </article>
  );
}

function DemoNav({ active, onChange, copy, mobile = false }) {
  const icons = [LayoutDashboard, Building2, BarChart3, Settings];
  return (
    <nav aria-label={copy.area} className={mobile ? 'fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-8px_28px_rgba(15,23,42,0.06)] md:hidden' : 'fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-slate-200 bg-white px-5 py-6 md:flex'}>
      {!mobile && <div className="mb-10 flex items-center gap-3 px-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-950 text-amber-300"><House className="h-5 w-5" /></span><div><div className="text-sm font-black">gastemappe<span className="text-amber-700">24</span></div><div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">{copy.demo}</div></div></div>}
      <div className={mobile ? 'grid grid-cols-4 gap-1' : 'space-y-2'}>
        {sections.map((key, index) => {
          const Icon = icons[index];
          return <button key={key} type="button" aria-current={active === key ? 'page' : undefined} onClick={() => onChange(key)} className={mobile ? `flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-semibold ${active === key ? 'bg-indigo-50 text-indigo-950' : 'text-slate-500'}` : `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${active === key ? 'bg-indigo-50 text-indigo-950' : 'text-slate-600 hover:bg-slate-50'}`}><Icon className={mobile ? 'h-4 w-4' : 'h-[18px] w-[18px]'} />{copy.nav[index]}</button>;
        })}
      </div>
      {!mobile && <div className="mt-auto rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-bold text-slate-800"><ShieldCheck className="h-4 w-4 text-indigo-800" />{copy.locked}</div><p className="mt-2 text-[11px] leading-relaxed text-slate-500">{copy.lockedText}</p></div>}
    </nav>
  );
}

export default function DemoAdmin() {
  const [lang, setLang] = useState('de');
  const [section, setSection] = useState('overview');
  const [period, setPeriod] = useState(30);
  const [editSection, setEditSection] = useState(0);
  const copy = words[lang] || words.de;
  const periodViews = period === 7 ? 82 : period === 90 ? 802 : 284;
  const title = section === 'overview' ? copy.nav[0] : section === 'properties' ? copy.nav[1] : section === 'analytics' ? copy.nav[2] : copy.nav[3];

  const DemoBanner = () => <div className="mb-5 flex items-start gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-indigo-950"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" /><div><p className="text-xs font-extrabold">{copy.demo} · {copy.locked}</p><p className="mt-1 text-xs leading-relaxed text-indigo-900/80">{copy.lockedText}</p></div></div>;

  return (
    <div className="min-h-screen bg-[#f5f6f8] font-sans text-slate-900">
      <DemoNav active={section} onChange={setSection} copy={copy} />
      <div className="mx-auto min-h-screen max-w-[1440px] md:pl-60">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur sm:px-7">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">{copy.area}</p>
              <p className="truncate text-sm font-extrabold text-slate-900">{copy.property}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <select aria-label="Language" value={lang} onChange={event => setLang(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-200">
                {languages.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
              </select>
              <a href="/" className="hidden rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 sm:inline-flex">{copy.guestView}</a>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl space-y-6 px-4 pb-28 pt-5 sm:px-7 sm:pt-8">
          <DemoBanner />
          {section === 'overview' && <>
            <section className="rounded-3xl bg-gradient-to-br from-[#17193f] via-[#28256d] to-[#43418b] p-6 text-white shadow-xl shadow-indigo-950/10 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div><p className="text-[11px] font-bold uppercase tracking-[.22em] text-indigo-200">{copy.area}</p><h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{copy.hello}</h1><p className="mt-2 max-w-xl text-sm text-indigo-100">{copy.setupText}</p></div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3"><BedDouble className="h-5 w-5 text-amber-200" /><div><p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-200">{copy.area}</p><p className="mt-1 text-sm font-bold">{copy.property}</p></div></div>
              </div>
              <div className="mt-8">
                <div className="mb-3 flex items-end justify-between"><div><h2 className="text-xl font-black">{copy.completion}</h2><p className="mt-1 text-xs text-indigo-200">{copy.setupTitle}</p></div><div className="text-right"><strong className="text-2xl font-black">80%</strong><p className="text-[10px] text-indigo-200">{copy.complete}</p></div></div>
                <div className="h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-4/5 rounded-full bg-amber-300" /></div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">{copy.steps.map((step, index) => <div key={step} className="flex items-center gap-2 text-xs"><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${index < 4 ? 'bg-emerald-300 text-emerald-950' : 'border-2 border-amber-300 text-amber-100'}`}>{index < 4 ? <Check className="h-4 w-4" /> : '5'}</span><span className="leading-tight text-indigo-50">{step}</span></div>)}</div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-7">
              <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-indigo-800">{copy.range}</p><h2 className="mt-2 text-2xl font-black tracking-tight">{copy.ready}</h2></div><div className="flex items-center gap-1 rounded-xl bg-slate-50 p-1">{[7, 30, 90].map(day => <button key={day} onClick={() => setPeriod(day)} className={`rounded-lg px-3 py-2 text-xs font-bold ${period === day ? 'bg-white text-indigo-950 shadow-sm' : 'text-slate-500'}`}>{day} {copy.dayUnit}</button>)}</div></div>
              <div className="mt-4 grid md:grid-cols-2">
                <Metric icon={LayoutDashboard} label={copy.guideViews} value={periodViews} note={copy.pageHome} positive />
                <Metric icon={ArrowDownRight} label={copy.actions} value={period === 7 ? 13 : period === 90 ? 127 : 46} note={copy.increase} />
              </div>
              <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
                <div><div className="mb-4 flex items-center justify-between"><h3 className="font-extrabold">{copy.trend}</h3><span className="text-xs text-slate-500">{periodViews} {copy.views.toLowerCase()}</span></div><div className="flex h-44 items-end gap-1 border-b border-l border-slate-200 px-2 pb-0.5 pt-4 sm:gap-2">{visits.slice(0, period === 7 ? 7 : 30).map((value, index) => <div key={index} title={`${value} ${copy.views.toLowerCase()}`} className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-900 to-indigo-500 opacity-90 transition hover:opacity-100" style={{ height: `${20 + value * 2.2}%` }} />)}</div><div className="mt-2 flex justify-between text-[10px] text-slate-400"><span>01. {lang === 'de' ? 'März' : 'Mar'}</span><span>30. {lang === 'tr' ? 'gün' : 'Mar'}</span></div></div>
                <div><div className="mb-4 flex items-center justify-between"><h3 className="font-extrabold">{copy.top}</h3><span className="text-xs text-slate-400">{copy.range}</span></div><div className="space-y-3">{copy.guestAreas.map((area, index) => <div key={area} className="grid grid-cols-[24px_minmax(0,1fr)_40px] items-center gap-2 text-xs"><span className="grid h-6 w-6 place-items-center rounded-full bg-indigo-50 font-black text-indigo-900">{index + 1}</span><div className="min-w-0"><div className="mb-1 flex justify-between gap-2"><span className="truncate font-semibold text-slate-700">{area}</span><span className="shrink-0 text-slate-500">{topValues[index]}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-600" style={{ width: `${topValues[index]}%` }} /></div></div><span className="text-right text-[10px] text-slate-400">{copy.views}</span></div>)}</div></div>
              </div>
            </section>
          </>}

          {section === 'properties' && <section><div className="mb-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-indigo-800">{copy.area}</p><h1 className="mt-2 text-3xl font-black">{copy.properties}</h1><p className="mt-2 text-sm text-slate-500">{copy.propertiesSub}</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{[
            {name:copy.property, place:'Seestraße 18 · 83684 Tegernsee', rooms:'24 Zimmer', count:'5', active:true},
            {name:'Seeblick Apartment', place:'Rottach-Egern · 83700', rooms:'3 Zimmer', count:'4'},
            {name:'Bergblick Ferienhaus', place:'Kreuth · 83708', rooms:'6 Zimmer', count:'5'},
          ].map((item,index)=><article key={item.name} className={`rounded-3xl border bg-white p-5 shadow-sm ${item.active?'border-indigo-300 ring-1 ring-indigo-100':'border-slate-200'}`}><div className="flex items-start justify-between gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-900"><Building2 className="h-5 w-5" /></span>{item.active&&<span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-indigo-900">{copy.active}</span>}</div><h2 className="mt-4 font-black">{item.name}</h2><p className="mt-1 text-xs text-slate-500">{item.place}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-600"><span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-indigo-800" />{item.rooms}</span><span>{item.count} {copy.content}</span></div></article>)}</div></section>}

          {section === 'analytics' && <section className="space-y-5"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-indigo-800">{copy.nav[2]}</p><h1 className="mt-2 text-3xl font-black">{copy.insights}</h1><p className="mt-2 text-sm text-slate-500">{copy.range}</p></div><div className="grid gap-4 md:grid-cols-3"><article className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold text-slate-500">{copy.guideViews}</p><strong className="mt-2 block text-4xl font-black">284</strong><p className="mt-2 text-xs text-emerald-700">+18% {copy.increase}</p></article><article className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold text-slate-500">{copy.topPage}</p><strong className="mt-2 block text-2xl font-black">{copy.pageHome}</strong><p className="mt-2 text-xs text-slate-500">152 {copy.views}</p></article><article className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold text-slate-500">{copy.clicks}</p><strong className="mt-2 block text-4xl font-black">46</strong><p className="mt-2 text-xs text-slate-500">{copy.useful}</p></article></div><div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7"><div className="mb-5 flex items-center justify-between"><h2 className="font-extrabold">{copy.top}</h2><span className="text-xs text-slate-400">{copy.range}</span></div><div className="space-y-4">{copy.guestAreas.map((area,index)=><div key={area} className="flex items-center gap-3"><span className="w-7 text-xs font-black text-slate-400">0{index+1}</span><span className="w-40 truncate text-sm font-semibold">{area}</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-700" style={{width:`${topValues[index]}%`}} /></div><strong className="w-20 text-right text-sm">{topValues[index]} {copy.views}</strong></div>)}</div></div></section>}

          {section === 'edit' && <section><div className="mb-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-indigo-800">{copy.nav[3]}</p><h1 className="mt-2 text-3xl font-black">{copy.edit}</h1><p className="mt-2 text-sm text-slate-500">{copy.lockedText}</p></div><div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2"><div className="flex min-w-max gap-1">{copy.sections.map((item,index)=>{const Icon=editIcons[index];return <button key={item} onClick={()=>setEditSection(index)} className={`inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold ${editSection===index?'bg-indigo-950 text-white':'text-slate-600 hover:bg-slate-50'}`}><Icon className="h-4 w-4" />{item}</button>})}</div></div><div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]"><article className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900"><ShieldCheck className="h-4 w-4" />{copy.locked}</div><h2 className="mt-3 text-xl font-black">{copy.sections[editSection]}</h2>{editSection===0&&<div className="mt-5 grid gap-4 sm:grid-cols-2">{[['Waldquell am Tegernsee','Seestraße 18, 83684 Tegernsee','hallo@waldquell-demo.de','waldquell-demo.de']].flat().map((value,index)=><div key={copy.profileFields[index]} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{copy.profileFields[index]}</p><p className="mt-1 text-sm font-semibold text-slate-800">{value}</p></div>)}</div>}{editSection===1&&<div className="mt-5 space-y-2">{copy.guestAreas.map((area,index)=><div key={area} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold"><span className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-indigo-900">{[<MapPin/>,<Utensils/>,<Car/>,<Sparkles/>,<HelpCircle/>][index]}</span>{area}</span><ChevronRight className="h-4 w-4 text-slate-400" /></div>)}</div>}{editSection===2&&<div className="mt-5 grid gap-2 sm:grid-cols-2">{copy.quick.map((item,index)=>{const Icon=[Wifi,Car,Utensils,Clock3][index];return <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"><Icon className="h-5 w-5 text-indigo-800" /><span className="text-sm font-semibold">{item}</span></div>})}</div>}{editSection===3&&<div className="mt-5 grid grid-cols-2 gap-3">{[['Indigo','#28256D'],['Amber','#8c3b12'],['Rose','#9f1239'],['Slate','#0f172a']].map(([label,color])=><div key={label} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"><span className="h-8 w-8 rounded-full" style={{background:color}}/><span className="text-sm font-semibold">{label}</span></div>)}</div>}{editSection===4&&<div className="mt-5 flex flex-wrap items-center gap-4"><img src="/demo-waldquell-logo.svg" alt="" className="h-16 w-16 rounded-2xl border p-1" /><div className="grid h-20 w-32 place-items-center rounded-xl bg-slate-100 text-xs text-slate-500"><FileImage className="h-5 w-5" />5 Bilder</div><p className="max-w-xs text-xs text-slate-500">Waldquell am Tegernsee</p></div>}{editSection===5&&<div className="mt-5 flex items-center gap-5"><div className="grid h-32 w-32 place-items-center rounded-2xl border border-slate-200 bg-white text-indigo-950"><QrCode className="h-20 w-20" /></div><div><p className="text-sm font-bold">QR-Code · Gästemappe</p><p className="mt-1 text-xs text-slate-500">gastemappe24-pro.vercel.app</p></div></div>}</article><aside className="rounded-3xl bg-indigo-950 p-5 text-white"><p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-200">{copy.locked}</p><h3 className="mt-2 text-lg font-black">{copy.property}</h3><p className="mt-2 text-xs leading-relaxed text-indigo-100">{copy.lockedText}</p><a href="/" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-indigo-950">{copy.guestView}<ExternalLink className="h-4 w-4" /></a></aside></div></section>}
        </main>
      </div>
      <DemoNav active={section} onChange={setSection} copy={copy} mobile />
    </div>
  );
}
