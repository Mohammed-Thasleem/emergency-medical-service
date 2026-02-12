import { UserRole } from '../types';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setUser } from '../store/slices/userSlice';
import { Users, Stethoscope, LayoutDashboard } from 'lucide-react';

export function RoleSelector() {
  const dispatch = useAppDispatch();

  const handleRoleSelect = (role: UserRole) => {
    const userData = {
      id: `${role}-${Date.now()}`,
      name: role === 'attendee' ? 'Event Attendee' : role === 'paramedic' ? 'Medical Staff' : 'Event Organizer',
      role,
      email: `${role}@example.com`,
      phone: '+1-555-0100',
    };
    dispatch(setUser(userData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center size-16 bg-blue-600 dark:bg-blue-500 rounded-full mb-4">
            <Stethoscope className="size-8 text-white" />
          </div>
          <h1 className="text-4xl mb-2 text-gray-900 dark:text-white">Emergency Medical Services</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Attendee Role */}
          <button
            onClick={() => handleRoleSelect('attendee')}
            className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="size-16 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors">
                <Users className="size-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-gray-900 dark:text-white">Attendee</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Request emergency assistance at the event</p>
              </div>
            </div>
          </button>

          {/* Paramedic Role */}
          <button
            onClick={() => handleRoleSelect('paramedic')}
            className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-green-500 dark:hover:border-green-400"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="size-16 bg-green-100 dark:bg-green-950/50 rounded-full flex items-center justify-center group-hover:bg-green-600 dark:group-hover:bg-green-500 transition-colors">
                <Stethoscope className="size-8 text-green-600 dark:text-green-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-gray-900 dark:text-white">Paramedic</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Respond to emergency incidents</p>
              </div>
            </div>
          </button>

          {/* Organizer Role */}
          <button
            onClick={() => handleRoleSelect('organizer')}
            className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="size-16 bg-purple-100 dark:bg-purple-950/50 rounded-full flex items-center justify-center group-hover:bg-purple-600 dark:group-hover:bg-purple-500 transition-colors">
                <LayoutDashboard className="size-8 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-gray-900 dark:text-white">Organizer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monitor and manage all emergencies</p>
              </div>
            </div>
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-8">
          This is a demo application. In production, you would log in with your credentials.
        </p>
      </div>
    </div>
  );
}
