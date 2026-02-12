import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { emergencyApi, paramedicApi } from '../../services/api';
import { Emergency, EmergencyStatus } from '../../types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { StatusBadge } from '../../components/StatusBadge';
import { SeverityBadge } from '../../components/SeverityBadge';
import { formatTimeAgo, formatAddress, formatPhoneNumber } from '../../utils/formatters';
import { MapPin, User, Phone, Clock, Navigation, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface IncidentDetailsProps {
  incident: Emergency;
}

export function IncidentDetails({ incident }: IncidentDetailsProps) {
  const user = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: EmergencyStatus) => {
      setIsUpdating(true);
      const response = await emergencyApi.updateStatus(incident.id, newStatus, user.id!);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['emergencies'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['paramedics'] });
      setIsUpdating(false);
      toast.success(`Status updated to ${data.data.status}`);
    },
    onError: () => {
      setIsUpdating(false);
      toast.error('Failed to update status');
    },
  });

  const assignToSelfMutation = useMutation({
    mutationFn: async () => {
      setIsUpdating(true);
      await paramedicApi.assign(user.id!, incident.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergencies'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['paramedics'] });
      setIsUpdating(false);
      toast.success('Incident assigned to you');
    },
    onError: () => {
      setIsUpdating(false);
      toast.error('Failed to assign incident');
    },
  });

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${incident.location.lat},${incident.location.lng}`;
    window.open(url, '_blank');
  };

  const canAssign = incident.status === 'requested' && !incident.assignedParamedicId;
  const isAssignedToMe = incident.assignedParamedicId === user.id;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl text-gray-900 dark:text-white">Incident Details</h2>
          <div className="flex gap-2">
            <StatusBadge status={incident.status} />
            <SeverityBadge severity={incident.severity} />
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Incident ID: {incident.id}
        </p>
      </div>

      {/* Incident Information */}
      <div className="space-y-4 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</h3>
          <p className="text-gray-900 dark:text-white">{incident.category}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</h3>
          <p className="text-gray-900 dark:text-white">{incident.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reporter</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                <User className="size-4 text-gray-500 dark:text-gray-400" />
                <span>{incident.reporterName}</span>
              </div>
              {incident.reporterPhone && (
                <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                  <Phone className="size-4 text-gray-500 dark:text-gray-400" />
                  <a 
                    href={`tel:${incident.reporterPhone}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {formatPhoneNumber(incident.reporterPhone)}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</h3>
            <div className="flex items-start gap-2 text-sm text-gray-900 dark:text-white mb-2">
              <MapPin className="size-4 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
              <span>{formatAddress(incident.location.address, incident.location)}</span>
            </div>
            <button
              onClick={handleNavigate}
              className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Navigation className="size-4" />
              Navigate to location
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Clock className="size-4 text-gray-500 dark:text-gray-400" />
              <span>Requested {formatTimeAgo(incident.createdAt)}</span>
            </div>
            {incident.assignedParamedicName && (
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <CheckCircle2 className="size-4 text-green-500 dark:text-green-400" />
                <span>Assigned to {incident.assignedParamedicName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {canAssign && (
          <button
            onClick={() => assignToSelfMutation.mutate()}
            disabled={isUpdating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUpdating ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Assigning...
              </>
            ) : (
              <>
                <CheckCircle2 className="size-5" />
                Assign to Me
              </>
            )}
          </button>
        )}

        {isAssignedToMe && (
          <div className="space-y-2">
            {incident.status === 'assigned' && (
              <button
                onClick={() => updateStatusMutation.mutate('on-the-way')}
                disabled={isUpdating}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Navigation className="size-5" />
                    Mark as On the Way
                  </>
                )}
              </button>
            )}

            {(incident.status === 'assigned' || incident.status === 'on-the-way') && (
              <button
                onClick={() => updateStatusMutation.mutate('resolved')}
                disabled={isUpdating}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-5" />
                    Mark as Resolved
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
