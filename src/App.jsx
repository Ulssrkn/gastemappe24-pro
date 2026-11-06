import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Scroll, Save, Eye, EyeOff, Palette, TrendingUp, Users, Activity, HelpCircle,
  Flame, Accessibility, Recycle, Award, Scissors, ShoppingCart, Stethoscope, Baby, Music, Smile, CheckCircle2, XCircle, Zap
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
    statsTopCategory: "Beliebteste Kategorie",
    statsPeakTime: "Besuchs-Spitzenzeit",
    qrTitle: "QR-Code & Print-Center",
    printA4: "Druckvorlage A4",
    printA5: "Druckvorlage A5",
    printCard: "Visitenkarte",
    sec1Title: "1. Unterkunft Informationen & Kontaktdaten",
    sec2Title: "2. Design & Farb-Themen (8 Optionen)",
    sec3Title: "3. Logo hochladen",
    sec4Title: "4. Bilderverwaltung (Slider)",
    sec5Title: "5. Schnellzugriff (Aktivieren / Deaktivieren)",
    sec6Title: "6. Dynamisches Preset & Kategorie-System",
    lblHotelName: "Unterkunft Name",
    lblPhone: "Telefon",
    lblEmailField: "E-Mail",
    lblAddress: "Adresse",
    lblWebsite: "Webseite",
    lblGoogleReview: "Google Review Link",
    lblWifiSsid: "WLAN SSID",
    lblWifiPass: "WLAN Passwort",
    lblBreakfastTime: "Frühstückszeiten",
    lblCheckInOut: "Check-in / Check-out Infos",
    lblParkingInfo: "Parkplatz Info",
    btnLogoUpload: "Logo Wählen / Ändern",
    btnAddCategory: "Kategorie aus Preset-Katalog hinzufügen",
    modalTitle: "Dynamischer Preset-Katalog: Kategorie & Inhaltsvorlage auswählen",
    addBtn: "Hinzufügen",
    editTitle: "Name / Titel der Kategorie",
    customTextLabel: "Eigene Beschreibung (optional)",
    customTextWarning: "⚠️ Dieser eigene Text wird für alle 10 Sprachen unverändert übernommen (keine automatische Übersetzung).",
    yesLabel: "Ja / Verfügbar",
    noLabel: "Nein / Nicht verfügbar",
    createCustomCatBtn: "Eigene benutzerdefinierte Kategorie erstellen"
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
    statsTopCategory: "Top Category",
    statsPeakTime: "Peak Hours",
    qrTitle: "QR Code & Print Center",
    printA4: "Print Template A4",
    printA5: "Print Template A5",
    printCard: "Business Card",
    sec1Title: "1. Property Information & Contacts",
    sec2Title: "2. Design & Color Themes (8 Options)",
    sec3Title: "3. Upload Logo",
    sec4Title: "4. Image Management (Slider)",
    sec5Title: "5. Quick Access (Enable / Disable Cards)",
    sec6Title: "6. Dynamic Preset & Category System",
    lblHotelName: "Property Name",
    lblPhone: "Phone",
    lblEmailField: "E-Mail",
    lblAddress: "Address",
    lblWebsite: "Website",
    lblGoogleReview: "Google Review Link",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "WiFi Password",
    lblBreakfastTime: "Breakfast Hours",
    lblCheckInOut: "Check-in / Check-out Info",
    lblParkingInfo: "Parking Info",
    btnLogoUpload: "Select / Change Logo",
    btnAddCategory: "Add Category from Preset Catalog",
    modalTitle: "Dynamic Preset Catalog: Select Category & Template",
    addBtn: "Add",
    editTitle: "Category Name / Title",
    customTextLabel: "Custom Description (optional)",
    customTextWarning: "⚠️ This custom text is kept as-is across all 10 languages (no automatic translation).",
    yesLabel: "Yes / Available",
    noLabel: "No / Not Available",
    createCustomCatBtn: "Create Custom Category"
  },
  tr: {
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
    adminTitle: "Yönetim Paneli & Analitik (Dashboard)",
    guestViewBtn: "Misafir Görünümünü Aç",
    saveBtn: "Değişiklikleri Kaydet",
    savedMsg: "Kaydedildi!",
    trialTitle: "30 Günlük Deneme (PRO)",
    trialDaysLeft: "Gün kaldı",
    statsScans: "QR Kod Taramaları (Toplam)",
    statsActiveRooms: "Aktif Oda Erişimi",
    statsTopCategory: "En Çok Tıklanan Kategori",
    statsPeakTime: "Yoğun Kullanım Saati",
    qrTitle: "QR Kod & Baskı Merkezi",
    printA4: "A4 Baskı Şablonu",
    printA5: "A5 Baskı Şablonu",
    printCard: "Kartvizit Şablonu",
    sec1Title: "1. Tesis Bilgileri & İletişim",
    sec2Title: "2. Renk Temaları (8 Seçenek)",
    sec3Title: "3. Logo Yükleme",
    sec4Title: "4. Resim Yönetimi (Slider)",
    sec5Title: "5. Hızlı Erişim (Kartları Aç / Kapat)",
    sec6Title: "6. Dinamik Preset & Kategori Sistemi",
    lblHotelName: "Tesis / Otel Adı",
    lblPhone: "Telefon",
    lblEmailField: "E-Posta",
    lblAddress: "Adres",
    lblWebsite: "Web Sitesi",
    lblGoogleReview: "Google Yorum Linki",
    lblWifiSsid: "WiFi Ağ Adı (SSID)",
    lblWifiPass: "WiFi Şifresi",
    lblBreakfastTime: "Kahvaltı Saatleri",
    lblCheckInOut: "Giriş / Çıkış Bilgileri",
    lblParkingInfo: "Otopark Bilgisi",
    btnLogoUpload: "Logo Seç / Değiştir",
    btnAddCategory: "Preset Katalogundan Kategori Ekle",
    modalTitle: "Dinamik Preset Kataloğu: Kategori ve İçerik Şablonu Seçin",
    addBtn: "Ekle",
    editTitle: "Kategori Adı / Başlığı",
    customTextLabel: "Özel Açıklama (İsteğe bağlı)",
    customTextWarning: "⚠️ Bu özel metin 10 dilde de aynı kalacaktır (otomatik çeviri yapılmaz).",
    yesLabel: "Evet / Mevcut",
    noLabel: "Hayır / Mevcut Değil",
    createCustomCatBtn: "Özel Kategori Oluştur"
  },
  hr: {
    welcomeBadge: "Digitalni vodič",
    welcomeButton: "Započnimo",
    greetingHello: "Pozdrav,",
    greetingWelcome: "dobrodošli.",
    navHome: "Početna",
    navGaestemappe: "Vodič",
    navReview: "Ocijeni",
    navRoute: "Upute",
    weatherTitle: "Sunčano",
    weatherSub: "Trenutno vrijeme",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parkiralište",
    breakfastTitle: "Doručak",
    checkInOutTitle: "Prijava / Odjava",
    detailBack: "Natrag",
    adminTitle: "Upravljanje i Analitika",
    guestViewBtn: "Otvori prikaz za goste",
    saveBtn: "Spremi promjene",
    savedMsg: "Spremljeno!",
    trialTitle: "30-dnevno probno razdoblje",
    trialDaysLeft: "preostalih dana",
    statsScans: "QR skeniranja",
    statsActiveRooms: "Aktivne sobe",
    statsTopCategory: "Najpopularnija kategorija",
    statsPeakTime: "Najaktivnije vrijeme",
    qrTitle: "QR centar za ispis",
    printA4: "Predložak A4",
    printA5: "Predložak A5",
    printCard: "Vizitka",
    sec1Title: "1. Informacije o objektu",
    sec2Title: "2. Teme boja",
    sec3Title: "3. Učitaj logotip",
    sec4Title: "4. Upravljanje slikama",
    sec5Title: "5. Brzi pristup",
    sec6Title: "6. Sustav dinamičkih predložaka",
    lblHotelName: "Naziv objekta",
    lblPhone: "Telefon",
    lblEmailField: "E-pošta",
    lblAddress: "Adresa",
    lblWebsite: "Web stranica",
    lblGoogleReview: "Google poveznica recenzije",
    lblWifiSsid: "Wi-Fi SSID",
    lblWifiPass: "Wi-Fi lozinka",
    lblBreakfastTime: "Vrijeme doručka",
    lblCheckInOut: "Info prijave / odjave",
    lblParkingInfo: "Info o parkiranju",
    btnLogoUpload: "Odaberi logotip",
    btnAddCategory: "Dodaj kategoriju",
    modalTitle: "Katalog predložaka: Odaberi",
    addBtn: "Dodaj",
    editTitle: "Naziv kategorije",
    customTextLabel: "Prilagođeni opis",
    customTextWarning: "⚠️ Ovaj tekst ostaje neizmijenjen na svih 10 jezika.",
    yesLabel: "Da / Dostupno",
    noLabel: "Ne / Nije dostupno",
    createCustomCatBtn: "Stvori prilagođenu kategoriju"
  },
  it: {
    welcomeBadge: "Guida digitale",
    welcomeButton: "Inizia",
    greetingHello: "Ciao,",
    greetingWelcome: "benvenuto.",
    navHome: "Home",
    navGaestemappe: "Guida",
    navReview: "Recensisci",
    navRoute: "Percorso",
    weatherTitle: "Sereno",
    weatherSub: "Meteo attuale",
    detailBack: "Torna",
    adminTitle: "Amministrazione",
    guestViewBtn: "Vista ospiti",
    saveBtn: "Salva",
    savedMsg: "Salvato!",
    yesLabel: "Sì / Disponibile",
    noLabel: "No / Non disponibile",
    createCustomCatBtn: "Crea categoria personalizzata",
    sec1Title: "1. Info struttura",
    sec6Title: "6. Sistema Preset",
    addBtn: "Aggiungi",
    editTitle: "Titolo categoria",
    customTextLabel: "Descrizione",
    customTextWarning: "⚠️ Invariato in tutte le 10 lingue."
  },
  fr: {
    welcomeBadge: "Guide numérique",
    welcomeButton: "Commencer",
    greetingHello: "Bonjour,",
    greetingWelcome: "bienvenue.",
    navHome: "Accueil",
    navGaestemappe: "Guide",
    navReview: "Avis",
    navRoute: "Itinéraire",
    weatherTitle: "Ensoleillé",
    weatherSub: "Météo actuelle",
    detailBack: "Retour",
    adminTitle: "Administration",
    guestViewBtn: "Vue invité",
    saveBtn: "Enregistrer",
    savedMsg: "Enregistré !",
    yesLabel: "Oui / Disponible",
    noLabel: "Non / Indisponible",
    createCustomCatBtn: "Créer une catégorie",
    sec1Title: "1. Infos structure",
    sec6Title: "6. Système de Préréglage",
    addBtn: "Ajouter",
    editTitle: "Titre",
    customTextLabel: "Description",
    customTextWarning: "⚠️ Inchangé dans les 10 langues."
  },
  es: {
    welcomeBadge: "Guía digital",
    welcomeButton: "Empezar",
    greetingHello: "Hola,",
    greetingWelcome: "bienvenido.",
    navHome: "Inicio",
    navGaestemappe: "Guía",
    navReview: "Valorar",
    navRoute: "Ruta",
    weatherTitle: "Soleado",
    weatherSub: "Clima actual",
    detailBack: "Volver",
    adminTitle: "Administración",
    guestViewBtn: "Vista de huésped",
    saveBtn: "Guardar",
    savedMsg: "¡Guardado!",
    yesLabel: "Sí / Disponible",
    noLabel: "No / No disponible",
    createCustomCatBtn: "Crear categoría personalizada",
    sec1Title: "1. Info del alojamiento",
    sec6Title: "6. Sistema de Plantillas",
    addBtn: "Añadir",
    editTitle: "Título",
    customTextLabel: "Descripción",
    customTextWarning: "⚠️ Idéntico en los 10 idiomas."
  },
  sv: {
    welcomeBadge: "Digital gästguide",
    welcomeButton: "Sätt igång",
    greetingHello: "Hej,",
    greetingWelcome: "välkommen.",
    navHome: "Hem",
    navGaestemappe: "Guide",
    navReview: "Recensera",
    navRoute: "Vägbeskrivning",
    weatherTitle: "Soligt",
    weatherSub: "Aktuellt väder",
    detailBack: "Tillbaka",
    adminTitle: "Administration",
    guestViewBtn: "Gästvy",
    saveBtn: "Spara",
    savedMsg: "Sparat!",
    yesLabel: "Ja / Tillgänglig",
    noLabel: "Nej / Ej tillgänglig",
    createCustomCatBtn: "Skapa kategori",
    sec1Title: "1. Boendeinformation",
    sec6Title: "6. Förinställningssystem",
    addBtn: "Lägg till",
    editTitle: "Titel",
    customTextLabel: "Beskrivning",
    customTextWarning: "⚠️ Oförändrad på alla 10 språk."
  },
  no: {
    welcomeBadge: "Digital gjesteguide",
    welcomeButton: "Sett i gang",
    greetingHello: "Hei,",
    greetingWelcome: "velkommen.",
    navHome: "Hjem",
    navGaestemappe: "Guide",
    navReview: "Omtale",
    navRoute: "Rute",
    weatherTitle: "Sol",
    weatherSub: "Aktuelt vær",
    detailBack: "Tilbake",
    adminTitle: "Administrasjon",
    guestViewBtn: "Gjestevisning",
    saveBtn: "Lagre",
    savedMsg: "Lagret!",
    yesLabel: "Ja / Tilgjengelig",
    noLabel: "Nei / Ikke tilgjengelig",
    createCustomCatBtn: "Opprett kategori",
    sec1Title: "1. Boliginfo",
    sec6Title: "6. Forhåndsinnstilt system",
    addBtn: "Legg til",
    editTitle: "Tittel",
    customTextLabel: "Beskrivelse",
    customTextWarning: "⚠️ Uendret på alle 10 språk."
  },
  sq: {
    welcomeBadge: "Udhëzues dixhital",
    welcomeButton: "Le të fillojmë",
    greetingHello: "Përshëndetje,",
    greetingWelcome: "mirë se erdhët.",
    navHome: "Kryefaqja",
    navGaestemappe: "Udhëzuesi",
    navReview: "Vlerëso",
    navRoute: "Udha",
    weatherTitle: "Me diell",
    weatherSub: "Moti aktual",
    detailBack: "Kthehu",
    adminTitle: "Administrimi",
    guestViewBtn: "Pamja e mysafirit",
    saveBtn: "Ruaj",
    savedMsg: "U ruajt!",
    yesLabel: "Po / E disponueshme",
    noLabel: "Jo / E padisponueshme",
    createCustomCatBtn: "Krijo kategori",
    sec1Title: "1. Info e pronës",
    sec6Title: "6. Sistemi i shablloneve",
    addBtn: "Shto",
    editTitle: "Titulli",
    customTextLabel: "Përshkrimi",
    customTextWarning: "⚠️ I pandryshuar në të 10 gjuhët."
  }
};

