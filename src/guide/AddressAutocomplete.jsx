import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

const AddressAutocomplete = ({ value, onChange, className, lang = 'de' }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    const query = (value || '').trim();
    if (!isTyping || query.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const searchLang = lang === 'nb' ? 'no' : lang === 'cs' ? 'en' : lang;
        const response = await fetch(
          'https://photon.komoot.io/api/?q=' + encodeURIComponent(query) + '&limit=5&lang=' + searchLang,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('Address suggestions unavailable');
        const data = await response.json();
        const items = (data.features || [])
          .map((feature) => {
            const p = feature.properties || {};
            const street = p.street ? (p.housenumber ? p.street + ' ' + p.housenumber : p.street) : '';
            return {
              label: [p.name, street, p.postcode, p.city || p.town || p.village, p.state, p.country]
                .filter(Boolean)
                .filter((part, index, all) => all.indexOf(part) === index)
                .join(', '),
            };
          })
          .filter((item) => item.label);
        setSuggestions(items);
        setOpen(items.length > 0);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setSuggestions([]);
          setOpen(false);
        }
      }
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, lang]);
  return (
    <div className="relative">
      <input
        type="text"
        value={value || ''}
        onChange={(event) => {
          setIsTyping(true);
          onChange(event.target.value);
        }}
        onFocus={() => {
          if (isTyping && suggestions.length) setOpen(true);
        }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        autoComplete="off"
        className={className}
      />
      {open && suggestions.length > 0 && (
        <div
          role="listbox"
          className="absolute z-50 left-0 right-0 top-full mt-1 rounded-xl border border-stone-200 bg-white shadow-xl overflow-hidden"
        >
          {suggestions.map((item, index) => (
            <button
              key={item.label + index}
              type="button"
              role="option"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(item.label);
                setIsTyping(false);
                setOpen(false);
                setSuggestions([]);
              }}
              className="w-full px-3 py-2.5 text-left text-xs text-stone-700 hover:bg-amber-50 border-b last:border-b-0 border-stone-100"
            >
              <MapPin className="inline w-3.5 h-3.5 mr-2 text-stone-400" />
              {item.label}
            </button>
          ))}
          <div className="px-3 py-1.5 text-[9px] text-stone-400">
            {{
              de: 'Adressvorschläge von OpenStreetMap / Photon',
              en: 'Address suggestions by OpenStreetMap / Photon',
              tr: 'OpenStreetMap / Photon adres önerileri',
              fr: 'Suggestions d’adresse par OpenStreetMap / Photon',
              es: 'Sugerencias de OpenStreetMap / Photon',
              cs: 'Návrhy adres OpenStreetMap / Photon',
              sq: 'Sugjerime adrese nga OpenStreetMap / Photon',
              sv: 'Adressförslag från OpenStreetMap / Photon',
              nb: 'Adresseforslag fra OpenStreetMap / Photon',
              it: 'Suggerimenti di indirizzi da OpenStreetMap / Photon',
            }[lang] || 'OpenStreetMap / Photon'}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
