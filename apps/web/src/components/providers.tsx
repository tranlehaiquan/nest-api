"use client";

import { ApolloProvider } from "@apollo/client";
import type { ReactNode } from "react";
import { apolloClient } from "~/lib/apollo-client";
import { AuthProvider } from "~/lib/auth/auth-context";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ApolloProvider client={apolloClient}>
			<AuthProvider>{children}</AuthProvider>
		</ApolloProvider>
	);
}
