import { useEffect, useState } from 'react';

export default function useGuideWeather(hotel, lang) {
  const [weather, setWeather] = useState({ status: 'loading', temperature: null, code: null, place: '' });
  const weatherLabels = {
    de: {
      loading: 'Wetter wird geladen …',
      missing: 'Hotelstandort fehlt',
      unavailable: 'Wetterdaten derzeit nicht verfügbar',
      clear: 'Klar',
      mainlyClear: 'Überwiegend klar',
      partlyCloudy: 'Teilweise bewölkt',
      overcast: 'Bedeckt',
      fog: 'Nebel',
      drizzle: 'Nieselregen',
      rain: 'Regen',
      snow: 'Schnee',
      showers: 'Regenschauer',
      snowShowers: 'Schneeschauer',
      storm: 'Gewitter',
    },
    en: {
      loading: 'Loading weather …',
      missing: 'Hotel location missing',
      unavailable: 'Weather data currently unavailable',
      clear: 'Clear',
      mainlyClear: 'Mainly clear',
      partlyCloudy: 'Partly cloudy',
      overcast: 'Overcast',
      fog: 'Fog',
      drizzle: 'Drizzle',
      rain: 'Rain',
      snow: 'Snow',
      showers: 'Rain showers',
      snowShowers: 'Snow showers',
      storm: 'Thunderstorm',
    },
    tr: {
      loading: 'Hava durumu yükleniyor …',
      missing: 'Otel konumu eksik',
      unavailable: 'Hava durumu bilgisi şu anda alınamıyor',
      clear: 'Açık',
      mainlyClear: 'Çoğunlukla açık',
      partlyCloudy: 'Parçalı bulutlu',
      overcast: 'Kapalı',
      fog: 'Sis',
      drizzle: 'Çiseleme',
      rain: 'Yağmur',
      snow: 'Kar',
      showers: 'Sağanak',
      snowShowers: 'Kar sağanağı',
      storm: 'Gök gürültülü fırtına',
    },
    fr: {
      loading: 'Chargement de la météo …',
      missing: 'Emplacement de l’hôtel manquant',
      unavailable: 'Météo actuellement indisponible',
      clear: 'Dégagé',
      mainlyClear: 'Plutôt dégagé',
      partlyCloudy: 'Partiellement nuageux',
      overcast: 'Couvert',
      fog: 'Brouillard',
      drizzle: 'Bruine',
      rain: 'Pluie',
      snow: 'Neige',
      showers: 'Averses',
      snowShowers: 'Averses de neige',
      storm: 'Orage',
    },
    hr: {
      loading: 'Učitavanje vremena …',
      missing: 'Nedostaje lokacija hotela',
      unavailable: 'Vremenski podaci trenutno nisu dostupni',
      clear: 'Vedro',
      mainlyClear: 'Pretežno vedro',
      partlyCloudy: 'Djelomično oblačno',
      overcast: 'Oblačno',
      fog: 'Magla',
      drizzle: 'Rosulja',
      rain: 'Kiša',
      snow: 'Snijeg',
      showers: 'Pljuskovi',
      snowShowers: 'Snježni pljuskovi',
      storm: 'Grmljavinska oluja',
    },
    it: {
      loading: 'Caricamento meteo …',
      missing: 'Posizione dell’hotel mancante',
      unavailable: 'Dati meteo momentaneamente non disponibili',
      clear: 'Sereno',
      mainlyClear: 'Prevalentemente sereno',
      partlyCloudy: 'Parzialmente nuvoloso',
      overcast: 'Coperto',
      fog: 'Nebbia',
      drizzle: 'Pioviggine',
      rain: 'Pioggia',
      snow: 'Neve',
      showers: 'Rovesci',
      snowShowers: 'Rovesci di neve',
      storm: 'Temporale',
    },
    es: {
      loading: 'Cargando el tiempo …',
      missing: 'Falta la ubicación del hotel',
      unavailable: 'Datos meteorológicos no disponibles',
      clear: 'Despejado',
      mainlyClear: 'Mayormente despejado',
      partlyCloudy: 'Parcialmente nublado',
      overcast: 'Cubierto',
      fog: 'Niebla',
      drizzle: 'Llovizna',
      rain: 'Lluvia',
      snow: 'Nieve',
      showers: 'Chubascos',
      snowShowers: 'Chubascos de nieve',
      storm: 'Tormenta',
    },
    sv: {
      loading: 'Laddar väder …',
      missing: 'Hotellets plats saknas',
      unavailable: 'Väderdata är inte tillgängliga just nu',
      clear: 'Klart',
      mainlyClear: 'Mestadels klart',
      partlyCloudy: 'Växlande molnighet',
      overcast: 'Mulet',
      fog: 'Dimma',
      drizzle: 'Duggregn',
      rain: 'Regn',
      snow: 'Snö',
      showers: 'Regnskurar',
      snowShowers: 'Snöbyar',
      storm: 'Åska',
    },
    no: {
      loading: 'Laster vær …',
      missing: 'Hotellets plassering mangler',
      unavailable: 'Værdata er ikke tilgjengelig nå',
      clear: 'Klart',
      mainlyClear: 'For det meste klart',
      partlyCloudy: 'Delvis skyet',
      overcast: 'Overskyet',
      fog: 'Tåke',
      drizzle: 'Yr',
      rain: 'Regn',
      snow: 'Snø',
      showers: 'Regnbyger',
      snowShowers: 'Snøbyger',
      storm: 'Tordenvær',
    },
    sq: {
      loading: 'Po ngarkohet moti …',
      missing: 'Mungon vendndodhja e hotelit',
      unavailable: 'Të dhënat e motit nuk janë të disponueshme',
      clear: 'Kthjellët',
      mainlyClear: 'Kryesisht kthjellët',
      partlyCloudy: 'Pjesërisht me re',
      overcast: 'Vranët',
      fog: 'Mjegull',
      drizzle: 'Shi i imët',
      rain: 'Shi',
      snow: 'Borë',
      showers: 'Rrebeshe',
      snowShowers: 'Rrebeshe bore',
      storm: 'Stuhi',
    },
  };
  const getWeatherDescription = (code, labels) => {
    if (code === 0) return labels.clear;
    if (code === 1) return labels.mainlyClear;
    if (code === 2) return labels.partlyCloudy;
    if (code === 3) return labels.overcast;
    if ([45, 48].includes(code)) return labels.fog;
    if ([51, 53, 55, 56, 57].includes(code)) return labels.drizzle;
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
      return [80, 81, 82].includes(code) ? labels.showers : labels.rain;
    if ([71, 73, 75, 77].includes(code)) return labels.snow;
    if ([85, 86].includes(code)) return labels.snowShowers;
    if ([95, 96, 99].includes(code)) return labels.storm;
    return labels.unavailable;
  };
  useEffect(() => {
    const address = (hotel.address || '').trim();
    const fallbackLocation = (hotel.locationTitle || '').trim();
    const isExampleAddress = /Musterstraße 1|12345 Musterstadt/i.test(address);
    const searchTerms = [
      ...new Set(
        [address, fallbackLocation].filter((value) => value && !/Musterstraße 1|12345 Musterstadt/i.test(value))
      ),
    ];
    if ((!address || isExampleAddress) && !fallbackLocation) {
      setWeather({ status: 'missing', temperature: null, code: null, place: '' });
      return;
    }
    const controller = new AbortController();
    setWeather({ status: 'loading', temperature: null, code: null, place: '' });
    const loadWeather = async () => {
      try {
        let place = null;
        for (const term of searchTerms) {
          const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(term)}&count=5&language=${lang === 'tr' ? 'tr' : lang === 'de' ? 'de' : 'en'}&format=json`,
            { signal: controller.signal }
          );
          if (!geoResponse.ok) continue;
          const geoData = await geoResponse.json();
          const results = geoData.results || [];
          const normalizedTerm = term.toLocaleLowerCase();
          place =
            results.find(
              (item) =>
                normalizedTerm.includes((item.name || '').toLocaleLowerCase()) ||
                (item.name || '').toLocaleLowerCase().includes(normalizedTerm)
            ) ||
            results[0] ||
            null;
          if (place) break;
        }
        if (!place) throw new Error('Hotel location not found');
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code&timezone=auto`,
          { signal: controller.signal }
        );
        if (!weatherResponse.ok) throw new Error('Weather request failed');
        const weatherData = await weatherResponse.json();
        if (
          typeof weatherData.current?.temperature_2m !== 'number' ||
          typeof weatherData.current?.weather_code !== 'number'
        )
          throw new Error('Weather data incomplete');
        setWeather({
          status: 'ready',
          temperature: Math.round(weatherData.current.temperature_2m),
          code: weatherData.current.weather_code,
          place: [place.name, place.admin1, place.country].filter(Boolean).join(', '),
        });
      } catch (error) {
        if (error.name !== 'AbortError')
          setWeather({ status: 'unavailable', temperature: null, code: null, place: '' });
      }
    };
    loadWeather();
    return () => controller.abort();
  }, [hotel.address, lang]);
  return { weather, weatherLabels, getWeatherDescription };
}
