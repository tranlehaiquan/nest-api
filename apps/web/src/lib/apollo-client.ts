import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "./utils/cookies";

const httpLink = createHttpLink({
	uri: "http://localhost:4000/graphql", // Your GraphQL API endpoint
});

const authLink = setContext(async (_, { headers }) => {
	// Get the authentication token from cookies if it exists
	let token: string | null = null;

	if (typeof window !== "undefined") {
		try {
			token = await getCookie("authToken");
		} catch (error) {
			console.error("Error getting auth token from cookie:", error);
		}
	}

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
