/**
 * Customer data logic
 */
import {
  Customer,
  CustomerWithId,
  CustomerId,
  AvatarUrl,
  CustomerFilters,
} from '@/types/customer';

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await fetch('/customers.json');
  if (!response.ok) {
    throw new Error('Failed to load customers');
  }
  return response.json();
};

export const transformCustomerData = (
  customer: Customer,
  index: number
): CustomerWithId => {
  // Generate consistent age based on customer data (18-80 years)
  const nameHash =
    customer.firstName.length +
    customer.lastName.length +
    customer.email.length;
  const age = 18 + (nameHash % 62); // from 18 to 80 years

  return {
    ...customer,
    id: `customer-${index}` as CustomerId,
    fullName: `${customer.firstName} ${customer.lastName}`,
    avatar:
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.firstName}-${customer.lastName}` as AvatarUrl,
    age,
  };
};

export const transformCustomersData = (
  customers: Customer[]
): CustomerWithId[] => {
  return customers.map((customer, index) =>
    transformCustomerData(customer, index)
  );
};

export const findCustomerById = (
  customers: Customer[],
  customerId: string
): CustomerWithId | null => {
  // Extract index from customer-{index} format
  const customerIndex = parseInt(customerId.replace('customer-', ''));
  const customerData = customers[customerIndex];

  if (!customerData) {
    return null;
  }

  return transformCustomerData(customerData, customerIndex);
};

export const filterCustomers = (
  customers: CustomerWithId[],
  filters: CustomerFilters
): CustomerWithId[] => {
  return customers.filter(customer => {
    const matchesSearch =
      !filters.search ||
      customer.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
      customer.email.toLowerCase().includes(filters.search.toLowerCase());

    const matchesGender =
      filters.gender === 'all' || customer.gender === filters.gender;

    const matchesCountry =
      filters.country === 'all' || customer.country === filters.country;

    const matchesAge =
      !filters.ageRange ||
      !filters.ageRange.min ||
      !filters.ageRange.max ||
      (customer.age >= filters.ageRange.min &&
        customer.age <= filters.ageRange.max);

    return matchesSearch && matchesGender && matchesCountry && matchesAge;
  });
};

export const getUniqueCountries = (customers: CustomerWithId[]): string[] => {
  const countries = customers.map(customer => customer.country);
  return Array.from(new Set(countries)).sort();
};

export const paginateCustomers = (
  customers: CustomerWithId[],
  page: number,
  itemsPerPage: number
): CustomerWithId[] => {
  const startIndex = 0;
  const endIndex = page * itemsPerPage;
  return customers.slice(startIndex, endIndex);
};
