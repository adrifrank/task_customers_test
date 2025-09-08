import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import CustomerCard from '@/app/dashboard/сomponents/customer-card/CustomerCard';
import { CustomerWithId } from '@/types/customer';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
};

// Mock customer data
const mockCustomer: CustomerWithId = {
  id: 'customer-1',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  gender: 'Male',
  country: 'USA',
  city: 'New York',
  state: 'NY',
  postCode: '10001',
  street: 'Main St',
  streetNumber: '123',
  age: 30,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John-Doe',
};

describe('CustomerCard', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockPush.mockClear();
  });

  it('should render customer information correctly', () => {
    render(<CustomerCard customer={mockCustomer} />);

    // Check if customer name is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Check if email is displayed
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();

    // Check if location is displayed (city, country format)
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
  });

  it('should display customer avatar', () => {
    render(<CustomerCard customer={mockCustomer} />);

    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockCustomer.avatar);
    expect(avatar).toHaveAttribute('alt', `${mockCustomer.fullName} avatar`);
  });

  it('should be clickable and navigate to customer details', () => {
    render(<CustomerCard customer={mockCustomer} />);

    const card = screen.getByRole('link');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('href', '/dashboard/customer-1');
  });

  it('should have proper accessibility attributes', () => {
    render(<CustomerCard customer={mockCustomer} />);

    const card = screen.getByRole('link');
    expect(card).toHaveAttribute('href', '/dashboard/customer-1');
  });

  it('should handle long names gracefully', () => {
    const longNameCustomer: CustomerWithId = {
      ...mockCustomer,
      firstName: 'VeryLongFirstName',
      lastName: 'VeryLongLastName',
      fullName: 'VeryLongFirstName VeryLongLastName',
    };

    render(<CustomerCard customer={longNameCustomer} />);

    expect(
      screen.getByText('VeryLongFirstName VeryLongLastName')
    ).toBeInTheDocument();
  });

  it('should handle long email addresses', () => {
    const longEmailCustomer: CustomerWithId = {
      ...mockCustomer,
      email: 'very.long.email.address@very-long-domain-name.com',
    };

    render(<CustomerCard customer={longEmailCustomer} />);

    expect(
      screen.getByText('very.long.email.address@very-long-domain-name.com')
    ).toBeInTheDocument();
  });

  it('should display different genders correctly', () => {
    const femaleCustomer: CustomerWithId = {
      ...mockCustomer,
      gender: 'Female',
      firstName: 'Jane',
      lastName: 'Smith',
      fullName: 'Jane Smith',
    };

    render(<CustomerCard customer={femaleCustomer} />);

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should handle customers from different countries', () => {
    const canadianCustomer: CustomerWithId = {
      ...mockCustomer,
      country: 'Canada',
      city: 'Toronto',
      state: 'ON',
    };

    render(<CustomerCard customer={canadianCustomer} />);

    expect(screen.getByText('Toronto, Canada')).toBeInTheDocument();
  });

  it('should render with proper CSS classes for styling', () => {
    const { container } = render(<CustomerCard customer={mockCustomer} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-sm');
  });

  it('should handle missing optional fields', () => {
    const minimalCustomer: CustomerWithId = {
      id: 'customer-2',
      firstName: 'Minimal',
      lastName: 'User',
      fullName: 'Minimal User',
      email: 'minimal@example.com',
      gender: 'Other',
      country: 'Unknown',
      city: 'Unknown',
      state: 'Unknown',
      postCode: '00000',
      street: 'Unknown',
      streetNumber: '0',
      age: 25,
    };

    render(<CustomerCard customer={minimalCustomer} />);

    expect(screen.getByText('Minimal User')).toBeInTheDocument();
    expect(screen.getByText('minimal@example.com')).toBeInTheDocument();
  });
});
