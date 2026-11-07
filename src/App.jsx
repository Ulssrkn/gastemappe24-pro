import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { hotelPresets, additionalPresets } from './hotelPresets.js';
import AuthGate from './components/AuthGate.jsx';
import { supabase, isSupabaseConfigured } from './lib/supabaseClient.js';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Scroll, Save, Eye, EyeOff, Palette, TrendingUp, Users, Activity, HelpCircle,
  Flame, Accessibility, Recycle, Award, Scissors, ShoppingCart, Stethoscope, Baby, Music, Smile, CheckCircle2, XCircle, Zap, Search, ChevronDown, ChevronUp, X
} from 'lucide-react';


// --- 10 DİL ÇEVİRİ SİSTEMİ ---

const createQrPdf = async ({ svg, hotelName, logoUrl, format }) => {
  const [pw,ph]=format==='a4'?[595.28,841.89]:format==='a5'?[419.53,595.28]:[425.2,283.46],scale=2;
  const cv=document.createElement('canvas');cv.width=Math.round(pw*scale);cv.height=Math.round(ph*scale);const c=cv.getContext('2d');if(!c)throw Error('Canvas unavailable');
  const w=cv.width,h=cv.height,p=36*scale,x=w/2;c.fillStyle='#f4f1e9';c.fillRect(0,0,w,h);c.fillStyle='#fff';c.beginPath();c.roundRect(p,p,w-2*p,h-2*p,22*scale);c.fill();c.fillStyle='#172b3a';c.fillRect(p,p,w-2*p,12*scale);
  let y=p+55*scale;if(logoUrl){try{const l=new Image();l.crossOrigin='anonymous';await new Promise((a,b)=>{l.onload=a;l.onerror=b;l.src=logoUrl});const z=48*scale;c.save();c.beginPath();c.arc(x,y+z/2,z/2,0,7);c.clip();c.drawImage(l,x-z/2,y,z,z);c.restore();y+=z+10*scale}catch(_){}}
  c.textAlign='center';c.fillStyle='#a47b3b';c.font=`bold ${10*scale}px Arial`;c.fillText('WILLKOMMEN',x,y);y+=28*scale;c.fillStyle='#172b3a';c.font=`bold ${(format==='card'?19:31)*scale}px Arial`;c.fillText((hotelName||'Ihre Unterkunft').slice(0,36),x,y);y+=30*scale;c.fillStyle='#697783';c.font=`${13*scale}px Arial`;c.fillText('Ihre digitale Gästemappe',x,y);y+=24*scale;
  const im=new Image(),u=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));try{await new Promise((a,b)=>{im.onload=a;im.onerror=b;im.src=u});const q=Math.min(w*.43,h-y-p-100*scale);c.drawImage(im,(w-q)/2,y,q,q);y+=q+25*scale}finally{URL.revokeObjectURL(u)}
  c.fillStyle='#172b3a';c.font=`bold ${15*scale}px Arial`;c.fillText('Scannen & entdecken',x,Math.min(y,h-p-65*scale));c.fillStyle='#77828b';c.font=`${8*scale}px Arial`;c.fillText('WLAN · Services · Informationen · Umgebung',x,h-p-34*scale);c.font=`bold ${7*scale}px Arial`;c.fillText('GASTEMAPPE24 PRO',x,h-p-17*scale);
  const jpg=await new Promise(a=>cv.toBlob(a,'image/jpeg',.94));if(!jpg)throw Error('Export fehlgeschlagen');const data=new Uint8Array(await jpg.arrayBuffer()),te=new TextEncoder(),chunks=[];let pos=0,offs=[];const put=v=>{const b=typeof v==='string'?te.encode(v):v;chunks.push(b);pos+=b.length},obj=(n,v)=>{offs[n]=pos;put(`${n} 0 obj\n${v}\nendobj\n`)};
  put('%PDF-1.4\n');obj(1,'<< /Type /Catalog /Pages 2 0 R >>');obj(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');obj(3,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);
  offs[4]=pos;put(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${cv.width} /Height ${cv.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${data.length} >>\nstream\n`);put(data);put('\nendstream\nendobj\n');
  const stream=te.encode(`q ${pw} 0 0 ${ph} 0 0 cm /Im0 Do Q`);offs[5]=pos;put(`5 0 obj\n<< /Length ${stream.length} >>\nstream\n`);put(stream);put('\nendstream\nendobj\n');const xref=pos;put('xref\n0 6\n0000000000 65535 f \n');for(let i=1;i<=5;i++)put(`${String(offs[i]).padStart(10,'0')} 00000 n \n`);put(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  const url=URL.createObjectURL(new Blob(chunks,{type:'application/pdf'})),a=document.createElement('a');a.href=url;a.download=`${(hotelName||'Gastemappe24').replace(/[^a-z0-9-_]+/gi,'-')}-QR-${format.toUpperCase()}.pdf`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
};
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
    wlanTitle: "WLAN",
    parkingTitle: "Parkplatz",
    breakfastTitle: "Frühstück",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Zurück zur Übersicht",
    adminTitle: "Verwaltung & Analytik (Dashboard)",
    guestViewBtn: "Gastansicht öffnen",
    saveBtn: "Änderungen speichern",
    savedMsg: "Gespeichert!",
    trialTitle: "30-Tage Testversion (PRO)",
    trialDaysLeft: "Tage verbleibend",
    statsScans: "QR-Code Scans (Gesamt)",
    statsActiveRooms: "Aktive Zimmer-Zugriffe",
    analyticsTitle: "Kategorie-Analytik (Meistgeklickte Inhalte)",
    qrTitle: "QR-Code & Print-Center",
    printA4: "Druckvorlage A4",
    printA5: "Druckvorlage A5",
    printCard: "Visitenkarte",
    sec1Title: "1. Unterkunft Informationen & Kontaktdaten",
    sec2Title: "2. Design & Farb-Themen",
    sec3Title: "3. Logo hochladen",
    sec4Title: "4. Bilderverwaltung (Slider)",
    sec5Title: "5. QR-Code & Print Center (Drucken erlaubt)",
    sec6Title: "6. Dynamisches Preset & Kategorie-System (3-Schritte Editor)",
    lblHotelName: "Unterkunft Name",
    lblPhone: "Telefon",
    btnAddCategory: "Neuen Inhalt hinzufügen (3-Schritte Editor)",
    modalTitle: "Inhalt hinzufügen / bearbeiten",
    step1Title: "Schritt 1: Kategorie auswählen",
    step2Title: "Schritt 2: Preset / Vorlage auswählen",
    step3Title: "Schritt 3: Informationen eingeben",
    addBtn: "Hinzufügen",
    editTitle: "Bezeichnung / Titel",
    customTextLabel: "Zusätzliche Hinweise (optional)",
    yesLabel: "Ja / Verfügbar",
    noLabel: "Nein / Nicht verfügbar",
    moreInfo: "Weitere Informationen & Optionale Felder",
    cancel: "Abbrechen",
    saveAndClose: "Speichern & Schließen",
    searchPlaceholder: "Suchen...",
    noPresetsFound: "Keine Vorlagen in dieser Kategorie gefunden."
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
    wlanTitle: "WiFi",
    parkingTitle: "Parking",
    breakfastTitle: "Breakfast",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Back to Overview",
    adminTitle: "Management & Analytics (Dashboard)",
    guestViewBtn: "Open Guest View",
    saveBtn: "Save Changes",
    savedMsg: "Saved!",
    trialTitle: "30-Day Trial (PRO)",
    trialDaysLeft: "Days remaining",
    statsScans: "QR Code Scans (Total)",
    statsActiveRooms: "Active Room Access",
    analyticsTitle: "Category Analytics (Most Clicked)",
    qrTitle: "QR Code & Print Center",
    printA4: "Print Template A4",
    printA5: "Print Template A5",
    printCard: "Business Card",
    sec1Title: "1. Property Information & Contacts",
    sec2Title: "2. Design & Color Themes",
    sec3Title: "3. Upload Logo",
    sec4Title: "4. Image Management (Slider)",
    sec5Title: "5. QR Code & Print Center",
    sec6Title: "6. Dynamic Preset & Category System",
    lblHotelName: "Property Name",
    lblPhone: "Phone",
    btnAddCategory: "Add Content (3-Step Editor)",
    modalTitle: "Add / Edit Content",
    step1Title: "Step 1: Select Category",
    step2Title: "Step 2: Select Preset Template",
    step3Title: "Step 3: Enter Details",
    addBtn: "Add",
    editTitle: "Title / Label",
    customTextLabel: "Additional Notes (optional)",
    yesLabel: "Yes / Available",
    noLabel: "No / Not Available",
    moreInfo: "Additional Information & Optional Fields",
    cancel: "Cancel",
    saveAndClose: "Save & Close",
    searchPlaceholder: "Search...",
    noPresetsFound: "No presets found in this category."
  },
  cs:{welcomeBadge:"Digitální průvodce pro hosty",welcomeButton:"Začít",greetingHello:"Dobrý den,",greetingWelcome:"vítejte.",navHome:"Domů",navGaestemappe:"Průvodce",navReview:"Hodnocení",navRoute:"Trasa",weatherTitle:"Slunečno",weatherSub:"Aktuální počasí",wlanTitle:"Wi-Fi",parkingTitle:"Parkování",breakfastTitle:"Snídaně",checkInOutTitle:"Příjezd / Odjezd",detailBack:"Zpět na přehled",adminTitle:"Správa a analytika",guestViewBtn:"Otevřít náhled hosta",saveBtn:"Uložit změny",savedMsg:"Uloženo!",trialTitle:"30denní zkušební verze (PRO)",trialDaysLeft:"Zbývající dny",statsScans:"Celkem skenování QR",statsActiveRooms:"Aktivní přístupy pokojů",analyticsTitle:"Analytika kategorií",qrTitle:"QR kód a tisk",printA4:"Tisk A4",printA5:"Tisk A5",printCard:"Vizitka",sec1Title:"1. Informace o ubytování",sec2Title:"2. Barvy a motivy",sec3Title:"3. Nahrát logo",sec4Title:"4. Správa obrázků",sec5Title:"5. QR kód a tisk",sec6Title:"6. Kategorie průvodce",lblHotelName:"Název ubytování",lblPhone:"Telefon",btnAddCategory:"Přidat obsah",modalTitle:"Přidat / upravit obsah",step1Title:"1. Vyberte kategorii",step2Title:"2. Vyberte šablonu",step3Title:"3. Zadejte informace",addBtn:"Přidat",editTitle:"Název / označení",customTextLabel:"Doplňující poznámky (volitelné)",yesLabel:"Ano / Dostupné",noLabel:"Ne / Nedostupné",moreInfo:"Další informace",cancel:"Zrušit",saveAndClose:"Uložit a zavřít",searchPlaceholder:"Hledat...",noPresetsFound:"V této kategorii nebyly nalezeny žádné šablony."},
  nb:{welcomeBadge:"Digital gjestemappe",welcomeButton:"Kom i gang",greetingHello:"Hei,",greetingWelcome:"hyggelig at du er her.",navHome:"Hjem",navGaestemappe:"Gjestemappe",navReview:"Vurdering",navRoute:"Veibeskrivelse",weatherTitle:"Sol",weatherSub:"Lokalt vær",wlanTitle:"Wi-Fi",parkingTitle:"Parkering",breakfastTitle:"Frokost",checkInOutTitle:"Innsjekking / utsjekking",detailBack:"Tilbake til oversikten",adminTitle:"Administrasjon og analyse",guestViewBtn:"Åpne gjestevisning",saveBtn:"Lagre endringer",savedMsg:"Lagret!",trialTitle:"30 dagers prøveperiode (PRO)",trialDaysLeft:"Dager igjen",statsScans:"QR-skanninger totalt",statsActiveRooms:"Aktive romtilganger",analyticsTitle:"Kategorianalyse",qrTitle:"QR-kode og utskrift",printA4:"Utskrift A4",printA5:"Utskrift A5",printCard:"Visittkort",sec1Title:"1. Overnattingsinformasjon",sec2Title:"2. Design og fargetema",sec3Title:"3. Last opp logo",sec4Title:"4. Bildeadministrasjon",sec5Title:"5. QR-kode og utskrift",sec6Title:"6. Gjestemappekategorier",lblHotelName:"Overnattingsstedets navn",lblPhone:"Telefon",btnAddCategory:"Legg til innhold",modalTitle:"Legg til / rediger innhold",step1Title:"1. Velg kategori",step2Title:"2. Velg mal",step3Title:"3. Legg inn informasjon",addBtn:"Legg til",editTitle:"Tittel / etikett",customTextLabel:"Ekstra merknader (valgfritt)",yesLabel:"Ja / Tilgjengelig",noLabel:"Nei / Ikke tilgjengelig",moreInfo:"Mer informasjon",cancel:"Avbryt",saveAndClose:"Lagre og lukk",searchPlaceholder:"Søk...",noPresetsFound:"Ingen maler funnet i denne kategorien."},
  tr:{
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
    wlanTitle: "WLAN",
    parkingTitle: "Otopark",
    breakfastTitle: "Kahvaltı",
    checkInOutTitle: "Giriş / Çıkış",
    detailBack: "Geri Dön",
    adminTitle: "Yönetim Paneli & Analitik",
    guestViewBtn: "Misafir Görünümünü Aç",
    saveBtn: "Değişiklikleri Kaydet",
    savedMsg: "Kaydedildi!",
    trialTitle: "30 Günlük Deneme (PRO)",
    trialDaysLeft: "Gün kaldı",
    statsScans: "QR Kod Taramaları (Toplam)",
    statsActiveRooms: "Aktif Oda Erişimi",
    analyticsTitle: "Kategori Analitiği (En Çok Tıklananlar)",
    qrTitle: "QR Kod & Baskı Merkezi",
    printA4: "A4 Baskı Şablonu",
    printA5: "A5 Baskı Şablonu",
    printCard: "Kartvizit Şablonu",
    sec1Title: "1. Tesis Bilgileri & İletişim",
    sec2Title: "2. Renk Temaları",
    sec3Title: "3. Logo Yükleme",
    sec4Title: "4. Resim Yönetimi (Slider)",
    sec5Title: "5. QR Kod & Baskı Merkezi",
    sec6Title: "6. Dinamik Preset & Kategori Sistemi",
    lblHotelName: "Tesis / Otel Adı",
    lblPhone: "Telefon",
    btnAddCategory: "İçerik Ekle (3 Adımlı Editör)",
    modalTitle: "İçerik Ekle / Düzenle",
    step1Title: "1. Adım: Kategori Seçin",
    step2Title: "2. Adım: Şablon (Preset) Seçin",
    step3Title: "3. Adım: Detayları Girin",
    addBtn: "Ekle",
    editTitle: "Başlık / Etiket",
    customTextLabel: "Ek Açıklama (İsteğe bağlı)",
    yesLabel: "Evet / Mevcut",
    noLabel: "Hayır / Mevcut Değil",
    moreInfo: "Ek Bilgiler & İsteğe Bağlı Alanlar",
    cancel: "İptal",
    saveAndClose: "Kaydet ve Kapat",
    searchPlaceholder: "Ara...",
    noPresetsFound: "Bu kategoride şablon bulunamadı."
  },
  fr: { welcomeBadge: "Guide", welcomeButton: "C'est parti", greetingHello: "Bonjour,", greetingWelcome: "bienvenue.", navHome: "Accueil", navGaestemappe: "Guide", navReview: "Avis", navRoute: "Itinéraire", weatherTitle: "Ensoleillé", weatherSub: "Météo", wlanTitle: "Wi-Fi", parkingTitle: "Parking", breakfastTitle: "Petit-déj", checkInOutTitle: "Arrivée/Départ", detailBack: "Retour", adminTitle: "Admin", guestViewBtn: "Vue invité", saveBtn: "Enregistrer", savedMsg: "Enregistré !", trialTitle: "Essai PRO", trialDaysLeft: "Jours restants", statsScans: "Scans QR", statsActiveRooms: "Chambres actives", analyticsTitle: "Analytique", qrTitle: "QR & Impression", printA4: "A4", printA5: "A5", printCard: "Carte", sec1Title: "1. Infos", sec2Title: "2. Couleurs", sec3Title: "3. Logo", sec4Title: "4. Images", sec5Title: "5. QR Center", sec6Title: "6. Préréglages", lblHotelName: "Nom", lblPhone: "Tél", btnAddCategory: "Ajouter", modalTitle: "Modifier", step1Title: "1. Catégorie", step2Title: "2. Modèle", step3Title: "3. Détails", addBtn: "Ajouter", editTitle: "Titre", customTextLabel: "Notes", yesLabel: "Oui", noLabel: "Non", moreInfo: "Plus", cancel: "Annuler", saveAndClose: "Fermer", searchPlaceholder: "Rechercher...", noPresetsFound: "Aucun." },
  hr: { welcomeBadge: "Vodič", welcomeButton: "Kreni", greetingHello: "Pozdrav,", greetingWelcome: "dobrodošli.", navHome: "Početna", navGaestemappe: "Vodič", navReview: "Ocijeni", navRoute: "Upute", weatherTitle: "Sunčano", weatherSub: "Vrijeme", wlanTitle: "Wi-Fi", parkingTitle: "Parking", breakfastTitle: "Doručak", checkInOutTitle: "Prijava", detailBack: "Natrag", adminTitle: "Admin", guestViewBtn: "Gosti", saveBtn: "Spremi", savedMsg: "Spremljeno!", trialTitle: "PRO probno", trialDaysLeft: "dana", statsScans: "QR skeniranja", statsActiveRooms: "Sobe", analyticsTitle: "Analitika", qrTitle: "QR centar", printA4: "A4", printA5: "A5", printCard: "Kartica", sec1Title: "1. Info", sec2Title: "2. Boje", sec3Title: "3. Logo", sec4Title: "4. Slike", sec5Title: "5. QR Center", sec6Title: "6. Predlošci", lblHotelName: "Naziv", lblPhone: "Tel", btnAddCategory: "Dodaj", modalTitle: "Uredi", step1Title: "1. Kategorija", step2Title: "2. Predložak", step3Title: "3. Detalji", addBtn: "Dodaj", editTitle: "Naslov", customTextLabel: "Bilješke", yesLabel: "Da", noLabel: "Ne", moreInfo: "Više", cancel: "Odustani", saveAndClose: "Zatvori", searchPlaceholder: "Traži...", noPresetsFound: "Nema." },
  it: { welcomeBadge: "Guida", welcomeButton: "Inizia", greetingHello: "Ciao,", greetingWelcome: "benvenuto.", navHome: "Home", navGaestemappe: "Guida", navReview: "Recensioni", navRoute: "Percorso", weatherTitle: "Sereno", weatherSub: "Meteo", wlanTitle: "Wi-Fi", parkingTitle: "Parcheggio", breakfastTitle: "Colazione", checkInOutTitle: "Check-in", detailBack: "Indietro", adminTitle: "Admin", guestViewBtn: "Vista", saveBtn: "Salva", savedMsg: "Salvato!", trialTitle: "PRO", trialDaysLeft: "giorni", statsScans: "Scansioni", statsActiveRooms: "Camere", analyticsTitle: "Analitica", qrTitle: "QR Center", printA4: "A4", printA5: "A5", printCard: "Card", sec1Title: "1. Info", sec2Title: "2. Colori", sec3Title: "3. Logo", sec4Title: "4. Immagini", sec5Title: "5. QR", sec6Title: "6. Preset", lblHotelName: "Nome", lblPhone: "Tel", btnAddCategory: "Aggiungi", modalTitle: "Modifica", step1Title: "1. Categoria", step2Title: "2. Modello", step3Title: "3. Dettagli", addBtn: "Aggiungi", editTitle: "Titolo", customTextLabel: "Note", yesLabel: "Sì", noLabel: "No", moreInfo: "Altro", cancel: "Annulla", saveAndClose: "Chiudi", searchPlaceholder: "Cerca...", noPresetsFound: "Nulla." },
  es: { welcomeBadge: "Guía", welcomeButton: "Empezar", greetingHello: "Hola,", greetingWelcome: "bienvenido.", navHome: "Inicio", navGaestemappe: "Guía", navReview: "Valorar", navRoute: "Ruta", weatherTitle: "Soleado", weatherSub: "Clima", wlanTitle: "Wi-Fi", parkingTitle: "Parking", breakfastTitle: "Desayuno", checkInOutTitle: "Entrada", detailBack: "Volver", adminTitle: "Admin", guestViewBtn: "Vista", saveBtn: "Guardar", savedMsg: "Guardado!", trialTitle: "PRO", trialDaysLeft: "días", statsScans: "Scans", statsActiveRooms: "Habitaciones", analyticsTitle: "Analítica", qrTitle: "QR Center", printA4: "A4", printA5: "A5", printCard: "Tarjeta", sec1Title: "1. Info", sec2Title: "2. Colores", sec3Title: "3. Logo", sec4Title: "4. Imágenes", sec5Title: "5. QR", sec6Title: "6. Plantillas", lblHotelName: "Nombre", lblPhone: "Tel", btnAddCategory: "Añadir", modalTitle: "Editar", step1Title: "1. Categoría", step2Title: "2. Plantilla", step3Title: "3. Detalles", addBtn: "Añadir", editTitle: "Título", customTextLabel: "Notas", yesLabel: "Sí", noLabel: "No", moreInfo: "Más", cancel: "Cancelar", saveAndClose: "Cerrar", searchPlaceholder: "Buscar...", noPresetsFound: "Nada." },
  sv: { welcomeBadge: "Guide", welcomeButton: "Starta", greetingHello: "Hej,", greetingWelcome: "välkommen.", navHome: "Hem", navGaestemappe: "Guide", navReview: "Recension", navRoute: "Väg", weatherTitle: "Sol", weatherSub: "Väder", wlanTitle: "Wi-Fi", parkingTitle: "Parkering", breakfastTitle: "Frukost", checkInOutTitle: "Incheckning", detailBack: "Tillbaka", adminTitle: "Admin", guestViewBtn: "Gästvy", saveBtn: "Spara", savedMsg: "Sparat!", trialTitle: "PRO", trialDaysLeft: "dagar", statsScans: "Scans", statsActiveRooms: "Rum", analyticsTitle: "Analys", qrTitle: "QR Center", printA4: "A4", printA5: "A5", printCard: "Kort", sec1Title: "1. Info", sec2Title: "2. Färg", sec3Title: "3. Logo", sec4Title: "4. Bilder", sec5Title: "5. QR", sec6Title: "6. Mallar", lblHotelName: "Namn", lblPhone: "Tel", btnAddCategory: "Lägg till", modalTitle: "Redigera", step1Title: "1. Kategori", step2Title: "2. Mall", step3Title: "3. Detaljer", addBtn: "Lägg till", editTitle: "Titel", customTextLabel: "Anteckningar", yesLabel: "Ja", noLabel: "Nej", moreInfo: "Mer", cancel: "Avbryt", saveAndClose: "Stäng", searchPlaceholder: "Sök...", noPresetsFound: "Inga." },
  no: { welcomeBadge: "Guide", welcomeButton: "Start", greetingHello: "Hei,", greetingWelcome: "velkommen.", navHome: "Hjem", navGaestemappe: "Guide", navReview: "Omtale", navRoute: "Rute", weatherTitle: "Sol", weatherSub: "Vær", wlanTitle: "Wi-Fi", parkingTitle: "Parkering", breakfastTitle: "Frokost", checkInOutTitle: "Innsjekk", detailBack: "Tilbake", adminTitle: "Admin", guestViewBtn: "Visning", saveBtn: "Lagre", savedMsg: "Lagret!", trialTitle: "PRO", trialDaysLeft: "dager", statsScans: "Scans", statsActiveRooms: "Rom", analyticsTitle: "Analytisk", qrTitle: "QR Center", printA4: "A4", printA5: "A5", printCard: "Kort", sec1Title: "1. Info", sec2Title: "2. Farge", sec3Title: "3. Logo", sec4Title: "4. Bilder", sec5Title: "5. QR", sec6Title: "6. Maler", lblHotelName: "Navn", lblPhone: "Tlf", btnAddCategory: "Legg til", modalTitle: "Rediger", step1Title: "1. Kategori", step2Title: "2. Mal", step3Title: "3. Detaljer", addBtn: "Legg till", editTitle: "Tittel", customTextLabel: "Notater", yesLabel: "Ja", noLabel: "Nei", moreInfo: "Mer", cancel: "Avbryt", saveAndClose: "Lukk", searchPlaceholder: "Søk...", noPresetsFound: "Ingen." },
  sq: { welcomeBadge: "Udhëzues", welcomeButton: "Fillo", greetingHello: "Përshëndetje,", greetingWelcome: "mirë se erdhët.", navHome: "Kryefaqja", navGaestemappe: "Udhëzuesi", navReview: "Vlerëso", navRoute: "Udha", weatherTitle: "Diell", weatherSub: "Moti", wlanTitle: "Wi-Fi", parkingTitle: "Parkimi", breakfastTitle: "Mëngjesi", checkInOutTitle: "Hyrja", detailBack: "Kthehu", adminTitle: "Admin", guestViewBtn: "Pamja", saveBtn: "Ruaj", savedMsg: "U ruajt!", trialTitle: "PRO", trialDaysLeft: "ditë", statsScans: "Scans", statsActiveRooms: "Dhomat", analyticsTitle: "Analitika", qrTitle: "QR Center", printA4: "A4", printA5: "A5", printCard: "Kartë", sec1Title: "1. Info", sec2Title: "2. Ngjyrat", sec3Title: "3. Logo", sec4Title: "4. Fotografitë", sec5Title: "5. QR Center", sec6Title: "6. Shabllonet", lblHotelName: "Emri", lblPhone: "Tel", btnAddCategory: "Shto", modalTitle: "Ndrysho", step1Title: "1. Kategoria", step2Title: "2. Shablloni", step3Title: "3. Detajet", addBtn: "Shto", editTitle: "Titulli", customTextLabel: "Shënime", yesLabel: "Po", noLabel: "Jo", moreInfo: "Më shumë", cancel: "Anulo", saveAndClose: "Mbyll", searchPlaceholder: "Kërko...", noPresetsFound: "Asgjë." }
};

// Czech and Norwegian Bokmål UI chrome use English fallback until their full UI copy is curated.
translations.cs = translations.en;
translations.nb = translations.no;

// Dashboard analytics copy is kept separate so every dashboard language
// uses translated labels instead of hard-coded German text.
const dashboardCopy = {
  de: { qrScans:'QR-Scans', unavailable:'Noch nicht verfügbar', scansNote:'Echte Scan-Zahlen erscheinen, sobald die zentrale Ereigniserfassung eingerichtet ist.', configuredContent:'Eingerichtete Inhalte', contentNote:'Anzahl der eingerichteten Inhalte, keine erfundene Zimmerbelegung.', dataStatus:'Datenstatus', localStorage:'Lokale Speicherung', analyticsNote:'Zentrale Besucheranalyse ist noch nicht verbunden.', analyticsTitle:'Analytik & Besucherstatistik', analyticsIntro:'Transparenter Datenstatus statt geschätzter oder fest eingetragener Zahlen', noAnalytics:'Noch keine verlässlichen Scan- und Klickdaten vorhanden. Die Erfassung benötigt eine zentrale Datenbanktabelle und einen verbundenen Supabase-Zugang. Bis dahin zeigen wir bewusst keine erfundenen Diagramme.' },
  en: { qrScans:'QR scans', unavailable:'Not available yet', scansNote:'Real scan counts will appear once central event tracking is set up.', configuredContent:'Configured content', contentNote:'Number of configured content entries, not invented room occupancy.', dataStatus:'Data status', localStorage:'Local storage', analyticsNote:'Central visitor analytics is not connected yet.', analyticsTitle:'Analytics & visitor statistics', analyticsIntro:'Transparent data status instead of estimated or hard-coded figures', noAnalytics:'No reliable scan or click data is available yet. Tracking requires a central database table and a connected Supabase account. Until then, we deliberately show no invented charts.' },
  tr: { qrScans:'QR Taramaları', unavailable:'Henüz kullanılamıyor', scansNote:'Gerçek tarama sayıları, merkezi etkinlik takibi kurulduğunda görüntülenecek.', configuredContent:'Tanımlı içerikler', contentNote:'Bu sayı tanımlanmış içerikleri gösterir; oda doluluğu değildir.', dataStatus:'Veri durumu', localStorage:'Yerel depolama', analyticsNote:'Merkezi ziyaretçi analizi henüz bağlı değil.', analyticsTitle:'Analiz ve ziyaretçi istatistikleri', analyticsIntro:'Tahmini veya elle girilmiş sayılar yerine şeffaf veri durumu', noAnalytics:'Henüz güvenilir tarama ve tıklama verisi yok. Takip sistemi için merkezi bir veritabanı tablosu ve bağlı bir Supabase hesabı gerekiyor. O zamana kadar gerçeği yansıtmayan grafikler göstermiyoruz.' },
  fr: { qrScans:'Scans QR', unavailable:'Pas encore disponible', scansNote:'Les vrais nombres de scans apparaîtront lorsque le suivi centralisé sera configuré.', configuredContent:'Contenus configurés', contentNote:'Nombre de contenus configurés, et non un taux d’occupation inventé.', dataStatus:'État des données', localStorage:'Stockage local', analyticsNote:'Les statistiques centrales des visiteurs ne sont pas encore connectées.', analyticsTitle:'Analyses et statistiques des visiteurs', analyticsIntro:'État transparent des données, sans chiffres estimés ou prédéfinis', noAnalytics:'Aucune donnée fiable de scan ou de clic pour le moment. Le suivi nécessite une table centrale et un accès Supabase connecté. En attendant, aucun graphique fictif ne sera affiché.' },
  hr: { qrScans:'QR skeniranja', unavailable:'Još nije dostupno', scansNote:'Stvarni broj skeniranja prikazat će se nakon postavljanja centralnog praćenja događaja.', configuredContent:'Postavljeni sadržaji', contentNote:'Broj postavljenih sadržaja, a ne izmišljena popunjenost soba.', dataStatus:'Status podataka', localStorage:'Lokalna pohrana', analyticsNote:'Centralna analitika posjetitelja još nije povezana.', analyticsTitle:'Analitika i statistika posjetitelja', analyticsIntro:'Transparentan status podataka umjesto procijenjenih ili unaprijed unesenih brojki', noAnalytics:'Još nema pouzdanih podataka o skeniranjima i klikovima. Praćenje zahtijeva središnju tablicu baze podataka i povezani Supabase pristup. Do tada ne prikazujemo izmišljene grafikone.' },
  it: { qrScans:'Scansioni QR', unavailable:'Non ancora disponibile', scansNote:'I conteggi reali appariranno quando sarà configurato il tracciamento centralizzato degli eventi.', configuredContent:'Contenuti configurati', contentNote:'Numero di contenuti configurati, non un’occupazione delle camere inventata.', dataStatus:'Stato dei dati', localStorage:'Archiviazione locale', analyticsNote:'Le statistiche centrali dei visitatori non sono ancora collegate.', analyticsTitle:'Analisi e statistiche dei visitatori', analyticsIntro:'Stato dei dati trasparente, senza numeri stimati o preimpostati', noAnalytics:'Non sono ancora disponibili dati affidabili su scansioni e clic. Il tracciamento richiede una tabella centrale e un accesso Supabase collegato. Fino ad allora non mostriamo grafici inventati.' },
  es: { qrScans:'Escaneos QR', unavailable:'Aún no disponible', scansNote:'Los recuentos reales aparecerán cuando se configure el seguimiento centralizado de eventos.', configuredContent:'Contenidos configurados', contentNote:'Número de contenidos configurados, no una ocupación de habitaciones inventada.', dataStatus:'Estado de los datos', localStorage:'Almacenamiento local', analyticsNote:'Las estadísticas centrales de visitantes aún no están conectadas.', analyticsTitle:'Analítica y estadísticas de visitantes', analyticsIntro:'Estado de datos transparente en lugar de cifras estimadas o predefinidas', noAnalytics:'Aún no hay datos fiables de escaneos y clics. El seguimiento requiere una tabla central y acceso a Supabase conectado. Hasta entonces no mostramos gráficos inventados.' },
  sv: { qrScans:'QR-skanningar', unavailable:'Inte tillgängligt ännu', scansNote:'Verkliga skanningssiffror visas när central händelsespårning har konfigurerats.', configuredContent:'Konfigurerat innehåll', contentNote:'Antal konfigurerade innehåll, inte påhittad rumsbeläggning.', dataStatus:'Datastatus', localStorage:'Lokal lagring', analyticsNote:'Central besöksanalys är ännu inte ansluten.', analyticsTitle:'Analys och besöksstatistik', analyticsIntro:'Transparent datastatus i stället för uppskattade eller förinställda siffror', noAnalytics:'Det finns ännu inga tillförlitliga skannings- eller klickdata. Spårning kräver en central databastabell och en ansluten Supabase-åtkomst. Tills dess visar vi inga påhittade diagram.' },
  no: { qrScans:'QR-skanninger', unavailable:'Ikke tilgjengelig ennå', scansNote:'Faktiske skanningstall vises når sentral hendelsessporing er satt opp.', configuredContent:'Konfigurert innhold', contentNote:'Antall konfigurerte innholdselementer, ikke oppdiktet rombelegg.', dataStatus:'Datastatus', localStorage:'Lokal lagring', analyticsNote:'Sentral besøksanalyse er ennå ikke tilkoblet.', analyticsTitle:'Analyse og besøksstatistikk', analyticsIntro:'Åpen datastatus i stedet for anslåtte eller forhåndsutfylte tall', noAnalytics:'Det finnes ennå ingen pålitelige skanne- eller klikkdata. Sporing krever en sentral databasetabell og en tilkoblet Supabase-tilgang. Inntil da viser vi ingen oppdiktede diagrammer.' },
  sq: { qrScans:'Skanime QR', unavailable:'Ende nuk është e disponueshme', scansNote:'Numri real i skanimeve do të shfaqet pasi të konfigurohet gjurmimi qendror i ngjarjeve.', configuredContent:'Përmbajtje të konfiguruara', contentNote:'Numri i përmbajtjeve të konfiguruara, jo një zënie e sajuar e dhomave.', dataStatus:'Statusi i të dhënave', localStorage:'Ruajtje lokale', analyticsNote:'Analitika qendrore e vizitorëve nuk është lidhur ende.', analyticsTitle:'Analitika dhe statistikat e vizitorëve', analyticsIntro:'Status transparent i të dhënave në vend të shifrave të vlerësuara ose të paracaktuara', noAnalytics:'Ende nuk ka të dhëna të besueshme për skanimet dhe klikimet. Gjurmimi kërkon një tabelë qendrore të bazës së të dhënave dhe qasje të lidhur në Supabase. Deri atëherë nuk shfaqim grafikë të sajuar.' }
};

const themeColors = [
  { id: 'amber', name: 'Amber Warm', bg: 'bg-amber-900', text: 'text-amber-900', bgLight: 'bg-amber-50', border: 'border-amber-900/40' },
  { id: 'emerald', name: 'Forest Emerald', bg: 'bg-emerald-800', text: 'text-emerald-800', bgLight: 'bg-emerald-50', border: 'border-emerald-800/40' },
  { id: 'indigo', name: 'Royal Indigo', bg: 'bg-indigo-900', text: 'text-indigo-900', bgLight: 'bg-indigo-50', border: 'border-indigo-900/40' },
  { id: 'rose', name: 'Rose Luxury', bg: 'bg-rose-800', text: 'text-rose-800', bgLight: 'bg-rose-50', border: 'border-rose-800/40' },
  { id: 'slate', name: 'Classic Slate', bg: 'bg-slate-900', text: 'text-slate-900', bgLight: 'bg-slate-100', border: 'border-slate-900/40' },
  { id: 'violet', name: 'Deep Violet', bg: 'bg-violet-900', text: 'text-violet-900', bgLight: 'bg-violet-50', border: 'border-violet-900/40' },
  { id: 'cyan', name: 'Ocean Cyan', bg: 'bg-cyan-800', text: 'text-cyan-800', bgLight: 'bg-cyan-50', border: 'border-cyan-800/40' },
  { id: 'orange', name: 'Sunset Orange', bg: 'bg-orange-700', text: 'text-orange-700', bgLight: 'bg-orange-50', border: 'border-orange-700/40' }
];

const mainCategories = [
{id:'cat_hotel',name:{de:'Hotel & Unterkunft',en:'Hotel & Accommodation',tr:'Hotel & Konaklama',fr:'Hôtel & hébergement',es:'Hotel y alojamiento',cs:'Hotel a ubytování',sq:'Hotel dhe akomodim',sv:'Hotell och boende',nb:'Hotell og overnatting',it:'Hotel e alloggio'},icon:'Building'},
{id:'cat_food',name:{de:'Essen & Trinken',en:'Food & Drinks',tr:'Yeme & İçme',fr:'Restauration',es:'Comida y bebidas',cs:'Jídlo a nápoje',sq:'Ushqim dhe pije',sv:'Mat och dryck',nb:'Mat og drikke',it:'Cibo e bevande'},icon:'Utensils'},
{id:'cat_wellness',name:{de:'Wellness & Spa',en:'Wellness & Spa',tr:'Wellness & Spa',fr:'Bien-être & spa',es:'Bienestar y spa',cs:'Wellness a spa',sq:'Wellness dhe spa',sv:'Wellness och spa',nb:'Velvære og spa',it:'Benessere e spa'},icon:'Waves'},
{id:'cat_leisure',name:{de:'Freizeit & Aktivitäten',en:'Leisure & Activities',tr:'Boş Zaman & Aktiviteler',fr:'Loisirs & activités',es:'Ocio y actividades',cs:'Volný čas a aktivity',sq:'Kohë e lirë dhe aktivitete',sv:'Fritid och aktiviteter',nb:'Fritid og aktiviteter',it:'Tempo libero e attività'},icon:'Compass'},
{id:'cat_environment',name:{de:'Umgebung & Ausflüge',en:'Area & Excursions',tr:'Çevre & Geziler',fr:'Environs & excursions',es:'Entorno y excursiones',cs:'Okolí a výlety',sq:'Rrethina dhe ekskursione',sv:'Område och utflykter',nb:'Område og utflukter',it:'Dintorni ed escursioni'},icon:'MapPin'},
{id:'cat_mobility',name:{de:'Anreise & Mobilität',en:'Arrival & Mobility',tr:'Ulaşım & Mobilite',fr:'Arrivée & mobilité',es:'Llegada y movilidad',cs:'Příjezd a mobilita',sq:'Mbërritja dhe lëvizshmëria',sv:'Ankomst och mobilitet',nb:'Ankomst og mobilitet',it:'Arrivo e mobilità'},icon:'Car'},
{id:'cat_service',name:{de:'Service & Informationen',en:'Service & Information',tr:'Hizmet & Bilgiler',fr:'Services & informations',es:'Servicios e información',cs:'Služby a informace',sq:'Shërbime dhe informacione',sv:'Service och information',nb:'Service og informasjon',it:'Servizi e informazioni'},icon:'Phone'},
{id:'cat_safety',name:{de:'Regeln & Sicherheit',en:'Rules & Safety',tr:'Kurallar & Güvenlik',fr:'Règles & sécurité',es:'Normas y seguridad',cs:'Pravidla a bezpečnost',sq:'Rregulla dhe siguria',sv:'Regler och säkerhet',nb:'Regler og sikkerhet',it:'Regole e sicurezza'},icon:'ShieldCheck'}
];

// --- EKSİKSİZ PRESET HAVUZU (TÜM KATEGORİLER DOLU) ---
const legacyCategoryPresets = [
  // HOTEL & UNTERKUNFT
  { id: 'hotel_info', categoryId: 'cat_hotel', icon: 'Building', title: { de: 'Hotelinformationen', en: 'Hotel Information', tr: 'Otel Bilgileri', fr: "Informations hôtel", hr: 'Informacije o hotelu' }, schema: [
    { key: 'reception_hours', type: 'text', label: { de: 'Rezeptionszeiten', en: 'Reception Hours', tr: 'Resepsiyon Saatleri', fr: 'Horaires réception', hr: 'Radno vrijeme recepcije' }, default: '07:00 - 22:00 Uhr', primary: true },
    { key: 'emergency_phone', type: 'text', label: { de: 'Notfallnummer', en: 'Emergency Phone', tr: 'Acil Durum Telefonu', fr: "Numéro d'urgence", hr: 'Broj za hitne slučajeve' }, default: '+49 123 456789', primary: true },
    { key: 'multilingual_staff', type: 'boolean', label: { de: 'Mehrsprachiges Personal', en: 'Multilingual Staff', tr: 'Çok Dilli Personel', fr: 'Personnel multilingue', hr: 'Višejezično osoblje' }, default: true, primary: true }
  ]},
  { id: 'room_info', categoryId: 'cat_hotel', icon: 'Bed', title: hotelPresets.find(p => p.id === 'HOT_006').title, schema: hotelPresets.find(p => p.id === 'HOT_006').schema },
  { id: 'sleep_comfort', categoryId: 'cat_hotel', icon: 'Bed', title: { de: 'Schlafkomfort', en: 'Sleep Comfort', tr: 'Uyku Konforu', fr: 'Confort du sommeil', hr: 'Udobnost spavanja' }, schema: [
    { key: 'pillow_menu', type: 'boolean', label: { de: 'Kissenmenü verfügbar', en: 'Pillows Menu Available', tr: 'Yastık Menüsü Mevcut', fr: 'Menu d\'oreillers', hr: 'Meni jastuka' }, default: true, primary: true },
    { key: 'mattress_type', type: 'text', label: { de: 'Matratzenart', en: 'Mattress Type', tr: 'Yatak Tipi', fr: 'Type de matelas', hr: 'Vrsta madraca' }, default: 'Orthopädisch / Premium', primary: true }
  ]},
  { id: 'wifi_internet', categoryId: 'cat_hotel', icon: 'Wifi', title: { de: 'WLAN & Internet', en: 'WiFi & Internet', tr: 'WLAN & İnternet', fr: 'Wi-Fi & Internet', hr: 'Wi-Fi i internet' }, schema: [
    { key: 'wifi_available', type: 'boolean', label: { de: 'WLAN verfügbar', en: 'WiFi Available', tr: 'WLAN Mevcut', fr: 'Wi-Fi disponible', hr: 'Wi-Fi dostupan' }, default: true, primary: true },
    { key: 'network_name', type: 'text', label: { de: 'Netzwerkname (SSID)', en: 'Network Name (SSID)', tr: 'Ağ Adı (SSID)', fr: 'Nom du réseau (SSID)', hr: 'Naziv mreže (SSID)' }, default: 'Hotel-Guest-WiFi', primary: true },
    { key: 'wifi_password', type: 'text', label: { de: 'Passwort', en: 'Password', tr: 'Şifre', fr: 'Mot de passe', hr: 'Lozinka' }, default: 'welcome2026', primary: true }
  ]},

  // ESSEN & TRINKEN
  { id: 'breakfast', categoryId: 'cat_food', icon: 'Coffee', title: { de: 'Frühstück', en: 'Breakfast', tr: 'Kahvaltı', fr: 'Petit-déjeuner', hr: 'Doručak' }, schema: [
    { key: 'breakfast_hours', type: 'text', label: { de: 'Frühstückszeiten', en: 'Breakfast Hours', tr: 'Kahvaltı Saatleri', fr: 'Horaires', hr: 'Vrijeme doručka' }, default: '07:00 - 10:30 Uhr', primary: true },
    { key: 'breakfast_type', type: 'select', label: { de: 'Frühstücksart', en: 'Breakfast Type', tr: 'Kahvaltı Türü', fr: 'Type', hr: 'Vrsta' }, options: ['Reichhaltiges Buffet', 'Kontinental', 'À la carte'], default: 'Reichhaltiges Buffet', primary: true }
  ]},
  { id: 'restaurant_bar', categoryId: 'cat_food', icon: 'Utensils', title: { de: 'Restaurant & Bar', en: 'Restaurant & Bar', tr: 'Restoran & Bar', fr: 'Restaurant & Bar', hr: 'Restoran i bar' }, schema: [
    { key: 'opening_hours', type: 'text', label: { de: 'Öffnungszeiten', en: 'Opening Hours', tr: 'Çalışma Saatleri', fr: 'Horaires', hr: 'Radno vrijeme' }, default: '12:00 - 23:00 Uhr', primary: true },
    { key: 'kitchen_warm', type: 'text', label: { de: 'Warme Küche bis', en: 'Hot food until', tr: 'Sıcak Yemek Bitiş', fr: 'Cuisine chaude jusqu\'à', hr: 'Topla kuhinja do' }, default: '21:30 Uhr', primary: false }
  ]},

  // NACHHALTIGKEIT & UMWELT
  { id: 'sustainability_concept', categoryId: 'cat_sustainability', icon: 'Recycle', title: { de: 'Nachhaltigkeitskonzept', en: 'Sustainability Concept', tr: 'Sürdürülebilirlik Konsepti', fr: 'Concept durable', hr: 'Održivost' }, schema: [
    { key: 'concept_description', type: 'text', label: { de: 'Kurzbeschreibung', en: 'Short Description', tr: 'Kısa Açıklama', fr: 'Description', hr: 'Opis' }, default: 'Wir setzen auf 100% Ökostrom und vermeiden Einwegplastik.', primary: true }
  ]},

  // ZERTIFIKATE & AUSZEICHNUNGEN
  { id: 'cert_sustainability', categoryId: 'cat_certificates', icon: 'Award', title: { de: 'Nachhaltigkeitszertifikate', en: 'Sustainability Certificates', tr: 'Sürdürülebilirlik Sertifikaları', fr: 'Certificats', hr: 'Certifikati' }, schema: [
    { key: 'cert_name', type: 'text', label: { de: 'Zertifikat Name', en: 'Certificate Name', tr: 'Sertifika Adı', fr: 'Nom', hr: 'Naziv' }, default: 'Green Sign / Green Key', primary: true },
    { key: 'cert_number', type: 'text', label: { de: 'Zertifikatsnummer', en: 'Certificate Number', tr: 'Sertifika No', fr: 'Numéro', hr: 'Broj' }, default: 'GK-2026-9876', primary: false }
  ]},

  // WELLNESS & SPA
  { id: 'wellness_spa', categoryId: 'cat_wellness', icon: 'Waves', title: { de: 'Wellness & Sauna', en: 'Wellness & Sauna', tr: 'Wellness & Sauna', fr: 'Wellness & Sauna', hr: 'Wellness i sauna' }, schema: [
    { key: 'spa_hours', type: 'text', label: { de: 'Öffnungszeiten Sauna', en: 'Sauna Hours', tr: 'Sauna Çalışma Saatleri', fr: 'Horaires sauna', hr: 'Radno vrijeme saune' }, default: '10:00 - 20:00 Uhr', primary: true },
    { key: 'bathrobe_service', type: 'boolean', label: { de: 'Bademantelservice auf Zimmer', en: 'Bathrobe Service', tr: 'Odalarda Bademantel Hizmeti', fr: 'Service de peignoir', hr: 'Usluga ogrtača' }, default: true, primary: true }
  ]},

  // FREIZEIT & AKTIVITÄTEN
  { id: 'leisure_activities', categoryId: 'cat_leisure', icon: 'Compass', title: { de: 'Freizeit & Ausflugsziele', en: 'Leisure & Excursions', tr: 'Eğlence & Gezilecek Yerler', fr: 'Loisirs', hr: 'Slobodno vrijeme' }, schema: [
    { key: 'bike_rental', type: 'boolean', label: { de: 'Fahrradverleih im Haus', en: 'Bike Rental Available', tr: 'Bisiklet Kiralama', fr: 'Location de vélos', hr: 'Najam bicikala' }, default: true, primary: true },
    { key: 'hiking_tips', type: 'text', label: { de: 'Wandertipps Region', en: 'Hiking Tips', tr: 'Yürüyüş Rotaları Önerisi', fr: 'Conseils rando', hr: 'Pješačke staze' }, default: 'Direktstart ab Hoteleingang in die Weinberge.', primary: false }
  ]},

  // ANREISE & MOBILITÄT
  { id: 'arrival_mobility', categoryId: 'cat_mobility', icon: 'Car', title: { de: 'Anreise & Parken', en: 'Arrival & Parking', tr: 'Ulaşım & Otopark', fr: 'Arrivée & Parking', hr: 'Dolazak i parking' }, schema: [
    { key: 'charging_station', type: 'boolean', label: { de: 'E-Ladestation vorhanden', en: 'EV Charging Station', tr: 'Elektrikli Araç Şarj İstasyonu', fr: 'Bornes de recharge EV', hr: 'Punionica za električna vozila' }, default: true, primary: true },
    { key: 'public_transport', type: 'text', label: { de: 'Öffentliche Verkehrsmittel', en: 'Public Transport', tr: 'Toplu Taşıma Bilgisi', fr: 'Transport en commun', hr: 'Javni prijevoz' }, default: 'Bahnhof in 500m Entfernung (Buslinie 501)', primary: false }
  ]},

  // SERVICE & INFORMATIONEN
  { id: 'service_info', categoryId: 'cat_service', icon: 'Phone', title: { de: 'Wichtige Services', en: 'Important Services', tr: 'Önemli Servisler', fr: 'Services', hr: 'Usluge' }, schema: [
    { key: 'laundry_service', type: 'boolean', label: { de: 'Wäscheservice / Reinigung', en: 'Laundry Service', tr: 'Çamaşırhane / Kuru Temizleme', fr: 'Service de blanchisserie', hr: 'Usluga pranja rublja' }, default: true, primary: true },
    { key: 'luggage_storage', type: 'boolean', label: { de: 'Gepäckaufbewahrung', en: 'Luggage Storage', tr: 'Emanet Bagaj Odası', fr: 'Bagagerie', hr: 'Skladištenje prtljage' }, default: true, primary: true }
  ]},

  // REGELN & SICHERHEIT
  { id: 'rules_safety', categoryId: 'cat_safety', icon: 'ShieldCheck', title: { de: 'Hausordnung & Sicherheit', en: 'House Rules & Safety', tr: 'Otel Kuralları & Güvenlik', fr: 'Règlement & Sécurité', hr: 'Pravila kuće i sigurnost' }, schema: [
    { key: 'smoking_policy', type: 'boolean', label: { de: 'Nichtraucherhotel (Rauchverbot in Zimmern)', en: 'Non-smoking Hotel', tr: 'Sigara İçilmeyen Tesis', fr: 'Hôtel non-fumeur', hr: 'Hotel nepušača' }, default: true, primary: true },
    { key: 'pet_policy', type: 'boolean', label: { de: 'Haustiere erlaubt', en: 'Pets Allowed', tr: 'Evcil Hayvan Kabul Edilir', fr: 'Animaux acceptés', hr: 'Kućni ljubimci dozvoljeni' }, default: false, primary: true }
  ]}
];

const categoryPresets = [...legacyCategoryPresets, ...hotelPresets, ...additionalPresets];
const renderSafeIconByName = (iconName, currentTheme) => {
  const themeClass = currentTheme ? currentTheme.text : 'text-slate-800';
  const className = `w-5 h-5 ${themeClass}`;
  switch (iconName) {
    case 'Building': return <Building className={className} />;
    case 'Bed': return <Bed className={className} />;
    case 'Key': return <Key className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Waves': return <Waves className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'MapPin': return <MapPin className={className} />;
    case 'Car': return <Car className={className} />;
    case 'Phone': return <Phone className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Wifi': return <Wifi className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Recycle': return <Recycle className={className} />;
    case 'Award': return <Award className={className} />;
    case 'Baby': return <Baby className={className} />;
    case 'Accessibility': return <Accessibility className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Lock': return <Lock className={className} />;
    case 'Sun': return <Sun className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Users': return <Users className={className} />;
    default: return <Info className={className} />;
  }
};

const OTHER_CUSTOM='OTHER_CUSTOM';
const customTextLabels={de:'Sonstiges – Eigener Text',en:'Other – Custom Text',tr:'Diğer – Özel Metin',fr:'Autre – Texte personnalisé',es:'Otro – Texto personalizado',cs:'Jiné – Vlastní text',sq:'Tjetër – Tekst personal',sv:'Annat – Egen text',nb:'Annet – Egendefinert tekst',it:'Altro – Testo personalizzato'};
const customTextFieldLabels={de:'Eigener Text (wird nicht übersetzt)',en:'Custom text (not translated)',tr:'Özel metin (çevrilmez)',fr:'Texte personnalisé (non traduit)',es:'Texto personalizado (no se traduce)',cs:'Vlastní text (nepřekládá se)',sq:'Tekst personal (nuk përkthehet)',sv:'Egen text (översätts inte)',nb:'Egendefinert tekst (oversettes ikke)',it:'Testo personalizzato (non tradotto)'};
const optionId=o=>typeof o==='string'?o:o.id;
const optionLabel=(o,lang)=>typeof o==='string'?o:((o.label&&(o.label[lang]||o.label.de))||o.id);
const getFieldOptions=f=>[...(Array.isArray(f?.options)?f.options:[]).filter(o=>optionId(o)!==OTHER_CUSTOM),{id:OTHER_CUSTOM,label:customTextLabels}];
const PresetFieldEditor=({field,value,fieldValues,onChange,onCustomTextChange,lang,hideLabel=false})=>{
const val=value!==undefined?value:field.default,options=getFieldOptions(field),customKey=field.key+'__customText',customValue=fieldValues[customKey]||'';
const selected=field.type==='multiselect'?(Array.isArray(val)&&val.includes(OTHER_CUSTOM)):val===OTHER_CUSTOM;
const label=(field.label&&(field.label[lang]||field.label.de))||field.key;
const toggle=(id,checked)=>{const current=Array.isArray(val)?val:[];onChange(checked?[...current.filter(x=>x!==id),id]:current.filter(x=>x!==id));};
return <div className="space-y-1.5">{!hideLabel&&<label className="block text-[10px] font-extrabold text-stone-500 uppercase">{label}</label>}
{field.type==='boolean'?<input type="checkbox" checked={!!val} onChange={e=>onChange(e.target.checked)}/>:
field.type==='select'?<select value={val||''} onChange={e=>onChange(e.target.value)} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white">{(Array.isArray(options) ? options : []).map(o=><option key={optionId(o)} value={optionId(o)}>{optionLabel(o,lang)}</option>)}</select>:
field.type==='multiselect'?<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{(Array.isArray(options) ? options : []).map(o=>{const id=optionId(o);return <label key={id} className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs cursor-pointer"><input type="checkbox" checked={(Array.isArray(val)?val:[]).includes(id)} onChange={e=>toggle(id,e.target.checked)}/><span>{optionLabel(o,lang)}</span></label>;})}</div>:
field.type==='textarea'?<textarea rows={3} maxLength={5000} value={val||''} onChange={e=>onChange(e.target.value)} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl"/>:
<input type="text" value={val??''} onChange={e=>onChange(e.target.value)} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl"/>}
{selected&&<div className="pt-2 space-y-1"><label className="block text-[10px] font-bold text-amber-800">{customTextFieldLabels[lang]||customTextFieldLabels.de}</label><textarea rows={3} maxLength={2000} value={customValue} onChange={e=>onCustomTextChange(customKey,e.target.value)} placeholder={customTextLabels[lang]||customTextLabels.de} className="w-full p-2.5 text-xs border border-amber-300 rounded-xl bg-amber-50/40"/><span className="text-[10px] text-stone-400">{customValue.length}/2000</span></div>}</div>;
};

// --- 3-ADIMLI SAAS EDITÖR MODALI ---
const CompactPresetEditorModal = ({ isOpen, onClose, onSave, currentTheme, lang, t, editingCategory }) => {
  const [step, setStep] = useState(1);
  const [selectedMainCat, setSelectedMainCat] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  
  const [customTitle, setCustomTitle] = useState('');
  const [customText, setCustomText] = useState('');
  const [fieldValues, setFieldValues] = useState({});

  useEffect(() => {
    if (editingCategory) {
      setStep(3);
      setSelectedMainCat(editingCategory.categoryId);
      const presetObj = categoryPresets.find(p => p.id === editingCategory.presetId);
      setSelectedPreset(presetObj || null);
      setCustomTitle(editingCategory.customTitle || '');
      setCustomText(editingCategory.customText || '');
      setFieldValues(editingCategory.fieldValues || {});
    } else {
      setStep(1);
      setSelectedMainCat(null);
      setSelectedPreset(null);
      setCustomTitle('');
      setCustomText('');
      setFieldValues({});
    }
  }, [editingCategory, isOpen]);

  if (!isOpen) return null;

  const handleSelectCategory = (catId) => {
    setSelectedMainCat(catId);
    setStep(2);
  };

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    const initialVals = {};
    if (preset && preset.schema) {
      preset.schema.forEach(f => {
        initialVals[f.key] = f.default !== undefined ? f.default : (f.type === 'multiselect' ? [] : '');
      });
    }
    setFieldValues(initialVals);
    setStep(3);
  };

  const handleFieldValueChange = (key, val) => {
    setFieldValues(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    const categoryData = {
      id: editingCategory ? editingCategory.id : Date.now().toString(),
      presetId: selectedPreset ? selectedPreset.id : 'custom',
      categoryId: selectedMainCat || 'cat_hotel',
      icon: selectedPreset ? selectedPreset.icon : 'Info',
      customTitle: customTitle,
      fieldValues: fieldValues,
      customText: customText
    };
    onSave(categoryData);
    onClose();
  };

  const availablePresets = categoryPresets.filter(p => p.categoryId === selectedMainCat || (selectedMainCat === 'cat_safety' && (p.categoryId === 'cat_sustainability' || p.categoryId === 'cat_certificates')))
    .filter(p => {
      if (!searchQuery) return true;
      const title = (p.title && (p.title[lang] || p.title.de)) || '';
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const primaryFields = selectedPreset?.schema?.filter(f => f.primary) || [];
  const secondaryFields = selectedPreset?.schema?.filter(f => !f.primary) || [];

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-6 animate-fade-in overflow-x-hidden">
      <div className="bg-white w-full min-w-0 max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] border border-stone-200">
        
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 block">{t.modalTitle}</span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {step === 1 && t.step1Title}
              {step === 2 && t.step2Title}
              {step === 3 && t.step3Title}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-stone-400 hover:text-slate-800 hover:bg-stone-200/50 transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full bg-stone-100 h-1.5 flex">
          <div className={`h-full transition-all duration-300 ${currentTheme.bg} ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>

        <div className="min-w-0 p-3 sm:p-6 overflow-y-auto overflow-x-hidden flex-1 space-y-4 overscroll-contain">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 min-w-0">
              {mainCategories.map(mainCat => {
                const name = mainCat.name[lang] || mainCat.name.de;
                return (
                  <button
                    key={mainCat.id}
                    onClick={() => handleSelectCategory(mainCat.id)}
                    className={`min-w-0 w-full p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer bg-white hover:${currentTheme.border} hover:shadow-md group`}
                  >
                    <div className={`p-2.5 rounded-xl ${currentTheme.bgLight} group-hover:scale-105 transition`}>
                      {renderSafeIconByName(mainCat.icon, currentTheme)}
                    </div>
                    <span className="min-w-0 flex-1 text-xs font-bold text-slate-800 group-hover:text-slate-950 break-words">{name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <button onClick={() => setStep(1)} className={`text-xs font-extrabold ${currentTheme.text} cursor-pointer`}>
                  &larr; {t.step1Title}
                </button>
                <div className="relative flex-1 max-w-xs">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-stone-200 rounded-xl bg-stone-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                {availablePresets.length > 0 ? (
                  availablePresets.map(preset => {
                    const title = preset.title[lang] || preset.title.de;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`p-3.5 rounded-2xl border border-stone-200 bg-white hover:${currentTheme.border} cursor-pointer flex items-center justify-between transition shadow-xs hover:shadow-sm`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${currentTheme.bgLight}`}>
                            {renderSafeIconByName(preset.icon, currentTheme)}
                          </div>
                          <span className="text-xs font-extrabold text-slate-900">{title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400" />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-stone-400 text-center py-6">{t.noPresetsFound}</p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {!editingCategory && (
                <button onClick={() => setStep(2)} className={`text-xs font-extrabold ${currentTheme.text} cursor-pointer`}>
                  &larr; {t.step2Title}
                </button>
              )}

              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-stone-500 tracking-wider">{t.editTitle}</label>
                <input
                  type="text"
                  placeholder={selectedPreset ? (selectedPreset.title[lang] || selectedPreset.title.de) : 'Titel'}
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full p-2.5 text-xs font-bold border border-stone-200 rounded-xl bg-stone-50 focus:bg-white"
                />
              </div>

              <div className="space-y-3 bg-stone-50/60 p-4 rounded-2xl border border-stone-200/80">
{(selectedPreset?.id === 'HOT_006' || selectedPreset?.id === 'room_info') ? (() => {
  const roomGroups = [
    {id:'room_amenities',label:{de:'Zimmerausstattung',en:'Room amenities',tr:'Oda donanımı',fr:'Équipements de la chambre',hr:'Oprema sobe',it:'Dotazioni della camera',es:'Equipamiento de la habitación',sv:'Rumsutrustning',no:'Romfasiliteter',sq:'Pajisjet e dhomës'},keys:['room_amenities','room_smoking_policy']},
    {id:'beds',label:{de:'Betten & Schlafkomfort',en:'Beds & sleep comfort',tr:'Yataklar & uyku konforu',fr:'Lits & confort',hr:'Kreveti i udobnost',it:'Letti e comfort',es:'Camas y confort',sv:'Sängar och komfort',no:'Senger og komfort',sq:'Krevatet dhe rehatia'},keys:['bed_types']},
    {id:'bath',label:{de:'Badezimmer',en:'Bathroom',tr:'Banyo',fr:'Salle de bains',hr:'Kupaonica',it:'Bagno',es:'Baño',sv:'Badrum',no:'Bad',sq:'Banjo'},keys:['bathroom_features']},
    {id:'tech',label:{de:'Internet & Unterhaltung',en:'Internet & entertainment',tr:'İnternet & eğlence',fr:'Internet & divertissement',hr:'Internet i zabava',it:'Internet e intrattenimento',es:'Internet y entretenimiento',sv:'Internet och underhållning',no:'Internett og underholdning',sq:'Internet dhe argëtim'},keys:['room_technology']},
    {id:'view',label:{de:'Balkon, Terrasse & Aussicht',en:'Balcony, terrace & view',tr:'Balkon, teras & manzara',fr:'Balcon, terrasse & vue',hr:'Balkon, terasa i pogled',it:'Balcone, terrazza e vista',es:'Balcón, terraza y vistas',sv:'Balkong, terrass och utsikt',no:'Balkong, terrasse og utsikt',sq:'Ballkon, tarracë dhe pamje'},keys:['room_outdoor_view']},
    {id:'capacity',label:{de:'Größe & Kapazität',en:'Size & capacity',tr:'Boyut & kapasite',fr:'Taille & capacité',hr:'Veličina i kapacitet',it:'Dimensioni e capienza',es:'Tamaño y capacidad',sv:'Storlek och kapacitet',no:'Størrelse og kapasitet',sq:'Madhësia dhe kapaciteti'},keys:['room_capacity','room_max_guests','room_floor_number']},
    {id:'accessibility',label:{de:'Barrierefreiheit',en:'Accessibility',tr:'Erişilebilirlik',fr:'Accessibilité',hr:'Pristupačnost',it:'Accessibilità',es:'Accesibilidad',sv:'Tillgänglighet',no:'Tilgjengelighet',sq:'Aksesueshmëria'},keys:['room_accessibility']}
  ];
  return <div className="space-y-2">{roomGroups.map((group,index)=><details key={group.id} className="rounded-xl border border-stone-200 bg-white overflow-hidden"><summary className="cursor-pointer list-none flex items-center justify-between px-3 py-3 text-xs font-bold text-slate-800 bg-stone-50"><span>{group.label[lang]||group.label.de}</span><ChevronDown className="w-4 h-4 text-stone-400"/></summary><div className="p-3 space-y-3">{group.keys.map(key=>{const field=primaryFields.find(item=>item.key===key);return field?<PresetFieldEditor key={field.key} field={field} value={fieldValues[field.key]} fieldValues={fieldValues} lang={lang} hideLabel={true} onChange={value=>handleFieldValueChange(field.key,value)} onCustomTextChange={handleFieldValueChange}/>:null;})}</div></details>)}</div>;
})() : primaryFields.map(field=><PresetFieldEditor key={field.key} field={field} value={fieldValues[field.key]} fieldValues={fieldValues} lang={lang} onChange={value=>handleFieldValueChange(field.key,value)} onCustomTextChange={handleFieldValueChange}/>)}
</div>
              {secondaryFields.length > 0 && (
                <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                    className="w-full p-3 bg-stone-50 text-left text-xs font-bold text-stone-700 flex justify-between items-center cursor-pointer hover:bg-stone-100"
                  >
                    <span>{t.moreInfo} ({secondaryFields.length})</span>
                    {showMoreInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showMoreInfo && (
                    <div className="p-4 space-y-3 bg-white border-t border-stone-200">
{secondaryFields.map(field=><PresetFieldEditor key={field.key} field={field} value={fieldValues[field.key]} fieldValues={fieldValues} lang={lang} onChange={value=>handleFieldValueChange(field.key,value)} onCustomTextChange={handleFieldValueChange}/>)}
</div>
                  )}
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-amber-800 tracking-wider">{t.customTextLabel}</label>
                <textarea
                  rows="2"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Individueller Hinweistext für Gäste..."
                  className="w-full p-2.5 text-xs border border-amber-300/60 rounded-xl bg-amber-50/40"
                />
              </div>
            </div>
          )}
        </div>

        {step === 3 && (
          <div className="p-3 sm:p-4 border-t border-stone-100 bg-stone-50/95 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 shrink-0">
            <button onClick={onClose} className="w-full sm:w-auto px-4 py-3 sm:py-2 text-xs font-bold text-stone-600 hover:text-slate-900 cursor-pointer">
              {t.cancel}
            </button>
            <button onClick={handleSave} className={`w-full sm:w-auto justify-center px-5 py-3 sm:py-2.5 rounded-xl text-xs font-bold text-white shadow-md ${currentTheme.bg} hover:opacity-95 cursor-pointer flex items-center gap-1.5`}>
              <Check className="w-4 h-4" /> {t.saveAndClose}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const GuestCategoryDisplay = ({ category, currentTheme, lang, t }) => {
  const presetObj = categoryPresets.find(p => p.id === category.presetId);
  const fieldValues = category.fieldValues || {};

  return (
    <div className="space-y-4">
      {presetObj && presetObj.schema && presetObj.schema.length > 0 && (
        <div className={`bg-white p-5 rounded-3xl shadow-lg border ${currentTheme.border} space-y-4`}>
          {(Array.isArray(presetObj.schema) ? presetObj.schema : []).map(field => {
            const rawVal = fieldValues[field.key] !== undefined ? fieldValues[field.key] : field.default;
            const fieldLabel = (field.label && (field.label[lang] || field.label.de)) || field.key;

            if (rawVal === undefined || rawVal === null || rawVal === '' || (Array.isArray(rawVal) && rawVal.length === 0)) return null;

            return (
              <div key={field.key} className="border-b border-stone-100 last:border-0 pb-3.5 last:pb-0 flex flex-col gap-1.5">
                <span className={`text-[10px] font-black uppercase tracking-wider ${currentTheme.text} opacity-90`}>{fieldLabel}</span>
                
                {field.type === 'boolean' ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold pt-0.5">
                    {rawVal ? (
                      <span className="text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200 flex items-center gap-2 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.yesLabel}
                      </span>
                    ) : (
                      <span className="text-stone-600 bg-stone-100 px-3.5 py-2 rounded-2xl border border-stone-200 flex items-center gap-2 shadow-xs">
                        <XCircle className="w-4 h-4 text-stone-400" /> {t.noLabel}
                      </span>
                    )}
                  </div>
                ) : field.type === 'multiselect' && Array.isArray(rawVal) ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rawVal.filter(item=>item!==OTHER_CUSTOM).map(item=>{const option=(field.options||[]).find(candidate=>optionId(candidate)===item);return <span key={item} className={currentTheme.bgLight+' '+currentTheme.text+' px-3 py-1.5 rounded-xl text-xs font-bold border border-stone-200/60 shadow-xs'}>{option?optionLabel(option,lang):item}</span>;})}
                    {rawVal.includes(OTHER_CUSTOM)&&fieldValues[field.key+'__customText']&&<p className="w-full mt-2 text-xs text-slate-700 whitespace-pre-line">{fieldValues[field.key+'__customText']}</p>}
                  </div> ) : field.type === 'select' ? (<div className="text-xs font-extrabold text-slate-900 bg-stone-50 px-4 py-3 rounded-2xl border border-stone-200/70">{rawVal===OTHER_CUSTOM?(customTextLabels[lang]||customTextLabels.de):(()=>{const option=(field.options||[]).find(candidate=>optionId(candidate)===rawVal);return option?optionLabel(option,lang):String(rawVal);})()}{rawVal===OTHER_CUSTOM&&fieldValues[field.key+'__customText']&&<p className="mt-2 whitespace-pre-line font-medium">{fieldValues[field.key+'__customText']}</p>}</div>) : (<div className="text-xs font-extrabold text-slate-900 bg-stone-50 px-4 py-3 rounded-2xl border border-stone-200/70">{String(rawVal)}</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {category.customText && (
        <div className="p-5 rounded-3xl border border-amber-300/80 bg-amber-50/90 shadow-sm text-slate-800 text-xs leading-relaxed space-y-1.5">
          <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider block">Hinweis / Notice</span>
          <p className="whitespace-pre-line font-medium">{category.customText}</p>
        </div>
      )}
    </div>
  );
};

const AddressAutocomplete = ({ value, onChange, className }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    const query = (value || '').trim();
    if (!isTyping || query.length < 3) { setSuggestions([]); setOpen(false); return; }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch('https://photon.komoot.io/api/?q=' + encodeURIComponent(query) + '&limit=5&lang=de', { signal: controller.signal });
        if (!response.ok) throw new Error('Address suggestions unavailable');
        const data = await response.json();
        const items = (data.features || []).map(feature => {
          const p = feature.properties || {};
          const street = p.street ? (p.housenumber ? p.street + ' ' + p.housenumber : p.street) : '';
          return { label: [p.name, street, p.postcode, p.city || p.town || p.village, p.state, p.country].filter(Boolean).filter((part, index, all) => all.indexOf(part) === index).join(', ') };
        }).filter(item => item.label);
        setSuggestions(items); setOpen(items.length > 0);
      } catch (error) { if (error.name !== 'AbortError') { setSuggestions([]); setOpen(false); } }
    }, 350);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [value]);
  return <div className="relative">
    <input type="text" value={value || ''} onChange={event => { setIsTyping(true); onChange(event.target.value); }} onFocus={() => { if (isTyping && suggestions.length) setOpen(true); }} onBlur={() => setTimeout(() => setOpen(false), 150)} autoComplete="off" className={className} />
    {open && suggestions.length > 0 && <div role="listbox" className="absolute z-50 left-0 right-0 top-full mt-1 rounded-xl border border-stone-200 bg-white shadow-xl overflow-hidden">
      {suggestions.map((item, index) => <button key={item.label + index} type="button" role="option" onMouseDown={event => event.preventDefault()} onClick={() => { onChange(item.label); setIsTyping(false); setOpen(false); setSuggestions([]); }} className="w-full px-3 py-2.5 text-left text-xs text-stone-700 hover:bg-amber-50 border-b last:border-b-0 border-stone-100">
        <MapPin className="inline w-3.5 h-3.5 mr-2 text-stone-400" />{item.label}
      </button>)}
      <div className="px-3 py-1.5 text-[9px] text-stone-400">Adressvorschläge von OpenStreetMap / Photon</div>
    </div>}
  </div>;
};
export default function App() {
  const [lang, setLang] = useState('de');
  const t = translations[lang] || translations.de;
  const quickAccessLabels = {
    de: { title: 'Schnellzugriff anzeigen', wifi: 'WLAN-Karte', parking: 'Parkplatz-Karte', breakfast: 'Frühstücks-Karte', checkin: 'Check-in / Check-out-Karte' },
    en: { title: 'Show quick access cards', wifi: 'Wi-Fi card', parking: 'Parking card', breakfast: 'Breakfast card', checkin: 'Check-in / Check-out card' },
    tr: { title: 'Hızlı erişim kartlarını göster', wifi: 'WLAN kartı', parking: 'Otopark kartı', breakfast: 'Kahvaltı kartı', checkin: 'Giriş / Çıkış kartı' },
    fr: { title: 'Afficher les accès rapides', wifi: 'Carte Wi-Fi', parking: 'Carte parking', breakfast: 'Carte petit-déjeuner', checkin: 'Carte arrivée / départ' },
    es: { title: 'Mostrar accesos rápidos', wifi: 'Tarjeta Wi-Fi', parking: 'Tarjeta de aparcamiento', breakfast: 'Tarjeta de desayuno', checkin: 'Tarjeta entrada / salida' },
    cs: { title: 'Zobrazit rychlý přístup', wifi: 'Karta Wi-Fi', parking: 'Karta parkování', breakfast: 'Karta snídaně', checkin: 'Karta příjezd / odjezd' },
    sq: { title: 'Shfaq qasjet e shpejta', wifi: 'Karta Wi-Fi', parking: 'Karta e parkimit', breakfast: 'Karta e mëngjesit', checkin: 'Karta hyrje / dalje' },
    sv: { title: 'Visa snabb åtkomst', wifi: 'Wi-Fi-kort', parking: 'Parkeringskort', breakfast: 'Frukostkort', checkin: 'In- och utcheckningskort' },
    nb: { title: 'Vis hurtigtilgang', wifi: 'Wi-Fi-kort', parking: 'Parkeringskort', breakfast: 'Frokostkort', checkin: 'Inn- og utsjekkingskort' },
    it: { title: 'Mostra accessi rapidi', wifi: 'Scheda Wi-Fi', parking: 'Scheda parcheggio', breakfast: 'Scheda colazione', checkin: 'Scheda check-in / check-out' },
    hr: { title: 'Prikaži brzi pristup', wifi: 'Wi-Fi kartica', parking: 'Kartica parkirališta', breakfast: 'Kartica doručka', checkin: 'Kartica prijave / odjave' }
  };
  const quickLabels = quickAccessLabels[lang] || quickAccessLabels.de;

  const [appMode, setAppMode] = useState('guest');
  const guestSlug = typeof window !== 'undefined'
    ? (window.location.pathname.match(/^\/g\/([a-z0-9-]+)\/?$/i)?.[1] || null)
    : null;
  const [guestPageStatus, setGuestPageStatus] = useState('idle');
  const [authSession, setAuthSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [hotelRecord, setHotelRecord] = useState(null);
  const [hotelRecords, setHotelRecords] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState('');
  const [accountRecord, setAccountRecord] = useState(null);
  const [trialNow, setTrialNow] = useState(Date.now());
  const [analyticsRows, setAnalyticsRows] = useState([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [cloudDataStatus, setCloudDataStatus] = useState('idle');
  const [cloudDataError, setCloudDataError] = useState('');

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }
    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) console.warn('Could not restore Supabase session:', error);
      setAuthSession(data?.session || null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthSession(session || null);
      setAuthLoading(false);
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setTrialNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const userId = authSession?.user?.id;
    if (!supabase || !userId || guestSlug) {
      setHotelRecord(null);
      setHotelRecords([]);
      setSelectedHotelId('');
      setAccountRecord(null);
      setCloudDataStatus('idle');
      return undefined;
    }

    let active = true;
    const loadOrCreateHotel = async () => {
      setCloudDataStatus('loading');
      setCloudDataError('');
      try {
        const { data: existingHotels, error } = await supabase
          .from('gm24_hotels')
          .select('id, slug, name, profile, public_content, created_at')
          .eq('owner_id', userId)
          .order('created_at', { ascending: true });
        if (error) throw error;

        let records = existingHotels || [];
        if (records.length === 0) {
          const slug = `hotel-${userId.replace(/-/g, '').slice(0, 12)}`;
          const { data: created, error: createError } = await supabase
            .from('gm24_hotels')
            .insert({
              owner_id: userId,
              slug,
              name: 'Meine Unterkunft',
              profile: {},
              public_content: {}
            })
            .select('id, slug, name, profile, public_content, created_at')
            .single();
          if (createError) throw createError;
          records = [created];
        }
        if (!active) return;
        setHotelRecords(records);
        const selected = records.find(item => item.id === selectedHotelId) || records[0];
        setHotelRecord(selected);
        setSelectedHotelId(selected.id);
        const savedProfile = selected.profile && typeof selected.profile === 'object' ? selected.profile : {};
        if (savedProfile.hotel && typeof savedProfile.hotel === 'object') setHotel(savedProfile.hotel);
        if (Array.isArray(savedProfile.categories)) setCategories(savedProfile.categories);

        const { data: account, error: accountError } = await supabase
          .from('gm24_accounts')
          .select('owner_id, plan_code, subscription_status, trial_started_at, trial_ends_at, paid_until')
          .eq('owner_id', userId)
          .maybeSingle();
        if (accountError) throw accountError;
        if (!active) return;
        setAccountRecord(account || null);
        setCloudDataStatus('ready');
      } catch (error) {
        if (!active) return;
        console.error('Hotel cloud data could not be loaded:', error);
        setCloudDataError(error?.message || 'Die Unterkunftsdaten konnten nicht geladen werden.');
        setCloudDataStatus('error');
      }
    };

    loadOrCreateHotel();
    return () => { active = false; };
  }, [authSession?.user?.id, guestSlug]);

  useEffect(() => {
    const hotelId = hotelRecord?.id;
    if (!supabase || !hotelId || guestSlug || !authSession?.user?.id) {
      setAnalyticsRows([]);
      return undefined;
    }
    let active = true;
    const loadAnalytics = async () => {
      setAnalyticsLoading(true);
      const { data, error } = await supabase
        .from('gm24_analytics_daily')
        .select('event_date, page_key, views')
        .eq('hotel_id', hotelId)
        .order('event_date', { ascending: false })
        .limit(90);
      if (!active) return;
      if (error) {
        console.warn('Analytics could not be loaded:', error);
        setAnalyticsRows([]);
      } else {
        setAnalyticsRows((data || []).filter(row => row && row.page_key));
      }
      setAnalyticsLoading(false);
    };
    loadAnalytics();
    return () => { active = false; };
  }, [hotelRecord?.id, authSession?.user?.id, guestSlug]);

  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const [currentSlide] = useState(0);
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [qrPrintFormat, setQrPrintFormat] = useState('a4');

  const guestPageUrl = typeof window !== 'undefined'
    ? (hotelRecord?.slug ? `${window.location.origin}/g/${hotelRecord.slug}` : `${window.location.origin}${window.location.pathname}`)
    : '';

  const quickAccessDefaults = {
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
  const [quickEditLang, setQuickEditLang] = useState('de');
  const [hotel, setHotel] = useState(() => {
    const saved = localStorage.getItem('gm24_hotel');
    const defaultData = {
      logoUrl: '',
      name: 'Boutique Hotel & Suites', 
      locationTitle: 'REGION / STANDORT',
      address: '',
      phone: '+49 123 456789',
      email: 'info@meine-unterkunft.de',
      website: 'www.meine-unterkunft.de',
      googleReviewUrl: '',
      wifiSsid: 'Guest_WiFi',
      wifiPass: 'welcome2026',
      breakfastTime: '07:30 - 10:30 Uhr',
      checkInOut: 'Check-in: ab 15:00 | Check-out: bis 11:00',
      parkingInfo: 'Kostenfreie Parkplätze am Haus verfügbar.',
      showWifi: true,
      showParking: true,
      showBreakfast: true,
      showCheckInOut: true,
      quickAccessContent: quickAccessDefaults,
      themeColor: 'amber',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
      ]
    };
    if (!saved) return defaultData;
    try {
      const parsed = JSON.parse(saved);
      const merged = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? { ...defaultData, ...parsed } : defaultData;
      if (/Musterstraße 1|12345 Musterstadt/i.test(merged.address || '')) merged.address = '';
      if (/g\.page\/r\/example\/review/i.test(merged.googleReviewUrl || '')) merged.googleReviewUrl = '';
      const quickAccessContent = Object.fromEntries(Object.entries(quickAccessDefaults).map(([language, cards]) => [
        language,
        Object.fromEntries(Object.entries(cards).map(([id, defaults]) => [id, { ...defaults, ...(language === 'de' ? (id === 'parking' ? { description: merged.parkingInfo || defaults.description } : id === 'breakfast' ? { description: merged.breakfastTime || defaults.description } : id === 'checkin' ? { description: merged.checkInOut || defaults.description } : {}) : {}), ...(merged.quickAccessContent?.[language]?.[id] || {}) }]))
      ]));
      return { ...merged, quickAccessContent, images: Array.isArray(merged.images) ? merged.images : defaultData.images };
    } catch (error) {
      console.error('Ungültige gespeicherte Hoteldaten – Standardwerte werden verwendet.', error);
      return defaultData;
    }
  });

  const [weather, setWeather] = useState({ status: 'loading', temperature: null, code: null, place: '' });
  const weatherLabels = {
    de: { loading:'Wetter wird geladen …', missing:'Hotelstandort fehlt', unavailable:'Wetterdaten derzeit nicht verfügbar', clear:'Klar', mainlyClear:'Überwiegend klar', partlyCloudy:'Teilweise bewölkt', overcast:'Bedeckt', fog:'Nebel', drizzle:'Nieselregen', rain:'Regen', snow:'Schnee', showers:'Regenschauer', snowShowers:'Schneeschauer', storm:'Gewitter' },
    en: { loading:'Loading weather …', missing:'Hotel location missing', unavailable:'Weather data currently unavailable', clear:'Clear', mainlyClear:'Mainly clear', partlyCloudy:'Partly cloudy', overcast:'Overcast', fog:'Fog', drizzle:'Drizzle', rain:'Rain', snow:'Snow', showers:'Rain showers', snowShowers:'Snow showers', storm:'Thunderstorm' },
    tr: { loading:'Hava durumu yükleniyor …', missing:'Otel konumu eksik', unavailable:'Hava durumu bilgisi şu anda alınamıyor', clear:'Açık', mainlyClear:'Çoğunlukla açık', partlyCloudy:'Parçalı bulutlu', overcast:'Kapalı', fog:'Sis', drizzle:'Çiseleme', rain:'Yağmur', snow:'Kar', showers:'Sağanak', snowShowers:'Kar sağanağı', storm:'Gök gürültülü fırtına' },
    fr: { loading:'Chargement de la météo …', missing:'Emplacement de l’hôtel manquant', unavailable:'Météo actuellement indisponible', clear:'Dégagé', mainlyClear:'Plutôt dégagé', partlyCloudy:'Partiellement nuageux', overcast:'Couvert', fog:'Brouillard', drizzle:'Bruine', rain:'Pluie', snow:'Neige', showers:'Averses', snowShowers:'Averses de neige', storm:'Orage' },
    hr: { loading:'Učitavanje vremena …', missing:'Nedostaje lokacija hotela', unavailable:'Vremenski podaci trenutno nisu dostupni', clear:'Vedro', mainlyClear:'Pretežno vedro', partlyCloudy:'Djelomično oblačno', overcast:'Oblačno', fog:'Magla', drizzle:'Rosulja', rain:'Kiša', snow:'Snijeg', showers:'Pljuskovi', snowShowers:'Snježni pljuskovi', storm:'Grmljavinska oluja' },
    it: { loading:'Caricamento meteo …', missing:'Posizione dell’hotel mancante', unavailable:'Dati meteo momentaneamente non disponibili', clear:'Sereno', mainlyClear:'Prevalentemente sereno', partlyCloudy:'Parzialmente nuvoloso', overcast:'Coperto', fog:'Nebbia', drizzle:'Pioviggine', rain:'Pioggia', snow:'Neve', showers:'Rovesci', snowShowers:'Rovesci di neve', storm:'Temporale' },
    es: { loading:'Cargando el tiempo …', missing:'Falta la ubicación del hotel', unavailable:'Datos meteorológicos no disponibles', clear:'Despejado', mainlyClear:'Mayormente despejado', partlyCloudy:'Parcialmente nublado', overcast:'Cubierto', fog:'Niebla', drizzle:'Llovizna', rain:'Lluvia', snow:'Nieve', showers:'Chubascos', snowShowers:'Chubascos de nieve', storm:'Tormenta' },
    sv: { loading:'Laddar väder …', missing:'Hotellets plats saknas', unavailable:'Väderdata är inte tillgängliga just nu', clear:'Klart', mainlyClear:'Mestadels klart', partlyCloudy:'Växlande molnighet', overcast:'Mulet', fog:'Dimma', drizzle:'Duggregn', rain:'Regn', snow:'Snö', showers:'Regnskurar', snowShowers:'Snöbyar', storm:'Åska' },
    no: { loading:'Laster vær …', missing:'Hotellets plassering mangler', unavailable:'Værdata er ikke tilgjengelig nå', clear:'Klart', mainlyClear:'For det meste klart', partlyCloudy:'Delvis skyet', overcast:'Overskyet', fog:'Tåke', drizzle:'Yr', rain:'Regn', snow:'Snø', showers:'Regnbyger', snowShowers:'Snøbyger', storm:'Tordenvær' },
    sq: { loading:'Po ngarkohet moti …', missing:'Mungon vendndodhja e hotelit', unavailable:'Të dhënat e motit nuk janë të disponueshme', clear:'Kthjellët', mainlyClear:'Kryesisht kthjellët', partlyCloudy:'Pjesërisht me re', overcast:'Vranët', fog:'Mjegull', drizzle:'Shi i imët', rain:'Shi', snow:'Borë', showers:'Rrebeshe', snowShowers:'Rrebeshe bore', storm:'Stuhi' }
  };
  const getWeatherDescription = (code, labels) => {
    if (code === 0) return labels.clear;
    if (code === 1) return labels.mainlyClear;
    if (code === 2) return labels.partlyCloudy;
    if (code === 3) return labels.overcast;
    if ([45,48].includes(code)) return labels.fog;
    if ([51,53,55,56,57].includes(code)) return labels.drizzle;
    if ([61,63,65,66,67,80,81,82].includes(code)) return [80,81,82].includes(code) ? labels.showers : labels.rain;
    if ([71,73,75,77].includes(code)) return labels.snow;
    if ([85,86].includes(code)) return labels.snowShowers;
    if ([95,96,99].includes(code)) return labels.storm;
    return labels.unavailable;
  };
  useEffect(() => {
    const address = (hotel.address || '').trim();
    const fallbackLocation = (hotel.locationTitle || '').trim();
    const isExampleAddress = /Musterstraße 1|12345 Musterstadt/i.test(address);
    const searchTerms = [...new Set([address, fallbackLocation].filter(value => value && !/Musterstraße 1|12345 Musterstadt/i.test(value)))];
    if ((!address || isExampleAddress) && !fallbackLocation) {
      setWeather({ status: 'missing', temperature: null, code: null, place: '' });
      return;
    }
    const controller = new AbortController();
    setWeather({ status: 'loading', temperature: null, code: null, place: '' });
    const loadWeather = async () => {
      try {
        let place = null;
        for (const term of searchTerms) {
          const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(term)}&count=5&language=${lang === 'tr' ? 'tr' : lang === 'de' ? 'de' : 'en'}&format=json`, { signal: controller.signal });
          if (!geoResponse.ok) continue;
          const geoData = await geoResponse.json();
          const results = geoData.results || [];
          const normalizedTerm = term.toLocaleLowerCase();
          place = results.find(item => normalizedTerm.includes((item.name || '').toLocaleLowerCase()) || (item.name || '').toLocaleLowerCase().includes(normalizedTerm)) || results[0] || null;
          if (place) break;
        }
        if (!place) throw new Error('Hotel location not found');
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code&timezone=auto`, { signal: controller.signal });
        if (!weatherResponse.ok) throw new Error('Weather request failed');
        const weatherData = await weatherResponse.json();
        if (typeof weatherData.current?.temperature_2m !== 'number' || typeof weatherData.current?.weather_code !== 'number') throw new Error('Weather data incomplete');
        setWeather({ status: 'ready', temperature: Math.round(weatherData.current.temperature_2m), code: weatherData.current.weather_code, place: [place.name, place.admin1, place.country].filter(Boolean).join(', ') });
      } catch (error) {
        if (error.name !== 'AbortError') setWeather({ status: 'unavailable', temperature: null, code: null, place: '' });
      }
    };
    loadWeather();
    return () => controller.abort();
  }, [hotel.address, lang]);

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('gm24_categories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
        console.error('Ungültige gespeicherte Kategorien – Standardkategorien werden verwendet.');
      } catch (error) {
        console.error('Gespeicherte Kategorien konnten nicht gelesen werden – Standardkategorien werden verwendet.', error);
      }
    }
    return [
      { 
        id: '1', 
        presetId: 'wifi_internet', 
        categoryId: 'cat_hotel',
        icon: 'Wifi', 
        customTitle: '', 
        fieldValues: { wifi_available: true, network_name: 'Hotel-Guest-WiFi', wifi_password: 'welcome2026', coverage: 'Gesamtes Hotel' },
        customText: 'Bei Verbindungsproblemen wenden Sie sich bitte an die Rezeption.' 
      },
      { 
        id: '2', 
        presetId: 'cert_sustainability', 
        categoryId: 'cat_certificates',
        icon: 'Award', 
        customTitle: 'GreenKey Zertifikat', 
        fieldValues: { cert_name: 'Green Key 2026', cert_number: 'GK-2026-9876' },
        customText: 'Unser Hotel ist als nachhaltiger Betrieb ausgezeichnet.' 
      }
    ];
  });

  useEffect(() => {
    if (!guestSlug) {
      setGuestPageStatus('idle');
      return undefined;
    }
    if (!supabase) {
      setGuestPageStatus('error');
      return undefined;
    }
    let active = true;
    const loadGuestPage = async () => {
      setGuestPageStatus('loading');
      try {
        const { data, error } = await supabase
          .from('gm24_guest_pages')
          .select('slug, name, public_content')
          .eq('slug', guestSlug)
          .maybeSingle();
        if (error) throw error;
        if (!data || !data.public_content || typeof data.public_content !== 'object') {
          if (active) setGuestPageStatus('not_found');
          return;
        }
        if (!active) return;
        const content = data.public_content;
        if (content.hotel && typeof content.hotel === 'object') setHotel(content.hotel);
        else setHotel(previous => ({ ...previous, name: data.name || previous.name }));
        if (Array.isArray(content.categories)) setCategories(content.categories);
        setGuestPageStatus('ready');
        // Count every successfully opened guest guide view; no visitor identifiers are stored.
        supabase.functions.invoke('track-view', { body: { slug: guestSlug, page_key: 'guest_home' } }).catch(error => console.warn('Analytics tracking unavailable:', error));
      } catch (error) {
        console.error('Public guest page could not be loaded:', error);
        if (active) setGuestPageStatus('error');
      }
    };
    loadGuestPage();
    return () => { active = false; };
  }, [guestSlug]);

  const copyWifiLabels = {
    de:{copy:'Kopieren',copied:'Kopiert'},en:{copy:'Copy',copied:'Copied'},tr:{copy:'Kopyala',copied:'Kopyalandı'},fr:{copy:'Copier',copied:'Copié'},hr:{copy:'Kopiraj',copied:'Kopirano'},it:{copy:'Copia',copied:'Copiato'},es:{copy:'Copiar',copied:'Copiado'},sv:{copy:'Kopiera',copied:'Kopierat'},no:{copy:'Kopier',copied:'Kopiert'},sq:{copy:'Kopjo',copied:'U kopjua'}
  };
  const copyWifiLabel = copyWifiLabels[lang] || copyWifiLabels.de;
  const getQuickCardText = (cardId, field) => {
    const language = lang === 'nb' ? 'no' : lang === 'cs' ? 'en' : lang;
    const card = hotel.quickAccessContent?.[language]?.[cardId] || hotel.quickAccessContent?.de?.[cardId] || quickAccessDefaults.de[cardId];
    return card?.[field] || quickAccessDefaults.de[cardId][field];
  };
  const updateQuickCardText = (cardId, field, value) => setHotel(prev => ({
    ...prev, quickAccessContent: { ...(prev.quickAccessContent || quickAccessDefaults),
      [quickEditLang]: { ...(prev.quickAccessContent?.[quickEditLang] || quickAccessDefaults[quickEditLang]),
        [cardId]: { ...(prev.quickAccessContent?.[quickEditLang]?.[cardId] || quickAccessDefaults[quickEditLang][cardId]), [field]: value }
      }
    }
  }));
  const currentTheme = themeColors.find(tc => tc.id === hotel.themeColor) || themeColors[0];

  const handleSaveCategoryModal = (catData) => {
    setCategories(prev => {
      const exists = prev.find(c => c.id === catData.id);
      if (exists) {
        return prev.map(c => c.id === catData.id ? catData : c);
      }
      return [...prev, catData];
    });
  };

  const handleDeleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const selectAccommodation = (id) => {
    const selected = hotelRecords.find(item => item.id === id);
    if (!selected) return;
    setHotelRecord(selected);
    setSelectedHotelId(selected.id);
    const profile = selected.profile && typeof selected.profile === 'object' ? selected.profile : {};
    if (profile.hotel && typeof profile.hotel === 'object') setHotel(profile.hotel);
    else setHotel(previous => ({ ...previous, name: selected.name || 'Meine Unterkunft', address: '', phone: '', email: '', website: '', wifiSsid: '', wifiPass: '' }));
    setCategories(Array.isArray(profile.categories) ? profile.categories : []);
    setSelectedCategory(null);
    setIsEditorModalOpen(false);
  };

  const createAccommodation = async () => {
    if (!supabase || !authSession?.user?.id || !accountRecord) return;
    if (accountRecord.subscription_status === 'suspended' || (accountRecord.trial_ends_at && new Date(accountRecord.trial_ends_at).getTime() <= trialNow && accountRecord.subscription_status !== 'active')) return;
    const base = hotel || {};
    const newHotel = {
      ...base,
      name: 'Neue Unterkunft',
      logoUrl: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      googleReviewUrl: '',
      wifiSsid: '',
      wifiPass: '',
      images: []
    };
    setCloudDataStatus('saving');
    try {
      const slugBase = 'unterkunft-' + Math.random().toString(36).slice(2, 9);
      const { data: created, error } = await supabase
        .from('gm24_hotels')
        .insert({
          owner_id: authSession.user.id,
          slug: slugBase,
          name: newHotel.name,
          profile: { hotel: newHotel, categories: [] },
          public_content: {}
        })
        .select('id, slug, name, profile, public_content, created_at')
        .single();
      if (error) throw error;
      setHotelRecords(previous => [...previous, created]);
      setHotelRecord(created);
      setSelectedHotelId(created.id);
      setHotel(newHotel);
      setCategories([]);
      setSelectedCategory(null);
      setCloudDataStatus('ready');
      const { data: refreshedAccount } = await supabase
        .from('gm24_accounts')
        .select('owner_id, plan_code, subscription_status, trial_started_at, trial_ends_at, paid_until')
        .eq('owner_id', authSession.user.id)
        .maybeSingle();
      if (refreshedAccount) setAccountRecord(refreshedAccount);
    } catch (error) {
      console.error('Accommodation could not be created:', error);
      setCloudDataError(error?.message || 'Die Unterkunft konnte nicht erstellt werden.');
      setCloudDataStatus('error');
    }
  };

  const trialEndsAt = accountRecord?.trial_ends_at ? new Date(accountRecord.trial_ends_at).getTime() : null;
  const trialDaysLeft = trialEndsAt ? Math.max(0, Math.ceil((trialEndsAt - trialNow) / 86400000)) : null;
  const trialExpired = accountRecord?.subscription_status === 'suspended'
    || (accountRecord?.subscription_status === 'trial' && trialEndsAt !== null && trialEndsAt <= trialNow);

  const handleSaveData = async () => {
    localStorage.setItem('gm24_hotel', JSON.stringify(hotel));
    localStorage.setItem('gm24_categories', JSON.stringify(categories));

    if (!supabase || !authSession?.user?.id || !hotelRecord?.id) {
      setCloudDataError('Cloud-Speicherung ist noch nicht bereit. Bitte erneut anmelden oder die Verbindung prüfen.');
      setCloudDataStatus('error');
      return;
    }

    setCloudDataStatus('saving');
    setCloudDataError('');
    const profile = { hotel, categories };
    // Only the guest-facing editor data is published. Owner identity and auth data stay private.
    const publicContent = { hotel, categories };
    try {
      const { data, error } = await supabase
        .from('gm24_hotels')
        .update({
          name: hotel.name || 'Meine Unterkunft',
          profile,
          public_content: publicContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', hotelRecord.id)
        .select('id, slug, name, profile, public_content, created_at')
        .single();
      if (error) throw error;
      setHotelRecord(data);
      setHotelRecords(previous => previous.map(item => item.id === data.id ? data : item));
      setCloudDataStatus('ready');
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Cloud save failed; local copy remains available:', error);
      setCloudDataError(error?.message || 'Cloud-Speicherung fehlgeschlagen. Die lokale Kopie bleibt erhalten.');
      setCloudDataStatus('error');
    }
  };

  const copyWifiPassword = () => {
    if (!hotel.wifiPass) return;
    navigator.clipboard.writeText(hotel.wifiPass);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2500);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setHotel(prev => ({ ...prev, logoUrl: reader.result })); };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { 
        setHotel(prev => ({ ...prev, images: [...(prev.images || []), reader.result] })); 
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setHotel(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const groupedCategories = (categories || []).reduce((acc, cat) => {
    if (!cat) return acc;
    const normalizedCategoryId = (cat.categoryId === 'cat_sustainability' || cat.categoryId === 'cat_certificates') ? 'cat_safety' : cat.categoryId;
    const mainCatObj = mainCategories.find(mc => mc.id === normalizedCategoryId) || mainCategories[0];
    const groupName = mainCatObj.name[lang] || mainCatObj.name.de;
    if (!acc[groupName]) acc[groupName] = [];
    const presetData = categoryPresets.find(p => p.id === cat.presetId);
    acc[groupName].push({ ...cat, presetData, mainCatObj });
    return acc;
  }, {});

  const activeQuickCards = [
    hotel.showWifi && (
      <div key="wifi" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Wifi className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{getQuickCardText('wifi','title')}</span></div>
        <p className="text-[11px] text-slate-600">{getQuickCardText('wifi','description')}</p>
        <div className="text-[11px] text-slate-500 font-mono bg-stone-50 p-2 rounded-lg border">
          <div><b>{hotel.wifiSsid}</b></div>
          <div className="flex flex-col items-start mt-2 gap-2 min-w-0"><span className="block w-full min-w-0 whitespace-normal break-all leading-relaxed">{hotel.wifiPass}</span>
            <button type="button" onClick={copyWifiPassword} aria-label="Copy Wi-Fi password" title={copiedWifi ? copyWifiLabel.copied : copyWifiLabel.copy} className={`${currentTheme.bgLight} ${currentTheme.text} px-2 py-1.5 rounded-lg cursor-pointer inline-flex items-center gap-1 shrink-0`}>{copiedWifi ? <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-[10px]">{copyWifiLabel.copied}</span></> : <><Copy className="w-3.5 h-3.5" /><span className="text-[10px]">{copyWifiLabel.copy}</span></>}</button>
          </div>
        </div>
      </div>
    ),
    hotel.showParking && (
      <div key="parking" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Car className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{getQuickCardText('parking','title')}</span></div>
        <p className="text-[11px] text-slate-600">{getQuickCardText('parking','description')}</p>
      </div>
    ),
    hotel.showBreakfast && (
      <div key="breakfast" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Coffee className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{getQuickCardText('breakfast','title')}</span></div>
        <p className="text-[11px] text-slate-600">{getQuickCardText('breakfast','description')}</p>
      </div>
    ),
    hotel.showCheckInOut && (
      <div key="checkinout" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Clock className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{getQuickCardText('checkin','title')}</span></div>
        <p className="text-[11px] text-slate-600">{getQuickCardText('checkin','description')}</p>
      </div>
    )
  ].filter(Boolean);

  if (guestSlug && (guestPageStatus === 'loading' || guestPageStatus === 'idle')) {
    return <main className="min-h-screen bg-stone-50 flex items-center justify-center text-sm text-stone-500">Gästemappe wird geladen …</main>;
  }

  if (guestSlug && guestPageStatus !== 'ready') {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center p-5">
        <section className="max-w-md bg-white border border-stone-200 rounded-3xl p-7 text-center space-y-3">
          <h1 className="text-xl font-black text-slate-900">Gästemappe nicht verfügbar</h1>
          <p className="text-sm text-stone-500">Dieser Link ist ungültig oder die Unterkunft hat ihre Gästemappe noch nicht veröffentlicht.</p>
        </section>
      </main>
    );
  }

  if (appMode === 'dashboard' && !isSupabaseConfigured) {
    return (
      <main className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4">
        <section className="max-w-xl bg-white border border-stone-200 rounded-3xl p-7 space-y-3">
          <h1 className="text-xl font-black text-slate-900">Supabase-Verbindung noch nicht konfiguriert</h1>
          <p className="text-sm text-stone-600">Für den geschützten Dashboard-Zugang müssen in Vercel die Umgebungsvariablen VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY hinterlegt werden. Danach bitte ein neues Deployment starten.</p>
          <button onClick={() => { setAppMode('guest'); setShowWelcomeScreen(false); }} className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-bold text-white">Zur Gastansicht</button>
        </section>
      </main>
    );
  }

  if (appMode === 'dashboard' && authLoading) {
    return <main className="min-h-screen bg-[#FBF9F5] flex items-center justify-center text-sm text-stone-500">Anmeldestatus wird geprüft …</main>;
  }

  if (appMode === 'dashboard' && !authSession?.user) {
    return <AuthGate supabase={supabase} />;
  }

  if (appMode === 'dashboard' && accountRecord && trialExpired) {
    return (
      <main className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4">
        <section className="w-full max-w-xl bg-white border border-amber-200 rounded-3xl p-7 space-y-4 shadow-sm">
          <div className="text-xs font-black uppercase tracking-wider text-amber-700">Gastemappe24 Pro · Konto</div>
          <h1 className="text-2xl font-black text-slate-900">Deine Testphase ist beendet</h1>
          <p className="text-sm text-stone-600">Deine 30-tägige Testphase ist abgelaufen. Dein Zugang ist vorübergehend gesperrt. Deine Unterkünfte und Inhalte bleiben gespeichert und werden nicht gelöscht.</p>
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 text-sm">
            <div className="flex justify-between gap-3"><span className="text-stone-500">Aktuelles Paket</span><strong>{accountRecord.plan_code || 'Trial'}</strong></div>
            <div className="flex justify-between gap-3 mt-2"><span className="text-stone-500">Status</span><strong className="text-amber-700">Zugang pausiert</strong></div>
          </div>
          <p className="text-xs text-stone-500">Bitte kontaktiere den Anbieter, um dein Paket zu aktivieren.</p>
          <button onClick={async () => { await supabase.auth.signOut(); setAppMode('guest'); }} className="rounded-xl bg-stone-900 text-white px-4 py-2.5 text-xs font-bold">Abmelden</button>
        </section>
      </main>
    );
  }

  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen w-full max-w-full overflow-x-hidden box-border bg-[#FBF9F5] font-sans text-slate-800 p-3 sm:p-6 md:p-10 space-y-6 sm:space-y-8 relative pb-28">
        
        <CompactPresetEditorModal
          isOpen={isEditorModalOpen}
          onClose={() => { setIsEditorModalOpen(false); setEditingCategory(null); }}
          onSave={handleSaveCategoryModal}
          currentTheme={currentTheme}
          lang={lang}
          t={t}
          editingCategory={editingCategory}
        />

        {/* DASHBOARD HEADER */}
        <div className="w-full max-w-5xl mx-auto min-w-0 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-5 sm:pb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className={`${currentTheme.bg} text-white font-black px-3 py-1.5 rounded-xl text-sm`}>G</span>
            <span className="font-extrabold text-lg tracking-tight">gastemappe24 <span className={`${currentTheme.text} text-xs uppercase px-1.5 py-0.5 ${currentTheme.bgLight} rounded-md`}>PRO</span></span>
          </div>
          <div className="w-full sm:w-auto flex flex-wrap items-center gap-2 sm:gap-3">
            <select aria-label="Dashboard language" value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white border border-stone-200 text-xs rounded-xl px-2.5 py-2 cursor-pointer">
              <option value="de">🇩🇪 DE</option><option value="en">🇬🇧 EN</option><option value="tr">🇹🇷 TR</option><option value="fr">🇫🇷 FR</option><option value="es">🇪🇸 ES</option><option value="cs">🇨🇿 CS</option><option value="sq">🇦🇱 SQ</option><option value="sv">🇸🇪 SV</option><option value="nb">🇳🇴 NB</option><option value="it">🇮🇹 IT</option>
            </select>
            <button onClick={handleSaveData} disabled={trialExpired} className="bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-800 transition cursor-pointer flex items-center gap-2 shadow-md disabled:opacity-40 disabled:cursor-not-allowed">
              <Save className="w-4 h-4" /> {isSaved ? t.savedMsg : t.saveBtn}
            </button>
            <button onClick={() => { setAppMode('guest'); setShowWelcomeScreen(false); }} className="bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition cursor-pointer">
              {t.guestViewBtn}
            </button>
            <button onClick={async () => { await supabase.auth.signOut(); setAppMode('guest'); setShowWelcomeScreen(true); }} className="border border-stone-200 text-stone-600 px-3 py-2 rounded-xl text-xs font-bold hover:bg-stone-50 transition cursor-pointer inline-flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" /> Abmelden
            </button>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto rounded-2xl border border-stone-200 bg-white p-4 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1" htmlFor="gm24-accommodation-select">Meine Unterkünfte</label>
              <select id="gm24-accommodation-select" value={selectedHotelId} onChange={event => selectAccommodation(event.target.value)} className="w-full sm:max-w-sm rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm font-semibold">
                {hotelRecords.map(item => <option key={item.id} value={item.id}>{item.name || 'Unbenannte Unterkunft'}</option>)}
              </select>
            </div>
            <button onClick={createAccommodation} disabled={trialExpired || !accountRecord} className="rounded-xl bg-stone-900 text-white px-4 py-2.5 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed">+ Unterkunft hinzufügen</button>
          </div>
          <div className="rounded-xl bg-stone-50 border border-stone-100 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-xs">
              <span className="font-bold text-stone-700">Cloud-Speicher: </span>
              <span className={cloudDataStatus === 'ready' ? 'text-emerald-700' : cloudDataStatus === 'error' ? 'text-red-700' : 'text-stone-500'}>
                {cloudDataStatus === 'ready' ? 'Verbunden' : cloudDataStatus === 'loading' || cloudDataStatus === 'saving' ? 'Wird geladen …' : cloudDataStatus === 'error' ? 'Prüfung erforderlich' : 'Nicht verbunden'}
              </span>
              {hotelRecord?.slug && <span className="ml-3 text-stone-400">Hotel-ID: {hotelRecord.slug}</span>}
            </div>
            {cloudDataError && <p role="alert" className="text-[11px] text-red-700">{cloudDataError}</p>}
          </div>
        </div>

        <div className={`w-full max-w-5xl mx-auto rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${trialDaysLeft !== null && trialDaysLeft <= 7 ? 'border-amber-300 bg-amber-50' : 'border-stone-200 bg-white'}`}>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-stone-500">Dein Paket · 30 Tage kostenlos testen</div>
            <div className="text-sm font-bold text-slate-900 mt-1">{accountRecord?.plan_code === 'trial' ? 'Kostenlose Testphase' : (accountRecord?.plan_code || 'Paket')}</div>
            <div className="text-[11px] text-stone-500 mt-1">{accountRecord?.trial_started_at ? `Gestartet am ${new Date(accountRecord.trial_started_at).toLocaleDateString('de-DE')}` : 'Startet mit deiner ersten Unterkunft.'}</div>
          </div>
          <div className="sm:text-right">
            {trialDaysLeft !== null ? <div className="text-2xl font-black tabular-nums text-slate-900">{trialDaysLeft} <span className="text-xs font-bold text-stone-500">Tage übrig</span></div> : <div className="text-sm font-bold text-stone-500">Noch nicht gestartet</div>}
            {trialDaysLeft !== null && trialDaysLeft <= 7 && trialDaysLeft > 0 && <p className="text-[11px] font-semibold text-amber-800 mt-1">Deine Testphase endet bald. Bitte wähle rechtzeitig ein Paket.</p>}
            {trialDaysLeft !== null && trialDaysLeft > 7 && <p className="text-[11px] text-stone-500 mt-1">Endet am {new Date(accountRecord.trial_ends_at).toLocaleDateString('de-DE')}</p>}
          </div>
        </div>
        {/* REAL ANALYTICS STATUS — do not display invented figures */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-3"><div className="p-3 rounded-2xl bg-stone-100 text-stone-500"><BarChart3 className="w-6 h-6"/></div><div><span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">Seitenaufrufe</span><h4 className="text-lg font-black text-slate-900">{analyticsLoading ? '…' : analyticsRows.reduce((sum, row) => sum + Number(row.views || 0), 0)}</h4></div></div>
            <p className="text-[11px] text-stone-500 mt-3">Jeder erfolgreiche Aufruf der Gästemappe zählt einzeln.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-3"><div className="p-3 rounded-2xl bg-stone-100 text-stone-500"><Users className="w-6 h-6"/></div><div><span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">{(dashboardCopy[lang] || dashboardCopy.de).configuredContent}</span><h4 className="text-lg font-black text-slate-900">{categories.length || '—'}</h4></div></div>
            <p className="text-[11px] text-stone-500 mt-3">{(dashboardCopy[lang] || dashboardCopy.de).contentNote}</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-3"><div className="p-3 rounded-2xl bg-stone-100 text-stone-500"><Activity className="w-6 h-6"/></div><div><span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">{(dashboardCopy[lang] || dashboardCopy.de).dataStatus}</span><h4 className="text-lg font-black text-slate-900">{analyticsLoading ? 'Wird geladen …' : 'Cloud-Statistik aktiv'}</h4></div></div>
            <p className="text-[11px] text-stone-500 mt-3">Besucheraufrufe werden anonym und zentral gezählt.</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3"><div className="p-3 rounded-2xl bg-stone-100 text-stone-500"><TrendingUp className="w-6 h-6"/></div><div><h3 className="font-black text-xs text-slate-800 uppercase tracking-wider">{(dashboardCopy[lang] || dashboardCopy.de).analyticsTitle}</h3><p className="text-xs text-stone-500">{(dashboardCopy[lang] || dashboardCopy.de).analyticsIntro}</p></div></div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 space-y-3">
            <div className="flex items-center justify-between gap-3"><span className="text-sm font-bold text-slate-800">Gesamtaufrufe</span><span className="text-2xl font-black text-slate-900 tabular-nums">{analyticsLoading ? '…' : analyticsRows.reduce((sum, row) => sum + Number(row.views || 0), 0)}</span></div>
            <div className="space-y-2">
              {analyticsRows.slice(0, 7).map(row => <div key={row.event_date + row.page_key} className="flex items-center justify-between text-xs text-stone-600"><span>{new Date(row.event_date + 'T00:00:00').toLocaleDateString(lang === 'tr' ? 'tr-TR' : lang === 'de' ? 'de-DE' : 'en-GB')} · {row.page_key === 'guest_home' ? 'Gästemappe' : row.page_key}</span><strong className="text-slate-900 tabular-nums">{Number(row.views || 0)}</strong></div>)}
              {!analyticsLoading && analyticsRows.length === 0 && <p className="text-xs text-stone-500">Noch keine Aufrufe erfasst. Öffne die Gästemappe einmal über den QR-Link.</p>}
            </div>
            <p className="text-[10px] text-stone-400">Anonyme Summenwerte. Jeder Seitenaufruf wird gezählt; keine IP-Adressen oder persönlichen Besucherprofile.</p>
          </div>
        </div>

        {/* DASHBOARD CONTENT SECTIONS */}
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.adminTitle}</h1>

          {/* 1. HOTEL BİLGİLERİ */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec1Title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {key:'name',label:'Hotelname / Unterkunftsname',type:'text'},
                {key:'phone',label:'Telefon',type:'tel'},
                {key:'email',label:'E-Mail',type:'email'},
                {key:'website',label:'Website',type:'url'},
                {key:'address',label:'Vollständige Adresse',type:'text',autocomplete:true},
                {key:'reviewPlatform',label:'Bewertungsplattform',type:'select'},
                {key:'googleReviewUrl',label:hotel.reviewPlatform==='airbnb'?'Airbnb-Link (optional)':hotel.reviewPlatform==='booking'?'Booking.com-Bewertungslink':hotel.reviewPlatform==='tripadvisor'?'Tripadvisor-Bewertungslink':hotel.reviewPlatform==='custom'?'Bewertungslink':'Google-Bewertungslink',type:'url'},
                {key:'locationTitle',label:'Region / Standort',type:'text'}
              ].map(field=><div key={field.key} className="relative"><label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{field.label}</label>{field.key==='reviewPlatform' ? <select value={hotel.reviewPlatform || 'google'} onChange={e=>setHotel(prev=>({...prev,reviewPlatform:e.target.value}))} className="w-full p-3 text-sm border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"><option value="google">Google</option><option value="airbnb">Airbnb</option><option value="booking">Booking.com</option><option value="tripadvisor">Tripadvisor</option><option value="custom">Andere Plattform</option></select> : field.autocomplete ? <AddressAutocomplete value={hotel[field.key] || ''} onChange={value => setHotel(prev => ({ ...prev, [field.key]: value }))} className="w-full p-3 text-sm border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200" /> : <input type={field.type} value={hotel[field.key]||''} onChange={e=>setHotel(prev=>({...prev,[field.key]:e.target.value}))} className="w-full p-3 text-sm border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"/>}{field.key==='reviewPlatform' && <p className="mt-1 text-[10px] text-stone-400">Airbnb: Gäste können ihre Unterkunft nur über eine tatsächliche Airbnb-Buchung bewerten. Ein allgemeiner Link führt zum Airbnb-Reisebereich.</p>}{field.autocomplete && <p className="mt-1 text-[10px] text-stone-400">Tipp: Adresse möglichst mit Straße, PLZ und Ort eingeben. Die Wetterfunktion nutzt bei Bedarf den Region-/Standort-Eintrag.</p>}</div>)}
            </div>
            <p className="text-[11px] text-stone-500">Diese Angaben werden in der Gästemappe verwendet. Änderungen bitte oben rechts speichern.</p>
            <div className="border-t border-stone-100 pt-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><h4 className="text-xs font-black uppercase tracking-wider text-stone-700">Schnellzugriff · Preset-Editor</h4><p className="text-[11px] text-stone-500 mt-1">Kartentexte je Sprache bearbeiten. WLAN-Zugangsdaten gelten für alle Sprachen.</p></div>
                <select aria-label="Sprache der Schnellzugriff-Presets" value={quickEditLang} onChange={e => setQuickEditLang(e.target.value)} className="bg-white border border-stone-200 text-xs rounded-xl px-3 py-2">
                  <option value="de">🇩🇪 Deutsch</option><option value="en">🇬🇧 English</option><option value="tr">🇹🇷 Türkçe</option><option value="fr">🇫🇷 Français</option><option value="hr">🇭🇷 Hrvatski</option><option value="it">🇮🇹 Italiano</option><option value="es">🇪🇸 Español</option><option value="sv">🇸🇪 Svenska</option><option value="no">🇳🇴 Norsk</option><option value="sq">🇦🇱 Shqip</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[{id:'wifi',enabled:'showWifi',label:'WLAN'},{id:'parking',enabled:'showParking',label:'Parkplatz'},{id:'breakfast',enabled:'showBreakfast',label:'Frühstück'},{id:'checkin',enabled:'showCheckInOut',label:'Check-in / Check-out'}].map(card => (
                  <div key={card.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3 space-y-3">
                    <div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-slate-800">{card.label}</span><label className="flex items-center gap-2 text-[11px] font-semibold text-stone-600 cursor-pointer"><input type="checkbox" checked={hotel[card.enabled] !== false} onChange={e => setHotel(prev => ({...prev,[card.enabled]:e.target.checked}))} className="accent-emerald-700 w-4 h-4" />Anzeigen</label></div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500">Titel<input value={hotel.quickAccessContent?.[quickEditLang]?.[card.id]?.title ?? quickAccessDefaults[quickEditLang][card.id].title} onChange={e => updateQuickCardText(card.id,'title',e.target.value)} className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs" /></label>
                    <label className="block text-[10px] font-bold uppercase text-stone-500">Beschreibung<textarea rows="2" value={hotel.quickAccessContent?.[quickEditLang]?.[card.id]?.description ?? quickAccessDefaults[quickEditLang][card.id].description} onChange={e => updateQuickCardText(card.id,'description',e.target.value)} className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs resize-y" /></label>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-3 space-y-3"><div className="text-xs font-bold text-slate-800">WLAN-Zugangsdaten · für alle Sprachen</div><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block text-[10px] font-bold uppercase text-stone-500">Netzwerkname (SSID)<input value={hotel.wifiSsid || ''} onChange={e => setHotel(prev => ({...prev,wifiSsid:e.target.value}))} className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs" /></label>
                <label className="block text-[10px] font-bold uppercase text-stone-500">WLAN-Passwort<input value={hotel.wifiPass || ''} onChange={e => setHotel(prev => ({...prev,wifiPass:e.target.value}))} className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs" /></label>
              </div></div>
            </div>
          </div>

          {/* 2. TEMA RENKLERİ */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec2Title}</h3>
            <div className="flex flex-wrap gap-2.5">
              {themeColors.map(tc => (
                <button
                  key={tc.id}
                  onClick={() => setHotel({ ...hotel, themeColor: tc.id })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-2 ${hotel.themeColor === tc.id ? `${tc.bg} text-white border-transparent shadow` : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  <span className={`w-3 h-3 rounded-full ${tc.bg}`}></span>
                  {tc.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3. LOGO YÜKLEME */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec3Title}</h3>
            <div className="flex items-center gap-4">
              {hotel.logoUrl ? (
                <img src={hotel.logoUrl} alt="Logo" className="w-12 h-12 rounded-xl object-cover border shadow-xs" />
              ) : (
                <div className={`w-12 h-12 rounded-xl ${currentTheme.bgLight} ${currentTheme.text} flex items-center justify-center font-black`}>LOGO</div>
              )}
              <label className={`px-4 py-2.5 rounded-xl text-xs font-bold text-white ${currentTheme.bg} cursor-pointer shadow hover:opacity-95`}>
                <Upload className="w-4 h-4 inline mr-1.5" /> Logo Seç / Yükle
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* 4. SLIDER FOTOĞRAF YÖNETİMİ */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec4Title}</h3>
              <label className={`px-4 py-2 rounded-xl text-xs font-bold text-white ${currentTheme.bg} cursor-pointer shadow hover:opacity-95 flex items-center gap-1.5`}>
                <Plus className="w-4 h-4" /> Fotoğraf Ekle
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(Array.isArray(hotel.images) ? hotel.images : []).map((img, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border aspect-video group shadow-xs bg-stone-100">
                  <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeImage(idx)} 
                    className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition shadow cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 5. QR-CODE & PRINT CENTER (YAZDIRMA MERKEZİ) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${currentTheme.bgLight} ${currentTheme.text}`}><QrCode className="w-6 h-6" /></div>
              <div>
                <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec5Title}</h3>
                <p className="text-xs text-stone-500">{t.qrTitle}</p>
              </div>
            </div>
            <style>{`@page { size: ${qrPrintFormat==='a4'?'A4 portrait':qrPrintFormat==='a5'?'A5 portrait':'150mm 100mm'};margin:0 } @media print { html,body{margin:0!important;padding:0!important;width:100%!important;height:100%!important} body *{visibility:hidden!important} #qr-print-area,#qr-print-area *{visibility:visible!important} #qr-print-area{display:block!important;position:fixed!important;inset:0;width:100%;height:100%;background:#f4f1e9!important} #qr-print-area .qr-sheet{box-sizing:border-box;width:100%;height:100%;padding:10mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:Arial,sans-serif;color:#172b3a} #qr-print-area .qr-frame{width:fit-content;max-width:100%;padding:9mm;border:1px solid #e7e1d5;border-radius:8mm;background:#fff;display:flex;flex-direction:column;align-items:center;gap:3mm} #qr-print-area .qr-frame img{width:14mm;height:14mm;object-fit:cover;border-radius:50%} #qr-print-area .qr-frame>div{font-size:9pt;letter-spacing:3pt;color:#a47b3b;font-weight:bold} #qr-print-area h1{font-size:26pt;font-weight:800;margin:0} #qr-print-area p{margin:0;color:#697783} #qr-print-area svg{width:${qrPrintFormat==='a4'?'76mm':qrPrintFormat==='a5'?'62mm':'34mm'}!important;height:auto!important} #qr-print-area strong{font-size:14pt} #qr-print-area span,#qr-print-area footer{font-size:8pt;color:#77828b;letter-spacing:1pt} }`}</style>
            <div className="grid grid-cols-1 lg:grid-cols-[.9fr_1.1fr] gap-6 items-center pt-2">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">{[['a4','A4'],['a5','A5'],['card','Karte']].map(([v,l])=><button key={v} onClick={()=>setQrPrintFormat(v)} className={`px-4 py-2 rounded-xl text-xs font-bold border ${qrPrintFormat===v?'bg-slate-900 text-white border-slate-900':'bg-white text-slate-600 border-stone-200'}`}>{l}</button>)}</div>
                <div className="rounded-2xl bg-slate-900 text-white p-5"><span className="text-[10px] uppercase tracking-[.24em] text-amber-300 font-bold">Gastemappe24 Pro</span><h4 className="text-lg font-black mt-2">Ein QR-Code. Alles für Ihre Gäste.</h4><p className="text-xs text-slate-300 mt-2">Scannen und direkt die digitale Gästemappe öffnen – ohne App und ohne Anmeldung.</p></div>
                <div className="flex flex-wrap gap-2"><button onClick={()=>window.print()} className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2"><Printer className="w-4 h-4"/>Drucken</button>
                  <button onClick={async()=>{try{const el=document.querySelector('#qr-print-area svg');if(!el)throw Error('QR fehlt');await createQrPdf({svg:new XMLSerializer().serializeToString(el),hotelName:hotel.name,logoUrl:hotel.logoUrl,format:qrPrintFormat})}catch(e){console.error(e);alert('PDF konnte nicht erstellt werden. Bitte erneut versuchen.')}}} className="px-4 py-2.5 rounded-xl border border-emerald-700 text-emerald-800 bg-emerald-50 text-xs font-bold flex items-center gap-2"><Save className="w-4 h-4"/>PDF herunterladen</button>
                  <button onClick={()=>navigator.clipboard?.writeText(guestPageUrl)} className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs font-bold flex items-center gap-2"><Copy className="w-4 h-4"/>Link kopieren</button></div>
                <p className="text-[10px] text-stone-400 break-all">{guestPageUrl}</p><p className="text-[10px] text-emerald-700 font-semibold">Kostenlos · Keine externe API · Keine laufenden Zusatzkosten</p>
              </div>
              <div className="rounded-[28px] bg-[#f4f1e9] p-4 sm:p-7 border border-stone-200"><div className="mx-auto max-w-[390px] bg-white rounded-[24px] overflow-hidden shadow-xl border border-stone-200"><div className="h-2 bg-[#172b3a]"/><div className="px-6 py-7 text-center">
                {hotel.logoUrl?<img src={hotel.logoUrl} alt="Hotel Logo" className="w-12 h-12 rounded-full object-cover mx-auto mb-4 border"/>:<div className="w-12 h-12 rounded-full bg-[#172b3a] text-amber-300 mx-auto mb-4 flex items-center justify-center font-black text-lg">{(hotel.name||'H').slice(0,1).toUpperCase()}</div>}
                <p className="text-[9px] font-black tracking-[.28em] text-amber-700 uppercase mb-2">Willkommen</p><h4 className="text-2xl font-black tracking-tight text-slate-900">{hotel.name||'Ihre Unterkunft'}</h4><p className="text-xs text-stone-500 mt-1">Ihre digitale Gästemappe</p>
                <div className="my-5 inline-flex p-3 rounded-2xl border border-stone-100"><QRCodeSVG value={guestPageUrl||'https://example.com'} size={qrPrintFormat==='card'?130:190} level="H" includeMargin/></div><p className="text-sm font-extrabold text-slate-900">Scannen & entdecken</p><p className="text-[10px] text-stone-500 mt-1">WLAN · Services · Informationen · Umgebung</p>
              </div><div className="bg-[#172b3a] text-white text-center py-3 text-[9px] font-bold tracking-[.2em]">GASTEMAPPE24 PRO</div></div><p className="text-center text-[10px] text-stone-500 mt-3">Live-Vorschau · {qrPrintFormat.toUpperCase()}</p></div>
            </div>
            <div id="qr-print-area" className="hidden"><div className="qr-sheet"><div className="qr-frame">{hotel.logoUrl&&<img src={hotel.logoUrl} alt="Logo"/>}<div>WILLKOMMEN</div><h1>{hotel.name||'Ihre Unterkunft'}</h1><p>Ihre digitale Gästemappe</p><QRCodeSVG value={guestPageUrl||'https://example.com'} size={320} level="H" includeMargin/><strong>Scannen & entdecken</strong><span>WLAN · Services · Informationen · Umgebung</span></div><footer>GASTEMAPPE24 PRO</footer></div></div>
          </div>

          {/* 6. DİNAMİK PRESET KATEGORİLER (3-ADIMLI MODAL SİSTEMİ) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec6Title}</h3>
              <button
                onClick={() => { setEditingCategory(null); setIsEditorModalOpen(true); }}
                className={`${currentTheme.bg} text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow hover:opacity-95 transition cursor-pointer flex items-center gap-2`}
              >
                <Plus className="w-4 h-4" /> {t.btnAddCategory}
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(groupedCategories).map(([groupName, groupItems]) => (
                <div key={groupName} className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider block">{groupName}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {groupItems.map(cat => {
                      const presetObj = cat.presetData;
                      const title = cat.customTitle || (presetObj && presetObj.title && (presetObj.title[lang] || presetObj.title.de)) || 'Kategorie';
                      
                      return (
                        <div key={cat.id} className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 flex items-center justify-between shadow-xs">
                          <div className="flex items-center gap-3 truncate">
                            <div className={`p-2 rounded-xl ${currentTheme.bgLight}`}>
                              {renderSafeIconByName(cat.icon, currentTheme)}
                            </div>
                            <span className="text-xs font-bold text-slate-900 truncate">{title}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => { setEditingCategory(cat); setIsEditorModalOpen(true); }}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-slate-900 hover:bg-stone-200/60 transition cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
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
    );
  }

  if (showWelcomeScreen) {
    return (
      <div className="h-[100dvh] min-h-[320px] bg-slate-950 max-w-md mx-auto shadow-2xl relative overflow-hidden flex flex-col justify-between font-sans">
        <div className="absolute inset-0 z-0">
          <img src={(hotel.images && hotel.images[0]) || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'} alt="Welcome" className="w-full h-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
        </div>

        <div className="relative z-10 p-6 flex justify-between items-center text-white">
          <span className="text-xs font-bold uppercase">{hotel.name}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-black/40 border border-white/30 text-white text-xs rounded-xl px-2.5 py-1.5 cursor-pointer">
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
            <option value="tr">🇹🇷 TR</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="cs">🇨🇿 CS</option>
            <option value="sq">🇦🇱 SQ</option>
            <option value="sv">🇸🇪 SV</option>
            <option value="nb">🇳🇴 NB</option>
            <option value="it">🇮🇹 IT</option>
          </select>
        </div>

        <div className="relative z-10 px-6 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] space-y-4 text-white shrink-0">
          <h1 className="text-3xl font-black">{hotel.name}</h1>
          <button onClick={() => setShowWelcomeScreen(false)} className={`w-full ${currentTheme.bg} text-white py-4 rounded-2xl font-bold text-sm shadow-2xl flex items-center justify-center gap-2 cursor-pointer`}>
            <span>{t.welcomeButton}</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-32 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      <header className="p-5 pt-6 pb-2 bg-stone-50 sticky top-0 z-40 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {hotel.logoUrl ? (
            <img src={hotel.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover border" />
          ) : (
            <div className={`w-8 h-8 rounded-lg ${currentTheme.bg} text-white flex items-center justify-center text-xs font-black`}>B</div>
          )}
          <span className="text-xs font-bold tracking-wider uppercase text-slate-800">{hotel.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white border text-xs font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer">
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
            <option value="tr">🇹🇷 TR</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="cs">🇨🇿 CS</option>
            <option value="sq">🇦🇱 SQ</option>
            <option value="sv">🇸🇪 SV</option>
            <option value="nb">🇳🇴 NB</option>
            <option value="it">🇮🇹 IT</option>
          </select>
          <button onClick={() => setAppMode('dashboard')} className="text-stone-300 hover:text-stone-600 p-1 text-xs cursor-pointer">🔑</button>
        </div>
      </header>

      <main className="p-5 space-y-5">
        {selectedCategory ? (
          <div className="space-y-4 animate-fade-in">
            <button onClick={() => setSelectedCategory(null)} className={`text-xs font-bold ${currentTheme.text} cursor-pointer flex items-center gap-1`}>&larr; {t.detailBack}</button>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-3xl shadow-md border border-stone-200 flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl ${currentTheme.bgLight} flex items-center justify-center shadow-xs`}>
                  {renderSafeIconByName(selectedCategory.icon, currentTheme)}
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900 leading-tight">{selectedCategory.title}</h2>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${currentTheme.text}`}>{selectedCategory.groupName}</span>
                </div>
              </div>

              <GuestCategoryDisplay 
                category={selectedCategory} 
                currentTheme={currentTheme} 
                lang={lang} 
                t={t}
              />
            </div>
          </div>
        ) : (
          activeTab === 'home' ? (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-0.5 pt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 block">{hotel.locationTitle}</span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">{t.greetingHello}<br /><span className={currentTheme.text}>{t.greetingWelcome}</span></h1>
              </div>

              {/* SLİDER ALANI */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg h-56 bg-slate-900 border border-stone-200">
                <img src={(hotel.images && hotel.images[currentSlide]) || (hotel.images && hotel.images[0]) || ''} alt="Slide" className="w-full h-full object-cover" />
              </div>

              {/* LIVE HOTEL WEATHER — Open-Meteo, based on the saved hotel address */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-3 ${currentTheme.bgLight} rounded-xl ${currentTheme.text}`}><Sun className="w-6 h-6" /></div>
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-slate-900 uppercase">{(weatherLabels[lang] || weatherLabels.de).loading && weather.status === 'loading' ? (weatherLabels[lang] || weatherLabels.de).loading : weather.status === 'ready' ? getWeatherDescription(weather.code, weatherLabels[lang] || weatherLabels.de) : weather.status === 'missing' ? (weatherLabels[lang] || weatherLabels.de).missing : (weatherLabels[lang] || weatherLabels.de).unavailable}</div>
                    <div className="text-[11px] text-stone-500 truncate">{weather.status === 'ready' ? weather.place : weather.status === 'loading' ? (weatherLabels[lang] || weatherLabels.de).loading : weather.status === 'missing' ? (weatherLabels[lang] || weatherLabels.de).missing : (weatherLabels[lang] || weatherLabels.de).unavailable}</div>
                  </div>
                </div>
                <div className="text-right shrink-0"><div className="text-2xl font-black text-slate-900">{weather.status === 'ready' ? `${weather.temperature}°C` : '—'}</div></div>
              </div>

              {/* HIZLI ERİŞİM KARTLARI */}
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
                  <h4 className={`text-xs font-black ${currentTheme.text} uppercase tracking-wider px-1`}>{groupName}</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {(groupItems || []).map((cat) => {
                      const presetObj = cat.presetData;
                      const title = cat.customTitle || (presetObj && presetObj.title && (presetObj.title[lang] || presetObj.title.de)) || 'Kategorie';
                      
                      return (
                        <button key={cat.id} onClick={() => setSelectedCategory({ ...cat, title, groupName })} className={`w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between text-left cursor-pointer hover:${currentTheme.border} transition`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${currentTheme.bgLight} flex items-center justify-center`}>
                              {renderSafeIconByName(cat.icon, currentTheme)}
                            </div>
                            <div>
                              <h5 className="text-sm font-extrabold text-slate-900">{title}</h5>
                              <p className="text-[10px] text-stone-400">{groupName}</p>
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

      {/* ALT NAVİGASYON ÇUBUĞU */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t z-50 shadow-2xl">
        <nav className="px-3 py-2 flex justify-around items-center">
          <button onClick={() => { setActiveTab('home'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'home' && !selectedCategory ? currentTheme.text : 'text-stone-400'}`}>
            <Info className="w-5 h-5" /><span>{t.navHome}</span>
          </button>
          <button onClick={() => { setActiveTab('services'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'services' || selectedCategory ? currentTheme.text : 'text-stone-400'}`}>
            <Compass className="w-5 h-5" /><span>{t.navGaestemappe}</span>
          </button>
          {((hotel.googleReviewUrl && /^https?:\/\//i.test(hotel.googleReviewUrl)) || hotel.reviewPlatform==='airbnb') && (
            <a href={hotel.googleReviewUrl && /^https?:\/\//i.test(hotel.googleReviewUrl) ? hotel.googleReviewUrl : 'https://www.airbnb.com/trips/v1'} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}>
              <Star className="w-5 h-5 fill-current" /><span>{t.navReview}</span>
            </a>
          )}
          {hotel.address && !/Musterstraße 1|12345 Musterstadt/i.test(hotel.address) ? (
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}>
              <Navigation className="w-5 h-5" /><span>{t.navRoute}</span>
            </a>
          ) : (
            <span aria-disabled="true" title="Hoteladresse im Hotelprofil hinterlegen" className="flex flex-col items-center gap-1 text-[10px] font-bold text-stone-300 cursor-not-allowed">
              <Navigation className="w-5 h-5" /><span>{t.navRoute}</span>
            </span>
          )}
        </nav>
      </div>
    </div>
  );
}