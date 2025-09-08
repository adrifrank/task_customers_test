import React from 'react';
import { CustomerWithId } from '@/types/customer';
import InfoSection from '@/components/ui/InfoSection';
import Icon from '@/components/ui/Icon';

const PersonalInfo = ({ customer }: { customer: CustomerWithId }) => {
  // Configuration of fields for display
  const personalFields = [
    { label: 'First Name', value: customer.firstName },
    { label: 'Last Name', value: customer.lastName },
    { label: 'Email', value: customer.email },
    {
      label: 'Gender',
      value:
        customer.gender.toLowerCase().charAt(0).toUpperCase() +
        customer.gender.toLowerCase().slice(1),
    },
    {
      label: 'Age',
      value: `${customer.age} years`,
    },
  ];

  return (
    <InfoSection
      title="Personal Details"
      icon={<Icon name="user" />}
      fields={personalFields}
      iconColor="text-blue-600"
    />
  );
};

export default PersonalInfo;
