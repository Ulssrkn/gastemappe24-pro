import { categoryPresets, mainCategories } from './presetCatalog.js';

export default function groupCategories(categories, lang) {
  return (categories || []).reduce((acc, cat) => {
    if (!cat) return acc;
    const normalizedCategoryId =
      cat.categoryId === 'cat_sustainability' || cat.categoryId === 'cat_certificates'
        ? 'cat_safety'
        : cat.categoryId;
    const mainCatObj = mainCategories.find((mc) => mc.id === normalizedCategoryId) || mainCategories[0];
    const groupName = mainCatObj.name[lang] || mainCatObj.name.de;
    if (!acc[groupName]) acc[groupName] = [];
    const presetData = categoryPresets.find((p) => p.id === cat.presetId);
    acc[groupName].push({ ...cat, presetData, mainCatObj });
    return acc;
  }, {});
}
