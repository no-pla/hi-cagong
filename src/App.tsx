import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import { Router } from './Router';

function App() {
  const queryClient = new QueryClient();
  const GlobalStyle = createGlobalStyle`
    body {
      font-family: 'Noto Sans', sans-serif;
    }
  `;

  return (
    <QueryClientProvider client={queryClient}>
      <Reset />
      <Router />
      <GlobalStyle />
    </QueryClientProvider>
  );
}

export default App;
