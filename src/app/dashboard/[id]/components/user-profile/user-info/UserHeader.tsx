import React from 'react';
import { CustomerWithId } from '@/types/customer';
import InfoItem from '@/components/ui/InfoItem';

const UserHeader = ({ customer }: { customer: CustomerWithId }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
      <div className="flex items-center space-x-6">
        <img
          className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
          src={customer.avatar}
          alt={`${customer.fullName} avatar`}
        />
        <div className="text-white">
          <h1 className="text-3xl font-bold">{customer.fullName}</h1>
          <p className="text-blue-100 text-lg">{customer.email}</p>
          <div className="mt-2 flex items-center space-x-4 text-sm text-blue-100">
            <InfoItem icon="location" iconSize="w-4 h-4">
              {customer.city}, {customer.country}
            </InfoItem>
            <InfoItem className="capitalize">
              {customer.gender.toLowerCase()}
            </InfoItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
