import { config } from "@/config/baseConfig";
import { ResponseRegister } from "@/interface/user/UserPublic";

const registerData = {
	"fullname": "user5",
	"email": "user5@gmail.com",
	"password": "user1234",
	"confPass": "user1234",
	"phone": "081 1232 1234",
	"address": "jln jakarta raya"
}

export async function registerTest() {
	const res = await fetch(`${ config.url }/api/user/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(registerData)
	})
	const data = await res.json()
	return data as ResponseRegister
}