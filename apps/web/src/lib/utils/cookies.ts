// Cookie utilities using the modern CookieStore API
// https://developer.mozilla.org/en-US/docs/Web/API/CookieStore

const COOKIE_OPTIONS = {
	secure: true,
	sameSite: "strict" as const,
	path: "/",
};

// Check if CookieStore API is available
const hasCookieStore = typeof window !== "undefined" && "cookieStore" in window;

export async function setCookie(
	name: string,
	value: string,
	expires?: Date,
): Promise<void> {
	if (hasCookieStore) {
		try {
			await cookieStore.set({
				name,
				value,
				expires: expires?.getTime(),
				...COOKIE_OPTIONS,
			});
		} catch (error) {
			console.error("Failed to set cookie with CookieStore:", error);
			// Fallback to document.cookie
			fallbackSetCookie(name, value, expires);
		}
	} else {
		// Fallback for older browsers or SSR
		fallbackSetCookie(name, value, expires);
	}
}

export async function getCookie(name: string): Promise<string | null> {
	if (hasCookieStore) {
		try {
			const cookie = await cookieStore.get(name);
			return cookie?.value || null;
		} catch (error) {
			console.error("Failed to get cookie with CookieStore:", error);
			// Fallback to document.cookie
			return fallbackGetCookie(name);
		}
	} else {
		// Fallback for older browsers or SSR
		return fallbackGetCookie(name);
	}
}

export async function deleteCookie(name: string): Promise<void> {
	if (hasCookieStore) {
		try {
			await cookieStore.delete({
				name,
				...COOKIE_OPTIONS,
			});
		} catch (error) {
			console.error("Failed to delete cookie with CookieStore:", error);
			// Fallback to document.cookie
			fallbackDeleteCookie(name);
		}
	} else {
		// Fallback for older browsers or SSR
		fallbackDeleteCookie(name);
	}
}

// Fallback functions using document.cookie
function fallbackSetCookie(name: string, value: string, expires?: Date): void {
	if (typeof document === "undefined") return;

	let cookieString = `${name}=${value}; path=/; SameSite=Strict`;

	if (expires) {
		cookieString += `; expires=${expires.toUTCString()}`;
	}

	if (location.protocol === "https:") {
		cookieString += "; Secure";
	}

	document.cookie = cookieString;
}

function fallbackGetCookie(name: string): string | null {
	if (typeof document === "undefined") return null;

	const nameEQ = name + "=";
	const ca = document.cookie.split(";");

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		if (!c) continue;
		while (c.charAt(0) === " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}

	return null;
}

function fallbackDeleteCookie(name: string): void {
	if (typeof document === "undefined") return;

	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;

	if (location.protocol === "https:") {
		document.cookie += "; Secure";
	}
}
