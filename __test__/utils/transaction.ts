import { config } from "@/config/baseConfig"
import { RegisterUser } from "@/interface/model/auth.type";

export const registerUserTransaction: RegisterUser = {
	fullname: "userTransaction",
	email: "userTransaction@gmail.com",
	password: "user1234",
	confPass: "user1234",
	phone: "081 1232 1234",
	address: "jln jakarta raya",
}

export async function deleteTransaction(id: number) {
	const res = await fetch(`${ config.url }/api/transactions/checkout/${ id }`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			// "Authorization": `Bearer ${ token }`
		},
	})
	
	const data = await res.json()
	console.log(data)
}
