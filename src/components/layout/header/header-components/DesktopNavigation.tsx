import Link from 'next/link';
import { navigationRoutes } from '@/config/routes';

const DesktopNavigation = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigationRoutes.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
