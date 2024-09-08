import { LoginUser, RegisterUser } from "@/interface/model/auth.type";
import { config } from "@/config/baseConfig";
import { ResponseRegister as ResponseAuthUser, UserPublic } from "@/interface/user/UserPublic";
import { cookies } from "next/headers";

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
		throw new Error('api error');
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
		throw new Error('api error');
	}
	const data: ResponseAuthUser = await res.json()
	authCookie().setAuth(data)
	return data
}

export async function apiLogout(form: RegisterUser) {
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
		throw new Error('api error');
	}
	const data: ResponseAuthUser = await res.json()
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
		throw new Error('api error');
	}
	const data: UserPublic = await res.json()
	return data
}

export function authCookie() {
	const cookieStore = cookies()
	
	const getAuth = (): ResponseAuthUser => {
		const cookie = cookieStore.get('auth')
		if (!cookie?.value) {
			throw new Error("Cookie not found")
		}
		return JSON.parse(cookie.value)
	}
	
	return {
		getAuth,
		setAuth: (data: ResponseAuthUser) => {
			// cookieStore.set('access', data.accessToken, { secure: true })
			// cookieStore.set('refresh', data.refreshToken.id, { secure: true })
			// cookieStore.set('user', JSON.stringify(data.data), { secure: true })
			cookieStore.set('auth', JSON.stringify(data), { secure: true })
		},
		deleteAuth: () => {
			cookieStore.delete('session')
			cookieStore.delete('auth')
		}
	}
}
