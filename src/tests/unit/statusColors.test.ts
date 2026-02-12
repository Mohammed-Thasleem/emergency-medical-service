import { describe, it, expect } from 'vitest';
import { getStatusColor, getSeverityColor } from '../../utils/statusColors';

describe('getStatusColor', () => {
  it('should return correct color for requested status', () => {
    const color = getStatusColor('requested');
    expect(color).toContain('text-red-600');
    expect(color).toContain('bg-red-50');
  });

  it('should return correct color for assigned status', () => {
    const color = getStatusColor('assigned');
    expect(color).toContain('text-yellow-600');
  });

  it('should return correct color for on-the-way status', () => {
    const color = getStatusColor('on-the-way');
    expect(color).toContain('text-blue-600');
  });

  it('should return correct color for resolved status', () => {
    const color = getStatusColor('resolved');
    expect(color).toContain('text-green-600');
  });

  it('should return correct color for cancelled status', () => {
    const color = getStatusColor('cancelled');
    expect(color).toContain('text-gray-600');
  });
});

describe('getSeverityColor', () => {
  it('should return correct color for critical severity', () => {
    const color = getSeverityColor('critical');
    expect(color).toContain('text-red-700');
  });

  it('should return correct color for high severity', () => {
    const color = getSeverityColor('high');
    expect(color).toContain('text-orange-700');
  });

  it('should return correct color for medium severity', () => {
    const color = getSeverityColor('medium');
    expect(color).toContain('text-yellow-700');
  });

  it('should return correct color for low severity', () => {
    const color = getSeverityColor('low');
    expect(color).toContain('text-blue-700');
  });
});
