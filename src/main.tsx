import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryParamProvider } from 'use-query-params';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <App />
      </QueryParamProvider>
    </BrowserRouter>
  </StrictMode>
);
