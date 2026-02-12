import { EmergencySeverity } from '../types';
import { getSeverityColor } from '../utils/statusColors';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface SeverityBadgeProps {
  severity: EmergencySeverity;
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const getIcon = () => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="size-3" />;
      case 'medium':
        return <AlertCircle className="size-3" />;
      case 'low':
        return <Info className="size-3" />;
      default:
        return null;
    }
  };

  const formatSeverity = (severity: EmergencySeverity): string => {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(severity)}`}>
      {getIcon()}
      {formatSeverity(severity)}
    </span>
  );
}
