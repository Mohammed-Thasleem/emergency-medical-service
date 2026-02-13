import { Stethoscope, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../store/slices/userSlice";

export function Header() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case "attendee":
        return "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300";
      case "paramedic":
        return "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300";
      case "organizer":
        return "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300";
      default:
        return "bg-gray-100 dark:bg-gray-950/50 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="size-8 sm:size-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="size-5 sm:size-6 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg text-gray-900 dark:text-white">
                EMS Dashboard
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 hidden xs:block">
                Emergency Medical Services
              </p>
            </div>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor()}`}
              >
                {user.role?.charAt(0).toUpperCase()}
                {user.role?.slice(1)}
              </span>
            </div>
            <span
              className={`md:hidden px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${getRoleBadgeColor()}`}
            >
              {user.role?.charAt(0).toUpperCase()}
              {user.role?.slice(1)}
            </span>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="size-4 sm:size-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
