import React, { useState } from 'react';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Scroll
} from 'lucide-react';

// 10 DİL İÇİN KUSURSUZ ÇEVİRİ VE PRESET KATALOĞU
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
    adminTitle: "Verwaltung (Dashboard)",
    guestViewBtn: "Gastansicht öffnen",
    logoutBtn: "Abmelden",
    loginTitle: "Partner Login",
    loginSub: "Anmelden um Ihre Gästemappe zu verwalten",
    lblEmail: "E-Mail-Adresse",
    lblPassword: "Passwort",
    btnLoginSubmit: "Anmelden",
    trialTitle: "30-Tage Testversion (PRO)",
    trialDaysLeft: "Tage verbleibend",
    statsScans: "QR-Code Scans",
    statsActiveRooms: "Aktive Zimmer-Zugriffe",
    qrTitle: "QR-Code & Print-Center",
    printA4: "Druckvorlage A4",
    printA5: "Druckvorlage A5",
    printCard: "Visitenkarte",
    sec1Title: "1. Unterkunft Informationen",
    sec2Title: "2. Logo hochladen",
    sec3Title: "3. Bilderverwaltung (Slider)",
    sec4Title: "4. Schnellzugriff (4 Fixe Standard-Karten)",
    sec5Title: "5. Gästemappe Kategorien (Preset-Katalog)",
    themeTitle: "6. Design & Farben",
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
    btnLogoUpload: "Logo Wählen",
    btnAddCategory: "Kategorie aus Katalog hinzufügen",
    selectCategoryPlaceholder: "Kategorie aus Preset-Katalog wählen..."
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
    adminTitle: "Management (Dashboard)",
    guestViewBtn: "Open Guest View",
    logoutBtn: "Log out",
    loginTitle: "Partner Login",
    loginSub: "Log in to manage your guest directory",
    lblEmail: "E-Mail Address",
    lblPassword: "Password",
    btnLoginSubmit: "Sign In",
    trialTitle: "30-Day Trial (PRO)",
    trialDaysLeft: "Days remaining",
    statsScans: "QR Code Scans",
    statsActiveRooms: "Active Room Access",
    qrTitle: "QR Code & Print Center",
    printA4: "Print Template A4",
    printA5: "Print Template A5",
    printCard: "Business Card",
    sec1Title: "1. Property Information",
    sec2Title: "2. Upload Logo",
    sec3Title: "3. Image Management",
    sec4Title: "4. Quick Access (4 Fixed Cards)",
    sec5Title: "5. Directory Categories (Preset Catalog)",
    themeTitle: "6. Design & Colors",
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
    btnLogoUpload: "Select Logo",
    btnAddCategory: "Add Category from Catalog",
    selectCategoryPlaceholder: "Select category from preset catalog..."
  },
  it: {
    welcomeBadge: "Guida Digitale",
    welcomeButton: "Inizia",
    greetingHello: "Ciao,",
    greetingWelcome: "benvenuto.",
    navHome: "Home",
    navGaestemappe: "Guida",
    navReview: "Recensione",
    navRoute: "Mappa",
    weatherTitle: "Sereno",
    weatherSub: "Meteo locale attuale",
    schnellzugriffTitle: "Accesso Rapido",
    wlanTitle: "WiFi",
    parkingTitle: "Parcheggio",
    breakfastTitle: "Colazione",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Torna alla Panoramica",
    adminTitle: "Gestione",
    guestViewBtn: "Apri Vista Ospite",
    logoutBtn: "Esci",
    loginTitle: "Login Partner",
    loginSub: "Accedi per gestire la guida",
    lblEmail: "E-mail",
    lblPassword: "Password",
    btnLoginSubmit: "Accedi",
    trialTitle: "Prova di 30 Giorni",
    trialDaysLeft: "Giorni rimanenti",
    statsScans: "Scansioni QR",
    statsActiveRooms: "Accessi Attivi",
    qrTitle: "Centro Stampa QR",
    printA4: "Stampa A4",
    printA5: "Stampa A5",
    printCard: "Biglietto",
    sec1Title: "1. Info Struttura",
    sec2Title: "2. Logo",
    sec3Title: "3. Immagini",
    sec4Title: "4. Accesso Rapido",
    sec5Title: "5. Categorie Guida (Catalogo)",
    themeTitle: "6. Design & Colori",
    lblHotelName: "Nome Struttura",
    lblPhone: "Telefono",
    lblEmailField: "E-Mail",
    lblAddress: "Indirizzo",
    lblWebsite: "Sito Web",
    lblGoogleReview: "Link Recensione Google",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "Password WiFi",
    lblBreakfastTime: "Orari Colazione",
    lblCheckInOut: "Info Check-in",
    lblParkingInfo: "Info Parcheggio",
    btnLogoUpload: "Carica Logo",
    btnAddCategory: "Aggiungi Categoria",
    selectCategoryPlaceholder: "Seleziona categoria..."
  },
  fr: {
    welcomeBadge: "Livret d'Accueil Numérique",
    welcomeButton: "C'est parti",
    greetingHello: "Bonjour,",
    greetingWelcome: "ravi de vous voir.",
    navHome: "Accueil",
    navGaestemappe: "Guide",
    navReview: "Avis",
    navRoute: "Itinéraire",
    weatherTitle: "Ensoleillé",
    weatherSub: "Météo locale actuelle",
    schnellzugriffTitle: "Accès Rapide",
    wlanTitle: "WiFi",
    parkingTitle: "Parking",
    breakfastTitle: "Petit-déjeuner",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Retour",
    adminTitle: "Gestion",
    guestViewBtn: "Vue Invité",
    logoutBtn: "Déconnexion",
    loginTitle: "Connexion Partenaire",
    loginSub: "Connectez-vous pour gérer",
    lblEmail: "E-Mail",
    lblPassword: "Mot de passe",
    btnLoginSubmit: "Se connecter",
    trialTitle: "Essai 30 Jours",
    trialDaysLeft: "Jours restants",
    statsScans: "Scans QR",
    statsActiveRooms: "Chambres Actives",
    qrTitle: "Centre d'Impression QR",
    printA4: "Impression A4",
    printA5: "Impression A5",
    printCard: "Carte de visite",
    sec1Title: "1. Infos Établissement",
    sec2Title: "2. Logo",
    sec3Title: "3. Images",
    sec4Title: "4. Accès Rapide",
    sec5Title: "5. Catégories (Catalogue)",
    themeTitle: "6. Thème & Couleurs",
    lblHotelName: "Nom de l'Établissement",
    lblPhone: "Téléphone",
    lblEmailField: "E-Mail",
    lblAddress: "Adresse",
    lblWebsite: "Site Web",
    lblGoogleReview: "Lien Avis Google",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "Mot de passe WiFi",
    lblBreakfastTime: "Horaires petit-déjeuner",
    lblCheckInOut: "Infos Check-in",
    lblParkingInfo: "Infos Parking",
    btnLogoUpload: "Télécharger logo",
    btnAddCategory: "Ajouter une catégorie",
    selectCategoryPlaceholder: "Sélectionner une catégorie..."
  },
  es: {
    welcomeBadge: "Carpeta Digital",
    welcomeButton: "Empezar",
    greetingHello: "Hola,",
    greetingWelcome: "qué bueno que estás aquí.",
    navHome: "Inicio",
    navGaestemappe: "Guía",
    navReview: "Opinión",
    navRoute: "Ruta",
    weatherTitle: "Soleado",
    weatherSub: "Clima local actual",
    schnellzugriffTitle: "Acceso Rápido",
    wlanTitle: "WiFi",
    parkingTitle: "Aparcamiento",
    breakfastTitle: "Desayuno",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Volver",
    adminTitle: "Gestión",
    guestViewBtn: "Vista Huésped",
    logoutBtn: "Cerrar sesión",
    loginTitle: "Login Partner",
    loginSub: "Inicia sesión para gestionar",
    lblEmail: "E-Mail",
    lblPassword: "Contraseña",
    btnLoginSubmit: "Entrar",
    trialTitle: "Prueba de 30 Días",
    trialDaysLeft: "Días restantes",
    statsScans: "Scaneos QR",
    statsActiveRooms: "Activo",
    qrTitle: "Centro de Impresión QR",
    printA4: "Imprimir A4",
    printA5: "Imprimir A5",
    printCard: "Tarjeta",
    sec1Title: "1. Info Alojamiento",
    sec2Title: "2. Logo",
    sec3Title: "3. Imágenes",
    sec4Title: "4. Acceso Rápido",
    sec5Title: "5. Categorías (Catálogo)",
    themeTitle: "6. Tema y Colores",
    lblHotelName: "Nombre del Alojamiento",
    lblPhone: "Teléfono",
    lblEmailField: "E-Mail",
    lblAddress: "Dirección",
    lblWebsite: "Sitio Web",
    lblGoogleReview: "Enlace Reseñas",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "Contraseña WiFi",
    lblBreakfastTime: "Horario Desayuno",
    lblCheckInOut: "Info Check-in",
    lblParkingInfo: "Info Parking",
    btnLogoUpload: "Subir Logo",
    btnAddCategory: "Añadir Categoría",
    selectCategoryPlaceholder: "Seleccionar categoría..."
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
    adminTitle: "Yönetim Paneli (Dashboard)",
    guestViewBtn: "Misafir Görünümünü Aç",
    logoutBtn: "Çıkış Yap",
    loginTitle: "Partner Girişi",
    loginSub: "Rehberinizi yönetmek için giriş yapın",
    lblEmail: "E-Posta Adresi",
    lblPassword: "Şifre",
    btnLoginSubmit: "Giriş Yap",
    trialTitle: "30 Günlük Deneme (PRO)",
    trialDaysLeft: "Gün kaldı",
    statsScans: "QR Kod Taramaları",
    statsActiveRooms: "Aktif Oda Erişimi",
    qrTitle: "QR Kod & Baskı Merkezi",
    printA4: "A4 Baskı Şablonu",
    printA5: "A5 Baskı Şablonu",
    printCard: "Kartvizit Şablonu",
    sec1Title: "1. Tesis Bilgileri & İletişim",
    sec2Title: "2. Logo Yükleme",
    sec3Title: "3. Resim Yönetimi (Slider)",
    sec4Title: "4. Hızlı Erişim (4 Sabit Kart)",
    sec5Title: "5. Rehber Kategorileri (Hazır Katalog)",
    themeTitle: "6. Tema & Renk Seçimi",
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
    selectCategoryPlaceholder: "Hazır katalogdan kategori seçin..."
  },
  sv: {
    welcomeBadge: "Digital Gästmapp",
    welcomeButton: "Nu kör vi",
    greetingHello: "Hej,",
    greetingWelcome: "kul att du är här.",
    navHome: "Hem",
    navGaestemappe: "Mapp",
    navReview: "Betygsätt",
    navRoute: "Vägvisning",
    weatherTitle: "Soligt",
    weatherSub: "Aktuellt lokalväder",
    schnellzugriffTitle: "Snabbåtkomst",
    wlanTitle: "WiFi",
    parkingTitle: "Parkering",
    breakfastTitle: "Frukost",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Tillbaka",
    adminTitle: "Administration",
    guestViewBtn: "Öppna Gästvy",
    logoutBtn: "Logga ut",
    loginTitle: "Partner Login",
    loginSub: "Logga in för att hantera din mapp",
    lblEmail: "E-postadress",
    lblPassword: "Lösenord",
    btnLoginSubmit: "Logga in",
    trialTitle: "30-Dagars Provperiod",
    trialDaysLeft: "Dagar kvar",
    statsScans: "QR-skanningar",
    statsActiveRooms: "Aktiva rum",
    qrTitle: "QR & Utskriftscenter",
    printA4: "Utskrift A4",
    printA5: "Utskrift A5",
    printCard: "Visiteffekt",
    sec1Title: "1. Boendeinformation",
    sec2Title: "2. Logo",
    sec3Title: "3. Bilder",
    sec4Title: "4. Snabbåtkomst",
    sec5Title: "5. Kategorier (Katalog)",
    themeTitle: "6. Tema & Färger",
    lblHotelName: "Boendets Namn",
    lblPhone: "Telefon",
    lblEmailField: "E-post",
    lblAddress: "Adress",
    lblWebsite: "Webbplats",
    lblGoogleReview: "Google Recension",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "WiFi-lösenord",
    lblBreakfastTime: "Frukosttider",
    lblCheckInOut: "Check-in info",
    lblParkingInfo: "Parkeringsinfo",
    btnLogoUpload: "Välj Logo",
    btnAddCategory: "Lägg till kategori",
    selectCategoryPlaceholder: "Välj kategori..."
  },
  no: {
    welcomeBadge: "Digital Gjestemappe",
    welcomeButton: "La oss gå",
    greetingHello: "Hei,",
    greetingWelcome: "så hyggelig at du er her.",
    navHome: "Hjem",
    navGaestemappe: "Mappe",
    navReview: "Vurder",
    navRoute: "Rute",
    weatherTitle: "Sol",
    weatherSub: "Lokalvær nå",
    schnellzugriffTitle: "Hurtigtilgang",
    wlanTitle: "WiFi",
    parkingTitle: "Parkering",
    breakfastTitle: "Frokost",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Tilbake",
    adminTitle: "Administrasjon",
    guestViewBtn: "Åpne Gjestevisning",
    logoutBtn: "Logg ut",
    loginTitle: "Partner Login",
    loginSub: "Logg inn for å administrere",
    lblEmail: "E-postadresse",
    lblPassword: "Passord",
    btnLoginSubmit: "Logg inn",
    trialTitle: "30-Dagers Prøveperiode",
    trialDaysLeft: "Dager igjen",
    statsScans: "QR-skanningar",
    statsActiveRooms: "Aktive rom",
    qrTitle: "QR & Utskriftssenter",
    printA4: "Utskrift A4",
    printA5: "Utskrift A5",
    printCard: "Visittkort",
    sec1Title: "1. Boenhetsinfo",
    sec2Title: "2. Logo",
    sec3Title: "3. Bilder",
    sec4Title: "4. Hurtigtilgang",
    sec5Title: "5. Kategorier (Katalog)",
    themeTitle: "6. Tema & Farger",
    lblHotelName: "Boenhetens Navn",
    lblPhone: "Telefon",
    lblEmailField: "E-post",
    lblAddress: "Adresse",
    lblWebsite: "Nettsted",
    lblGoogleReview: "Google Anmeldelse",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "WiFi Passord",
    lblBreakfastTime: "Frokosttider",
    lblCheckInOut: "Check-in info",
    lblParkingInfo: "Parkeringsinfo",
    btnLogoUpload: "Velg Logo",
    btnAddCategory: "Legg til kategori",
    selectCategoryPlaceholder: "Velg kategori..."
  },
  hr: {
    welcomeBadge: "Digitalni Mapa",
    welcomeButton: "Kreni",
    greetingHello: "Bok,",
    greetingWelcome: "drago nam je da si ovdje.",
    navHome: "Početna",
    navGaestemappe: "Mapa",
    navReview: "Ocijeni",
    navRoute: "Ruta",
    weatherTitle: "Sunčano",
    weatherSub: "Trenutno lokalno vrijeme",
    schnellzugriffTitle: "Brzi Pristup",
    wlanTitle: "WiFi",
    parkingTitle: "Parking",
    breakfastTitle: "Doručak",
    checkInOutTitle: "Prijava / Odjava",
    detailBack: "Natrag",
    adminTitle: "Upravljanje",
    guestViewBtn: "Otvori Pogled za Goste",
    logoutBtn: "Odjava",
    loginTitle: "Partner Login",
    loginSub: "Prijavite se za upravljanje",
    lblEmail: "E-mail adresa",
    lblPassword: "Lozinka",
    btnLoginSubmit: "Prijava",
    trialTitle: "30 Dana Probno",
    trialDaysLeft: "Dana preostalo",
    statsScans: "QR Skeniranja",
    statsActiveRooms: "Aktivno",
    qrTitle: "QR Centar",
    printA4: "Ispiši A4",
    printA5: "Ispiši A5",
    printCard: "Kartica",
    sec1Title: "1. Info Smještaja",
    sec2Title: "2. Logo",
    sec3Title: "3. Slike",
    sec4Title: "4. Brzi Pristup",
    sec5Title: "5. Kategorije (Katalog)",
    themeTitle: "6. Dizajn i Boje",
    lblHotelName: "Naziv Smještaja",
    lblPhone: "Telefon",
    lblEmailField: "E-Mail",
    lblAddress: "Adresa",
    lblWebsite: "Web stranica",
    lblGoogleReview: "Google Recenzija",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "WiFi Lozinka",
    lblBreakfastTime: "Vrijeme Doručka",
    lblCheckInOut: "Info Prijava",
    lblParkingInfo: "Info Parking",
    btnLogoUpload: "Učitaj Logo",
    btnAddCategory: "Dodaj Kategoriju",
    selectCategoryPlaceholder: "Odaberi kategoriju..."
  },
  sq: {
    welcomeBadge: "Dosja Digjitale",
    welcomeButton: "Le të fillojmë",
    greetingHello: "Përshëndetje,",
    greetingWelcome: "kënaqësi që jeni këtu.",
    navHome: "Kryefaqja",
    navGaestemappe: "Udhëzuesi",
    navReview: "Vlerëso",
    navRoute: "Rruga",
    schnellzugriffTitle: "Qasja e Shpejtë",
    weatherTitle: "Me diell",
    weatherSub: "Moti lokal aktual",
    wlanTitle: "WiFi",
    parkingTitle: "Parkimi",
    breakfastTitle: "Mëngjesi",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Kthehu",
    adminTitle: "Menaxhimi",
    guestViewBtn: "Hap Pamjen e Omsit",
    logoutBtn: "Dil",
    loginTitle: "Partner Login",
    loginSub: "Identifikohuni për të menaxhuar",
    lblEmail: "E-mail adresa",
    lblPassword: "Fjalëkalimi",
    btnLoginSubmit: "Hyr",
    trialTitle: "Prova 30 Ditë",
    trialDaysLeft: "Ditë të mbetura",
    statsScans: "Skanime QR",
    statsActiveRooms: "Aktiv",
    qrTitle: "Qendra e Printimit QR",
    printA4: "Printo A4",
    printA5: "Printo A5",
    printCard: "Kartë vizite",
    sec1Title: "1. Info e Pronës",
    sec2Title: "2. Logo",
    sec3Title: "3. Imazhet",
    sec4Title: "4. Qasja e Shpejtë",
    sec5Title: "5. Kategoritë (Katalogu)",
    themeTitle: "6. Tema & Ngjyrat",
    lblHotelName: "Emri i Pronës",
    lblPhone: "Telefoni",
    lblEmailField: "E-Mail",
    lblAddress: "Adresa",
    lblWebsite: "Faqja Web",
    lblGoogleReview: "Vlerësimi në Google",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "Fjalëkalimi WiFi",
    lblBreakfastTime: "Orari i Mëngjesit",
    lblCheckInOut: "Info Check-in",
    lblParkingInfo: "Info Parkimi",
    btnLogoUpload: "Ngarko Logo",
    btnAddCategory: "Shto Kategori",
    selectCategoryPlaceholder: "Zgjidh kategorinë..."
  }
};

