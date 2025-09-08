import Icon from '@/components/ui/Icon';
import { ContactItemProps } from '@/types/layout';

const ContactItem = ({ icon, text }: ContactItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-gray-600 text-sm">{text}</span>
    </div>
  );
};

const SupportSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
        Support
      </h3>
      <div className="space-y-2">
        <ContactItem
          icon={<Icon name="email" className="h-4 w-4 text-gray-400" />}
          text="support@crm-dashboard.com"
        />
        <ContactItem
          icon={<Icon name="help" className="h-4 w-4 text-gray-400" />}
          text="Help Center"
        />
      </div>
    </div>
  );
};

export default SupportSection;
