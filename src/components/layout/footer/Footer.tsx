import CompanySection from './footer-components/CompanySection';
import NavigationSection from './footer-components/NavigationSection';
import SupportSection from './footer-components/SupportSection';
import FooterBottom from './footer-components/FooterBottom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CompanySection />
            <NavigationSection />
            <SupportSection />
          </div>
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
