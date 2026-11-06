import React, { useState, useEffect } from 'react';
import { hotelPresets } from './hotelPresets.js';
import { createClient } from '@supabase/supabase-js';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Scroll, Save, Eye, EyeOff, Palette, TrendingUp, Users, Activity, HelpCircle,
  Flame, Accessibility, Recycle, Award, Scissors, ShoppingCart, Stethoscope, Baby, Music, Smile, CheckCircle2, XCircle, Zap, Search, ChevronDown, ChevronUp, X
} from 'lucide-react';

const supabaseUrl = 'https://YOUR-SUPABASE-URL.supabase.co';
const supabaseAnonKey = 'YOUR-SUPABASE-ANON-KEY';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- 10 DİL ÇEVİRİ SİSTEMİ ---
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
  { id: 'room_info', categoryId: 'cat_hotel', icon: 'Bed', title: { de: 'Zimmerinformationen', en: 'Room Information', tr: 'Oda Bilgileri', fr: 'Informations chambre', hr: 'Informacije o sobi' }, schema: [
    { key: 'room_features', type: 'multiselect', label: { de: 'Zimmerausstattung', en: 'Room Features', tr: 'Oda Özellikleri', fr: 'Équipements', hr: 'Sadržaj sobe' }, options: ['Safe', 'Klimaanlage', 'Flachbild-TV', 'Haartrockner', 'Kaffeemaschine'], default: ['Safe', 'Klimaanlage', 'Flachbild-TV'], primary: true },
    { key: 'balcony_status', type: 'boolean', label: { de: 'Balkon / Terrasse', en: 'Balcony / Terrace', tr: 'Balkon / Teras', fr: 'Balcon / Terrasse', hr: 'Balkon / Terasa' }, default: false, primary: true }
  ]},
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

