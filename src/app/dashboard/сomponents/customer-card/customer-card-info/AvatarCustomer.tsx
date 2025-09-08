import React from 'react';
import { CustomerWithId } from '@/types/customer';

const AvatarCustomer = ({ customer }: { customer: CustomerWithId }) => {

  return (
    <div className="flex-shrink-0">
      <img
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
        src={customer.avatar}
        alt={`${customer.fullName} avatar`}
        loading="lazy"
      />
    </div>
  );
};

export default AvatarCustomer;
