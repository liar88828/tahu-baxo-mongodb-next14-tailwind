import { config } from "@/config/baseConfig";
import type { User } from "@prisma/client";

export type ResponseRegister = {
	accessToken: string
	refreshToken: { id: string }
	data: User
}


export async function registerTest(name: string) {
	const res = await fetch(`${ config.url }/api/user/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"fullname": `${ name }`,
			"email": `${ name }@gmail.com`,
			"password": "user1234",
			"confPass": "user1234",
			"phone": "081 1232 1234",
			"address": "jln jakarta raya"
		})
	})
	const data = await res.json()
	return data as ResponseRegister & { user: User }
}

export async function deleteUserTest(token: string) {
	
	const res = await fetch(`${ config.url }/api/user/delete`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${ token }`
		}
	})
	
	const data = await res.json()
	console.log(data)
}
