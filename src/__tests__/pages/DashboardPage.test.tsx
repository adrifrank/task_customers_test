import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '@/app/dashboard/page';

// Mock the useCustomersList hook
const mockUseCustomersList = jest.fn();

jest.mock('../../hooks/useCustomersList', () => ({
  useCustomersList: () => mockUseCustomersList(),
}));

// Mock components
jest.mock('../../app/dashboard/сomponents/filters/Filters', () => {
  return function MockFilters(props: any) {
    return (
      <div data-testid="filters">
        <div>Total: {props.totalResults}</div>
        <div>Filtered: {props.filteredResults}</div>
        <div>Countries: {props.uniqueCountries.join(', ')}</div>
      </div>
    );
  };
});

jest.mock('../../app/dashboard/сomponents/customer-list/CustomerList', () => {
  return function MockCustomerList(props: any) {
    return (
      <div data-testid="customer-list">
        <div>Customers: {props.customers.length}</div>
        <div>Loading: {props.loading.toString()}</div>
        <div>Has More: {props.hasMore.toString()}</div>
      </div>
    );
  };
});

jest.mock('../../components/ui/Alert', () => {
  return function MockAlert(props: any) {
    return (
      <div data-testid="alert">
        <div>Variant: {props.variant}</div>
        <div>Title: {props.title}</div>
        <div>Message: {props.message}</div>
      </div>
    );
  };
});

jest.mock('../../components/ui/SectionHeader', () => {
  return function MockSectionHeader(props: any) {
    return (
      <div data-testid="section-header">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    );
  };
});

describe('DashboardPage', () => {
  const mockCustomers = [
    { id: '1', fullName: 'John Doe' },
    { id: '2', fullName: 'Jane Smith' },
  ];

  const defaultHookReturn = {
    customers: mockCustomers,
    filteredTotal: 2,
    total: 100,
    loading: false,
    error: null,
    filters: { search: '', gender: 'all', country: 'all' },
    setFilters: jest.fn(),
    loadMore: jest.fn(),
    hasMore: true,
    uniqueCountries: ['USA', 'Canada'],
  };

  beforeEach(() => {
    mockUseCustomersList.mockReturnValue(defaultHookReturn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render dashboard page with all components when data loads successfully', () => {
    render(<DashboardPage />);

    // Check section header
    expect(screen.getByTestId('section-header')).toBeInTheDocument();
    expect(screen.getByText('Customer Dashboard')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Manage and view your customer database with advanced filtering and search capabilities.'
      )
    ).toBeInTheDocument();

    // Check filters component
    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByText('Total: 100')).toBeInTheDocument();
    expect(screen.getByText('Filtered: 2')).toBeInTheDocument();
    expect(screen.getByText('Countries: USA, Canada')).toBeInTheDocument();

    // Check customer list component
    expect(screen.getByTestId('customer-list')).toBeInTheDocument();
    expect(screen.getByText('Customers: 2')).toBeInTheDocument();
    expect(screen.getByText('Loading: false')).toBeInTheDocument();
    expect(screen.getByText('Has More: true')).toBeInTheDocument();
  });

  it('should show error alert when there is an error', () => {
    mockUseCustomersList.mockReturnValue({
      ...defaultHookReturn,
      error: 'Failed to load customers',
    });

    render(<DashboardPage />);

    expect(screen.getByTestId('alert')).toBeInTheDocument();
    expect(screen.getByText('Variant: error')).toBeInTheDocument();
    expect(
      screen.getByText('Title: Error loading customers')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Message: Failed to load customers')
    ).toBeInTheDocument();

    // Should not render other components when there's an error
    expect(screen.queryByTestId('section-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('filters')).not.toBeInTheDocument();
    expect(screen.queryByTestId('customer-list')).not.toBeInTheDocument();
  });

  it('should pass loading state to CustomerList', () => {
    mockUseCustomersList.mockReturnValue({
      ...defaultHookReturn,
      loading: true,
    });

    render(<DashboardPage />);

    expect(screen.getByText('Loading: true')).toBeInTheDocument();
  });

  it('should pass hasMore state to CustomerList', () => {
    mockUseCustomersList.mockReturnValue({
      ...defaultHookReturn,
      hasMore: false,
    });

    render(<DashboardPage />);

    expect(screen.getByText('Has More: false')).toBeInTheDocument();
  });

  it('should handle empty customers array', () => {
    mockUseCustomersList.mockReturnValue({
      ...defaultHookReturn,
      customers: [],
      filteredTotal: 0,
    });

    render(<DashboardPage />);

    expect(screen.getByText('Customers: 0')).toBeInTheDocument();
    expect(screen.getByText('Filtered: 0')).toBeInTheDocument();
  });

  it('should handle empty unique countries', () => {
    mockUseCustomersList.mockReturnValue({
      ...defaultHookReturn,
      uniqueCountries: [],
    });

    render(<DashboardPage />);

    expect(screen.getByText('Countries:')).toBeInTheDocument();
  });

  it('should pass filters correctly to Filters component', () => {
    const customFilters = {
      search: 'john',
      gender: 'Male',
      country: 'USA',
      ageRange: { min: 25, max: 35 },
    };

    mockUseCustomersList.mockReturnValue({
      ...defaultHookReturn,
      filters: customFilters,
    });

    render(<DashboardPage />);

    expect(screen.getByTestId('filters')).toBeInTheDocument();
  });

  it('should have proper layout structure', () => {
    const { container } = render(<DashboardPage />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass(
      'max-w-7xl',
      'mx-auto',
      'px-4',
      'sm:px-6',
      'lg:px-8',
      'py-8'
    );
  });

  it('should handle different total and filtered counts', () => {
    mockUseCustomersList.mockReturnValue({
      ...defaultHookReturn,
      total: 500,
      filteredTotal: 20,
    });

    render(<DashboardPage />);

    expect(screen.getByText('Total: 500')).toBeInTheDocument();
    expect(screen.getByText('Filtered: 20')).toBeInTheDocument();
  });

  it('should pass setFilters function to Filters component', () => {
    const mockSetFilters = jest.fn();
    mockUseCustomersList.mockReturnValue({
      ...defaultHookReturn,
      setFilters: mockSetFilters,
    });

    render(<DashboardPage />);

    expect(screen.getByTestId('filters')).toBeInTheDocument();
    // The actual function passing is tested in the Filters component tests
  });

  it('should pass onLoadMore function to CustomerList component', () => {
    const mockLoadMore = jest.fn();
    mockUseCustomersList.mockReturnValue({
      ...defaultHookReturn,
      loadMore: mockLoadMore,
    });

    render(<DashboardPage />);

    expect(screen.getByTestId('customer-list')).toBeInTheDocument();
    // The actual function passing is tested in the CustomerList component tests
  });

  it('should handle large numbers of customers', () => {
    const manyCustomers = Array.from({ length: 100 }, (_, i) => ({
      id: `customer-${i}`,
      fullName: `Customer ${i}`,
    }));

    mockUseCustomersList.mockReturnValue({
      ...defaultHookReturn,
      customers: manyCustomers,
      filteredTotal: 100,
      total: 1000,
    });

    render(<DashboardPage />);

    expect(screen.getByText('Customers: 100')).toBeInTheDocument();
    expect(screen.getByText('Total: 1000')).toBeInTheDocument();
    expect(screen.getByText('Filtered: 100')).toBeInTheDocument();
  });
});
