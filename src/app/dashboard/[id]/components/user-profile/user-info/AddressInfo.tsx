import React from 'react';
import { CustomerWithId } from '@/types/customer';
import InfoSection from '@/components/ui/InfoSection';
import Icon from '@/components/ui/Icon';

const AddressInfo = ({ customer }: { customer: CustomerWithId }) => {
  // Configuration of address fields for display
  const addressFields = [
    {
      label: 'Street',
      value: `${customer.streetNumber} ${customer.street}`,
    },
    { label: 'City', value: customer.city },
    { label: 'State', value: customer.state },
    { label: 'Post Code', value: customer.postCode },
    { label: 'Country', value: customer.country },
  ];

  return (
    <InfoSection
      title="Address"
      icon={<Icon name="location" />}
      fields={addressFields}
      iconColor="text-green-600"
    />
  );
};

export default AddressInfo;
