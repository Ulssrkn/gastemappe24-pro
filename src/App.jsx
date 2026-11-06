import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Scroll, Save, Eye, EyeOff, Palette, TrendingUp, Users, Activity
} from 'lucide-react';

const supabaseUrl = 'https://YOUR-SUPABASE-URL.supabase.co';
const supabaseAnonKey = 'YOUR-SUPABASE-ANON-KEY';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    schnellzugriffTitle: "Schnellzugriff",
    wlanTitle: "WLAN",
    parkingTitle: "Parkplatz",
    breakfastTitle: "Frühstück",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Zurück zur Übersicht",
    adminTitle: "Verwaltung & Analytik (Dashboard)",
    guestViewBtn: "Gastansicht öffnen",
    saveBtn: "Änderungen speichern",
    savedMsg: "Gespeichert!",
    logoutBtn: "Abmelden",
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
    sec6Title: "6. Gästemappe Kategorien (Vollständiger Katalog)",
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
    btnAddCategory: "Kategorie aus Katalog hinzufügen",
    modalTitle: "Katalog: Kategorie auswählen",
    addBtn: "Hinzufügen",
    editTitle: "Name / Titel",
    presetScenarioLabel: "Vordefiniertes Szenario / Textvariante wählen",
    featuresLabel: "Ausstattung & Services auswählen (Booking-Style)",
    customTextLabel: "Eigener Text (Keine Übersetzung)",
    customTextWarning: "⚠️ Dieser eigene Text wird für alle 10 Sprachen unverändert übernommen (keine automatische Übersetzung).",
    activeCard: "Karte anzeigen",
    inactiveCard: "Karte ausblenden"
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
    schnellzugriffTitle: "Quick Access",
    wlanTitle: "WiFi",
    parkingTitle: "Parking",
    breakfastTitle: "Breakfast",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Back to Overview",
    adminTitle: "Management & Analytics (Dashboard)",
    guestViewBtn: "Open Guest View",
    saveBtn: "Save Changes",
    savedMsg: "Saved!",
    logoutBtn: "Log out",
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
    sec6Title: "6. Directory Categories (Full Catalog)",
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
    btnAddCategory: "Add Category from Catalog",
    modalTitle: "Catalog: Select Category",
    addBtn: "Add",
    editTitle: "Name / Title",
    presetScenarioLabel: "Select Preset Text Scenario",
    featuresLabel: "Select Features & Amenities (Booking Style)",
    customTextLabel: "Custom Text (No Translation)",
    customTextWarning: "⚠️ This custom text is kept as-is across all 10 languages (no automatic translation).",
    activeCard: "Show Card",
    inactiveCard: "Hide Card"
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
    schnellzugriffTitle: "Hızlı Erişim",
    wlanTitle: "WLAN",
    parkingTitle: "Otopark",
    breakfastTitle: "Kahvaltı",
    checkInOutTitle: "Giriş / Çıkış",
    detailBack: "Geri Dön",
    adminTitle: "Yönetim Paneli & Analitik (Dashboard)",
    guestViewBtn: "Misafir Görünümünü Aç",
    saveBtn: "Değişiklikleri Kaydet",
    savedMsg: "Kaydedildi!",
    logoutBtn: "Çıkış Yap",
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
    sec6Title: "6. Rehber Kategorileri (Tam Katalog)",
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
    btnAddCategory: "Katalogdan Kategori Ekle",
    modalTitle: "Hazır Katalog: Kategori Seçin",
    addBtn: "Ekle",
    editTitle: "İsim / Başlık",
    presetScenarioLabel: "Hazır Senaryo Metni Seçin (Dropdown)",
    featuresLabel: "Özellik Seçimi (Booking.com Tarzı Kutucuklar)",
    customTextLabel: "Özel Metin (Çevrilmez)",
    customTextWarning: "⚠️ Bu özel metin 10 dilde de aynı kalacaktır (otomatik çeviri yapılmaz).",
    activeCard: "Kartı Göster",
    inactiveCard: "Kartı Gizle"
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
    logoutBtn: "Esci",
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
    sec6Title: "6. Categorie guida",
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
    modalTitle: "Catalogo: seleziona categoria",
    addBtn: "Aggiungi",
    editTitle: "Nome / Titolo",
    presetScenarioLabel: "Seleziona uno scenario di testo predefinito",
    featuresLabel: "Seleziona caratteristiche (Stile Booking)",
    customTextLabel: "Testo personalizzato (Senza traduzione)",
    customTextWarning: "⚠️ Questo testo personalizzato rimane invariato in tutte le 10 lingue.",
    activeCard: "Mostra carta",
    inactiveCard: "Nascondi carta"
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
    logoutBtn: "Déconnexion",
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
    sec6Title: "6. Catégories",
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
    modalTitle: "Catalogue : Choisir une catégorie",
    addBtn: "Ajouter",
    editTitle: "Nom / Titre",
    presetScenarioLabel: "Choisir un scénario de texte prédéfini",
    featuresLabel: "Sélectionner les équipements (Style Booking)",
    customTextLabel: "Texte personnalisé (Sans traduction)",
    customTextWarning: "⚠️ Ce texte personnalisé reste identique dans les 10 langues.",
    activeCard: "Afficher",
    inactiveCard: "Masquer"
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
    logoutBtn: "Cerrar sesión",
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
    sec6Title: "6. Categorías de la guía",
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
    modalTitle: "Catálogo: Seleccionar categoría",
    addBtn: "Añadir",
    editTitle: "Nombre / Título",
    presetScenarioLabel: "Seleccionar escenario de texto predefinido",
    featuresLabel: "Seleccionar servicios (Estilo Booking)",
    customTextLabel: "Texto personalizado (Sin traducción)",
    customTextWarning: "⚠️ Este texto personalizado se mantiene igual en los 10 idiomas.",
    activeCard: "Mostrar tarjeta",
    inactiveCard: "Ocultar tarjeta"
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
    logoutBtn: "Logga ut",
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
    sec6Title: "6. Kategorier",
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
    modalTitle: "Katalog: Välj kategori",
    addBtn: "Lägg till",
    editTitle: "Namn / Titel",
    presetScenarioLabel: "Välj fördefinierat textscenario",
    featuresLabel: "Välj bekvämligheter (Booking-stil)",
    customTextLabel: "Anpassad text (Ingen översättning)",
    customTextWarning: "⚠️ Denna anpassade text förblir oförändrad på alla 10 språk.",
    activeCard: "Visa kort",
    inactiveCard: "Dölj kort"
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
    logoutBtn: "Logg ut",
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
    sec6Title: "6. Kategorier",
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
    modalTitle: "Katalog: Velg kategori",
    addBtn: "Legg til",
    editTitle: "Navn / Tittel",
    presetScenarioLabel: "Velg forhåndsdefinert tekstscenario",
    featuresLabel: "Velg fasiliteter (Booking-stil)",
    customTextLabel: "Egendefinert tekst (Ingen oversettelse)",
    customTextWarning: "⚠️ Denne egendefinerte teksten forblir uendret på alle 10 språk.",
    activeCard: "Vis kort",
    inactiveCard: "Skjul kort"
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
    logoutBtn: "Odjava",
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
    sec6Title: "6. Kategorije vodiča",
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
    modalTitle: "Katalog: Odaberi kategoriju",
    addBtn: "Dodaj",
    editTitle: "Naziv / Naslov",
    presetScenarioLabel: "Odaberite unaprijed definiran scenarij teksta",
    featuresLabel: "Odaberite sadržaje (Booking stil)",
    customTextLabel: "Prilagođeni tekst (Bez prevođenja)",
    customTextWarning: "⚠️ Ovaj prilagođeni tekst ostaje neizmijenjen na svih 10 jezika.",
    activeCard: "Prikaži karticu",
    inactiveCard: "Sakrij karticu"
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
    sec6Title: "6. Kategoritë",
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
    modalTitle: "Katalogu: Zgjidh kategorinë",
    addBtn: "Shto",
    editTitle: "Emri / Titulli",
    presetScenarioLabel: "Zgjidhni një skenar teksti të paracaktuar",
    featuresLabel: "Zgjidhni pajisjet (Stili Booking)",
    customTextLabel: "Tekst i personalizuar (Pa përkthim)",
    customTextWarning: "⚠️ Ky tekst i personalizuar mbetet i njëjtë në të 10 gjuhët.",
    activeCard: "Shfaq kartelën",
    inactiveCard: "Fshih kartelën"
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

