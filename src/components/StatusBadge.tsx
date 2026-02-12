import { EmergencyStatus } from '../types';
import { getStatusColor } from '../utils/statusColors';

interface StatusBadgeProps {
  status: EmergencyStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const formatStatus = (status: EmergencyStatus): string => {
    return status
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {formatStatus(status)}
    </span>
  );
}
