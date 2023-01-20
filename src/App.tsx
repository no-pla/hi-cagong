import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Router } from "./Router";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
