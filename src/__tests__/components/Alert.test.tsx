import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from '@/components/ui/Alert';

// Mock Icon component
jest.mock('../../components/ui/Icon', () => {
  return function MockIcon({
    name,
    className,
  }: {
    name: string;
    className?: string;
  }) {
    return (
      <div data-testid={`icon-${name}`} className={className}>
        {name}
      </div>
    );
  };
});

describe('Alert', () => {
  it('should render with default info variant', () => {
    render(<Alert title="Test Title" message="Test message" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByTestId('icon-info')).toBeInTheDocument();
  });

  it('should render error variant with correct styling', () => {
    const { container } = render(
      <Alert variant="error" title="Error Title" message="Error message" />
    );

    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByTestId('icon-error')).toBeInTheDocument();

    const alertContainer = container.firstChild as HTMLElement;
    expect(alertContainer).toHaveClass('bg-red-50', 'border-red-200');
  });

  it('should render warning variant with correct styling', () => {
    const { container } = render(
      <Alert
        variant="warning"
        title="Warning Title"
        message="Warning message"
      />
    );

    expect(screen.getByTestId('icon-warning')).toBeInTheDocument();
    const alertContainer = container.firstChild as HTMLElement;
    expect(alertContainer).toHaveClass('bg-yellow-50', 'border-yellow-200');
  });

  it('should render success variant with correct styling', () => {
    const { container } = render(
      <Alert
        variant="success"
        title="Success Title"
        message="Success message"
      />
    );

    expect(screen.getByTestId('icon-success')).toBeInTheDocument();
    const alertContainer = container.firstChild as HTMLElement;
    expect(alertContainer).toHaveClass('bg-green-50', 'border-green-200');
  });

  it('should render custom icon when provided', () => {
    const customIcon = <div data-testid="custom-icon">Custom</div>;
    render(<Alert icon={customIcon} title="Custom Icon Test" />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-info')).not.toBeInTheDocument();
  });

  it('should render in centered layout', () => {
    const { container } = render(
      <Alert centered title="Centered Title" message="Centered message" />
    );

    expect(container.firstChild).toHaveClass('text-center', 'py-12');
  });

  it('should render children instead of message when provided', () => {
    render(
      <Alert title="Test Title">
        <div data-testid="custom-content">Custom content</div>
      </Alert>
    );

    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });

  it('should render both message and children when both provided', () => {
    render(
      <Alert title="Test Title" message="Test message">
        <div data-testid="custom-content">Custom content</div>
      </Alert>
    );

    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Alert title="Test" className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render without title', () => {
    render(<Alert message="Only message" />);

    expect(screen.getByText('Only message')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should render without message or children', () => {
    render(<Alert title="Only title" />);

    expect(screen.getByText('Only title')).toBeInTheDocument();
  });

  it('should handle different icon sizes in centered layout', () => {
    render(<Alert centered iconSize="lg" title="Large Icon" />);

    const iconContainer = screen.getByTestId('icon-info').parentElement;
    expect(iconContainer).toHaveClass('h-12', 'w-12');
  });

  it('should handle medium icon size in centered layout', () => {
    render(<Alert centered iconSize="md" title="Medium Icon" />);

    const iconContainer = screen.getByTestId('icon-info').parentElement;
    expect(iconContainer).toHaveClass('h-8', 'w-8');
  });

  it('should handle small icon size in centered layout', () => {
    render(<Alert centered iconSize="sm" title="Small Icon" />);

    const iconContainer = screen.getByTestId('icon-info').parentElement;
    expect(iconContainer).toHaveClass('h-5', 'w-5');
  });

  it('should render proper structure in non-centered layout', () => {
    const { container } = render(
      <Alert variant="error" title="Error" message="Something went wrong" />
    );

    const alertContainer = container.firstChild as HTMLElement;
    expect(alertContainer).toHaveClass('border', 'rounded-lg', 'p-6');
    expect(alertContainer).not.toHaveClass('text-center');
  });

  it('should apply correct text colors for different variants', () => {
    const { rerender } = render(
      <Alert variant="error" title="Error" message="Error message" />
    );

    let title = screen.getByText('Error');
    expect(title).toHaveClass('text-red-800');

    rerender(
      <Alert variant="warning" title="Warning" message="Warning message" />
    );
    title = screen.getByText('Warning');
    expect(title).toHaveClass('text-yellow-800');

    rerender(
      <Alert variant="success" title="Success" message="Success message" />
    );
    title = screen.getByText('Success');
    expect(title).toHaveClass('text-green-800');

    rerender(<Alert variant="info" title="Info" message="Info message" />);
    title = screen.getByText('Info');
    expect(title).toHaveClass('text-blue-800');
  });

  it('should render icon with correct size classes', () => {
    render(<Alert iconSize="lg" title="Test" />);

    const icon = screen.getByTestId('icon-info');
    expect(icon).toHaveClass('h-12', 'w-12');
  });
});
