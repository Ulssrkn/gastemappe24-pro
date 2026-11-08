import React from 'react';

const legalLinks = [
  ['legalNotice', import.meta.env.VITE_IMPRESSUM_URL],
  ['privacy', import.meta.env.VITE_PRIVACY_URL],
].filter(([, url]) => typeof url === 'string' && (/^https:\/\//i.test(url) || /^\/(?![\/\\])/.test(url)));

function LegalLinks({ copy, onCover = false }) {
  if (!legalLinks.length) return null;
  return <footer className={`relative z-10 flex flex-wrap gap-4 px-5 py-3 text-xs ${onCover ? "text-white" : ""}`}>
    {legalLinks.map(([key, url]) => <a className="underline" key={key} href={url}>{copy[key]}</a>)}
  </footer>;
}

export default LegalLinks;
