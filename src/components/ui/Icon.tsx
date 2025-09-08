import { IconProps } from '@/types/ui';

// Object with all icons
const icons = {
  // Alert Icons
  error:
    'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z',
  warning:
    'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
  success:
    'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
  info: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z',

  // Navigation Icons (stroke)
  arrowLeft: 'M15 19l-7-7 7-7',
  arrowRight: 'M9 5l7 7-7 7',
  plus: 'M12 4v16m8-8H4',
  hamburger: 'M4 6h16M4 12h16M4 18h16',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  close: 'M6 18L18 6M6 6l12 12',
  email:
    'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  help: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',

  // Entity Icons (stroke)
  users:
    'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  location:
    'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  shoppingBag: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z',
  age: 'M8 7V3a4 4 0 118 0v4M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
};

// Configuration for different icon types
const iconConfig = {
  error: { viewBox: '0 0 20 20', fill: 'currentColor', stroke: 'none' },
  warning: { viewBox: '0 0 20 20', fill: 'currentColor', stroke: 'none' },
  success: { viewBox: '0 0 20 20', fill: 'currentColor', stroke: 'none' },
  info: { viewBox: '0 0 20 20', fill: 'currentColor', stroke: 'none' },
  arrowLeft: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  arrowRight: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  plus: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  hamburger: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  search: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  close: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  email: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  help: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  users: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  user: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  location: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  shoppingBag: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
  age: { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' },
};

const Icon = ({ name, className = 'h-5 w-5', size }: IconProps) => {
  const iconPath = icons[name as keyof typeof icons];
  const config = iconConfig[name as keyof typeof iconConfig];

  if (!iconPath || !config) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const style = size ? { width: size, height: size } : undefined;
  const isStroke = config.stroke === 'currentColor';

  return (
    <svg
      className={className}
      style={style}
      viewBox={config.viewBox}
      fill={config.fill}
      stroke={config.stroke}
    >
      <path
        strokeLinecap={isStroke ? 'round' : undefined}
        strokeLinejoin={isStroke ? 'round' : undefined}
        strokeWidth={isStroke ? 2 : undefined}
        fillRule={!isStroke ? 'evenodd' : undefined}
        clipRule={!isStroke ? 'evenodd' : undefined}
        d={iconPath}
      />
    </svg>
  );
};

export default Icon;
