import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Wifi, Info, MapPin, Calendar, MessageSquare, 
  Settings, Phone, Plus, Trash2, 
  Check, Image as ImageIcon, Copy,
  ChevronRight, ArrowRight, Upload, AlertCircle, Lock, Unlock,
  Utensils, Heart, Compass, Coffee, Car, Clock, ShieldCheck, Edit3, Mail, Globe, ExternalLink, QrCode, Printer, BarChart3, Star, Navigation, Sun, LogOut, User,
  Wine, Sparkles, Tv, Waves, Dumbbell, Key, Bed, Building, ShoppingBag, Landmark, Map, Bus, Plane, Save, Eye, EyeOff, Palette, TrendingUp, Users, Activity
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

// Güvenli İkon Render Fonksiyonu (Beyaz Ekran / Crash Önleyici)
const renderCategoryIcon = (iconName, currentTheme) => {
  const className = `w-4 h-4 ${currentTheme.text}`;
  switch (iconName) {
    case 'Building': return <Building className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Waves': return <Waves className={className} />;
    case 'Compass': return <Compass className={className} />;
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
        {/* Katalog Seçim Modalı (z-[9999] ile en üst katman ve güvenli ikon render) */}
        {isCatalogModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-extrabold text-base text-slate-900">{t.modalTitle}</h2>
                <button onClick={() => setIsCatalogModalOpen(false)} className="text-stone-400 font-bold p-1 hover:text-stone-700 cursor-pointer">✕</button>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-stone-500 font-medium">{t.presetOptionLabel}</p>
                {categoryCatalog.map((catItem) => (
                  <div key={catItem.id} className="p-4 bg-stone-50 rounded-2xl border space-y-3">
                    <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                      {renderCategoryIcon(catItem.icon, currentTheme)}
                      <span>{catItem.title[lang] || catItem.title.de}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pl-2 sm:pl-6">
                      {catItem.presets.map((preset) => (
                        <div key={preset.id} className="flex items-center justify-between bg-white p-2.5 rounded-xl border text-xs gap-2">
                          <span className="font-medium text-slate-700">{preset.label[lang] || preset.label.de}</span>
                          <button onClick={() => handleAddCatalogItem(catItem, preset)} className={`${currentTheme.bg} text-white px-3 py-1.5 rounded-lg font-bold text-[10px] cursor-pointer whitespace-nowrap hover:opacity-90`}>
                            {t.addBtn}
                          </button>
                        </div>
                      ))}

                      {/* 4. Özel Seçenek (Custom - Çeviri dışı) */}
                      <div className="flex items-center justify-between bg-amber-50/50 p-2.5 rounded-xl border border-amber-200 text-xs gap-2">
                        <span className="font-bold text-amber-900">+ Eigener Text (Custom 4.)</span>
                        <button onClick={() => handleAddCatalogItem(catItem, null)} className="bg-amber-800 text-white px-3 py-1.5 rounded-lg font-bold text-[10px] cursor-pointer whitespace-nowrap hover:bg-amber-900">
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
                          {renderCategoryIcon(cat.icon, currentTheme)}
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