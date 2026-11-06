import React, { useState, useEffect } from 'react';
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

// --- 10 DİL ÇEVİRİ SİSTEMİ (EKSİKSİZ) ---
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
    qrTitle: "QR Code & Print Center",
    printA4: "Print Template A4",
    printA5: "Print Template A5",
    printCard: "Business Card",
    sec1Title: "1. Property Information & Contacts",
    sec2Title: "2. Design & Color Themes",
    sec3Title: "3. Upload Logo",
    sec4Title: "4. Image Management (Slider)",
    sec5Title: "5. QR Code & Print Center (Printing allowed)",
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
    adminTitle: "Yönetim Paneli & Analitik",
    guestViewBtn: "Misafir Görünümünü Aç",
    saveBtn: "Değişiklikleri Kaydet",
    savedMsg: "Kaydedildi!",
    trialTitle: "30 Günlük Deneme (PRO)",
    trialDaysLeft: "Gün kaldı",
    statsScans: "QR Kod Taramaları (Toplam)",
    statsActiveRooms: "Aktif Oda Erişimi",
    qrTitle: "QR Kod & Baskı Merkezi",
    printA4: "A4 Baskı Şablonu",
    printA5: "A5 Baskı Şablonu",
    printCard: "Kartvizit Şablonu",
    sec1Title: "1. Tesis Bilgileri & İletişim",
    sec2Title: "2. Renk Temaları",
    sec3Title: "3. Logo Yükleme",
    sec4Title: "4. Resim Yönetimi (Slider)",
    sec5Title: "5. QR Kod & Baskı Merkezi (Yazdırma Aktif)",
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
  fr: { welcomeBadge: "Guide", welcomeButton: "C'est parti", greetingHello: "Bonjour,", greetingWelcome: "bienvenue.", navHome: "Accueil", navGaestemappe: "Guide", navReview: "Avis", navRoute: "Itinéraire", weatherTitle: "Ensoleillé", weatherSub: "Météo", wlanTitle: "Wi-Fi", parkingTitle: "Parking", breakfastTitle: "Petit-déj", checkInOutTitle: "Arrivée/Départ", detailBack: "Retour", adminTitle: "Admin", guestViewBtn: "Vue invité", saveBtn: "Enregistrer", savedMsg: "Enregistré !", trialTitle: "Essai PRO", trialDaysLeft: "Jours restants", statsScans: "Scans QR", statsActiveRooms: "Chambres actives", qrTitle: "QR & Impression", printA4: "A4", printA5: "A5", printCard: "Carte", sec1Title: "1. Infos", sec2Title: "2. Couleurs", sec3Title: "3. Logo", sec4Title: "4. Images", sec5Title: "5. QR Center", sec6Title: "6. Préréglages", lblHotelName: "Nom", lblPhone: "Tél", btnAddCategory: "Ajouter", modalTitle: "Modifier", step1Title: "1. Catégorie", step2Title: "2. Modèle", step3Title: "3. Détails", addBtn: "Ajouter", editTitle: "Titre", customTextLabel: "Notes", yesLabel: "Oui", noLabel: "Non", moreInfo: "Plus", cancel: "Annuler", saveAndClose: "Fermer", searchPlaceholder: "Rechercher...", noPresetsFound: "Aucun." },
  hr: { welcomeBadge: "Vodič", welcomeButton: "Kreni", greetingHello: "Pozdrav,", greetingWelcome: "dobrodošli.", navHome: "Početna", navGaestemappe: "Vodič", navReview: "Ocijeni", navRoute: "Upute", weatherTitle: "Sunčano", weatherSub: "Vrijeme", wlanTitle: "Wi-Fi", parkingTitle: "Parking", breakfastTitle: "Doručak", checkInOutTitle: "Prijava", detailBack: "Natrag", adminTitle: "Admin", guestViewBtn: "Gosti", saveBtn: "Spremi", savedMsg: "Spremljeno!", trialTitle: "PRO probno", trialDaysLeft: "dana", statsScans: "QR skeniranja", statsActiveRooms: "Sobe", qrTitle: "QR centar", printA4: "A4", printA5: "A5", printCard: "Kartica", sec1Title: "1. Info", sec2Title: "2. Boje", sec3Title: "3. Logo", sec4Title: "4. Slike", sec5Title: "5. QR Center", sec6Title: "6. Predlošci", lblHotelName: "Naziv", lblPhone: "Tel", btnAddCategory: "Dodaj", modalTitle: "Uredi", step1Title: "1. Kategorija", step2Title: "2. Predložak", step3Title: "3. Detalji", addBtn: "Dodaj", editTitle: "Naslov", customTextLabel: "Bilješke", yesLabel: "Da", noLabel: "Ne", moreInfo: "Više", cancel: "Odustani", saveAndClose: "Zatvori", searchPlaceholder: "Traži...", noPresetsFound: "Nema." },
  it: { welcomeBadge: "Guida", welcomeButton: "Inizia", greetingHello: "Ciao,", greetingWelcome: "benvenuto.", navHome: "Home", navGaestemappe: "Guida", navReview: "Recensioni", navRoute: "Percorso", weatherTitle: "Sereno", weatherSub: "Meteo", wlanTitle: "Wi-Fi", parkingTitle: "Parcheggio", breakfastTitle: "Colazione", checkInOutTitle: "Check-in", detailBack: "Indietro", adminTitle: "Admin", guestViewBtn: "Vista", saveBtn: "Salva", savedMsg: "Salvato!", trialTitle: "PRO", trialDaysLeft: "giorni", statsScans: "Scansioni", statsActiveRooms: "Camere", qrTitle: "QR Center", printA4: "A4", printA5: "A5", printCard: "Card", sec1Title: "1. Info", sec2Title: "2. Colori", sec3Title: "3. Logo", sec4Title: "4. Immagini", sec5Title: "5. QR", sec6Title: "6. Preset", lblHotelName: "Nome", lblPhone: "Tel", btnAddCategory: "Aggiungi", modalTitle: "Modifica", step1Title: "1. Categoria", step2Title: "2. Modello", step3Title: "3. Dettagli", addBtn: "Aggiungi", editTitle: "Titolo", customTextLabel: "Note", yesLabel: "Sì", noLabel: "No", moreInfo: "Altro", cancel: "Annulla", saveAndClose: "Chiudi", searchPlaceholder: "Cerca...", noPresetsFound: "Nulla." },
  es: { welcomeBadge: "Guía", welcomeButton: "Empezar", greetingHello: "Hola,", greetingWelcome: "bienvenido.", navHome: "Inicio", navGaestemappe: "Guía", navReview: "Valorar", navRoute: "Ruta", weatherTitle: "Soleado", weatherSub: "Clima", wlanTitle: "Wi-Fi", parkingTitle: "Parking", breakfastTitle: "Desayuno", checkInOutTitle: "Entrada", detailBack: "Volver", adminTitle: "Admin", guestViewBtn: "Vista", saveBtn: "Guardar", savedMsg: "Guardado!", trialTitle: "PRO", trialDaysLeft: "días", statsScans: "Scans", statsActiveRooms: "Habitaciones", qrTitle: "QR Center", printA4: "A4", printA5: "A5", printCard: "Tarjeta", sec1Title: "1. Info", sec2Title: "2. Colores", sec3Title: "3. Logo", sec4Title: "4. Imágenes", sec5Title: "5. QR", sec6Title: "6. Plantillas", lblHotelName: "Nombre", lblPhone: "Tel", btnAddCategory: "Añadir", modalTitle: "Editar", step1Title: "1. Categoría", step2Title: "2. Plantilla", step3Title: "3. Detalles", addBtn: "Añadir", editTitle: "Título", customTextLabel: "Notas", yesLabel: "Sí", noLabel: "No", moreInfo: "Más", cancel: "Cancelar", saveAndClose: "Cerrar", searchPlaceholder: "Buscar...", noPresetsFound: "Nada." },
  sv: { welcomeBadge: "Guide", welcomeButton: "Starta", greetingHello: "Hej,", greetingWelcome: "välkommen.", navHome: "Hem", navGaestemappe: "Guide", navReview: "Recension", navRoute: "Väg", weatherTitle: "Sol", weatherSub: "Väder", wlanTitle: "Wi-Fi", parkingTitle: "Parkering", breakfastTitle: "Frukost", checkInOutTitle: "Incheckning", detailBack: "Tillbaka", adminTitle: "Admin", guestViewBtn: "Gästvy", saveBtn: "Spara", savedMsg: "Sparat!", trialTitle: "PRO", trialDaysLeft: "dagar", statsScans: "Scans", statsActiveRooms: "Rum", qrTitle: "QR Center", printA4: "A4", printA5: "A5", printCard: "Kort", sec1Title: "1. Info", sec2Title: "2. Färg", sec3Title: "3. Logo", sec4Title: "4. Bilder", sec5Title: "5. QR", sec6Title: "6. Mallar", lblHotelName: "Namn", lblPhone: "Tel", btnAddCategory: "Lägg till", modalTitle: "Redigera", step1Title: "1. Kategori", step2Title: "2. Mall", step3Title: "3. Detaljer", addBtn: "Lägg till", editTitle: "Titel", customTextLabel: "Anteckningar", yesLabel: "Ja", noLabel: "Nej", moreInfo: "Mer", cancel: "Avbryt", saveAndClose: "Stäng", searchPlaceholder: "Sök...", noPresetsFound: "Inga." },
  no: { welcomeBadge: "Guide", welcomeButton: "Start", greetingHello: "Hei,", greetingWelcome: "velkommen.", navHome: "Hjem", navGaestemappe: "Guide", navReview: "Omtale", navRoute: "Rute", weatherTitle: "Sol", weatherSub: "Vær", wlanTitle: "Wi-Fi", parkingTitle: "Parkering", breakfastTitle: "Frokost", checkInOutTitle: "Innsjekk", detailBack: "Tilbake", adminTitle: "Admin", guestViewBtn: "Visning", saveBtn: "Lagre", savedMsg: "Lagret!", trialTitle: "PRO", trialDaysLeft: "dager", statsScans: "Scans", statsActiveRooms: "Rom", qrTitle: "QR Center", printA4: "A4", printA5: "A5", printCard: "Kort", sec1Title: "1. Info", sec2Title: "2. Farge", sec3Title: "3. Logo", sec4Title: "4. Bilder", sec5Title: "5. QR", sec6Title: "6. Maler", lblHotelName: "Navn", lblPhone: "Tlf", btnAddCategory: "Legg til", modalTitle: "Rediger", step1Title: "1. Kategori", step2Title: "2. Mal", step3Title: "3. Detaljer", addBtn: "Legg til", editTitle: "Tittel", customTextLabel: "Notater", yesLabel: "Ja", noLabel: "Nei", moreInfo: "Mer", cancel: "Avbryt", saveAndClose: "Lukk", searchPlaceholder: "Søk...", noPresetsFound: "Ingen." },
  sq: { welcomeBadge: "Udhëzues", welcomeButton: "Fillo", greetingHello: "Përshëndetje,", greetingWelcome: "mirë se erdhët.", navHome: "Kryefaqja", navGaestemappe: "Udhëzuesi", navReview: "Vlerëso", navRoute: "Udha", weatherTitle: "Diell", weatherSub: "Moti", wlanTitle: "Wi-Fi", parkingTitle: "Parkimi", breakfastTitle: "Mëngjesi", checkInOutTitle: "Hyrja", detailBack: "Kthehu", adminTitle: "Admin", guestViewBtn: "Pamja", saveBtn: "Ruaj", savedMsg: "U ruajt!", trialTitle: "PRO", trialDaysLeft: "ditë", statsScans: "Scans", statsActiveRooms: "Dhomat", qrTitle: "QR Center", printA4: "A4", printA5: "A5", printCard: "Kartë", sec1Title: "1. Info", sec2Title: "2. Ngjyrat", sec3Title: "3. Logo", sec4Title: "4. Fotografitë", sec5Title: "5. QR Center", sec6Title: "6. Shabllonet", lblHotelName: "Emri", lblPhone: "Tel", btnAddCategory: "Shto", modalTitle: "Ndrysho", step1Title: "1. Kategoria", step2Title: "2. Shablloni", step3Title: "3. Detajet", addBtn: "Shto", editTitle: "Titulli", customTextLabel: "Shënime", yesLabel: "Po", noLabel: "Jo", moreInfo: "Më shumë", cancel: "Anulo", saveAndClose: "Mbyll", searchPlaceholder: "Kërko...", noPresetsFound: "Asgjë." }
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
  { id: 'cat_hotel', name: { de: 'Hotel & Unterkunft', en: 'Hotel & Accommodation', tr: 'Otel & Konaklama', fr: 'Hôtel & Hébergement', hr: 'Hotel i smještaj' }, icon: 'Building' },
  { id: 'cat_food', name: { de: 'Essen & Trinken', en: 'Food & Drinks', tr: 'Yeme & İçme', fr: 'Restauration', hr: 'Hrana i piće' }, icon: 'Utensils' },
  { id: 'cat_sustainability', name: { de: 'Nachhaltigkeit & Umwelt', en: 'Sustainability & Environment', tr: 'Sürdürülebilirlik & Çevre', fr: 'Développement durable', hr: 'Održivost i okoliš' }, icon: 'Recycle' },
  { id: 'cat_certificates', name: { de: 'Zertifikate & Auszeichnungen', en: 'Certificates & Awards', tr: 'Sertifikalar & Ödüller', fr: 'Certificats & Prix', hr: 'Certifikati i nagrade' }, icon: 'Award' },
  { id: 'cat_wellness', name: { de: 'Wellness & Spa', en: 'Wellness & Spa', tr: 'Wellness & Spa', fr: 'Bien-être & Spa', hr: 'Wellness i spa' }, icon: 'Waves' },
  { id: 'cat_leisure', name: { de: 'Freizeit & Aktivitäten', en: 'Leisure & Activities', tr: 'Eğlence & Aktiviteler', fr: 'Loisirs & Activités', hr: 'Slobodno vrijeme' }, icon: 'Compass' },
  { id: 'cat_mobility', name: { de: 'Anreise & Mobilität', en: 'Arrival & Mobility', tr: 'Ulaşım & Mobilite', fr: 'Arrivée & Mobilité', hr: 'Dolazak i mobilnost' }, icon: 'Car' },
  { id: 'cat_service', name: { de: 'Service & Informationen', en: 'Service & Information', tr: 'Servis & Bilgiler', fr: 'Service & Informations', hr: 'Usluge i informacije' }, icon: 'Phone' },
  { id: 'cat_safety', name: { de: 'Regeln & Sicherheit', en: 'Rules & Safety', tr: 'Kurallar & Güvenlik', fr: 'Règles & Sécurité', hr: 'Pravila i sigurnost' }, icon: 'ShieldCheck' }
];