const categoryPresets = [...legacyCategoryPresets, ...hotelPresets];
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
const getFieldOptions=f=>[...(f.options||[]).filter(o=>optionId(o)!==OTHER_CUSTOM),{id:OTHER_CUSTOM,label:customTextLabels}];
const PresetFieldEditor=({field,value,fieldValues,onChange,onCustomTextChange,lang})=>{
const val=value!==undefined?value:field.default,options=getFieldOptions(field),customKey=field.key+'__customText',customValue=fieldValues[customKey]||'';
const selected=field.type==='multiselect'?(Array.isArray(val)&&val.includes(OTHER_CUSTOM)):val===OTHER_CUSTOM;
const label=(field.label&&(field.label[lang]||field.label.de))||field.key;
const toggle=(id,checked)=>{const current=Array.isArray(val)?val:[];onChange(checked?[...current.filter(x=>x!==id),id]:current.filter(x=>x!==id));};
return <div className="space-y-1.5"><label className="block text-[10px] font-extrabold text-stone-500 uppercase">{label}</label>
{field.type==='boolean'?<input type="checkbox" checked={!!val} onChange={e=>onChange(e.target.checked)}/>:
field.type==='select'?<select value={val||''} onChange={e=>onChange(e.target.value)} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white">{options.map(o=><option key={optionId(o)} value={optionId(o)}>{optionLabel(o,lang)}</option>)}</select>:
field.type==='multiselect'?<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{options.map(o=>{const id=optionId(o);return <label key={id} className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs cursor-pointer"><input type="checkbox" checked={(Array.isArray(val)?val:[]).includes(id)} onChange={e=>toggle(id,e.target.checked)}/><span>{optionLabel(o,lang)}</span></label>;})}</div>:
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
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-stone-200">
        
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

        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {step === 1 && (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {mainCategories.map(mainCat => {
                const name = mainCat.name[lang] || mainCat.name.de;
                return (
                  <button
                    key={mainCat.id}
                    onClick={() => handleSelectCategory(mainCat.id)}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer bg-white hover:${currentTheme.border} hover:shadow-md group`}
                  >
                    <div className={`p-2.5 rounded-xl ${currentTheme.bgLight} group-hover:scale-105 transition`}>
                      {renderSafeIconByName(mainCat.icon, currentTheme)}
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950 truncate">{name}</span>
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
{primaryFields.map(field=><PresetFieldEditor key={field.key} field={field} value={fieldValues[field.key]} fieldValues={fieldValues} lang={lang} onChange={value=>handleFieldValueChange(field.key,value)} onCustomTextChange={handleFieldValueChange}/>)}
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
          <div className="p-4 border-t border-stone-100 bg-stone-50/80 flex items-center justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-slate-900 cursor-pointer">
              {t.cancel}
            </button>
            <button onClick={handleSave} className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md ${currentTheme.bg} hover:opacity-95 cursor-pointer flex items-center gap-1.5`}>
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
          {presetObj.schema.map(field => {
            const rawVal = fieldValues[field.key] !== undefined ? fieldValues[field.key] : field.default;
            const fieldLabel = (field.label && (field.label[lang] || field.label.de)) || field.key;

            if (rawVal === undefined || rawVal === null || rawVal === '') return null;

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

export default function App() {
  const [lang, setLang] = useState('de');
  const t = translations[lang] || translations.de;

  const [appMode, setAppMode] = useState('guest'); 
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const [currentSlide] = useState(0);
  const [copiedWifi, setCopiedWifi] = useState(false);

  const [scanCount] = useState(184);
  const [daysLeft] = useState(24);
  const [activeRooms] = useState(12);

  const [analyticsClicks] = useState([
    { category: 'Hotelinformationen', clicks: 84 },
    { category: 'WLAN & Internet', clicks: 72 },
    { category: 'Frühstück', clicks: 59 },
    { category: 'Wellness & Sauna', clicks: 43 },
    { category: 'Anreise & Parken', dl: 31 }
  ]);

  const [hotel, setHotel] = useState(() => {
    const saved = localStorage.getItem('gm24_hotel');
    const defaultData = {
      logoUrl: '',
      name: 'Boutique Hotel & Suites', 
      locationTitle: 'REGION / STANDORT',
      address: 'Musterstraße 1, 12345 Musterstadt',
      phone: '+49 123 456789',
      email: 'info@meine-unterkunft.de',
      website: 'www.meine-unterkunft.de',
      googleReviewUrl: 'https://g.page/r/example/review',
      wifiSsid: 'Guest_WiFi',
      wifiPass: 'welcome2026',
      breakfastTime: '07:30 - 10:30 Uhr',
      checkInOut: 'Check-in: ab 15:00 | Check-out: bis 11:00',
      parkingInfo: 'Kostenfreie Parkplätze am Haus verfügbar.',
      showWifi: true,
      showParking: true,
      showBreakfast: true,
      showCheckInOut: true,
      themeColor: 'amber',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
      ]
    };
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('gm24_categories');
    return saved ? JSON.parse(saved) : [
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

  const handleSaveData = async () => {
    try {
      const { error } = await supabase
        .from('hotels')
        .upsert({ 
          id: 'default-hotel-id', 
          name: hotel.name,
          phone: hotel.phone,
          email: hotel.email,
          address: hotel.address,
          categories: categories,
          theme_color: hotel.themeColor
        });

      if (error) throw error;
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      localStorage.setItem('gm24_hotel', JSON.stringify(hotel));
      localStorage.setItem('gm24_categories', JSON.stringify(categories));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
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
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Wifi className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.wlanTitle}</span></div>
        <div className="text-[11px] text-slate-500 font-mono bg-stone-50 p-2 rounded-lg border">
          <div><b>{hotel.wifiSsid}</b></div>
          <div className="flex justify-between items-center mt-1">
            <span>{hotel.wifiPass}</span>
            <button onClick={copyWifiPassword} className={`${currentTheme.bgLight} ${currentTheme.text} p-1 rounded cursor-pointer`}>{copiedWifi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}</button>
          </div>
        </div>
      </div>
    ),
    hotel.showParking && (
      <div key="parking" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Car className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.parkingTitle}</span></div>
        <p className="text-[11px] text-slate-600">{hotel.parkingInfo}</p>
      </div>
    ),
    hotel.showBreakfast && (
      <div key="breakfast" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Coffee className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.breakfastTitle}</span></div>
        <p className="text-[11px] text-slate-600">{hotel.breakfastTime}</p>
      </div>
    ),
    hotel.showCheckInOut && (
      <div key="checkinout" className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
        <div className={`flex items-center gap-2 ${currentTheme.text}`}><Clock className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.checkInOutTitle}</span></div>
        <p className="text-[11px] text-slate-600">{hotel.checkInOut}</p>
      </div>
    )
  ].filter(Boolean);

  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] font-sans text-slate-800 p-6 md:p-10 space-y-8 relative pb-28">
        
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
        <div className="max-w-5xl mx-auto flex justify-between items-center pb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className={`${currentTheme.bg} text-white font-black px-3 py-1.5 rounded-xl text-sm`}>G</span>
            <span className="font-extrabold text-lg tracking-tight">gastemappe24 <span className={`${currentTheme.text} text-xs uppercase px-1.5 py-0.5 ${currentTheme.bgLight} rounded-md`}>PRO</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSaveData} className="bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-800 transition cursor-pointer flex items-center gap-2 shadow-md">
              <Save className="w-4 h-4" /> {isSaved ? t.savedMsg : t.saveBtn}
            </button>
            <button onClick={() => { setAppMode('guest'); setShowWelcomeScreen(false); }} className="bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition cursor-pointer">
              {t.guestViewBtn}
            </button>
          </div>
        </div>

        {/* STATS & PRO TRIAL BAR */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${currentTheme.bgLight} ${currentTheme.text}`}><BarChart3 className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">{t.statsScans}</span>
              <h4 className="text-xl font-black text-slate-900">{scanCount}</h4>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${currentTheme.bgLight} ${currentTheme.text}`}><Users className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">{t.statsActiveRooms}</span>
              <h4 className="text-xl font-black text-slate-900">{activeRooms}</h4>
            </div>
          </div>
          <div className={`p-5 rounded-3xl border border-amber-300 bg-amber-50/70 shadow-sm flex items-center justify-between`}>
            <div>
              <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider">{t.trialTitle}</span>
              <h4 className="text-xl font-black text-amber-950">{daysLeft} {t.trialDaysLeft}</h4>
            </div>
            <Zap className="w-7 h-7 text-amber-600" />
          </div>
        </div>

        {/* ANALYTİK / TIKLANMA GRAFİK / LİSTE BÖLÜMÜ */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${currentTheme.bgLight} ${currentTheme.text}`}><TrendingUp className="w-6 h-6" /></div>
            <div>
              <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.analyticsTitle}</h3>
              <p className="text-xs text-stone-500">Live Telemetrie & Gast-Interaktionen</p>
            </div>
          </div>
          <div className="space-y-3 pt-2">
            {analyticsClicks.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{item.category}</span>
                  <span className={currentTheme.text}>{item.clicks} Klicks</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${currentTheme.bg}`} style={{ width: `${(item.clicks / 100) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DASHBOARD CONTENT SECTIONS */}
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.adminTitle}</h1>

          {/* 1. HOTEL BİLGİLERİ */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec1Title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblHotelName}</label>
                <input type="text" value={hotel.name} onChange={(e) => setHotel({ ...hotel, name: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblPhone}</label>
                <input type="text" value={hotel.phone} onChange={(e) => setHotel({ ...hotel, phone: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
              </div>
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
              {(hotel.images || []).map((img, idx) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button onClick={() => window.print()} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition flex items-center justify-center gap-2 text-xs font-bold text-slate-800 cursor-pointer shadow-xs">
                <Printer className="w-4 h-4 text-stone-600" /> {t.printA4}
              </button>
              <button onClick={() => window.print()} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition flex items-center justify-center gap-2 text-xs font-bold text-slate-800 cursor-pointer shadow-xs">
                <Printer className="w-4 h-4 text-stone-600" /> {t.printA5}
              </button>
              <button onClick={() => window.print()} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition flex items-center justify-center gap-2 text-xs font-bold text-slate-800 cursor-pointer shadow-xs">
                <Printer className="w-4 h-4 text-stone-600" /> {t.printCard}
              </button>
            </div>
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
      <div className="min-h-screen bg-slate-950 max-w-md mx-auto shadow-2xl relative overflow-hidden flex flex-col justify-between font-sans">
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

        <div className="relative z-10 p-6 space-y-4 text-white">
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

              {/* HAVA DURUMU KARTI */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${currentTheme.bgLight} rounded-xl ${currentTheme.text}`}><Sun className="w-6 h-6" /></div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 uppercase">{t.weatherTitle}</div>
                    <div className="text-[11px] text-stone-500">{t.weatherSub}</div>
                  </div>
                </div>
                <div className="text-right"><div className="text-2xl font-black text-slate-900">16°C</div></div>
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
          <a href={hotel.googleReviewUrl} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}>
            <Star className="w-5 h-5 fill-current" /><span>{t.navReview}</span>
          </a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address || '')}`} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}>
            <Navigation className="w-5 h-5" /><span>{t.navRoute}</span>
          </a>
        </nav>
      </div>
    </div>
  );
}