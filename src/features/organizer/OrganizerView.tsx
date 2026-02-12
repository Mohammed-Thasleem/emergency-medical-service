import { useQuery } from '@tanstack/react-query';
import { emergencyApi, paramedicApi, statsApi } from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { StatsCard } from './StatsCard';
import { EmergencyMap } from './EmergencyMap';
import { ActiveIncidentsList } from './ActiveIncidentsList';
import { RespondersList } from './RespondersList';
import { Activity, AlertCircle, CheckCircle2, Clock, Users } from 'lucide-react';

export function OrganizerView() {
  // Fetch all data with real-time updates
  const { data: emergencies, isLoading: emergenciesLoading } = useQuery({
    queryKey: ['emergencies'],
    queryFn: async () => {
      const response = await emergencyApi.getAll();
      return response.data;
    },
    refetchInterval: 3000,
  });

  const { data: paramedics, isLoading: paramedicsLoading } = useQuery({
    queryKey: ['paramedics'],
    queryFn: async () => {
      const response = await paramedicApi.getAll();
      return response.data;
    },
    refetchInterval: 5000,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await statsApi.get();
      return response.data;
    },
    refetchInterval: 5000,
  });

  const isLoading = emergenciesLoading || paramedicsLoading || statsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl text-gray-900 dark:text-white mb-2">Event Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time monitoring of emergency medical services
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatsCard
            title="Total Incidents"
            value={stats?.totalIncidents || 0}
            icon={Activity}
            color="blue"
          />
          <StatsCard
            title="Active Incidents"
            value={stats?.activeIncidents || 0}
            icon={AlertCircle}
            color="red"
            subtitle={stats?.activeIncidents === 0 ? 'All clear' : 'Needs attention'}
          />
          <StatsCard
            title="Resolved"
            value={stats?.resolvedIncidents || 0}
            icon={CheckCircle2}
            color="green"
          />
          <StatsCard
            title="Avg Response Time"
            value={`${stats?.averageResponseTime || 0} min`}
            icon={Clock}
            color="yellow"
          />
          <StatsCard
            title="Responders"
            value={`${stats?.availableParamedics || 0}/${(stats?.availableParamedics || 0) + (stats?.busyParamedics || 0)}`}
            icon={Users}
            color="purple"
            subtitle="Available"
          />
        </div>

        {/* Map */}
        <div className="mb-6">
          <EmergencyMap 
            emergencies={emergencies || []} 
            paramedics={paramedics || []} 
          />
        </div>

        {/* Active Incidents and Responders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveIncidentsList emergencies={emergencies || []} />
          <RespondersList paramedics={paramedics || []} />
        </div>

        {/* Real-time Update Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="size-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
          <span>Live updates enabled</span>
        </div>
      </div>
    </div>
  );
}
