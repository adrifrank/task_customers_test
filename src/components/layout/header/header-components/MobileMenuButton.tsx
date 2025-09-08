import Icon from '@/components/ui/Icon';
import { MobileMenuButtonProps } from '@/types/layout';

const MobileMenuButton = ({ isMenuOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <div className="md:hidden">
      <button
        onClick={onToggle}
        className="p-2 text-gray-600 hover:text-gray-900"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <Icon name="hamburger" className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MobileMenuButton;
