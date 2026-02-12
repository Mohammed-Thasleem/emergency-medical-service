import { Emergency } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';
import { SeverityBadge } from '../../components/SeverityBadge';
import { formatTimeAgo } from '../../utils/formatters';
import { AlertCircle, Clock, User } from 'lucide-react';

interface ActiveIncidentsListProps {
  emergencies: Emergency[];
}

export function ActiveIncidentsList({ emergencies }: ActiveIncidentsListProps) {
  const activeEmergencies = emergencies
    .filter(e => e.status !== 'resolved' && e.status !== 'cancelled')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Active Incidents</h3>
      
      {activeEmergencies.length === 0 ? (
        <div className="text-center py-8">
          <AlertCircle className="size-10 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">No active incidents</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activeEmergencies.map((emergency) => (
            <div
              key={emergency.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <StatusBadge status={emergency.status} />
                    <SeverityBadge severity={emergency.severity} />
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {emergency.category}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {emergency.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mt-3">
                <div className="flex items-center gap-1">
                  <User className="size-3" />
                  <span>{emergency.reporterName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>{formatTimeAgo(emergency.createdAt)}</span>
                </div>
                {emergency.assignedParamedicName && (
                  <div className="text-green-600 dark:text-green-400">
                    Assigned to {emergency.assignedParamedicName}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
