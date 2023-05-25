import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { CommentContextProvider } from './share/Context/CommentContext';

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CommentContextProvider>
        <App />
      </CommentContextProvider>
    </QueryClientProvider>
  </React.StrictMode>

);