// Orijinal 12 Şablon Kategori + Booking.com Usulü Kutucuk (Features) ve 3 Hazır Senaryo
const categoryPresets = [
  { 
    id: 'hotel_info', 
    group: 'Hotel & Unterkunft', 
    title: { de: 'Hotelinformationen', en: 'Hotel Information', tr: 'Otel Bilgileri', it: 'Informazioni sull\'hotel', fr: 'Informations sur l\'hôtel', es: 'Información del hotel', sv: 'Hotellinformation', no: 'Hotellinformasjon', hr: 'Informacije o hotelu', sq: 'Informacione për hotelin' }, 
    subtitle: { de: 'Rezeption & Zeiten', en: 'Reception & hours', tr: 'Resepsiyon ve saatler', it: 'Ricezione e orari', fr: 'Réception et horaires', es: 'Recepción y horarios', sv: 'Reception & tider', no: 'Resepsjon og tider', hr: 'Recepcija i radno vrijeme', sq: 'Recepsioni dhe oraret' }, 
    scenarios: [
      { id: 's1', label: { de: 'Standard 24/7 Service', en: 'Standard 24/7 Service', tr: 'Standart 24/7 Servis' }, text: { de: 'Unsere Rezeption ist rund um die Uhr (24/7) für Sie besetzt. Notfall-Hotline jederzeit erreichbar.', en: 'Our reception is open 24/7 for you. Emergency hotline available anytime.', tr: 'Resepsiyonumuz 24 saat hizmetinizdedir. Acil hat 7/24 aktiftir.' } },
      { id: 's2', label: { de: 'Feste Rezeptionszeiten', en: 'Fixed Reception Hours', tr: 'Belirli Resepsiyon Saatleri' }, text: { de: 'Unsere Rezeption ist täglich von 07:00 bis 22:00 Uhr besetzt. Bei Spätanreise nutzen Sie bitte den Keybox-Code.', en: 'Our reception is open daily from 07:00 to 22:00. For late arrival please use keybox.', tr: 'Resepsiyonumuz 07:00 - 22:00 arası açıktır. Geç giriş için lütfen şifreli anahtar kutusunu kullanın.' } },
      { id: 's3', label: { de: 'Kontaktloser Digital-Express Check-in', en: 'Contactless Digital Check-in', tr: 'Temassız Dijital Giriş' }, text: { de: 'Unser Haus wird digital geführt. Bei Fragen erreichen Sie unseren Support per Telefon oder WhatsApp.', en: 'Our property is digitally managed. Reach out via phone or WhatsApp anytime.', tr: 'Tesisimiz dijital yönetilmektedir. Sorularınız için telefon veya WhatsApp üzerinden bize ulaşabilirsiniz.' } }
    ],
    features: ['24h Rezeption', 'Gepäckaufbewahrung', 'Aufzug', 'Express Check-in', 'Mehrsprachiges Personal'],
    icon: 'Building' 
  },
  { 
    id: 'room_info', 
    group: 'Hotel & Unterkunft', 
    title: { de: 'Zimmerinformationen', en: 'Room Information', tr: 'Oda Bilgileri', it: 'Informazioni sulle camere', fr: 'Informations sur les chambres', es: 'Información de la habitación', sv: 'Rumsinformation', no: 'Romsinformasjon', hr: 'Informacije o sobama', sq: 'Informacione për dhomat' }, 
    subtitle: { de: 'Ausstattung & Safe', en: 'Amenities & safe', tr: 'Oda özellikleri ve kasa', it: 'Servizi e cassaforte', fr: 'Équipements et coffre', es: 'Servicios y caja fuerte', sv: 'Bekvämligheter & kassaskåp', no: 'Fasiliteter og safe', hr: 'Sadržaji i sef', sq: 'Pajisjet dhe kasaforta' }, 
    scenarios: [
      { id: 's1', label: { de: 'Komfort-Ausstattung', en: 'Comfort Amenities', tr: 'Konfor Donanımı' }, text: { de: 'Alle Zimmer verfügen über Zimmersafe, Haartrockner, Kaffeemaschine und Flachbild-TV.', en: 'All rooms feature room safe, hairdryer, coffee machine, and flat-screen TV.', tr: 'Tüm odalarda kasa, saç kurutma makinesi, kahve makinesi ve TV mevcuttur.' } },
      { id: 's2', label: { de: 'Umwelt- & Handtuchwechsel', en: 'Eco & Towel Change', tr: 'Çevre & Havlu Değişimi' }, text: { de: 'Der Umwelt zuliebe wechseln wir Handtücher auf Wunsch. Bitte legen Sie benutzte Tücher auf den Boden.', en: 'For the environment, towel change is on request. Please leave used towels on the floor.', tr: 'Doğayı korumak adına havlular isteğe bağlı değiştirilir. Değişim için lütfen yere bırakın.' } },
      { id: 's3', label: { de: 'Klimaanlage & Heizung', en: 'AC & Heating Info', tr: 'Klima & Isıtma Bilgisi' }, text: { de: 'Die Raumtemperatur lässt sich individuell über das Thermostat regeln. Bitte Fenster bei AC schließen.', en: 'Room temperature can be controlled individually. Please close windows while AC is running.', tr: 'Oda sıcaklığı termostat ile ayarlanabilir. Klima çalışırken lütfen pencereleri kapalı tutun.' } }
    ],
    features: ['Zimmersafe', 'Klimaanlage', 'Flachbild-TV', 'Haartrockner', 'Wasserkocher / Kaffemaschine', 'Nichtraucherzimmer'],
    icon: 'Bed' 
  },
  { 
    id: 'keys_access', 
    group: 'Hotel & Unterkunft', 
    title: { de: 'Zimmerschlüssel & Zugang', en: 'Keys & Access', tr: 'Anahtar ve Erişim', it: 'Chiavi e accesso', fr: 'Clés et accès', es: 'Llaves y acceso', sv: 'Nycklar & åtkomst', no: 'Nøkler og tilgang', hr: 'Ključevi i pristup', sq: 'Çelësat dhe qasja' }, 
    subtitle: { de: 'Karte & Schließzeiten', en: 'Keycard & locking times', tr: 'Anahtar kartı ve kapı saatleri', it: 'Scheda chiave e orari', fr: 'Carte clé et horaires', es: 'Tarjeta llave y horarios', sv: 'Nyckelkort & tider', no: 'Nøkkelkort og tider', hr: 'Ključ kartica i vremena', sq: 'Kardçelës dhe oraret' }, 
    scenarios: [
      { id: 's1', label: { de: 'Elektronische Schlüsselkarte', en: 'Keycard System', tr: 'Elektronik Kartlı Sistem' }, text: { de: 'Ihre Karte öffnet das Zimmer sowie den Haupteingang nach 22:00 Uhr.', en: 'Your card opens the room and the main entrance after 22:00.', tr: 'Kartınız 22:00 sonrasında ana kapıyı ve odanızı açar.' } },
      { id: 's2', label: { de: 'PIN-Code / Smart Lock', en: 'PIN Code Lock', tr: 'Şifreli / Akıllı Kilit' }, text: { de: 'Nutzen Sie Ihren persönlichen 6-stelligen PIN-Code für den schlüssellosen Zugang.', en: 'Use your personal 6-digit PIN code for keyless entry.', tr: 'Anahtarsız giriş için kişisel 6 haneli PIN kodunuzu kullanın.' } },
      { id: 's3', label: { de: 'Klassischer Schlüssel', en: 'Classic Key', tr: 'Klasik Anahtar' }, text: { de: 'Bitte geben Sie den Zimmerschlüssel bei Abwesenheit an der Rezeption ab.', en: 'Please leave room key at reception when leaving.', tr: 'Dışarı çıkarken lütfen anahtarınızı resepsiyona bırakın.' } }
    ],
    features: ['Keycard-Zugang', '24h Nachteingang', 'PIN-Code Türschloss', 'Keybox Spät-Check-in'],
    icon: 'Key' 
  },
  { 
    id: 'restaurant_dining', 
    group: 'Essen & Trinken', 
    title: { de: 'Restaurant & Bar', en: 'Restaurant & Bar', tr: 'Restoran ve Bar', it: 'Ristorante e Bar', fr: 'Restaurant et Bar', es: 'Restaurante y Bar', sv: 'Restaurang & Bar', no: 'Restaurant og Bar', hr: 'Restoran i Bar', sq: 'Restorant dhe Bar' }, 
    subtitle: { de: 'Öffnungszeiten & Menü', en: 'Hours & menu', tr: 'Çalışma saatleri ve menü', it: 'Orari e menu', fr: 'Horaires et menu', es: 'Horarios y menú', sv: 'Öppettider & meny', no: 'Åpningstider og meny', hr: 'Radno vrijeme i jelovnik', sq: 'Oraret dhe menyja' }, 
    scenarios: [
      { id: 's1', label: { de: 'À la carte & Halbpension', en: 'À la carte & Half Board', tr: 'A la Carte ve Yarım Pansiyon' }, text: { de: 'Unser Restaurant serviert regionale und internationale Spezialitäten von 18:00 - 22:00 Uhr.', en: 'Our restaurant serves regional and international cuisine from 18:00 to 22:00.', tr: 'Restoranımız 18:00 - 22:00 arası yöresel ve uluslararası lezzetler sunar.' } },
      { id: 's2', label: { de: 'Bar & Lounge', en: 'Bar & Lounge Focus', tr: 'Bar ve Dinlenme Konsepti' }, text: { de: 'Lassen Sie den Tag bei Cocktails, Weinen und kleinen Snacks in unserer Lounge ausklingen.', en: 'Unwind your evening with cocktails, wines, and snacks at our lounge.', tr: 'Akşamınızı loungemuzda kokteyl ve şaraplar eşliğinde tamamlayın.' } },
      { id: 's3', label: { de: 'Room Service', en: 'Room Service Option', tr: 'Oda Servisi Olanağı' }, text: { de: 'Gerne liefern wir Speisen und Getränke direkt auf Ihr Zimmer (07:00 - 22:00 Uhr).', en: 'Food and drinks delivered directly to your room upon request.', tr: 'Yiyecek ve içeceklerinizi odaya sipariş edebilirsiniz.' } }
    ],
    features: ['À la carte Restaurant', 'Hotelbar', 'Vegetarische Optionen', 'Vegan & Glutenfrei', 'Zimmerservice', 'Außenterrasse'],
    icon: 'Utensils' 
  },
  { 
    id: 'cafe_snacks', 
    group: 'Essen & Trinken', 
    title: { de: 'Café & Lounge', en: 'Café & Lounge', tr: 'Kafe ve Lounge', it: 'Caffè e Lounge', fr: 'Café et Salon', es: 'Café y Salón', sv: 'Café & Lounge', no: 'Café og Lounge', hr: 'Kafić i Salon', sq: 'Kafe dhe Lounge' }, 
    scenarios: [
      { id: 's1', label: { de: 'Nachmittagskaffee', en: 'Afternoon Coffee', tr: 'Öğleden Sonra Kahvesi' }, text: { de: 'Täglich frisch gebackener Kuchen und Kaffeespezialitäten von 14:00 bis 17:00 Uhr.', en: 'Freshly baked cakes and coffee specialties daily from 14:00 to 17:00.', tr: 'Her gün 14:00 - 17:00 arası taze pasta ve kahve çeşitleri.' } }
    ],
    features: ['Kaffeespezialitäten', 'Hausgemachter Kuchen', 'Snacks & Toast', 'Kostenloses WLAN in Lounge'],
    icon: 'Coffee' 
  },
  { 
    id: 'pool_aqua', 
    group: 'Wellness & Spa', 
    title: { de: 'Pool & Wellnessbereich', en: 'Pool & Wellness Area', tr: 'Havuz ve Wellness', it: 'Piscina e Benessere', fr: 'Piscine et Bien-être', es: 'Piscina y Bienestar', sv: 'Pool & Wellness', no: 'Basseng og Velvære', hr: 'Bazen i Wellness', sq: 'Pishina dhe Wellness' }, 
    scenarios: [
      { id: 's1', label: { de: 'Indoor- & Outdoor Pool', en: 'Indoor & Outdoor Pool', tr: 'Açık ve Kapalı Havuz' }, text: { de: 'Unser beheizter Poolbereich steht Ihnen täglich von 07:00 bis 21:00 Uhr zur Verfügung.', en: 'Our heated pool area is open daily from 07:00 to 21:00.', tr: 'Isıtmalı havuzumuz her gün 07:00 - 21:00 arası hizmetinizdedir.' } }
    ],
    features: ['Beheizter Pool', 'Liegestühle', 'Pool-Handtücher gratis', 'Kinderbecken'],
    icon: 'Waves' 
  },
  { 
    id: 'sauna_spa', 
    group: 'Wellness & Spa', 
    title: { de: 'Sauna & Massagen', en: 'Sauna & Massages', tr: 'Sauna ve Masaj', it: 'Sauna e Massaggi', fr: 'Sauna et Massages', es: 'Sauna y Masajes', sv: 'Sauna & Massage', no: 'Sauna og Massasje', hr: 'Sauna i Masaže', sq: 'Sauna dhe Masazhet' }, 
    scenarios: [
      { id: 's1', label: { de: 'Finnische Sauna & Dampfbad', en: 'Sauna & Steam Bath', tr: 'Sauna ve Buhar Odası' }, text: { de: 'Saunabereich täglich ab 16:00 Uhr geheizt. Massagen bitte an der Rezeption buchen.', en: 'Sauna open daily from 16:00. Book massages at reception.', tr: 'Saunalar saat 16:00 itibarıyla aktiftir. Masaj randevusunu resepsiyondan alabilirsiniz.' } }
    ],
    features: ['Finnische Sauna', 'Bio-Sauna', 'Dampfbad', 'Ruheraum', 'Massage-Angebote'],
    icon: 'Sparkles' 
  },
  { 
    id: 'bike_rental', 
    group: 'Freizeit & Aktivitäten', 
    title: { de: 'Fahrradverleih', en: 'Bike Rental', tr: 'Bisiklet Kiralama', it: 'Noleggio biciclette', fr: 'Location de vélos', es: 'Alquiler de bicicletas', sv: 'Cykeluthyrning', no: 'Sykkelutleie', hr: 'Najam bicikala', sq: 'Qira biçikletash' }, 
    scenarios: [
      { id: 's1', label: { de: 'E-Bike & Trekkingverleih', en: 'E-Bike Rental', tr: 'E-Bisiklet Kiralama' }, text: { de: 'Erkunden Sie die Region mit unseren modernen E-Bikes. Helm und Tourenkarte inklusive.', en: 'Explore the region with our modern e-bikes. Helmet and trail map included.', tr: 'Bölgeyi e-bisikletlerimizle keşfedin. Kask ve rota haritası dahildir.' } }
    ],
    features: ['E-Bikes', 'Trekking-Räder', 'Fahrrad-Garagestellplatz', 'Helmverleih', 'Ladestation für E-Bikes'],
    icon: 'Compass' 
  },
  { 
    id: 'sightseeing', 
    group: 'Umgebung & Ausflüge', 
    title: { de: 'Sehenswürdigkeiten', en: 'Sights & Attractions', tr: 'Görülecek Yerler', it: 'Attrazioni turistiche', fr: 'Sites touristiques', es: 'Lugares de interés', sv: 'Sevärdheter', no: 'Severdigheter', hr: 'Znamenitosti', sq: 'Vende interesi' }, 
    scenarios: [
      { id: 's1', label: { de: 'Highlights der Region', en: 'Regional Highlights', tr: 'Bölgesel Önemli Noktalar' }, text: { de: 'Entdecken Sie historische Altstädte, Wanderwege und Weinberge direkt vor der Tür.', en: 'Discover historic old towns, hiking trails, and vineyards right outside.', tr: 'Tarihi şehir merkezini ve doğa yollarını keşfedin.' } }
    ],
    features: ['Historische Orte', 'Wanderwege', 'Weinberge & Weingüter', 'Stadtpläne an Rezeption'],
    icon: 'MapPin' 
  },
  { 
    id: 'parking_mobility', 
    group: 'Anreise & Mobilität', 
    title: { de: 'Parkmöglichkeiten', en: 'Parking Facilities', tr: 'Otopark İmkanları', it: 'Parcheggio', fr: 'Parking', es: 'Aparcamiento', sv: 'Parkering', no: 'Parkering', hr: 'Parkiralište', sq: 'Parkimi' }, 
    scenarios: [
      { id: 's1', label: { de: 'Kostenfrei & E-Ladestation', en: 'Free Parking & EV', tr: 'Ücretsiz Otopark ve Şarj' }, text: { de: 'Kostenfreie Gästeparkplätze am Haus. 22kW E-Ladesäulen stehen zur Verfügung.', en: 'Free parking on site. 22kW EV chargers available.', tr: 'Tesis önünde ücretsiz otopark ve elektrikli araç şarj istasyonu mevcuttur.' } }
    ],
    features: ['Kostenfreie Parkplätze', 'Tiefgarage', 'E-Auto Ladestation', 'Motorrad-Stellplätze', 'Busparkplatz'],
    icon: 'Car' 
  },
  { 
    id: 'reception_service', 
    group: 'Service & Informationen', 
    title: { de: 'Rezeption & Service', en: 'Reception & Service', tr: 'Resepsiyon ve Servis', it: 'Ricezione e Servizio', fr: 'Réception et Service', es: 'Recepción y Servicio', sv: 'Reception & Service', no: 'Resepsjon og Service', hr: 'Recepcija i Usluge', sq: 'Recepsioni dhe Shërbimi' }, 
    scenarios: [
      { id: 's1', label: { de: 'Rundum-Service', en: 'Full Service', tr: 'Tam Servis' }, text: { de: 'Weckruf, Wäscheservice, Druckservice für Tickets und Taxi-Bestellungen jederzeit möglich.', en: 'Wake-up calls, laundry service, ticket printing, and taxi bookings available.', tr: 'Uyandırma servisi, çamaşır yıkama, bilet yazdırımı ve taksi çağırımı yapılır.' } }
    ],
    features: ['Weckdienst', 'Wäscheservice', 'Ticket-Druckservice', 'Taxi-Rufservice', 'Bügelset auf Wunsch'],
    icon: 'Phone' 
  },
  { 
    id: 'house_rules', 
    group: 'Regeln & Wissenswertes', 
    title: { de: 'Hausordnung & Ruhezeiten', en: 'House Rules & Quiet Hours', tr: 'Ev Kuralları ve Sessizlik', it: 'Regolamento e Orari di silencio', fr: 'Règlement et Heures de calme', es: 'Normas y Horas de silencio', sv: 'Ordningsregler & Tystnad', no: 'Husordensregler og Ro', hr: 'Kućni red i tišina', sq: 'Rregullat dhe Qetësia' }, 
    scenarios: [
      { id: 's1', label: { de: 'Nachtruhe & Rauchverbot', en: 'Quiet Hours & No Smoking', tr: 'Gece Sessizliği ve Sigara Yasağı' }, text: { de: 'Nachtruhe gilt von 22:00 bis 07:00 Uhr. Das gesamte Gebäude ist ein Nichtraucherbereich.', en: 'Quiet hours 22:00 - 07:00. The entire property is non-smoking.', tr: '22:00 - 07:00 arası sessizlik esastır. Tüm kapalı alanlarda sigara içmek yasaktır.' } }
    ],
    features: ['Nachtruhe ab 22:00', '100% Nichtraucherhotel', 'Haustiere auf Anfrage', 'Sicherheitskameras'],
    icon: 'ShieldCheck' 
  }
];

