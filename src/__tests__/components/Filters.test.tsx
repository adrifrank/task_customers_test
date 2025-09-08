import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filters from '@/app/dashboard/сomponents/filters/Filters';
import { CustomerFilters } from '@/types/customer';

// Mock all filter components
jest.mock(
  '../../app/dashboard/сomponents/filters/filter-components/SearchFilter',
  () => {
    return function MockSearchFilter({ value, onSearchChange }: any) {
      return (
        <div data-testid="search-filter">
          <input
            data-testid="search-input"
            value={value}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search..."
          />
        </div>
      );
    };
  }
);

jest.mock(
  '../../app/dashboard/сomponents/filters/filter-components/GenderFilter',
  () => {
    return function MockGenderFilter({ value, onGenderChange }: any) {
      return (
        <div data-testid="gender-filter">
          <select
            data-testid="gender-select"
            value={value}
            onChange={e => onGenderChange(e.target.value)}
          >
            <option value="all">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      );
    };
  }
);

jest.mock(
  '../../app/dashboard/сomponents/filters/filter-components/CountryFilter',
  () => {
    return function MockCountryFilter({
      value,
      uniqueCountries,
      onCountryChange,
    }: any) {
      return (
        <div data-testid="country-filter">
          <select
            data-testid="country-select"
            value={value}
            onChange={e => onCountryChange(e.target.value)}
          >
            <option value="all">All Countries</option>
            {uniqueCountries.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      );
    };
  }
);

jest.mock(
  '../../app/dashboard/сomponents/filters/filter-components/AgeRangeFilter',
  () => {
    return function MockAgeRangeFilter({ value, onAgeRangeChange }: any) {
      return (
        <div data-testid="age-range-filter">
          <input
            data-testid="age-min"
            type="number"
            value={value?.min || ''}
            onChange={e =>
              onAgeRangeChange({
                ...value,
                min: parseInt(e.target.value) || undefined,
              })
            }
            placeholder="Min age"
          />
          <input
            data-testid="age-max"
            type="number"
            value={value?.max || ''}
            onChange={e =>
              onAgeRangeChange({
                ...value,
                max: parseInt(e.target.value) || undefined,
              })
            }
            placeholder="Max age"
          />
        </div>
      );
    };
  }
);

jest.mock(
  '../../app/dashboard/сomponents/filters/filter-components/ClearFiltersButton',
  () => {
    return function MockClearFiltersButton({ onClearFilters }: any) {
      return (
        <button data-testid="clear-filters" onClick={onClearFilters}>
          Clear Filters
        </button>
      );
    };
  }
);

jest.mock(
  '../../app/dashboard/сomponents/filters/filter-components/ResultsCounter',
  () => {
    return function MockResultsCounter({
      totalResults,
      filteredResults,
      hasActiveFilters,
    }: any) {
      return (
        <div data-testid="results-counter">
          <span>Total: {totalResults}</span>
          <span>Filtered: {filteredResults}</span>
          <span>Has Active: {hasActiveFilters.toString()}</span>
        </div>
      );
    };
  }
);

describe('Filters', () => {
  const mockOnFiltersChange = jest.fn();
  const uniqueCountries = ['USA', 'Canada', 'UK'];

  const defaultFilters: CustomerFilters = {
    search: '',
    gender: 'all',
    country: 'all',
    ageRange: undefined,
  };

  const defaultProps = {
    filters: defaultFilters,
    onFiltersChange: mockOnFiltersChange,
    uniqueCountries,
    totalResults: 100,
    filteredResults: 100,
  };

  beforeEach(() => {
    mockOnFiltersChange.mockClear();
  });

  it('should render all filter components', () => {
    render(<Filters {...defaultProps} />);

    expect(screen.getByTestId('search-filter')).toBeInTheDocument();
    expect(screen.getByTestId('gender-filter')).toBeInTheDocument();
    expect(screen.getByTestId('country-filter')).toBeInTheDocument();
    expect(screen.getByTestId('age-range-filter')).toBeInTheDocument();
    expect(screen.getByTestId('results-counter')).toBeInTheDocument();
  });

  it('should not show clear filters button when no active filters', () => {
    render(<Filters {...defaultProps} />);

    expect(screen.queryByTestId('clear-filters')).not.toBeInTheDocument();
  });

  it('should show clear filters button when there are active filters', () => {
    const filtersWithSearch = {
      ...defaultFilters,
      search: 'john',
    };

    render(<Filters {...defaultProps} filters={filtersWithSearch} />);

    expect(screen.getByTestId('clear-filters')).toBeInTheDocument();
  });

  it('should handle search filter changes', () => {
    render(<Filters {...defaultProps} />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'john' } });

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      search: 'john',
    });
  });

  it('should handle gender filter changes', () => {
    render(<Filters {...defaultProps} />);

    const genderSelect = screen.getByTestId('gender-select');
    fireEvent.change(genderSelect, { target: { value: 'Male' } });

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      gender: 'Male',
    });
  });

  it('should handle country filter changes', () => {
    render(<Filters {...defaultProps} />);

    const countrySelect = screen.getByTestId('country-select');
    fireEvent.change(countrySelect, { target: { value: 'USA' } });

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      country: 'USA',
    });
  });

  it('should handle age range filter changes', () => {
    render(<Filters {...defaultProps} />);

    const ageMinInput = screen.getByTestId('age-min');
    fireEvent.change(ageMinInput, { target: { value: '25' } });

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      ageRange: { min: 25, max: undefined },
    });
  });

  it('should handle clear filters action', () => {
    const filtersWithActive = {
      search: 'john',
      gender: 'Male' as const,
      country: 'USA',
      ageRange: { min: 25, max: 35 },
    };

    render(<Filters {...defaultProps} filters={filtersWithActive} />);

    const clearButton = screen.getByTestId('clear-filters');
    fireEvent.click(clearButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      search: '',
      gender: 'all',
      country: 'all',
      ageRange: undefined,
    });
  });

  it('should pass correct props to ResultsCounter', () => {
    render(
      <Filters {...defaultProps} totalResults={150} filteredResults={75} />
    );

    expect(screen.getByText('Total: 150')).toBeInTheDocument();
    expect(screen.getByText('Filtered: 75')).toBeInTheDocument();
    expect(screen.getByText('Has Active: false')).toBeInTheDocument();
  });

  it('should detect active filters correctly', () => {
    const filtersWithSearch = {
      ...defaultFilters,
      search: 'john',
    };

    render(<Filters {...defaultProps} filters={filtersWithSearch} />);

    expect(screen.getByText('Has Active: true')).toBeInTheDocument();
  });

  it('should detect active filters for gender', () => {
    const filtersWithGender = {
      ...defaultFilters,
      gender: 'Female' as const,
    };

    render(<Filters {...defaultProps} filters={filtersWithGender} />);

    expect(screen.getByTestId('clear-filters')).toBeInTheDocument();
  });

  it('should detect active filters for country', () => {
    const filtersWithCountry = {
      ...defaultFilters,
      country: 'USA',
    };

    render(<Filters {...defaultProps} filters={filtersWithCountry} />);

    expect(screen.getByTestId('clear-filters')).toBeInTheDocument();
  });

  it('should detect active filters for age range', () => {
    const filtersWithAge = {
      ...defaultFilters,
      ageRange: { min: 25, max: 35 },
    };

    render(<Filters {...defaultProps} filters={filtersWithAge} />);

    expect(screen.getByTestId('clear-filters')).toBeInTheDocument();
  });

  it('should pass uniqueCountries to CountryFilter', () => {
    render(<Filters {...defaultProps} />);

    // Check that country options are rendered
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText('UK')).toBeInTheDocument();
  });

  it('should maintain filter state correctly', () => {
    const currentFilters = {
      search: 'test',
      gender: 'Male' as const,
      country: 'USA',
      ageRange: { min: 20, max: 40 },
    };

    render(<Filters {...defaultProps} filters={currentFilters} />);

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Male')).toBeInTheDocument();
    expect(screen.getByDisplayValue('USA')).toBeInTheDocument();
    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
    expect(screen.getByDisplayValue('40')).toBeInTheDocument();
  });
});
