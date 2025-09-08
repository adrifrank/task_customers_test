'use client';

import { useState } from 'react';
import LogoSection from './header-components/LogoSection';
import DesktopNavigation from './header-components/DesktopNavigation';
import MobileMenuButton from './header-components/MobileMenuButton';
import MobileMenu from './header-components/MobileMenu';

import { HeaderProps } from '@/types/layout';

export default function Header({ title = 'CRM Dashboard' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <LogoSection title={title} />
          <DesktopNavigation />
          <MobileMenuButton isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
        </div>
        <MobileMenu isOpen={isMenuOpen} />
      </div>
    </header>
  );
}
