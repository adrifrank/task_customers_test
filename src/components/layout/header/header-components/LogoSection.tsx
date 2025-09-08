import { LogoSectionProps } from '@/types/layout';

const LogoSection = ({ title }: LogoSectionProps) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">CRM</span>
      </div>
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
    </div>
  );
};

export default LogoSection;
