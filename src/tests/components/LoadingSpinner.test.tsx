import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render without text', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('svg');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('should render with custom text', () => {
    render(<LoadingSpinner text="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('should render with different sizes', () => {
    const { rerender, container } = render(<LoadingSpinner size="sm" />);
    let spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('size-4');

    rerender(<LoadingSpinner size="md" />);
    spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('size-8');

    rerender(<LoadingSpinner size="lg" />);
    spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('size-12');
  });
});
