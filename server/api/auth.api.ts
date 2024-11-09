import { LoginUser, RegisterUser } from "@/interface/model/auth.type";
import { config } from "@/config/baseConfig";
import { ResponseRegister as ResponseAuthUser, UserPublic } from "@/interface/user/UserPublic";
import { errorApi } from "@/lib/error/errorApi";

export async function apiLogin(form: LoginUser) {
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
		console.log('will throw')
		errorApi(res.status, 'auth', await res.text());
	}
	
	return {
		data: await res.json() as ResponseAuthUser,
		code: res.status
	}
}

export async function apiRegister(form: RegisterUser) {
	const res = await fetch(`${ config.url }/api/user/register`,
		{
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
		}
	)
	
	if (!res.ok) {
		errorApi(res.status, 'auth', await res.text());
	}
	return {
		data: await res.json() as ResponseAuthUser,
		code: res.status
	}
}

export async function apiLogout(userId: string) {
	const res = await fetch(`${ config.url }/api/user/logout/${ userId }`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			cache: "no-cache",
			method: "DELETE",
		}
	)
	
	if (!res.ok) {
		errorApi(res.status, 'logout', await res.text());
	}
	
	console.log(await res.json(), 'test json')
	
	return {
		data: await res.json() as ResponseAuthUser,
		code: res.status
	}
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
	
	return {
		data: await res.json() as UserPublic,
		code: res.status
	}
}

export async function apiRefresh(idRefreshToken: string) {
	try {
		
		const res = await fetch(`${ config.url }/api/user/refresh/${ idRefreshToken }`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				cache: "no-cache",
				method: "GET",
			}
		)
		// console.log(await res.json(), 'response refresh')
		if (!res.ok) {
			errorApi(res.status, 'auth', 'profile failed');
		}
		return {
			data: await res.json(),
			code: res.status
		}
	} catch (e) {
		return false
	}
}

