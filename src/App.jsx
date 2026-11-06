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
    sec1Title: "1. Unterkunft Informationen & Kontaktdaten",
    sec6Title: "6. Dynamisches Kategorie & Preset-System",
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
    customTextWarning: "⚠️ Dieser Text wird unverändert für alle Sprachen verwendet.",
    yesLabel: "Ja / Verfügbar",
    noLabel: "Nein / Nicht verfügbar",
    createCustomCatBtn: "Benutzerdefinierte Kategorie",
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
    sec1Title: "1. Property Information & Contacts",
    sec6Title: "6. Dynamic Category & Preset System",
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
    customTextWarning: "⚠️ This text will be kept as-is across all languages.",
    yesLabel: "Yes / Available",
    noLabel: "No / Not Available",
    createCustomCatBtn: "Custom Category",
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
    sec1Title: "1. Tesis Bilgileri & İletişim",
    sec6Title: "6. Dinamik Kategori & Preset Sistemi",
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
    customTextWarning: "⚠️ Bu metin tüm dillerde aynı kalacaktır.",
    yesLabel: "Evet / Mevcut",
    noLabel: "Hayır / Mevcut Değil",
    createCustomCatBtn: "Özel Kategori",
    moreInfo: "Ek Bilgiler & İsteğe Bağlı Alanlar",
    cancel: "İptal",
    saveAndClose: "Kaydet ve Kapat",
    searchPlaceholder: "Ara...",
    noPresetsFound: "Bu kategoride şablon bulunamadı."
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
    detailBack: "Retour",
    adminTitle: "Administration",
    guestViewBtn: "Vue invité",
    saveBtn: "Enregistrer",
    savedMsg: "Enregistré !",
    sec1Title: "1. Infos et contacts",
    sec6Title: "6. Système de Préréglage",
    lblHotelName: "Nom de l'établissement",
    lblPhone: "Téléphone",
    btnAddCategory: "Ajouter du contenu (Éditeur en 3 étapes)",
    modalTitle: "Ajouter / Modifier le contenu",
    step1Title: "Étape 1: Sélectionner la catégorie",
    step2Title: "Étape 2: Sélectionner le modèle",
    step3Title: "Étape 3: Saisir les détails",
    addBtn: "Ajouter",
    editTitle: "Titre / Libellé",
    customTextLabel: "Remarques (optionnel)",
    customTextWarning: "⚠️ Ce texte reste identique dans toutes les langues.",
    yesLabel: "Oui / Disponible",
    noLabel: "Non / Indisponible",
    createCustomCatBtn: "Catégorie personnalisée",
    moreInfo: "Informations supplémentaires",
    cancel: "Annuler",
    saveAndClose: "Enregistrer & Fermer",
    searchPlaceholder: "Rechercher...",
    noPresetsFound: "Aucun modèle trouvé dans cette catégorie."
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
    detailBack: "Natrag",
    adminTitle: "Upravljanje",
    guestViewBtn: "Prikaz za goste",
    saveBtn: "Spremi",
    savedMsg: "Spremljeno!",
    sec1Title: "1. Info o objektu",
    sec6Title: "6. Sustav predložaka",
    lblHotelName: "Naziv objekta",
    lblPhone: "Telefon",
    btnAddCategory: "Dodaj sadržaj (Urednik u 3 koraka)",
    modalTitle: "Dodaj / Uredi sadržaj",
    step1Title: "1. korak: Odaberite kategoriju",
    step2Title: "2. korak: Odaberite predložak",
    step3Title: "3. korak: Unesite detalje",
    addBtn: "Dodaj",
    editTitle: "Naziv / Naslov",
    customTextLabel: "Dodatne napomene (opcionalno)",
    customTextWarning: "⚠️ Ovaj tekst ostaje neizmijenjen na svim jezicima.",
    yesLabel: "Da / Dostupno",
    noLabel: "Ne / Nije dostupno",
    createCustomCatBtn: "Prilagođena kategorija",
    moreInfo: "Dodatne informacije",
    cancel: "Odustani",
    saveAndClose: "Spremi i zatvori",
    searchPlaceholder: "Traži...",
    noPresetsFound: "Nije pronađen predložak u ovoj kategoriji."
  },
  it: { welcomeBadge: "Guida digitale", welcomeButton: "Inizia", greetingHello: "Ciao,", greetingWelcome: "benvenuto.", navHome: "Home", navGaestemappe: "Guida", navReview: "Recensisci", navRoute: "Percorso", weatherTitle: "Sereno", weatherSub: "Meteo attuale", detailBack: "Torna", adminTitle: "Amministrazione", guestViewBtn: "Vista ospiti", saveBtn: "Salva", savedMsg: "Salvato!", sec1Title: "1. Info struttura", sec6Title: "6. Sistema Preset", lblHotelName: "Nome struttura", lblPhone: "Telefono", btnAddCategory: "Aggiungi contenuto", modalTitle: "Aggiungi / Modifica", step1Title: "Passo 1: Categoria", step2Title: "Passo 2: Modello", step3Title: "Passo 3: Dettagli", addBtn: "Aggiungi", editTitle: "Titolo", customTextLabel: "Note", customTextWarning: "⚠️ Invariato.", yesLabel: "Sì / Disponibile", noLabel: "No / Non disponibile", createCustomCatBtn: "Categoria personalizzata", moreInfo: "Informazioni aggiuntive", cancel: "Annulla", saveAndClose: "Salva e chiudi", searchPlaceholder: "Cerca...", noPresetsFound: "Nessun modello trovato." },
  es: { welcomeBadge: "Guía digital", welcomeButton: "Empezar", greetingHello: "Hola,", greetingWelcome: "bienvenido.", navHome: "Inicio", navGaestemappe: "Guía", navReview: "Valorar", navRoute: "Ruta", weatherTitle: "Soleado", weatherSub: "Clima actual", detailBack: "Volver", adminTitle: "Administración", guestViewBtn: "Vista huésped", saveBtn: "Guardar", savedMsg: "¡Guardado!", sec1Title: "1. Info alojamiento", sec6Title: "6. Plantillas", lblHotelName: "Nombre alojamiento", lblPhone: "Teléfono", btnAddCategory: "Añadir contenido", modalTitle: "Añadir / Editar", step1Title: "Paso 1: Categoría", step2Title: "Paso 2: Plantilla", step3Title: "Paso 3: Detalles", addBtn: "Añadir", editTitle: "Título", customTextLabel: "Notas", customTextWarning: "⚠️ Sin cambios.", yesLabel: "Sí / Disponible", noLabel: "No / No disponible", createCustomCatBtn: "Categoría personalizada", moreInfo: "Información adicional", cancel: "Cancelar", saveAndClose: "Guardar y cerrar", searchPlaceholder: "Buscar...", noPresetsFound: "No hay plantillas." },
  sv: { welcomeBadge: "Digital guide", welcomeButton: "Sätt igång", greetingHello: "Hej,", greetingWelcome: "välkommen.", navHome: "Hem", navGaestemappe: "Guide", navReview: "Recensera", navRoute: "Vägbeskrivning", weatherTitle: "Soligt", weatherSub: "Aktuellt väder", detailBack: "Tillbaka", adminTitle: "Administration", guestViewBtn: "Gästvy", saveBtn: "Spara", savedMsg: "Sparat!", sec1Title: "1. Boendeinfo", sec6Title: "6. Förinställningar", lblHotelName: "Boendenamn", lblPhone: "Telefon", btnAddCategory: "Lägg till innehåll", modalTitle: "Lägg till / Redigera", step1Title: "Steg 1: Kategori", step2Title: "Steg 2: Mall", step3Title: "Steg 3: Detaljer", addBtn: "Lägg till", editTitle: "Titel", customTextLabel: "Anteckningar", customTextWarning: "⚠️ Oförändrad.", yesLabel: "Ja / Tillgänglig", noLabel: "Nej / Ej tillgänglig", createCustomCatBtn: "Anpassad kategori", moreInfo: "Ytterligare information", cancel: "Avbryt", saveAndClose: "Spara och stäng", searchPlaceholder: "Sök...", noPresetsFound: "Inga mallar hittades." },
  no: { welcomeBadge: "Digital guide", welcomeButton: "Sett i gang", greetingHello: "Hei,", greetingWelcome: "velkommen.", navHome: "Hjem", navGaestemappe: "Guide", navReview: "Omtale", navRoute: "Rute", weatherTitle: "Sol", weatherSub: "Aktuelt vær", detailBack: "Tilbake", adminTitle: "Administrasjon", guestViewBtn: "Gjestevisning", saveBtn: "Lagre", savedMsg: "Lagret!", sec1Title: "1. Boliginfo", sec6Title: "6. Forhåndsinnstillinger", lblHotelName: "Bolignavn", lblPhone: "Telefon", btnAddCategory: "Legg til innhold", modalTitle: "Legg til / Rediger", step1Title: "Trinn 1: Kategori", step2Title: "Trinn 2: Mal", step3Title: "Trinn 3: Detaljer", addBtn: "Legg til", editTitle: "Tittel", customTextLabel: "Notater", customTextWarning: "⚠️ Uendret.", yesLabel: "Ja / Tilgjengelig", noLabel: "Nei / Ikke tilgjengelig", createCustomCatBtn: "Tilpasset kategori", moreInfo: "Ytterligere informasjon", cancel: "Avbryt", saveAndClose: "Lagre og lukk", searchPlaceholder: "Søk...", noPresetsFound: "Ingen maler funnet." },
  sq: { welcomeBadge: "Udhëzues dixhital", welcomeButton: "Le të fillojmë", greetingHello: "Përshëndetje,", greetingWelcome: "mirë se erdhët.", navHome: "Kryefaqja", navGaestemappe: "Udhëzuesi", navReview: "Vlerëso", navRoute: "Udha", weatherTitle: "Me diell", weatherSub: "Moti aktual", detailBack: "Kthehu", adminTitle: "Administrimi", guestViewBtn: "Pamja e mysafirit", saveBtn: "Ruaj", savedMsg: "U ruajt!", sec1Title: "1. Info e pronës", sec6Title: "6. Shabllonet", lblHotelName: "Emri i pronës", lblPhone: "Telefon", btnAddCategory: "Shto përmbajtje", modalTitle: "Shto / Redakto", step1Title: "Hapi 1: Kategoria", step2Title: "Hapi 2: Shablloni", step3Title: "Hapi 3: Detajet", addBtn: "Shto", editTitle: "Titulli", customTextLabel: "Shënime", customTextWarning: "⚠️ I pandryshuar.", yesLabel: "Po / E disponueshme", noLabel: "Jo / E padisponueshme", createCustomCatBtn: "Kategori me porosi", moreInfo: "Informacione shtesë", cancel: "Anulo", saveAndClose: "Ruaj dhe mbyll", searchPlaceholder: "Kërko...", noPresetsFound: "Nuk u gjet asnjë shabllon." }
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
    { key: 'mattress_type', type: 'text', label: { de: 'Matratzenart', en: 'Mattress Type', tr: 'Yatak Tipi', fr: 'Type de matelas', hr: 'Vrsta madraca' }, default: 'Orthopädisch / Premium', primary: true },
    { key: 'blackout_curtains', type: 'boolean', label: { de: 'Verdunkelungsvorhänge', en: 'Blackout Curtains', tr: 'Karartma Perdesi', fr: 'Rideaux occultants', hr: 'Zatamnjene zavjese' }, default: true, primary: false }
  ]},
  { id: 'baby_kids_equip', categoryId: 'cat_hotel', icon: 'Baby', title: { de: 'Baby- & Kleinkindausstattung', en: 'Baby & Toddler Equipment', tr: 'Bebek & Çocuk Ekipmanı', fr: 'Équipement bébé', hr: 'Oprema za bebe' }, schema: [
    { key: 'baby_cot', type: 'boolean', label: { de: 'Babybett verfügbar', en: 'Baby Cot Available', tr: 'Bebek Yatağı Mevcut', fr: 'Lit bébé disponible', hr: 'Dječji krevetić' }, default: true, primary: true },
    { key: 'high_chair', type: 'boolean', label: { de: 'Hochstuhl', en: 'High Chair', tr: 'Mama Sandalyesi', fr: 'Chaise haute', hr: 'Hranilica za bebe' }, default: true, primary: true },
    { key: 'bottle_warmer', type: 'boolean', label: { de: 'Flaschenwärmer auf Anfrage', en: 'Bottle Warmer on Request', tr: 'Biberon Isıtıcı', fr: 'Chauffe-biberon', hr: 'Grijač bočica' }, default: false, primary: false }
  ]},
  { id: 'child_safety', categoryId: 'cat_hotel', icon: 'ShieldCheck', title: { de: 'Kindersicherheit', en: 'Child Safety', tr: 'Çocuk Güvenliği', fr: 'Sécurité enfants', hr: 'Sigurnost djece' }, schema: [
    { key: 'socket_protection', type: 'boolean', label: { de: 'Steckdosensicherung', en: 'Socket Protection', tr: 'Priz Emniyeti', fr: 'Protection des prises', hr: 'Zaštita utičnica' }, default: true, primary: true },
    { key: 'corner_guards', type: 'boolean', label: { de: 'Eckenschutz am Tisch', en: 'Table Corner Guards', tr: 'Masa Köşe Koruyucu', fr: 'Protections d\'angles', hr: 'Zaštita kutova' }, default: true, primary: true }
  ]},
  { id: 'business_equip', categoryId: 'cat_hotel', icon: 'Building', title: { de: 'Business-Ausstattung', en: 'Business Amenities', tr: 'Business Ekipmanlar', fr: 'Équipements business', hr: 'Poslovni sadržaji' }, schema: [
    { key: 'desk_workspace', type: 'boolean', label: { de: 'Ergonomischer Schreibtisch', en: 'Ergonomic Desk', tr: 'Ergonomik Çalışma Masası', fr: 'Bureau ergonomique', hr: 'Ergonomski radni stol' }, default: true, primary: true },
    { key: 'print_service', type: 'boolean', label: { de: 'Druckservice an Rezeption', en: 'Printing Service at Reception', tr: 'Resepsiyonda Yazıcı Hizmeti', fr: 'Service d\'impression', hr: 'Usluga ispisa' }, default: true, primary: true },
    { key: 'highspeed_lan', type: 'boolean', label: { de: 'Highspeed LAN Anschluss', en: 'High-speed LAN Connection', tr: 'Yüksek Hızlı LAN Bağlantısı', fr: 'Connexion LAN haut débit', hr: 'Brzi LAN priključak' }, default: false, primary: false }
  ]},
  { id: 'wifi_internet', categoryId: 'cat_hotel', icon: 'Wifi', title: { de: 'WLAN & Internet', en: 'WiFi & Internet', tr: 'WLAN & İnternet', fr: 'Wi-Fi & Internet', hr: 'Wi-Fi i internet' }, schema: [
    { key: 'wifi_available', type: 'boolean', label: { de: 'WLAN verfügbar', en: 'WiFi Available', tr: 'WLAN Mevcut', fr: 'Wi-Fi disponible', hr: 'Wi-Fi dostupan' }, default: true, primary: true },
    { key: 'network_name', type: 'text', label: { de: 'Netzwerkname (SSID)', en: 'Network Name (SSID)', tr: 'Ağ Adı (SSID)', fr: 'Nom du réseau (SSID)', hr: 'Naziv mreže (SSID)' }, default: 'Hotel-Guest-WiFi', primary: true },
    { key: 'wifi_password', type: 'text', label: { de: 'Passwort', en: 'Password', tr: 'Şifre', fr: 'Mot de passe', hr: 'Lozinka' }, default: 'welcome2026', primary: true },
    { key: 'coverage', type: 'select', label: { de: 'Verfügbarkeit', en: 'Coverage', tr: 'Kapsama Alanı', fr: 'Couverture', hr: 'Pokrivenost' }, options: ['Gesamtes Hotel', 'Gästezimmer', 'Öffentliche Bereiche'], default: 'Gesamtes Hotel', primary: false }
  ]},

  // NACHHALTIGKEIT & UMWELT
  { id: 'sustainability_concept', categoryId: 'cat_sustainability', icon: 'Recycle', title: { de: 'Nachhaltigkeitskonzept', en: 'Sustainability Concept', tr: 'Sürdürülebilirlik Konsepti', fr: 'Concept de durabilité', hr: 'Koncepcija održivosti' }, schema: [
    { key: 'concept_description', type: 'text', label: { de: 'Kurzbeschreibung', en: 'Short Description', tr: 'Kısa Açıklama', fr: 'Brève description', hr: 'Kratak opis' }, default: 'Wir setzen auf 100% Ökostrom und vermeiden Einwegplastik.', primary: true },
    { key: 'green_energy', type: 'boolean', label: { de: '100% Ökostrom', en: '100% Green Energy', tr: '%100 Yeşil Enerji', fr: 'Énergie 100% verte', hr: '100% zelena energija' }, default: true, primary: true }
  ]},
  { id: 'water_saving', categoryId: 'cat_sustainability', icon: 'Waves', title: { de: 'Wassersparmaßnahmen', en: 'Water Saving Measures', tr: 'Su Tasarrufu Önlemleri', fr: 'Économie d\'eau', hr: 'Mjere uštede vode' }, schema: [
    { key: 'flow_limiters', type: 'boolean', label: { de: 'Wassersparende Armaturen', en: 'Water-saving Faucets', tr: 'Tasarruflu Armatürler', fr: 'Robinets économiseurs d\'eau', hr: 'Slavine za uštedu vode' }, default: true, primary: true },
    { key: 'towel_reuse_policy', type: 'boolean', label: { de: 'Handtuch-Wiederverwendung', en: 'Towel Reuse Policy', tr: 'Havlu Yeniden Kullanım Politikası', fr: 'Réutilisation des serviettes', hr: 'Pravilo ponovne upotrebe ručnika' }, default: true, primary: true }
  ]},
  { id: 'recycling_waste', categoryId: 'cat_sustainability', icon: 'Recycle', title: { de: 'Müllvermeidung & Recycling', en: 'Waste Reduction & Recycling', tr: 'Geri Dönüşüm & Atık Yönetimi', fr: 'Recyclage & Déchets', hr: 'Recikliranje i otpad' }, schema: [
    { key: 'waste_separation', type: 'boolean', label: { de: 'Mülltrennung auf Zimmern', en: 'In-room Waste Separation', tr: 'Odalarda Atık Ayrıştırma', fr: 'Tri sélectif en chambre', hr: 'Razdvajanje otpada u sobi' }, default: true, primary: true },
    { key: 'no_single_use_plastic', type: 'boolean', label: { de: 'Kein Einwegplastik', en: 'No Single-use Plastic', tr: 'Tek Kullanımlık Plastik Yok', fr: 'Zéro plastique à usage unique', hr: 'Bez jednokratne plastike' }, default: true, primary: true }
  ]},
  { id: 'regional_products', categoryId: 'cat_sustainability', icon: 'Utensils', title: { de: 'Regionale & saisonale Produkte', en: 'Regional & Seasonal Products', tr: 'Yöresel & Mevsimlik Ürünler', fr: 'Produits régionaux & de saison', hr: 'Regionalni i sezonski proizvodi' }, schema: [
    { key: 'organic_breakfast', type: 'boolean', label: { de: 'Bio-Frühstücksprodukte', en: 'Organic Breakfast Items', tr: 'Organik Kahvaltılıklar', fr: 'Produits bio au petit-déjeuner', hr: 'Organski proizvodi za doručak' }, default: true, primary: true },
    { key: 'local_suppliers', type: 'text', label: { de: 'Herkunft der Zutaten', en: 'Ingredient Sourcing', tr: 'Malzeme Kaynağı', fr: 'Origine des ingrédients', hr: 'Podrijetlo sastojaka' }, default: 'Zulieferer aus max. 50km Umkreis', primary: true }
  ]},

  // ZERTIFIKATE & AUSZEICHNUNGEN
  { id: 'cert_sustainability', categoryId: 'cat_certificates', icon: 'Award', title: { de: 'Nachhaltigkeitszertifikate', en: 'Sustainability Certificates', tr: 'Sürdürülebilirlik Sertifikaları', fr: 'Certificats de durabilité', hr: 'Certifikati održivosti' }, schema: [
    { key: 'cert_name', type: 'text', label: { de: 'Zertifikat Name', en: 'Certificate Name', tr: 'Sertifika Adı', fr: 'Nom du certificat', hr: 'Naziv certifikata' }, default: 'Green Sign / Green Key', primary: true },
    { key: 'issuing_org', type: 'text', label: { de: 'Ausstellende Organisation', en: 'Issuing Organization', tr: 'Düzenleyen Kurum', fr: 'Organisme émetteur', hr: 'Izdavačka organizacija' }, default: 'GreenKey Global', primary: true },
    { key: 'cert_number', type: 'text', label: { de: 'Zertifikatsnummer', en: 'Certificate Number', tr: 'Sertifika No', fr: 'Numéro de certificat', hr: 'Broj certifikata' }, default: 'GK-2026-9876', primary: false },
    { key: 'valid_until', type: 'text', label: { de: 'Gültig bis', en: 'Valid Until', tr: 'Geçerlilik Tarihi', fr: 'Valide jusqu\'au', hr: 'Vrijedi do' }, default: '12/2027', primary: false },
    { key: 'official_website', type: 'text', label: { de: 'Offizielle Webseite', en: 'Official Website', tr: 'Resmi Web Sitesi', fr: 'Site officiel', hr: 'Službena web stranica' }, default: 'https://www.greenkey.global', primary: false }
  ]},
  { id: 'cert_accessibility', categoryId: 'cat_certificates', icon: 'Accessibility', title: { de: 'Zertifizierte Barrierefreiheit', en: 'Certified Accessibility', tr: 'Erişilebilirlik Sertifikası', fr: 'Accessibilité certifiée', hr: 'Certificirana pristupačnost' }, schema: [
    { key: 'wheelchair_accessible', type: 'boolean', label: { de: 'Rollstuhlgerecht', en: 'Wheelchair Accessible', tr: 'Tekerlekli Sandalye Uyumlu', fr: 'Accessible en fauteuil roulant', hr: 'Pristupačno za kolica' }, default: true, primary: true },
    { key: 'accessible_rooms', type: 'boolean', label: { de: 'Barrierefreie Zimmer', en: 'Accessible Rooms', tr: 'Engelsiz Odalar', fr: 'Chambres adaptées', hr: 'Pristupačne sobe' }, default: true, primary: true },
    { key: 'barrier_free_entrance', type: 'boolean', label: { de: 'Stufenloser Eingang', en: 'Stepless Entrance', tr: 'Basamaksız Giriş', fr: 'Entrée de plain-pied', hr: 'Ulaz bez stepenica' }, default: true, primary: true },
    { key: 'accessible_bathroom', type: 'boolean', label: { de: 'Barrierefreies Badezimmer', en: 'Accessible Bathroom', tr: 'Engelsiz Banyo', fr: 'Salle de bain adaptée', hr: 'Pristupačna kupaonica' }, default: false, primary: false },
    { key: 'elevator_available', type: 'boolean', label: { de: 'Fahrstuhl vorhanden', en: 'Elevator Available', tr: 'Asansör Mevcut', fr: 'Ascenseur disponible', hr: 'Dostupno dizalo' }, default: true, primary: false }
  ]},

  // ESSEN & TRINKEN
  { id: 'breakfast', categoryId: 'cat_food', icon: 'Coffee', title: { de: 'Frühstück', en: 'Breakfast', tr: 'Kahvaltı', fr: 'Petit-déjeuner', hr: 'Doručak' }, schema: [
    { key: 'breakfast_hours', type: 'text', label: { de: 'Frühstückszeiten', en: 'Breakfast Hours', tr: 'Kahvaltı Saatleri', fr: 'Horaires du petit-déjeuner', hr: 'Vrijeme doručka' }, default: '07:00 - 10:30 Uhr', primary: true },
    { key: 'breakfast_type', type: 'select', label: { de: 'Frühstücksart', en: 'Breakfast Type', tr: 'Kahvaltı Türü', fr: 'Type de petit-déjeuner', hr: 'Vrsta doručka' }, options: ['Reichhaltiges Buffet', 'Kontinental', 'À la carte'], default: 'Reichhaltiges Buffet', primary: true },
    { key: 'location', type: 'text', label: { de: 'Frühstücksort', en: 'Location', tr: 'Konum', fr: 'Emplacement', hr: 'Lokacija' }, default: 'Hauptrestaurant (Erdgeschoss)', primary: true }
  ]}
];

