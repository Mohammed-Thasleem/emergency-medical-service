import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../store/slices/userSlice';
import themeReducer from '../../store/slices/themeSlice';
import { AttendeeView } from '../../features/attendee/AttendeeView';
import { resetMockData } from '../../services/api';

describe('Emergency Request Flow', () => {
  let store: any;
  let queryClient: QueryClient;

  beforeEach(() => {
    resetMockData();
    
    store = configureStore({
      reducer: {
        user: userReducer,
        theme: themeReducer,
      },
      preloadedState: {
        user: {
          id: 'test-user',
          name: 'Test User',
          role: 'attendee',
          email: 'test@example.com',
          phone: '+1-555-0100',
          isAuthenticated: true,
        },
        theme: {
          theme: 'light',
        },
      },
    });

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('should display emergency request button when no active emergency', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AttendeeView />
        </QueryClientProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Request Emergency Help/i)).toBeInTheDocument();
    });
  });

  it('should show emergency request form when button clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AttendeeView />
        </QueryClientProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Request Emergency Help/i)).toBeInTheDocument();
    });

    const button = screen.getByText(/Request Emergency Help/i);
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Request Emergency Assistance/i)).toBeInTheDocument();
    });
  });

  it('should display emergency history when available', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AttendeeView />
        </QueryClientProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Your Emergency History/i)).toBeInTheDocument();
    });
  });
});
