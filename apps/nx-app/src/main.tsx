import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ErrorBoundary } from 'react-error-boundary';

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ErrorBoundary fallbackRender={() => <div>Dude Crash whole app T_T</div>}>
        <App />
      </ErrorBoundary>
    </ApolloProvider>
  </React.StrictMode>,
);