const renderSafeIcon = (iconName, currentTheme) => {
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
    default: return <Info className={className} />;
  }
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
      { id: '1', presetId: 'hotel_info', icon: 'Building', customTitle: '', selectedScenarioId: 's1', selectedFeatures: ['24h Rezeption', 'Gepäckaufbewahrung'], customText: '' },
      { id: '2', presetId: 'restaurant_dining', icon: 'Utensils', customTitle: '', selectedScenarioId: 's1', selectedFeatures: ['À la carte Restaurant', 'Hotelbar'], customText: '' }
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
    const newCategory = { 
      id: Date.now().toString(), 
      presetId: presetObj.id, 
      icon: presetObj.icon || 'Info',
      customTitle: '',
      selectedScenarioId: presetObj.scenarios && presetObj.scenarios[0] ? presetObj.scenarios[0].id : '',
      selectedFeatures: presetObj.features ? [presetObj.features[0]] : [],
      customText: ''
    };
    setCategories(prev => [...prev, newCategory]);
    setIsCatalogModalOpen(false);
  };

  const handleDeleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const handleUpdateCategoryField = (id, field, value) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
  };

  const handleToggleFeature = (catId, featureName) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      const current = cat.selectedFeatures || [];
      const updated = current.includes(featureName)
        ? current.filter(f => f !== featureName)
        : [...current, featureName];
      return { ...cat, selectedFeatures: updated };
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
    const presetData = categoryPresets.find(p => p.id === cat.presetId);
    if (!presetData) return acc;
    const groupName = presetData.group || 'Sonstige';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push({ ...cat, presetData });
    return acc;
  }, {});

  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] font-sans text-slate-800 p-6 md:p-10 space-y-8 relative pb-28">
        {isCatalogModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-extrabold text-lg text-slate-900">{t.modalTitle}</h2>
                <button onClick={() => setIsCatalogModalOpen(false)} className="text-stone-400 font-bold p-1 cursor-pointer hover:text-stone-700">✕</button>
              </div>
              <div className="space-y-6">
                {Object.entries(
                  categoryPresets.reduce((acc, preset) => {
                    const group = preset.group || 'Sonstige';
                    acc[group] = acc[group] || [];
                    acc[group].push(preset);
                    return acc;
                  }, {})
                ).map(([groupName, presets]) => (
                  <div key={groupName} className="space-y-2">
                    <h3 className={`text-xs font-black ${currentTheme.text} uppercase tracking-wider`}>{groupName}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {presets.map((preset) => {
                        const title = (preset.title && (preset.title[lang] || preset.title.de)) || 'Kategorie';
                        const sub = (preset.subtitle && (preset.subtitle[lang] || preset.subtitle.de)) || '';
                        return (
                          <div key={preset.id} className={`p-3 rounded-2xl border flex items-center justify-between transition bg-stone-50 hover:${currentTheme.border}`}>
                            <div className="flex items-center gap-2.5">
                              {renderSafeIcon(preset.icon, currentTheme)}
                              <div>
                                <span className="font-bold block text-xs text-slate-900">{title}</span>
                                {sub && <span className="text-[10px] text-stone-500 block">{sub}</span>}
                              </div>
                            </div>
                            <button onClick={() => handleAddPresetCategory(preset)} className={`${currentTheme.bg} text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shadow hover:opacity-90 cursor-pointer flex items-center gap-1`}>
                              <Plus className="w-3 h-3" /> {t.addBtn}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
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

            <div className="space-y-3 pt-4 border-t">
              <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec4Title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(hotel.images || []).map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden h-24 border">
                    <img src={img} alt="Slider" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec5Title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className={`p-4 rounded-2xl border transition ${hotel.showWifi ? 'bg-white border-stone-200' : 'bg-stone-100 border-stone-200 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-2"><Wifi className={`w-4 h-4 ${currentTheme.text}`} /> {t.wlanTitle}</span>
                    <button onClick={() => setHotel({ ...hotel, showWifi: !hotel.showWifi })} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1 ${hotel.showWifi ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                      {hotel.showWifi ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {hotel.showWifi ? t.activeCard : t.inactiveCard}
                    </button>
                  </div>
                  {hotel.showWifi && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input type="text" placeholder={t.lblWifiSsid} value={hotel.wifiSsid || ''} onChange={(e) => setHotel({ ...hotel, wifiSsid: e.target.value })} className="p-2 text-xs border rounded-xl" />
                      <input type="text" placeholder={t.lblWifiPass} value={hotel.wifiPass || ''} onChange={(e) => setHotel({ ...hotel, wifiPass: e.target.value })} className="p-2 text-xs border rounded-xl" />
                    </div>
                  )}
                </div>

                <div className={`p-4 rounded-2xl border transition ${hotel.showParking ? 'bg-white border-stone-200' : 'bg-stone-100 border-stone-200 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-2"><Car className={`w-4 h-4 ${currentTheme.text}`} /> {t.parkingTitle}</span>
                    <button onClick={() => setHotel({ ...hotel, showParking: !hotel.showParking })} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1 ${hotel.showParking ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                      {hotel.showParking ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {hotel.showParking ? t.activeCard : t.inactiveCard}
                    </button>
                  </div>
                  {hotel.showParking && (
                    <input type="text" placeholder={t.lblParkingInfo} value={hotel.parkingInfo || ''} onChange={(e) => setHotel({ ...hotel, parkingInfo: e.target.value })} className="w-full p-2 text-xs border rounded-xl mt-2" />
                  )}
                </div>

                <div className={`p-4 rounded-2xl border transition ${hotel.showBreakfast ? 'bg-white border-stone-200' : 'bg-stone-100 border-stone-200 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-2"><Coffee className={`w-4 h-4 ${currentTheme.text}`} /> {t.breakfastTitle}</span>
                    <button onClick={() => setHotel({ ...hotel, showBreakfast: !hotel.showBreakfast })} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1 ${hotel.showBreakfast ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                      {hotel.showBreakfast ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {hotel.showBreakfast ? t.activeCard : t.inactiveCard}
                    </button>
                  </div>
                  {hotel.showBreakfast && (
                    <input type="text" placeholder={t.lblBreakfastTime} value={hotel.breakfastTime || ''} onChange={(e) => setHotel({ ...hotel, breakfastTime: e.target.value })} className="w-full p-2 text-xs border rounded-xl mt-2" />
                  )}
                </div>

                <div className={`p-4 rounded-2xl border transition ${hotel.showCheckInOut ? 'bg-white border-stone-200' : 'bg-stone-100 border-stone-200 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-2"><Clock className={`w-4 h-4 ${currentTheme.text}`} /> {t.checkInOutTitle}</span>
                    <button onClick={() => setHotel({ ...hotel, showCheckInOut: !hotel.showCheckInOut })} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1 ${hotel.showCheckInOut ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                      {hotel.showCheckInOut ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {hotel.showCheckInOut ? t.activeCard : t.inactiveCard}
                    </button>
                  </div>
                  {hotel.showCheckInOut && (
                    <input type="text" placeholder={t.lblCheckInOut} value={hotel.checkInOut || ''} onChange={(e) => setHotel({ ...hotel, checkInOut: e.target.value })} className="w-full p-2 text-xs border rounded-xl mt-2" />
                  )}
                </div>

              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec6Title}</h3>
                <button onClick={() => setIsCatalogModalOpen(true)} className={`${currentTheme.bg} text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:opacity-95 cursor-pointer flex items-center gap-1.5`}>
                  <Plus className="w-4 h-4" /> {t.btnAddCategory}
                </button>
              </div>
              
              <div className="space-y-6">
                {Object.entries(groupedCategories).map(([groupName, groupItems]) => (
                  <div key={groupName} className="space-y-3">
                    <h4 className={`text-xs font-black ${currentTheme.text} uppercase tracking-wider ${currentTheme.bgLight} px-3 py-1.5 rounded-lg border border-stone-200/60 inline-block`}>{groupName}</h4>
                    <div className="space-y-4">
                      {(groupItems || []).map((cat) => {
                        const presetObj = cat.presetData;
                        const baseTitle = presetObj ? ((presetObj.title && (presetObj.title[lang] || presetObj.title.de)) || 'Kategorie') : '';
                        const displayTitle = cat.customTitle || baseTitle;

                        return (
                          <div key={cat.id} className="p-4 bg-stone-50 rounded-2xl border space-y-4 shadow-sm">
                            <div className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-2">
                                {renderSafeIcon(cat.icon, currentTheme)}
                                <span className="font-bold text-xs text-slate-800">{displayTitle}</span>
                              </div>
                              <button onClick={() => handleDeleteCategory(cat.id)} className="bg-rose-50 text-rose-600 p-1.5 rounded-lg cursor-pointer hover:bg-rose-100"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>

                            {/* 1. Başlık Düzenleme */}
                            <div>
                              <label className="block text-[9px] font-bold text-stone-500 uppercase mb-0.5">{t.editTitle}</label>
                              <input 
                                type="text" 
                                placeholder={baseTitle}
                                value={cat.customTitle || ''} 
                                onChange={(e) => handleUpdateCategoryField(cat.id, 'customTitle', e.target.value)} 
                                className="w-full p-2 text-xs border rounded-xl bg-white font-semibold" 
                              />
                            </div>

                            {/* 2. Hazır Senaryo Dropdown Menüsü */}
                            {presetObj && presetObj.scenarios && presetObj.scenarios.length > 0 && (
                              <div className="space-y-1">
                                <label className="block text-[9px] font-extrabold text-stone-600 uppercase">{t.presetScenarioLabel}</label>
                                <select 
                                  value={cat.selectedScenarioId || ''} 
                                  onChange={(e) => handleUpdateCategoryField(cat.id, 'selectedScenarioId', e.target.value)}
                                  className="w-full p-2 text-xs border border-stone-200 rounded-xl bg-white cursor-pointer font-medium"
                                >
                                  {presetObj.scenarios.map((sc) => (
                                    <option key={sc.id} value={sc.id}>
                                      {sc.label[lang] || sc.label.de || sc.id}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {/* 3. Booking.com Usulü Özellik İşaretleme Kutucukları (Checkboxes) */}
                            {presetObj && presetObj.features && presetObj.features.length > 0 && (
                              <div className="space-y-1.5 pt-1">
                                <label className="block text-[9px] font-extrabold text-stone-600 uppercase">{t.featuresLabel}</label>
                                <div className="flex flex-wrap gap-1.5">
                                  {presetObj.features.map((feat) => {
                                    const isSelected = (cat.selectedFeatures || []).includes(feat);
                                    return (
                                      <button
                                        key={feat}
                                        type="button"
                                        onClick={() => handleToggleFeature(cat.id, feat)}
                                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border transition cursor-pointer flex items-center gap-1 ${isSelected ? `${currentTheme.bg} text-white border-transparent` : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'}`}
                                      >
                                        {isSelected && <Check className="w-3 h-3" />}
                                        {feat}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* 4. Alan: Custom Text (Çeviri yapılmaz uyarısıyla) */}
                            <div className="pt-2 border-t border-stone-200/60 space-y-1">
                              <label className="block text-[9px] font-extrabold text-amber-700 uppercase">{t.customTextLabel}</label>
                              <textarea 
                                rows="2"
                                value={cat.customText || ''} 
                                onChange={(e) => handleUpdateCategoryField(cat.id, 'customText', e.target.value)} 
                                placeholder="Individueller Hinweistext..."
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
            <option value="it">🇮🇹 IT</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="tr">🇹🇷 TR</option>
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
            <option value="it">🇮🇹 IT</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="tr">🇹🇷 TR</option>
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
                <p>{selectedCategory.content}</p>
                {selectedCategory.features && selectedCategory.features.length > 0 && (
                  <div className="pt-3 border-t border-stone-100">
                    <span className="font-bold text-[11px] block mb-1 text-slate-900">Ausstattung / Service:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCategory.features.map(f => (
                        <span key={f} className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold ${currentTheme.bgLight} ${currentTheme.text}`}>
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedCategory.customText && (
                  <div className="pt-3 border-t border-stone-100">
                    <p className="italic text-stone-600 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50">{selectedCategory.customText}</p>
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
                      const sub = (presetObj && presetObj.subtitle && (presetObj.subtitle[lang] || presetObj.subtitle.de)) || '';
                      
                      const selectedScenario = presetObj && presetObj.scenarios ? presetObj.scenarios.find(s => s.id === cat.selectedScenarioId) : null;
                      const content = selectedScenario ? (selectedScenario.text[lang] || selectedScenario.text.de) : '';

                      return (
                        <button key={cat.id} onClick={() => setSelectedCategory({ title, content, features: cat.selectedFeatures, customText: cat.customText })} className={`w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between text-left cursor-pointer hover:${currentTheme.border} transition`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${currentTheme.bgLight} flex items-center justify-center`}>{renderSafeIcon(cat.icon, currentTheme)}</div>
                            <div>
                              <h5 className="text-sm font-extrabold text-slate-900">{title}</h5>
                              {sub && <p className="text-xs text-slate-500">{sub}</p>}
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