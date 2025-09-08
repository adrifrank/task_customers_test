import React, { ReactNode } from 'react';
import InfoRow from './InfoRow';

import { InfoSectionProps } from '@/types/ui';

const InfoSection = ({
  title,
  icon,
  fields,
  iconColor = 'text-blue-600',
  formatData,
}: InfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-medium text-gray-900 flex items-center`}>
        <span className={`w-5 h-5 mr-2 ${iconColor}`}>{icon}</span>
        {title}
      </h3>

      <div className="space-y-3">
        {fields.map(field => (
          <InfoRow
            key={field.label}
            label={field.label}
            value={
              field.formatter
                ? field.formatter(field.value, formatData)
                : field.value
            }
          />
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
