import React from 'react';
import { CustomerWithId } from '@/types/customer';
import InfoItem from '@/components/ui/InfoItem';

const UserInfoCustomer = ({ customer }: { customer: CustomerWithId }) => {

  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate leading-tight">
        {customer.fullName}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 truncate mt-1">{customer.email}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
        <InfoItem icon="location">
          {customer.city}, {customer.country}
        </InfoItem>
        <InfoItem className="capitalize">
          {customer.gender.toLowerCase()}
        </InfoItem>
        <InfoItem icon="age">{customer.age} years</InfoItem>
      </div>
    </div>
  );
};

export default UserInfoCustomer;
