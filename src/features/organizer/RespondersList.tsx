import { Paramedic } from '../../types';
import { Users, UserCheck, UserX } from 'lucide-react';

interface RespondersListProps {
  paramedics: Paramedic[];
}

export function RespondersList({ paramedics }: RespondersListProps) {
  const availableParamedics = paramedics.filter(p => p.status === 'available');
  const busyParamedics = paramedics.filter(p => p.status === 'busy');
  const offlineParamedics = paramedics.filter(p => p.status === 'offline');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Medical Responders</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Users className="size-4" />
          <span>{paramedics.length} Total</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Available */}
        {availableParamedics.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              <UserCheck className="size-4" />
              <span>Available ({availableParamedics.length})</span>
            </div>
            <div className="space-y-2">
              {availableParamedics.map((paramedic) => (
                <div
                  key={paramedic.id}
                  className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <div className="size-2 rounded-full bg-green-500 dark:bg-green-400 flex-shrink-0" />
                  <span className="text-sm text-gray-900 dark:text-white">{paramedic.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Busy */}
        {busyParamedics.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
              <UserCheck className="size-4" />
              <span>On Duty ({busyParamedics.length})</span>
            </div>
            <div className="space-y-2">
              {busyParamedics.map((paramedic) => (
                <div
                  key={paramedic.id}
                  className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg"
                >
                  <div className="size-2 rounded-full bg-orange-500 dark:bg-orange-400 flex-shrink-0 animate-pulse" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 dark:text-white">{paramedic.name}</div>
                    {paramedic.assignedIncidentId && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Incident: {paramedic.assignedIncidentId}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offline */}
        {offlineParamedics.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              <UserX className="size-4" />
              <span>Offline ({offlineParamedics.length})</span>
            </div>
            <div className="space-y-2">
              {offlineParamedics.map((paramedic) => (
                <div
                  key={paramedic.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{paramedic.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {paramedics.length === 0 && (
          <div className="text-center py-8">
            <Users className="size-10 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">No responders available</p>
          </div>
        )}
      </div>
    </div>
  );
}
