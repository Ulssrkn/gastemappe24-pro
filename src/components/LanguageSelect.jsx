import React from 'react';

const languages = [
  ['de', '🇩🇪 DE'],
  ['en', '🇬🇧 EN'],
  ['tr', '🇹🇷 TR'],
  ['fr', '🇫🇷 FR'],
  ['es', '🇪🇸 ES'],
  ['hr', '🇭🇷 HR'],
  ['sq', '🇦🇱 SQ'],
  ['sv', '🇸🇪 SV'],
  ['nb', '🇳🇴 NB'],
  ['it', '🇮🇹 IT'],
];

export default function LanguageSelect({ lang, onChange, label, className }) {
  return (
    <select
      value={lang}
      onChange={(event) => onChange(event.target.value)}
      aria-label={label}
      className={className}
    >
      {languages.map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
