import Icon from './Icon';
import { InfoItemProps } from '@/types/ui';

export default function InfoItem({
  icon,
  iconSize = 'w-3 h-3',
  children,
  className = 'flex items-center',
}: InfoItemProps) {
  return (
    <span className={className}>
      {icon && <Icon name={icon} className={`${iconSize} mr-1`} />}
      {children}
    </span>
  );
}
