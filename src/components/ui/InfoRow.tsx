import { InfoRowProps } from '@/types/ui';

const InfoRow = ({ label, value, className = '' }: InfoRowProps) => {
  return (
    <div className={`flex justify-between ${className}`}>
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
};

export default InfoRow;
