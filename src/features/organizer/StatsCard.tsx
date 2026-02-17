import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "blue" | "green" | "red" | "yellow" | "purple";
  subtitle?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: StatsCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400",
    green:
      "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    red: "bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400",
    yellow:
      "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400",
    purple:
      "bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
            {title}
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-900 dark:text-white mb-0.5 sm:mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 truncate">
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={`size-10 sm:size-11 lg:size-12 rounded-lg flex items-center justify-center flex-shrink-0 ml-2 ${colorClasses[color]}`}
        >
          <Icon className="size-5 sm:size-5.5 lg:size-6" />
        </div>
      </div>
    </div>
  );
}