const themeColors = [
  { id: 'amber', name: 'Amber Warm', bg: 'bg-amber-900', text: 'text-amber-900', bgLight: 'bg-amber-50', border: 'border-amber-900/40', hex: '#78350f' },
  { id: 'emerald', name: 'Forest Emerald', bg: 'bg-emerald-800', text: 'text-emerald-800', bgLight: 'bg-emerald-50', border: 'border-emerald-800/40', hex: '#065f46' },
  { id: 'indigo', name: 'Royal Indigo', bg: 'bg-indigo-900', text: 'text-indigo-900', bgLight: 'bg-indigo-50', border: 'border-indigo-900/40', hex: '#312e81' },
  { id: 'rose', name: 'Rose Luxury', bg: 'bg-rose-800', text: 'text-rose-800', bgLight: 'bg-rose-50', border: 'border-rose-800/40', hex: '#9f1239' },
  { id: 'slate', name: 'Classic Slate', bg: 'bg-slate-900', text: 'text-slate-900', bgLight: 'bg-slate-100', border: 'border-slate-900/40', hex: '#0f172a' },
  { id: 'violet', name: 'Deep Violet', bg: 'bg-violet-900', text: 'text-violet-900', bgLight: 'bg-violet-50', border: 'border-violet-900/40', hex: '#581c87' },
  { id: 'cyan', name: 'Ocean Cyan', bg: 'bg-cyan-800', text: 'text-cyan-800', bgLight: 'bg-cyan-50', border: 'border-cyan-800/40', hex: '#155e75' },
  { id: 'orange', name: 'Sunset Orange', bg: 'bg-orange-700', text: 'text-orange-700', bgLight: 'bg-orange-50', border: 'border-orange-700/40', hex: '#c2410c' }
];

