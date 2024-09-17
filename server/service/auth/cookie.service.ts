import { cookies } from "next/headers";
import { AuthCookie, ResponseRegister as ResponseAuthUser, UserPublic } from "@/interface/user/UserPublic";
import { decrypt } from "@/server/service/auth/jose.service";
import { ErrorAuth } from "@/lib/error/errorCustome";

const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

export function createSession(data: ResponseAuthUser) {
	// access
	const cookieStore = cookies()
	cookieStore.set('access', data.accessToken, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	})
	// refresh
	cookieStore.set('refresh', data.refreshToken.id, { secure: true })
	cookieStore.set('user', JSON.stringify(data.data), { secure: true })
	// cookieStore.set('auth', JSON.stringify(data), { secure: true })
}

export async function getSession() {
	return cookies().get('access')?.value
}

export async function updateSession() {
	const cookie = cookies()
	const access = cookie.has('access')
	if (access) {
		const session = cookie.get('access')?.value
		const payload = await decrypt(session)
		if (!session || !payload) {
			return null
		}
		cookie.set('access', session, {
			httpOnly: true,
			secure: true,
			expires: expiresAt,
			sameSite: 'lax',
			path: '/',
		})
	}
}

export function checkSession() {
	const cookieStore = cookies()
	return {
		accessToken: cookieStore.has("access") ?? null,
		refreshToken: cookieStore.has("refresh") ?? null,
		data: cookieStore.has("user") ?? null
	}
}

const getData = () => {
	const cookieStore = cookies()
	const user = cookieStore.has("user")
	if (!user) {
		throw new ErrorAuth('unauthorized', "Not have token in Cookie")
		// return null
	}
	const userCookie = cookieStore.get('user')
	return JSON.parse(userCookie?.value ?? '') as UserPublic
}

export function cookieService() {
	const cookieStore = cookies()
	
	const getAccess = () => {
		if (cookieStore.has("access")) {
			const access = cookieStore.get('access')
			return access?.value ?? ''
		}
		return ''
	}

	const getAuth = (): AuthCookie => {
		let refresh = cookieStore.get('refresh')
		
		return {
			accessToken: getAccess(),
			refreshToken: refresh?.value ?? '',
			data: getData()
		};
	}
	
	function deleteSession() {
		cookieStore.delete('access')
		cookieStore.delete('refresh')
		cookieStore.delete('user')
	}
	
	return {
		getAccess: getAccess,
		checkAuth: checkSession(),
		getAuth: getAuth,
		getData: getData(),
		setAuth: createSession,
		deleteAuth: deleteSession
		
	}
}