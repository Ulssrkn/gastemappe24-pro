import React, { useEffect, useState } from 'react';
import { Check, ChevronDown, ChevronRight, ChevronUp, Plus, Search, Trash2, X } from 'lucide-react';
import AddressAutocomplete from './AddressAutocomplete.jsx';
import {
  OTHER_CUSTOM,
  customTextFieldLabels,
  customTextLabels,
  getFieldOptions,
  optionId,
  optionLabel,
} from './presetOptions.js';
import { categoryPresets, mainCategories } from './presetCatalog.js';
import guestCardCopy from '../guestCardCopy.js';
import pilotCopy from '../pilotCopy.js';
import renderSafeIconByName, { presetIconNames } from './PresetIcon.jsx';

const PresetFieldEditor = ({
  field,
  value,
  fieldValues,
  onChange,
  onCustomTextChange,
  lang,
  hideLabel = false,
}) => {
  const val = value !== undefined ? value : field.default,
    options = getFieldOptions(field),
    customKey = field.key + '__customText',
    customValue = fieldValues[customKey] || '';
  const selected =
    field.type === 'multiselect' ? Array.isArray(val) && val.includes(OTHER_CUSTOM) : val === OTHER_CUSTOM;
  const label = (field.label && (field.label[lang] || field.label.de)) || field.key;
  const toggle = (id, checked) => {
    const current = Array.isArray(val) ? val : [];
    onChange(checked ? [...current.filter((x) => x !== id), id] : current.filter((x) => x !== id));
  };
  return (
    <div className="space-y-1.5">
      {!hideLabel && (
        <label className="block text-[10px] font-extrabold text-stone-500 uppercase">{label}</label>
      )}
      {field.type === 'boolean' ? (
        <input type="checkbox" checked={!!val} onChange={(e) => onChange(e.target.checked)} />
      ) : field.type === 'select' ? (
        <select
          value={val || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2.5 text-xs border border-stone-200 rounded-xl bg-white"
        >
          {(Array.isArray(options) ? options : []).map((o) => (
            <option key={optionId(o)} value={optionId(o)}>
              {optionLabel(o, lang)}
            </option>
          ))}
        </select>
      ) : field.type === 'multiselect' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(Array.isArray(options) ? options : []).map((o) => {
            const id = optionId(o);
            return (
              <label
                key={id}
                className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(Array.isArray(val) ? val : []).includes(id)}
                  onChange={(e) => toggle(id, e.target.checked)}
                />
                <span>{optionLabel(o, lang)}</span>
              </label>
            );
          })}
        </div>
      ) : field.type === 'textarea' ? (
        <textarea
          rows={3}
          maxLength={5000}
          value={val || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2.5 text-xs border border-stone-200 rounded-xl"
        />
      ) : (
        <input
          type="text"
          value={val ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2.5 text-xs border border-stone-200 rounded-xl"
        />
      )}
      {selected && (
        <div className="pt-2 space-y-1">
          <label className="block text-[10px] font-bold text-amber-800">
            {customTextFieldLabels[lang] || customTextFieldLabels.de}
          </label>
          <textarea
            rows={3}
            maxLength={2000}
            value={customValue}
            onChange={(e) => onCustomTextChange(customKey, e.target.value)}
            placeholder={customTextLabels[lang] || customTextLabels.de}
            className="w-full p-2.5 text-xs border border-amber-300 rounded-xl bg-amber-50/40"
          />
          <span className="text-[10px] text-stone-400">{customValue.length}/2000</span>
        </div>
      )}
    </div>
  );
};

