'use server'
import { LoginUser, RegisterUser } from "@/interface/model/auth.type";
import { config } from "@/config/baseConfig";
import { ResponseRegister as ResponseAuthUser, UserPublic } from "@/interface/user/UserPublic";
import { authCookie } from "@/server/api/authCookie";
import { errorApi } from "@/lib/error/errorApi";

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
		errorApi(res.status, 'auth', 'login failed');
	}

	const data: ResponseAuthUser = await res.json()
	// console.log(data,'api user')
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
		errorApi(res.status, 'auth', 'register failed');
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
		errorApi(res.status, 'auth', 'logout failed');
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
		errorApi(res.status, 'auth', 'profile failed');
	}
	const data: UserPublic = await res.json()
	return data
}

