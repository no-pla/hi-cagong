import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import { Router } from "./Router";

function App() {
  const queryClient = new QueryClient();
  const GlobalStyle = createGlobalStyle`
    body {
      font-family: 'Noto Sans', sans-serif;
    }
  `;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Reset />
        <Router />
        <GlobalStyle />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
