import { LoadingSpinnerProps } from '@/types/ui';

export default function LoadingSpinner({
  size = 'md',
  text,
  className = '',
  centered = true,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const spinner = (
    <div className={`flex items-center space-x-2 text-gray-600 ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
      />
      {text && <span>{text}</span>}
    </div>
  );

  if (centered) {
    return <div className="flex justify-center py-8">{spinner}</div>;
  }

  return spinner;
}
