### Installation

1. Clone the repository
   \`\`\`bash
   git clone <repository-url>
   cd ems-dashboard
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:5173`

## Testing

### Unit & Integration Tests

\`\`\`bash

# Run tests

npm test

# Run tests with UI

npm run test:ui

# Generate coverage report

npm run test:coverage
\`\`\`

### End-to-End Tests

\`\`\`bash

# Run E2E tests

npm run test:e2e

# Run E2E tests with UI

npm run test:e2e:ui

# View test report

npm run test:e2e:report
\`\`\`

## Project Structure

\`\`\`
/
├── components/ # Reusable UI components
│ ├── Header.tsx
│ ├── LoadingSpinner.tsx
│ ├── StatusBadge.tsx
│ └── ...
├── features/ # Feature-specific components
│ ├── attendee/
│ ├── paramedic/
│ └── organizer/
├── hooks/ # Custom React hooks
├── services/ # API service layer
│ ├── api.ts # API integration (mock/real)
│ └── mockData.ts # Mock data for development
├── store/ # Redux store
│ ├── index.ts
│ └── slices/
├── types/ # TypeScript type definitions
├── utils/ # Utility functions
├── tests/ # Test files
│ ├── unit/
│ ├── components/
│ ├── integration/
│ └── e2e/
└── App.tsx # Main application component
\`\`\`

## Key Features

### Real-Time Updates

- React Query with automatic refetching (3-5 second intervals)
- Optimistic UI updates
- Live status synchronization across all roles

### Theme Support

- Light and dark modes
- System preference detection
- Persistent theme selection

### Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interfaces

### Performance Optimized

- React Query caching
- Redux for minimal re-renders
- Code splitting ready
- Optimized asset loading

## Backend Integration

### Django API Setup

The application is ready to integrate with a Django backend. Replace the mock API calls in `/services/api.ts` with actual HTTP requests:

\`\`\`typescript
// Example: Replace mock with real API
export const emergencyApi = {
getAll: async () => {
const response = await fetch(\`\${API_BASE_URL}/emergencies/\`);
return response.json();
},
// ... other endpoints
};
\`\`\`

### Required API Endpoints

- \`GET /api/emergencies/\` - List all emergencies
- \`POST /api/emergencies/\` - Create emergency
- \`PATCH /api/emergencies/:id/\` - Update emergency
- \`GET /api/paramedics/\` - List paramedics
- \`PATCH /api/paramedics/:id/\` - Update paramedic
- \`GET /api/stats/\` - Get event statistics

### WebSocket Support

For real-time updates, integrate WebSocket:

\`\`\`typescript
// Example WebSocket setup
const socket = new WebSocket('ws://localhost:8000/ws/emergencies/');
socket.onmessage = (event) => {
queryClient.invalidateQueries(['emergencies']);
};
\`\`\`

## Environment Variables

Create a \`.env\` file:

\`\`\`
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with modern React best practices
- Follows accessibility guidelines (WCAG 2.1)
- Designed for high-stress emergency situations
- Optimized for performance and reliability
