import Link from 'next/link';
import Icon from './Icon';

import { BackButtonProps } from '@/types/ui';

const BackButton = ({
  href,
  label = 'Back',
  className = '',
}: BackButtonProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      <Link
        href={href}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
      >
        <Icon name="arrowLeft" className="w-5 h-5 mr-2" />
        {label}
      </Link>
    </div>
  );
};

export default BackButton;
