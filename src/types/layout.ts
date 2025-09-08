import { ReactNode } from 'react';

// Header Components
export interface HeaderProps {
  title?: string;
}

export interface LogoSectionProps {
  title: string;
}

export interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  onToggle: () => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
}

// Footer Components
export interface ContactItemProps {
  icon: ReactNode;
  text: string;
}
