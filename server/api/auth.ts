import { LoginUser, RegisterUser } from "@/interface/model/auth.type";
import { config } from "@/config/baseConfig";
import { AuthCookie, ResponseRegister as ResponseAuthUser, UserPublic } from "@/interface/user/UserPublic";
import { cookies } from "next/headers";
import { ErrorAuth } from "@/lib/error/errorCustome";

export async function apiLogin(form: LoginUser): Promise<ResponseAuthUser> {
	const res = await fetch(`${ config.url }/api/user/login`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			cache: "no-cache",
			method: "POST",
			body: JSON.stringify(form),
		}
	)
	if (!res.ok) {
		throw new ErrorAuth('api login is error');
	}
	const data: ResponseAuthUser = await res.json()
	authCookie().setAuth(data)
	return data
}

export async function apiRegister(form: RegisterUser) {
	const res = await fetch(`${ config.url }/api/user/register`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			cache: "no-cache",
			method: "POST",
			body: JSON.stringify(form),
		}
	)
	if (!res.ok) {
		throw new Error('api register is error');
	}
	const data: ResponseAuthUser = await res.json()
	authCookie().setAuth(data)
	return data
}

export async function apiLogout() {
	const res = await fetch(`${ config.url }/api/user/logout`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			cache: "no-cache",
			method: "DELETE",
		}
	)
	if (!res.ok) {
		const data: ResponseAuthUser = await res.json()
		console.log(data)
		throw new ErrorAuth('api auth logout error');
	}
	const data: ResponseAuthUser = await res.json()
	console.log('hello api logout')
	authCookie().deleteAuth()
	return data
}

export async function apiProfile(id: string) {
	const res = await fetch(`${ config.url }/api/user/${ id }`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			cache: "no-cache",
			method: "DELETE",
		}
	)
	if (!res.ok) {
		throw new Error('api profile error');
	}
	const data: UserPublic = await res.json()
	return data
}

export function authCookie() {
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
		let user = cookieStore.get('user')
		
		return {
			accessToken: getAccess(),
			refreshToken: refresh?.value ?? '',
			data: JSON.parse(user?.value ?? '')
		};
	}
	
	const check: Record<keyof AuthCookie, {}> = {
		accessToken: cookieStore.has("access"),
		refreshToken: cookieStore.has("refresh"),
		data: cookieStore.has("user")
	}
	return {
		getAccess: getAccess,
		checkAuth:
		check,
		getAuth: getAuth,
		setAuth: (data: ResponseAuthUser) => {
			cookieStore.set('access', data.accessToken, { secure: true })
			cookieStore.set('refresh', data.refreshToken.id, { secure: true })
			cookieStore.set('user', JSON.stringify(data.data), { secure: true })
			// cookieStore.set('auth', JSON.stringify(data), { secure: true })
		},
		deleteAuth: () => {
			// cookieStore.delete('session')
			cookieStore.delete('access')
			cookieStore.delete('refresh')
			cookieStore.delete('user')
			// cookieStore.delete('auth')
		}
	}
}
