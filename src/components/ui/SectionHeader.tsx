import { SectionHeaderProps } from '@/types/ui';

export default function SectionHeader({
  title,
  description,
  className = 'mb-8',
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
    </div>
  );
}
