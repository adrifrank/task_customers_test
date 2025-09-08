import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerList from '@/app/dashboard/сomponents/customer-list/CustomerList';
import { CustomerWithId } from '@/types/customer';

// Mock components
jest.mock('../../app/dashboard/сomponents/customer-card/CustomerCard', () => {
  return function MockCustomerCard({ customer }: { customer: CustomerWithId }) {
    return (
      <div data-testid={`customer-card-${customer.id}`}>
        {customer.fullName}
      </div>
    );
  };
});

jest.mock('../../components/ui/InfiniteScroll', () => {
  return function MockInfiniteScroll({
    hasMore,
    loading,
    onLoadMore,
    itemCount,
  }: {
    hasMore: boolean;
    loading: boolean;
    onLoadMore: () => void;
    itemCount: number;
  }) {
    return (
      <div data-testid="infinite-scroll">
        <div>hasMore: {hasMore.toString()}</div>
        <div>loading: {loading.toString()}</div>
        <div>itemCount: {itemCount}</div>
        <button onClick={onLoadMore}>Load More</button>
      </div>
    );
  };
});

// Mock customer data
const mockCustomers: CustomerWithId[] = [
  {
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
  },
  {
    id: 'customer-2',
    firstName: 'Jane',
    lastName: 'Smith',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    gender: 'Female',
    country: 'Canada',
    city: 'Toronto',
    state: 'ON',
    postCode: 'M5V 3A1',
    street: 'Queen St',
    streetNumber: '456',
    age: 25,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane-Smith',
  },
];

describe('CustomerList', () => {
  const mockOnLoadMore = jest.fn();

  beforeEach(() => {
    mockOnLoadMore.mockClear();
  });

  it('should render customer cards when customers are provided', () => {
    render(
      <CustomerList
        customers={mockCustomers}
        loading={false}
        hasMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(screen.getByTestId('customer-card-customer-1')).toBeInTheDocument();
    expect(screen.getByTestId('customer-card-customer-2')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should show "No customers found" message when customers array is empty and not loading', () => {
    render(
      <CustomerList
        customers={[]}
        loading={false}
        hasMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(screen.getByText('No customers found')).toBeInTheDocument();
    expect(
      screen.getByText('Try adjusting your search criteria or filters.')
    ).toBeInTheDocument();
  });

  it('should not show "No customers found" message when loading', () => {
    render(
      <CustomerList
        customers={[]}
        loading={true}
        hasMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(screen.queryByText('No customers found')).not.toBeInTheDocument();
  });

  it('should render InfiniteScroll component with correct props', () => {
    render(
      <CustomerList
        customers={mockCustomers}
        loading={false}
        hasMore={true}
        onLoadMore={mockOnLoadMore}
      />
    );

    const infiniteScroll = screen.getByTestId('infinite-scroll');
    expect(infiniteScroll).toBeInTheDocument();
    expect(screen.getByText('hasMore: true')).toBeInTheDocument();
    expect(screen.getByText('loading: false')).toBeInTheDocument();
    expect(screen.getByText('itemCount: 2')).toBeInTheDocument();
  });

  it('should pass loading state to InfiniteScroll', () => {
    render(
      <CustomerList
        customers={mockCustomers}
        loading={true}
        hasMore={true}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(screen.getByText('loading: true')).toBeInTheDocument();
  });

  it('should pass hasMore state to InfiniteScroll', () => {
    render(
      <CustomerList
        customers={mockCustomers}
        loading={false}
        hasMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(screen.getByText('hasMore: false')).toBeInTheDocument();
  });

  it('should render customers in a grid layout', () => {
    const { container } = render(
      <CustomerList
        customers={mockCustomers}
        loading={false}
        hasMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass(
      'grid-cols-1',
      'sm:grid-cols-2',
      'lg:grid-cols-3',
      'xl:grid-cols-4',
      '2xl:grid-cols-5'
    );
  });

  it('should handle empty customers array with proper grid structure', () => {
    render(
      <CustomerList
        customers={[]}
        loading={true}
        hasMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Should render InfiniteScroll even with empty customers when loading
    expect(screen.getByTestId('infinite-scroll')).toBeInTheDocument();
  });

  it('should render correct number of customer cards', () => {
    const manyCustomers: CustomerWithId[] = Array.from(
      { length: 10 },
      (_, i) => ({
        ...mockCustomers[0],
        id: `customer-${i}` as `customer-${number}`,
        fullName: `Customer ${i}`,
      })
    );

    render(
      <CustomerList
        customers={manyCustomers}
        loading={false}
        hasMore={true}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Should render all 10 customer cards
    for (let i = 0; i < 10; i++) {
      expect(
        screen.getByTestId(`customer-card-customer-${i}`)
      ).toBeInTheDocument();
    }
  });

  it('should have proper accessibility structure', () => {
    render(
      <CustomerList
        customers={mockCustomers}
        loading={false}
        hasMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    const container = screen.getByTestId('infinite-scroll').parentElement;
    expect(container).toHaveClass('space-y-4');
  });
});
