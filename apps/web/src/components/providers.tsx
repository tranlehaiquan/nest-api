'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '~/lib/apollo-client';
import { AuthProvider } from '~/lib/auth/auth-context';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApolloProvider>
  );
} 