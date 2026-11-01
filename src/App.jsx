import React, { useState } from 'react';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User
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
    detailLabel: "Detailinfo",
    adminTitle: "Verwaltung (Dashboard)",
    guestViewBtn: "Gastansicht öffnen",
    editBtn: "Bearbeiten",
    logoutBtn: "Abmelden",
    loginTitle: "Partner Login",
    loginSub: "Anmelden um Ihre Gästemappe zu verwalten",
    lblEmail: "E-Mail-Adresse",
    lblPassword: "Passwort",
    btnLoginSubmit: "Anmelden",
    trialTitle: "30-Tage Testversion (PRO)",
    trialDaysLeft: "Tage verbleibend",
    statsTitle: "Nutzungsstatistik",
    statsScans: "QR-Code Scans (Gäste-Aufrufe)",
    statsActiveRooms: "Aktive Zimmer-Zugriffe",
    qrTitle: "QR-Code & Print-Center (A4, A5, Visitenkarte)",
    qrSubtitle: "Erstellen Sie professionelle Aufsteller für Ihre Zimmer und Rezeption.",
    printA4: "Druckvorlage A4",
    printA5: "Druckvorlage A5",
    printCard: "Druckvorlage Visitenkarte",
    sec1Title: "1. Unterkunft Informationen & Kontaktdaten",
    sec2Title: "2. Logo hochladen (Max. 2 MB)",
    sec3Title: "3. Bilderverwaltung (Max. 5 Bilder, max. 5 MB pro Bild)",
    sec4Title: "4. Bilder für den Willkommensbildschirm und den Startseiten-Slider",
    sec5Title: "5. Schnellzugriff (Standard & Max. 2 Custom)",
    sec6Title: "6. Kategorien der Gästemappe",
    themeTitle: "7. White-Label Design & Farben",
    lblHotelName: "Unterkunft Name",
    lblGreeting: "Eigener Begrüßungstext (Leer lassen für automatische Übersetzung)",
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
    btnAddCategory: "Neue Kategorie hinzufügen",
    btnCatSubmit: "Kategorie Hinzufügen"
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
    detailLabel: "Details",
    adminTitle: "Management (Dashboard)",
    guestViewBtn: "Open Guest View",
    editBtn: "Edit",
    logoutBtn: "Log out",
    loginTitle: "Partner Login",
    loginSub: "Log in to manage your guest directory",
    lblEmail: "E-Mail Address",
    lblPassword: "Password",
    btnLoginSubmit: "Sign In",
    trialTitle: "30-Day Trial (PRO)",
    trialDaysLeft: "Days remaining",
    statsTitle: "Usage Statistics",
    statsScans: "QR Code Scans",
    statsActiveRooms: "Active Room Access",
    qrTitle: "QR Code & Print Center",
    qrSubtitle: "Create professional displays for your rooms and reception.",
    printA4: "Print Template A4",
    printA5: "Print Template A5",
    printCard: "Print Template Business Card",
    sec1Title: "1. Property Information & Contacts",
    sec2Title: "2. Upload Logo (Max. 2 MB)",
    sec3Title: "3. Image Management (Max. 5 images)",
    sec4Title: "4. Welcome Screen & Slider Images",
    sec5Title: "5. Quick Access",
    sec6Title: "6. Directory Categories",
    themeTitle: "7. White-Label Design & Colors",
    lblHotelName: "Property Name",
    lblGreeting: "Custom Welcome Text (Leave empty for automatic translation)",
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
    btnAddCategory: "Add New Category",
    btnCatSubmit: "Add Category"
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
    detailLabel: "Dettagli",
    adminTitle: "Gestione",
    guestViewBtn: "Apri Vista Ospite",
    editBtn: "Modifica",
    logoutBtn: "Esci",
    loginTitle: "Login Partner",
    loginSub: "Accedi per gestire la guida",
    lblEmail: "E-mail",
    lblPassword: "Password",
    btnLoginSubmit: "Accedi",
    trialTitle: "Prova di 30 Giorni",
    trialDaysLeft: "Giorni rimanenti",
    statsTitle: "Statistiche",
    statsScans: "Scansioni QR",
    statsActiveRooms: "Accessi Attivi",
    qrTitle: "Centro Stampa QR",
    qrSubtitle: "Crea espositori professionali.",
    printA4: "Stampa A4",
    printA5: "Stampa A5",
    printCard: "Stampa Biglietto",
    sec1Title: "1. Info Struttura",
    sec2Title: "2. Logo",
    sec3Title: "3. Immagini",
    sec4Title: "4. Slider",
    sec5Title: "5. Accesso Rapido",
    sec6Title: "6. Categorie",
    themeTitle: "7. Design & Colori",
    lblHotelName: "Nome Struttura",
    lblGreeting: "Messaggio Personalizzato",
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
    btnCatSubmit: "Salva Categoria"
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
    detailLabel: "Détails",
    adminTitle: "Gestion",
    guestViewBtn: "Vue Invité",
    editBtn: "Éditer",
    logoutBtn: "Déconnexion",
    loginTitle: "Connexion Partenaire",
    loginSub: "Connectez-vous pour gérer",
    lblEmail: "E-Mail",
    lblPassword: "Mot de passe",
    btnLoginSubmit: "Se connecter",
    trialTitle: "Essai 30 Jours",
    trialDaysLeft: "Jours restants",
    statsTitle: "Statistiques",
    statsScans: "Scans QR",
    statsActiveRooms: "Chambres Actives",
    qrTitle: "Centre d'Impression QR",
    qrSubtitle: "Créez des présentoirs professionnels.",
    printA4: "Impression A4",
    printA5: "Impression A5",
    printCard: "Carte de visite",
    sec1Title: "1. Infos Établissement",
    sec2Title: "2. Logo",
    sec3Title: "3. Images",
    sec4Title: "4. Slider",
    sec5Title: "5. Accès Rapide",
    sec6Title: "6. Catégories",
    themeTitle: "7. Thème & Couleurs",
    lblHotelName: "Nom de l'Établissement",
    lblGreeting: "Message Personnalisé",
    lblPhone: "Téléphone",
    lblEmailField: "E-Mail",
    lblAddress: "Adresse",
    lblWebsite: "Site Web",
    lblGoogleReview: "Lien Avis Google",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "Mot de passe WiFi",
    lblBreakfastTime: "Horaires du petit-déjeuner",
    lblCheckInOut: "Infos Check-in",
    lblParkingInfo: "Infos Parking",
    btnLogoUpload: "Télécharger le logo",
    btnAddCategory: "Ajouter une catégorie",
    btnCatSubmit: "Ajouter"
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
    detailLabel: "Detalles",
    adminTitle: "Gestión",
    guestViewBtn: "Vista Huésped",
    editBtn: "Editar",
    logoutBtn: "Cerrar sesión",
    loginTitle: "Login Partner",
    loginSub: "Inicia sesión para gestionar",
    lblEmail: "E-Mail",
    lblPassword: "Contraseña",
    btnLoginSubmit: "Entrar",
    trialTitle: "Prueba de 30 Días",
    trialDaysLeft: "Días restantes",
    statsTitle: "Estadísticas",
    statsScans: "Scaneos QR",
    statsActiveRooms: "Activo",
    qrTitle: "Centro de Impresión QR",
    qrSubtitle: "Cree pantallas profesionales.",
    printA4: "Imprimir A4",
    printA5: "Imprimir A5",
    printCard: "Tarjeta",
    sec1Title: "1. Info del Alojamiento",
    sec2Title: "2. Logo",
    sec3Title: "3. Imágenes",
    sec4Title: "4. Slider",
    sec5Title: "5. Acceso",
    sec6Title: "6. Categorías",
    themeTitle: "7. Tema y Colores",
    lblHotelName: "Nombre del Alojamiento",
    lblGreeting: "Mensaje Personalizado",
    lblPhone: "Teléfono",
    lblEmailField: "E-Mail",
    lblAddress: "Dirección",
    lblWebsite: "Sitio Web",
    lblGoogleReview: "Enlace Reseñas Google",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "Contraseña WiFi",
    lblBreakfastTime: "Horario de Desayuno",
    lblCheckInOut: "Info Check-in",
    lblParkingInfo: "Info Parking",
    btnLogoUpload: "Subir Logo",
    btnAddCategory: "Añadir Categoría",
    btnCatSubmit: "Guardar"
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
    detailLabel: "Detay",
    adminTitle: "Yönetim Paneli (Dashboard)",
    guestViewBtn: "Misafir Görünümünü Aç",
    editBtn: "Düzenle",
    logoutBtn: "Çıkış Yap",
    loginTitle: "Partner Girişi",
    loginSub: "Rehberinizi yönetmek için giriş yapın",
    lblEmail: "E-Posta Adresi",
    lblPassword: "Şifre",
    btnLoginSubmit: "Giriş Yap",
    trialTitle: "30 Günlük Deneme (PRO)",
    trialDaysLeft: "Gün kaldı",
    statsTitle: "Kullanım İstatistikleri",
    statsScans: "QR Kod Taramaları",
    statsActiveRooms: "Aktif Oda Erişimi",
    qrTitle: "QR Kod & Baskı Merkezi",
    qrSubtitle: "Odalar ve resepsiyon için profesyonel tasarımlar oluşturun.",
    printA4: "A4 Baskı Şablonu",
    printA5: "A5 Baskı Şablonu",
    printCard: "Kartvizit Şablonu",
    sec1Title: "1. Tesis Bilgileri & İletişim",
    sec2Title: "2. Logo Yükleme (Maks. 2 MB)",
    sec3Title: "3. Resim Yönetimi (Maks. 5 Resim)",
    sec4Title: "4. Karşılama ve Slider Görselleri",
    sec5Title: "5. Hızlı Erişim",
    sec6Title: "6. Rehber Kategorileri",
    themeTitle: "7. Tema & Renk Seçimi",
    lblHotelName: "Tesis / Otel / Ev Adı",
    lblGreeting: "Özel Karşılama Metni (Otomatik çeviri için boş bırakın)",
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
    btnAddCategory: "Yeni Kategori Ekle",
    btnCatSubmit: "Kategori Ekle"
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
    detailLabel: "Detaljer",
    adminTitle: "Administration",
    guestViewBtn: "Öppna Gästvy",
    editBtn: "Redigera",
    logoutBtn: "Logga ut",
    loginTitle: "Partner Login",
    loginSub: "Logga in för att hantera din mapp",
    lblEmail: "E-postadress",
    lblPassword: "Lösenord",
    btnLoginSubmit: "Logga in",
    trialTitle: "30-Dagars Provperiod",
    trialDaysLeft: "Dagar kvar",
    statsTitle: "Statistik",
    statsScans: "QR-skanningar",
    statsActiveRooms: "Aktiva rum",
    qrTitle: "QR & Utskriftscenter",
    qrSubtitle: "Skapa professionella skyltar.",
    printA4: "Utskrift A4",
    printA5: "Utskrift A5",
    printCard: "Visiteffekt",
    sec1Title: "1. Boendeinformation",
    sec2Title: "2. Logo",
    sec3Title: "3. Bilder",
    sec4Title: "4. Slider",
    sec5Title: "5. Snabbåtkomst",
    sec6Title: "6. Kategorier",
    themeTitle: "7. Tema & Färger",
    lblHotelName: "Boendets Namn",
    lblGreeting: "Egen Hälsning",
    lblPhone: "Telefon",
    lblEmailField: "E-post",
    lblAddress: "Adress",
    lblWebsite: "Webbplats",
    lblGoogleReview: "Google Recension Länk",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "WiFi-lösenord",
    lblBreakfastTime: "Frukosttider",
    lblCheckInOut: "Check-in info",
    lblParkingInfo: "Parkeringsinfo",
    btnLogoUpload: "Välj Logo",
    btnAddCategory: "Lägg till kategori",
    btnCatSubmit: "Lägg till"
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
    detailLabel: "Detaljer",
    adminTitle: "Administrasjon",
    guestViewBtn: "Åpne Gjestevisning",
    editBtn: "Rediger",
    logoutBtn: "Logg ut",
    loginTitle: "Partner Login",
    loginSub: "Logg inn for å administrere",
    lblEmail: "E-postadresse",
    lblPassword: "Passord",
    btnLoginSubmit: "Logg inn",
    trialTitle: "30-Dagers Prøveperiode",
    trialDaysLeft: "Dager igjen",
    statsTitle: "Statistikk",
    statsScans: "QR-skanningar",
    statsActiveRooms: "Aktive rom",
    qrTitle: "QR & Utskriftssenter",
    qrSubtitle: "Lag profesjonelle skilt.",
    printA4: "Utskrift A4",
    printA5: "Utskrift A5",
    printCard: "Visittkort",
    sec1Title: "1. Info om Boenheten",
    sec2Title: "2. Logo",
    sec3Title: "3. Bilder",
    sec4Title: "4. Slider",
    sec5Title: "5. Hurtigtilgang",
    sec6Title: "6. Kategorier",
    themeTitle: "7. Tema & Farger",
    lblHotelName: "Boenhetens Navn",
    lblGreeting: "Velkomstmelding",
    lblPhone: "Telefon",
    lblEmailField: "E-post",
    lblAddress: "Adresse",
    lblWebsite: "Nettsted",
    lblGoogleReview: "Google Anmeldelse Lenke",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "WiFi Passord",
    lblBreakfastTime: "Frokosttider",
    lblCheckInOut: "Check-in info",
    lblParkingInfo: "Parkeringsinfo",
    btnLogoUpload: "Velg Logo",
    btnAddCategory: "Legg till kategori",
    btnCatSubmit: "Legg til"
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
    detailLabel: "Detalji",
    adminTitle: "Upravljanje",
    guestViewBtn: "Otvori Pogled za Goste",
    editBtn: "Uredi",
    logoutBtn: "Odjava",
    loginTitle: "Partner Login",
    loginSub: "Prijavite se za upravljanje",
    lblEmail: "E-mail adresa",
    lblPassword: "Lozinka",
    btnLoginSubmit: "Prijava",
    trialTitle: "30 Dana Probno",
    trialDaysLeft: "Dana preostalo",
    statsTitle: "Statistika",
    statsScans: "QR Skeniranja",
    statsActiveRooms: "Aktivno",
    qrTitle: "QR Centar",
    qrSubtitle: "Izradite profesionalne materijale.",
    printA4: "Ispiši A4",
    printA5: "Ispiši A5",
    printCard: "Kartica",
    sec1Title: "1. Info Smještaja",
    sec2Title: "2. Logo",
    sec3Title: "3. Slike",
    sec4Title: "4. Slider",
    sec5Title: "5. Pristup",
    sec6Title: "6. Kategorije",
    themeTitle: "7. Dizajn i Boje",
    lblHotelName: "Naziv Smještaja",
    lblGreeting: "Pozdravna Poruka",
    lblPhone: "Telefon",
    lblEmailField: "E-Mail",
    lblAddress: "Adresa",
    lblWebsite: "Web stranica",
    lblGoogleReview: "Google Recenzija Link",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "WiFi Lozinka",
    lblBreakfastTime: "Vrijeme Doručka",
    lblCheckInOut: "Info Prijava",
    lblParkingInfo: "Info Parking",
    btnLogoUpload: "Učitaj Logo",
    btnAddCategory: "Dodaj Kategoriju",
    btnCatSubmit: "Spremi"
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
    detailLabel: "Detaje",
    adminTitle: "Menaxhimi",
    guestViewBtn: "Hap Pamjen e Omsit",
    editBtn: "Ndrysho",
    logoutBtn: "Dil",
    loginTitle: "Partner Login",
    loginSub: "Identifikohuni për të menaxhuar",
    lblEmail: "E-mail adresa",
    lblPassword: "Fjalëkalimi",
    btnLoginSubmit: "Hyr",
    trialTitle: "Prova 30 Ditë",
    trialDaysLeft: "Ditë të mbetura",
    statsTitle: "Statistikat",
    statsScans: "Skanime QR",
    statsActiveRooms: "Aktiv",
    qrTitle: "Qendra e Printimit QR",
    qrSubtitle: "Krijoni materiale profesionale.",
    printA4: "Printo A4",
    printA5: "Printo A5",
    printCard: "Kartë vizite",
    sec1Title: "1. Info e Pronës",
    sec2Title: "2. Logo",
    sec3Title: "3. Imazhet",
    sec4Title: "4. Slider",
    sec5Title: "5. Qasja e Shpejtë",
    sec6Title: "6. Kategoritë",
    themeTitle: "7. Tema & Ngjyrat",
    lblHotelName: "Emri i Pronës",
    lblGreeting: "Mesazhi i Mirëseardhjes",
    lblPhone: "Telefoni",
    lblEmailField: "E-Mail",
    lblAddress: "Adresa",
    lblWebsite: "Faqja Web",
    lblGoogleReview: "Linku i Vlerësimit në Google",
    lblWifiSsid: "WiFi SSID",
    lblWifiPass: "Fjalëkalimi WiFi",
    lblBreakfastTime: "Orari i Mëngjesit",
    lblCheckInOut: "Info Check-in",
    lblParkingInfo: "Info Parkimi",
    btnLogoUpload: "Ngarko Logo",
    btnAddCategory: "Shto Kategori",
    btnCatSubmit: "Ruaj"
  }
};

