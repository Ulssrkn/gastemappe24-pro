import React, { useState, useEffect } from 'react';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Scroll, Save, Eye, EyeOff, Palette, TrendingUp, Users, Activity
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
    editCustomVal1: "Individuelle Zeit / Wert 1",
    editCustomVal2: "Individuelle Info / Wert 2",
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
    editCustomVal1: "Custom Time / Value 1",
    editCustomVal2: "Custom Info / Value 2",
    activeCard: "Show Card",
    inactiveCard: "Hide Card"
  },
  it: {
    welcomeBadge: "Guida digitale per gli ospiti",
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
    editCustomVal1: "Orario / Valore 1",
    editCustomVal2: "Info / Valore 2",
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
    editCustomVal1: "Heure / Valeur 1",
    editCustomVal2: "Info / Valeur 2",
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
    editCustomVal1: "Hora / Valor 1",
    editCustomVal2: "Info / Valor 2",
    activeCard: "Mostrar tarjeta",
    inactiveCard: "Ocultar tarjeta"
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
    editCustomVal1: "Özel Zaman / Değer 1",
    editCustomVal2: "Özel Bilgi / Değer 2",
    activeCard: "Kartı Göster",
    inactiveCard: "Kartı Gizle"
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
    editCustomVal1: "Tid / Värde 1",
    editCustomVal2: "Info / Värde 2",
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
    btnAddCategory: "Legg til kategori",
    modalTitle: "Katalog: Velg kategori",
    addBtn: "Legg til",
    editTitle: "Navn / Tittel",
    editCustomVal1: "Tid / Verdi 1",
    editCustomVal2: "Info / Verdi 2",
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
    editCustomVal1: "Vrijeme / Vrijednost 1",
    editCustomVal2: "Info / Vrijednost 2",
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
    editCustomVal1: "Koha / Vlera 1",
    editCustomVal2: "Info / Vlera 2",
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

const categoryPresets = [
  { 
    id: 'hotel_info', 
    group: 'Hotel & Unterkunft', 
    title: { de: 'Hotelinformationen', en: 'Hotel Information', tr: 'Otel Bilgileri', it: 'Informazioni sull\'hotel', fr: 'Informations sur l\'hôtel', es: 'Información del hotel', sv: 'Hotellinformation', no: 'Hotellinformasjon', hr: 'Informacije o hotelu', sq: 'Informacione për hotelin' }, 
    subtitle: { de: 'Rezeption & Zeiten', en: 'Reception & hours', tr: 'Resepsiyon ve saatler', it: 'Ricezione e orari', fr: 'Réception et horaires', es: 'Recepción y horarios', sv: 'Reception & tider', no: 'Resepsjon og tider', hr: 'Recepcija i radno vrijeme', sq: 'Recepsioni dhe oraret' }, 
    contentTpl: { 
      de: 'Herzlich willkommen in unserem Haus. Unsere Rezeption ist von {val1} für Sie besetzt. Notfallnummer: {val2}', 
      en: 'Welcome to our property. Our reception is open from {val1}. Emergency: {val2}', 
      tr: 'Tesisimize hoş geldiniz. Resepsiyonumuz {val1} saatleri arasında hizmet vermektedir. Acil hat: {val2}',
      it: 'Benvenuti nella nostra struttura. La nostra reception è aperta dalle {val1}. Emergenza: {val2}',
      fr: 'Bienvenue dans notre établissement. Notre réception est ouverte de {val1}. Urgence : {val2}',
      es: 'Bienvenidos a nuestro establecimiento. Nuestra recepción está abierta de {val1}. Emergencia: {val2}',
      sv: 'Välkommen till vår fastighet. Vår reception är öppen från {val1}. Nödnummer: {val2}',
      no: 'Velkommen til vår eiendom. Vår resepsjon er åpen fra {val1}. Nødnummer: {val2}',
      hr: 'Dobrodošli u naš objekt. Naša recepcija otvorena je od {val1}. Hitni broj: {val2}',
      sq: 'Mirë se erdhët në pronën tonë. Recepsioni ynë është i hapur nga {val1}. Urgjencë: {val2}'
    }, 
    defaultVal1: '07:00 - 22:00 Uhr', 
    defaultVal2: '+49 123 456', 
    icon: 'Building' 
  },
  { 
    id: 'room_info', 
    group: 'Hotel & Unterkunft', 
    title: { de: 'Zimmerinformationen', en: 'Room Information', tr: 'Oda Bilgileri', it: 'Informazioni sulle camere', fr: 'Informations sur les chambres', es: 'Información de la habitación', sv: 'Rumsinformation', no: 'Romsinformasjon', hr: 'Informacije o sobama', sq: 'Informacione për dhomat' }, 
    subtitle: { de: 'Ausstattung & Safe', en: 'Amenities & safe', tr: 'Oda özellikleri ve kasa', it: 'Servizi e cassaforte', fr: 'Équipements et coffre', es: 'Servicios y caja fuerte', sv: 'Bekvämligheter & kassaskåp', no: 'Fasiliteter og safe', hr: 'Sadržaji i sef', sq: 'Pajisjet dhe kasaforta' }, 
    contentTpl: { 
      de: 'Alle Zimmer sind mit Safe und Föhn ausgestattet. Hinweis: {val1}', 
      en: 'All rooms are equipped with safe and hairdryer. Note: {val1}', 
      tr: 'Tüm odalarda kasa ve saç kurutma makinesi mevcuttur. Not: {val1}',
      it: 'Tutte le camere sono dotate di cassaforte e asciugacapelli. Nota: {val1}',
      fr: 'Toutes les chambres sont équipées d\'un coffre-fort et d\'un sèche-cheveux. Remarque : {val1}',
      es: 'Todas las habitaciones están equipadas con caja fuerte y secador de pelo. Nota: {val1}',
      sv: 'Alla rum är utrustade med kassaskåp och hårtork. Observera: {val1}',
      no: 'Alle rom er utstyrt med safe og hårføner. Merk: {val1}',
      hr: 'Sve sobe opremljene su sefom i sušilicem za kosu. Napomena: {val1}',
      sq: 'Të gjitha dhomat janë të pajisura me kasafortë dhe tharëse flokësh. Shënim: {val1}'
    }, 
    defaultVal1: 'Nichtraucherzimmer', 
    defaultVal2: '', 
    icon: 'Bed' 
  },
  { 
    id: 'keys_access', 
    group: 'Hotel & Unterkunft', 
    title: { de: 'Zimmerschlüssel & Zugang', en: 'Keys & Access', tr: 'Anahtar ve Erişim', it: 'Chiavi e accesso', fr: 'Clés et accès', es: 'Llaves y acceso', sv: 'Nycklar & åtkomst', no: 'Nøkler og tilgang', hr: 'Ključevi i pristup', sq: 'Çelësat dhe qasja' }, 
    subtitle: { de: 'Karte & Schließzeiten', en: 'Keycard & locking times', tr: 'Anahtar kartı ve kapı saatleri', it: 'Scheda chiave e orari', fr: 'Carte clé et horaires', es: 'Tarjeta llave y horarios', sv: 'Nyckelkort & tider', no: 'Nøkkelkort og tider', hr: 'Ključ kartica i vremena', sq: 'Kardçelës dhe oraret' }, 
    contentTpl: { 
      de: 'Bitte nehmen Sie Ihre Schlüsselkarte beim Verlassen des Hauses mit. Info: {val1}', 
      en: 'Please take your keycard with you when leaving. Info: {val1}', 
      tr: 'Lütfen çıkarken anahtar kartınızı yanınıza alın. Bilgi: {val1}',
      it: 'Si prega di prendere la chiave magnetica quando si esce. Info: {val1}',
      fr: 'Veuillez emporter votre carte clé en sortant. Info : {val1}',
      es: 'Por favor, lleve su tarjeta llave al salir. Info: {val1}',
      sv: 'Ta med ditt nyckelkort när du går. Info: {val1}',
      no: 'Ta med nøkkelkortet når du går. Info: {val1}',
      hr: 'Molimo ponesite ključ karticu pri izlasku. Info: {val1}',
      sq: 'Ju lutemi merrni me vete kartën e dhomës kur dilni. Info: {val1}'
    }, 
    defaultVal1: '24h Empfang besetzt', 
    defaultVal2: '', 
    icon: 'Key' 
  },
  { 
    id: 'restaurant_dining', 
    group: 'Essen & Trinken', 
    title: { de: 'Restaurant & Bar', en: 'Restaurant & Bar', tr: 'Restoran ve Bar', it: 'Ristorante e Bar', fr: 'Restaurant et Bar', es: 'Restaurante y Bar', sv: 'Restaurang & Bar', no: 'Restaurant og Bar', hr: 'Restoran i Bar', sq: 'Restorant dhe Bar' }, 
    subtitle: { de: 'Öffnungszeiten & Menü', en: 'Hours & menu', tr: 'Çalışma saatleri ve menü', it: 'Orari e menu', fr: 'Horaires et menu', es: 'Horarios y menú', sv: 'Öppettider & meny', no: 'Åpningstider og meny', hr: 'Radno vrijeme i jelovnik', sq: 'Oraret dhe menyja' }, 
    contentTpl: { 
      de: 'Unser Bereich ist täglich von {val1} für Sie geöffnet. Details: {val2}', 
      en: 'Our venue is open daily from {val1}. Details: {val2}', 
      tr: 'Mekanımız her gün {val1} saatleri arasında açıktır. Detay: {val2}',
      it: 'Il nostro locale è aperto tutti i giorni dalle {val1}. Dettagli: {val2}',
      fr: 'Notre établissement est ouvert tous les jours de {val1}. Détails : {val2}',
      es: 'Nuestro local está abierto todos los días de {val1}. Detalles: {val2}',
      sv: 'Vår lokal är öppen dagligen från {val1}. Detaljer: {val2}',
      no: 'Vårt sted er åpent daglig fra {val1}. Detaljer: {val2}',
      hr: 'Naš objekt otvoren je svakodnevno od {val1}. Detalji: {val2}',
      sq: 'Vendi ynë është i hapur çdo ditë nga {val1}. Detaje: {val2}'
    }, 
    defaultVal1: '18:00 - 21:30 Uhr', 
    defaultVal2: 'Reservierung an der Rezeption', 
    icon: 'Utensils' 
  },
  { 
    id: 'cafe_snacks', 
    group: 'Essen & Trinken', 
    title: { de: 'Café & Lounge', en: 'Café & Lounge', tr: 'Kafe ve Dinlenme Alanı', it: 'Caffè e Lounge', fr: 'Café et Salon', es: 'Café y Salón', sv: 'Café & Lounge', no: 'Café og Lounge', hr: 'Kafić i Salon', sq: 'Kafe dhe Lounge' }, 
    subtitle: { de: 'Kaffee, Kuchen & Snacks', en: 'Coffee, cake & snacks', tr: 'Kahve, kek ve atıştırmalıklar', it: 'Caffè, dolci e snack', fr: 'Café, gâteaux et en-cas', es: 'Café, pasteles y aperitivos', sv: 'Kaffe, tårta & snacks', no: 'Kaffe, kake og snacks', hr: 'Kava, kolači i grickalice', sq: 'Kafe, ëmbëlsira dhe snack' }, 
    contentTpl: { 
      de: 'Genießen Sie am Nachmittag hausgemachten Kuchen von {val1}. Info: {val2}', 
      en: 'Enjoy homemade cake in the afternoon from {val1}. Info: {val2}', 
      tr: 'Öğleden sonra {val1} saatleri arasında ev yapımı keklerin tadını çıkarın. Bilgi: {val2}',
      it: 'Goditi una torta fatta in casa nel pomeriggio dalle {val1}. Info: {val2}',
      fr: 'Profitez de gâteaux faits maison l\'après-midi de {val1}. Info : {val2}',
      es: 'Disfrute de pasteles caseros por la tarde de {val1}. Info: {val2}',
      sv: 'Njut av hembakad tårta på eftermiddagen från {val1}. Info: {val2}',
      no: 'Nyt hjemmelaget kake på ettermiddagen fra {val1}. Info: {val2}',
      hr: 'Uživajte u domaćim kolačima popodne od {val1}. Info: {val2}',
      sq: 'Shijoni ëmbëlsira shtëpie pasdite nga {val1}. Info: {val2}'
    }, 
    defaultVal1: '14:00 - 18:00 Uhr', 
    defaultVal2: 'Terrassenbereich', 
    icon: 'Coffee' 
  },
  { 
    id: 'pool_aqua', 
    group: 'Wellness & Spa', 
    title: { de: 'Pool & Wellnessbereich', en: 'Pool & Wellness Area', tr: 'Havuz ve Wellness Alanı', it: 'Piscina e Benessere', fr: 'Piscine et Espace Bien-être', es: 'Piscina y Bienestar', sv: 'Pool & Wellness', no: 'Basseng og Velvære', hr: 'Bazen i Wellness', sq: 'Pishina dhe Wellness' }, 
    subtitle: { de: 'Öffnungszeiten & Handtücher', en: 'Hours & towels', tr: 'Çalışma saatleri ve havlular', it: 'Orari e asciugamani', fr: 'Horaires et serviettes', es: 'Horarios y toallas', sv: 'Öppettider & handdukar', no: 'Åpningstider og håndklær', hr: 'Radno vrijeme i ručnici', sq: 'Oraret dhe peshqirët' }, 
    contentTpl: { 
      de: 'Unser Poolbereich ist von {val1} geöffnet. Hinweis: {val2}', 
      en: 'Our pool area is open from {val1}. Note: {val2}', 
      tr: 'Havuz alanımız {val1} arası açıktır. Not: {val2}',
      it: 'La nostra area piscina è aperta dalle {val1}. Nota: {val2}',
      fr: 'Notre espace piscine est ouvert de {val1}. Remarque : {val2}',
      es: 'Nuestra zona de piscina está abierta de {val1}. Nota: {val2}',
      sv: 'Vårt poolområde är öppet från {val1}. Observera: {val2}',
      no: 'Vårt bassengområde er åpent fra {val1}. Merk: {val2}',
      hr: 'Naš bazenski prostor otvoren je od {val1}. Napomena: {val2}',
      sq: 'Zona jonë e pishinës është e hapur nga {val1}. Shënim: {val2}'
    }, 
    defaultVal1: '07:00 - 20:00 Uhr', 
    defaultVal2: 'Handtücher am Empfang erhältlich', 
    icon: 'Waves' 
  },
  { 
    id: 'sauna_spa', 
    group: 'Wellness & Spa', 
    title: { de: 'Sauna & Massagen', en: 'Sauna & Massages', tr: 'Sauna ve Masajlar', it: 'Sauna e Massaggi', fr: 'Sauna et Massages', es: 'Sauna y Masajes', sv: 'Sauna & Massage', no: 'Sauna og Massasje', hr: 'Sauna i Masaže', sq: 'Sauna dhe Masazhet' }, 
    subtitle: { de: 'Finnische Sauna & Termine', en: 'Finnish sauna & appointments', tr: 'Fin saunası ve randevu', it: 'Sauna finlandese e appuntamenti', fr: 'Sauna finlandais et rendez-vous', es: 'Sauna finlandesa y citas', sv: 'Finsk bastu & tider', no: 'Finsk badstue og avtaler', hr: 'Finska sauna i termini', sq: 'Sauna finlandeze dhe takimet' }, 
    contentTpl: { 
      de: 'Entspannen Sie in unserer finnischen Sauna von {val1}. Termin: {val2}', 
      en: 'Relax in our Finnish sauna from {val1}. Appointment: {val2}', 
      tr: 'Fin saunamızda {val1} saatleri arasında rahatlayın. Randevu: {val2}',
      it: 'Rilassati nella nostra sauna finlandese dalle {val1}. Appuntamento: {val2}',
      fr: 'Détendez-vous dans notre sauna finlandais de {val1}. Rendez-vous : {val2}',
      es: 'Relájese en nuestra sauna finlandesa de {val1}. Cita: {val2}',
      sv: 'Koppla av i vår finska bastu från {val1}. Bokning: {val2}',
      no: 'Slapp av i vår finske badstue fra {val1}. Bestilling: {val2}',
      hr: 'Opustite se u našoj finskoj sauni od {val1}. Termin: {val2}',
      sq: 'Relaksohuni në saunën tonë finlandeze nga {val1}. Takimi: {val2}'
    }, 
    defaultVal1: '16:00 - 21:00 Uhr', 
    defaultVal2: 'Anmeldung an der Rezeption', 
    icon: 'Sparkles' 
  },
  { 
    id: 'bike_rental', 
    group: 'Freizeit & Aktivitäten', 
    title: { de: 'Fahrradverleih', en: 'Bike Rental', tr: 'Bisiklet Kiralama', it: 'Noleggio biciclette', fr: 'Location de vélos', es: 'Alquiler de bicicletas', sv: 'Cykeluthyrning', no: 'Sykkelutleie', hr: 'Najam bicikala', sq: 'Qira biçikletash' }, 
    subtitle: { de: 'E-Bikes & Tourenkarten', en: 'E-bikes & trail maps', tr: 'Elektrikli bisiklet ve haritalar', it: 'E-bike e mappe', fr: 'E-bikes et cartes', es: 'Bicicletas eléctricas y mapas', sv: 'E-cyklar & kartor', no: 'Elsykler og kart', hr: 'E-bicikli i karte', sq: 'E-biçikleta dhe harta' }, 
    contentTpl: { 
      de: 'Hochwertige E-Bikes können tageweise ausgeliehen werden. Preis/Info: {val1}. Kontakt: {val2}', 
      en: 'High-quality e-bikes can be rented daily. Price/Info: {val1}. Contact: {val2}', 
      tr: 'Kaliteli e-bisikletler günlük kiralanabilir. Fiyat/Bilgi: {val1}. İletişim: {val2}',
      it: 'E-bike di alta qualità possono essere noleggiate giornalmente. Prezzo/Info: {val1}. Contatto: {val2}',
      fr: 'Des vélos électriques de haute qualité peuvent être loués à la journée. Prix/Info : {val1}. Contact : {val2}',
      es: 'Se pueden alquilar bicicletas eléctricas de alta calidad por días. Precio/Info: {val1}. Contacto: {val2}',
      sv: 'Högkvalitativa elcyklar kan hyras dagligen. Pris/Info: {val1}. Kontakt: {val2}',
      no: 'Elsykler av høy kvalitet kan leies daglig. Pris/Info: {val1}. Kontakt: {val2}',
      hr: 'Kvalitetni e-bicikli mogu se iznajmiti na dane. Cijena/Info: {val1}. Kontakt: {val2}',
      sq: 'E-biçikleta me cilësi të lartë mund të merren me qira ditore. Çmimi/Info: {val1}. Kontaktoni: {val2}'
    }, 
    defaultVal1: '25€ pro Tag', 
    defaultVal2: 'Rezeption', 
    icon: 'Compass' 
  },
  { 
    id: 'sightseeing', 
    group: 'Umgebung & Ausflüge', 
    title: { de: 'Sehenswürdigkeiten', en: 'Sights & Attractions', tr: 'Görülecek Yerler', it: 'Attrazioni turistiche', fr: 'Sites touristiques', es: 'Lugares de interés', sv: 'Sevärdheter', no: 'Severdigheter', hr: 'Znamenitosti', sq: 'Vende interesi' }, 
    subtitle: { de: 'Tipps & Highlights', en: 'Tips & highlights', tr: 'İpuçları ve önemli noktalar', it: 'Consigli e punti salienti', fr: 'Conseils et points forts', es: 'Consejos y destacados', sv: 'Tips & höjdpunkter', no: 'Tips og høydepunkter', hr: 'Savjeti i istaknuto', sq: 'Këshilla dhe pika kryesore' }, 
    contentTpl: { 
      de: 'Entdecken Sie die schönsten Orte der Region. Empfehlung: {val1}. Weitere Infos: {val2}', 
      en: 'Discover the best places in the region. Recommendation: {val1}. More info: {val2}', 
      tr: 'Bölgenin en güzel yerlerini keşfedin. Öneri: {val1}. Daha fazla bilgi: {val2}',
      it: 'Scopri i posti più bellli della regione. Consigli: {val1}. Altre info: {val2}',
      fr: 'Découvrez les plus beaux endroits de la région. Recommandation : {val1}. Plus d\'infos : {val2}',
      es: 'Descubra los mejores lugares de la región. Recomendación: {val1}. Más info: {val2}',
      sv: 'Upptäck regionens vackraste platser. Rekommendation: {val1}. Mer info: {val2}',
      no: 'Oppdag regionens vakreste steder. Anbefaling: {val1}. Mer info: {val2}',
      hr: 'Otkrijte najljepša mjesta u regiji. Preporuka: {val1}. Više informacija: {val2}',
      sq: 'Zbuloni vendet më të bukura të rajonit. Rekomandim: {val1}. Më shumë info: {val2}'
    }, 
    defaultVal1: 'Historische Altstadt', 
    defaultVal2: 'Karten an der Rezeption', 
    icon: 'MapPin' 
  },
  { 
    id: 'parking_mobility', 
    group: 'Anreise & Mobilität', 
    title: { de: 'Parkmöglichkeiten', en: 'Parking Facilities', tr: 'Otopark İmkanları', it: 'Parcheggio', fr: 'Parking', es: 'Aparcamiento', sv: 'Parkering', no: 'Parkering', hr: 'Parkiralište', sq: 'Parkimi' }, 
    subtitle: { de: 'Tiefgarage & E-Ladestation', en: 'Underground garage & EV charger', tr: 'Kapalı otopark ve elektrikli şarj', it: 'Garage sotterraneo e ricarica', fr: 'Garage souterrain et recharge', es: 'Garaje subterráneo y cargador', sv: 'Garage & elbilsladdning', no: 'Garasje og elbil-lader', hr: 'Garaža i punjač', sq: 'Garazh dhe karikues' }, 
    contentTpl: { 
      de: 'Ihnen stehen Parkmöglichkeiten zur Verfügung. Details: {val1}. Hinweis: {val2}', 
      en: 'Parking facilities are available. Details: {val1}. Note: {val2}', 
      tr: 'Otopark imkanları mevcuttur. Detay: {val1}. Not: {val2}',
      it: 'Sono disponibili posti auto. Dettagli: {val1}. Nota: {val2}',
      fr: 'Des facilités de stationnement sont disponibles. Détails : {val1}. Remarque : {val2}',
      es: 'Hay instalaciones de aparcamiento disponibles. Detalles: {val1}. Nota: {val2}',
      sv: 'Parkeringsmöjligheter finns tillgängliga. Detaljer: {val1}. Observera: {val2}',
      no: 'Parkeringsmuligheter er tilgjengelige. Detaljer: {val1}. Merk: {val2}',
      hr: 'Dostupna su parkirna mjesta. Detalji: {val1}. Napomena: {val2}',
      sq: 'Janë të disponueshme mundësi parkimi. Detajet: {val1}. Shënim: {val2}'
    }, 
    defaultVal1: 'Kostenfrei am Haus', 
    defaultVal2: 'E-Ladestation vorhanden', 
    icon: 'Car' 
  },
  { 
    id: 'reception_service', 
    group: 'Service & Informationen', 
    title: { de: 'Rezeption & Service', en: 'Reception & Service', tr: 'Resepsiyon ve Servis', it: 'Ricezione e Servizio', fr: 'Réception et Service', es: 'Recepción y Servicio', sv: 'Reception & Service', no: 'Resepsjon og Service', hr: 'Recepcija i Usluge', sq: 'Recepsioni dhe Shërbimi' }, 
    subtitle: { de: 'Weckruf & Gepäck', en: 'Wake-up call & luggage', tr: 'Uyandırma servisi ve bagaj', it: 'Sveglia e bagagli', fr: 'Réveil et bagages', es: 'Servicio despertador y equipaje', sv: 'Väckning & bagage', no: 'Vekking og bagasje', hr: 'Usluga buđenja i prtljaga', sq: 'Zgjimi dhe bagazhet' }, 
    contentTpl: { 
      de: 'Sie erreichen unseren Service unter der Nummer {val1}. Info: {val2}', 
      en: 'You can reach our service at number {val1}. Info: {val2}', 
      tr: 'Servisimize {val1} numarasından ulaşabilirsiniz. Bilgi: {val2}',
      it: 'Potete contattare il nostro servizio al numero {val1}. Info: {val2}',
      fr: 'Vous pouvez joindre notre service au numéro {val1}. Info : {val2}',
      es: 'Puede ponerse en contacto con nuestro servicio en el número {val1}. Info: {val2}',
      sv: 'Du kan nå vår service på nummer {val1}. Info: {val2}',
      no: 'Du kan nå vår tjeneste på nummer {val1}. Info: {val2}',
      hr: 'Našu uslugu možete kontaktirati na broj {val1}. Info: {val2}',
      sq: 'Mund të kontaktoni shërbimin tonë në numrin {val1}. Info: {val2}'
    }, 
    defaultVal1: 'Kurzwahl 9', 
    defaultVal2: 'Gepäckaufbewahrung verfügbar', 
    icon: 'Phone' 
  },
  { 
    id: 'house_rules', 
    group: 'Regeln & Wissenswertes', 
    title: { de: 'Hausordnung & Ruhezeiten', en: 'House Rules & Quiet Hours', tr: 'Ev Kuralları ve Sessizlik', it: 'Regolamento e Orari di silenzio', fr: 'Règlement et Heures de calme', es: 'Normas y Horas de silencio', sv: 'Ordningsregler & Tystnad', no: 'Husordensregler og Ro', hr: 'Kućni red i tišina', sq: 'Rregullat dhe Qetësia' }, 
    contentTpl: { 
      de: 'Wir bitten Sie die Ruhezeiten einzuhalten. Details: {val1}. Hinweis: {val2}', 
      en: 'We ask you to observe quiet hours. Details: {val1}. Note: {val2}', 
      tr: 'Lütfen sessizlik kurallarına uyunuz. Detay: {val1}. Not: {val2}',
      it: 'Vi chiediamo di rispettare gli orari di silenzio. Dettagli: {val1}. Nota: {val2}',
      fr: 'Nous vous demandons de respecter les heures de calme. Détails : {val1}. Remarque : {val2}',
      es: 'Les rogamos respeten las horas de silencio. Detalles: {val1}. Nota: {val2}',
      sv: 'Vi ber dig att iaktta tystnadstider. Detaljer: {val1}. Observera: {val2}',
      no: 'Vi ber deg om å overholde tidene for ro. Detaljer: {val1}. Merk: {val2}',
      hr: 'Molimo Vas da poštujete vrijeme mira. Detalji: {val1}. Napomena: {val2}',
      sq: 'Ju kërkojmë të respektoni orët e qetësisë. Detajet: {val1}. Shënim: {val2}'
    }, 
    defaultVal1: 'Nachtruhe ab 22:00 Uhr', 
    defaultVal2: 'Rauchverbot im gesamten Gebäude', 
    icon: 'ShieldCheck' 
  }
];

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
      { id: '1', presetId: 'hotel_info', icon: 'Building', customTitle: '', val1: '07:00 - 22:00 Uhr', val2: '+49 123 456' },
      { id: '2', presetId: 'restaurant_dining', icon: 'Utensils', customTitle: '', val1: '18:00 - 21:30 Uhr', val2: 'Reservierung an der Rezeption' }
    ];
  });

  const currentTheme = themeColors.find(tc => tc.id === hotel.themeColor) || themeColors[0];

  const handleSaveData = () => {
    localStorage.setItem('gm24_hotel', JSON.stringify(hotel));
    localStorage.setItem('gm24_categories', JSON.stringify(categories));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const hotelSlug = hotel.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
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
    setCategories([...categories, { 
      id: Date.now().toString(), 
      presetId: presetObj.id, 
      icon: presetObj.icon,
      customTitle: '',
      val1: presetObj.defaultVal1,
      val2: presetObj.defaultVal2
    }]);
    setIsCatalogModalOpen(false);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleUpdateCategoryField = (id, field, value) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
  };

  const copyWifiPassword = () => {
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

  const renderIcon = (iconName) => {
    const props = { className: `w-5 h-5 ${currentTheme.text}` };
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

  const groupedCategories = categories.reduce((acc, cat) => {
    const presetData = categoryPresets.find(p => p.id === cat.presetId);
    if (!presetData) return acc;
    const groupName = presetData.group;
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push({ ...cat, presetData });
    return acc;
  }, {});

  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] font-sans text-slate-800 p-6 md:p-10 space-y-8 relative pb-28">
        {/* Katalog Modal - Z-Index ve Mobil Kapsayıcı Düzeltmesi */}
        {isCatalogModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
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
                    <h3 className={`text-xs font-black ${currentTheme.text} uppercase tracking-wider`}>{groupName}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {presets.map((preset) => {
                        const title = preset.title[lang] || preset.title.de;
                        const sub = preset.subtitle[lang] || preset.subtitle.de;
                        return (
                          <div key={preset.id} className={`p-3 rounded-2xl border flex items-center justify-between transition bg-stone-50 hover:${currentTheme.border} cursor-pointer`}>
                            <div className="flex items-center gap-2.5">
                              {renderIcon(preset.icon)}
                              <div>
                                <span className="font-bold block text-xs text-slate-900">{title}</span>
                                <span className="text-[10px] text-stone-500 block">{sub}</span>
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
                {hotel.images.map((img, idx) => (
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
                      <input type="text" placeholder={t.lblWifiSsid} value={hotel.wifiSsid} onChange={(e) => setHotel({ ...hotel, wifiSsid: e.target.value })} className="p-2 text-xs border rounded-xl" />
                      <input type="text" placeholder={t.lblWifiPass} value={hotel.wifiPass} onChange={(e) => setHotel({ ...hotel, wifiPass: e.target.value })} className="p-2 text-xs border rounded-xl" />
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
                    <input type="text" placeholder={t.lblParkingInfo} value={hotel.parkingInfo} onChange={(e) => setHotel({ ...hotel, parkingInfo: e.target.value })} className="w-full p-2 text-xs border rounded-xl mt-2" />
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
                    <input type="text" placeholder={t.lblBreakfastTime} value={hotel.breakfastTime} onChange={(e) => setHotel({ ...hotel, breakfastTime: e.target.value })} className="w-full p-2 text-xs border rounded-xl mt-2" />
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
                    <input type="text" placeholder={t.lblCheckInOut} value={hotel.checkInOut} onChange={(e) => setHotel({ ...hotel, checkInOut: e.target.value })} className="w-full p-2 text-xs border rounded-xl mt-2" />
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
                    <div className="space-y-3">
                      {groupItems.map((cat) => {
                        const presetObj = cat.presetData;
                        const baseTitle = presetObj ? (presetObj.title[lang] || presetObj.title.de) : '';
                        const displayTitle = cat.customTitle || baseTitle;

                        return (
                          <div key={cat.id} className="p-4 bg-stone-50 rounded-2xl border space-y-3 shadow-sm">
                            <div className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-2">
                                {renderIcon(cat.icon)}
                                <span className="font-bold text-xs text-slate-800">{displayTitle}</span>
                              </div>
                              <button onClick={() => handleDeleteCategory(cat.id)} className="bg-rose-50 text-rose-600 p-1.5 rounded-lg cursor-pointer hover:bg-rose-100"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
                              <div>
                                <label className="block text-[9px] font-bold text-stone-500 uppercase mb-0.5">{t.editCustomVal1}</label>
                                <input 
                                  type="text" 
                                  value={cat.val1 || ''} 
                                  onChange={(e) => handleUpdateCategoryField(cat.id, 'val1', e.target.value)} 
                                  className="w-full p-2 text-xs border rounded-xl bg-white" 
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-stone-500 uppercase mb-0.5">{t.editCustomVal2}</label>
                                <input 
                                  type="text" 
                                  value={cat.val2 || ''} 
                                  onChange={(e) => handleUpdateCategoryField(cat.id, 'val2', e.target.value)} 
                                  className="w-full p-2 text-xs border rounded-xl bg-white" 
                                />
                              </div>
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
          <img src={hotel.images[0]} alt="Welcome" className="w-full h-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
        </div>

        <div className="relative z-10 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-white/20" /> : <div className={`w-8 h-8 rounded-lg ${currentTheme.bg} flex items-center justify-center font-bold text-xs`}>{hotel.name.charAt(0)}</div>}
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
          {hotel.logoUrl ? <img src={hotel.logoUrl} alt="Logo" className="w-9 h-9 rounded-xl object-cover border" /> : <div className={`w-9 h-9 rounded-xl ${currentTheme.bg} text-white flex items-center justify-center font-bold text-xs`}>{hotel.name.charAt(0)}</div>}
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
              <p className="text-xs text-slate-700 leading-relaxed">{selectedCategory.content}</p>
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
                <img src={hotel.images[currentSlide] || hotel.images[0]} alt="Slide" className="w-full h-full object-cover" />
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
                    {groupItems.map((cat) => {
                      const presetObj = cat.presetData;
                      const title = cat.customTitle || (presetObj.title[lang] || presetObj.title.de);
                      const sub = presetObj.subtitle[lang] || presetObj.subtitle.de;
                      
                      const rawTpl = presetObj.contentTpl[lang] || presetObj.contentTpl.de;
                      const content = rawTpl.replace('{val1}', cat.val1 || '').replace('{val2}', cat.val2 || '');

                      return (
                        <button key={cat.id} onClick={() => setSelectedCategory({ title, content })} className={`w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between text-left cursor-pointer hover:${currentTheme.border} transition`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${currentTheme.bgLight} flex items-center justify-center`}>{renderIcon(cat.icon)}</div>
                            <div>
                              <h5 className="text-sm font-extrabold text-slate-900">{title}</h5>
                              <p className="text-xs text-slate-500">{sub}</p>
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

      {/* Bottom Bar - Tamamen Seçilen Tema Rengiyle Bütünleşik */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-stone-200/80 z-50 shadow-2xl">
        <nav className="px-3 py-2 flex justify-around items-center">
          <button onClick={() => { setActiveTab('home'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'home' && !selectedCategory ? currentTheme.text : 'text-stone-400'}`}>
            <Info className="w-5 h-5" /><span>{t.navHome}</span>
          </button>
          <button onClick={() => { setActiveTab('services'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'services' || selectedCategory ? currentTheme.text : 'text-stone-400'}`}>
            <Compass className="w-5 h-5" /><span>{t.navGaestemappe}</span>
          </button>
          <a href={hotel.googleReviewUrl} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}>
            <Star className={`w-5 h-5 fill-current`} /><span>{t.navReview}</span>
          </a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}>
            <Navigation className="w-5 h-5" /><span>{t.navRoute}</span>
          </a>
        </nav>
      </div>
    </div>
  );
}import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Parse, Save, Eye, EyeOff, Palette, TrendingUp, Users, Activity
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
    qrTitle: "QR-Code & Print-Center",
    printA4: "Druckvorlage A4",
    printA5: "Druckvorlage A5",
    printCard: "Visitenkarte",
    sec1Title: "1. Unterkunft Informationen & Kontaktdaten",
    sec2Title: "2. Design & Farb-Themen (8 Optionen)",
    sec3Title: "3. Logo hochladen",
    sec4Title: "4. Bilderverwaltung (Slider)",
    sec5Title: "5. Schnellzugriff (Aktivieren / Deaktivieren)",
    sec6Title: "6. Gästemappe Kategorien (Strukturierter Katalog)",
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
    presetOptionLabel: "Wähle eine der 3 professionellen Vorlagen oder einen eigenen Eintrag:",
    customNotTranslatedWarning: "Hinweis: Dieser eigene Text wird nicht automatisch in alle 10 Sprachen übersetzt.",
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
    adminTitle: "Management & Analytics",
    guestViewBtn: "Open Guest View",
    saveBtn: "Save Changes",
    savedMsg: "Saved!",
    qrTitle: "QR Code & Print Center",
    printA4: "Print Template A4",
    printA5: "Print Template A5",
    printCard: "Business Card",
    sec1Title: "1. Property Information & Contacts",
    sec2Title: "2. Color Themes",
    sec3Title: "3. Upload Logo",
    sec4Title: "4. Image Management",
    sec5Title: "5. Quick Access",
    sec6Title: "6. Directory Categories",
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
    btnAddCategory: "Add Category",
    modalTitle: "Catalog: Select Category",
    addBtn: "Add",
    presetOptionLabel: "Choose one of 3 professional templates or a custom entry:",
    customNotTranslatedWarning: "Note: This custom text is not automatically translated into all 10 languages.",
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
    adminTitle: "Yönetim Paneli & Analitik",
    guestViewBtn: "Misafir Görünümünü Aç",
    saveBtn: "Değişiklikleri Kaydet",
    savedMsg: "Kaydedildi!",
    qrTitle: "QR Kod & Baskı Merkezi",
    printA4: "A4 Baskı Şablonu",
    printA5: "A5 Baskı Şablonu",
    printCard: "Kartvizit Şablonu",
    sec1Title: "1. Tesis Bilgileri & İletişim",
    sec2Title: "2. Renk Temaları",
    sec3Title: "3. Logo Yükleme",
    sec4Title: "4. Resim Yönetimi",
    sec5Title: "5. Hızlı Erişim",
    sec6Title: "6. Rehber Kategorileri (Katalog)",
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
    presetOptionLabel: "3 Profesyonel Şablondan Birini Seçin veya Özel Giriş Yapın:",
    customNotTranslatedWarning: "Not: Bu özel alan çoklu dil çeviricisine dahil değildir.",
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
    weatherSub: "Meteo locale",
    schnellzugriffTitle: "Accesso rapido",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parcheggio",
    breakfastTitle: "Colazione",
    checkInOutTitle: "Check-in / Out",
    detailBack: "Torna indietro",
    adminTitle: "Gestione e Analisi",
    guestViewBtn: "Apri vista ospiti",
    saveBtn: "Salva",
    savedMsg: "Salvato!",
    qrTitle: "Centro stampa QR",
    printA4: "Modello A4",
    printA5: "Modello A5",
    printCard: "Biglietto da visita",
    sec1Title: "1. Info struttura e contatti",
    sec2Title: "2. Temi di colore",
    sec3Title: "3. Carica logo",
    sec4Title: "4. Gestione immagini",
    sec5Title: "5. Accesso rapido",
    sec6Title: "6. Categorie",
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
    modalTitle: "Catalogo: Seleziona categoria",
    addBtn: "Aggiungi",
    presetOptionLabel: "Scegli tra 3 modelli professionali o un testo personalizzato:",
    customNotTranslatedWarning: "Nota: Questo testo personalizzato non viene tradotto automaticamente in tutte le 10 lingue.",
    activeCard: "Mostra",
    inactiveCard: "Nascondi"
  },
  fr: {
    welcomeBadge: "Guide numérique",
    welcomeButton: "C'est parti",
    greetingHello: "Bonjour,",
    greetingWelcome: "bienvenue.",
    navHome: "Accueil",
    navGaestemappe: "Guide",
    navReview: "Avis",
    navRoute: "Itinéraire",
    weatherTitle: "Ensoleillé",
    weatherSub: "Météo actuelle",
    schnellzugriffTitle: "Accès rapide",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parking",
    breakfastTitle: "Petit-déjeuner",
    checkInOutTitle: "Arrivée / Départ",
    detailBack: "Retour",
    adminTitle: "Administration",
    guestViewBtn: "Vue invité",
    saveBtn: "Enregistrer",
    savedMsg: "Enregistré !",
    qrTitle: "Centre QR",
    printA4: "A4",
    printA5: "A5",
    printCard: "Carte",
    sec1Title: "1. Infos et contacts",
    sec2Title: "2. Couleurs",
    sec3Title: "3. Logo",
    sec4Title: "4. Images",
    sec5Title: "5. Accès rapide",
    sec6Title: "6. Catégories",
    lblHotelName: "Nom de l'hôtel",
    lblPhone: "Téléphone",
    lblEmailField: "E-mail",
    lblAddress: "Adresse",
    lblWebsite: "Site web",
    lblGoogleReview: "Avis Google",
    lblWifiSsid: "Wi-Fi SSID",
    lblWifiPass: "Mot de passe Wi-Fi",
    lblBreakfastTime: "Heures de petit-déjeuner",
    lblCheckInOut: "Infos Check-in",
    lblParkingInfo: "Infos parking",
    btnLogoUpload: "Choisir logo",
    btnAddCategory: "Ajouter",
    modalTitle: "Catalogue",
    addBtn: "Ajouter",
    presetOptionLabel: "Choisissez un modèle professionnel ou un texte libre :",
    customNotTranslatedWarning: "Remarque : ce texte personnalisé n'est pas traduit automatiquement.",
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
    adminTitle: "Gestión",
    guestViewBtn: "Vista huésped",
    saveBtn: "Guardar",
    savedMsg: "¡Guardado!",
    qrTitle: "Centro QR",
    printA4: "A4",
    printA5: "A5",
    printCard: "Tarjeta",
    sec1Title: "1. Info y contactos",
    sec2Title: "2. Colores",
    sec3Title: "3. Logo",
    sec4Title: "4. Imágenes",
    sec5Title: "5. Acceso rápido",
    sec6Title: "6. Categorías",
    lblHotelName: "Nombre del hotel",
    lblPhone: "Teléfono",
    lblEmailField: "E-mail",
    lblAddress: "Dirección",
    lblWebsite: "Web",
    lblGoogleReview: "Reseña Google",
    lblWifiSsid: "Wi-Fi SSID",
    lblWifiPass: "Contraseña Wi-Fi",
    lblBreakfastTime: "Desayuno",
    lblCheckInOut: "Check-in",
    lblParkingInfo: "Parking",
    btnLogoUpload: "Logo",
    btnAddCategory: "Añadir",
    modalTitle: "Catálogo",
    addBtn: "Añadir",
    presetOptionLabel: "Elige una plantilla profesional o texto personalizado:",
    customNotTranslatedWarning: "Nota: Este texto no se traduce automáticamente a los 10 idiomas.",
    activeCard: "Mostrar",
    inactiveCard: "Ocultar"
  },
  sv: {
    welcomeBadge: "Digital gästguide",
    welcomeButton: "Starta",
    greetingHello: "Hej,",
    greetingWelcome: "välkommen.",
    navHome: "Hem",
    navGaestemappe: "Guide",
    navReview: "Recensera",
    navRoute: "Vägbeskrivning",
    weatherTitle: "Soligt",
    weatherSub: "Väder",
    schnellzugriffTitle: "Snabblänkar",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parkering",
    breakfastTitle: "Frukost",
    checkInOutTitle: "In- / Utcheckning",
    detailBack: "Tillbaka",
    adminTitle: "Administration",
    guestViewBtn: "Gästvy",
    saveBtn: "Spara",
    savedMsg: "Sparat!",
    qrTitle: "QR-center",
    printA4: "A4",
    printA5: "A5",
    printCard: "Kort",
    sec1Title: "1. Info",
    sec2Title: "2. Färg",
    sec3Title: "3. Logo",
    sec4Title: "4. Bilder",
    sec5Title: "5. Snabbåtkomst",
    sec6Title: "6. Kategorier",
    lblHotelName: "Hotellnamn",
    lblPhone: "Telefon",
    lblEmailField: "E-post",
    lblAddress: "Adress",
    lblWebsite: "Webb",
    lblGoogleReview: "Google Review",
    lblWifiSsid: "Wi-Fi SSID",
    lblWifiPass: "Lösenord",
    lblBreakfastTime: "Frukosttider",
    lblCheckInOut: "Incheckning",
    lblParkingInfo: "Parkering",
    btnLogoUpload: "Välj logo",
    btnAddCategory: "Lägg till",
    modalTitle: "Katalog",
    addBtn: "Lägg till",
    presetOptionLabel: "Välj en professionell mall eller egen text:",
    customNotTranslatedWarning: "Obs: Denna text översätts inte automatiskt.",
    activeCard: "Visa",
    inactiveCard: "Dölj"
  },
  no: {
    welcomeBadge: "Digital guide",
    welcomeButton: "Start",
    greetingHello: "Hei,",
    greetingWelcome: "velkommen.",
    navHome: "Hjem",
    navGaestemappe: "Guide",
    navReview: "Vurder",
    navRoute: "Rute",
    weatherTitle: "Sol",
    weatherSub: "Vær",
    schnellzugriffTitle: "Hurtigvalg",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parkering",
    breakfastTitle: "Frokost",
    checkInOutTitle: "Inn / Ut",
    detailBack: "Tilbake",
    adminTitle: "Admin",
    guestViewBtn: "Gjestevisning",
    saveBtn: "Lagre",
    savedMsg: "Lagret!",
    qrTitle: "QR-senter",
    printA4: "A4",
    printA5: "A5",
    printCard: "Kort",
    sec1Title: "1. Info",
    sec2Title: "2. Farge",
    sec3Title: "3. Logo",
    sec4Title: "4. Bilder",
    sec5Title: "5. Hurtigtilgang",
    sec6Title: "6. Kategorier",
    lblHotelName: "Hotellnavn",
    lblPhone: "Telefon",
    lblEmailField: "E-post",
    lblAddress: "Adresse",
    lblWebsite: "Nettsted",
    lblGoogleReview: "Google Omtale",
    lblWifiSsid: "Wi-Fi SSID",
    lblWifiPass: "Passord",
    lblBreakfastTime: "Frokosttider",
    lblCheckInOut: "Sjekk ut",
    lblParkingInfo: "Parkering",
    btnLogoUpload: "Logo",
    btnAddCategory: "Legg til",
    modalTitle: "Katalog",
    addBtn: "Legg til",
    presetOptionLabel: "Velg en profesjonell mal eller egendefinert tekst:",
    customNotTranslatedWarning: "Merk: Denne teksten oversettes ikke automatisk.",
    activeCard: "Vis",
    inactiveCard: "Skjul"
  },
  hr: {
    welcomeBadge: "Digitalni vodič",
    welcomeButton: "Kreni",
    greetingHello: "Pozdrav,",
    greetingWelcome: "dobrodošli.",
    navHome: "Početna",
    navGaestemappe: "Vodič",
    navReview: "Ocijeni",
    navRoute: "Upute",
    weatherTitle: "Sunčano",
    weatherSub: "Vrijeme",
    schnellzugriffTitle: "Brzi pristup",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parking",
    breakfastTitle: "Doručak",
    checkInOutTitle: "Prijava / Odjava",
    detailBack: "Natrag",
    adminTitle: "Administracija",
    guestViewBtn: "Prikaz za goste",
    saveBtn: "Spremi",
    savedMsg: "Spremljeno!",
    qrTitle: "QR centar",
    printA4: "A4",
    printA5: "A5",
    printCard: "Kartica",
    sec1Title: "1. Info",
    sec2Title: "2. Boje",
    sec3Title: "3. Logo",
    sec4Title: "4. Slike",
    sec5Title: "5. Brzi pristup",
    sec6Title: "6. Kategorije",
    lblHotelName: "Naziv hotela",
    lblPhone: "Telefon",
    lblEmailField: "E-pošta",
    lblAddress: "Adresa",
    lblWebsite: "Web",
    lblGoogleReview: "Google recenzija",
    lblWifiSsid: "Wi-Fi SSID",
    lblWifiPass: "Lozinka",
    lblBreakfastTime: "Vrijeme doručka",
    lblCheckInOut: "Prijava",
    lblParkingInfo: "Parking",
    btnLogoUpload: "Logo",
    btnAddCategory: "Dodaj",
    modalTitle: "Katalog",
    addBtn: "Dodaj",
    presetOptionLabel: "Odaberite profesionalni predložak ili vlastiti tekst:",
    customNotTranslatedWarning: "Napomena: Ovaj se tekst ne prevodi automatski.",
    activeCard: "Prikaži",
    inactiveCard: "Sakrij"
  },
  sq: {
    welcomeBadge: "Udhëzues",
    welcomeButton: "Fillo",
    greetingHello: "Përshëndetje,",
    greetingWelcome: "mirë se erdhët.",
    navHome: "Kryefaqja",
    navGaestemappe: "Udhëzuesi",
    navReview: "Vlerëso",
    navRoute: "Udha",
    weatherTitle: "Me diell",
    weatherSub: "Moti",
    schnellzugriffTitle: "Qasje e shpejtë",
    wlanTitle: "Wi-Fi",
    parkingTitle: "Parkimi",
    breakfastTitle: "Mëngjesi",
    checkInOutTitle: "Check-in",
    detailBack: "Kthehu",
    adminTitle: "Admin",
    guestViewBtn: "Pamja",
    saveBtn: "Ruaj",
    savedMsg: "U ruajt!",
    qrTitle: "Qendra QR",
    printA4: "A4",
    printA5: "A5",
    printCard: "Kard",
    sec1Title: "1. Info",
    sec2Title: "2. Ngjyra",
    sec3Title: "3. Logo",
    sec4Title: "4. Imazhe",
    sec5Title: "5. Qasje",
    sec6Title: "6. Kategoritë",
    lblHotelName: "Emri",
    lblPhone: "Telefoni",
    lblEmailField: "E-mail",
    lblAddress: "Adresa",
    lblWebsite: "Web",
    lblGoogleReview: "Google Review",
    lblWifiSsid: "Wi-Fi SSID",
    lblWifiPass: "Fjalëkalimi",
    lblBreakfastTime: "Orari i mëngjesit",
    lblCheckInOut: "Check-in",
    lblParkingInfo: "Parkimi",
    btnLogoUpload: "Logo",
    btnAddCategory: "Shto",
    modalTitle: "Katalogu",
    addBtn: "Shto",
    presetOptionLabel: "Zgjidhni një model profesional ose tekst personal:",
    customNotTranslatedWarning: "Shënim: Ky tekst nuk përkthehet automatikisht.",
    activeCard: "Shfaq",
    inactiveCard: "Fshih"
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

// Tüm 10 dilde kusursuz, kategorisine tam uyumlu lüks otel standartlarında 3'er şablon + Özel (Custom) Alan
const categoryCatalog = [
  { 
    id: 'hotel_info', 
    group: 'Hotel & Unterkunft', 
    icon: 'Building',
    title: { 
      de: 'Hotelinformationen & Rezeption', 
      en: 'Hotel Information & Reception', 
      tr: 'Otel Bilgileri & Resepsiyon',
      it: 'Informazioni sull\'hotel e Reception',
      fr: 'Informations sur l\'hôtel et Réception',
      es: 'Información del hotel y recepción',
      sv: 'Hotellinformation & Reception',
      no: 'Hotellinformasjon og Resepsjon',
      hr: 'Informacije o hotelu i recepcija',
      sq: 'Informacione për hotelin & Recepsioni'
    },
    presets: [
      { 
        id: 'p1', 
        label: { 
          de: 'Klassische Rezeptionszeiten', 
          en: 'Classic Reception Hours', 
          tr: 'Klasik Resepsiyon Saatleri',
          it: 'Orari classici della reception',
          fr: 'Horaires de réception classiques',
          es: 'Horarios de recepción clásicos',
          sv: 'Klassiska receptionstider',
          no: 'Klassiske resepsjonstider',
          hr: 'Klasično radno vrijeme recepcije',
          sq: 'Orari klasik i recepsionit'
        }, 
        text: {
          de: 'Unsere Rezeption ist täglich von {timeSlot} für Sie besetzt. Für dringende Anliegen außerhalb dieser Zeiten kontaktieren Sie uns telefonisch.',
          en: 'Our reception is open daily from {timeSlot}. For urgent matters outside these hours, please contact us by phone.',
          tr: 'Resepsiyonumuz her gün {timeSlot} saatleri arasında hizmet vermektedir. Bu saatler dışındaki acil talepleriniz için bize telefonla ulaşabilirsiniz.',
          it: 'La nostra reception è aperta tutti i giorni dalle {timeSlot}. Per urgenze al di fuori di questi orari, contattateci telefonicamente.',
          fr: 'Notre réception est ouverte tous les jours de {timeSlot}. Pour toute urgence en dehors de ces horaires, veuillez nous contacter par téléphone.',
          es: 'Nuestra recepción está abierta todos los días de {timeSlot}. Para urgencias fuera de este horario, póngase en contacto por teléfono.',
          sv: 'Vår reception är öppen dagligen från {timeSlot}. Vid brådskande ärenden utanför dessa tider, vänligen kontakta oss per telefon.',
          no: 'Vår resepsjon er åpen daglig fra {timeSlot}. Ved hastesaker utenfor disse tidene, vennligst kontakt oss på telefon.',
          hr: 'Naša recepcija otvorena je svakodnevno od {timeSlot}. Za hitne slučajeve izvan ovog radnog vremena, molimo kontaktirajte nas telefonom.',
          sq: 'Recepsioni ynë është i hapur çdo ditë nga {timeSlot}. Për çështje urgjente jashtë këtyre orareve, ju lutemi na kontaktoni me telefon.'
        }
      },
      { 
        id: 'p2', 
        label: { 
          de: 'Erweiterter Empfang mit Notfall-Hotline', 
          en: 'Extended Service with Emergency Hotline', 
          tr: 'Genişletilmiş Servis ve Acil Hat',
          it: 'Servizio esteso con linea di emergenza',
          fr: 'Service étendu avec ligne d\'urgence',
          es: 'Servicio extendido con línea de emergencia',
          sv: 'Utökad service med jourtelefon',
          no: 'Utvidet service med nødtelefon',
          hr: 'Proširena usluga s dežurnom linijom',
          sq: 'Shërbim i zgjeruar me linjë urgjence'
        }, 
        text: {
          de: 'Unser Team empfängt Sie persönlich von {timeSlot}. Rund um die Uhr erreichbar über unsere Notfall-Kurzwahl.',
          en: 'Our team welcomes you personally from {timeSlot}. Available 24/7 via our emergency short-dial.',
          tr: 'Ekibimiz {timeSlot} saatleri arasında sizi şahsen karşılar. 7/24 acil kısa numaramız üzerinden bize ulaşabilirsiniz.',
          it: 'Il nostro team vi accoglie personalmente dalle {timeSlot}. Disponibili 24 ore su 24 tramite il nostro numero di emergenza.',
          fr: 'Notre équipe vous accueille personnellement de {timeSlot}. Joignable 24h/24 via notre numéro d\'urgence.',
          es: 'Nuestro equipo le recibe personalmente de {timeSlot}. Disponible 24/7 a través de nuestro número de emergencia.',
          sv: 'Vårt team tar emot dig personligen från {timeSlot}. Tillgängliga dygnet runt via vårt journummer.',
          no: 'Vårt team tar imot deg personlig fra {timeSlot}. Tilgjengelig døgnet rundt via vår nødtelefon.',
          hr: 'Naš tim osobno vas dočekuje od {timeSlot}. Dostupno 24/7 putem našeg hitnog broja.',
          sq: 'Ekipi ynë ju mirëpret personalisht nga {timeSlot}. Të disponueshëm 24/7 përmes numrit tonë të urgjencës.'
        }
      },
      { 
        id: 'p3', 
        label: { 
          de: 'Flexible Tagesbetreuung', 
          en: 'Flexible Daytime Assistance', 
          tr: 'Esnek Gündüz Desteği',
          it: 'Assistenza diurna flessibile',
          fr: 'Assistance diurne flexible',
          es: 'Asistencia diurna flexible',
          sv: 'Flexibel dagtidsassistans',
          no: 'Fleksibel dagtidsassistanse',
          hr: 'Fleksibilna dnevna asistencija',
          sq: 'Asistencë fleksibël gjatë ditës'
        }, 
        text: {
          de: 'Gäste-Service und Schlüsselbetreuung von {timeSlot} verfügbar. Sprechen Sie uns gerne an.',
          en: 'Guest service and key assistance available from {timeSlot}. Please feel free to reach out to us.',
          tr: 'Misafir hizmetleri ve anahtar desteği {timeSlot} arasında sağlanmaktadır. Lütfen bizimle iletişime geçmekten çekinmeyin.',
          it: 'Servizio ospiti e assistenza chiavi disponibili dalle {timeSlot}. Non esitate a contattarci.',
          fr: 'Service clients et assistance clés disponibles de {timeSlot}. N\'hésitez pas à nous contacter.',
          es: 'Servicio de huéspedes y asistencia de llaves disponible de {timeSlot}. No dude en contactarnos.',
          sv: 'Gästservice och nyckelhjälp tillgänglig från {timeSlot}. Tveka inte att kontakta oss.',
          no: 'Gjesteservice og nøkkelhjelp tilgjengelig fra {timeSlot}. Ikke nøl med å kontakte oss.',
          hr: 'Usluga za goste i pomoć s ključevima dostupna od {timeSlot}. Slobodno nam se obratite.',
          sq: 'Shërbimi për mysafirët dhe ndihma me çelësat në dispozicion nga {timeSlot}. Mos hezitoni të na kontaktoni.'
        }
      }
    ]
  },
  { 
    id: 'restaurant_dining', 
    group: 'Essen & Trinken', 
    icon: 'Utensils',
    title: { 
      de: 'Restaurant, Bar & Frühstück', 
      en: 'Restaurant, Bar & Breakfast', 
      tr: 'Restoran, Bar & Kahvaltı',
      it: 'Ristorante, Bar e Colazione',
      fr: 'Restaurant, Bar et Petit-déjeuner',
      es: 'Restaurante, Bar y Desayuno',
      sv: 'Restaurang, Bar & Frukost',
      no: 'Restaurant, Bar og Frokost',
      hr: 'Restoran, bar i doručak',
      sq: 'Restorant, Bar & Mëngjesi'
    },
    presets: [
      { 
        id: 'p1', 
        label: { 
          de: 'Warme Abendküche', 
          en: 'Warm Dinner Service', 
          tr: 'Sıcak Akşam Servisi',
          it: 'Cucina calda serale',
          fr: 'Service du dîner chaud',
          es: 'Servicio de cena caliente',
          sv: 'Varm kvällsmeny',
          no: 'Varm kveldsservering',
          hr: 'Topla večera',
          sq: 'Shërbimi i darkës së ngrohtë'
        }, 
        text: {
          de: 'Genießen Sie unsere gehobene Küche täglich von {timeSlot}. Tischreservierungen nehmen wir gerne an.',
          en: 'Enjoy our fine dining daily from {timeSlot}. Table reservations are gladly accepted.',
          tr: 'Seçkin mutfağımızın tadını her gün {timeSlot} saatleri arasında çıkarın. Masa rezervasyonlarınız memnuniyetle kabul edilir.',
          it: 'Goditi la nostra cucina raffinata tutti i giorni dalle {timeSlot}. Si accettano prenotazioni di tavoli.',
          fr: 'Profitez de notre cuisine raffinée tous les jours de {timeSlot}. Les réservations de tables sont les bienvenues.',
          es: 'Disfrute de nuestra cocina todos los días de {timeSlot}. Aceptamos reservas de mesa con mucho gusto.',
          sv: 'Njut av vårt fina kök dagligen från {timeSlot}. Bordsbokningar tas gärna emot.',
          no: 'Nyt vårt fine kjøkken daglig fra {timeSlot}. Bordbestillinger tas gjerne imot.',
          hr: 'Uživajte u našoj kuhinji svakodnevno od {timeSlot}. Rado prihvaćamo rezervacije stolova.',
          sq: 'Shijoni kuzhinën tonë çdo ditë nga {timeSlot}. Rezervimet e tavolinave pranohen me kënaqësi.'
        }
      },
      { 
        id: 'p2', 
        label: { 
          de: 'Lounge & Bar Öffnungszeiten', 
          en: 'Lounge & Bar Hours', 
          tr: 'Lounge & Bar Çalışma Saatleri',
          it: 'Orari Lounge e Bar',
          fr: 'Horaires Lounge et Bar',
          es: 'Horario de Lounge y Bar',
          sv: 'Lounge & Bar Öppettider',
          no: 'Lounge og Bar Åpningstider',
          hr: 'Radno vrijeme bara i salona',
          sq: 'Orari i Lounge & Bar'
        }, 
        text: {
          de: 'Erfrischende Getränke und Cocktails in unserer Bar von {timeSlot}.',
          en: 'Refreshing drinks and cocktails served in our bar from {timeSlot}.',
          tr: 'Barımızda {timeSlot} saatleri arasında serinletici içecekler ve kokteyller sunulmaktadır.',
          it: 'Bevande rinfrescanti e cocktail serviti nel nostro bar dalle {timeSlot}.',
          fr: 'Boissons rafraîchissantes et cocktails servis dans notre bar de {timeSlot}.',
          es: 'Bebidas refrescantes y cócteles servidos en nuestro bar de {timeSlot}.',
          sv: 'Uppfriskande drycker och cocktails serveras i vår bar från {timeSlot}.',
          no: 'Forfriskende drikker og cocktailer serveres i vår bar fra {timeSlot}.',
          hr: 'Osvježavajuća pića i kokteli poslužuju se u našem baru od {timeSlot}.',
          sq: 'Pije freskuese dhe kokteje të servuara në barin tonë nga {timeSlot}.'
        }
      },
      { 
        id: 'p3', 
        label: { 
          de: 'Frühstücksbuffet', 
          en: 'Breakfast Buffet', 
          tr: 'Açık Büfe Kahvaltı',
          it: 'Colazione a buffet',
          fr: 'Buffet du petit-déjeuner',
          es: 'Desayuno buffet',
          sv: 'Frukostbuffé',
          no: 'Frokostbuffet',
          hr: 'Švedski stol za doručak',
          sq: 'Buffet i Mëngjesit'
        }, 
        text: {
          de: 'Reichhaltiges Frühstücksbuffet für einen guten Start in den Tag von {timeSlot}.',
          en: 'Rich breakfast buffet for a perfect start to your day from {timeSlot}.',
          tr: 'Güne harika bir başlangıç için zengin kahvaltı büfemiz {timeSlot} arasında açıktır.',
          it: 'Ricca colazione a buffet per iniziare al meglio la giornata dalle {timeSlot}.',
          fr: 'Riche buffet de petit-déjeuner pour bien commencer la journée de {timeSlot}.',
          es: 'Completo desayuno buffet para comenzar bien el día de {timeSlot}.',
          sv: 'Riklig frukostbuffé för en bra start på dagen från {timeSlot}.',
          no: 'Rikholdig frokostbuffé for en god start på dagen fra {timeSlot}.',
          hr: 'Bogat švedski stol za dobar početak dana od {timeSlot}.',
          sq: 'Buffet i pasur mëngjesi për një fillim të mbarë të ditës nga {timeSlot}.'
        }
      }
    ]
  },
  { 
    id: 'pool_aqua', 
    group: 'Wellness & Spa', 
    icon: 'Waves',
    title: { 
      de: 'Pool, Sauna & Wellness', 
      en: 'Pool, Sauna & Wellness', 
      tr: 'Havuz, Sauna & Wellness',
      it: 'Piscina, Sauna e Benessere',
      fr: 'Piscine, Sauna et Bien-être',
      es: 'Piscina, Sauna y Bienestar',
      sv: 'Pool, Sauna & Wellness',
      no: 'Basseng, Badstue og Velvære',
      hr: 'Bazen, sauna i wellness',
      sq: 'Pishina, Sauna & Wellness'
    },
    presets: [
      { 
        id: 'p1', 
        label: { 
          de: 'Hallenbad Öffnungszeiten', 
          en: 'Indoor Pool Hours', 
          tr: 'Kapalı Havuz Saatleri',
          it: 'Orari piscina coperta',
          fr: 'Horaires de la piscine intérieure',
          es: 'Horario de piscina cubierta',
          sv: 'Inomhuspool öppettider',
          no: 'Innendørs basseng åpningstider',
          hr: 'Radno vrijeme unutarnjeg bazena',
          sq: 'Orari i pishinës së brendshme'
        }, 
        text: {
          de: 'Entspannen Sie in unserem Wellness-Poolbereich von {timeSlot}. Handtücher liegen bereit.',
          en: 'Relax in our wellness pool area from {timeSlot}. Towels are provided.',
          tr: 'Wellness havuz alanımızda {timeSlot} saatleri arasında dinlenin. Havlular sağlanmaktadır.',
          it: 'Rilassati nella nostra area piscina benessere dalle {timeSlot}. Gli asciugamani sono forniti.',
          fr: 'Détendez-vous dans notre espace piscine bien-être de {timeSlot}. Les serviettes sont fournies.',
          es: 'Relájese en nuestra zona de piscina de bienestar de {timeSlot}. Se proporcionan toallas.',
          sv: 'Koppla av i vårt wellness-poolområde från {timeSlot}. Handdukar tillhandahålls.',
          no: 'Slapp av i vårt velvære-bassengområde fra {timeSlot}. Håndklær tilbys.',
          hr: 'Opustite se u našem wellness bazenskom prostoru od {timeSlot}. Ručnici su osigurani.',
          sq: 'Relaksohuni në zonën tonë të pishinës wellness nga {timeSlot}. Peshqirët ofrohen.'
        }
      },
      { 
        id: 'p2', 
        label: { 
          de: 'Finnische Sauna & Dampfbad', 
          en: 'Finnish Sauna & Steam Bath', 
          tr: 'Fin Saunası & Buhar Odası',
          it: 'Sauna finlandese e bagno turco',
          fr: 'Sauna finlandais et bain de vapeur',
          es: 'Sauna finlandesa y baño turco',
          sv: 'Finsk bastu & ångbad',
          no: 'Finsk badstue og dampbad',
          hr: 'Finska sauna i parna kupelj',
          sq: 'Sauna finlandeze & banja me avull'
        }, 
        text: {
          de: 'Saunabereich täglich von {timeSlot} geheizt. Voranmeldung an der Rezeption erbeten.',
          en: 'Sauna area heated daily from {timeSlot}. Advance notice at reception is appreciated.',
          tr: 'Sauna alanımız her gün {timeSlot} arası ısıtılmaktadır. Resepsiyona önceden bildirmenizi rica ederiz.',
          it: 'Area sauna riscaldata tutti i giorni dalle {timeSlot}. Si prega di avvisare la reception.',
          fr: 'Espace sauna chauffé tous les jours de {timeSlot}. Veuillez prévenir la réception à l\'avance.',
          es: 'Zona de sauna climatizada todos los días de {timeSlot}. Se agradece avisar en recepción.',
          sv: 'Bastuområdet uppvärmt dagligen från {timeSlot}. Vänligen meddela i receptionen i förväg.',
          no: 'Badstueområde oppvarmet daglig fra {timeSlot}. Vennligst gi beskjed i resepsjonen på forhånd.',
          hr: 'Sauna zagrijana svakodnevno od {timeSlot}. Molimo obavijestite recepciju unaprijed.',
          sq: 'Zona e saunës e ngrohur çdo ditë nga {timeSlot}. Ju lutemi njoftoni recepsionin paraprakisht.'
        }
      },
      { 
        id: 'p3', 
        label: { 
          de: 'Exklusive Ruhezeiten', 
          en: 'Exclusive Relaxation Hours', 
          tr: 'Özel Dinlenme Saatleri',
          it: 'Orari di relax esclusivo',
          fr: 'Heures de détente exclusives',
          es: 'Horas de relajación exclusiva',
          sv: 'Exklusiva avkopplingstider',
          no: 'Eksklusive avspenningstider',
          hr: 'Ekskluzivno vrijeme opuštanja',
          sq: 'Orari ekskluziv i relaksimit'
        }, 
        text: {
          de: 'Genießen Sie ungestörte Entspannung im Spa-Bereich von {timeSlot}.',
          en: 'Enjoy undisturbed relaxation in the spa area from {timeSlot}.',
          tr: 'Spa alanımızda {timeSlot} saatleri arasında kesintisiz dinlenmenin tadını çıkarın.',
          it: 'Goditi un relax indisturbato nell\'area spa dalle {timeSlot}.',
          fr: 'Profitez d\'une détente paisible dans l\'espace spa de {timeSlot}.',
          es: 'Disfrute de una relajación sin interrupciones en la zona de spa de {timeSlot}.',
          sv: 'Njut av ostörd avkoppling i spamiljön från {timeSlot}.',
          no: 'Nyt uforstyrret avspenning i spa-området fra {timeSlot}.',
          hr: 'Uživajte u neometanom opuštanju u wellness zoni od {timeSlot}.',
          sq: 'Shijoni relaksim pa u shqetësuar në zonën spa nga {timeSlot}.'
        }
      }
    ]
  },
  { 
    id: 'bike_rental', 
    group: 'Freizeit & Mobilität', 
    icon: 'Compass',
    title: { 
      de: 'Fahrradverleih & E-Bikes', 
      en: 'Bike Rental & E-Bikes', 
      tr: 'Bisiklet Kiralama & E-Bisiklet',
      it: 'Noleggio biciclette e E-bike',
      fr: 'Location de vélos et E-bikes',
      es: 'Alquiler de bicicletas y E-bikes',
      sv: 'Cykeluthyrning & Elcyklar',
      no: 'Sykkelutleie og Elsykler',
      hr: 'Najam bicikala i e-bicikala',
      sq: 'Qira e biçikletave & E-biçikletave'
    },
    presets: [
      { 
        id: 'p1', 
        label: { 
          de: 'Ganztags-Ausgabe', 
          en: 'Full-Day Rental Pickup', 
          tr: 'Tam Gün Bisiklet Teslimi',
          it: 'Ritiro noleggio intera giornata',
          fr: 'Retrait location journée complète',
          es: 'Recogida de alquiler de día completo',
          sv: 'Hela dagen uthyrning',
          no: 'Heldags utleie',
          hr: 'Cjelodnevni najam',
          sq: 'Marrja për gjithë ditën'
        }, 
        text: {
          de: 'Leihen Sie sich hochwertige E-Bikes für Tagestouren aus von {timeSlot}.',
          en: 'Rent high-quality e-bikes for day tours from {timeSlot}.',
          tr: 'Günlük turlarınız için {timeSlot} saatleri arasında kaliteli e-bisikletler kiralayabilirsiniz.',
          it: 'Noleggia e-bike di alta qualità per escursioni giornaliere dalle {timeSlot}.',
          fr: 'Louez des vélos électriques de haute qualité pour des excursions de {timeSlot}.',
          es: 'Alquile bicicletas eléctricas de alta calidad para excursiones de {timeSlot}.',
          sv: 'Hyr högkvalitativa elcyklar för dagsutflykter från {timeSlot}.',
          no: 'Leie elsykler av høy kvalitet for dagsturer fra {timeSlot}.',
          hr: 'Iznajmite visokokvalitetne e-bicikle za dnevne izlete od {timeSlot}.',
          sq: 'Merrni me qira e-biçikleta cilësore për udhëtime ditore nga {timeSlot}.'
        }
      },
      { 
        id: 'p2', 
        label: { 
          de: 'Nachmittags-Tour', 
          en: 'Afternoon Tour Pickup', 
          tr: 'Öğleden Sonra Turu',
          it: 'Tour pomeridiano',
          fr: 'Tour de l\'après-midi',
          es: 'Tour de tarde',
          sv: 'Eftermiddagstur',
          no: 'Ettermiddagstur',
          hr: 'Popodnevna tura',
          sq: 'Tur pasdite'
        }, 
        text: {
          de: 'Perfekt für die Abendstunden: Radverleih und Kartenmaterial von {timeSlot}.',
          en: 'Perfect for evening hours: bike rental and maps available from {timeSlot}.',
          tr: 'Akşam saatleri için ideal: {timeSlot} saatleri arasında bisiklet kiralama ve harita desteği.',
          it: 'Perfetto per le ore serali: noleggio bici e mappe disponibili dalle {timeSlot}.',
          fr: 'Parfait pour les soirées : location de vélos et cartes disponibles de {timeSlot}.',
          es: 'Perfecto para las horas de la tarde: alquiler de bicicletas y mapas de {timeSlot}.',
          sv: 'Perfekt för kvällstimmarna: cykeluthyrning och kartor från {timeSlot}.',
          no: 'Perfekt for kveldstimene: sykkelutleie og kart tilgjengelig fra {timeSlot}.',
          hr: 'Savršeno za večernje sate: najam bicikala i karte dostupni od {timeSlot}.',
          sq: 'Perfekt për orët e mbrëmjes: qira biçikletash dhe harta nga {timeSlot}.'
        }
      },
      { 
        id: 'p3', 
        label: { 
          de: 'Flexibler Service', 
          en: 'Flexible Service Hours', 
          tr: 'Esnek Servis Saatleri',
          it: 'Orari di servizio flessibili',
          fr: 'Heures de service flexibles',
          es: 'Horario de servicio flexible',
          sv: 'Flexibla servicetider',
          no: 'Fleksible servicetider',
          hr: 'Fleksibilno radno vrijeme',
          sq: 'Orar fleksibël shërbimi'
        }, 
        text: {
          de: 'Fahrrad-Service und Rückgabe flexibel geregelt zwischen {timeSlot}.',
          en: 'Bicycle service and return flexibly arranged between {timeSlot}.',
          tr: 'Bisiklet servisi ve iade işlemleri {timeSlot} arasında esnek bir şekilde düzenlenmektedir.',
          it: 'Servizio biciclette e restituzione flessibili tra le {timeSlot}.',
          fr: 'Service vélos et retour gérés de manière flexible entre {timeSlot}.',
          es: 'Servicio de bicicletas y devolución organizados de forma flexible entre {timeSlot}.',
          sv: 'Cykelservice och retur ordnas flexibelt mellan {timeSlot}.',
          no: 'Sykkelservice og retur ordnes fleksibelt mellom {timeSlot}.',
          hr: 'Servis bicikala i povrat fleksibilno uređeni između {timeSlot}.',
          sq: 'Shërbimi i biçikletave dhe kthimi i rregulluar në mënyrë fleksibël mes {timeSlot}.'
        }
      }
    ]
  }
];

export default function App() {
  const [lang, setLang] = useState('de');
  const t = translations[lang] || translations.de;

  const [appMode, setAppMode] = useState('guest'); 
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [copiedWifi, setCopiedWifi] = useState(false);

  const [hotel, setHotel] = useState(() => {
    const saved = localStorage.getItem('gm24_hotel');
    const defaultData = {
      name: 'Boutique Hotel & Suites',
      locationTitle: 'REGION / PFALZ',
      address: 'Musterstraße 1, 67434 Neustadt',
      phone: '+49 6321 12345',
      email: 'info@hotel.de',
      googleReviewUrl: 'https://g.page/r/example/review',
      wifiSsid: 'Guest_WiFi',
      wifiPass: 'welcome2026',
      breakfastTime: '07:30 - 10:30 Uhr',
      checkInOut: 'Check-in: ab 15:00 | Check-out: bis 11:00',
      parkingInfo: 'Kostenfreie Parkplätze am Haus.',
      showWifi: true,
      showParking: true,
      showBreakfast: true,
      showCheckInOut: true,
      themeColor: 'amber',
      logoUrl: '',
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80']
    };
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('gm24_categories');
    return saved ? JSON.parse(saved) : [
      { id: '1', catalogId: 'hotel_info', icon: 'Building', title: 'Hotelinformationen & Rezeption', selectedPresetId: 'p1', timeSlot: '07:00 - 22:00 Uhr', customText: '' },
      { id: '2', catalogId: 'restaurant_dining', icon: 'Utensils', title: 'Restaurant, Bar & Frühstück', selectedPresetId: 'p1', timeSlot: '18:00 - 21:30 Uhr', customText: '' }
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

  const handleAddCatalogItem = (catalogItem, preset) => {
    setCategories([...categories, {
      id: Date.now().toString(),
      catalogId: catalogItem.id,
      icon: catalogItem.icon,
      title: catalogItem.title[lang] || catalogItem.title.de,
      selectedPresetId: preset ? preset.id : 'custom',
      timeSlot: '07:00 - 22:00 Uhr',
      customText: ''
    }]);
    setIsCatalogModalOpen(false);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleUpdateCategory = (id, field, value) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
  };

  const copyWifiPassword = () => {
    navigator.clipboard.writeText(hotel.wifiPass);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2500);
  };

  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] font-sans text-slate-800 p-6 md:p-10 space-y-8 relative pb-28">
        {/* Katalog Seçim Modalı */}
        {isCatalogModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-extrabold text-base text-slate-900">{t.modalTitle}</h2>
                <button onClick={() => setIsCatalogModalOpen(false)} className="text-stone-400 font-bold p-1 cursor-pointer">✕</button>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-stone-500 font-medium">{t.presetOptionLabel}</p>
                {categoryCatalog.map((catItem) => (
                  <div key={catItem.id} className="p-4 bg-stone-50 rounded-2xl border space-y-3">
                    <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                      <Building className={`w-4 h-4 ${currentTheme.text}`} />
                      <span>{catItem.title[lang] || catItem.title.de}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pl-6">
                      {catItem.presets.map((preset) => (
                        <div key={preset.id} className="flex items-center justify-between bg-white p-2.5 rounded-xl border text-xs">
                          <span className="font-medium text-slate-700">{preset.label[lang] || preset.label.de}</span>
                          <button onClick={() => handleAddCatalogItem(catItem, preset)} className={`${currentTheme.bg} text-white px-3 py-1.5 rounded-lg font-bold text-[10px] cursor-pointer`}>
                            {t.addBtn}
                          </button>
                        </div>
                      ))}

                      {/* 4. Özel Seçenek (Custom - Çeviri dışı) */}
                      <div className="flex items-center justify-between bg-amber-50/50 p-2.5 rounded-xl border border-amber-200 text-xs">
                        <span className="font-bold text-amber-900">+ Eigener Text (Custom 4.)</span>
                        <button onClick={() => handleAddCatalogItem(catItem, null)} className="bg-amber-800 text-white px-3 py-1.5 rounded-lg font-bold text-[10px] cursor-pointer">
                          {t.addBtn}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto flex justify-between items-center pb-6 border-b border-stone-200">
          <span className="font-extrabold text-lg tracking-tight">gastemappe24 <span className={`${currentTheme.text} text-xs uppercase px-1.5 py-0.5 ${currentTheme.bgLight} rounded-md`}>PRO</span></span>
          <div className="flex items-center gap-3">
            <button onClick={handleSaveData} className="bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-800 cursor-pointer flex items-center gap-2 shadow">
              <Save className="w-4 h-4" /> {isSaved ? t.savedMsg : t.saveBtn}
            </button>
            <button onClick={() => { setAppMode('guest'); setShowWelcomeScreen(false); }} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
              {t.guestViewBtn}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-black text-slate-900">{t.adminTitle}</h1>

          {/* Kategoriler Yönetim Listesi */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className={`font-bold text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec6Title}</h3>
              <button onClick={() => setIsCatalogModalOpen(true)} className={`${currentTheme.bg} text-white px-4 py-2 rounded-xl text-xs font-bold shadow cursor-pointer flex items-center gap-1.5`}>
                <Plus className="w-4 h-4" /> {t.btnAddCategory}
              </button>
            </div>

            <div className="space-y-4">
              {categories.map((cat) => {
                const catalogItem = categoryCatalog.find(c => c.id === cat.catalogId) || categoryCatalog[0];
                const presets = catalogItem.presets;
                const isCustom = cat.selectedPresetId === 'custom';

                return (
                  <div key={cat.id} className="p-4 bg-stone-50 rounded-2xl border space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-bold text-xs text-slate-900">{cat.title}</span>
                      <button onClick={() => handleDeleteCategory(cat.id)} className="text-rose-600 bg-rose-50 p-1.5 rounded-lg hover:bg-rose-100 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-stone-500 uppercase mb-1">Şablon Seçimi</label>
                        <select 
                          value={cat.selectedPresetId} 
                          onChange={(e) => handleUpdateCategory(cat.id, 'selectedPresetId', e.target.value)}
                          className="w-full p-2 text-xs border rounded-xl bg-white font-medium cursor-pointer"
                        >
                          {presets.map(p => (
                            <option key={p.id} value={p.id}>{p.label[lang] || p.label.de}</option>
                          ))}
                          <option value="custom">★ Eigener Text (Custom 4.)</option>
                        </select>
                      </div>

                      {!isCustom ? (
                        <div>
                          <label className="block text-[9px] font-bold text-stone-500 uppercase mb-1">Saat Seçeneği (Dropdown)</label>
                          <select 
                            value={cat.timeSlot} 
                            onChange={(e) => handleUpdateCategory(cat.id, 'timeSlot', e.target.value)}
                            className="w-full p-2 text-xs border rounded-xl bg-white font-medium cursor-pointer"
                          >
                            <option value="07:00 - 22:00 Uhr">07:00 - 22:00 Uhr</option>
                            <option value="08:00 - 20:00 Uhr">08:00 - 20:00 Uhr</option>
                            <option value="18:00 - 21:30 Uhr">18:00 - 21:30 Uhr</option>
                            <option value="ganztägig (24h)">Ganztägig (24h)</option>
                          </select>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-[9px] font-bold text-amber-700 uppercase mb-1">Özel Metin Alanı</label>
                          <input 
                            type="text" 
                            placeholder="Örn: Özel açıklamalar..." 
                            value={cat.customText} 
                            onChange={(e) => handleUpdateCategory(cat.id, 'customText', e.target.value)}
                            className="w-full p-2 text-xs border border-amber-300 rounded-xl bg-white"
                          />
                          <span className="text-[9px] text-amber-600 block mt-0.5">{t.customNotTranslatedWarning}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Misafir Ekranı
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-32 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      <header className="p-5 pt-6 pb-2 bg-stone-50 sticky top-0 z-40 flex justify-between items-center">
        <span className="text-xs font-bold tracking-wider uppercase text-slate-800">{hotel.name}</span>
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
          <button onClick={() => setAppMode('dashboard')} className="text-stone-300 hover:text-stone-600 p-1 text-xs cursor-pointer">🔑</button>
        </div>
      </header>

      <main className="p-5 space-y-5">
        {selectedCategory ? (
          <div className="space-y-4">
            <button onClick={() => setSelectedCategory(null)} className={`text-xs font-bold ${currentTheme.text} cursor-pointer flex items-center gap-1`}>&larr; {t.detailBack}</button>
            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
              <h2 className="text-lg font-black text-slate-900">{selectedCategory.title}</h2>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedCategory.content}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.greetingHello}<br /><span className={currentTheme.text}>{t.greetingWelcome}</span></h1>
            
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">{t.navGaestemappe}</h3>
              <div className="space-y-2.5">
                {categories.map((cat) => {
                  const catalogItem = categoryCatalog.find(c => c.id === cat.catalogId) || categoryCatalog[0];
                  const isCustom = cat.selectedPresetId === 'custom';
                  
                  let content = '';
                  if (isCustom) {
                    content = cat.customText || 'Keine Angabe';
                  } else {
                    const preset = catalogItem.presets.find(p => p.id === cat.selectedPresetId) || catalogItem.presets[0];
                    const langDict = preset.text[lang] || preset.text.de;
                    content = langDict.replace('{timeSlot}', cat.timeSlot);
                  }

                  return (
                    <button key={cat.id} onClick={() => setSelectedCategory({ title: cat.title, content })} className={`w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between text-left cursor-pointer hover:${currentTheme.border} transition`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${currentTheme.bgLight} flex items-center justify-center ${currentTheme.text}`}>
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-extrabold text-slate-900">{cat.title}</h5>
                          <p className="text-xs text-slate-500 truncate max-w-[200px]">{content}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-stone-200/80 z-50 shadow-2xl">
        <nav className="px-3 py-2 flex justify-around items-center">
          <button onClick={() => { setActiveTab('home'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'home' && !selectedCategory ? currentTheme.text : 'text-stone-400'}`}>
            <Info className="w-5 h-5" /><span>{t.navHome}</span>
          </button>
          <a href={hotel.googleReviewUrl} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}>
            <Star className="w-5 h-5 fill-current" /><span>{t.navReview}</span>
          </a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}>
            <Navigation className="w-5 h-5" /><span>{t.navRoute}</span>
          </a>
        </nav>
      </div>
    </div>
  );
}