const mainCategories = [
  { id: 'cat_hotel', name: { de: 'Hotel & Unterkunft', en: 'Hotel & Accommodation', tr: 'Otel & Konaklama', hr: 'Hotel i smještaj' }, icon: 'Building' },
  { id: 'cat_food', name: { de: 'Essen & Trinken', en: 'Food & Drinks', tr: 'Yeme & İçme', hr: 'Hrana i piće' }, icon: 'Utensils' },
  { id: 'cat_wellness', name: { de: 'Wellness & Spa', en: 'Wellness & Spa', tr: 'Wellness & Spa', hr: 'Wellness i spa' }, icon: 'Waves' },
  { id: 'cat_leisure', name: { de: 'Freizeit & Aktivitäten', en: 'Leisure & Activities', tr: 'Eğlence & Aktiviteler', hr: 'Slobodno vrijeme' }, icon: 'Compass' },
  { id: 'cat_surroundings', name: { de: 'Umgebung & Ausflüge', en: 'Surroundings & Excursions', tr: 'Çevre & Geziler', hr: 'Okolica i izleti' }, icon: 'MapPin' },
  { id: 'cat_mobility', name: { de: 'Anreise & Mobilität', en: 'Arrival & Mobility', tr: 'Ulaşım & Mobilite', hr: 'Dolazak i mobilnost' }, icon: 'Car' },
  { id: 'cat_service', name: { de: 'Service & Informationen', en: 'Service & Information', tr: 'Servis & Bilgiler', hr: 'Usluge i informacije' }, icon: 'Phone' },
  { id: 'cat_safety', name: { de: 'Regeln & Sicherheit', en: 'Rules & Safety', tr: 'Kurallar & Güvenlik', hr: 'Pravila i sigurnost' }, icon: 'ShieldCheck' }
];

