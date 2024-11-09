import { cookies } from "next/headers";

export function getCookie(keys: "access" | 'refresh' | 'user') {
	const cookie = cookies().get(keys)
	if (!cookie) {
		return undefined
	}
	return cookie.value
}

export function setCookie(data: string, keys: 'access' | 'refresh' | 'user', expired: Date) {
	const cookieStore = cookies()
	cookieStore.set(keys, data, {
		httpOnly: true,
		secure: true,
		expires: expired,
		sameSite: 'lax',
		path: '/',
	})
	return cookieStore;
}
