import React, { useState } from 'react';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Scroll
} from 'lucide-react';

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
    sec2Title: "2. Schnellzugriff (4 Fixe Standard-Karten)",
    sec3Title: "3. Gästemappe Kategorien (Preset-Katalog)",
    themeTitle: "4. Design & Farben",
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
    btnAddCategory: "Kategorie aus Katalog hinzufügen",
    modalTitle: "Katalog: Kategorie auswählen",
    modalClose: "Schließen",
    alreadyAdded: "Bereits hinzugefügt",
    addBtn: "Hinzufügen"
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
    sec2Title: "2. Quick Access (4 Fixed Cards)",
    sec3Title: "3. Directory Categories (Preset Catalog)",
    themeTitle: "4. Design & Colors",
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
    btnAddCategory: "Add Category from Catalog",
    modalTitle: "Catalog: Select Category",
    modalClose: "Close",
    alreadyAdded: "Added",
    addBtn: "Add"
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
    sec2Title: "2. Accesso Rapido",
    sec3Title: "3. Categorie Guida (Catalogo)",
    themeTitle: "4. Design & Colori",
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
    btnAddCategory: "Aggiungi Categoria",
    modalTitle: "Catalogo: Seleziona Categoria",
    modalClose: "Chiudi",
    alreadyAdded: "Aggiunto",
    addBtn: "Aggiungi"
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
    sec2Title: "2. Accès Rapide",
    sec3Title: "3. Catégories (Catalogue)",
    themeTitle: "4. Thème & Couleurs",
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
    btnAddCategory: "Ajouter une catégorie",
    modalTitle: "Catalogue : Choisir une catégorie",
    modalClose: "Fermer",
    alreadyAdded: "Déjà ajouté",
    addBtn: "Ajouter"
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
    sec2Title: "2. Acceso Rápido",
    sec3Title: "3. Categorías (Catálogo)",
    themeTitle: "4. Tema y Colores",
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
    btnAddCategory: "Añadir Categoría",
    modalTitle: "Catálogo: Seleccionar Categoría",
    modalClose: "Cerrar",
    alreadyAdded: "Añadido",
    addBtn: "Añadir"
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
    sec2Title: "2. Hızlı Erişim (4 Sabit Kart)",
    sec3Title: "3. Rehber Kategorileri (Hazır Katalog)",
    themeTitle: "4. Tema & Renk Seçimi",
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
    btnAddCategory: "Katalogdan Kategori Ekle",
    modalTitle: "Hazır Katalog: Kategori Seçin",
    modalClose: "Kapat",
    alreadyAdded: "Eklendi",
    addBtn: "Ekle"
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
    sec2Title: "2. Snabbåtkomst",
    sec3Title: "3. Kategorier (Katalog)",
    themeTitle: "4. Tema & Färger",
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
    btnAddCategory: "Lägg till kategori",
    modalTitle: "Katalog: Välj kategori",
    modalClose: "Stäng",
    alreadyAdded: "Tillagd",
    addBtn: "Lägg till"
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
    sec2Title: "2. Hurtigtilgang",
    sec3Title: "3. Kategorier (Katalog)",
    themeTitle: "4. Tema & Farger",
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
    btnAddCategory: "Legg til kategori",
    modalTitle: "Katalog: Velg kategori",
    modalClose: "Lukk",
    alreadyAdded: "Lagt til",
    addBtn: "Legg til"
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
    sec2Title: "2. Brzi Pristup",
    sec3Title: "3. Kategorije (Katalog)",
    themeTitle: "4. Dizajn i Boje",
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
    btnAddCategory: "Dodaj Kategoriju",
    modalTitle: "Katalog: Odaberi kategoriju",
    modalClose: "Zatvori",
    alreadyAdded: "Dodano",
    addBtn: "Dodaj"
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
    sec2Title: "2. Qasja e Shpejtë",
    sec3Title: "3. Kategoritë (Katalogu)",
    themeTitle: "4. Tema & Ngjyrat",
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
    btnAddCategory: "Shto Kategori",
    modalTitle: "Katalogu: Zgjidhni Kategorinë",
    modalClose: "Mbyll",
    alreadyAdded: "Shtuar",
    addBtn: "Shto"
  }
};

