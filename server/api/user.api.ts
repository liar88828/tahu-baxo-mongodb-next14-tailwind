import { UserPublic } from "@/interface/user/UserPublic";
import { config } from "@/config/baseConfig";

export async function apiGetUserId(id_user: string) {
	const res = await fetch(`${ config.url }/api/user/${ id_user }`, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		throw new Error('user api error');
	}
	return {
		data: await res.json() as UserPublic,
		code: res.status,
	}
}

export async function apiGetUserAll() {
	const res = await fetch(`${ config.url }/api/user/`, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		throw new Error('api error');
	}
	return {
		data: await res.json() as UserPublic[],
		code: res.status,
	}
}