// --- 3-ADIMLI SAAS EDITÖR MODALI ---
const CompactPresetEditorModal = ({ isOpen, onClose, onSave, currentTheme, lang, t, editingCategory }) => {
  const [step, setStep] = useState(1);
  const [selectedMainCat, setSelectedMainCat] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const [customTitle, setCustomTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Info');
  const [customText, setCustomText] = useState('');
  const [customTextTranslations, setCustomTextTranslations] = useState({});
  const [fieldValues, setFieldValues] = useState({});
  const [contentCards, setContentCards] = useState([]);
  const [expandedContentCardId, setExpandedContentCardId] = useState(null);
  const [contentCardError, setContentCardError] = useState('');
  const gc = guestCardCopy[lang] || guestCardCopy.de;
  const roomEditorCopyByLang = {
    de: { section: 'Zimmertypen', sectionHint: 'Lege Zimmer einzeln an und ordne jedem Typ seine eigene Ausstattung zu.', add: 'Zimmertyp hinzufügen', empty: 'Noch keine Zimmertypen hinzugefügt.', name: 'Name des Zimmertyps', example: 'z. B. Panorama-Junior-Suite', description: 'Kurzbeschreibung · {lang}', features: 'Ausstattung dieses Zimmers', featureHint: 'Wähle nur die Merkmale, die für diesen Zimmertyp gelten.', remove: 'Zimmertyp entfernen', importExisting: 'Bisherige allgemeine Angaben in dieses Zimmer kopieren', linkedNote: 'Zimmerausstattung wird direkt am jeweiligen Zimmertyp gepflegt. Vorhandene allgemeine Angaben bleiben erhalten und können pro Zimmer übernommen werden.', required: 'Bitte gib für jeden Zimmertyp einen Namen ein.' },
    en: { section: 'Room types', sectionHint: 'Add each room type separately and set its own features.', add: 'Add room type', empty: 'No room types added yet.', name: 'Room type name', example: 'e.g. Panorama Junior Suite', description: 'Short description · {lang}', features: 'Features of this room', featureHint: 'Select only the features that apply to this room type.', remove: 'Remove room type', importExisting: 'Copy existing general details into this room', linkedNote: 'Room features are managed on each room type. Existing general details are kept and can be copied into rooms individually.', required: 'Add a name for each room type.' },
    tr: { section: 'Oda tipleri', sectionHint: 'Her oda tipini ayrı ekle ve yalnızca o odaya ait özellikleri seç.', add: 'Oda tipi ekle', empty: 'Henüz oda tipi eklenmedi.', name: 'Oda tipi adı', example: 'Örn. Panoramik Junior Süit', description: 'Kısa açıklama · {lang}', features: 'Bu odanın özellikleri', featureHint: 'Yalnızca bu oda tipi için geçerli özellikleri seç.', remove: 'Oda tipini kaldır', importExisting: 'Önceden girilen genel bilgileri bu odaya kopyala', linkedNote: 'Oda özellikleri her oda tipinin altında yönetilir. Önceden girilen genel bilgiler korunur ve istenirse odalara tek tek kopyalanabilir.', required: 'Her oda tipi için bir ad gir.' },
    fr: { section: 'Types de chambre', sectionHint: 'Ajoutez chaque type séparément et définissez ses propres équipements.', add: 'Ajouter un type de chambre', empty: 'Aucun type de chambre ajouté.', name: 'Nom du type de chambre', example: 'ex. Suite junior panoramique', description: 'Description courte · {lang}', features: 'Équipements de cette chambre', featureHint: 'Sélectionnez uniquement les équipements de ce type de chambre.', remove: 'Supprimer le type de chambre', importExisting: 'Copier les informations générales existantes dans cette chambre', linkedNote: 'Les équipements sont gérés pour chaque type de chambre. Les informations générales existantes sont conservées et peuvent être copiées individuellement.', required: 'Donnez un nom à chaque type de chambre.' },
    es: { section: 'Tipos de habitación', sectionHint: 'Añade cada tipo por separado y configura sus propias características.', add: 'Añadir tipo de habitación', empty: 'Aún no hay tipos de habitación.', name: 'Nombre del tipo de habitación', example: 'p. ej., suite junior panorámica', description: 'Descripción breve · {lang}', features: 'Características de esta habitación', featureHint: 'Selecciona solo las características de este tipo de habitación.', remove: 'Eliminar tipo de habitación', importExisting: 'Copiar la información general existente a esta habitación', linkedNote: 'Las características se gestionan en cada tipo de habitación. La información general existente se conserva y se puede copiar por separado.', required: 'Añade un nombre a cada tipo de habitación.' },
    hr: { section: 'Vrste soba', sectionHint: 'Dodajte svaku vrstu zasebno i odaberite njezine značajke.', add: 'Dodaj vrstu sobe', empty: 'Još nema dodanih vrsta soba.', name: 'Naziv vrste sobe', example: 'npr. panoramski junior suite', description: 'Kratki opis · {lang}', features: 'Značajke ove sobe', featureHint: 'Odaberite samo značajke koje vrijede za ovu vrstu sobe.', remove: 'Ukloni vrstu sobe', importExisting: 'Kopiraj postojeće opće podatke u ovu sobu', linkedNote: 'Značajke se uređuju zasebno za svaku vrstu sobe. Postojeći opći podaci ostaju sačuvani i mogu se kopirati pojedinačno.', required: 'Unesite naziv svake vrste sobe.' },
    sq: { section: 'Llojet e dhomave', sectionHint: 'Shtoni çdo lloj veçmas dhe zgjidhni pajisjet e veta.', add: 'Shto lloj dhome', empty: 'Nuk është shtuar ende asnjë lloj dhome.', name: 'Emri i llojit të dhomës', example: 'p.sh. suitë junior panoramike', description: 'Përshkrim i shkurtër · {lang}', features: 'Pajisjet e kësaj dhome', featureHint: 'Zgjidhni vetëm pajisjet që i përkasin këtij lloji dhome.', remove: 'Hiq llojin e dhomës', importExisting: 'Kopjo të dhënat e përgjithshme ekzistuese në këtë dhomë', linkedNote: 'Pajisjet menaxhohen veçmas për çdo lloj dhome. Të dhënat e përgjithshme ekzistuese ruhen dhe mund të kopjohen veçmas.', required: 'Vendosni një emër për çdo lloj dhome.' },
    sv: { section: 'Rumstyper', sectionHint: 'Lägg till varje rumstyp separat och välj dess egna funktioner.', add: 'Lägg till rumstyp', empty: 'Inga rumstyper har lagts till ännu.', name: 'Namn på rumstyp', example: 't.ex. panoramisk juniorsvit', description: 'Kort beskrivning · {lang}', features: 'Funktioner i detta rum', featureHint: 'Välj bara funktioner som gäller för denna rumstyp.', remove: 'Ta bort rumstyp', importExisting: 'Kopiera befintliga allmänna uppgifter till detta rum', linkedNote: 'Funktioner hanteras för varje rumstyp. Befintliga allmänna uppgifter sparas och kan kopieras till enskilda rum.', required: 'Ange ett namn för varje rumstyp.' },
    nb: { section: 'Romtyper', sectionHint: 'Legg til hver romtype separat og velg dens egne fasiliteter.', add: 'Legg til romtype', empty: 'Ingen romtyper er lagt til ennå.', name: 'Navn på romtype', example: 'f.eks. panoramisk juniorsuite', description: 'Kort beskrivelse · {lang}', features: 'Fasiliteter på dette rommet', featureHint: 'Velg bare fasiliteter som gjelder for denne romtypen.', remove: 'Fjern romtype', importExisting: 'Kopier eksisterende generelle opplysninger til dette rommet', linkedNote: 'Fasiliteter administreres for hver romtype. Eksisterende generelle opplysninger beholdes og kan kopieres til enkeltrom.', required: 'Gi hver romtype et navn.' },
    no: { section: 'Romtyper', sectionHint: 'Legg til hver romtype separat og velg dens egne fasiliteter.', add: 'Legg til romtype', empty: 'Ingen romtyper er lagt til ennå.', name: 'Navn på romtype', example: 'f.eks. panoramisk juniorsuite', description: 'Kort beskrivelse · {lang}', features: 'Fasiliteter på dette rommet', featureHint: 'Velg bare fasiliteter som gjelder for denne romtypen.', remove: 'Fjern romtype', importExisting: 'Kopier eksisterende generelle opplysninger til dette rommet', linkedNote: 'Fasiliteter administreres for hver romtype. Eksisterende generelle opplysninger beholdes og kan kopieres til enkeltrom.', required: 'Gi hver romtype et navn.' },
    it: { section: 'Tipi di camera', sectionHint: 'Aggiungi ogni tipo separatamente e imposta le sue dotazioni.', add: 'Aggiungi tipo di camera', empty: 'Non è stato ancora aggiunto alcun tipo di camera.', name: 'Nome del tipo di camera', example: 'es. junior suite panoramica', description: 'Breve descrizione · {lang}', features: 'Dotazioni di questa camera', featureHint: 'Seleziona solo le dotazioni di questo tipo di camera.', remove: 'Rimuovi tipo di camera', importExisting: 'Copia le informazioni generali esistenti in questa camera', linkedNote: 'Le dotazioni sono gestite per ogni tipo di camera. Le informazioni generali esistenti sono conservate e possono essere copiate singolarmente.', required: 'Inserisci un nome per ogni tipo di camera.' },
  };
  const roomEditorCopy = roomEditorCopyByLang[lang] || roomEditorCopyByLang.en;
  const roomFeatureKeys = new Set([
    'room_amenities', 'bed_types', 'bathroom_features', 'room_technology',
    'room_outdoor_view', 'room_capacity', 'room_max_guests', 'room_floor_number',
    'room_smoking_policy', 'room_accessibility',
  ]);
  const iconPickerText = ({ de: { label: 'Symbol (optional)', reset: 'Preset-Symbol verwenden' }, en: { label: 'Icon (optional)', reset: 'Use preset icon' }, tr: { label: 'Simge (isteğe bağlı)', reset: 'Preset simgesini kullan' }, fr: { label: 'Icône (facultatif)', reset: 'Utiliser l’icône du preset' }, es: { label: 'Icono (opcional)', reset: 'Usar icono del preset' }, hr: { label: 'Ikona (neobavezno)', reset: 'Koristi zadanu ikonu' }, sq: { label: 'Ikonë (opsionale)', reset: 'Përdor ikonën e presetit' }, sv: { label: 'Ikon (valfritt)', reset: 'Använd preset-ikon' }, nb: { label: 'Ikon (valgfritt)', reset: 'Bruk preset-ikon' }, no: { label: 'Ikon (valgfritt)', reset: 'Bruk preset-ikon' }, it: { label: 'Icona (facoltativa)', reset: 'Usa l’icona del preset' } })[lang] || { label: 'Icon (optional)', reset: 'Use preset icon' };
  const titleRequiredCopy = {
    de: 'Bitte gib für jede Empfehlung einen Titel ein.',
    en: 'Add a title to each recommendation.',
    tr: 'Her öneri için bir başlık girin.',
    fr: 'Ajoutez un titre à chaque recommandation.',
    es: 'Añade un título a cada recomendación.',
    cs: 'Každé doporučení musí mít název.',
    sq: 'Shto një titull për çdo rekomandim.',
    sv: 'Ange en titel för varje tips.',
    nb: 'Legg til en tittel for hver anbefaling.',
    it: 'Aggiungi un titolo a ogni consiglio.',
  }[lang];
  const customTextHint = {
    de: 'Dieser Text wird nicht automatisch übersetzt. Eigene Übersetzungen kannst du optional ergänzen, indem du die Dashboard-Sprache wechselst.',
    en: 'This text is not translated automatically. You can add translations by switching the dashboard language.',
    tr: 'Bu metin otomatik çevrilmez. Dashboard dilini değiştirerek isteğe bağlı çeviriler ekleyebilirsin.',
    fr: 'Ce texte n’est pas traduit automatiquement. Changez la langue du tableau de bord pour ajouter des traductions.',
    es: 'Este texto no se traduce automáticamente. Cambia el idioma del panel para añadir traducciones.',
    cs: 'Tento text se nepřekládá automaticky. Překlady můžete doplnit změnou jazyka panelu.',
    sq: 'Ky tekst nuk përkthehet automatikisht. Ndrysho gjuhën e panelit për të shtuar përkthime.',
    sv: 'Texten översätts inte automatiskt. Byt språk i översikten om du vill lägga till översättningar.',
    nb: 'Teksten oversettes ikke automatisk. Bytt språk i kontrollpanelet for å legge til oversettelser.',
    it: 'Questo testo non viene tradotto automaticamente. Cambia la lingua del pannello per aggiungere traduzioni.',
  }[lang];
  const cardSectionHint = {
    de: 'Füge Orte oder Informationen als Karten hinzu. Adresse, Link, Telefon und Zeiten sind optional.',
    en: 'Add places or information as cards. Address, link, phone, and hours are optional.',
    tr: 'Yerleri veya bilgileri kart olarak ekle. Adres, bağlantı, telefon ve saat bilgileri isteğe bağlı.',
    fr: 'Ajoutez des lieux ou des informations sous forme de cartes. Adresse, lien, téléphone et horaires sont facultatifs.',
    es: 'Añade lugares o información en tarjetas. La dirección, el enlace, el teléfono y el horario son opcionales.',
    cs: 'Přidávejte místa nebo informace jako karty. Adresa, odkaz, telefon a otevírací doba jsou volitelné.',
    sq: 'Shto vende ose informacione si karta. Adresa, lidhja, telefoni dhe orari janë opsionale.',
    sv: 'Lägg till platser eller information som kort. Adress, länk, telefon och tider är valfria.',
    nb: 'Legg til steder eller informasjon som kort. Adresse, lenke, telefon og åpningstider er valgfrie.',
    it: 'Aggiungi luoghi o informazioni come schede. Indirizzo, link, telefono e orari sono facoltativi.',
  }[lang];
  const emptyCardsLabel = {
    de: 'Noch keine Empfehlungen. Füge bei Bedarf eine hinzu.',
    en: 'No recommendations yet. Add one whenever you need it.',
    tr: 'Henüz öneri yok. İstersen şimdi ekleyebilirsin.',
    fr: 'Aucune recommandation pour le moment. Ajoutez-en une si besoin.',
    es: 'Aún no hay recomendaciones. Añade una cuando quieras.',
    cs: 'Zatím žádná doporučení. Kdykoli můžete nějaké přidat.',
    sq: 'Nuk ka ende rekomandime. Shto një kur të duash.',
    sv: 'Inga tips ännu. Lägg till ett när du vill.',
    nb: 'Ingen anbefalinger ennå. Legg til en når du ønsker.',
    it: 'Ancora nessun consiglio. Aggiungine uno quando vuoi.',
  }[lang];
  const cardTranslationHint = {
    de: 'Eigene Beschreibungen werden nicht automatisch übersetzt. Zum Übersetzen die Dashboard-Sprache wechseln; ohne Übersetzung bleibt der eigene Text in dieser Sprache verborgen.',
    en: 'Custom descriptions are not translated automatically. Switch the dashboard language to add a translation; otherwise the custom text stays hidden in that language.',
    tr: 'Özel açıklamalar otomatik çevrilmez. Çeviri eklemek için dashboard dilini değiştir; çeviri olmayan dillerde özel metin gösterilmez.',
    fr: 'Les descriptions personnalisées ne sont pas traduites automatiquement. Changez la langue du tableau de bord pour ajouter une traduction ; sinon, le texte reste masqué dans cette langue.',
    es: 'Las descripciones propias no se traducen automáticamente. Cambia el idioma del panel para añadir traducciones; si falta, el texto propio no se muestra en ese idioma.',
    cs: 'Vlastní popisy se nepřekládají automaticky. Překlady přidejte změnou jazyka panelu; bez nich se text v daném jazyce skryje.',
    sq: 'Përshkrimet personale nuk përkthehen automatikisht. Ndrysho gjuhën e panelit për të shtuar përkthime; pa to, teksti fshihet në atë gjuhë.',
    sv: 'Egna beskrivningar översätts inte automatiskt. Byt språk i översikten för att lägga till översättningar; annars visas inte texten på det språket.',
    nb: 'Egendefinerte beskrivelser oversettes ikke automatisk. Bytt språk i kontrollpanelet for å legge til oversettelser; ellers skjules teksten på det språket.',
    it: 'Le descrizioni personalizzate non vengono tradotte automaticamente. Cambia la lingua del pannello per aggiungere traduzioni; in caso contrario, il testo non appare in quella lingua.',
  }[lang];

  useEffect(() => {
    if (editingCategory) {
      setStep(3);
      setSelectedMainCat(editingCategory.categoryId);
      const presetObj = categoryPresets.find((p) => p.id === editingCategory.presetId);
      setSelectedPreset(presetObj || null);
      setCustomTitle(editingCategory.customTitle || '');
      setSelectedIcon(editingCategory.icon || presetObj?.icon || 'Info');
      setCustomText(editingCategory.customText || '');
      setCustomTextTranslations(editingCategory.customTextTranslations || {});
      setFieldValues(editingCategory.fieldValues || {});
      setContentCards(
        Array.isArray(editingCategory.fieldValues?.contentCards) ? editingCategory.fieldValues.contentCards : []
      );
      setExpandedContentCardId(null);
      setContentCardError('');
    } else {
      setStep(1);
      setSelectedMainCat(null);
      setSelectedPreset(null);
      setCustomTitle('');
      setSelectedIcon('Info');
      setCustomText('');
      setCustomTextTranslations({});
      setFieldValues({});
      setContentCards([]);
      setExpandedContentCardId(null);
      setContentCardError('');
    }
  }, [editingCategory, isOpen]);

  if (!isOpen) return null;

  const handleSelectCategory = (catId) => {
    setSelectedMainCat(catId);
    setStep(2);
  };

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setSelectedIcon(preset?.icon || 'Info');
    const initialVals = {};
    if (preset && preset.schema) {
      preset.schema.forEach((f) => {
        initialVals[f.key] = f.default !== undefined ? f.default : f.type === 'multiselect' ? [] : '';
      });
    }
    setFieldValues(initialVals);
    setContentCards([]);
    setStep(3);
  };

  const handleFieldValueChange = (key, val) => {
    setFieldValues((prev) => ({ ...prev, [key]: val }));
  };

  const addContentCard = () => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setContentCards((previous) => [
      ...previous,
      { id, title: '', descriptionTranslations: {}, address: '', url: '', phone: '', hours: '' },
    ]);
    setExpandedContentCardId(id);
    setContentCardError('');
  };
  const updateContentCard = (cardId, key, value) =>
    setContentCards((previous) =>
      previous.map((card) => (card.id === cardId ? { ...card, [key]: value } : card))
    );
  const updateContentCardDescription = (cardId, value) =>
    setContentCards((previous) =>
      previous.map((card) =>
        card.id === cardId
          ? { ...card, descriptionTranslations: { ...(card.descriptionTranslations || {}), [lang]: value } }
          : card
      )
    );

  const handleSave = () => {
    const invalidCard = contentCards.some((card) => !String(card.title || '').trim());
    if (invalidCard) {
      setContentCardError(isRoomPreset ? roomEditorCopy.required : titleRequiredCopy || guestCardCopy.en.titleRequired);
      return;
    }
    setContentCardError('');
    const categoryData = {
      id: editingCategory ? editingCategory.id : Date.now().toString(),
      presetId: selectedPreset ? selectedPreset.id : 'custom',
      categoryId: selectedMainCat || 'cat_hotel',
      icon: selectedIcon || (selectedPreset ? selectedPreset.icon : 'Info'),
      customTitle: customTitle,
      fieldValues: { ...fieldValues, contentCards },
      customText: customText,
      customTextTranslations,
    };
    onSave(categoryData);
    onClose();
  };

  const availablePresets = categoryPresets
    .filter(
      (p) =>
        p.categoryId === selectedMainCat ||
        (selectedMainCat === 'cat_safety' &&
          (p.categoryId === 'cat_sustainability' || p.categoryId === 'cat_certificates'))
    )
    .filter((p) => {
      if (!searchQuery) return true;
      const title = (p.title && (p.title[lang] || p.title.de)) || '';
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const primaryFields = selectedPreset?.schema?.filter((f) => f.primary) || [];
  const secondaryFields = selectedPreset?.schema?.filter((f) => !f.primary) || [];
  const isRoomPreset = selectedPreset?.id === 'HOT_006' || selectedPreset?.id === 'room_info';
  const roomFeatureFields = (selectedPreset?.schema || []).filter((field) => roomFeatureKeys.has(field.key));
  const legacyRoomFeatureValues = Object.fromEntries(roomFeatureFields.flatMap((field) => {
    const value = fieldValues[field.key];
    const hasValue = Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && String(value).trim() !== '' && value !== field.default;
    const customText = fieldValues[field.key + '__customText'];
    return [ ...(hasValue ? [[field.key, value]] : []), ...(customText ? [[field.key + '__customText', customText]] : []) ];
  }));

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-6 animate-fade-in overflow-x-hidden">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gm24-preset-title"
        tabIndex={-1}
        className="bg-white w-full min-w-0 max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] border border-stone-200"
      >
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 block">
              {t.modalTitle}
            </span>
            <h2 id="gm24-preset-title" className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {step === 1 && t.step1Title}
              {step === 2 && t.step2Title}
              {step === 3 && t.step3Title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label={(pilotCopy[lang] || pilotCopy.de).close}
            className="p-2 rounded-xl text-stone-400 hover:text-slate-800 hover:bg-stone-200/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full bg-stone-100 h-1.5 flex">
          <div
            className={`h-full transition-all duration-300 ${currentTheme.bg} ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}
          ></div>
        </div>

        <div className="min-w-0 p-3 sm:p-6 overflow-y-auto overflow-x-hidden flex-1 space-y-4 overscroll-contain">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 min-w-0">
              {mainCategories.map((mainCat) => {
                const name = mainCat.name[lang] || mainCat.name.de;
                return (
                  <button
                    key={mainCat.id}
                    onClick={() => handleSelectCategory(mainCat.id)}
                    className={`min-w-0 w-full p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer bg-white hover:${currentTheme.border} hover:shadow-md group`}
                  >
                    <div
                      className={`p-2.5 rounded-xl ${currentTheme.bgLight} group-hover:scale-105 transition`}
                    >
                      {renderSafeIconByName(mainCat.icon, currentTheme)}
                    </div>
                    <span className="min-w-0 flex-1 text-xs font-bold text-slate-800 group-hover:text-slate-950 break-words">
                      {name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setStep(1)}
                  className={`text-xs font-extrabold ${currentTheme.text} cursor-pointer`}
                >
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
                  availablePresets.map((preset) => {
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
                <button
                  onClick={() => setStep(2)}
                  className={`text-xs font-extrabold ${currentTheme.text} cursor-pointer`}
                >
                  &larr; {t.step2Title}
                </button>
              )}

              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-stone-500 tracking-wider">
                  {t.editTitle}
                </label>
                <input
                  type="text"
                  placeholder={selectedPreset ? selectedPreset.title[lang] || selectedPreset.title.de : 'Titel'}
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full p-2.5 text-xs font-bold border border-stone-200 rounded-xl bg-stone-50 focus:bg-white"
                />
              </div>
              <section className="space-y-2 rounded-2xl border border-stone-200 bg-stone-50/60 p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-600">{iconPickerText.label}</span>
                  <button type="button" onClick={() => setSelectedIcon(selectedPreset?.icon || "Info")} className="text-[10px] font-semibold text-stone-500 underline-offset-2 hover:underline">{iconPickerText.reset}</button>
                </div>
                <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
                  {presetIconNames.map((iconName) => {
                    const selected = selectedIcon === iconName;
                    return <button key={iconName} type="button" aria-label={iconPickerText.label + ": " + iconName} title={iconName} aria-pressed={selected} onClick={() => setSelectedIcon(iconName)} className={"flex h-10 items-center justify-center rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 " + (selected ? currentTheme.bgLight + " " + currentTheme.border : "border-stone-200 bg-white hover:border-stone-300")}>
                      {renderSafeIconByName(iconName, currentTheme)}
                    </button>;
                  })}
                </div>
              </section>

              {selectedPreset?.id !== 'REG_004' && (
                <section className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {isRoomPreset ? roomEditorCopy.section : gc.section}
                        {contentCards.length ? ` · ${contentCards.length}` : ''}
                      </h3>
                      <p className="mt-0.5 text-[10px] text-slate-500">{isRoomPreset ? roomEditorCopy.sectionHint : cardSectionHint}</p>
                    </div>
                    <button
                      type="button"
                      onClick={addContentCard}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-[10px] font-bold text-white hover:bg-slate-800"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {isRoomPreset ? roomEditorCopy.add : gc.add}
                    </button>
                  </div>
                  {contentCardError && (
                    <p role="alert" className="text-xs font-semibold text-rose-700">
                      {contentCardError}
                    </p>
                  )}
                  {contentCards.length === 0 && (
                    <p className="rounded-xl border border-dashed border-slate-300 bg-white px-3 py-3 text-xs text-slate-500">
                      {isRoomPreset ? roomEditorCopy.empty : emptyCardsLabel}
                    </p>
                  )}
                  {contentCards.map((card, index) => (
                    <article
                      key={card.id || index}
                      className="space-y-3 rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="flex items-start gap-2">
                        <label className="min-w-0 flex-1 space-y-1">
                          <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-500">
                            {isRoomPreset ? roomEditorCopy.name : gc.title} *
                          </span>
                          <input
                            value={card.title || ''}
                            onChange={(event) => updateContentCard(card.id, 'title', event.target.value)}
                            placeholder={isRoomPreset ? roomEditorCopy.example : lang === 'tr' ? 'Örn. Stadtmuseum' : 'e.g. Stadtmuseum'}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-400"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setContentCards((previous) => previous.filter((item) => item.id !== card.id));
                            if (expandedContentCardId === card.id) setExpandedContentCardId(null);
                          }}
                          aria-label={isRoomPreset ? roomEditorCopy.remove : lang === 'tr' ? 'Öneriyi kaldır' : 'Remove recommendation'}
                          className="mt-5 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <label className="block space-y-1">
                        <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-500">
                          {isRoomPreset ? roomEditorCopy.description.replace('{lang}', lang.toUpperCase()) : gc.description + ' · ' + lang.toUpperCase()}
                        </span>
                        <textarea
                          rows={2}
                          value={
                            card.descriptionTranslations?.[lang] ||
                            (lang === 'de' ? card.description || '' : '')
                          }
                          onChange={(event) => updateContentCardDescription(card.id, event.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-slate-400"
                        />
                        <span className="block text-[10px] leading-relaxed text-slate-400">
                          {cardTranslationHint || guestCardCopy.en.translationHint}
                        </span>
                      </label>
                      <details
                        defaultOpen={expandedContentCardId === card.id}
                        className="rounded-lg bg-slate-50 px-3 py-2"
                      >
                        <summary className="cursor-pointer list-none text-[10px] font-bold text-slate-600">
                          {isRoomPreset ? roomEditorCopy.features : gc.more}
                        </summary>
                        {isRoomPreset ? (
                          <div className="mt-3 space-y-3">
                            <p className="text-[10px] leading-relaxed text-slate-500">{roomEditorCopy.featureHint}</p>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {roomFeatureFields.map((field) => (
                                <PresetFieldEditor
                                  key={field.key}
                                  field={field}
                                  value={card.roomFeatures?.[field.key] ?? (field.type === 'multiselect' ? [] : '')}
                                  fieldValues={card.roomFeatures || {}}
                                  lang={lang}
                                  onChange={(value) => updateContentCard(card.id, 'roomFeatures', { ...(card.roomFeatures || {}), [field.key]: value })}
                                  onCustomTextChange={(key, value) => updateContentCard(card.id, 'roomFeatures', { ...(card.roomFeatures || {}), [key]: value })}
                                />
                              ))}
                            </div>
                            {Object.keys(legacyRoomFeatureValues).length > 0 && (
                              <button
                                type="button"
                                onClick={() => updateContentCard(card.id, 'roomFeatures', { ...legacyRoomFeatureValues, ...(card.roomFeatures || {}) })}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-100"
                              >
                                {roomEditorCopy.importExisting}
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <label className="space-y-1">
                            <span className="block text-[10px] font-semibold text-slate-500">{gc.address}</span>
                            <AddressAutocomplete
                              lang={lang}
                              value={card.address || ''}
                              onChange={(value) => updateContentCard(card.id, 'address', value)}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-slate-400"
                            />
                          </label>
                          {[
                            ['url', gc.url, 'url'],
                            ['phone', gc.phone, 'tel'],
                            ['hours', gc.hours, 'text'],
                          ].map(([key, label, type]) => (
                            <label key={key} className="space-y-1">
                              <span className="block text-[10px] font-semibold text-slate-500">{label}</span>
                              <input
                                type={type}
                                value={card[key] || ''}
                                onChange={(event) => updateContentCard(card.id, key, event.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-slate-400"
                              />
                            </label>
                          ))}
                        </div>
                        )}
                      </details>
                    </article>
                  ))}
                </section>
              )}

              <div className="space-y-3 bg-stone-50/60 p-4 rounded-2xl border border-stone-200/80">
                {isRoomPreset ? (
                  <p className="rounded-xl border border-slate-200 bg-white p-3 text-xs leading-relaxed text-slate-600">
                    {roomEditorCopy.linkedNote}
                  </p>
                ) : primaryFields.map((field) => (
                  <PresetFieldEditor
                    key={field.key}
                    field={field}
                    value={fieldValues[field.key]}
                    fieldValues={fieldValues}
                    lang={lang}
                    onChange={(value) => handleFieldValueChange(field.key, value)}
                    onCustomTextChange={handleFieldValueChange}
                  />
                ))}
              </div>
              {!isRoomPreset && secondaryFields.length > 0 && (
                <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                    className="w-full p-3 bg-stone-50 text-left text-xs font-bold text-stone-700 flex justify-between items-center cursor-pointer hover:bg-stone-100"
                  >
                    <span>
                      {t.moreInfo} ({secondaryFields.length})
                    </span>
                    {showMoreInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showMoreInfo && (
                    <div className="p-4 space-y-3 bg-white border-t border-stone-200">
                      {secondaryFields.map((field) => (
                        <PresetFieldEditor
                          key={field.key}
                          field={field}
                          value={fieldValues[field.key]}
                          fieldValues={fieldValues}
                          lang={lang}
                          onChange={(value) => handleFieldValueChange(field.key, value)}
                          onCustomTextChange={handleFieldValueChange}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-amber-800 tracking-wider">
                  {t.customTextLabel}
                </label>
                <textarea
                  rows="2"
                  value={customTextTranslations[lang] ?? customText}
                  onChange={(e) => {
                    setCustomTextTranslations((previous) => ({ ...previous, [lang]: e.target.value }));
                    if (lang === 'de') setCustomText(e.target.value);
                  }}
                  placeholder="Individueller Hinweistext für Gäste..."
                  className="w-full p-2.5 text-xs border border-amber-300/60 rounded-xl bg-amber-50/40"
                />
                <p className="text-[10px] leading-relaxed text-stone-500">
                  {customTextHint || guestCardCopy.en.freeTextHint}
                </p>
              </div>
            </div>
          )}
        </div>

        {step === 3 && (
          <div className="p-3 sm:p-4 border-t border-stone-100 bg-stone-50/95 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 shrink-0">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 sm:py-2 text-xs font-bold text-stone-600 hover:text-slate-900 cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSave}
              className={`w-full sm:w-auto justify-center px-5 py-3 sm:py-2.5 rounded-xl text-xs font-bold text-white shadow-md ${currentTheme.bg} hover:opacity-95 cursor-pointer flex items-center gap-1.5`}
            >
              <Check className="w-4 h-4" /> {t.saveAndClose}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompactPresetEditorModal;
