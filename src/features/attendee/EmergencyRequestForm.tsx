import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { emergencyApi } from '../../services/api';
import { EmergencySeverity } from '../../types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AlertCircle, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EmergencyRequestFormProps {
  onSuccess: () => void;
}

export function EmergencyRequestForm({ onSuccess }: EmergencyRequestFormProps) {
  const user = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState<EmergencySeverity>('medium');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const createEmergencyMutation = useMutation({
    mutationFn: emergencyApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergencies'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Emergency request submitted successfully!');
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to submit emergency request. Please try again.');
    },
  });

  const getLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsGettingLocation(false);
          toast.success('Location captured successfully!');
        },
        () => {
          // Fallback to mock location
          setLocation({
            lat: 40.7589,
            lng: -73.9851,
          });
          setIsGettingLocation(false);
          toast.info('Using default event location');
        }
      );
    } else {
      // Fallback to mock location
      setLocation({
        lat: 40.7589,
        lng: -73.9851,
      });
      setIsGettingLocation(false);
      toast.info('Using default event location');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      toast.error('Please capture your location first');
      return;
    }

    if (!description.trim() || !category.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    createEmergencyMutation.mutate({
      reporterId: user.id!,
      reporterName: user.name!,
      reporterPhone: user.phone,
      location,
      description: description.trim(),
      category: category.trim(),
      severity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location Capture */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Location
        </label>
        {location ? (
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <MapPin className="size-5 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-700 dark:text-green-300">
              Location captured: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={getLocation}
            disabled={isGettingLocation}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGettingLocation ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Capturing Location...
              </>
            ) : (
              <>
                <MapPin className="size-5" />
                Capture My Location
              </>
            )}
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Emergency Type
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          required
        >
          <option value="">Select a category</option>
          <option value="Cardiac">Cardiac Emergency</option>
          <option value="Allergic">Allergic Reaction</option>
          <option value="Orthopedic">Injury/Fracture</option>
          <option value="Heat-related">Heat Exhaustion</option>
          <option value="Respiratory">Breathing Difficulty</option>
          <option value="Minor Injury">Minor Injury</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Severity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Severity Level
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['low', 'medium', 'high', 'critical'] as EmergencySeverity[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setSeverity(level)}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                severity === level
                  ? level === 'critical'
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                    : level === 'high'
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300'
                    : level === 'medium'
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          placeholder="Describe the emergency situation..."
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={createEmergencyMutation.isPending || !location}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {createEmergencyMutation.isPending ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <AlertCircle className="size-5" />
            Request Emergency Assistance
          </>
        )}
      </button>
    </form>
  );
}
