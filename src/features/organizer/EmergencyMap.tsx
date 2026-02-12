import { Emergency, Paramedic } from '../../types';
import { MapPin, Navigation } from 'lucide-react';
import { getSeverityBadgeColor } from '../../utils/statusColors';

interface EmergencyMapProps {
  emergencies: Emergency[];
  paramedics: Paramedic[];
}

export function EmergencyMap({ emergencies, paramedics }: EmergencyMapProps) {
  // This is a placeholder for an actual map implementation
  // In production, you would integrate with Google Maps, Mapbox, or similar
  
  const activeEmergencies = emergencies.filter(
    e => e.status !== 'resolved' && e.status !== 'cancelled'
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Event Map</h3>
      
      {/* Map Placeholder */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg h-96 overflow-hidden">
        {/* Grid overlay for map effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-400 dark:border-gray-600" />
            ))}
          </div>
        </div>

        {/* Emergency Markers */}
        {activeEmergencies.map((emergency, index) => {
          // Position markers in a distributed way (mock positioning)
          const left = 10 + (index * 15) % 70;
          const top = 10 + (Math.floor(index / 5) * 20) % 70;
          
          return (
            <div
              key={emergency.id}
              className="absolute"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className="relative group">
                <div className={`size-4 rounded-full ${getSeverityBadgeColor(emergency.severity)} animate-pulse shadow-lg`} />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                    <div className="font-medium">{emergency.category}</div>
                    <div className="text-gray-300 dark:text-gray-400">{emergency.severity} severity</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Paramedic Markers */}
        {paramedics.map((paramedic, index) => {
          // Position markers in a distributed way (mock positioning)
          const left = 15 + (index * 20) % 60;
          const top = 15 + (Math.floor(index / 4) * 25) % 60;
          
          return (
            <div
              key={paramedic.id}
              className="absolute"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className="relative group">
                <div className={`size-5 rounded-full flex items-center justify-center shadow-lg ${
                  paramedic.status === 'available' 
                    ? 'bg-green-500 dark:bg-green-600' 
                    : 'bg-orange-500 dark:bg-orange-600'
                }`}>
                  <Navigation className="size-3 text-white" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                    <div className="font-medium">{paramedic.name}</div>
                    <div className="text-gray-300 dark:text-gray-400">{paramedic.status}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-xs">
          <div className="font-medium text-gray-900 dark:text-white mb-2">Legend</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-red-600 dark:bg-red-700" />
              <span className="text-gray-700 dark:text-gray-300">Critical Emergency</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-orange-600 dark:bg-orange-700" />
              <span className="text-gray-700 dark:text-gray-300">High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                <Navigation className="size-2 text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Available Paramedic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-orange-500 dark:bg-orange-600 flex items-center justify-center">
                <Navigation className="size-2 text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Busy Paramedic</span>
            </div>
          </div>
        </div>

        {/* Map integration note */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600 dark:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg">
          Map Integration Ready (Google Maps / Mapbox)
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
        This is a map placeholder. In production, integrate with Google Maps, Mapbox, or similar mapping service for real-time location tracking.
      </p>
    </div>
  );
}
