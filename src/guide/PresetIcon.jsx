import React from 'react';
import SolidIcon from './SolidIcon.jsx';

export const presetIconNames = ['Building','Ship','Mountain','Bed','Key','Utensils','Coffee','Waves','Sparkles','Compass','MapPin','Car','Phone','ShieldCheck','Wifi','Clock','Recycle','Award','Baby','Accessibility','ShoppingBag','Lock','Sun','Flame','Heart','Users'];

const renderSafeIconByName = (iconName, currentTheme) => {
  const themeClass = currentTheme ? currentTheme.text : 'text-slate-800';
  return <SolidIcon name={iconName} className={`h-5 w-5 ${themeClass}`} />;
};

export default renderSafeIconByName;
