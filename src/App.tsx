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
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px #fff inset;
    }
    button{
      background-color:#fff;
      border:none
    }
    input:focus{
      outline: none !important;
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
