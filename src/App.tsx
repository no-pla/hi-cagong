import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Reset } from 'styled-reset';
import { Router } from './Router';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Reset />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
