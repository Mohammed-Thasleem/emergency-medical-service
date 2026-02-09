import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner@2.0.3';
import { store } from './store';
import { useAppSelector } from './hooks/useAppSelector';
import { RoleSelector } from './components/RoleSelector';
import { Header } from './components/Header';
import { AttendeeView } from './features/attendee/AttendeeView';
import { ParamedicView } from './features/paramedic/ParamedicView';
import { OrganizerView } from './features/organizer/OrganizerView';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000, // Consider data stale after 1 second
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
});

function AppContent() {
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme.theme);

  // Apply theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // If user is not authenticated, show role selector
  if (!user.isAuthenticated) {
    return <RoleSelector />;
  }

  // Render appropriate view based on user role
  const renderView = () => {
    switch (user.role) {
      case 'attendee':
        return <AttendeeView />;
      case 'paramedic':
        return <ParamedicView />;
      case 'organizer':
        return <OrganizerView />;
      default:
        return <RoleSelector />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      {renderView()}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <Toaster 
          position="top-right" 
          richColors 
          theme="system"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white dark:border-gray-700',
          }}
        />
      </QueryClientProvider>
    </Provider>
  );
}
