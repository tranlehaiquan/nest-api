"use client";

import { useLazyQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { WHO_AM_I_QUERY } from "../graphql/mutations";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";

const TOKEN_COOKIE_NAME = "authToken";

interface User {
	id: string;
	username: string;
	email: string;
	bio: string;
	image: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (userData: User, authToken: string) => void;
	logout: () => void;
	isLoading: boolean;
	refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const [fetchUser] = useLazyQuery(WHO_AM_I_QUERY, {
		onCompleted: (data) => {
			if (data.whoAmI) {
				setUser(data.whoAmI);
			}
			setIsLoading(false);
		},
		onError: async (error) => {
			console.error("Error fetching user data:", error);
			// If whoAmI fails, clear stored auth data
			await deleteCookie(TOKEN_COOKIE_NAME);
			setToken(null);
			setUser(null);
			setIsLoading(false);
		},
	});

	useEffect(() => {
		const initAuth = async () => {
			try {
				// Check for existing token in cookies
				const storedToken = await getCookie(TOKEN_COOKIE_NAME);

				if (storedToken) {
					setToken(storedToken);
					// Fetch fresh user data with the token
					fetchUser();
				} else {
					setIsLoading(false);
				}
			} catch (error) {
				console.error("Error initializing auth:", error);
				setIsLoading(false);
			}
		};

		initAuth();
	}, [fetchUser]);

	const login = async (userData: User, authToken: string) => {
		try {
			setUser(userData);
			setToken(authToken);
			// Set cookie with 7 days expiration
			const expires = new Date();
			expires.setDate(expires.getDate() + 7);
			await setCookie(TOKEN_COOKIE_NAME, authToken, expires);
		} catch (error) {
			console.error("Error setting auth cookie:", error);
		}
	};

	const logout = async () => {
		try {
			setUser(null);
			setToken(null);
			await deleteCookie(TOKEN_COOKIE_NAME);
		} catch (error) {
			console.error("Error clearing auth cookie:", error);
		}
	};

	const refetchUser = () => {
		if (token) {
			fetchUser();
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, token, login, logout, isLoading, refetchUser }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