// --- 3-ADIMLI SAAS EDITÖR MODALI ---
const CompactPresetEditorModal = ({ isOpen, onClose, onSave, currentTheme, lang, t, editingCategory }) => {
  const [step, setStep] = useState(1);
  const [selectedMainCat, setSelectedMainCat] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  
  // Form State
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
        
        {/* HEADER */}
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

        {/* STEP PROGRESS BAR */}
        <div className="w-full bg-stone-100 h-1.5 flex">
          <div className={`h-full transition-all duration-300 ${currentTheme.bg} ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>

        {/* BODY (COMPACT NO OVERFLOW SCROLL) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* STEP 1: SELECT MAIN CATEGORY */}
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
                      <Building className={`w-5 h-5 ${currentTheme.text}`} />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950 truncate">{name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 2: SELECT PRESET TEMPLATE */}
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
                            <Info className={`w-4 h-4 ${currentTheme.text}`} />
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

          {/* STEP 3: DYNAMIC FORM EDITING */}
          {step === 3 && (
            <div className="space-y-4">
              {!editingCategory && (
                <button onClick={() => setStep(2)} className={`text-xs font-extrabold ${currentTheme.text} cursor-pointer`}>
                  &larr; {t.step2Title}
                </button>
              )}

              {/* TITLE OVERRIDE */}
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

              {/* PRIMARY FIELDS */}
              <div className="space-y-3 bg-stone-50/60 p-4 rounded-2xl border border-stone-200/80">
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
                    <div key={field.key} className="space-y-1">
                      <label className="block text-[10px] font-extrabold text-stone-500 uppercase">{label}</label>
                      <input
                        type="text"
                        value={val !== undefined ? val : ''}
                        onChange={(e) => handleFieldValueChange(field.key, e.target.value)}
                        className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white font-medium"
                      />
                    </div>
                  );
                })}
              </div>

              {/* SECONDARY OPTIONAL FIELDS (ACCORDION) */}
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
                      {secondaryFields.map(field => {
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

                        return (
                          <div key={field.key} className="space-y-1">
                            <label className="block text-[10px] font-extrabold text-stone-500 uppercase">{label}</label>
                            <input
                              type="text"
                              value={val !== undefined ? val : ''}
                              onChange={(e) => handleFieldValueChange(field.key, e.target.value)}
                              className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white font-medium"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* CUSTOM TEXT */}
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

        {/* STICKY FOOTER */}
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

// --- GUEST DISPLAY COMPONENT ---
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

  const [hotel, setHotel] = useState(() => {
    const saved = localStorage.getItem('gm24_hotel');
    const defaultData = {
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
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
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
        fieldValues: { cert_name: 'Green Key 2026', issuing_org: 'GreenKey Global', cert_number: 'GK-2026-9876' },
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

  const groupedCategories = (categories || []).reduce((acc, cat) => {
    if (!cat) return acc;
    const mainCatObj = mainCategories.find(mc => mc.id === cat.categoryId) || mainCategories[0];
    const groupName = mainCatObj.name[lang] || mainCatObj.name.de;
    if (!acc[groupName]) acc[groupName] = [];
    const presetData = categoryPresets.find(p => p.id === cat.presetId);
    acc[groupName].push({ ...cat, presetData, mainCatObj });
    return acc;
  }, {});

  if (appMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] font-sans text-slate-800 p-6 md:p-10 space-y-8 relative pb-28">
        
        {/* COMPACT MODAL EDITOR */}
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

        {/* DASHBOARD CONTENT */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.adminTitle}</h1>
            <button
              onClick={() => { setEditingCategory(null); setIsEditorModalOpen(true); }}
              className={`${currentTheme.bg} text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-md hover:opacity-95 transition cursor-pointer flex items-center gap-2`}
            >
              <Plus className="w-4 h-4" /> {t.btnAddCategory}
            </button>
          </div>

          {/* COMPACT CATEGORY LIST (NO SCROLL OVERLOAD) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec6Title}</h3>

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
                              <Info className={`w-4 h-4 ${currentTheme.text}`} />
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
          <img src={(hotel.images && hotel.images[0]) || ''} alt="Welcome" className="w-full h-full object-cover brightness-75" />
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
            <option value="fr">🇫🇷 FR</option>
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
                  <Info className={`w-6 h-6 ${currentTheme.text}`} />
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
                              <Info className={`w-5 h-5 ${currentTheme.text}`} />
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

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t z-50 shadow-2xl">
        <nav className="px-3 py-2 flex justify-around items-center">
          <button onClick={() => { setActiveTab('home'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'home' && !selectedCategory ? currentTheme.text : 'text-stone-400'}`}>
            <Info className="w-5 h-5" /><span>{t.navHome}</span>
          </button>
          <button onClick={() => { setActiveTab('services'); setSelectedCategory(null); }} className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'services' || selectedCategory ? currentTheme.text : 'text-stone-400'}`}>
            <Compass className="w-5 h-5" /><span>{t.navGaestemappe}</span>
          </button>
        </nav>
      </div>
    </div>
  );
}