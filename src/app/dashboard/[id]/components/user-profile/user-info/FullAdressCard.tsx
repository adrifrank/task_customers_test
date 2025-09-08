import React from 'react';
import { CustomerWithId } from '@/types/customer';

const FullAddressCard = ({ customer }: { customer: CustomerWithId }) => {
  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Full Address:</h4>
      <p className="text-gray-900">
        {customer.streetNumber} {customer.street}
        <br />
        {customer.city}, {customer.state} {customer.postCode}
        <br />
        {customer.country}
      </p>
    </div>
  );
};

export default FullAddressCard;
