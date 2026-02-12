import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { emergencyApi } from '../../services/api';
import { useAppSelector } from '../../hooks/useAppSelector';
import { EmergencyRequestForm } from './EmergencyRequestForm';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { StatusBadge } from '../../components/StatusBadge';
import { SeverityBadge } from '../../components/SeverityBadge';
import { formatTimeAgo } from '../../utils/formatters';
import { AlertCircle, CheckCircle2, Clock, MapPin } from 'lucide-react';

export function AttendeeView() {
  const user = useAppSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);

  // Fetch user's emergencies
  const { data, isLoading } = useQuery({
    queryKey: ['emergencies', user.id],
    queryFn: async () => {
      const response = await emergencyApi.getAll();
      return response.data.filter(e => e.reporterId === user.id);
    },
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });

  const userEmergencies = data || [];
  const activeEmergency = userEmergencies.find(
    e => e.status !== 'resolved' && e.status !== 'cancelled'
  );

  if (showForm && !activeEmergency) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => setShowForm(false)}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Dashboard
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl mb-6 text-gray-900 dark:text-white">Request Emergency Assistance</h2>
            <EmergencyRequestForm onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Active Emergency Alert */}
        {activeEmergency ? (
          <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="size-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-red-900 dark:text-red-100 mb-2">
                  Active Emergency Request
                </h3>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={activeEmergency.status} />
                    <SeverityBadge severity={activeEmergency.severity} />
                  </div>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {activeEmergency.description}
                  </p>
                  {activeEmergency.assignedParamedicName && (
                    <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                      <CheckCircle2 className="size-4" />
                      <span>Paramedic assigned: <strong>{activeEmergency.assignedParamedicName}</strong></span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                    <Clock className="size-4" />
                    <span>Requested {formatTimeAgo(activeEmergency.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-3 px-6 py-8 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 text-white rounded-xl hover:from-red-700 hover:to-red-800 dark:hover:from-red-600 dark:hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <AlertCircle className="size-8" />
              <div className="text-left">
                <div className="text-2xl">Request Emergency Help</div>
                <div className="text-sm text-red-100">Tap to get immediate medical assistance</div>
              </div>
            </button>
          </div>
        )}

        {/* Emergency History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl mb-4 text-gray-900 dark:text-white">Your Emergency History</h2>
          
          {isLoading ? (
            <div className="py-12">
              <LoadingSpinner text="Loading your emergencies..." />
            </div>
          ) : userEmergencies.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="size-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No emergency requests yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Request help if you need medical assistance
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {userEmergencies.map((emergency) => (
                <div
                  key={emergency.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <StatusBadge status={emergency.status} />
                        <SeverityBadge severity={emergency.severity} />
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white mb-1">
                        {emergency.description}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {emergency.category}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span>{formatTimeAgo(emergency.createdAt)}</span>
                    </div>
                    {emergency.assignedParamedicName && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="size-3" />
                        <span>{emergency.assignedParamedicName}</span>
                      </div>
                    )}
                    {emergency.responseTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="size-3" />
                        <span>{emergency.responseTime} min response</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Safety Information */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-3">Safety Information</h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>In case of life-threatening emergency, call 911 immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Stay at your location after requesting help so paramedics can find you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Medical staff will arrive as quickly as possible based on severity</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
