import { Moon, Sun } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { toggleTheme } from '../store/slices/themeSlice';

export function ThemeToggle() {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="size-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun className="size-5 text-gray-400" />
      )}
    </button>
  );
}
