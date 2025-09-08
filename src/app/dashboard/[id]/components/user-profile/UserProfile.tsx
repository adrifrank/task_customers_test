import { CustomerWithId } from '@/types/customer';
import PersonalInfo from './user-info/Personalnfo';
import AddressInfo from './user-info/AddressInfo';
import FullAddressCard from './user-info/FullAdressCard';
import UserHeader from './user-info/UserHeader';
import { UserProfileProps } from '@/types/components';

export default function UserProfile({ customer }: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header with Avatar */}
      <UserHeader customer={customer} />

      {/* Details Grid */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <PersonalInfo customer={customer} />
          {/* Address Information */}
          <AddressInfo customer={customer} />
        </div>

        {/* Full Address Card */}
        <FullAddressCard customer={customer} />
      </div>
    </div>
  );
}
