'use server'
import { cookies } from "next/headers";
import { AuthCookie, ResponseRegister as ResponseAuthUser, UserPublic } from "@/interface/user/UserPublic";
import { decrypt } from "@/server/service/auth/jose.service";
import { ErrorAuth } from "@/lib/error/errorCustome";
import { redirect } from "next/navigation";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

async function getDataCookie(keys: "access" | 'refresh' | 'user'): Promise<RequestCookie> {
	const cookieData = cookies().get(keys)
	return new Promise((resolve) =>
		setTimeout(() => {
			// @ts-ignore
			resolve(cookieData)
		}, 1000)
	)
}

export async function getCookie(keys: "access" | 'refresh' | 'user') {
	const cookie = await getDataCookie(keys)
	if (!cookie) {
		return undefined
	}
	return cookie.value
}

export async function getAccess() {
	const token = await getCookie('access')
	if (!token) {
		throw null
	}
	return token
}

export async function createSession(data: ResponseAuthUser) {
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

async function checkSession() {
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

async function getAuth(): Promise<AuthCookie> {
	const cookieStore = await cookies()
	
	let refresh = cookieStore.get('refresh')
	return {
		accessToken: await getAccess(),
		refreshToken: refresh?.value ?? '',
		data: getData()
	};
}

export async function getDataClient() {
	const data = await getCookie('user')
	if (!data) {
		throw redirect('/auth/login')
	}
	return JSON.parse(data) as UserPublic
}

export async function deleteSession() {
	const cookieStore = await cookies()
	cookieStore.delete('access')
	cookieStore.delete('refresh')
	cookieStore.delete('user')
}

export async function cookieService() {
	
	return {
		getAccess: await getAccess(),
		checkAuth: await checkSession(),
		getAuth: await getAuth(),
		// getData: getData(),
		getDataClient: await getDataClient(),
		setAuth: createSession,
		deleteAuth: await deleteSession()
		
	}
}