const categoryPresets = [
  { id: 'hotel_info', group: '🏨 Hotel & Unterkunft', title: { de: 'Hotelinformationen', en: 'Hotel Information', tr: 'Otel Bilgileri', it: 'Informazioni Hotel', fr: 'Informations Hôtel', es: 'Información del Hotel', sv: 'Hotellinformation', no: 'Hotellinformasjon', hr: 'Informacije o hotelu', sq: 'Informacione mbi Hotelin' }, subtitle: { de: 'Rezeption, Zeiten & Services', en: 'Reception, hours & services', tr: 'Resepsiyon, saatler ve hizmetler' }, content: { de: 'Herzlich willkommen in unserem Haus. Unsere Rezeption ist von 07:00 bis 22:00 Uhr für Sie besetzt.', en: 'Welcome to our property. Our reception is open from 7:00 AM to 10:00 PM.', tr: 'Tesisimize hoş geldiniz. Resepsiyonumuz 07:00 - 22:00 saatleri arasında hizmet vermektedir.' }, icon: 'Building' },
  { id: 'room_info', group: '🏨 Hotel & Unterkunft', title: { de: 'Zimmerinformationen', en: 'Room Information', tr: 'Oda Bilgileri', it: 'Informazioni Camere', fr: 'Informations Chambres', es: 'Información de la Habitación', sv: 'Rumsinformation', no: 'Romsinformasjon', hr: 'Informacije o sobama', sq: 'Informacione mbi Dhomat' }, subtitle: { de: 'Ausstattung & Safe', en: 'Amenities & safe', tr: 'Oda özellikleri ve kasa' }, content: { de: 'Alle Zimmer sind mit einem Safe, Föhn und Flachbild-TV ausgestattet.', en: 'All rooms are equipped with a safe, hairdryer, and flat-screen TV.', tr: 'Tüm odalar kasa, saç kurutma makinesi ve düz ekran TV ile donatılmıştır.' }, icon: 'Bed' },
  { id: 'keys_access', group: '🏨 Hotel & Unterkunft', title: { de: 'Zimmerschlüssel & Zugang', en: 'Keys & Access', tr: 'Anahtar ve Erişim', it: 'Chiavi e Accesso', fr: 'Clés & Accès', es: 'Llaves y Acceso', sv: 'Nycklar & Tillgång', no: 'Nøkler & Adgang', hr: 'Ključevi i pristup', sq: 'Çelësat & Qasja' }, subtitle: { de: 'Karte & Schließzeiten', en: 'Keycard & locking times', tr: 'Anahtar kartı ve kapı kilit saatleri' }, content: { de: 'Bitte nehmen Sie Ihre Schlüsselkarte beim Verlassen des Hauses mit.', en: 'Please take your keycard with you when leaving.', tr: 'Lütfen çıkarken anahtar kartınızı yanınıza alın.' }, icon: 'Key' },
  { id: 'restaurant_dining', group: '🍽️ Essen & Trinken', title: { de: 'Restaurant & Bar', en: 'Restaurant & Bar', tr: 'Restoran ve Bar', it: 'Ristorante e Bar', fr: 'Restaurant & Bar', es: 'Restaurante y Bar', sv: 'Restaurang & Bar', no: 'Restaurant & Bar', hr: 'Restoran i bar', sq: 'Restorant & Bar' }, subtitle: { de: 'Öffnungszeiten & Speisekarte', en: 'Hours & menu', tr: 'Çalışma saatleri ve menü' }, content: { de: 'Unser Restaurant serviert regionale Spezialitäten von 18:00 bis 21:30 Uhr.', en: 'Our restaurant serves regional specialties from 6:00 PM to 9:30 PM.', tr: 'Restoranımız 18:00 - 21:30 saatleri arasında yöresel lezzetler sunmaktadır.' }, icon: 'Utensils' },
  { id: 'cafe_snacks', group: '🍽️ Essen & Trinken', title: { de: 'Café & Lounge', en: 'Café & Lounge', tr: 'Kafe ve Dinlenme Alanı', it: 'Caffè e Lounge', fr: 'Café & Lounge', es: 'Café y Lounge', sv: 'Café & Lounge', no: 'Kafé & Lounge', hr: 'Kafić i salon', sq: 'Kafe & Lounge' }, subtitle: { de: 'Kaffee, Kuchen & Snacks', en: 'Coffee, cake & snacks', tr: 'Kahve, kek ve atıştırmalıklar' }, content: { de: 'Genießen Sie am Nachmittag hausgemachten Kuchen.', en: 'Enjoy homemade cake in the afternoon.', tr: 'Öğleden sonra ev yapımı keklerin tadını çıkarın.' }, icon: 'Coffee' },
  { id: 'pool_aqua', group: '🧖 Wellness & Spa', title: { de: 'Pool & Wellnessbereich', en: 'Pool & Wellness Area', tr: 'Havuz ve Wellness Alanı', it: 'Piscina e Benessere', fr: 'Piscine & Espace Bien-être', es: 'Piscina y Spa', sv: 'Pool & Wellness', no: 'Basseng & Velvære', hr: 'Bazen i wellness', sq: 'Pishina & Wellness' }, subtitle: { de: 'Öffnungszeiten & Handtücher', en: 'Hours & towels', tr: 'Çalışma saatleri ve havlular' }, content: { de: 'Unser Indoor-Pool ist täglich von 07:00 bis 20:00 Uhr geöffnet.', en: 'Our indoor pool is open daily from 7:00 AM to 8:00 PM.', tr: 'Kapalı havuzumuz her gün 07:00 - 20:00 saatleri arasında açıktır.' }, icon: 'Waves' },
  { id: 'sauna_spa', group: '🧖 Wellness & Spa', title: { de: 'Sauna & Massagen', en: 'Sauna & Massages', tr: 'Sauna ve Masajlar', it: 'Sauna e Massaggi', fr: 'Sauna & Massages', es: 'Sauna y Masajes', sv: 'Sauna & Massage', no: 'Sauna & Massasje', hr: 'Sauna i masaže', sq: 'Sauna & Masazhe' }, subtitle: { de: 'Finnische Sauna & Termine', en: 'Finnish sauna & appointments', tr: 'Fin saunası ve randevu' }, content: { de: 'Entspannen Sie in unserer finnischen Sauna (16:00 bis 21:00 Uhr).', en: 'Relax in our Finnish sauna (4:00 PM to 9:00 PM).', tr: 'Fin saunamızda rahatlayın (16:00 - 21:00).' }, icon: 'Sparkles' },
  { id: 'bike_rental', group: '🎯 Freizeit & Aktivitäten', title: { de: 'Fahrradverleih', en: 'Bike Rental', tr: 'Bisiklet Kiralama', it: 'Noleggio Bici', fr: 'Location de Vélos', es: 'Alquiler de Bicicletas', sv: 'Cykeluthyrning', no: 'Sykkelutleie', hr: 'Najam bicikala', sq: 'Qiradhënie Biçikletash' }, subtitle: { de: 'E-Bikes & Tourenkarten', en: 'E-bikes & trail maps', tr: 'Elektrikli bisiklet ve haritalar' }, content: { de: 'Hochwertige E-Bikes können tageweise an der Rezeption ausgeliehen werden.', en: 'High-quality e-bikes can be rented daily at reception.', tr: 'Kaliteli e-bisikletler resepsiyondan günlük kiralanabilir.' }, icon: 'Compass' },
  { id: 'sightseeing', group: '📍 Umgebung & Ausflüge', title: { de: 'Sehenswürdigkeiten', en: 'Sights & Attractions', tr: 'Görülecek Yerler', it: 'Attrazioni', fr: 'Sites Touristiques', es: 'Lugares de Interés', sv: 'Sevärdheter', no: 'Severdigheter', hr: 'Znamenitosti', sq: 'Vendet Turistike' }, subtitle: { de: 'Tipps & Highlights', en: 'Tips & highlights', tr: 'İpuçları ve önemli noktalar' }, content: { de: 'Die historische Altstadt lädt zu Spaziergängen ein.', en: 'The historic old town invites you to take walks.', tr: 'Tarihi eski şehir yürüyüşler için davetkardır.' }, icon: 'MapPin' },
  { id: 'parking_mobility', group: '🚕 Anreise & Mobilität', title: { de: 'Parkmöglichkeiten', en: 'Parking Facilities', tr: 'Otopark İmkanları', it: 'Parcheggio', fr: 'Stationnement', es: 'Aparcamiento', sv: 'Parkering', no: 'Parkering', hr: 'Parkiralište', sq: 'Parkingjet' }, subtitle: { de: 'Tiefgarage & E-Ladestation', en: 'Underground garage & EV charger', tr: 'Kapalı otopark ve elektrikli şarj' }, content: { de: 'Ihnen stehen kostenfreie Parkplätze direkt am Haus zur Verfügung.', en: 'Free parking spaces directly at the house are available.', tr: 'Otelimizin hemen yanında ücretsiz otoparklar mevcuttur.' }, icon: 'Car' },
  { id: 'reception_service', group: 'ℹ️ Service & Informationen', title: { de: 'Rezeption & Service', en: 'Reception & Service', tr: 'Resepsiyon ve Servis', it: 'Ricevimento e Servizi', fr: 'Réception & Service', es: 'Recepción y Servicio', sv: 'Reception & Service', no: 'Resepsjon & Service', hr: 'Recepcija i usluge', sq: 'Recepsioni & Shërbimi' }, subtitle: { de: 'Weckruf & Gepäck', en: 'Wake-up call & luggage', tr: 'Uyandırma servisi ve bagaj' }, content: { de: 'Sie erreichen die Rezeption unter der Kurzwahl 9.', en: 'Reach reception at extension 9.', tr: '9’u tuşlayarak resepsiyona ulaşabilirsiniz.' }, icon: 'Phone' },
  { id: 'house_rules', group: '📋 Regeln & Wissenswertes', title: { de: 'Hausordnung & Ruhezeiten', en: 'House Rules & Quiet Hours', tr: 'Ev Kuralları ve Sessizlik', it: 'Regolamento e Orari di Silenzio', fr: 'Règlement Intérieur', es: 'Normas de la Casa', sv: 'Ordningsregler', no: 'Husordensregler', hr: 'Kućni red', sq: 'Rregullorja e Shtëpisë' }, subtitle: { de: 'Nachtruhe ab 22:00 Uhr', en: 'Quiet hours from 10:00 PM', tr: '22:00’den itibaren gece sessizliği' }, content: { de: 'Wir bitten Sie ab 22:00 Uhr die Nachtruhe einzuhalten.', en: 'We ask you to observe quiet hours from 10:00 PM.', tr: 'Lütfen saat 22:00’den itibaren gece sessizliğine uyunuz.' }, icon: 'ShieldCheck' }
];