// 8 ANA KATEGORİ VE PRESET KATALOĞU (10 DİLDE ÖNCEDEN HAZIR)
const categoryPresets = [
  // 1. Hotel & Unterkunft
  { id: 'hotel_info', group: '🏨 Hotel & Unterkunft', title: { de: 'Hotelinformationen', en: 'Hotel Information', it: 'Informazioni Hotel', fr: 'Informations Hôtel', es: 'Información del Hotel', tr: 'Otel Bilgileri', sv: 'Hotellinformation', no: 'Hotellinformasjon', hr: 'Informacije o hotelu', sq: 'Informacione mbi Hotelin' }, subtitle: { de: 'Rezeption, Zeiten & Services', en: 'Reception, hours & services', it: 'Ricevimento, orari e servizi', fr: 'Réception, horaires & services', es: 'Recepción y servicios', tr: 'Resepsiyon, saatler ve hizmetler', sv: 'Reception, tider & tjänster', no: 'Resepsjon, tider & tjenester', hr: 'Recepcija i usluge', sq: 'Recepsioni, oraret & shërbimet' }, content: { de: 'Herzlich willkommen in unserem Haus. Unsere Rezeption ist von 07:00 bis 22:00 Uhr für Sie besetzt.', en: 'Welcome to our property. Our reception is open from 7:00 AM to 10:00 PM.', it: 'Benvenuti nella nostra struttura. La reception è aperta dalle 07:00 alle 22:00.', fr: 'Bienvenue dans notre établissement. Notre réception est ouverte de 07h00 à 22h00.', es: 'Bienvenidos a nuestro alojamiento. Nuestra recepción está abierta de 07:00 a 22:00.', tr: 'Tesisimize hoş geldiniz. Resepsiyonumuz 07:00 - 22:00 saatleri arasında hizmet vermektedir.', sv: 'Välkommen till vårt boende. Rezeptionen är öppen 07:00–22:00.', no: 'Velkommen til vårt bosted. Resepsjonen er åpen 07:00–22:00.', hr: 'Dobrodošli u naš objekt. Recepcija radi od 07:00 do 22:00.', sq: 'Mirësevini në pronën tonë. Recepsioni ynë është i hapur nga ora 07:00 deri në 22:00.' }, icon: 'Building' },
  { id: 'room_info', group: '🏨 Hotel & Unterkunft', title: { de: 'Zimmerinformationen', en: 'Room Information', it: 'Informazioni Camere', fr: 'Informations Chambres', es: 'Información de la Habitación', tr: 'Oda Bilgileri', sv: 'Rumsinformation', no: 'Romsinformasjon', hr: 'Informacije o sobama', sq: 'Informacione mbi Dhomat' }, subtitle: { de: 'Ausstattung & Safe', en: 'Amenities & safe', it: 'Servizi in camera e cassaforte', fr: 'Équipements & coffre-fort', es: 'Equipamiento y caja fuerte', tr: 'Oda özellikleri ve kasa', sv: 'Bekvämligheter & kassaskåp', no: 'Fasiliteter & safe', hr: 'Sadržaji i sef', sq: 'Pajisjet & seaf' }, content: { de: 'Alle Zimmer sind mit einem Safe, Föhn und Flachbild-TV ausgestattet. Die Nutzung des Safes ist kostenfrei.', en: 'All rooms are equipped with a safe, hairdryer, and flat-screen TV. Safe usage is free of charge.', it: 'Tutte le camere sono dotate di cassaforte, asciugacapelli e TV a schermo piatto.', fr: 'Toutes les chambres disposent d’un coffre-fort, d’un sèche-cheveux et d’une TV.', es: 'Todas las habitaciones cuentan con caja fuerte, secador de pelo y TV de pantalla plana.', tr: 'Tüm odalar kasa, saç kurutma makinesi ve düz ekran TV ile donatılmıştır.', sv: 'Alla rum är utrustade med kassaskåp, hårtork och platt-TV.', no: 'Alle rom er utstyrt med safe, hårføner og flatskjerm-TV.', hr: 'Sve sobe opremljene su sefom, sušilom za kosu i TV-om.', sq: 'Të gjitha dhomat janë të pajisura me sef, tharëse flokësh dhe TV.' }, icon: 'Bed' },
  { id: 'keys_access', group: '🏨 Hotel & Unterkunft', title: { de: 'Zimmerschlüssel & Zugang', en: 'Keys & Access', it: 'Chiavi e Accesso', fr: 'Clés & Accès', es: 'Llaves y Acceso', tr: 'Anahtar ve Erişim', sv: 'Nycklar & Tillgång', no: 'Nøkler & Adgang', hr: 'Ključevi i pristup', sq: 'Çelësat & Qasja' }, subtitle: { de: 'Karte & Schließzeiten', en: 'Keycard & locking times', it: 'Scheda chiave e orari di chiusura', fr: 'Carte & horaires de fermeture', es: 'Tarjeta y horarios', tr: 'Anahtar kartı ve kapı kilit saatleri', sv: 'Nyckelkort & öppettider', no: 'Nøkkelkort & åpningstider', hr: 'Ključ kartica i radno vrijeme', sq: 'Karta e çelësit & oraret' }, content: { de: 'Bitte nehmen Sie Ihre Schlüsselkarte beim Verlassen des Hauses mit. Der Hoteleingang ist nachts ab 23:00 Uhr verschlossen (Zugang mit Karte).', en: 'Please take your keycard with you when leaving. The hotel entrance is locked at 11:00 PM (access with card).', it: 'Si prega di portare con sé la chiave elettronica. L’ingresso è chiuso dalle 23:00.', fr: 'Veuillez emporter votre carte. L’entrée est fermée à partir de 23h00 (accès par badge).', es: 'Por favor, lleve su tarjeta al salir. La entrada se cierra a las 23:00 (acceso con tarjeta).', tr: 'Lütfen çıkarken anahtar kartınızı yanınıza alın. Otel girişi gece 23:00’te kilitlenir (kartla giriş).', sv: 'Ta med nyckelkortet. Entrén är låst kl 23:00 (åtkomst med kort).', no: 'Ta med nøkkelkortet. Inngangen er låst kl 23:00 (adgang med kort).', hr: 'Molimo ponesite karticu. Ulaz se zaključava u 23:00 (pristup karticom).', sq: 'Ju lutemi merrni kartën me vete. Hyrja mbyllet në orën 23:00 (qasja me kartë).' }, icon: 'Key' },

  // 2. Essen & Trinken
  { id: 'restaurant_dining', group: '🍽️ Essen & Trinken', title: { de: 'Restaurant & Bar', en: 'Restaurant & Bar', it: 'Ristorante e Bar', fr: 'Restaurant & Bar', es: 'Restaurante y Bar', tr: 'Restoran ve Bar', sv: 'Restaurang & Bar', no: 'Restaurant & Bar', hr: 'Restoran i bar', sq: 'Restorant & Bar' }, subtitle: { de: 'Öffnungszeiten & Speisekarte', en: 'Hours & menu', it: 'Orari e menu', fr: 'Horaires & menu', es: 'Horarios y menú', tr: 'Çalışma saatleri ve menü', sv: 'Öppettider & meny', no: 'Åpningstider & meny', hr: 'Radno vrijeme i jelovnik', sq: 'Oraret & menuja' }, content: { de: 'Unser Restaurant serviert regionale Spezialitäten von 18:00 bis 21:30 Uhr. Die Bar ist bis 24:00 Uhr geöffnet.', en: 'Our restaurant serves regional specialties from 6:00 PM to 9:30 PM. The bar is open until midnight.', it: 'Il nostro ristorante serve specialità regionali dalle 18:00 alle 21:30.', fr: 'Notre restaurant sert des spécialités régionales de 18h00 à 21h30.', es: 'Nuestro restaurante sirve especialidades regionales de 18:00 a 21:30.', tr: 'Restoranımız 18:00 - 21:30 saatleri arasında yöresel lezzetler sunmaktadır. Bar 24:00’e kadar açıktır.', sv: 'Vår restaurang serverar regionala rätter kl 18:00–21:30.', no: 'Vår restaurant serverer regionale retter kl 18:00–21:30.', hr: 'Naš restoran poslužuje specijalitete od 18:00 do 21:30.', sq: 'Restoranti ynë shërben specialitete rajonale nga ora 18:00 deri në 21:30.' }, icon: 'Utensils' },
  { id: 'cafe_snacks', group: '🍽️ Essen & Trinken', title: { de: 'Café & Lounge', en: 'Café & Lounge', it: 'Caffè e Lounge', fr: 'Café & Lounge', es: 'Café y Lounge', tr: 'Kafe ve Dinlenme Alanı', sv: 'Café & Lounge', no: 'Kafé & Lounge', hr: 'Kafić i salon', sq: 'Kafe & Lounge' }, subtitle: { de: 'Kaffee, Kuchen & Snacks', en: 'Coffee, cake & snacks', it: 'Caffè, dolci e snack', fr: 'Café, gâteaux & en-cas', es: 'Café, pasteles y aperitivos', tr: 'Kahve, kek ve atıştırmalıklar', sv: 'Kaffe, tårta & snacks', no: 'Kaffe, kake & snacks', hr: 'Kava, kolači i zalogaji', sq: 'Kafe, ëmbëlsira & snack' }, content: { de: 'Genießen Sie am Nachmittag hausgemachten Kuchen und Kaffeespezialitäten in unserer Lobby-Lounge.', en: 'Enjoy homemade cake and coffee specialties in our lobby lounge in the afternoon.', it: 'Godetevi dolci fatti in casa e caffè nella nostra lobby lounge.', fr: 'Profitez de gâteaux faits maison dans notre salon.', es: 'Disfrute de pasteles caseros en nuestro salón del vestíbulo.', tr: 'Lobi salonumuzda öğleden sonra ev yapımı keklerin ve kahve çeşitlerinin tadını çıkarın.', sv: 'Njut av hembakad tårta och kaffe i vår lobby.', no: 'Nyt hjemmelaget kake og kaffe i lobbyen.', hr: 'Uživajte u domaćim kolačima i kavi u predvorju.', sq: 'Shijoni ëmbëlsira shtëpie dhe kafe në ambientin tonë.' }, icon: 'Coffee' },

  // 3. Wellness & Spa
  { id: 'pool_aqua', group: '🧖 Wellness & Spa', title: { de: 'Pool & Wellnessbereich', en: 'Pool & Wellness Area', it: 'Piscina e Benessere', fr: 'Piscine & Espace Bien-être', es: 'Piscina y Spa', tr: 'Havuz ve Wellness Alanı', sv: 'Pool & Wellness', no: 'Basseng & Velvære', hr: 'Bazen i wellness', sq: 'Pishina & Wellness' }, subtitle: { de: 'Öffnungszeiten & Handtücher', en: 'Hours & towels', it: 'Orari e asciugamani', fr: 'Horaires & serviettes', es: 'Horarios y toallas', tr: 'Çalışma saatleri ve havlular', sv: 'Öppettider & handdukar', no: 'Åpningstider & håndklær', hr: 'Radno vrijeme i ručnici', sq: 'Oraret & peshqirët' }, content: { de: 'Unser Indoor-Pool ist täglich von 07:00 bis 20:00 Uhr geöffnet. Bademäntel liegen auf Ihrem Zimmer bereit.', en: 'Our indoor pool is open daily from 7:00 AM to 8:00 PM. Bathrobes are ready in your room.', it: 'La nostra piscina coperta è aperta tutti i giorni dalle 07:00 alle 20:00.', fr: 'Notre piscine intérieure est ouverte de 07h00 à 20h00.', es: 'Nuestra piscina cubierta está abierta de 07:00 a 20:00.', tr: 'Kapalı havuzumuz her gün 07:00 - 20:00 saatleri arasında açıktır. Bornozlar odanızda hazırdır.', sv: 'Vår inomhuspool är öppen dagligen 07:00–20:00.', no: 'Vårt innendørsbasseng er åpent daglig 07:00–20:00.', hr: 'Naš unutarnji bazen otvoren je svakodnevno od 07:00 do 20:00.', sq: 'Pishina jonë e mbyllur është e hapur çdo ditë nga ora 07:00 deri në 20:00.' }, icon: 'Waves' },
  { id: 'sauna_spa', group: '🧖 Wellness & Spa', title: { de: 'Sauna & Massagen', en: 'Sauna & Massages', it: 'Sauna e Massaggi', fr: 'Sauna & Massages', es: 'Sauna y Masajes', tr: 'Sauna ve Masajlar', sv: 'Sauna & Massage', no: 'Sauna & Massasje', hr: 'Sauna i masaže', sq: 'Sauna & Masazhe' }, subtitle: { de: 'Finnische Sauna & Termine', en: 'Finnish sauna & appointments', it: 'Sauna finlandese e appuntamenti', fr: 'Sauna finlandais & rendez-vous', es: 'Sauna finlandesa y citas', tr: 'Fin saunası ve randevu', sv: 'Finsk bastu & bokning', no: 'Finsk badstue & bestilling', hr: 'Finska sauna i termini', sq: 'Sauna finlandeze & takimet' }, content: { de: 'Entspannen Sie in unserer finnischen Sauna (16:00 bis 21:00 Uhr). Massagen können an der Rezeption gebucht werden.', en: 'Relax in our Finnish sauna (4:00 PM to 9:00 PM). Massages can be booked at reception.', it: 'Rilassatevi nella nostra sauna finlandese (dalle 16:00 alle 21:00).', fr: 'Détendez-vous dans notre sauna finlandais (16h00 à 21h00).', es: 'Relájese en nuestra sauna finlandesa (16:00 a 21:00).', tr: 'Fin saunamızda rahatlayın (16:00 - 21:00). Masajlar için resepsiyondan randevu alabilirsiniz.', sv: 'Koppla av i vår finska bastu (16:00–21:00).', no: 'Slapp av i vår finske badstue (16:00–21:00).', hr: 'Opustite se u finskoj sauni (16:00 do 21:00).', sq: 'Relaksohuni në saunën tonë finlandeze (16:00 deri në 21:00).' }, icon: 'Sparkles' },

  // 4. Freizeit & Aktivitäten
  { id: 'bike_rental', group: '🎯 Freizeit & Aktivitäten', title: { de: 'Fahrradverleih', en: 'Bike Rental', it: 'Noleggio Bici', fr: 'Location de Vélos', es: 'Alquiler de Bicicletas', tr: 'Bisiklet Kiralama', sv: 'Cykeluthyrning', no: 'Sykkelutleie', hr: 'Najam bicikala', sq: 'Qiradhënie Biçikletash' }, subtitle: { de: 'E-Bikes & Tourenkarten', en: 'E-bikes & trail maps', it: 'E-bike e mappe', fr: 'Vélos électriques & cartes', es: 'Bicicletas eléctricas y mapas', tr: 'Elektrikli bisiklet ve haritalar', sv: 'E-cyklar & kartor', no: 'El-sykler & kart', hr: 'E-bicikli i karte', sq: 'E-bike & harta' }, content: { de: 'Entdecken Sie die Region per Rad. Hochwertige E-Bikes können tageweise an der Rezeption ausgeliehen werden.', en: 'Explore the region by bike. High-quality e-bikes can be rented daily at reception.', it: 'Esplorate la regione in bicicletta. E-bike disponibili alla reception.', fr: 'Explorez la région à vélo. Vélos électriques disponibles à la réception.', es: 'Explore la región en bicicleta. E-bikes disponibles en recepción.', tr: 'Bölgeyi bisikletle keşfedin. Kaliteli e-bisikletler resepsiyondan günlük kiralanabilir.', sv: 'Utforska regionen på cykel. E-cyklar finns att hyra i rezeptionen.', no: 'Utforsk regionen på sykkel. El-sykler kan leies i resepsjonen.', hr: 'Istražite regiju biciklom. E-bicikli se mogu iznajmiti na recepciji.', sq: 'Eksploroni rajonin me biçikletë. E-bike mund t’i merrni me qira në recepsion.' }, icon: 'Compass' },

  // 5. Umgebung & Ausflüge
  { id: 'sightseeing', group: '📍 Umgebung & Ausflüge', title: { de: 'Sehenswürdigkeiten', en: 'Sights & Attractions', it: 'Attrazioni', fr: 'Sites Touristiques', es: 'Lugares de Interés', tr: 'Görülecek Yerler', sev: 'Sevärdheter', no: 'Severdigheter', hr: 'Znamenitosti', sq: 'Vendet Turistike' }, subtitle: { de: 'Tipps & Highlights', en: 'Tips & highlights', it: 'Consigli e punti di interesse', fr: 'Conseils & points forts', es: 'Consejos y lugares', tr: 'İpuçları ve önemli noktalar', sev: 'Tips & höjdpunkter', no: 'Tips & høydepunkter', hr: 'Savjeti i atrakcije', sq: 'Këshilla & pikat kryesore' }, content: { de: 'Die historische Altstadt und malerische Weinberge laden zu Spaziergängen ein. Sprechen Sie uns für Ausflugstipps an.', en: 'The historic old town and picturesque vineyards invite you to take walks. Ask us for tips.', it: 'Il centro storico e i vigneti invitano a fare passeggiate.', fr: 'La vieille ville historique et les vignobles vous invitent à la promenade.', es: 'El casco antiguo y los viñedos invitan a dar paseos.', tr: 'Tarihi eski şehir ve pitoresk bağlar yürüyüşler için davetkardır. Gezi ipuçları için bize danışın.', sev: 'Den historiska gamla staden inbjuder till promenader.', no: 'Den historiske gamle byen inviterer til turer.', hr: 'Povijesna stara jezgra poziva na šetnju.', sq: 'Qyteti i vjetër historik dhe vreshtat piktoresk ju ftojnë për shëtitje.' }, icon: 'MapPin' },

  // 6. Anreise & Mobilität
  { id: 'parking_mobility', group: '🚕 Anreise & Mobilität', title: { de: 'Parkmöglichkeiten', en: 'Parking Facilities', it: 'Parcheggio', fr: 'Stationnement', es: 'Aparcamiento', tr: 'Otopark İmkanları', sv: 'Parkering', no: 'Parkering', hr: 'Parkiralište', sq: 'Parkingjet' }, subtitle: { de: 'Tiefgarage & E-Ladestation', en: 'Underground garage & EV charger', it: 'Garage e colonnina', fr: 'Garage & borne de recharge', es: 'Garaje y cargador EV', tr: 'Kapalı otopark ve elektrikli şarj', sv: 'Garage & elbilsladdning', no: 'Garasje & elbil-lader', hr: 'Garaža i punjač', sq: 'Garazh & karikues EV' }, content: { de: 'Ihnen stehen kostenfreie Parkplätze direkt am Haus sowie E-Ladesäulen in der Tiefgarage zur Verfügung.', en: 'Free parking spaces directly at the house and EV charging stations in the underground garage are available.', it: 'Parcheggio gratuito in loco e colonnine di ricarica in garage.', fr: 'Parking gratuit sur place et bornes de recharge dans le garage souterrain.', es: 'Aparcamiento gratuito en el hotel y cargadores EV en el garaje subterráneo.', tr: 'Otelimizin hemen yanında ücretsiz otoparklar ve kapalı otoparkta elektrikli araç şarj istasyonları mevcuttur.', sv: 'Gratis parkering vid hotellet och laddboxar i garaget.', no: 'Gratis parkering ved hotellet og elbil-ladere i garasjen.', hr: 'Besplatan parking i punjači za električna vozila u garaži.', sq: 'Parking falas në pronë dhe karikues EV në garazh.' }, icon: 'Car' },

  // 7. Service & Informationen
  { id: 'reception_service', group: 'ℹ️ Service & Informationen', title: { de: 'Rezeption & Service', en: 'Reception & Service', it: 'Ricevimento e Servizi', fr: 'Réception & Service', es: 'Recepción y Servicio', tr: 'Resepsiyon ve Servis', sv: 'Reception & Service', no: 'Resepsjon & Service', hr: 'Recepcija i usluge', sq: 'Recepsioni & Shërbimi' }, subtitle: { de: 'Weckruf & Gepäck', en: 'Wake-up call & luggage', it: 'Servizio sveglia e bagagli', fr: 'Service de réveil & bagages', es: 'Servicio despertador y maletas', tr: 'Uyandırma servisi ve bagaj', sv: 'Väckning & bagage', no: 'Vekking & bagasje', hr: 'Usluga buđenja i prtljaga', sq: 'Zgjimi & bagazhi' }, content: { de: 'Für Wünsche, Weckrufe oder Gepäckaufbewahrung erreichen Sie die Rezeption unter der Kurzwahl 9.', en: 'For requests, wake-up calls, or luggage storage, reach reception at extension 9.', it: 'Per richieste o deposito bagagli, contattare la reception al numero 9.', fr: 'Pour toute demande, contactez la réception au poste 9.', es: 'Para solicitudes o consigna de equipaje, contacte con recepción en la extensión 9.', tr: 'İstekleriniz, uyandırma servisi veya bagaj muhafazası için 9’u tuşlayarak resepsiyona ulaşabilirsiniz.', sv: 'För väckning eller bagageförvaring, nå receptionen på anknytning 9.', no: 'For vekking eller bagasjeoppbevaring, nå resepsjonen på lokalnummer 9.', hr: 'Za pozive za buđenje ili prtljagu, nazovite recepciju na 9.', sq: 'Për shërbim zgjimi ose ruajtje bagazhi, kontaktoni recepsionin në numrin 9.' }, icon: 'Phone' },

  // 8. Regeln & Wissenswertes
  { id: 'house_rules', group: '📋 Regeln & Wissenswertes', title: { de: 'Hausordnung & Ruhezeiten', en: 'House Rules & Quiet Hours', it: 'Regolamento e Orari di Silenzio', fr: 'Règlement Intérieur', es: 'Normas de la Casa', tr: 'Ev Kuralları ve Sessizlik', sv: 'Ordningsregler', no: 'Husordensregler', hr: 'Kućni red', sq: 'Rregullorja e Shtëpisë' }, subtitle: { de: 'Nachtruhe ab 22:00 Uhr', en: 'Quiet hours from 10:00 PM', it: 'Ore di silenzio dalle 22:00', fr: 'Heures calmes dès 22h00', es: 'Horas de silencio desde las 22:00', tr: '22:00’den itibaren gece sessizliği', sv: 'Tyst tidslinje från 22:00', no: 'Stilletid fra 22:00', hr: 'Noćni mir od 22:00', sq: 'Orari i qetësisë nga ora 22:00' }, content: { de: 'Wir bitten Sie ab 22:00 Uhr die Nachtruhe einzuhalten. Das Rauchen ist in allen Innenbereichen untersagt.', en: 'We ask you to observe quiet hours from 10:00 PM. Smoking is prohibited in all indoor areas.', it: 'Vi chiediamo di rispettare il silenzio dalle 22:00. Vietato fumare all’interno.', fr: 'Veuillez respecter le calme à partir de 22h00. Interdit de fumer à l’intérieur.', es: 'Rogamos guarden silencio a partir de las 22:00. Prohibido fumar en interiores.', tr: 'Lütfen saat 22:00’den itibaren gece sessizliğine uyunuz. Tüm kapalı alanlarda sigara içmek yasaktır.', sv: 'Vi ber dig iaktta tystnad från kl 22:00. Rökning är förbjuden inomhus.', no: 'Vi ber deg respektere stilletid fra kl 22:00. Røyking er forbudt innendørs.', hr: 'Molimo poštujte noćni mir od 22:00. Pušenje u zatvorenom je zabranjeno.', sq: 'Ju lutemi respektoni qetësinë nga ora 22:00. Duhani është i ndaluar brenda.' }, icon: 'ShieldCheck' }
];

