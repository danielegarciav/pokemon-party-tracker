import { QueryClient, QueryClientProvider, keepPreviousData } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './store/root';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App.tsx';

const reactRootElement = document.getElementById('root');
if (!reactRootElement) {
  throw new Error('Root element not found');
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    },
  },
});

createRoot(reactRootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </QueryClientProvider>
  </StrictMode>,
);
