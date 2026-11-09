import React from 'react';
import {
  Accessibility,
  Award,
  Baby,
  Bed,
  Building,
  Car,
  Clock,
  Coffee,
  Compass,
  Flame,
  Heart,
  Info,
  Key,
  Lock,
  MapPin,
  Phone,
  Recycle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  Users,
  Utensils,
  Waves,
  Wifi,
} from 'lucide-react';

export const presetIconNames = ['Building','Bed','Key','Utensils','Coffee','Waves','Sparkles','Compass','MapPin','Car','Phone','ShieldCheck','Wifi','Clock','Recycle','Award','Baby','Accessibility','ShoppingBag','Lock','Sun','Flame','Heart','Users'];

const renderSafeIconByName = (iconName, currentTheme) => {
  const themeClass = currentTheme ? currentTheme.text : 'text-slate-800';
  const className = `w-5 h-5 ${themeClass}`;
  switch (iconName) {
    case 'Building':
      return <Building className={className} />;
    case 'Bed':
      return <Bed className={className} />;
    case 'Key':
      return <Key className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Waves':
      return <Waves className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Phone':
      return <Phone className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Wifi':
      return <Wifi className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'Recycle':
      return <Recycle className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Baby':
      return <Baby className={className} />;
    case 'Accessibility':
      return <Accessibility className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'Lock':
      return <Lock className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    case 'Users':
      return <Users className={className} />;
    default:
      return <Info className={className} />;
  }
};

export default renderSafeIconByName;
