import React from 'react';
import Link from 'next/link';
import { generateRoute } from '@/config/routes';
import AvatarCustomer from './customer-card-info/AvatarCustomer';
import UserInfoCustomer from './customer-card-info/UserInfoCastomer';
import Icon from '@/components/ui/Icon';

import { CustomerCardProps } from '@/types/components';

export default function CustomerCard({ customer }: CustomerCardProps) {

  return (
    <Link
      href={generateRoute.customerDetails(customer.id)}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden h-full min-h-[140px] max-h-[180px]"
    >
      <div className="p-4 sm:p-6 h-full flex flex-col justify-center">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <AvatarCustomer customer={customer} />

          {/* User Info */}
          <UserInfoCustomer customer={customer} />

          {/* Arrow indicator */}
          <div className="flex-shrink-0 self-center">
            <Icon name="arrowRight" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
}
