import Link from 'next/link';
import { footerRoutes } from '@/config/routes';

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-200 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-500 text-sm">
          © {currentYear} CRM Dashboard. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-2 md:mt-0">
          {footerRoutes.legal.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-500 hover:text-gray-900 text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