const categoryPresets = [
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
  { id: 'baby_kids_equip', categoryId: 'cat_hotel', icon: 'Baby', title: { de: 'Baby- & Kleinkindausstattung', en: 'Baby & Toddler Equipment', tr: 'Bebek & Çocuk Ekipmanı', fr: 'Équipement bébé', hr: 'Oprema za bebe' }, schema: [
    { key: 'baby_cot', type: 'boolean', label: { de: 'Babybett verfügbar', en: 'Baby Cot Available', tr: 'Bebek Yatağı Mevcut', fr: 'Lit bébé disponible', hr: 'Dječji krevetić' }, default: true, primary: true },
    { key: 'high_chair', type: 'boolean', label: { de: 'Hochstuhl', en: 'High Chair', tr: 'Mama Sandalyesi', fr: 'Chaise haute', hr: 'Hranilica za bebe' }, default: true, primary: true }
  ]},
  { id: 'wifi_internet', categoryId: 'cat_hotel', icon: 'Wifi', title: { de: 'WLAN & Internet', en: 'WiFi & Internet', tr: 'WLAN & İnternet', fr: 'Wi-Fi & Internet', hr: 'Wi-Fi i internet' }, schema: [
    { key: 'wifi_available', type: 'boolean', label: { de: 'WLAN verfügbar', en: 'WiFi Available', tr: 'WLAN Mevcut', fr: 'Wi-Fi disponible', hr: 'Wi-Fi dostupan' }, default: true, primary: true },
    { key: 'network_name', type: 'text', label: { de: 'Netzwerkname (SSID)', en: 'Network Name (SSID)', tr: 'Ağ Adı (SSID)', fr: 'Nom du réseau (SSID)', hr: 'Naziv mreže (SSID)' }, default: 'Hotel-Guest-WiFi', primary: true },
    { key: 'wifi_password', type: 'text', label: { de: 'Passwort', en: 'Password', tr: 'Şifre', fr: 'Mot de passe', hr: 'Lozinka' }, default: 'welcome2026', primary: true }
  ]},
  { id: 'sustainability_concept', categoryId: 'cat_sustainability', icon: 'Recycle', title: { de: 'Nachhaltigkeitskonzept', en: 'Sustainability Concept', tr: 'Sürdürülebilirlik Konsepti', fr: 'Concept de durabilité', hr: 'Koncepcija održivosti' }, schema: [
    { key: 'concept_description', type: 'text', label: { de: 'Kurzbeschreibung', en: 'Short Description', tr: 'Kısa Açıklama', fr: 'Brève description', hr: 'Kratak opis' }, default: 'Wir setzen auf 100% Ökostrom und vermeiden Einwegplastik.', primary: true }
  ]},
  { id: 'cert_sustainability', categoryId: 'cat_certificates', icon: 'Award', title: { de: 'Nachhaltigkeitszertifikate', en: 'Sustainability Certificates', tr: 'Sürdürülebilirlik Sertifikaları', fr: 'Certificats de durabilité', hr: 'Certifikati održivosti' }, schema: [
    { key: 'cert_name', type: 'text', label: { de: 'Zertifikat Name', en: 'Certificate Name', tr: 'Sertifika Adı', fr: 'Nom du certificat', hr: 'Naziv certifikata' }, default: 'Green Sign / Green Key', primary: true },
    { key: 'cert_number', type: 'text', label: { de: 'Zertifikatsnummer', en: 'Certificate Number', tr: 'Sertifika No', fr: 'Numéro de certificat', hr: 'Broj certifikata' }, default: 'GK-2026-9876', primary: false }
  ]},
  { id: 'breakfast', categoryId: 'cat_food', icon: 'Coffee', title: { de: 'Frühstück', en: 'Breakfast', tr: 'Kahvaltı', fr: 'Petit-déjeuner', hr: 'Doručak' }, schema: [
    { key: 'breakfast_hours', type: 'text', label: { de: 'Frühstückszeiten', en: 'Breakfast Hours', tr: 'Kahvaltı Saatleri', fr: 'Horaires du petit-déjeuner', hr: 'Vrijeme doručka' }, default: '07:00 - 10:30 Uhr', primary: true },
    { key: 'breakfast_type', type: 'select', label: { de: 'Frühstücksart', en: 'Breakfast Type', tr: 'Kahvaltı Türü', fr: 'Type de petit-déjeuner', hr: 'Vrsta doručka' }, options: ['Reichhaltiges Buffet', 'Kontinental', 'À la carte'], default: 'Reichhaltiges Buffet', primary: true }
  ]}
];


  // Additional information-only presets
  { id: 'hotel_facilities', categoryId: 'cat_hotel', icon: 'Building', title: { de: 'Hotelausstattung', en: 'Hotel Facilities', tr: 'Otel Olanakları', fr: 'Équipements de l’hôtel', hr: 'Hotelski sadržaji' }, schema: [
    { key: 'facility_list', type: 'text', label: { de: 'Einrichtungen', en: 'Facilities', tr: 'Olanaklar', fr: 'Équipements', hr: 'Sadržaji' }, default: '', primary: true },
    { key: 'facility_location', type: 'text', label: { de: 'Standort', en: 'Location', tr: 'Konum', fr: 'Emplacement', hr: 'Lokacija' }, default: '', primary: true },
    { key: 'facility_hours', type: 'text', label: { de: 'Öffnungszeiten', en: 'Opening hours', tr: 'Çalışma saatleri', fr: 'Horaires', hr: 'Radno vrijeme' }, default: '', primary: true }
  ]},
  { id: 'checkin_checkout', categoryId: 'cat_hotel', icon: 'Clock', title: { de: 'Check-in & Check-out', en: 'Check-in & Check-out', tr: 'Giriş & Çıkış', fr: 'Arrivée & départ', hr: 'Prijava i odjava' }, schema: [
    { key: 'checkin_time', type: 'text', label: { de: 'Check-in ab', en: 'Check-in from', tr: 'Giriş saati', fr: 'Arrivée à partir de', hr: 'Prijava od' }, default: '15:00', primary: true },
    { key: 'checkout_time', type: 'text', label: { de: 'Check-out bis', en: 'Check-out until', tr: 'Çıkış saati', fr: 'Départ avant', hr: 'Odjava do' }, default: '11:00', primary: true },
    { key: 'checkin_details', type: 'text', label: { de: 'Weitere Informationen', en: 'Additional information', tr: 'Ek bilgiler', fr: 'Informations complémentaires', hr: 'Dodatne informacije' }, default: '', primary: false }
  ]},
  { id: 'restaurant_info', categoryId: 'cat_food', icon: 'Utensils', title: { de: 'Restaurant', en: 'Restaurant', tr: 'Restoran', fr: 'Restaurant', hr: 'Restoran' }, schema: [
    { key: 'restaurant_hours', type: 'text', label: { de: 'Öffnungszeiten', en: 'Opening hours', tr: 'Çalışma saatleri', fr: 'Horaires', hr: 'Radno vrijeme' }, default: '', primary: true },
    { key: 'restaurant_location', type: 'text', label: { de: 'Standort', en: 'Location', tr: 'Konum', fr: 'Emplacement', hr: 'Lokacija' }, default: '', primary: true },
    { key: 'restaurant_description', type: 'text', label: { de: 'Beschreibung', en: 'Description', tr: 'Açıklama', fr: 'Description', hr: 'Opis' }, default: '', primary: false },
    { key: 'restaurant_menu_url', type: 'text', label: { de: 'Speisekarte (Link)', en: 'Menu link', tr: 'Menü bağlantısı', fr: 'Lien du menu', hr: 'Poveznica jelovnika' }, default: '', primary: false }
  ]},
  { id: 'bar_lounge', categoryId: 'cat_food', icon: 'Wine', title: { de: 'Bar & Lounge', en: 'Bar & Lounge', tr: 'Bar & Lounge', fr: 'Bar & Lounge', hr: 'Bar i salon' }, schema: [
    { key: 'bar_hours', type: 'text', label: { de: 'Öffnungszeiten', en: 'Opening hours', tr: 'Çalışma saatleri', fr: 'Horaires', hr: 'Radno vrijeme' }, default: '', primary: true },
    { key: 'bar_location', type: 'text', label: { de: 'Standort', en: 'Location', tr: 'Konum', fr: 'Emplacement', hr: 'Lokacija' }, default: '', primary: true },
    { key: 'bar_description', type: 'text', label: { de: 'Informationen', en: 'Information', tr: 'Bilgiler', fr: 'Informations', hr: 'Informacije' }, default: '', primary: false }
  ]},
  { id: 'allergens_diet', categoryId: 'cat_food', icon: 'Heart', title: { de: 'Allergene & Ernährung', en: 'Allergens & Dietary Information', tr: 'Alerjenler & Beslenme', fr: 'Allergènes & régime alimentaire', hr: 'Alergeni i prehrana' }, schema: [
    { key: 'dietary_options', type: 'text', label: { de: 'Ernährungsoptionen', en: 'Dietary options', tr: 'Beslenme seçenekleri', fr: 'Options alimentaires', hr: 'Prehrambene opcije' }, default: '', primary: true },
    { key: 'allergen_notes', type: 'text', label: { de: 'Allergenhinweise', en: 'Allergen notes', tr: 'Alerjen notları', fr: 'Notes sur les allergènes', hr: 'Napomene o alergenima' }, default: '', primary: true }
  ]},
  { id: 'pool_aqua', categoryId: 'cat_wellness', icon: 'Waves', title: { de: 'Pool & Aqua', en: 'Pool & Aqua', tr: 'Havuz & Aqua', fr: 'Piscine & Aqua', hr: 'Bazen i aqua' }, schema: [
    { key: 'pool_hours', type: 'text', label: { de: 'Öffnungszeiten', en: 'Opening hours', tr: 'Çalışma saatleri', fr: 'Horaires', hr: 'Radno vrijeme' }, default: '', primary: true },
    { key: 'pool_location', type: 'text', label: { de: 'Standort', en: 'Location', tr: 'Konum', fr: 'Emplacement', hr: 'Lokacija' }, default: '', primary: true },
    { key: 'pool_rules', type: 'text', label: { de: 'Poolregeln', en: 'Pool rules', tr: 'Havuz kuralları', fr: 'Règles de la piscine', hr: 'Pravila bazena' }, default: '', primary: false }
  ]},
  { id: 'sauna', categoryId: 'cat_wellness', icon: 'Flame', title: { de: 'Sauna', en: 'Sauna', tr: 'Sauna', fr: 'Sauna', hr: 'Sauna' }, schema: [
    { key: 'sauna_hours', type: 'text', label: { de: 'Öffnungszeiten', en: 'Opening hours', tr: 'Çalışma saatleri', fr: 'Horaires', hr: 'Radno vrijeme' }, default: '', primary: true },
    { key: 'sauna_types', type: 'text', label: { de: 'Saunatypen', en: 'Sauna types', tr: 'Sauna türleri', fr: 'Types de sauna', hr: 'Vrste sauna' }, default: '', primary: true },
    { key: 'sauna_rules', type: 'text', label: { de: 'Saunaregeln', en: 'Sauna rules', tr: 'Sauna kuralları', fr: 'Règles du sauna', hr: 'Pravila saune' }, default: '', primary: false }
  ]},
  { id: 'fitness_center', categoryId: 'cat_wellness', icon: 'Dumbbell', title: { de: 'Fitness Center', en: 'Fitness Center', tr: 'Fitness Merkezi', fr: 'Salle de fitness', hr: 'Fitness centar' }, schema: [
    { key: 'fitness_hours', type: 'text', label: { de: 'Öffnungszeiten', en: 'Opening hours', tr: 'Çalışma saatleri', fr: 'Horaires', hr: 'Radno vrijeme' }, default: '24/7', primary: true },
    { key: 'fitness_location', type: 'text', label: { de: 'Standort', en: 'Location', tr: 'Konum', fr: 'Emplacement', hr: 'Lokacija' }, default: '', primary: true },
    { key: 'fitness_equipment', type: 'text', label: { de: 'Ausstattung', en: 'Equipment', tr: 'Ekipmanlar', fr: 'Équipement', hr: 'Oprema' }, default: '', primary: false }
  ]},
  { id: 'bike_info', categoryId: 'cat_leisure', icon: 'Compass', title: { de: 'Fahrradverleih – Informationen', en: 'Bike Rental Information', tr: 'Bisiklet Kiralama Bilgileri', fr: 'Informations location de vélos', hr: 'Informacije o najmu bicikala' }, schema: [
    { key: 'bike_types', type: 'text', label: { de: 'Fahrradtypen', en: 'Bike types', tr: 'Bisiklet türleri', fr: 'Types de vélos', hr: 'Vrste bicikala' }, default: '', primary: true },
    { key: 'bike_location', type: 'text', label: { de: 'Standort', en: 'Location', tr: 'Konum', fr: 'Emplacement', hr: 'Lokacija' }, default: '', primary: true },
    { key: 'bike_prices', type: 'text', label: { de: 'Preisübersicht', en: 'Price information', tr: 'Fiyat bilgisi', fr: 'Tarifs', hr: 'Cjenik' }, default: '', primary: false }
  ]},
  { id: 'events_info', categoryId: 'cat_leisure', icon: 'Calendar', title: { de: 'Events & Veranstaltungen', en: 'Events & Activities', tr: 'Etkinlikler', fr: 'Événements', hr: 'Događaji' }, schema: [
    { key: 'event_program', type: 'text', label: { de: 'Programm', en: 'Programme', tr: 'Program', fr: 'Programme', hr: 'Program' }, default: '', primary: true },
    { key: 'event_location', type: 'text', label: { de: 'Veranstaltungsort', en: 'Venue', tr: 'Etkinlik yeri', fr: 'Lieu', hr: 'Mjesto održavanja' }, default: '', primary: true },
    { key: 'event_url', type: 'text', label: { de: 'Weitere Informationen (Link)', en: 'More information (link)', tr: 'Daha fazla bilgi (link)', fr: 'Plus d’informations (lien)', hr: 'Više informacija (poveznica)' }, default: '', primary: false }
  ]},
  { id: 'sightseeing', categoryId: 'cat_leisure', icon: 'MapPin', title: { de: 'Sehenswürdigkeiten', en: 'Sightseeing', tr: 'Gezilecek Yerler', fr: 'Sites touristiques', hr: 'Znamenitosti' }, schema: [
    { key: 'sight_name', type: 'text', label: { de: 'Name', en: 'Name', tr: 'Adı', fr: 'Nom', hr: 'Naziv' }, default: '', primary: true },
    { key: 'sight_distance', type: 'text', label: { de: 'Entfernung', en: 'Distance', tr: 'Mesafe', fr: 'Distance', hr: 'Udaljenost' }, default: '', primary: true },
    { key: 'sight_description', type: 'text', label: { de: 'Beschreibung', en: 'Description', tr: 'Açıklama', fr: 'Description', hr: 'Opis' }, default: '', primary: false }
  ]},
  { id: 'parking_info', categoryId: 'cat_mobility', icon: 'Car', title: { de: 'Parkmöglichkeiten', en: 'Parking', tr: 'Otopark', fr: 'Stationnement', hr: 'Parkiranje' }, schema: [
    { key: 'parking_type', type: 'text', label: { de: 'Parkplatztyp', en: 'Parking type', tr: 'Otopark türü', fr: 'Type de stationnement', hr: 'Vrsta parkirališta' }, default: '', primary: true },
    { key: 'parking_location', type: 'text', label: { de: 'Standort', en: 'Location', tr: 'Konum', fr: 'Emplacement', hr: 'Lokacija' }, default: '', primary: true },
    { key: 'parking_price', type: 'text', label: { de: 'Preis', en: 'Price', tr: 'Ücret', fr: 'Prix', hr: 'Cijena' }, default: '', primary: false }
  ]},
  { id: 'public_transport', categoryId: 'cat_mobility', icon: 'Bus', title: { de: 'Öffentliche Verkehrsmittel', en: 'Public Transport', tr: 'Toplu Taşıma', fr: 'Transports en commun', hr: 'Javni prijevoz' }, schema: [
    { key: 'transport_stops', type: 'text', label: { de: 'Haltestellen', en: 'Stops', tr: 'Duraklar', fr: 'Arrêts', hr: 'Stanice' }, default: '', primary: true },
    { key: 'transport_link', type: 'text', label: { de: 'Fahrpläne (Link)', en: 'Timetables (link)', tr: 'Sefer saatleri (link)', fr: 'Horaires (lien)', hr: 'Vozni red (poveznica)' }, default: '', primary: true }
  ]},
  { id: 'accessibility_info', categoryId: 'cat_safety', icon: 'Accessibility', title: { de: 'Barrierefreiheit', en: 'Accessibility', tr: 'Erişilebilirlik', fr: 'Accessibilité', hr: 'Pristupačnost' }, schema: [
    { key: 'step_free_entrance', type: 'boolean', label: { de: 'Stufenloser Eingang', en: 'Step-free entrance', tr: 'Basamaksız giriş', fr: 'Entrée sans marches', hr: 'Ulaz bez stepenica' }, default: false, primary: true },
    { key: 'accessible_rooms', type: 'boolean', label: { de: 'Barrierefreie Zimmer', en: 'Accessible rooms', tr: 'Erişilebilir odalar', fr: 'Chambres accessibles', hr: 'Pristupačne sobe' }, default: false, primary: true },
    { key: 'accessible_bathroom', type: 'boolean', label: { de: 'Barrierefreies Bad', en: 'Accessible bathroom', tr: 'Erişilebilir banyo', fr: 'Salle de bain accessible', hr: 'Pristupačna kupaonica' }, default: false, primary: true },
    { key: 'accessible_parking', type: 'boolean', label: { de: 'Behindertenparkplätze', en: 'Accessible parking', tr: 'Engelli otoparkı', fr: 'Stationnement accessible', hr: 'Pristupačno parkiralište' }, default: false, primary: false },
    { key: 'accessibility_details', type: 'text', label: { de: 'Weitere Hinweise', en: 'Additional details', tr: 'Ek bilgiler', fr: 'Détails supplémentaires', hr: 'Dodatne napomene' }, default: '', primary: false }
  ]},
  { id: 'cert_accessibility', categoryId: 'cat_certificates', icon: 'Award', title: { de: 'Zertifizierte Barrierefreiheit', en: 'Accessibility Certification', tr: 'Erişilebilirlik Sertifikası', fr: 'Certification accessibilité', hr: 'Certifikat pristupačnosti' }, schema: [
    { key: 'access_cert_name', type: 'text', label: { de: 'Zertifikat', en: 'Certificate', tr: 'Sertifika', fr: 'Certificat', hr: 'Certifikat' }, default: '', primary: true },
    { key: 'access_cert_issuer', type: 'text', label: { de: 'Ausstellende Organisation', en: 'Issuing organization', tr: 'Veren kuruluş', fr: 'Organisme émetteur', hr: 'Izdavatelj' }, default: '', primary: true },
    { key: 'access_cert_validity', type: 'text', label: { de: 'Gültigkeit', en: 'Validity', tr: 'Geçerlilik', fr: 'Validité', hr: 'Valjanost' }, default: '', primary: false }
  ]},
  { id: 'cert_quality', categoryId: 'cat_certificates', icon: 'Award', title: { de: 'Qualitätsauszeichnungen', en: 'Quality Awards', tr: 'Kalite Ödülleri', fr: 'Distinctions qualité', hr: 'Nagrade za kvalitetu' }, schema: [
    { key: 'quality_award_name', type: 'text', label: { de: 'Auszeichnung', en: 'Award', tr: 'Ödül', fr: 'Distinction', hr: 'Nagrada' }, default: '', primary: true },
    { key: 'quality_award_org', type: 'text', label: { de: 'Verliehen von', en: 'Awarded by', tr: 'Veren kurum', fr: 'Décerné par', hr: 'Dodijelio' }, default: '', primary: true },
    { key: 'quality_award_year', type: 'text', label: { de: 'Jahr', en: 'Year', tr: 'Yıl', fr: 'Année', hr: 'Godina' }, default: '', primary: false }
  ]},
  { id: 'eco_measures', categoryId: 'cat_sustainability', icon: 'Recycle', title: { de: 'Nachhaltige Maßnahmen', en: 'Sustainability Measures', tr: 'Sürdürülebilirlik Uygulamaları', fr: 'Mesures durables', hr: 'Mjere održivosti' }, schema: [
    { key: 'energy_measures', type: 'text', label: { de: 'Energie & Strom', en: 'Energy', tr: 'Enerji', fr: 'Énergie', hr: 'Energija' }, default: '', primary: true },
    { key: 'water_measures', type: 'text', label: { de: 'Wassersparen', en: 'Water saving', tr: 'Su tasarrufu', fr: 'Économie d’eau', hr: 'Ušteda vode' }, default: '', primary: true },
    { key: 'waste_measures', type: 'text', label: { de: 'Abfall & Recycling', en: 'Waste & recycling', tr: 'Atık & geri dönüşüm', fr: 'Déchets & recyclage', hr: 'Otpad i recikliranje' }, default: '', primary: false }
  ]},
  { id: 'house_rules', categoryId: 'cat_safety', icon: 'ShieldCheck', title: { de: 'Hausordnung', en: 'House Rules', tr: 'Otel Kuralları', fr: 'Règlement intérieur', hr: 'Kućni red' }, schema: [
    { key: 'quiet_hours', type: 'text', label: { de: 'Ruhezeiten', en: 'Quiet hours', tr: 'Sessizlik saatleri', fr: 'Heures de calme', hr: 'Vrijeme tišine' }, default: '22:00–07:00', primary: true },
    { key: 'house_rules_text', type: 'text', label: { de: 'Regeln', en: 'Rules', tr: 'Kurallar', fr: 'Règles', hr: 'Pravila' }, default: '', primary: true }
  ]},
  { id: 'pets_policy', categoryId: 'cat_safety', icon: 'Heart', title: { de: 'Haustiere', en: 'Pets', tr: 'Evcil Hayvanlar', fr: 'Animaux domestiques', hr: 'Kućni ljubimci' }, schema: [
    { key: 'pets_allowed', type: 'boolean', label: { de: 'Haustiere erlaubt', en: 'Pets allowed', tr: 'Evcil hayvan kabul edilir', fr: 'Animaux acceptés', hr: 'Kućni ljubimci dozvoljeni' }, default: false, primary: true },
    { key: 'pet_rules', type: 'text', label: { de: 'Hinweise', en: 'Information', tr: 'Bilgiler', fr: 'Informations', hr: 'Informacije' }, default: '', primary: true }
  ]},
  { id: 'smoking_policy', categoryId: 'cat_safety', icon: 'Info', title: { de: 'Raucherregelungen', en: 'Smoking Policy', tr: 'Sigara Kuralları', fr: 'Politique tabac', hr: 'Pravila pušenja' }, schema: [
    { key: 'smoking_areas', type: 'text', label: { de: 'Raucherbereiche', en: 'Smoking areas', tr: 'Sigara alanları', fr: 'Zones fumeurs', hr: 'Prostori za pušenje' }, default: '', primary: true },
    { key: 'smoking_rules', type: 'text', label: { de: 'Regelungen', en: 'Rules', tr: 'Kurallar', fr: 'Règles', hr: 'Pravila' }, default: '', primary: true }
  ]}
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
    case 'Accessibility': return <Accessibility className={className} />;
    case 'Dumbbell': return <Dumbbell className={className} />;
    case 'Wine': return <Wine className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    case 'Bus': return <Bus className={className} />;
    case 'Baby': return <Baby className={className} />;
    default: return <Info className={className} />;
  }
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
        initialVals[f.key] = f.default;
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

  const availablePresets = categoryPresets.filter(p => p.categoryId === selectedMainCat)
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {mainCategories.map(mainCat => {
                const name = mainCat.name[lang] || mainCat.name.de;
                return (
                  <button
                    key={mainCat.id}
                    onClick={() => handleSelectCategory(mainCat.id)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition flex items-center gap-2.5 cursor-pointer bg-white hover:${currentTheme.border} hover:shadow-md group min-w-0`}
                  >
                    <div className={`p-2 rounded-lg ${currentTheme.bgLight} group-hover:scale-105 transition shrink-0`}>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2.5 bg-stone-50/60 p-3 sm:p-4 rounded-2xl border border-stone-200/80">
                {primaryFields.map(field => {
                  const val = fieldValues[field.key] !== undefined ? fieldValues[field.key] : field.default;
                  const label = field.label[lang] || field.label.de;

                  if (field.type === 'boolean') {
                    return (
                      <div key={field.key} className="flex items-center justify-between py-1">
                        <span className="text-xs font-bold text-slate-800">{label}</span>
                        <input
                          type="checkbox"
                          checked={!!val}
                          onChange={(e) => handleFieldValueChange(field.key, e.target.checked)}
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
                          onChange={(e) => handleFieldValueChange(field.key, e.target.value)}
                          className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white font-medium cursor-pointer"
                        >
                          {field.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  return (
                    <div key={field.key} className={`space-y-1 ${field.type === 'textarea' ? 'sm:col-span-2' : ''}`}>
                      <label className="block text-[10px] font-extrabold text-stone-500 uppercase">{label}</label>
                      {field.type === 'textarea' ? (
                        <textarea rows={3} value={val !== undefined ? val : ''} onChange={(e) => handleFieldValueChange(field.key, e.target.value)} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white font-medium resize-y" />
                      ) : (
                        <input type={field.type === 'number' ? 'number' : 'text'} value={val !== undefined ? val : ''} onChange={(e) => handleFieldValueChange(field.key, e.target.value)} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white font-medium" />
                      )}
                    </div>
                  );
                })}
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
                    <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2.5 bg-white border-t border-stone-200">
                      {secondaryFields.map(field => {
                        const val = fieldValues[field.key] !== undefined ? fieldValues[field.key] : field.default;
                        const label = field.label[lang] || field.label.de;

                        return (
                          <div key={field.key} className="space-y-1">
                            <label className="block text-[10px] font-extrabold text-stone-500 uppercase">{label}</label>
                            {field.type === 'textarea' ? (
                              <textarea rows={3} value={val !== undefined ? val : ''} onChange={(e) => handleFieldValueChange(field.key, e.target.value)} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white font-medium resize-y" />
                            ) : (
                              <input type={field.type === 'number' ? 'number' : 'text'} value={val !== undefined ? val : ''} onChange={(e) => handleFieldValueChange(field.key, e.target.value)} className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white font-medium" />
                            )}
                          </div>
                        );
                      })}
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
    const mainCatObj = mainCategories.find(mc => mc.id === cat.categoryId) || mainCategories[0];
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
            <option value="hr">🇭🇷 HR</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="it">🇮🇹 IT</option>
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
            <option value="hr">🇭🇷 HR</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="it">🇮🇹 IT</option>
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