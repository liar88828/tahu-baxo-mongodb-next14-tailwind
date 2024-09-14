'use server'
import config from "@/tailwind.config";
import { authCookie } from "@/server/api/authCookie";
import { CheckoutCreateMany } from "@/interface/model/transaction.type";

export async function onTransaction(data: CheckoutCreateMany) {
	try {
		
		const auth = authCookie().getAccess()
		const res = await fetch(`${ config.url }/api/transactions/checkout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + auth
			},
			body: JSON.stringify({})
		})
	} catch (e) {
		console.error(e)
	}
	return
}
