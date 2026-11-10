import React from 'react';

export default function GastemappeMark({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M3.5 10 13 6l10 3 13-4v25l-13 4-10-3-9.5 4V10Z" fill="#dceee7" stroke="#12312e" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13 6v25M23 9v25" fill="none" stroke="#12312e" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24.5 5.5c-5.1 0-8.4 3.5-8.4 8 0 5.1 8.4 12.8 8.4 12.8s8.4-7.7 8.4-12.8c0-4.5-3.3-8-8.4-8Z" fill="#e7b34c" stroke="#12312e" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="24.5" cy="13.4" r="2.8" fill="#fffdf8" />
    </svg>
  );
}
