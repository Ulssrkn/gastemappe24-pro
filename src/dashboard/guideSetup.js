import { categoryPresets } from '../guide/presetCatalog.js';
import { quickAccessDefaults } from '../guide/guideContent.js';

export default function getGuideSetup(hotel, categories) {
  const normalizedHotelName = (hotel.name || '').trim();
  const setupHasName =
    normalizedHotelName.length > 2 &&
    !/^(boutique hotel & suites|meine unterkunft|neue unterkunft|unbenannte unterkunft)$/i.test(
      normalizedHotelName
    );
  const setupHasContact = [hotel.phone, hotel.email].some((value) => {
    const text = (value || '').trim();
    return text.length > 5 && !/^(\+49\s?123\s?456789|info@meine-unterkunft\.de)$/i.test(text);
  });
  const setupHasProfile = setupHasName && setupHasContact && Boolean((hotel.address || '').trim());
  const defaultExampleImages = ['photo-1566073771259', 'photo-1582719478250'];
  const hasAccommodationPhoto =
    Array.isArray(hotel.images) &&
    hotel.images.some(
      (image) => image && !defaultExampleImages.some((example) => String(image).includes(example))
    );
  const isQuickCardCustomized = (cardId) =>
    Object.entries(hotel.quickAccessContent || {}).some(([language, cards]) => {
      const current = cards?.[cardId];
      const defaults = quickAccessDefaults[language]?.[cardId] || quickAccessDefaults.de[cardId];
      return (
        current &&
        ['title', 'description'].some(
          (key) => String(current[key] || '').trim() !== String(defaults[key] || '').trim()
        )
      );
    });
  const quickAccessReadyCount = [
    {
      enabled: hotel.showWifi !== false,
      ready:
        ((hotel.wifiSsid || '').trim() &&
          (hotel.wifiPass || '').trim() &&
          hotel.wifiSsid !== 'Guest_WiFi' &&
          hotel.wifiPass !== 'welcome2026') ||
        (isQuickCardCustomized('wifi') && (hotel.wifiSsid || '').trim() && (hotel.wifiPass || '').trim()),
    },
    {
      enabled: hotel.showParking !== false,
      ready:
        ((hotel.parkingInfo || '').trim() &&
          hotel.parkingInfo !== 'Kostenfreie Parkplätze am Haus verfügbar.') ||
        isQuickCardCustomized('parking'),
    },
    {
      enabled: hotel.showBreakfast !== false,
      ready:
        ((hotel.breakfastTime || '').trim() && hotel.breakfastTime !== '07:30 - 10:30 Uhr') ||
        isQuickCardCustomized('breakfast'),
    },
    {
      enabled: hotel.showCheckInOut !== false,
      ready:
        ((hotel.checkInOut || '').trim() && hotel.checkInOut !== 'Check-in: ab 15:00 | Check-out: bis 11:00') ||
        isQuickCardCustomized('checkin'),
    },
  ].filter((card) => card.enabled && card.ready).length;
  const hasConfiguredQuickAccess = quickAccessReadyCount >= 2;
  const isMeaningfulGuideSection = (category) => {
    const preset = category?.presetData || categoryPresets.find((item) => item.id === category?.presetId);
    const fieldValues = category?.fieldValues || {};
    const hasChangedPresetField = (preset?.schema || []).some((field) => {
      const value = fieldValues[field.key];
      if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0))
        return false;
      return field.default === undefined || JSON.stringify(value) !== JSON.stringify(field.default);
    });
    const hasUsefulCard = (Array.isArray(fieldValues.contentCards) ? fieldValues.contentCards : []).some(
      (card) =>
        String(card.title || '').trim() &&
        (['description', 'address', 'url', 'phone', 'hours'].some((key) => String(card[key] || '').trim()) ||
          Object.values(card.descriptionTranslations || {}).some((value) => String(value || '').trim()))
    );
    const hasDescription = String(category?.customText || '').trim().length >= 20;
    return hasChangedPresetField || hasUsefulCard || hasDescription;
  };
  const configuredGuideSectionCount = (Array.isArray(categories) ? categories : []).filter(
    isMeaningfulGuideSection
  ).length;
  const hasFiveGuideSections = configuredGuideSectionCount >= 5;
  const setupSteps = [
    { target: 'editor-property-profile', done: setupHasProfile },
    { target: 'editor-logo', done: Boolean(hotel.logoUrl) },
    { target: 'editor-photos', done: hasAccommodationPhoto },
    { target: 'editor-quick-access', done: hasConfiguredQuickAccess },
    { target: 'editor-guest-sections', done: hasFiveGuideSections },
  ];
  const setupCompletedCount = setupSteps.filter((step) => step.done).length;
  const setupProgress = Math.round((setupCompletedCount / setupSteps.length) * 100);
  return { setupSteps, setupCompletedCount, setupProgress };
}
