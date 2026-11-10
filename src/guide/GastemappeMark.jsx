import React from 'react';

export default function GastemappeMark({ className = 'h-5 w-5', currentTheme }) {
  const themeClass = currentTheme ? currentTheme.text : 'text-slate-800';
  return (
    <svg viewBox="8 8 84 86" className={className + ' ' + themeClass} aria-hidden="true">
      <path fill="currentColor" opacity="0.36" d="M15 19 45 31V76L38 70 15 63Z" />
      <path fill="currentColor" opacity="0.68" d="M51 31 79 14 85 18V62L62 72 51 80Z" />
      <path fill="currentColor" d="M15 69 37 75 48 84 62 77 85 68V75L48 92 15 76Z" />
    </svg>
  );
}