const categoryPresets = [
  { id: 'hotel_info', categoryId: 'cat_hotel', icon: 'Building', title: { de: 'Hotelinformationen', en: 'Hotel Information', tr: 'Otel Bilgileri', hr: 'Informacije o hotelu' }, schema: [
    { key: 'reception_hours', type: 'text', label: { de: 'Rezeptionszeiten', en: 'Reception Hours', tr: 'Resepsiyon Saatleri', hr: 'Radno vrijeme recepcije' }, default: '07:00 - 22:00 Uhr' },
    { key: 'emergency_phone', type: 'text', label: { de: 'Notfallnummer', en: 'Emergency Phone', tr: 'Acil Durum Telefonu', hr: 'Broj za hitne slučajeve' }, default: '+49 123 456789' },
    { key: 'multilingual_staff', type: 'boolean', label: { de: 'Mehrsprachiges Personal', en: 'Multilingual Staff', tr: 'Çok Dilli Personel', hr: 'Osoblje koje govori više jezika' }, default: true }
  ]},
  { id: 'room_info', categoryId: 'cat_hotel', icon: 'Bed', title: { de: 'Zimmerinformationen', en: 'Room Information', tr: 'Oda Bilgileri', hr: 'Informacije o sobi' }, schema: [
    { key: 'room_features', type: 'multiselect', label: { de: 'Zimmerausstattung', en: 'Room Features', tr: 'Oda Özellikleri', hr: 'Sadržaj sobe' }, options: ['Safe', 'Klimaanlage', 'Flachbild-TV', 'Haartrockner', 'Kaffeemaschine'], default: ['Safe', 'Klimaanlage', 'Flachbild-TV'] },
    { key: 'balcony_status', type: 'boolean', label: { de: 'Balkon / Terrasse', en: 'Balcony / Terrace', tr: 'Balkon / Teras', hr: 'Balkon / Terasa' }, default: false }
  ]},
  { id: 'wifi_internet', categoryId: 'cat_hotel', icon: 'Wifi', title: { de: 'WLAN & Internet', en: 'WiFi & Internet', tr: 'WLAN & İnternet', hr: 'Wi-Fi i internet' }, schema: [
    { key: 'wifi_available', type: 'boolean', label: { de: 'WLAN verfügbar', en: 'WiFi Available', tr: 'WLAN Mevcut', hr: 'Wi-Fi dostupan' }, default: true },
    { key: 'network_name', type: 'text', label: { de: 'Netzwerkname (SSID)', en: 'Network Name (SSID)', tr: 'Ağ Adı (SSID)', hr: 'Naziv mreže (SSID)' }, default: 'Hotel-Guest-WiFi' },
    { key: 'wifi_password', type: 'text', label: { de: 'Passwort', en: 'Password', tr: 'Şifre', hr: 'Lozinka' }, default: 'welcome2026' },
    { key: 'coverage', type: 'select', label: { de: 'Verfügbarkeit', en: 'Coverage', tr: 'Kapsama Alanı', hr: 'Pokrivenost' }, options: ['Gesamtes Hotel', 'Gästezimmer', 'Öffentliche Bereiche'], default: 'Gesamtes Hotel' }
  ]},
  { id: 'checkin_checkout', categoryId: 'cat_hotel', icon: 'Clock', title: { de: 'Check-in & Check-out', en: 'Check-in & Check-out', tr: 'Giriş & Çıkış', hr: 'Prijava i odjava' }, schema: [
    { key: 'checkin_time', type: 'text', label: { de: 'Check-in-Zeit', en: 'Check-in Time', tr: 'Giriş Saati', hr: 'Vrijeme prijave' }, default: 'ab 15:00 Uhr' },
    { key: 'checkout_time', type: 'text', label: { de: 'Check-out-Zeit', en: 'Check-out Time', tr: 'Çıkış Saati', hr: 'Vrijeme odjave' }, default: 'bis 11:00 Uhr' },
    { key: 'express_checkout', type: 'boolean', label: { de: 'Express Check-out', en: 'Express Check-out', tr: 'Hızlı Çıkış', hr: 'Brza odjava' }, default: true }
  ]},
  { id: 'room_keys', categoryId: 'cat_hotel', icon: 'Key', title: { de: 'Zimmerschlüssel & Zugang', en: 'Room Keys & Access', tr: 'Oda Anahtarları & Erişim', hr: 'Ključevi sobe i pristup' }, schema: [
    { key: 'key_type', type: 'select', label: { de: 'Schlüsseltyp', en: 'Key Type', tr: 'Anahtar Tipi', hr: 'Vrsta ključa' }, options: ['Elektronische Schlüsselkarte', 'PIN-Code / Smart Lock', 'Klassischer Schlüssel'], default: 'Elektronische Schlüsselkarte' },
    { key: 'night_entrance', type: 'boolean', label: { de: 'Nachteingang per Karte', en: 'Night Entrance via Card', tr: 'Kart ile Gece Girişi', hr: 'Noćni ulaz karticom' }, default: true }
  ]},
  { id: 'breakfast', categoryId: 'cat_food', icon: 'Coffee', title: { de: 'Frühstück', en: 'Breakfast', tr: 'Kahvaltı', hr: 'Doručak' }, schema: [
    { key: 'breakfast_hours', type: 'text', label: { de: 'Frühstückszeiten', en: 'Breakfast Hours', tr: 'Kahvaltı Saatleri', hr: 'Vrijeme doručka' }, default: '07:00 - 10:30 Uhr' },
    { key: 'breakfast_type', type: 'select', label: { de: 'Frühstücksart', en: 'Breakfast Type', tr: 'Kahvaltı Türü', hr: 'Vrsta doručka' }, options: ['Reichhaltiges Buffet', 'Kontinental', 'À la carte'], default: 'Reichhaltiges Buffet' },
    { key: 'location', type: 'text', label: { de: 'Frühstücksort', en: 'Location', tr: 'Konum', hr: 'Lokacija' }, default: 'Hauptrestaurant (Erdgeschoss)' }
  ]}
];

