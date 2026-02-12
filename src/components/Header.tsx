import { Stethoscope, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logout } from '../store/slices/userSlice';

export function Header() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case 'attendee':
        return 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300';
      case 'paramedic':
        return 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300';
      case 'organizer':
        return 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-950/50 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="size-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg text-gray-900 dark:text-white">EMS Dashboard</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Emergency Medical Services</p>
            </div>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor()}`}>
                {user.role?.charAt(0).toUpperCase()}{user.role?.slice(1)}
              </span>
            </div>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="size-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
