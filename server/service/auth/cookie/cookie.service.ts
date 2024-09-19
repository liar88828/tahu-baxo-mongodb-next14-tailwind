import { cookies } from "next/headers";
import { AuthCookie, ResponseRegister, UserPublic } from "@/interface/user/UserPublic";
import { decrypt } from "@/server/service/auth/jose.service";
import { ErrorAuth } from "@/lib/error/errorCustome";
import { redirect } from "next/navigation";
import { getCookie, setCookie } from "@/server/service/auth/cookie/cookie.config";

const accessExpiresAt = new Date(Date.now() + 60 * 60 * 1000)
const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

export function getAccess() {
	const token = getCookie('access')
	if (!token) {
		throw null
	}
	return token
}

export function getRefresh() {
	const token = getCookie('refresh')
	if (!token) {
		throw null
	}
	return token
	
}

export function getDataClient() {
	const data = getCookie('user')
	if (!data) {
		throw redirect('/auth/login')
	}
	return JSON.parse(data) as UserPublic
}

export function createSession(data: ResponseRegister) {
	setCookie(data.accessToken, 'access', accessExpiresAt);
	setCookie(JSON.stringify(data.data), 'user', accessExpiresAt);
	setCookie(data.refreshToken.id, 'refresh', refreshExpiresAt);
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

function getAuth(): AuthCookie {
	const cookieStore = cookies()
	
	let refresh = cookieStore.get('refresh')
	return {
		accessToken: getAccess(),
		refreshToken: refresh?.value ?? '',
		data: getData()
	};
}

export function deleteAllCookie() {
	const cookieStore = cookies()
	cookieStore.delete('access')
	cookieStore.delete('refresh')
	cookieStore.delete('user')
}

export function cookieService() {
	
	return {
		getAccess: getAccess(),
		checkAuth: checkSession(),
		getAuth: getAuth(),
		// getData: getData(),
		getDataClient: getDataClient(),
		setAuth: createSession,
		deleteAuth: deleteAllCookie()
		
	}
}

export function updateSession() {
	const cookie = cookies()
	const access = cookie.has('access')
	if (access) {
		const session = cookie.get('access')?.value
		const payload = decrypt(session)
		if (!session || !payload) {
			return null
		}
		cookie.set('access', session, {
			httpOnly: true,
			secure: true,
			expires: accessExpiresAt,
			sameSite: 'lax',
			path: '/',
		})
	}
}

export function getCookieUser() {
	try {
		const access = getAccess()
		// const refresh = getRefresh()
		const user = getDataClient()
		return { access, user }
	} catch (e) {
		redirect('/auth/login')
	}
}