export default function App() {
  const [lang, setLang] = useState('de');
  const t = translations[lang] || translations.de;

  // UYGULAMA MODU: 'guest' (Misafir) veya 'dashboard' (Otelci Paneli)
  const [appMode, setAppMode] = useState('guest'); 
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // LOGIN STATE
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

  // GENEL NÖTR OTEL STATE'İ
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

  // 8 ÖZGÜN PRO TEMA
  const themes = {
    sahara: { name: 'Sahara', primary: 'text-amber-700', bgPrimary: 'bg-amber-700', bgHover: 'hover:bg-amber-800', bgLight: 'bg-amber-50', border: 'border-amber-700/40', badgeBg: 'bg-amber-50 text-amber-700', dot: 'bg-amber-700' },
    aegean: { name: 'Aegean', primary: 'text-teal-700', bgPrimary: 'bg-teal-700', bgHover: 'hover:bg-teal-800', bgLight: 'bg-teal-50', border: 'border-teal-700/40', badgeBg: 'bg-teal-50 text-teal-700', dot: 'bg-teal-700' },
    forest: { name: 'Forest', primary: 'text-emerald-800', bgPrimary: 'bg-emerald-800', bgHover: 'hover:bg-emerald-900', bgLight: 'bg-emerald-50', border: 'border-emerald-800/40', badgeBg: 'bg-emerald-50 text-emerald-800', dot: 'bg-emerald-800' },
    amber: { name: 'Amber', primary: 'text-amber-900', bgPrimary: 'bg-amber-900', bgHover: 'hover:bg-amber-950', bgLight: 'bg-amber-50', border: 'border-amber-900/40', badgeBg: 'bg-amber-100 text-amber-900', dot: 'bg-amber-900' },
    urban: { name: 'Urban', primary: 'text-slate-700', bgPrimary: 'bg-slate-700', bgHover: 'hover:bg-slate-800', bgLight: 'bg-slate-50', border: 'border-slate-700/40', badgeBg: 'bg-slate-100 text-slate-700', dot: 'bg-slate-700' },
    stone: { name: 'Stone', primary: 'text-stone-700', bgPrimary: 'bg-stone-700', bgHover: 'hover:bg-stone-800', bgLight: 'bg-stone-100', border: 'border-stone-700/40', badgeBg: 'bg-stone-100 text-stone-700', dot: 'bg-stone-700' },
    bordeaux: { name: 'Bordeaux', primary: 'text-rose-900', bgPrimary: 'bg-rose-900', bgHover: 'hover:bg-rose-950', bgLight: 'bg-rose-50', border: 'border-rose-900/40', badgeBg: 'bg-rose-50 text-rose-900', dot: 'bg-rose-900' },
    midnight: { name: 'Midnight', primary: 'text-zinc-900', bgPrimary: 'bg-zinc-900', bgHover: 'hover:bg-black', bgLight: 'bg-zinc-100', border: 'border-zinc-900/40', badgeBg: 'bg-zinc-100 text-zinc-900', dot: 'bg-zinc-900' }
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
        <head>
          <title>QR-Code ${format} ${hotel.name}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; text-align: center; color: #1e293b; margin: 0; padding: 40px; background: #fff; }
            .container { max-width: ${format === 'A4' ? '600px' : format === 'A5' ? '450px' : '300px'}; margin: 0 auto; border: 2px solid #e2e8f0; border-radius: 24px; padding: 40px 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
            .logo { width: 80px; height: 80px; object-fit: cover; border-radius: 16px; margin-bottom: 15px; border: 1px solid #cbd5e1; }
            .hotel-name { font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; margin-bottom: 5px; }
            .greeting { font-size: 16px; font-weight: 700; color: #b45309; margin-bottom: 5px; }
            .guide-title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 25px; }
            .qr-box { background: #f8fafc; padding: 20px; border-radius: 20px; display: inline-block; border: 1px solid #e2e8f0; margin-bottom: 25px; }
            .qr-img { width: 200px; height: 200px; display: block; }
            .instructions { font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 30px; }
            .footer { border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 20px; font-size: 11px; color: #64748b; line-height: 1.5; }
            @media print { body { padding: 0; } .container { border: none; box-shadow: none; } }
          </style>
        </head>
        <body>
          <div class="container">
            ${hotel.logoUrl ? `<img src="${hotel.logoUrl}" class="logo" />` : ''}
            <div class="hotel-name">${hotel.name}</div>
            <div class="greeting">${hotel.welcomeGreeting || t.greetingWelcome}</div>
            <div class="guide-title">Digitaler Gästemappe</div>
            <div class="qr-box"><img src="${qrCodeUrl}" class="qr-img" /></div>
            <div class="instructions">📱 Kamera öffnen & QR-Code scannen</div>
            <div class="footer"><b>${hotel.address}</b><br/>Tel: ${hotel.phone} | E-Mail: ${hotel.email}</div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const [customQuickLinks, setCustomQuickLinks] = useState([]);
  const [newQuick, setNewQuick] = useState({ title: '', description: '', iconName: 'Info' });

  const [categories, setCategories] = useState([
    { id: 'gastronomie', title: 'Gastronomie & Bar', subtitle: 'Speisekarten & Öffnungszeiten', content: 'Genießen Sie unsere regionale Küche.', iconName: 'Utensils' },
    { id: 'wellness', title: 'Wellness & SPA', subtitle: 'Sauna & Massagen', content: 'Entspannen Sie in unserem Wellnessbereich.', iconName: 'Heart' },
    { id: 'az_guide', title: 'Wichtiges von A bis Z', subtitle: 'Rezeption, Wäsche & Infos', content: 'Wichtige Informationen für Ihren Aufenthalt.', iconName: 'Info' }
  ]);

  const [newCat, setNewCat] = useState({ title: '', subtitle: '', content: '', iconName: 'Info' });
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const copyWifiPassword = () => {
    navigator.clipboard.writeText(hotel.wifiPass);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!emailInput.includes('@')) {
      setAuthError('Bitte eine gültige E-Mail-Adresse eingeben.');
      return;
    }
    if (passwordInput.length < 6) {
      setAuthError('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }
    setAppMode('dashboard');
    setIsAuthModalOpen(false);
    setPasswordInput('');
  };

  const handleAddCustomQuick = (e) => {
    e.preventDefault();
    if (!newQuick.title.trim()) return;
    if (customQuickLinks.length >= 2) {
      alert('Sie können maximal 2 eigene Schnellzugriffe hinzufügen.');
      return;
    }
    setCustomQuickLinks([...customQuickLinks, { id: Date.now().toString(), ...newQuick }]);
    setNewQuick({ title: '', description: '', iconName: 'Info' });
  };

  const handleDeleteCustomQuick = (id) => {
    setCustomQuickLinks(customQuickLinks.filter(item => item.id !== id));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCat.title.trim()) return;
    setCategories([...categories, { id: Date.now().toString(), ...newCat }]);
    setNewCat({ title: '', subtitle: '', content: '', iconName: 'Info' });
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const renderCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className={`w-5 h-5 ${currentTheme.primary}`} />;
      case 'Heart': return <Heart className={`w-5 h-5 ${currentTheme.primary}`} />;
      case 'Compass': return <Compass className={`w-5 h-5 ${currentTheme.primary}`} />;
      case 'Coffee': return <Coffee className={`w-5 h-5 ${currentTheme.primary}`} />;
      case 'Car': return <Car className={`w-5 h-5 ${currentTheme.primary}`} />;
      case 'Phone': return <Phone className={`w-5 h-5 ${currentTheme.primary}`} />;
      case 'Globe': return <Globe className={`w-5 h-5 ${currentTheme.primary}`} />;
      default: return <Info className={`w-5 h-5 ${currentTheme.primary}`} />;
    }
  };

  const handleImageUpload = (e) => {
    setUploadError('');
    setUploadSuccess('');
    const files = Array.from(e.target.files);
    if (hotel.images.length + files.length > 5) {
      setUploadError('Maximale Anzahl von 5 Fotos erreicht!');
      return;
    }
    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError(`Die Datei "${file.name}" überschreitet 5MB!`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setHotel((prev) => ({ ...prev, images: [...prev.images, reader.result] }));
        setUploadSuccess('Foto erfolgreich hinzugefügt!');
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    setHotel((prev) => ({ ...prev, images: prev.images.filter((_, idx) => idx !== indexToRemove) }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('Das Logo darf maximal 2MB groß sein.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => { setHotel((prev) => ({ ...prev, logoUrl: reader.result })); };
      reader.readAsDataURL(file);
    }
  };

  // 1. DASHBOARD MODU (OTELCİ PANENLİ - GUESTARY TARZI)
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
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">Plan Free</span>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">{t.dashboardTitle}</h1>
            </div>
          </div>

          {/* MÜLK KARTI & DÜZENLEME PANENELİ */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-6">
              <div className="flex items-center gap-4">
                {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-16 h-16 rounded-2xl object-cover border" /> : <div className="w-16 h-16 rounded-2xl bg-amber-900 text-white flex items-center justify-center font-bold text-lg">{hotel.name.charAt(0)}</div>}
                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">● LIVE</span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">{hotel.name}</h3>
                  <p className="text-xs text-stone-500">{hotel.address}</p>
                </div>
              </div>
              <button onClick={() => { setAppMode('guest'); setShowWelcomeScreen(false); }} className="bg-amber-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow hover:bg-amber-950 transition flex items-center gap-2 cursor-pointer">
                <ExternalLink className="w-4 h-4" /> {t.guestViewBtn}
              </button>
            </div>

            {/* İSTATİSTİK & QR MERKEZİ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{t.trialTitle} ({daysLeft} {t.trialDaysLeft})</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">{t.statsScans}</span>
                    <span className="text-xl font-black">{scanCount}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">{t.statsActiveRooms}</span>
                    <span className="text-xl font-black text-sky-400">100%</span>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-center space-y-3">
                <div className="font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                  <QrCode className="w-4 h-4 text-amber-800" /> {t.qrTitle}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => handlePrint('A4')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printA4}</button>
                  <button onClick={() => handlePrint('A5')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printA5}</button>
                  <button onClick={() => handlePrint('Visitenkarte')} className="bg-stone-900 text-white p-2 rounded-xl text-[10px] font-bold cursor-pointer">{t.printCard}</button>
                </div>
              </div>
            </div>

            {/* 8 TEMA SEÇİCİ */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-bold text-xs text-slate-900">{t.themeTitle} (8 Pro Temas)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(themes).map(([key, th]) => (
                  <button key={key} onClick={() => setHotel({...hotel, themeColor: key})} className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition ${hotel.themeColor === key ? 'ring-2 ring-slate-900 bg-stone-100 shadow-sm' : 'bg-white'}`}>
                    <span>{th.name}</span>
                    <div className={`w-4 h-4 rounded-full ${th.dot}`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* 1. OTEL BİLGİLERİ DÜZENLEME */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-bold text-xs text-slate-900">{t.sec1Title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblHotelName}</label>
                  <input type="text" value={hotel.name} onChange={(e) => setHotel({ ...hotel, name: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Standort / Region</label>
                  <input type="text" value={hotel.locationTitle} onChange={(e) => setHotel({ ...hotel, locationTitle: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{t.lblGreeting}</label>
                  <input type="text" value={hotel.welcomeGreeting} placeholder="Automatisch übersetzt wenn leer" onChange={(e) => setHotel({ ...hotel, welcomeGreeting: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
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

            {/* 2. LOGO HOCHLADEN */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5"><Upload className="w-4 h-4 text-amber-800" /> {t.sec2Title}</h3>
              <div className="flex items-center gap-4">
                {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-12 h-12 rounded-xl object-cover border" /> : <div className="w-12 h-12 rounded-xl bg-stone-100 border border-dashed flex items-center justify-center text-[10px] text-stone-400">No Logo</div>}
                <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition">
                  {t.btnLogoUpload}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* 3 & 4. BILDERVERWALTUNG (SLIDER & FOTOS) */}
            <div className="space-y-4 pt-4 border-t">
              <div>
                <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5"><ImageIcon className="w-4 h-4 text-amber-800" /> {t.sec3Title}</h3>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">{t.sec4Title}</p>
              </div>

              {uploadError && <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" /><span>{uploadError}</span></div>}
              {uploadSuccess && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-xl text-xs flex items-center gap-2"><Check className="w-4 h-4 shrink-0" /><span>{uploadSuccess}</span></div>}

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {hotel.images.map((img, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden h-20 group border border-slate-200">
                    <img src={img} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                    <button onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full shadow hover:bg-rose-700 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
                {hotel.images.length < 5 && (
                  <label className="border-2 border-dashed border-stone-300 rounded-xl h-20 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-50 transition">
                    <Plus className="w-5 h-5 text-stone-400" />
                    <span className="text-[10px] text-stone-500 font-medium mt-1">Foto</span>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* 5. SCHNELLZUGRIFF DÜZENLEME & ÖZEL EKLEME */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5"><Wifi className="w-4 h-4 text-amber-800" /> {t.sec5Title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblWifiSsid}</label>
                  <input type="text" value={hotel.wifiSsid} onChange={(e) => setHotel({ ...hotel, wifiSsid: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblWifiPass}</label>
                  <input type="text" value={hotel.wifiPass} onChange={(e) => setHotel({ ...hotel, wifiPass: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblBreakfastTime}</label>
                  <input type="text" value={hotel.breakfastTime} onChange={(e) => setHotel({ ...hotel, breakfastTime: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblCheckInOut}</label>
                  <input type="text" value={hotel.checkInOut} onChange={(e) => setHotel({ ...hotel, checkInOut: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lblParkingInfo}</label>
                  <input type="text" value={hotel.parkingInfo} onChange={(e) => setHotel({ ...hotel, parkingInfo: e.target.value })} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl" />
                </div>
              </div>

              {/* Özel Eklenebilir Schnellzugriff */}
              <div className="pt-3 border-t space-y-3">
                <h4 className="font-bold text-[11px] text-amber-900 uppercase">Eigene Schnellzugriffe (Aktuell: {customQuickLinks.length}/2)</h4>
                <div className="space-y-2">
                  {customQuickLinks.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border text-xs">
                      <div className="flex items-center gap-2">
                        {renderCategoryIcon(item.iconName)}
                        <div>
                          <span className="font-bold block">{item.title}</span>
                          <span className="text-[10px] text-stone-500">{item.description}</span>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteCustomQuick(item.id)} className="bg-rose-50 text-rose-600 p-1.5 rounded-lg cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>

                {customQuickLinks.length < 2 && (
                  <form onSubmit={handleAddCustomQuick} className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    <input type="text" placeholder="Titel (z.B. Fahrradverleih)" value={newQuick.title} onChange={(e) => setNewQuick({ ...newQuick, title: e.target.value })} className="p-2 text-xs border rounded-xl" />
                    <input type="text" placeholder="Beschreibung (z.B. Rezeption)" value={newQuick.description} onChange={(e) => setNewQuick({ ...newQuick, description: e.target.value })} className="p-2 text-xs border rounded-xl" />
                    <div className="flex gap-2">
                      <select value={newQuick.iconName} onChange={(e) => setNewQuick({ ...newQuick, iconName: e.target.value })} className="p-2 text-xs border rounded-xl bg-white w-full cursor-pointer">
                        <option value="Info">Info</option>
                        <option value="Phone">Telefon</option>
                        <option value="Globe">Webseite</option>
                        <option value="Coffee">Coffee</option>
                      </select>
                      <button type="submit" className="bg-amber-900 text-white px-3 py-2 rounded-xl text-xs font-bold shadow cursor-pointer shrink-0"><Plus className="w-4 h-4" /></button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* 6. KATEGORİ EKLEME, SİLME & ICON SEÇİMİ */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5"><Compass className="w-4 h-4 text-amber-800" /> {t.sec6Title}</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border text-xs">
                    <div className="flex items-center gap-3">
                      {renderCategoryIcon(cat.iconName)}
                      <div>
                        <span className="font-bold block text-slate-900">{cat.title}</span>
                        <span className="text-[10px] text-stone-500">{cat.subtitle}</span>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="bg-rose-50 text-rose-600 p-1.5 rounded-lg cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>

              {/* Yeni Kategori Ekleme Formu */}
              <form onSubmit={handleAddCategory} className="pt-3 border-t space-y-3">
                <h4 className="font-bold text-[11px] text-amber-900 uppercase">{t.btnAddCategory}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" placeholder="Titel (z.B. Pool & SPA)" value={newCat.title} onChange={(e) => setNewCat({ ...newCat, title: e.target.value })} className="p-2.5 text-xs border rounded-xl" />
                  <input type="text" placeholder="Untertitel (z.B. Regeln & Zeiten)" value={newCat.subtitle} onChange={(e) => setNewCat({ ...newCat, subtitle: e.target.value })} className="p-2.5 text-xs border rounded-xl" />
                </div>
                <textarea rows="2" placeholder="Inhalt / Details..." value={newCat.content} onChange={(e) => setNewCat({ ...newCat, content: e.target.value })} className="w-full p-2.5 text-xs border rounded-xl"></textarea>
                <div className="flex gap-2">
                  <select value={newCat.iconName} onChange={(e) => setNewCat({ ...newCat, iconName: e.target.value })} className="p-2.5 text-xs border rounded-xl bg-white w-full cursor-pointer">
                    <option value="Info">Info (Standard)</option>
                    <option value="Utensils">Gastronomie (Utensils)</option>
                    <option value="Heart">Wellness (Heart)</option>
                    <option value="Compass">Umgebung (Compass)</option>
                    <option value="Coffee">Frühstück (Coffee)</option>
                    <option value="Car">Parken (Car)</option>
                    <option value="Phone">Telefon (Phone)</option>
                    <option value="Globe">Webseite (Globe)</option>
                  </select>
                  <button type="submit" className="bg-amber-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow cursor-pointer shrink-0 flex items-center gap-1">
                    <Plus className="w-4 h-4" /> {t.btnCatSubmit}
                  </button>
                </div>
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

  // 3. MİSAFİR REHBER EKRANI (SAF, ADMIN TUŞU YOK)
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-32 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      
      {/* AUTH MODAL (E-POSTA & ŞİFRE GİRİŞİ) */}
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

      {/* HEADER */}
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
          {/* Gizli Partner Login */}
          <button onClick={() => setIsAuthModalOpen(true)} className="text-stone-300 hover:text-stone-600 p-1 text-xs cursor-pointer" title="Partner Login">🔑</button>
        </div>
      </header>

      {/* İÇERİK */}
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

              {/* Slider */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg h-56 bg-slate-900 border border-stone-200">
                <img src={hotel.images[currentSlide] || hotel.images[0]} alt="Slide" className="w-full h-full object-cover" />
              </div>

              {/* Hava Durumu */}
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

              {/* Hızlı Erişimler */}
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

                {/* Dinamik Özel Eklenen Schnellzugriff'ler */}
                {customQuickLinks.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
                    <div className={`flex items-center gap-2 ${currentTheme.primary}`}>
                      {renderCategoryIcon(item.iconName)}
                      <span className="font-bold text-xs text-slate-900">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">{t.navGaestemappe}</h3>
              <div className="grid grid-cols-1 gap-2.5">
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat)} className="w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between text-left cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${currentTheme.bgLight} flex items-center justify-center`}>{renderCategoryIcon(cat.iconName)}</div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">{cat.title}</h4>
                        <p className="text-xs text-slate-500">{cat.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )
        )}
      </main>

      {/* SAF MİSAFİR ALT MENÜSÜ (ASLA ADMIN TUŞU YOK!) */}
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