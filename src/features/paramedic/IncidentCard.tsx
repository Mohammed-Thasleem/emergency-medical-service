import { Emergency } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';
import { SeverityBadge } from '../../components/SeverityBadge';
import { formatTimeAgo, formatAddress } from '../../utils/formatters';
import { MapPin, Clock, User, Phone } from 'lucide-react';

interface IncidentCardProps {
  incident: Emergency;
  onSelect: (incident: Emergency) => void;
  isSelected?: boolean;
}

export function IncidentCard({ incident, onSelect, isSelected }: IncidentCardProps) {
  return (
    <button
      onClick={() => onSelect(incident)}
      className={`w-full text-left border-2 rounded-lg p-4 transition-all hover:shadow-md ${
        isSelected
          ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            <StatusBadge status={incident.status} />
            <SeverityBadge severity={incident.severity} />
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {incident.category}
          </h3>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {formatTimeAgo(incident.createdAt)}
        </span>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
        {incident.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <User className="size-3 flex-shrink-0" />
          <span className="truncate">{incident.reporterName}</span>
        </div>
        {incident.reporterPhone && (
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <Phone className="size-3 flex-shrink-0" />
            <span>{incident.reporterPhone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <MapPin className="size-3 flex-shrink-0" />
          <span className="truncate">{formatAddress(incident.location.address, incident.location)}</span>
        </div>
      </div>
    </button>
  );
}
