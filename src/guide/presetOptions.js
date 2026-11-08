export const OTHER_CUSTOM='OTHER_CUSTOM';
export const customTextLabels={de:'Sonstiges – Eigener Text',en:'Other – Custom Text',tr:'Diğer – Özel Metin',fr:'Autre – Texte personnalisé',es:'Otro – Texto personalizado',cs:'Jiné – Vlastní text',sq:'Tjetër – Tekst personal',sv:'Annat – Egen text',nb:'Annet – Egendefinert tekst',it:'Altro – Testo personalizzato'};
export const customTextFieldLabels={de:'Eigener Text (wird nicht übersetzt)',en:'Custom text (not translated)',tr:'Özel metin (çevrilmez)',fr:'Texte personnalisé (non traduit)',es:'Texto personalizado (no se traduce)',cs:'Vlastní text (nepřekládá se)',sq:'Tekst personal (nuk përkthehet)',sv:'Egen text (översätts inte)',nb:'Egendefinert tekst (oversettes ikke)',it:'Testo personalizzato (non tradotto)'};
export const optionId=o=>typeof o==='string'?o:o.id;
export const optionLabel=(o,lang)=>typeof o==='string'?o:((o.label&&(o.label[lang]||o.label.de))||o.id);
export const getFieldOptions=f=>[...(Array.isArray(f?.options)?f.options:[]).filter(o=>optionId(o)!==OTHER_CUSTOM),{id:OTHER_CUSTOM,label:customTextLabels}];