export default function App() {
  const [lang, setLang] = useState('de');
  const t = translations[lang] || translations.de;

  const [appMode, setAppMode] = useState('guest'); 
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  
  const [currentSlide] = useState(0);
  const [copiedWifi, setCopiedWifi] = useState(false);

  const [hotel, setHotel] = useState({
    name: 'Boutique Hotel & Suites', 
    locationTitle: 'REGION / STANDORT',
    address: 'Musterstraße 1, 12345 Musterstadt',
    googleReviewUrl: 'https://g.page/r/example/review',
    wifiSsid: 'Guest_WiFi',
    wifiPass: 'welcome2026',
    breakfastTime: '07:30 - 10:30 Uhr',
    checkInOut: 'Check-in: ab 15:00 | Check-out: bis 11:00',
    parkingInfo: 'Kostenfreie Parkplätze am Haus verfügbar.',
    themeColor: 'amber',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80']
  });

  const [categories, setCategories] = useState([
    { id: 'hotel_info', presetId: 'hotel_info', icon: 'Building' },
    { id: 'restaurant_dining', presetId: 'restaurant_dining', icon: 'Utensils' },
    { id: 'pool_aqua', presetId: 'pool_aqua', icon: 'Waves' }
  ]);

  const currentTheme = { primary: 'text-amber-900', bgPrimary: 'bg-amber-900', bgLight: 'bg-amber-50' };

  const handleAddPresetCategory = (presetObj) => {
    if (categories.some(c => c.presetId === presetObj.id)) return;
    setCategories([...categories, { id: Date.now().toString(), presetId: presetObj.id, icon: presetObj.icon }]);
    setIsCatalogModalOpen(false);
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

  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] font-sans text-slate-800 p-6 md:p-10 space-y-8 relative">
        
        {isCatalogModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-extrabold text-lg text-slate-900">{t.modalTitle}</h2>
                <button onClick={() => setIsCatalogModalOpen(false)} className="text-stone-400 font-bold p-1 cursor-pointer">✕</button>
              </div>

              <div className="space-y-6">
                {Object.entries(
                  categoryPresets.reduce((acc, preset) => {
                    acc[preset.group] = acc[preset.group] || [];
                    acc[preset.group].push(preset);
                    return acc;
                  }, {})
                ).map(([groupName, presets]) => (
                  <div key={groupName} className="space-y-2">
                    <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider">{groupName}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {presets.map((preset) => {
                        const isAlreadyAdded = categories.some(c => c.presetId === preset.id);
                        const title = preset.title[lang] || preset.title.de;
                        const sub = preset.subtitle[lang] || preset.subtitle.de;

                        return (
                          <div key={preset.id} className={`p-3 rounded-2xl border flex items-center justify-between transition ${isAlreadyAdded ? 'bg-stone-100 opacity-60 border-stone-200' : 'bg-stone-50 hover:border-amber-900/40 cursor-pointer'}`}>
                            <div className="flex items-center gap-2.5">
                              {renderIcon(preset.icon)}
                              <div>
                                <span className="font-bold block text-xs text-slate-900">{title}</span>
                                <span className="text-[10px] text-stone-500 block">{sub}</span>
                              </div>
                            </div>
                            {isAlreadyAdded ? (
                              <span className="text-[10px] font-bold text-stone-400 bg-stone-200 px-2 py-1 rounded-lg">{t.alreadyAdded}</span>
                            ) : (
                              <button onClick={() => handleAddPresetCategory(preset)} className="bg-amber-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shadow hover:bg-amber-950 cursor-pointer flex items-center gap-1">
                                <Plus className="w-3 h-3" /> {t.addBtn}
                              </button>
                            )}
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
            <span className="bg-amber-900 text-white font-black px-3 py-1.5 rounded-xl text-sm">G</span>
            <span className="font-extrabold text-lg tracking-tight">gastemappe24 <span className="text-amber-800 text-xs uppercase px-1.5 py-0.5 bg-amber-100 rounded-md">PRO</span></span>
          </div>
          <button onClick={() => { setAppMode('guest'); setShowWelcomeScreen(false); }} className="bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition cursor-pointer">
            {t.guestViewBtn}
          </button>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t.adminTitle}</h1>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider">{t.sec3Title}</h3>
                <button onClick={() => setIsCatalogModalOpen(true)} className="bg-amber-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:bg-amber-950 cursor-pointer flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> {t.btnAddCategory}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {categories.map((cat) => {
                  const presetData = categoryPresets.find(p => p.id === cat.presetId);
                  if (!presetData) return null;
                  const title = presetData.title[lang] || presetData.title.de;
                  const sub = presetData.subtitle[lang] || presetData.subtitle.de;

                  return (
                    <div key={cat.id} className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border text-xs shadow-sm">
                      <div className="flex items-center gap-3">
                        {renderIcon(cat.icon)}
                        <div>
                          <span className="font-bold block text-slate-900">{title}</span>
                          <span className="text-[10px] text-stone-500">{sub}</span>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteCategory(cat.id)} className="bg-rose-50 text-rose-600 p-2 rounded-xl cursor-pointer hover:bg-rose-100"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  );
                })}
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
          <img src={hotel.images[0]} alt="Welcome" className="w-full h-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
        </div>
        <div className="relative z-10 p-6 flex justify-between items-center text-white">
          <span className="text-xs font-bold tracking-wider uppercase opacity-90">{hotel.name}</span>
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
          <h1 className="text-3xl font-black">{hotel.name}</h1>
          <button onClick={() => setShowWelcomeScreen(false)} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2">
            <span>{t.welcomeButton}</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-32 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      <header className="p-5 pt-6 pb-2 bg-stone-50 sticky top-0 z-40 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-900 text-white flex items-center justify-center font-bold text-xs">{hotel.name.charAt(0)}</div>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-800">{hotel.name}</span>
        </div>
        <button onClick={() => setAppMode('dashboard')} className="text-stone-400 hover:text-stone-800 p-1 text-xs cursor-pointer">🔑 Admin</button>
      </header>

      <main className="p-5 space-y-5">
        {selectedCategory ? (
          <div className="space-y-4">
            <button onClick={() => setSelectedCategory(null)} className="text-xs font-bold text-amber-900 cursor-pointer">&larr; {t.detailBack}</button>
            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
              <h2 className="text-lg font-black text-slate-900">{selectedCategory.title}</h2>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedCategory.content}</p>
            </div>
          </div>
        ) : (
          activeTab === 'home' ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-black text-slate-900">{t.greetingHello}</h1>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border shadow-sm">
                  <span className="font-bold text-xs">WLAN</span>
                  <div className="text-[11px] text-slate-500">{hotel.wifiSsid}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border shadow-sm">
                  <span className="font-bold text-xs">Parkplatz</span>
                  <p className="text-[11px] text-slate-600">{hotel.parkingInfo}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-stone-500 uppercase">{t.navGaestemappe}</h3>
              <div className="grid grid-cols-1 gap-2.5">
                {categories.map((cat) => {
                  const presetData = categoryPresets.find(p => p.id === cat.presetId);
                  if (!presetData) return null;
                  const title = presetData.title[lang] || presetData.title.de;
                  const sub = presetData.subtitle[lang] || presetData.subtitle.de;
                  const content = presetData.content[lang] || presetData.content.de;

                  return (
                    <button key={cat.id} onClick={() => setSelectedCategory({ title, content })} className="w-full bg-white p-4 rounded-2xl border shadow-sm flex items-center justify-between text-left cursor-pointer hover:border-amber-900/40">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">{renderIcon(cat.icon)}</div>
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900">{title}</h4>
                          <p className="text-xs text-slate-500">{sub}</p>
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

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 border-t py-2 flex justify-around z-50">
        <button onClick={() => { setActiveTab('home'); setSelectedCategory(null); }} className="text-xs font-bold cursor-pointer">Home</button>
        <button onClick={() => { setActiveTab('services'); setSelectedCategory(null); }} className="text-xs font-bold cursor-pointer">Rehber</button>
      </div>
    </div>
  );
}