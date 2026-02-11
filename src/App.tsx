import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/app/core/clients/query-client';

import { router } from './router';

import { Toaster } from 'sonner';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <Toaster position="top-center" duration={3000} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
