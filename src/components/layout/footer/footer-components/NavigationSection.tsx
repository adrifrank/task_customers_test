import Link from 'next/link';
import { navigationRoutes } from '@/config/routes';

const NavigationSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
        Navigation
      </h3>
      <ul className="space-y-2">
        {navigationRoutes.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationSection;
