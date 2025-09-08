// Types for users
export type CustomerId = `customer-${number}`;
export type Gender = 'Male' | 'Female' | 'Other' | 'Fluid';
export type Email = `${string}@${string}.${string}`;
export type AvatarUrl = `https://${string}`;

export interface Customer {
  firstName: string;
  lastName: string;
  email: Email;
  gender: Gender;
  country: string;
  city: string;
  state: string;
  postCode: string;
  street: string;
  streetNumber: string;
}

export interface CustomerWithId extends Customer {
  id: CustomerId;
  fullName: string;
  avatar?: AvatarUrl;
  age: number;
}

export interface CustomerFilters {
  search?: string;
  gender?: Gender | 'all';
  country?: string | 'all';
  ageRange?: {
    min: number;
    max: number;
  };
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface CustomerListState {
  customers: CustomerWithId[];
  filteredCustomers: CustomerWithId[];
  filters: CustomerFilters;
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
}