const DynamicFormRenderer = ({ presetSchema, fieldValues, onChangeField, currentTheme, lang }) => {
  if (!presetSchema || !Array.isArray(presetSchema)) return null;

  return (
    <div className="space-y-3 bg-white p-4 rounded-2xl border border-stone-200">
      {presetSchema.map((field) => {
        const val = fieldValues[field.key] !== undefined ? fieldValues[field.key] : field.default;
        const label = (field.label && (field.label[lang] || field.label.de)) || field.key;

        if (field.type === 'boolean') {
          return (
            <div key={field.key} className="flex items-center justify-between py-1">
              <span className="text-xs font-bold text-slate-700">{label}</span>
              <input 
                type="checkbox" 
                checked={!!val} 
                onChange={(e) => onChangeField(field.key, e.target.checked)}
                className="w-4 h-4 accent-amber-800 rounded cursor-pointer"
              />
            </div>
          );
        }

        if (field.type === 'select') {
          return (
            <div key={field.key} className="space-y-1">
              <label className="block text-[10px] font-extrabold text-stone-500 uppercase">{label}</label>
              <select 
                value={val || ''} 
                onChange={(e) => onChangeField(field.key, e.target.value)}
                className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white font-medium cursor-pointer"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === 'multiselect') {
          const currentSelected = Array.isArray(val) ? val : [];
          return (
            <div key={field.key} className="space-y-1.5">
              <label className="block text-[10px] font-extrabold text-stone-500 uppercase">{label}</label>
              <div className="flex flex-wrap gap-1.5">
                {field.options.map((opt) => {
                  const isChecked = currentSelected.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        const next = isChecked ? currentSelected.filter(i => i !== opt) : [...currentSelected, opt];
                        onChangeField(field.key, next);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border transition cursor-pointer flex items-center gap-1 ${isChecked ? `${currentTheme.bg} text-white border-transparent` : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'}`}
                    >
                      {isChecked && <Check className="w-3 h-3" />}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        return (
          <div key={field.key} className="space-y-1">
            <label className="block text-[10px] font-extrabold text-stone-500 uppercase">{label}</label>
            <input 
              type="text" 
              value={val !== undefined ? val : ''} 
              onChange={(e) => onChangeField(field.key, e.target.value)}
              className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white font-medium"
            />
          </div>
        );
      })}
    </div>
  );
};

// --- MİSAFİR GÖRÜNÜMÜ: TEMA RENKLERİNE UYUMLU, MOBİL UYUMLU ŞIK BİLGİ KARTI ---
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
                    {rawVal.map(item => (
                      <span key={item} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${currentTheme.bgLight} ${currentTheme.text} border border-stone-200/60 shadow-xs flex items-center gap-1.5`}>
                        <Check className="w-3.5 h-3.5" /> {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs font-extrabold text-slate-900 bg-stone-50 px-4 py-3 rounded-2xl border border-stone-200/70 shadow-xs">
                    {String(rawVal)}
                  </div>
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
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  
  const [currentSlide] = useState(0);
  const [copiedWifi, setCopiedWifi] = useState(false);

  const [scanCount] = useState(184);
  const [daysLeft] = useState(24);
  const [activeRooms] = useState(12);

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
        presetId: 'breakfast', 
        categoryId: 'cat_food',
        icon: 'Coffee', 
        customTitle: '', 
        fieldValues: { breakfast_hours: '07:00 - 10:30 Uhr', breakfast_type: 'Reichhaltiges Buffet', location: 'Hauptrestaurant' },
        customText: 'Gerne bereiten wir Ihnen auch vegane Alternativen frisch zu.' 
      }
    ];
  });

  const currentTheme = themeColors.find(tc => tc.id === hotel.themeColor) || themeColors[0];

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
      console.error("Supabase kayıt hatası:", err);
      localStorage.setItem('gm24_hotel', JSON.stringify(hotel));
      localStorage.setItem('gm24_categories', JSON.stringify(categories));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleAddPresetCategory = (presetObj) => {
    if (!presetObj) return;
    const initialFieldVals = {};
    if (presetObj.schema) {
      presetObj.schema.forEach(field => {
        initialFieldVals[field.key] = field.default;
      });
    }

    const newCategory = { 
      id: Date.now().toString(), 
      presetId: presetObj.id, 
      categoryId: presetObj.categoryId,
      icon: presetObj.icon || 'Info',
      customTitle: '',
      fieldValues: initialFieldVals,
      customText: ''
    };
    setCategories(prev => [...prev, newCategory]);
    setIsCatalogModalOpen(false);
  };

  const handleAddCustomCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      presetId: 'custom',
      categoryId: 'cat_hotel',
      icon: 'Info',
      customTitle: 'Eigene Kategorie',
      fieldValues: {},
      customText: 'Hier stehen Ihre individuellen Informationen.'
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleDeleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const handleUpdateCategoryField = (id, field, value) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
  };

  const handleUpdateFieldValue = (catId, fieldKey, val) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        fieldValues: {
          ...(cat.fieldValues || {}),
          [fieldKey]: val
        }
      };
    }));
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
      reader.onloadend = () => { setHotel((prev) => ({ ...prev, logoUrl: reader.result })); };
      reader.readAsDataURL(file);
    }
  };

  const groupedCategories = (categories || []).reduce((acc, cat) => {
    if (!cat) return acc;
    const mainCatObj = mainCategories.find(mc => mc.id === cat.categoryId) || mainCategories[0];
    const groupName = mainCatObj.name[lang] || mainCatObj.name.de;
    if (!acc[groupName]) acc[groupName] = [];
    const presetData = categoryPresets.find(p => p.id === cat.presetId);
    acc[groupName].push({ ...cat, presetData, mainCatObj });
    return acc;
  }, {});

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
      case 'Wine': return <Wine className={className} />;
      case 'Dumbbell': return <Dumbbell className={className} />;
      default: return <Info className={className} />;
    }
  };

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
        {isCatalogModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-extrabold text-lg text-slate-900">{t.modalTitle}</h2>
                <button onClick={() => setIsCatalogModalOpen(false)} className="text-stone-400 font-bold p-1 cursor-pointer hover:text-stone-700">✕</button>
              </div>
              <div className="space-y-6">
                {mainCategories.map((mainCat) => {
                  const catPresets = categoryPresets.filter(p => p.categoryId === mainCat.id);
                  if (catPresets.length === 0) return null;
                  const catName = mainCat.name[lang] || mainCat.name.de;

                  return (
                    <div key={mainCat.id} className="space-y-2">
                      <h3 className={`text-xs font-black ${currentTheme.text} uppercase tracking-wider flex items-center gap-1.5`}>
                        {renderSafeIconByName(mainCat.icon, currentTheme)} {catName}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {catPresets.map((preset) => {
                          const title = (preset.title && (preset.title[lang] || preset.title.de)) || 'Preset';
                          return (
                            <div key={preset.id} className={`p-3 rounded-2xl border flex items-center justify-between transition bg-stone-50 hover:${currentTheme.border}`}>
                              <div className="flex items-center gap-2 truncate">
                                {renderSafeIconByName(preset.icon, currentTheme)}
                                <span className="font-bold block text-xs text-slate-900 truncate">{title}</span>
                              </div>
                              <button onClick={() => handleAddPresetCategory(preset)} className={`${currentTheme.bg} text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shadow hover:opacity-90 cursor-pointer flex items-center gap-1 shrink-0`}>
                                <Plus className="w-3 h-3" /> {t.addBtn}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto flex justify-between items-center pb-6 border-b border-stone-200">
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

        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t.adminTitle}</h1>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-8">
            <div className="space-y-4">
              <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec1Title}</h3>
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

            <div className="space-y-4 pt-4 border-t">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec6Title}</h3>
                <div className="flex gap-2">
                  <button onClick={handleAddCustomCategory} className="bg-stone-200 text-stone-700 px-3 py-2 rounded-xl text-xs font-bold hover:bg-stone-300 transition cursor-pointer flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> {t.createCustomCatBtn}
                  </button>
                  <button onClick={() => setIsCatalogModalOpen(true)} className={`${currentTheme.bg} text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:opacity-95 cursor-pointer flex items-center gap-1.5`}>
                    <Plus className="w-4 h-4" /> {t.btnAddCategory}
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                {Object.entries(groupedCategories).map(([groupName, groupItems]) => (
                  <div key={groupName} className="space-y-3">
                    <h4 className={`text-xs font-black ${currentTheme.text} uppercase tracking-wider ${currentTheme.bgLight} px-3 py-1.5 rounded-lg border border-stone-200/60 inline-block`}>{groupName}</h4>
                    <div className="space-y-4">
                      {(groupItems || []).map((cat) => {
                        const presetObj = cat.presetData;
                        const baseTitle = presetObj ? ((presetObj.title && (presetObj.title[lang] || presetObj.title.de)) || 'Kategorie') : (cat.customTitle || 'Benutzerdefinierte Kategorie');
                        const displayTitle = cat.customTitle || baseTitle;

                        return (
                          <div key={cat.id} className="p-4 bg-stone-50 rounded-2xl border space-y-4 shadow-sm">
                            <div className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-2">
                                {renderSafeIconByName(cat.icon, currentTheme)}
                                <span className="font-bold text-xs text-slate-800">{displayTitle}</span>
                              </div>
                              <button onClick={() => handleDeleteCategory(cat.id)} className="bg-rose-50 text-rose-600 p-1.5 rounded-lg cursor-pointer hover:bg-rose-100"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">{t.editTitle}</label>
                                <input 
                                  type="text" 
                                  placeholder={baseTitle}
                                  value={cat.customTitle || ''} 
                                  onChange={(e) => handleUpdateCategoryField(cat.id, 'customTitle', e.target.value)} 
                                  className="w-full p-2.5 text-xs border rounded-xl bg-white font-semibold" 
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-extrabold text-stone-500 uppercase mb-0.5">Hauptkategorie / Gruppe</label>
                                <select
                                  value={cat.categoryId}
                                  onChange={(e) => handleUpdateCategoryField(cat.id, 'categoryId', e.target.value)}
                                  className="w-full p-2.5 text-xs border rounded-xl bg-white font-medium cursor-pointer"
                                >
                                  {mainCategories.map(mc => (
                                    <option key={mc.id} value={mc.id}>{mc.name[lang] || mc.name.de}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {presetObj && presetObj.schema && (
                              <div className="space-y-1">
                                <label className="block text-[9px] font-extrabold text-amber-800 uppercase">Preset-spezifische Konfiguration</label>
                                <DynamicFormRenderer 
                                  presetSchema={presetObj.schema}
                                  fieldValues={cat.fieldValues || {}}
                                  onChangeField={(fieldKey, val) => handleUpdateFieldValue(cat.id, fieldKey, val)}
                                  currentTheme={currentTheme}
                                  lang={lang}
                                />
                              </div>
                            )}

                            <div className="pt-2 border-t border-stone-200/60 space-y-1">
                              <label className="block text-[9px] font-extrabold text-amber-700 uppercase">{t.customTextLabel}</label>
                              <textarea 
                                rows="2"
                                value={cat.customText || ''} 
                                onChange={(e) => handleUpdateCategoryField(cat.id, 'customText', e.target.value)} 
                                placeholder="Individueller Hinweistext für Ihre Gäste..."
                                className="w-full p-2.5 text-xs border border-amber-300 rounded-xl bg-amber-50/50" 
                              />
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
            <option value="hr">🇭🇷 HR</option>
            <option value="it">🇮🇹 IT</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="sv">🇸🇪 SV</option>
            <option value="no">🇳🇴 NO</option>
            <option value="sq">🇦🇱 SQ</option>
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
        <span className="text-xs font-bold tracking-wider uppercase text-slate-800">{hotel.name}</span>
        <div className="flex items-center gap-2">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white border text-xs font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer">
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
            <option value="tr">🇹🇷 TR</option>
            <option value="hr">🇭🇷 HR</option>
            <option value="it">🇮🇹 IT</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="sv">🇸🇪 SV</option>
            <option value="no">🇳🇴 NO</option>
            <option value="sq">🇦🇱 SQ</option>
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

              <div className="relative rounded-3xl overflow-hidden shadow-lg h-56 bg-slate-900 border border-stone-200">
                <img src={(hotel.images && hotel.images[currentSlide]) || (hotel.images && hotel.images[0]) || ''} alt="Slide" className="w-full h-full object-cover" />
              </div>

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
                            <div className={`w-10 h-10 rounded-xl ${currentTheme.bgLight} flex items-center justify-center`}>{renderSafeIconByName(cat.icon, currentTheme)}</div>
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