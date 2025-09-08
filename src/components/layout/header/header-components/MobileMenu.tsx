import Link from 'next/link';
import { navigationRoutes } from '@/config/routes';
import { MobileMenuProps } from '@/types/layout';

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-gray-200">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navigationRoutes.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
