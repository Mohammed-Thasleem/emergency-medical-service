import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { emergencyApi } from '../../services/api';
import { Emergency } from '../../types';
import { IncidentCard } from './IncidentCard';
import { IncidentDetails } from './IncidentDetails';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { AlertCircle, Filter } from 'lucide-react';

export function ParamedicView() {
  const [selectedIncident, setSelectedIncident] = useState<Emergency | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'assigned'>('active');

  // Fetch all emergencies with real-time updates
  const { data, isLoading } = useQuery({
    queryKey: ['emergencies'],
    queryFn: async () => {
      const response = await emergencyApi.getAll();
      return response.data;
    },
    refetchInterval: 3000, // Refetch every 3 seconds
  });

  const emergencies = data || [];

  // Filter emergencies
  const filteredEmergencies = emergencies.filter(e => {
    if (filter === 'active') {
      return e.status !== 'resolved' && e.status !== 'cancelled';
    }
    if (filter === 'assigned') {
      return e.assignedParamedicId !== undefined && e.status !== 'resolved';
    }
    return true;
  });

  // Sort by severity and time
  const sortedEmergencies = [...filteredEmergencies].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (severityDiff !== 0) return severityDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Incident List */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-gray-900 dark:text-white">Incident Queue</h2>
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-gray-500 dark:text-gray-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as typeof filter)}
                    className="text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  >
                    <option value="all">All Incidents</option>
                    <option value="active">Active Only</option>
                    <option value="assigned">Assigned</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="py-12">
                  <LoadingSpinner text="Loading incidents..." />
                </div>
              ) : sortedEmergencies.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="size-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {filter === 'active' 
                      ? 'No active incidents'
                      : filter === 'assigned'
                      ? 'No assigned incidents'
                      : 'No incidents found'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {sortedEmergencies.map((emergency) => (
                    <IncidentCard
                      key={emergency.id}
                      incident={emergency}
                      onSelect={setSelectedIncident}
                      isSelected={selectedIncident?.id === emergency.id}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Stats Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Queue Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl text-red-600 dark:text-red-400 mb-1">
                    {emergencies.filter(e => e.status === 'requested').length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Unassigned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">
                    {emergencies.filter(e => e.status === 'assigned' || e.status === 'on-the-way').length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-green-600 dark:text-green-400 mb-1">
                    {emergencies.filter(e => e.status === 'resolved').length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Resolved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Details */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            {selectedIncident ? (
              <IncidentDetails incident={selectedIncident} />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                <AlertCircle className="size-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Select an incident to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
