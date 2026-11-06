import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Scroll, Save, Eye, EyeOff, Palette, TrendingUp, Users, Activity, HelpCircle,
  Flame, Accessibility, Recycle, Award, Scissors, ShoppingCart, Stethoscope, Baby, Music, Smile
} from 'lucide-react';

const supabaseUrl = 'https://YOUR-SUPABASE-URL.supabase.co';
const supabaseAnonKey = 'YOUR-SUPABASE-ANON-KEY';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- 10 DİL ÇEVİRİ SİSTEMİ (STABLE KEYS & TRANSLATIONS) ---
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
    selectCategoryPrompt: "Hauptkategorie auswählen",
    selectPresetPrompt: "Inhaltsvorlage / Preset auswählen",
    customTextLabel: "Eigene Beschreibung (optional)",
    customTextWarning: "⚠️ Dieser eigene Text wird für alle 10 Sprachen unverändert übernommen (keine automatische Übersetzung).",
    activeCard: "Karte anzeigen",
    inactiveCard: "Karte ausblenden",
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
    selectCategoryPrompt: "Select Main Category",
    selectPresetPrompt: "Select Preset Template",
    customTextLabel: "Custom Description (optional)",
    customTextWarning: "⚠️ This custom text is kept as-is across all 10 languages (no automatic translation).",
    activeCard: "Show Card",
    inactiveCard: "Hide Card",
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
    selectCategoryPrompt: "Ana Kategori Seçin",
    selectPresetPrompt: "İçerik Şablonu / Preset Seçin",
    customTextLabel: "Özel Açıklama (İsteğe bağlı)",
    customTextWarning: "⚠️ Bu özel metin 10 dilde de aynı kalacaktır (otomatik çeviri yapılmaz).",
    activeCard: "Kartı Göster",
    inactiveCard: "Kartı Gizle",
    createCustomCatBtn: "Özel Kategori Oluştur"
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
    weatherSub: "Meteo attuale locale",
    schnellzugriffTitle: "Accesso rapido",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parcheggio",
    breakfastTitle: "Colazione",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Torna alla panoramica",
    adminTitle: "Gestione e Analisi",
    guestViewBtn: "Apri vista ospiti",
    saveBtn: "Salva modifiche",
    savedMsg: "Salvato!",
    trialTitle: "Prova di 30 giorni (PRO)",
    trialDaysLeft: "Giorni rimanenti",
    statsScans: "Scansioni QR",
    statsActiveRooms: "Accessi attivi",
    statsTopCategory: "Categoria top",
    statsPeakTime: "Orario di punta",
    qrTitle: "Centro stampa QR",
    printA4: "Modello A4",
    printA5: "Modello A5",
    printCard: "Biglietto da visita",
    sec1Title: "1. Info struttura e contatti",
    sec2Title: "2. Temi di colore",
    sec3Title: "3. Carica logo",
    sec4Title: "4. Gestione immagini",
    sec5Title: "5. Accesso rapido",
    sec6Title: "6. Sistema Preset Dinamico",
    lblHotelName: "Nome struttura",
    lblPhone: "Telefono",
    lblEmailField: "E-mail",
    lblAddress: "Indirizzo",
    lblWebsite: "Sito web",
    lblGoogleReview: "Link recensioni Google",
    lblWifiSsid: "SSID Wi-Fi",
    lblWifiPass: "Password Wi-Fi",
    lblBreakfastTime: "Orari colazione",
    lblCheckInOut: "Info Check-in / Check-out",
    lblParkingInfo: "Info parcheggio",
    btnLogoUpload: "Seleziona logo",
    btnAddCategory: "Aggiungi categoria",
    modalTitle: "Catalogo Preset: Seleziona categoria e modello",
    addBtn: "Aggiungi",
    editTitle: "Titolo categoria",
    selectCategoryPrompt: "Seleziona categoria principale",
    selectPresetPrompt: "Seleziona modello preset",
    customTextLabel: "Descrizione personalizzata",
    customTextWarning: "⚠️ Questo testo rimane invariato in tutte le 10 lingue.",
    activeCard: "Mostra",
    inactiveCard: "Nascondi",
    createCustomCatBtn: "Crea categoria personalizzata"
  },
  fr: {
    welcomeBadge: "Guide numérique",
    welcomeButton: "C'est parti",
    greetingHello: "Bonjour,",
    greetingWelcome: "bienvenue.",
    navHome: "Accueil",
    navGaestemappe: "Guide",
    navReview: "Donner un avis",
    navRoute: "Itinéraire",
    weatherTitle: "Ensoleillé",
    weatherSub: "Météo actuelle",
    schnellzugriffTitle: "Accès rapide",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parking",
    breakfastTitle: "Petit-déjeuner",
    checkInOutTitle: "Arrivée / Départ",
    detailBack: "Retour",
    adminTitle: "Administration et Analyses",
    guestViewBtn: "Ouvrir la vue invité",
    saveBtn: "Enregistrer",
    savedMsg: "Enregistré !",
    trialTitle: "Essai 30 jours (PRO)",
    trialDaysLeft: "jours restants",
    statsScans: "Scans QR",
    statsActiveRooms: "Accès actifs",
    statsTopCategory: "Catégorie principale",
    statsPeakTime: "Heures de pointe",
    qrTitle: "Centre d'impression QR",
    printA4: "Modèle A4",
    printA5: "Modèle A5",
    printCard: "Carte de visite",
    sec1Title: "1. Infos et contacts",
    sec2Title: "2. Thèmes de couleurs",
    sec3Title: "3. Télécharger le logo",
    sec4Title: "4. Gestion des images",
    sec5Title: "5. Accès rapide",
    sec6Title: "6. Système de Préréglage Dynamique",
    lblHotelName: "Nom de l'établissement",
    lblPhone: "Téléphone",
    lblEmailField: "E-mail",
    lblAddress: "Adresse",
    lblWebsite: "Site web",
    lblGoogleReview: "Lien avis Google",
    lblWifiSsid: "SSID Wi-Fi",
    lblWifiPass: "Mot de passe Wi-Fi",
    lblBreakfastTime: "Heures de petit-déjeuner",
    lblCheckInOut: "Infos Check-in / Check-out",
    lblParkingInfo: "Infos parking",
    btnLogoUpload: "Choisir le logo",
    btnAddCategory: "Ajouter une catégorie",
    modalTitle: "Catalogue de Préréglages : Choisir",
    addBtn: "Ajouter",
    editTitle: "Titre de la catégorie",
    selectCategoryPrompt: "Sélectionner la catégorie principale",
    selectPresetPrompt: "Sélectionner le modèle",
    customTextLabel: "Description personnalisée",
    customTextWarning: "⚠️ Ce texte reste identique dans les 10 langues.",
    activeCard: "Afficher",
    inactiveCard: "Masquer",
    createCustomCatBtn: "Créer une catégorie personnalisée"
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
    schnellzugriffTitle: "Acceso rápido",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Aparcamiento",
    breakfastTitle: "Desayuno",
    checkInOutTitle: "Entrada / Salida",
    detailBack: "Volver",
    adminTitle: "Gestión y Analítica",
    guestViewBtn: "Abrir vista de huésped",
    saveBtn: "Guardar cambios",
    savedMsg: "¡Guardado!",
    trialTitle: "Prueba de 30 días (PRO)",
    trialDaysLeft: "días restantes",
    statsScans: "Escaneos QR",
    statsActiveRooms: "Accesos activos",
    statsTopCategory: "Categoría principal",
    statsPeakTime: "Hora punta",
    qrTitle: "Centro de impresión QR",
    printA4: "Plantilla A4",
    printA5: "Plantilla A5",
    printCard: "Tarjeta de visita",
    sec1Title: "1. Info y contactos",
    sec2Title: "2. Temas de color",
    sec3Title: "3. Subir logo",
    sec4Title: "4. Gestión de imágenes",
    sec5Title: "5. Acceso rápido",
    sec6Title: "6. Sistema de Plantillas Dinámicas",
    lblHotelName: "Nombre del alojamiento",
    lblPhone: "Teléfono",
    lblEmailField: "Correo electrónico",
    lblAddress: "Dirección",
    lblWebsite: "Sitio web",
    lblGoogleReview: "Enlace de reseñas de Google",
    lblWifiSsid: "SSID de Wi-Fi",
    lblWifiPass: "Contraseña de Wi-Fi",
    lblBreakfastTime: "Horario de desayuno",
    lblCheckInOut: "Info de entrada / salida",
    lblParkingInfo: "Info de aparcamiento",
    btnLogoUpload: "Seleccionar logo",
    btnAddCategory: "Añadir categoría",
    modalTitle: "Catálogo de Plantillas: Seleccionar",
    addBtn: "Añadir",
    editTitle: "Título de la categoría",
    selectCategoryPrompt: "Seleccionar categoría principal",
    selectPresetPrompt: "Seleccionar plantilla",
    customTextLabel: "Descripción personalizada",
    customTextWarning: "⚠️ Este texto se mantiene igual en los 10 idiomas.",
    activeCard: "Mostrar",
    inactiveCard: "Ocultar",
    createCustomCatBtn: "Crear categoría personalizada"
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
    schnellzugriffTitle: "Snabba åtgärder",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parkering",
    breakfastTitle: "Frukost",
    checkInOutTitle: "Incheckning / Utcheckning",
    detailBack: "Tillbaka",
    adminTitle: "Administration & Analys",
    guestViewBtn: "Öppna gästvy",
    saveBtn: "Spara ändringar",
    savedMsg: "Sparat!",
    trialTitle: "30 dagars provperiod (PRO)",
    trialDaysLeft: "dagar kvar",
    statsScans: "QR-skanningar",
    statsActiveRooms: "Aktiva rum",
    statsTopCategory: "Populäraste kategori",
    statsPeakTime: "Pikatid",
    qrTitle: "QR-utskriftscenter",
    printA4: "Utskrift A4",
    printA5: "Utskrift A5",
    printCard: "Visiterkort",
    sec1Title: "1. Boendeinformation",
    sec2Title: "2. Färgteman",
    sec3Title: "3. Ladda upp logotyp",
    sec4Title: "4. Bildhantering",
    sec5Title: "5. Snabbåtkomst",
    sec6Title: "6. Dynamiskt förinställningssystem",
    lblHotelName: "Boendets namn",
    lblPhone: "Telefon",
    lblEmailField: "E-post",
    lblAddress: "Adress",
    lblWebsite: "Webbplats",
    lblGoogleReview: "Google recensionslänk",
    lblWifiSsid: "Wi-Fi SSID",
    lblWifiPass: "Wi-Fi lösenord",
    lblBreakfastTime: "Frukosttider",
    lblCheckInOut: "In- / Utcheckningsinfo",
    lblParkingInfo: "Parkeringsinfo",
    btnLogoUpload: "Välj logotyp",
    btnAddCategory: "Lägg till kategori",
    modalTitle: "Förinställningskatalog: Välj",
    addBtn: "Lägg till",
    editTitle: "Kategorititel",
    selectCategoryPrompt: "Välj huvudkategori",
    selectPresetPrompt: "Välj förinställningsmall",
    customTextLabel: "Anpassad beskrivning",
    customTextWarning: "⚠️ Denna text förblir oförändrad på alla 10 språk.",
    activeCard: "Visa",
    inactiveCard: "Dölj",
    createCustomCatBtn: "Skapa anpassad kategori"
  },
  no: {
    welcomeBadge: "Digital gjesteguide",
    welcomeButton: "Sett i gang",
    greetingHello: "Hei,",
    greetingWelcome: "velkommen.",
    navHome: "Hjem",
    navGaestemappe: "Guide",
    navReview: "Gi tilbakemelding",
    navRoute: "Rute",
    weatherTitle: "Sol",
    weatherSub: "Aktuelt vær",
    schnellzugriffTitle: "Hurtigtilgang",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parkering",
    breakfastTitle: "Frokost",
    checkInOutTitle: "Inn- / Utsjekking",
    detailBack: "Tilbake",
    adminTitle: "Administrasjon og Analyse",
    guestViewBtn: "Åpne gjestevisning",
    saveBtn: "Lagre endringer",
    savedMsg: "Lagret!",
    trialTitle: "30 dagers prøveperiode (PRO)",
    trialDaysLeft: "dager igjen",
    statsScans: "QR-skanninger",
    statsActiveRooms: "Aktive rom",
    statsTopCategory: "Toppkategori",
    statsPeakTime: "Mest aktiv tid",
    qrTitle: "QR-utskriftssenter",
    printA4: "Utskrift A4",
    printA5: "Utskrift A5",
    printCard: "Visittkort",
    sec1Title: "1. Boliginformasjon",
    sec2Title: "2. Fargetemaer",
    sec3Title: "3. Last opp logo",
    sec4Title: "4. Bildebehandling",
    sec5Title: "5. Hurtigtilgang",
    sec6Title: "6. Dynamisk forhåndsinnstilt system",
    lblHotelName: "Boligens navn",
    lblPhone: "Telefon",
    lblEmailField: "E-post",
    lblAddress: "Adresse",
    lblWebsite: "Nettsted",
    lblGoogleReview: "Google Omtale-link",
    lblWifiSsid: "Wi-Fi SSID",
    lblWifiPass: "Wi-Fi passord",
    lblBreakfastTime: "Frokosttider",
    lblCheckInOut: "Inn- / Utsjekk info",
    lblParkingInfo: "Parkeringsinfo",
    btnLogoUpload: "Velg logo",
    btnAddCategory: "Legg till kategori",
    modalTitle: "Forhåndsinnstilt katalog: Velg",
    addBtn: "Legg til",
    editTitle: "Kategoritittel",
    selectCategoryPrompt: "Velg hovedkategori",
    selectPresetPrompt: "Velg mal",
    customTextLabel: "Egendefinert beskrivelse",
    customTextWarning: "⚠️ Denne teksten forblir uendret på alle 10 språk.",
    activeCard: "Vis",
    inactiveCard: "Skjul",
    createCustomCatBtn: "Opprett egendefinert kategori"
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
    schnellzugriffTitle: "Brzi pristup",
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
    selectCategoryPrompt: "Odaberi glavnu kategoriju",
    selectPresetPrompt: "Odaberi predložak",
    customTextLabel: "Prilagođeni opis",
    customTextWarning: "⚠️ Ovaj tekst ostaje neizmijenjen na svih 10 jezika.",
    activeCard: "Prikaži",
    inactiveCard: "Sakrij",
    createCustomCatBtn: "Stvori prilagođenu kategoriju"
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
    schnellzugriffTitle: "Qasje e shpejtë",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parkimi",
    breakfastTitle: "Mëngjesi",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Kthehu prapa",
    adminTitle: "Administrimi dhe Analitika",
    guestViewBtn: "Hap pamjen e mysafirit",
    saveBtn: "Ruaj ndryshimet",
    savedMsg: "U ruajt!",
    logoutBtn: "Dil",
    trialTitle: "Provë 30-ditore (PRO)",
    trialDaysLeft: "ditë të mbetura",
    statsScans: "Skanime QR",
    statsActiveRooms: "Dhoma aktive",
    statsTopCategory: "Kategoria kryesore",
    statsPeakTime: "Orari i pikut",
    qrTitle: "Qendra e printimit QR",
    printA4: "Modeli A4",
    printA5: "Modeli A5",
    printCard: "Kard vizite",
    sec1Title: "1. Informacioni i pronës",
    sec2Title: "2. Temat e ngjyrave",
    sec3Title: "3. Ngarko logon",
    sec4Title: "4. Menaxhimi i imazheve",
    sec5Title: "5. Qasja e shpejtë",
    sec6Title: "6. Sistemi i shablloneve dinamike",
    lblHotelName: "Emri i pronës",
    lblPhone: "Telefoni",
    lblEmailField: "E-mail",
    lblAddress: "Adresa",
    lblWebsite: "Faqja e internetit",
    lblGoogleReview: "Linku i vlerësimeve Google",
    lblWifiSsid: "Wi-Fi SSID",
    lblWifiPass: "Fjalëkalimi Wi-Fi",
    lblBreakfastTime: "Orari i mëngjesit",
    lblCheckInOut: "Info Check-in / Check-out",
    lblParkingInfo: "Info e parkimit",
    btnLogoUpload: "Zgjidh logo",
    btnAddCategory: "Shto kategori",
    modalTitle: "Katalogu i shablloneve: Zgjidh",
    addBtn: "Shto",
    editTitle: "Titulli i kategorisë",
    selectCategoryPrompt: "Zgjidh kategorinë kryesore",
    selectPresetPrompt: "Zgjidh shabllonin",
    customTextLabel: "Përshkrim i personalizuar",
    customTextWarning: "⚠️ Ky tekst mbetet i njëjtë në të 10 gjuhët.",
    activeCard: "Shfaq",
    inactiveCard: "Fshih",
    createCustomCatBtn: "Krijo kategori të personalizuar"
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

// --- 8 MAIN CATEGORIES & 47 PREDEFINED PRESETS WITH UNIQUE DYNAMIC FIELD SCHEMAS ---
const mainCategories = [
  { id: 'cat_hotel', name: { de: 'Hotel & Unterkunft', en: 'Hotel & Accommodation', tr: 'Otel & Konaklama' }, icon: 'Building' },
  { id: 'cat_food', name: { de: 'Essen & Trinken', en: 'Food & Drinks', tr: 'Yeme & İçme' }, icon: 'Utensils' },
  { id: 'cat_wellness', name: { de: 'Wellness & Spa', en: 'Wellness & Spa', tr: 'Wellness & Spa' }, icon: 'Waves' },
  { id: 'cat_leisure', name: { de: 'Freizeit & Aktivitäten', en: 'Leisure & Activities', tr: 'Eğlence & Aktiviteler' }, icon: 'Compass' },
  { id: 'cat_surroundings', name: { de: 'Umgebung & Ausflüge', en: 'Surroundings & Excursions', tr: 'Çevre & Geziler' }, icon: 'MapPin' },
  { id: 'cat_mobility', name: { de: 'Anreise & Mobilität', en: 'Arrival & Mobility', tr: 'Ulaşım & Mobilite' }, icon: 'Car' },
  { id: 'cat_service', name: { de: 'Service & Informationen', en: 'Service & Information', tr: 'Servis & Bilgiler' }, icon: 'Phone' },
  { id: 'cat_safety', name: { de: 'Regeln & Sicherheit', en: 'Rules & Safety', tr: 'Kurallar & Güvenlik' }, icon: 'ShieldCheck' }
];

const categoryPresets = [
  // CATEGORY 1: Hotel & Unterkunft
  { id: 'hotel_info', categoryId: 'cat_hotel', icon: 'Building', title: { de: 'Hotelinformationen', en: 'Hotel Information', tr: 'Otel Bilgileri' }, schema: [
    { key: 'reception_hours', type: 'text', label: { de: 'Rezeptionszeiten', en: 'Reception Hours', tr: 'Resepsiyon Saatleri' }, default: '07:00 - 22:00 Uhr' },
    { key: 'emergency_phone', type: 'text', label: { de: 'Notfallnummer', en: 'Emergency Phone', tr: 'Acil Durum Telefonu' }, default: '+49 123 456789' },
    { key: 'multilingual_staff', type: 'boolean', label: { de: 'Mehrsprachiges Personal', en: 'Multilingual Staff', tr: 'Çok Dilli Personel' }, default: true }
  ]},
  { id: 'room_info', categoryId: 'cat_hotel', icon: 'Bed', title: { de: 'Zimmerinformationen', en: 'Room Information', tr: 'Oda Bilgileri' }, schema: [
    { key: 'room_features', type: 'multiselect', label: { de: 'Zimmerausstattung', en: 'Room Features', tr: 'Oda Özellikleri' }, options: ['Safe', 'Klimaanlage', 'Flachbild-TV', 'Haartrockner', 'Kaffeemaschine'], default: ['Safe', 'Klimaanlage', 'Flachbild-TV'] },
    { key: 'balcony_status', type: 'boolean', label: { de: 'Balkon / Terrasse', en: 'Balcony / Terrace', tr: 'Balkon / Teras' }, default: false }
  ]},
  { id: 'wifi_internet', categoryId: 'cat_hotel', icon: 'Wifi', title: { de: 'WLAN & Internet', en: 'WiFi & Internet', tr: 'WLAN & İnternet' }, schema: [
    { key: 'wifi_available', type: 'boolean', label: { de: 'WLAN verfügbar', en: 'WiFi Available', tr: 'WLAN Mevcut' }, default: true },
    { key: 'network_name', type: 'text', label: { de: 'Netzwerkname (SSID)', en: 'Network Name (SSID)', tr: 'Ağ Adı (SSID)' }, default: 'Hotel-Guest-WiFi' },
    { key: 'wifi_password', type: 'text', label: { de: 'Passwort', en: 'Password', tr: 'Şifre' }, default: 'welcome2026' },
    { key: 'coverage', type: 'select', label: { de: 'Verfügbarkeit', en: 'Coverage', tr: 'Kapsama Alanı' }, options: ['Gesamtes Hotel', 'Gästezimmer', 'Öffentliche Bereiche'], default: 'Gesamtes Hotel' }
  ]},
  { id: 'checkin_checkout', categoryId: 'cat_hotel', icon: 'Clock', title: { de: 'Check-in & Check-out', en: 'Check-in & Check-out', tr: 'Giriş & Çıkış' }, schema: [
    { key: 'checkin_time', type: 'text', label: { de: 'Check-in-Zeit', en: 'Check-in Time', tr: 'Giriş Saati' }, default: 'ab 15:00 Uhr' },
    { key: 'checkout_time', type: 'text', label: { de: 'Check-out-Zeit', en: 'Check-out Time', tr: 'Çıkış Saati' }, default: 'bis 11:00 Uhr' },
    { key: 'express_checkout', type: 'boolean', label: { de: 'Express Check-out', en: 'Express Check-out', tr: 'Hızlı Çıkış' }, default: true }
  ]},
  { id: 'room_keys', categoryId: 'cat_hotel', icon: 'Key', title: { de: 'Zimmerschlüssel & Zugang', en: 'Room Keys & Access', tr: 'Oda Anahtarları & Erişim' }, schema: [
    { key: 'key_type', type: 'select', label: { de: 'Schlüsseltyp', en: 'Key Type', tr: 'Anahtar Tipi' }, options: ['Elektronische Schlüsselkarte', 'PIN-Code / Smart Lock', 'Klassischer Schlüssel'], default: 'Elektronische Schlüsselkarte' },
    { key: 'night_entrance', type: 'boolean', label: { de: 'Nachteingang per Karte', en: 'Night Entrance via Card', tr: 'Kart ile Gece Girişi' }, default: true }
  ]},
  { id: 'hotel_amenities', categoryId: 'cat_hotel', icon: 'Sparkles', title: { de: 'Hotelausstattung', en: 'Hotel Amenities', tr: 'Otel Donanımı' }, schema: [
    { key: 'amenities_list', type: 'multiselect', label: { de: 'Ausstattung', en: 'Amenities', tr: 'Donanım' }, options: ['Aufzug', 'Gepäckaufbewahrung', 'Lobby-Bar', 'Garten / Terrasse'], default: ['Aufzug', 'Gepäckaufbewahrung'] }
  ]},
  { id: 'heating_ac', categoryId: 'cat_hotel', icon: 'Sun', title: { de: 'Heizung & Klimaanlage', en: 'Heating & AC', tr: 'Isıtma & Klima' }, schema: [
    { key: 'ac_control', type: 'select', label: { de: 'Regelung', en: 'Control', tr: 'Kontrol' }, options: ['Individuell im Zimmer', 'Zentral gesteuert'], default: 'Individuell im Zimmer' }
  ]},

  // CATEGORY 2: Essen & Trinken
  { id: 'breakfast', categoryId: 'cat_food', icon: 'Coffee', title: { de: 'Frühstück', en: 'Breakfast', tr: 'Kahvaltı' }, schema: [
    { key: 'breakfast_hours', type: 'text', label: { de: 'Frühstückszeiten', en: 'Breakfast Hours', tr: 'Kahvaltı Saatleri' }, default: '07:00 - 10:30 Uhr' },
    { key: 'breakfast_type', type: 'select', label: { de: 'Frühstücksart', en: 'Breakfast Type', tr: 'Kahvaltı Türü' }, options: ['Reichhaltiges Buffet', 'Kontinental', 'À la carte'], default: 'Reichhaltiges Buffet' },
    { key: 'location', type: 'text', label: { de: 'Frühstücksort', en: 'Location', tr: 'Konum' }, default: 'Hauptrestaurant (Erdgeschoss)' }
  ]},
  { id: 'restaurant', categoryId: 'cat_food', icon: 'Utensils', title: { de: 'Restaurant', en: 'Restaurant', tr: 'Restoran' }, schema: [
    { key: 'kitchen_hours', type: 'text', label: { de: 'Küchenzeiten', en: 'Kitchen Hours', tr: 'Mutfak Saatleri' }, default: '18:00 - 22:00 Uhr' },
    { key: 'cuisine_style', type: 'text', label: { de: 'Küchenstil', en: 'Cuisine Style', tr: 'Mutfak Tarzı' }, default: 'Regionale & Internationale Küche' }
  ]},
  { id: 'bar_lounge', categoryId: 'cat_food', icon: 'Wine', title: { de: 'Bar & Lounge', en: 'Bar & Lounge', tr: 'Bar & Lounge' }, schema: [
    { key: 'bar_hours', type: 'text', label: { de: 'Öffnungszeiten Bar', en: 'Bar Hours', tr: 'Bar Saatleri' }, default: '17:00 - 01:00 Uhr' },
    { key: 'snacks_available', type: 'boolean', label: { de: 'Kleine Snacks verfügbar', en: 'Snacks Available', tr: 'Atıştırmalıklar Mevcut' }, default: true }
  ]},
  { id: 'cafe', categoryId: 'cat_food', icon: 'Coffee', title: { de: 'Café', en: 'Café', tr: 'Kafe' }, schema: [
    { key: 'cafe_hours', type: 'text', label: { de: 'Öffnungszeiten Café', en: 'Café Hours', tr: 'Kafe Saatleri' }, default: '14:00 - 18:00 Uhr' },
    { key: 'pastry_selection', type: 'boolean', label: { de: 'Hausgemachter Kuchen', en: 'Homemade Pastries', tr: 'Ev Yapımı Pastalar' }, default: true }
  ]},
  { id: 'snacks_drinks', categoryId: 'cat_food', icon: 'ShoppingCart', title: { de: 'Snacks & Getränke', en: 'Snacks & Drinks', tr: 'Atıştırmalıklar & İçecekler' }, schema: [
    { key: 'vending_machine', type: 'boolean', label: { de: 'Getränkeautomat im Haus', en: 'Vending Machine', tr: 'Otomat' }, default: true }
  ]},
  { id: 'allergens', categoryId: 'cat_food', icon: 'HelpCircle', title: { de: 'Allergene & Ernährungsinformationen', en: 'Allergens & Nutrition', tr: 'Alerjenler & Beslenme Bilgileri' }, schema: [
    { key: 'vegan_options', type: 'boolean', label: { de: 'Vegane / Glutenfreie Optionen', en: 'Vegan & Gluten-Free Options', tr: 'Vegan & Glütensiz Seçenekler' }, default: true },
    { key: 'allergen_chart', type: 'text', label: { de: 'Hinweis zu Allergenen', en: 'Allergen Info', tr: 'Alerjen Bilgisi' }, default: 'Eine Allergiekarte erhalten Sie auf Anfrage im Restaurant.' }
  ]},

  // CATEGORY 3: Wellness & Spa
  { id: 'pool_aqua', categoryId: 'cat_wellness', icon: 'Waves', title: { de: 'Pool & Aqua', en: 'Pool & Aqua', tr: 'Havuz & Aqua' }, schema: [
    { key: 'pool_hours', type: 'text', label: { de: 'Öffnungszeiten', en: 'Opening Hours', tr: 'Çalışma Saatleri' }, default: '07:00 - 21:00 Uhr' },
    { key: 'water_temp', type: 'text', label: { de: 'Wassertemperatur', en: 'Water Temperature', tr: 'Su Sıcaklığı' }, default: '28°C' },
    { key: 'pool_type', type: 'select', label: { de: 'Pooltyp', en: 'Pool Type', tr: 'Havuz Türü' }, options: ['Indoor', 'Outdoor', 'Indoor & Outdoor', 'Kinderbecken'], default: 'Indoor' }
  ]},
  { id: 'sauna', categoryId: 'cat_wellness', icon: 'Sparkles', title: { de: 'Sauna', en: 'Sauna', tr: 'Sauna' }, schema: [
    { key: 'sauna_hours', type: 'text', label: { de: 'Saunazeiten', en: 'Sauna Hours', tr: 'Sauna Saatleri' }, default: '15:00 - 21:00 Uhr' },
    { key: 'sauna_types', type: 'multiselect', label: { de: 'Saunatypen', en: 'Sauna Types', tr: 'Sauna Türleri' }, options: ['Finnische Sauna', 'Bio-Sauna', 'Dampfbad', 'Infrarotkabine'], default: ['Finnische Sauna', 'Dampfbad'] }
  ]},
  { id: 'spa_wellness', categoryId: 'cat_wellness', icon: 'Heart', title: { de: 'Spa & Wellness', en: 'Spa & Wellness', tr: 'Spa & Wellness' }, schema: [
    { key: 'booking_info', type: 'text', label: { de: 'Massage & Behandlungen Buchung', en: 'Massage Booking Info', tr: 'Masaj Rezervasyon Bilgisi' }, default: 'Termine bitte direkt an der Rezeption vereinbaren.' }
  ]},
  { id: 'fitness_center', categoryId: 'cat_wellness', icon: 'Dumbbell', title: { de: 'Fitness Center', en: 'Fitness Center', tr: 'Fitness Merkezi' }, schema: [
    { key: 'fitness_hours', type: 'text', label: { de: 'Öffnungszeiten Fitness', en: 'Fitness Hours', tr: 'Fitness Saatleri' }, default: '06:00 - 22:00 Uhr' },
    { key: 'equipment', type: 'multiselect', label: { de: 'Ausstattung', en: 'Equipment', tr: 'Ekipmanlar' }, options: ['Cardio-Geräte', 'Hanteln', 'Yogamatten'], default: ['Cardio-Geräte', 'Hanteln'] }
  ]},
  { id: 'wellness_rules', categoryId: 'cat_wellness', icon: 'ShieldCheck', title: { de: 'Wellness-Regeln', en: 'Wellness Rules', tr: 'Wellness Kuralları' }, schema: [
    { key: ' bathrobe_policy', type: 'text', label: { de: 'Bademantel-Pflicht', en: 'Bathrobe Policy', tr: 'Bornoz Kuralı' }, default: 'Bitte tragen Sie im Wellnessbereich Bademäntel (auf dem Zimmer bereitgestellt).' }
  ]},

  // CATEGORY 4: Freizeit & Aktivitäten
  { id: 'bike_rental', categoryId: 'cat_leisure', icon: 'Compass', title: { de: 'Fahrradverleih', en: 'Bike Rental', tr: 'Bisiklet Kiralama' }, schema: [
    { key: 'bike_types', type: 'multiselect', label: { de: 'Verfügbare Räder', en: 'Available Bikes', tr: 'Mevcut Bisikletler' }, options: ['E-Bikes', 'Trekkingbikes', 'Citybikes'], default: ['E-Bikes', 'Trekkingbikes'] },
    { key: 'helmet_included', type: 'boolean', label: { de: 'Helme inklusive', en: 'Helmets Included', tr: 'Kask Dahil' }, default: true }
  ]},
  { id: 'sports_activities', categoryId: 'cat_leisure', icon: 'Activity', title: { de: 'Sport & Aktivitäten', en: 'Sports & Activities', tr: 'Spor & Aktiviteler' }, schema: [
    { key: 'activities', type: 'text', label: { de: 'Angebotene Sportarten', en: 'Sports Offered', tr: 'Sunulan Sporlar' }, default: 'Tennisplatz in der Nähe, geführte Wanderungen.' }
  ]},
  { id: 'kids_offers', categoryId: 'cat_leisure', icon: 'Smile', title: { de: 'Kinderangebote', en: 'Kids Offers', tr: 'Çocuk Aktiviteleri' }, schema: [
    { key: 'playground', type: 'boolean', label: { de: 'Kinderspielplatz', en: 'Children Playground', tr: 'Çocuk Oyun Parkı' }, default: true }
  ]},
  { id: 'events', categoryId: 'cat_leisure', icon: 'Calendar', title: { de: 'Events & Veranstaltungen', en: 'Events', tr: 'Etkinlikler' }, schema: [
    { key: 'event_info', type: 'text', label: { de: 'Aktuelle Hinweise', en: 'Current Info', tr: 'Güncel Bilgiler' }, default: 'Wöchentlicher Weinabend in der Lounge.' }
  ]},
  { id: 'playroom', categoryId: 'cat_leisure', icon: 'Tv', title: { de: 'Spielzimmer', en: 'Playroom', tr: 'Oyun Odası' }, schema: [
    { key: 'playroom_hours', type: 'text', label: { de: 'Öffnungszeiten Spielzimmer', en: 'Playroom Hours', tr: 'Oyun Odası Saatleri' }, default: '09:00 - 20:00 Uhr' }
  ]},
  { id: 'yoga_meditation', categoryId: 'cat_leisure', icon: 'Heart', title: { de: 'Yoga & Meditation', en: 'Yoga & Meditation', tr: 'Yoga & Meditasyon' }, schema: [
    { key: 'yoga_info', type: 'text', label: { de: 'Kurse', en: 'Classes', tr: 'Kurslar' }, default: 'Morgen-Yoga auf der Dachterrasse (nach Anmeldung).' }
  ]},

  // CATEGORY 5: Umgebung & Ausflüge
  { id: 'sights', categoryId: 'cat_surroundings', icon: 'MapPin', title: { de: 'Sehenswürdigkeiten', en: 'Sights', tr: 'Görülecek Yerler' }, schema: [
    { key: 'top_sights', type: 'text', label: { de: 'Top-Empfehlungen', en: 'Top Recommendations', tr: 'En İyi Öneriler' }, default: 'Historische Altstadt, Schloss und lokale Museen.' }
  ]},
  { id: 'nearby_restaurants', categoryId: 'cat_surroundings', icon: 'Utensils', title: { de: 'Restaurants in der Umgebung', en: 'Nearby Restaurants', tr: 'Çevredeki Restoranlar' }, schema: [
    { key: 'restaurant_tips', type: 'text', label: { de: 'Empfehlungen', en: 'Recommendations', tr: 'Öneriler' }, default: 'Traditionelle Gasthöfe fußläufig erreichbar.' }
  ]},
  { id: 'hiking_trails', categoryId: 'cat_surroundings', icon: 'Map', title: { de: 'Wanderwege', en: 'Hiking Trails', tr: 'Yürüyüş Yolları' }, schema: [
    { key: 'trail_info', type: 'text', label: { de: 'Wanderkarten', en: 'Trail Maps', tr: 'Yürüyüş Haritaları' }, default: 'Wanderkarten erhalten Sie kostenfrei an der Rezeption.' }
  ]},
  { id: 'excursion_destinations', categoryId: 'cat_surroundings', icon: 'Compass', title: { de: 'Ausflugsziele', en: 'Excursion Destinations', tr: 'Gezilecek Yerler' }, schema: [
    { key: 'destinations', type: 'text', label: { de: 'Beliebte Ausflugsziele', en: 'Popular Destinations', tr: 'Popüler Destinasyonlar' }, default: 'Naturpark, Seen und Aussichtspunkte in der Region.' }
  ]},
  { id: 'shopping', categoryId: 'cat_surroundings', icon: 'ShoppingBag', title: { de: 'Shopping & Einkaufsmöglichkeiten', en: 'Shopping', tr: 'Alışveriş' }, schema: [
    { key: 'shopping_info', type: 'text', label: { de: 'Einkaufszentren & Boutiquen', en: 'Malls & Boutiques', tr: 'Mağazalar' }, default: 'Fußgängerzone nur 5 Gehminuten entfernt.' }
  ]},

  // CATEGORY 6: Anreise & Mobilität
  { id: 'parking', categoryId: 'cat_mobility', icon: 'Car', title: { de: 'Parkmöglichkeiten', en: 'Parking', tr: 'Otopark İmkanları' }, schema: [
    { key: 'parking_type', type: 'select', label: { de: 'Parkplatztyp', en: 'Parking Type', tr: 'Otopark Türü' }, options: ['Kostenfreie Parkplätze am Haus', 'Tiefgarage', 'Öffentliches Parkhaus'], default: 'Kostenfreie Parkplätze am Haus' },
    { key: 'reservation_needed', type: 'boolean', label: { de: 'Reservierung erforderlich', en: 'Reservation Required', tr: 'Rezervasyon Gerekli' }, default: false }
  ]},
  { id: 'taxi_info', categoryId: 'cat_mobility', icon: 'Phone', title: { de: 'Taxi-Informationen', en: 'Taxi Information', tr: 'Taksi Bilgileri' }, schema: [
    { key: 'taxi_service', type: 'text', label: { de: 'Lokales Taxiunternehmen', en: 'Local Taxi Service', tr: 'Yerel Taksi Servisi' }, default: 'Taxi Zentrale: +49 555 123456 (Rezeption ruft gerne für Sie an)' }
  ]},
  { id: 'public_transport', categoryId: 'cat_mobility', icon: 'Bus', title: { de: 'Öffentliche Verkehrsmittel', en: 'Public Transport', tr: 'Toplu Taşıma' }, schema: [
    { key: 'bus_stop', type: 'text', label: { de: 'Nächste Haltestelle', en: 'Nearest Stop', tr: 'En Yakın Durak' }, default: 'Bushaltestelle "Stadtmitte" (200m vom Hotel).' }
  ]},
  { id: 'train_station', categoryId: 'cat_mobility', icon: 'Navigation', title: { de: 'Bahnhof & Zugverbindungen', en: 'Train Station', tr: 'Tren İstasyonu' }, schema: [
    { key: 'station_distance', type: 'text', label: { de: 'Entfernung zum Bahnhof', en: 'Distance to Station', tr: 'İstasyona Mesafe' }, default: 'Hauptbahnhof 1.5 km entfernt (Buslinie 5).' }
  ]},
  { id: 'ev_charging', categoryId: 'cat_mobility', icon: 'Zap', title: { de: 'E-Ladestationen', en: 'EV Charging', tr: 'Elektrikli Araç Şarj İstasyonu' }, schema: [
    { key: 'ev_available', type: 'boolean', label: { de: 'E-Ladesäulen am Hotel', en: 'EV Charger Available', tr: 'Şarj İstasyonu Mevcut' }, default: true },
    { key: 'ev_power', type: 'text', label: { de: 'Ladeleistung', en: 'Charging Power', tr: 'Şarj Gücü' }, default: '22 kW Typ 2 Stecker' }
  ]},
  { id: 'airport', categoryId: 'cat_mobility', icon: 'Plane', title: { de: 'Flughafeninformationen', en: 'Airport Information', tr: 'Havalimanı Bilgileri' }, schema: [
    { key: 'airport_distance', type: 'text', label: { de: 'Nächster Flughafen', en: 'Nearest Airport', tr: 'En Yakın Havalimanı' }, default: 'Flughafen ca. 45 km entfernt (Shuttle auf Anfrage).' }
  ]},

  // CATEGORY 7: Service & Informationen
  { id: 'reception', categoryId: 'cat_service', icon: 'Phone', title: { de: 'Rezeption', en: 'Reception', tr: 'Resepsiyon' }, schema: [
    { key: 'reception_phone', type: 'text', label: { de: 'Durchwahl vom Zimmer', en: 'Room Extension', tr: 'Oda Dahili Numarası' }, default: 'Wählen Sie "9" von Ihrem Zimmertelefon.' }
  ]},
  { id: 'luggage_storage', categoryId: 'cat_service', icon: 'ShoppingBag', title: { de: 'Gepäckaufbewahrung', en: 'Luggage Storage', tr: 'Bagaj Muhafazası' }, schema: [
    { key: 'storage_free', type: 'boolean', label: { de: 'Kostenfrei für Gäste', en: 'Free for Guests', tr: 'Misafirler İçin Ücretsiz' }, default: true }
  ]},
  { id: 'laundry_service', categoryId: 'cat_service', icon: 'Scissors', title: { de: 'Wäscheservice', en: 'Laundry Service', tr: 'Çamaşır Servisi' }, schema: [
    { key: 'laundry_info', type: 'text', label: { de: 'Abgabe & Zeiten', en: 'Drop-off & Times', tr: 'Teslim & Saatler' }, default: 'Wäschesack auf dem Zimmer; Abgabe bis 09:00 Uhr an der Rezeption.' }
  ]},
  { id: 'housekeeping', categoryId: 'cat_service', icon: 'Home', title: { de: 'Housekeeping & Zimmerreinigung', en: 'Housekeeping', tr: 'Oda Temizliği' }, schema: [
    { key: 'cleaning_time', type: 'text', label: { de: 'Reinigungszeiten', en: 'Cleaning Hours', tr: 'Temizlik Saatleri' }, default: 'Täglich von 09:00 bis 15:00 Uhr.' }
  ]},
  { id: 'doctor_pharmacy', categoryId: 'cat_service', icon: 'Stethoscope', title: { de: 'Arzt & Apotheke', en: 'Doctor & Pharmacy', tr: 'Doktor & Eczane' }, schema: [
    { key: 'pharmacy_info', type: 'text', label: { de: 'Nächste Apotheke', en: 'Nearest Pharmacy', tr: 'En Yakın Eczane' }, default: 'Rats-Apotheke, Hauptstraße 10 (500m).' }
  ]},
  { id: 'emergency_info', categoryId: 'cat_service', icon: 'AlertCircle', title: { de: 'Notfallinformationen', en: 'Emergency Info', tr: 'Acil Durum Bilgileri' }, schema: [
    { key: 'emergency_numbers', type: 'text', label: { de: 'Wichtige Nummern', en: 'Important Numbers', tr: 'Önemli Numaralar' }, default: 'Polizei: 110 | Feuerwehr / Rettungsdienst: 112' }
  ]},

  // CATEGORY 8: Regeln & Sicherheit
  { id: 'house_rules_safety', categoryId: 'cat_safety', icon: 'Scroll', title: { de: 'Hausordnung', en: 'House Rules', tr: 'Ev Kuralları' }, schema: [
    { key: 'quiet_hours', type: 'text', label: { de: 'Nachtruhe', en: 'Quiet Hours', tr: 'Sessizlik Saati' }, default: '22:00 bis 07:00 Uhr' }
  ]},
  { id: 'pets', categoryId: 'cat_safety', icon: 'Heart', title: { de: 'Haustiere', en: 'Pets', tr: 'Evcil Hayvanlar' }, schema: [
    { key: 'pets_allowed', type: 'select', label: { de: 'Haustierregelung', en: 'Pet Policy', tr: 'Evcil Hayvan Politikası' }, options: ['Erlaubt (auf Anfrage)', 'Nicht erlaubt'], default: 'Erlaubt (auf Anfrage)' }
  ]},
  { id: 'smoking_policy', categoryId: 'cat_safety', icon: 'Flame', title: { de: 'Raucherregelungen', en: 'Smoking Policy', tr: 'Sigara İçme Politikası' }, schema: [
    { key: 'smoke_free', type: 'boolean', label: { de: '100% Nichtraucherhotel', en: '100% Non-Smoking Hotel', tr: '%100 Sigara İçilmeyen Otel' }, default: true }
  ]},
  { id: 'fire_safety', categoryId: 'cat_safety', icon: 'Flame', title: { de: 'Brandschutz', en: 'Fire Safety', tr: 'Yangın Güvenliği' }, schema: [
    { key: 'exit_info', type: 'text', label: { de: 'Fluchtwege', en: 'Escape Routes', tr: 'Acil Çıkış Yolları' }, default: 'Bitte beachten Sie den Fluchtwegebahnplan an Ihrer Zimmertür.' }
  ]},
  { id: 'accessibility', categoryId: 'cat_safety', icon: 'Accessibility', title: { de: 'Barrierefreiheit', en: 'Accessibility', tr: 'Engelsiz Erişim' }, schema: [
    { key: 'wheelchair_accessible', type: 'boolean', label: { de: 'Barrierefreie Zimmer verfügbar', en: 'Accessible Rooms Available', tr: 'Engelsiz Oda Mevcut' }, default: true }
  ]},
  { id: 'recycling', categoryId: 'cat_safety', icon: 'Recycle', title: { de: 'Mülltrennung & Recycling', en: 'Recycling', tr: 'Geri Dönüşüm' }, schema: [
    { key: 'recycling_info', type: 'text', label: { de: 'Hinweise zur Mülltrennung', en: 'Recycling Info', tr: 'Geri Dönüşüm Bilgisi' }, default: 'Wir trennen Papier, Glas und Bio-Müll. Entsprechende Behälter stehen bereit.' }
  ]}
];

// --- DYNAMIC FORM RENDERER COMPONENT ---
const DynamicFormRenderer = ({ presetSchema, fieldValues, onChangeField, currentTheme }) => {
  if (!presetSchema || !Array.isArray(presetSchema)) return null;

  return (
    <div className="space-y-3 bg-white p-4 rounded-2xl border border-stone-200">
      {presetSchema.map((field) => {
        const val = fieldValues[field.key] !== undefined ? fieldValues[field.key] : field.default;
        const label = (field.label && (field.label.de || field.label.en)) || field.key;

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
      console.error("Supabase kayıt hatası (Local fallback aktif):", err);
      localStorage.setItem('gm24_hotel', JSON.stringify(hotel));
      localStorage.setItem('gm24_categories', JSON.stringify(categories));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const hotelSlug = hotel.name ? hotel.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'hotel';
  const hotelUrl = `https://gastemappe24-pro.vercel.app/?hotel=${hotelSlug}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(hotelUrl)}`;

  const handlePrint = (format) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>QR-Code ${format} - ${hotel.name}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 40px; color: #1e293b; }
            .card { border: 2px solid #e2e8f0; border-radius: 24px; padding: 32px; max-width: 450px; margin: 0 auto; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
            .logo { max-height: 60px; margin-bottom: 12px; border-radius: 12px; }
            h1 { font-size: 22px; margin: 8px 0 4px 0; color: #0f172a; }
            p.sub { color: #64748b; font-size: 13px; margin-bottom: 20px; }
            .qr-img { width: 180px; height: 180px; margin: 16px 0; border: 8px solid #f8fafc; border-radius: 16px; }
            .info-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px; margin-top: 20px; text-align: left; font-size: 12px; line-height: 1.6; }
            .info-box strong { color: #0f172a; }
          </style>
        </head>
        <body>
          <div class="card">
            ${hotel.logoUrl ? `<img src="${hotel.logoUrl}" class="logo" />` : ''}
            <h1>${hotel.name}</h1>
            <p class="sub">Digitale Gästemappe / Digital Guest Directory</p>
            <img src="${qrCodeUrl}" class="qr-img" />
            <p style="font-size: 12px; font-weight: bold; color: ${currentTheme.hex};">Scannen Sie den QR-Code für alle Infos & Services</p>
            <div class="info-box">
              ${hotel.address ? `<div><strong>Adresse:</strong> ${hotel.address}</div>` : ''}
              ${hotel.phone ? `<div><strong>Telefon:</strong> ${hotel.phone}</div>` : ''}
              ${hotel.email ? `<div><strong>E-Mail:</strong> ${hotel.email}</div>` : ''}
              ${hotel.wifiSsid ? `<div style="margin-top:6px; padding-top:6px; border-top: 1px dashed #cbd5e1;"><strong>WLAN:</strong> ${hotel.wifiSsid} | <strong>Pass:</strong> ${hotel.wifiPass}</div>` : ''}
            </div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleAddPresetCategory = (presetObj) => {
    if (!presetObj) return;
    
    // Initialize default field values from schema
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
      case 'Zap': return <Sun className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Accessibility': return <Accessibility className={className} />;
      case 'Recycle': return <Recycle className={className} />;
      case 'Stethoscope': return <Stethoscope className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'Scroll': return <Scroll className={className} />;
      case 'Map': return ;
      case 'Bus': return <Bus className={className} />;
      case 'Plane': return <Plane className={className} />;
      case 'Smile': return <Smile className={className} />;
      case 'Tv': return <Tv className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'Activity': return <Activity className={className} />;
      default: return <Info className={className} />;
    }
  };

  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] font-sans text-slate-800 p-6 md:p-10 space-y-8 relative pb-28">
        
        {/* Katalog Modal */}
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

          {/* İstatistik & Analitik Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-stone-400">
                <span className="text-[10px] uppercase font-bold tracking-wider">{t.statsScans}</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black">{scanCount}</div>
              <span className="text-[10px] text-emerald-400 font-semibold">↑ +18% diese Woche</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-stone-500">
                <span className="text-[10px] uppercase font-bold tracking-wider">{t.statsActiveRooms}</span>
                <Users className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{activeRooms} / 15</div>
              <span className="text-[10px] text-stone-400">80% Auslastung</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-stone-500">
                <span className="text-[10px] uppercase font-bold tracking-wider">{t.statsTopCategory}</span>
                <Activity className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-sm font-extrabold text-slate-900 truncate">Restaurant & Bar</div>
              <span className="text-[10px] text-stone-400">42 Aufrufe heute</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-stone-500">
                <span className="text-[10px] uppercase font-bold tracking-wider">{t.statsPeakTime}</span>
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-sm font-extrabold text-slate-900">08:00 - 10:00 Uhr</div>
              <span className="text-[10px] text-stone-400">Frühstückszeit</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-center space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                <QrCode className={`w-4 h-4 ${currentTheme.text}`} /> {t.qrTitle}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => handlePrint('A4')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printA4}</button>
                <button onClick={() => handlePrint('A5')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printA5}</button>
                <button onClick={() => handlePrint('Visitenkarte')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printCard}</button>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{t.trialTitle}</span>
                <div className="text-xl font-black">{daysLeft} {t.trialDaysLeft}</div>
              </div>
              <p className="text-[11px] text-stone-400 mt-2">PRO Version ist aktiv. Alle 10 Sprachen und Analysen sind freigeschaltet.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-8">
            
            {/* 1. Tesis İletişim Bilgileri */}
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
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblEmailField}</label>
                  <input type="text" value={hotel.email} onChange={(e) => setHotel({ ...hotel, email: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblAddress}</label>
                  <input type="text" value={hotel.address} onChange={(e) => setHotel({ ...hotel, address: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblWebsite}</label>
                  <input type="text" value={hotel.website} onChange={(e) => setHotel({ ...hotel, website: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblGoogleReview}</label>
                  <input type="text" value={hotel.googleReviewUrl} onChange={(e) => setHotel({ ...hotel, googleReviewUrl: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
              </div>
            </div>

            {/* 2. Renk Temaları */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider flex items-center gap-1.5`}><Palette className="w-4 h-4" /> {t.sec2Title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {themeColors.map((theme) => (
                  <button 
                    key={theme.id}
                    onClick={() => setHotel({ ...hotel, themeColor: theme.id })}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition cursor-pointer ${hotel.themeColor === theme.id ? 'border-slate-900 bg-stone-100 shadow-sm' : 'border-stone-200 bg-white hover:bg-stone-50'}`}
                  >
                    <div className={`w-6 h-6 rounded-full ${theme.bg} shadow-md flex items-center justify-center text-white`}>
                      {hotel.themeColor === theme.id && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <span className="font-bold block text-xs text-slate-900">{theme.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Logo */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec3Title}</h3>
              <div className="flex items-center gap-4">
                {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-12 h-12 rounded-xl object-cover border" /> : <div className="w-12 h-12 rounded-xl bg-stone-100 border border-dashed flex items-center justify-center text-[10px] text-stone-400">No Logo</div>}
                <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition">
                  {t.btnLogoUpload}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* 6. Dinamik Preset Mapping Sistemi */}
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

                            {/* 1. Kategori Adı / Başlığı */}
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

                            {/* 2. Dinamik Form Renderer (Preset Schema) */}
                            {presetObj && presetObj.schema && (
                              <div className="space-y-1">
                                <label className="block text-[9px] font-extrabold text-amber-800 uppercase">Preset-spezifische Konfiguration</label>
                                <DynamicFormRenderer 
                                  presetSchema={presetObj.schema}
                                  fieldValues={cat.fieldValues || {}}
                                  onChangeField={(fieldKey, val) => handleUpdateFieldValue(cat.id, fieldKey, val)}
                                  currentTheme={currentTheme}
                                />
                              </div>
                            )}

                            {/* 3. Eigene Beschreibung (Özel Metin Alanı - Çeviri Yapılmaz Uyarısıyla) */}
                            <div className="pt-2 border-t border-stone-200/60 space-y-1">
                              <label className="block text-[9px] font-extrabold text-amber-700 uppercase">{t.customTextLabel}</label>
                              <textarea 
                                rows="2"
                                value={cat.customText || ''} 
                                onChange={(e) => handleUpdateCategoryField(cat.id, 'customText', e.target.value)} 
                                placeholder="Individueller Hinweistext für Ihre Gäste..."
                                className="w-full p-2.5 text-xs border border-amber-300 rounded-xl bg-amber-50/50" 
                              />
                              <p className="text-[10px] text-amber-800 font-semibold">{t.customTextWarning}</p>
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
          <div className="flex items-center gap-2">
            {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-white/20" /> : <div className={`w-8 h-8 rounded-lg ${currentTheme.bg} flex items-center justify-center font-bold text-xs`}>{(hotel.name || 'H').charAt(0)}</div>}
            <span className="text-xs font-bold tracking-wider uppercase opacity-90">{hotel.name}</span>
          </div>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-black/40 border border-white/30 text-white text-xs font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer">
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
            <option value="tr">🇹🇷 TR</option>
            <option value="it">🇮🇹 IT</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="sv">🇸🇪 SV</option>
            <option value="no">🇳🇴 NO</option>
            <option value="hr">🇭🇷 HR</option>
            <option value="sq">🇦🇱 SQ</option>
          </select>
        </div>

        <div className="relative z-10 p-6 space-y-4 text-white">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest font-extrabold uppercase bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full">{t.welcomeBadge}</span>
            <h1 className="text-3xl font-black tracking-tight pt-2">{hotel.name}</h1>
          </div>
          <button onClick={() => setShowWelcomeScreen(false)} className={`w-full ${currentTheme.bg} text-white py-4 rounded-2xl font-bold text-sm shadow-2xl hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer`}>
            <span>{t.welcomeButton}</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-32 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      <header className="p-5 pt-6 pb-2 bg-stone-50 sticky top-0 z-40 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-9 h-9 rounded-xl object-cover border" /> : <div className={`w-9 h-9 rounded-xl ${currentTheme.bg} text-white flex items-center justify-center font-bold text-xs`}>{(hotel.name || 'H').charAt(0)}</div>}
          <span className="text-xs font-bold tracking-wider uppercase text-slate-800">{hotel.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white border border-stone-200 text-slate-700 text-xs font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer shadow-sm">
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
            <option value="tr">🇹🇷 TR</option>
            <option value="it">🇮🇹 IT</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="sv">🇸🇪 SV</option>
            <option value="no">🇳🇴 NO</option>
            <option value="hr">🇭🇷 HR</option>
            <option value="sq">🇦🇱 SQ</option>
          </select>
          <button onClick={() => setAppMode('dashboard')} className="text-stone-300 hover:text-stone-600 p-1 text-xs cursor-pointer" title="Admin">🔑</button>
        </div>
      </header>

      <main className="p-5 space-y-5">
        {selectedCategory ? (
          <div className="space-y-4 animate-fade-in">
            <button onClick={() => setSelectedCategory(null)} className={`text-xs font-bold ${currentTheme.text} cursor-pointer flex items-center gap-1`}>&larr; {t.detailBack}</button>
            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
              <h2 className="text-lg font-black text-slate-900">{selectedCategory.title}</h2>
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
                {selectedCategory.fieldValues && Object.keys(selectedCategory.fieldValues).length > 0 && (
                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 space-y-2">
                    {Object.entries(selectedCategory.fieldValues).map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center text-[11px] border-b border-stone-100 pb-1.5 last:border-0">
                        <span className="font-extrabold text-stone-500 uppercase">{k}:</span>
                        <span className="font-semibold text-slate-900">{typeof v === 'boolean' ? (v ? 'Ja / Verfügbar' : 'Nein') : (Array.isArray(v) ? v.join(', ') : v)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedCategory.customText && (
                  <div className="pt-3 border-t border-stone-100">
                    <p className="italic text-stone-600 bg-amber-50/60 p-3 rounded-xl border border-amber-200/50">{selectedCategory.customText}</p>
                  </div>
                )}
              </div>
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
                        <button key={cat.id} onClick={() => setSelectedCategory({ title, fieldValues: cat.fieldValues, customText: cat.customText })} className={`w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between text-left cursor-pointer hover:${currentTheme.border} transition`}>
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

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-stone-200/80 z-50 shadow-2xl">
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