export default function App() {
  const [lang, setLang] = useState('de');
  const t = translations[lang] || translations.de;

  const [appMode, setAppMode] = useState('guest'); 
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedWifi, setCopiedWifi] = useState(false);

  const [scanCount] = useState(142);
  const [daysLeft] = useState(24);

  const [hotel, setHotel] = useState({
    logoUrl: '', 
    name: 'Boutique Hotel & Suites', 
    locationTitle: 'REGION / STANDORT',
    welcomeGreeting: '', 
    phone: '+49 123 456789',
    email: 'info@meine-unterkunft.de',
    address: 'Musterstraße 1, 12345 Musterstadt',
    website: 'www.meine-unterkunft.de',
    googleReviewUrl: 'https://g.page/r/example/review',
    
    // 4 SABİT HIZLI ERİŞİM ALANI
    wifiSsid: 'Guest_WiFi',
    wifiPass: 'welcome2026',
    breakfastTime: '07:30 - 10:30 Uhr',
    checkInOut: 'Check-in: ab 15:00 | Check-out: bis 11:00',
    parkingInfo: 'Kostenfreie Parkplätze am Haus verfügbar.',

    themeColor: 'amber',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
    ]
  });

  // AKTİF KATEGORİLER (OTELCİNİN SEÇTİĞİ PRESETLER)
  const [categories, setCategories] = useState([
    { id: 'hotel_info', presetId: 'hotel_info', icon: 'Building' },
    { id: 'restaurant_dining', presetId: 'restaurant_dining', icon: 'Utensils' },
    { id: 'pool_aqua', presetId: 'pool_aqua', icon: 'Waves' }
  ]);

  const [selectedPresetToAdd, setSelectedPresetToAdd] = useState('');

  const themes = {
    sahara: { name: 'Sahara', primary: 'text-amber-700', bgPrimary: 'bg-amber-700', bgLight: 'bg-amber-50', dot: 'bg-amber-700' },
    aegean: { name: 'Aegean', primary: 'text-teal-700', bgPrimary: 'bg-teal-700', bgLight: 'bg-teal-50', dot: 'bg-teal-700' },
    forest: { name: 'Forest', primary: 'text-emerald-800', bgPrimary: 'bg-emerald-800', bgLight: 'bg-emerald-50', dot: 'bg-emerald-800' },
    amber: { name: 'Amber', primary: 'text-amber-900', bgPrimary: 'bg-amber-900', bgLight: 'bg-amber-50', dot: 'bg-amber-900' },
    urban: { name: 'Urban', primary: 'text-slate-700', bgPrimary: 'bg-slate-700', bgLight: 'bg-slate-50', dot: 'bg-slate-700' },
    stone: { name: 'Stone', primary: 'text-stone-700', bgPrimary: 'bg-stone-700', bgLight: 'bg-stone-100', dot: 'bg-stone-700' },
    bordeaux: { name: 'Bordeaux', primary: 'text-rose-900', bgPrimary: 'bg-rose-900', bgLight: 'bg-rose-50', dot: 'bg-rose-900' },
    midnight: { name: 'Midnight', primary: 'text-zinc-900', bgPrimary: 'bg-zinc-900', bgLight: 'bg-zinc-100', dot: 'bg-zinc-900' }
  };

  const currentTheme = themes[hotel.themeColor] || themes.amber;

  const hotelSlug = hotel.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const hotelUrl = `https://gastemappe24-pro.vercel.app/?hotel=${hotelSlug}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(hotelUrl)}`;

  const handlePrint = (format) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head><title>QR-Code ${format} ${hotel.name}</title></head>
        <body style="text-align:center;font-family:sans-serif;padding:40px;">
          <h2>${hotel.name}</h2>
          <img src="${qrCodeUrl}" width="200" />
          <p>Digitaler Gästemappe</p>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const copyWifiPassword = () => {
    navigator.clipboard.writeText(hotel.wifiPass);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!emailInput.includes('@')) {
      setAuthError('Gültige E-Mail erforderlich.');
      return;
    }
    if (passwordInput.length < 6) {
      setAuthError('Mindestens 6 Zeichen.');
      return;
    }
    setAppMode('dashboard');
    setIsAuthModalOpen(false);
    setPasswordInput('');
  };

  // PRESET KATEGORİ EKLEME
  const handleAddPresetCategory = (e) => {
    e.preventDefault();
    if (!selectedPresetToAdd) return;
    if (categories.some(c => c.presetId === selectedPresetToAdd)) {
      alert('Diese Kategorie wurde bereits hinzugefügt.');
      return;
    }
    const presetObj = categoryPresets.find(p => p.id === selectedPresetToAdd);
    if (presetObj) {
      setCategories([...categories, { id: Date.now().toString(), presetId: presetObj.id, icon: presetObj.icon }]);
      setSelectedPresetToAdd('');
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const renderIcon = (iconName) => {
    const props = { className: `w-5 h-5 ${currentTheme.primary}` };
    switch (iconName) {
      case 'Building': return <Building {...props} />;
      case 'Bed': return <Bed {...props} />;
      case 'Key': return <Key {...props} />;
      case 'Utensils': return <Utensils {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      case 'Waves': return <Waves {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'MapPin': return <MapPin {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Phone': return <Phone {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      default: return <Info {...props} />;
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setHotel((prev) => ({ ...prev, logoUrl: reader.result })); };
      reader.readAsDataURL(file);
    }
  };

  // 1. DASHBOARD MODU (OTELCİ PANELİ - ŞIK & KUSURSUZ)
  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] font-sans text-slate-800 p-6 md:p-10 space-y-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center pb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="bg-amber-900 text-white font-black px-3 py-1.5 rounded-xl text-sm">G</span>
            <span className="font-extrabold text-lg tracking-tight">gastemappe24 <span className="text-amber-800 text-xs uppercase px-1.5 py-0.5 bg-amber-100 rounded-md">PRO</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-stone-600">{emailInput || 'demo@gastemappe24.de'}</span>
            <button onClick={() => { setAppMode('guest'); setShowWelcomeScreen(false); }} className="bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition cursor-pointer">
              {t.guestViewBtn}
            </button>
            <button onClick={() => { setAppMode('guest'); setEmailInput(''); }} className="text-xs font-bold text-rose-700 hover:underline cursor-pointer flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" /> {t.logoutBtn}
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t.adminTitle}</h1>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            
            {/* OTEL BİLGİLERİ */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider">{t.sec1Title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblHotelName}</label>
                  <input type="text" value={hotel.name} onChange={(e) => setHotel({ ...hotel, name: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblAddress}</label>
                  <input type="text" value={hotel.address} onChange={(e) => setHotel({ ...hotel, address: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
              </div>
            </div>

            {/* HIZLI ERİŞİM (4 SABİT KART YÖNETİMİ) */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider">{t.sec4Title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblWifiSsid}</label>
                  <input type="text" value={hotel.wifiSsid} onChange={(e) => setHotel({ ...hotel, wifiSsid: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblWifiPass}</label>
                  <input type="text" value={hotel.wifiPass} onChange={(e) => setHotel({ ...hotel, wifiPass: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblBreakfastTime}</label>
                  <input type="text" value={hotel.breakfastTime} onChange={(e) => setHotel({ ...hotel, breakfastTime: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblCheckInOut}</label>
                  <input type="text" value={hotel.checkInOut} onChange={(e) => setHotel({ ...hotel, checkInOut: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
              </div>
            </div>

            {/* PRESET KATEGORİ SEÇİMİ (ZENGİN KATALOG) */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider">{t.sec5Title}</h3>
              
              <div className="space-y-2">
                {categories.map((cat) => {
                  const presetData = categoryPresets.find(p => p.id === cat.presetId);
                  const localizedTitle = presetData ? (presetData.title[lang] || presetData.title.de) : 'Kategorie';
                  const localizedSub = presetData ? (presetData.subtitle[lang] || presetData.subtitle.de) : '';

                  return (
                    <div key={cat.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border text-xs">
                      <div className="flex items-center gap-3">
                        {renderIcon(cat.icon)}
                        <div>
                          <span className="font-bold block text-slate-900">{localizedTitle}</span>
                          <span className="text-[10px] text-stone-500">{localizedSub}</span>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteCategory(cat.id)} className="bg-rose-50 text-rose-600 p-1.5 rounded-lg cursor-pointer hover:bg-rose-100"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  );
                })}
              </div>

              {/* Katalogdan Ekleme Formu */}
              <form onSubmit={handleAddPresetCategory} className="pt-3 border-t flex gap-2">
                <select value={selectedPresetToAdd} onChange={(e) => setSelectedPresetToAdd(e.target.value)} className="p-2.5 text-xs border rounded-xl bg-white w-full cursor-pointer">
                  <option value="">{t.selectCategoryPlaceholder}</option>
                  {categoryPresets.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.group} → {preset.title[lang] || preset.title.de}
                    </option>
                  ))}
                </select>
                <button type="submit" className="bg-amber-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow cursor-pointer shrink-0 flex items-center gap-1 hover:bg-amber-950">
                  <Plus className="w-4 h-4" /> {t.btnAddCategory}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 2. MİSAFİR GÖRÜNÜMÜ (WELCOMESCREEN)
  if (showWelcomeScreen) {
    return (
      <div className="min-h-screen bg-slate-950 max-w-md mx-auto shadow-2xl relative overflow-hidden flex flex-col justify-between font-sans">
        <div className="absolute inset-0 z-0">
          <img src={hotel.images[0]} alt="Welcome" className="w-full h-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
        </div>

        <div className="relative z-10 p-6 flex justify-between items-center text-white">
          <span className="text-xs font-bold tracking-wider uppercase opacity-90">{hotel.name}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-black/40 border border-white/30 text-white text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none backdrop-blur-md cursor-pointer">
            <option value="de" className="bg-slate-900">🇩🇪 DE</option>
            <option value="en" className="bg-slate-900">🇬🇧 EN</option>
            <option value="it" className="bg-slate-900">🇮🇹 IT</option>
            <option value="fr" className="bg-slate-900">🇫🇷 FR</option>
            <option value="es" className="bg-slate-900">🇪🇸 ES</option>
            <option value="tr" className="bg-slate-900">🇹🇷 TR</option>
            <option value="sv" className="bg-slate-900">🇸🇪 SV</option>
            <option value="no" className="bg-slate-900">🇳🇴 NO</option>
            <option value="hr" className="bg-slate-900">🇭🇷 HR</option>
            <option value="sq" className="bg-slate-900">🇦🇱 SQ</option>
          </select>
        </div>

        <div className="relative z-10 p-6 space-y-4 text-white">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">{t.welcomeBadge}</span>
            <h1 className="text-3xl font-black tracking-tight pt-2">{hotel.name}</h1>
          </div>
          <button onClick={() => setShowWelcomeScreen(false)} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-sm shadow-2xl hover:bg-slate-100 transition flex items-center justify-center gap-2 cursor-pointer">
            <span>{t.welcomeButton}</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 3. MİSAFİR REHBER EKRANI (4 SABİT HIZLI ERİŞİM KARTI + PRESET KATEGORİLER)
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-32 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-amber-900" />
                <h2 className="font-bold text-base text-slate-900">{t.loginTitle}</h2>
              </div>
              <button onClick={() => setIsAuthModalOpen(false)} className="text-stone-400 font-bold p-1 cursor-pointer">✕</button>
            </div>
            <p className="text-xs text-stone-500">{t.loginSub}</p>
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblEmail}</label>
                <input type="email" placeholder="ihre@email.de" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full p-3 text-xs border border-stone-200 rounded-xl focus:outline-none" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblPassword}</label>
                <input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full p-3 text-xs border border-stone-200 rounded-xl focus:outline-none font-mono" required />
              </div>
              {authError && <p className="text-[11px] text-rose-600 font-bold">{authError}</p>}
              <button type="submit" className="w-full bg-amber-900 hover:bg-amber-950 text-white py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer transition">{t.btnLoginSubmit}</button>
            </form>
          </div>
        </div>
      )}

      <header className="p-5 pt-6 pb-2 bg-stone-50 sticky top-0 z-40 backdrop-blur-md bg-stone-50/95 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl ${currentTheme.bgPrimary} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>{hotel.name.charAt(0)}</div>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-800">{hotel.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white border border-stone-200 text-slate-700 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer shadow-sm">
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
          <button onClick={() => setIsAuthModalOpen(true)} className="text-stone-300 hover:text-stone-600 p-1 text-xs cursor-pointer" title="Partner Login">🔑</button>
        </div>
      </header>

      <main className="p-5 space-y-5">
        {selectedCategory ? (
          <div className="space-y-4 animate-fade-in">
            <button onClick={() => setSelectedCategory(null)} className={`text-xs font-bold ${currentTheme.primary} flex items-center gap-1 cursor-pointer`}>&larr; {t.detailBack}</button>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-4">
              <h2 className="text-lg font-black text-slate-900">{selectedCategory.title}</h2>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedCategory.content}</p>
            </div>
          </div>
        ) : (
          activeTab === 'home' ? (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-0.5 pt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 block">{hotel.locationTitle}</span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">{t.greetingHello}<br /><span className={currentTheme.primary}>{hotel.welcomeGreeting || t.greetingWelcome}</span></h1>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-lg h-56 bg-slate-900 border border-stone-200">
                <img src={hotel.images[currentSlide] || hotel.images[0]} alt="Slide" className="w-full h-full object-cover" />
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${currentTheme.bgLight} rounded-xl ${currentTheme.primary}`}><Sun className="w-6 h-6" /></div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 uppercase">{t.weatherTitle}</div>
                    <div className="text-[11px] text-stone-500">{t.weatherSub}</div>
                  </div>
                </div>
                <div className="text-right"><div className="text-2xl font-black text-slate-900">16°C</div></div>
              </div>

              {/* 4 SABİT HIZLI ERİŞİM KARTI */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
                  <div className={`flex items-center gap-2 ${currentTheme.primary}`}><Wifi className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.wlanTitle}</span></div>
                  <div className="text-[11px] text-slate-500 font-mono bg-stone-50 p-2 rounded-lg border">
                    <div><b>{hotel.wifiSsid}</b></div>
                    <div className="flex justify-between items-center mt-1">
                      <span>{hotel.wifiPass}</span>
                      <button onClick={copyWifiPassword} className={`${currentTheme.bgLight} ${currentTheme.primary} p-1 rounded cursor-pointer`}>{copiedWifi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}</button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
                  <div className={`flex items-center gap-2 ${currentTheme.primary}`}><Car className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.parkingTitle}</span></div>
                  <p className="text-[11px] text-slate-600">{hotel.parkingInfo}</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
                  <div className={`flex items-center gap-2 ${currentTheme.primary}`}><Coffee className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.breakfastTitle}</span></div>
                  <p className="text-[11px] text-slate-600">{hotel.breakfastTime}</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
                  <div className={`flex items-center gap-2 ${currentTheme.primary}`}><Clock className="w-5 h-5" /><span className="font-bold text-xs text-slate-900">{t.checkInOutTitle}</span></div>
                  <p className="text-[11px] text-slate-600">{hotel.checkInOut}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">{t.navGaestemappe}</h3>
              <div className="grid grid-cols-1 gap-2.5">
                {categories.map((cat) => {
                  const presetData = categoryPresets.find(p => p.id === cat.presetId);
                  if (!presetData) return null;
                  const localizedTitle = presetData.title[lang] || presetData.title.de;
                  const localizedSub = presetData.subtitle[lang] || presetData.subtitle.de;
                  const localizedContent = presetData.content[lang] || presetData.content.de;

                  return (
                    <button key={cat.id} onClick={() => setSelectedCategory({ title: localizedTitle, content: localizedContent })} className="w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between text-left cursor-pointer hover:border-amber-900/40 transition">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${currentTheme.bgLight} flex items-center justify-center`}>{renderIcon(cat.icon)}</div>
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900">{localizedTitle}</h4>
                          <p className="text-xs text-slate-500">{localizedSub}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-stone-200/80 z-50 shadow-2xl">
        <nav className="px-3 py-2 flex justify-around items-center">
          <button onClick={() => { setActiveTab('home'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'home' && !selectedCategory ? currentTheme.primary : 'text-stone-400'}`}>
            <Info className="w-5 h-5" /><span>{t.navHome}</span>
          </button>
          <button onClick={() => { setActiveTab('services'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'services' || selectedCategory ? currentTheme.primary : 'text-stone-400'}`}>
            <Compass className="w-5 h-5" /><span>{t.navGaestemappe}</span>
          </button>
          <a href={hotel.googleReviewUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 text-[10px] font-bold text-stone-400 hover:text-amber-500 cursor-pointer">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" /><span>{t.navReview}</span>
          </a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 text-[10px] font-bold text-stone-400 hover:text-sky-600 cursor-pointer">
            <Navigation className="w-5 h-5 text-sky-600" /><span>{t.navRoute}</span>
          </a>
        </nav>
        <div className="bg-stone-100 border-t border-stone-200/50 py-1 text-center text-[9px] text-stone-400 font-medium">
          Powered by <span className="font-bold text-slate-700">gastemappe24-pro</span>
        </div>
      </div>

    </div>
  );
}