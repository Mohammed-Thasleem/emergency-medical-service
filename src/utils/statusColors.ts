// Status color mapping for consistent UI
import { EmergencyStatus, EmergencySeverity } from '../types';

export const getStatusColor = (status: EmergencyStatus): string => {
  switch (status) {
    case 'requested':
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30';
    case 'assigned':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30';
    case 'on-the-way':
      return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30';
    case 'resolved':
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30';
    case 'cancelled':
      return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/30';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/30';
  }
};

export const getSeverityColor = (severity: EmergencySeverity): string => {
  switch (severity) {
    case 'critical':
      return 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/50';
    case 'high':
      return 'text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/50';
    case 'medium':
      return 'text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-950/50';
    case 'low':
      return 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50';
    default:
      return 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-950/50';
  }
};

export const getStatusBadgeColor = (status: EmergencyStatus): string => {
  switch (status) {
    case 'requested':
      return 'bg-red-500 dark:bg-red-600';
    case 'assigned':
      return 'bg-yellow-500 dark:bg-yellow-600';
    case 'on-the-way':
      return 'bg-blue-500 dark:bg-blue-600';
    case 'resolved':
      return 'bg-green-500 dark:bg-green-600';
    case 'cancelled':
      return 'bg-gray-500 dark:bg-gray-600';
    default:
      return 'bg-gray-500 dark:bg-gray-600';
  }
};

export const getSeverityBadgeColor = (severity: EmergencySeverity): string => {
  switch (severity) {
    case 'critical':
      return 'bg-red-600 dark:bg-red-700';
    case 'high':
      return 'bg-orange-600 dark:bg-orange-700';
    case 'medium':
      return 'bg-yellow-600 dark:bg-yellow-700';
    case 'low':
      return 'bg-blue-600 dark:bg-blue-700';
    default:
      return 'bg-gray-600 dark:bg-gray-700';
  }
};
