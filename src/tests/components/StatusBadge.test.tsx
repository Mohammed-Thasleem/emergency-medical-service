import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../../components/StatusBadge';

describe('StatusBadge', () => {
  it('should render requested status correctly', () => {
    render(<StatusBadge status="requested" />);
    expect(screen.getByText('Requested')).toBeInTheDocument();
  });

  it('should render assigned status correctly', () => {
    render(<StatusBadge status="assigned" />);
    expect(screen.getByText('Assigned')).toBeInTheDocument();
  });

  it('should render on-the-way status with proper formatting', () => {
    render(<StatusBadge status="on-the-way" />);
    expect(screen.getByText('On The Way')).toBeInTheDocument();
  });

  it('should render resolved status correctly', () => {
    render(<StatusBadge status="resolved" />);
    expect(screen.getByText('Resolved')).toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    const { container } = render(<StatusBadge status="requested" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full');
  });
});
