import { describe, it, expect, beforeEach, vi } from 'vitest';
import { formatTimeAgo, formatPhoneNumber, formatResponseTime } from '../../utils/formatters';

describe('formatTimeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-02-06T12:00:00Z'));
  });

  it('should return "Just now" for very recent times', () => {
    const date = new Date('2024-02-06T11:59:30Z').toISOString();
    expect(formatTimeAgo(date)).toBe('Just now');
  });

  it('should return minutes ago for recent times', () => {
    const date = new Date('2024-02-06T11:45:00Z').toISOString();
    expect(formatTimeAgo(date)).toBe('15 minutes ago');
  });

  it('should return hours ago for older times', () => {
    const date = new Date('2024-02-06T10:00:00Z').toISOString();
    expect(formatTimeAgo(date)).toBe('2 hours ago');
  });

  it('should return days ago for much older times', () => {
    const date = new Date('2024-02-04T12:00:00Z').toISOString();
    expect(formatTimeAgo(date)).toBe('2 days ago');
  });
});

describe('formatPhoneNumber', () => {
  it('should format 10-digit phone numbers correctly', () => {
    expect(formatPhoneNumber('+15550101')).toBe('(555) 501-01');
    expect(formatPhoneNumber('5551234567')).toBe('(555) 123-4567');
  });

  it('should return original string for non-10-digit numbers', () => {
    expect(formatPhoneNumber('+1-555-0101')).toBe('+1-555-0101');
  });
});

describe('formatResponseTime', () => {
  it('should format times less than 1 minute', () => {
    expect(formatResponseTime(0.5)).toBe('< 1 min');
  });

  it('should format 1 minute', () => {
    expect(formatResponseTime(1)).toBe('1 min');
  });

  it('should format minutes', () => {
    expect(formatResponseTime(15)).toBe('15 mins');
  });

  it('should format hours', () => {
    expect(formatResponseTime(60)).toBe('1 hour');
    expect(formatResponseTime(120)).toBe('2 hours');
  });

  it('should format hours and minutes', () => {
    expect(formatResponseTime(75)).toBe('1h 15m');
  });
});
