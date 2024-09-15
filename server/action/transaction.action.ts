'use server'
import config from "@/tailwind.config";
import { authCookie } from "@/server/api/authCookie";
import { CheckoutCreateMany } from "@/interface/model/transaction.type";
import { transactionService } from "@/server/service/transaction.service";
import { errorForm } from "@/lib/error/errorForm";
import { TCheckoutContext } from "@/components/provider/ProviderContext";
import { redirect } from "next/navigation";

export const transactionCreate = async (token: string) => {
	return fetch(`${ config.url }/api/transactions/checkout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token
		},
		body: JSON.stringify({})
	})
}

export async function onTransaction(state: TCheckoutContext) {
	// console.log(state, 'state')
	
	try {
		if (!state.bank) {
			return { message: 'Payment method is required' }
		}
		if (!state.delivery) {
			return { message: 'Delivery is required' }
		}
		if (!state.receiver) {
			return { message: 'Receiver is required' }
		}
		if (state.trolleyMany.length === 0) {
			return { message: 'Please Add Trolley is required' }
		}
		const auth = authCookie().getData
		
		const sanitize: CheckoutCreateMany = {
			order: {
				name: state.receiver!!.name,
				from: state.receiver!!.address,
				status: 'Waiting',
				phone: state.receiver!!.phone,
				location: state.receiver!!.address,
				desc: state.description.note,
				shipping_cost: state.description.price,
				sender: state.delivery!!.name,
				total: state.description!!.totalPrice
			},
			transaction: {
				receiverDBId: state.receiver!!.id,
				deliveryDBId: state.delivery!!.id,
				bankDBId: state.bank!!.id,
				userId: auth.id
			},
			trollyIds: state.trolleyMany.map(item => {
					return {
						id: item.id,
						userId: state.delivery!!.userId,
						
					}
				}
			)
		}
		// console.log(sanitize, 'sanitize')
		const res = await transactionService.createMany(sanitize, auth)
		redirect(`/transaction/${ res }`)
		// return { message: '' }
	} catch (e) {
		return errorForm(e)
	}
}

export async function getTransaction() {
	try {
		const auth = authCookie().getData
		return await transactionService.findAll(1, 10, auth)
		
	} catch (e: unknown) {
		console.error(e)
		return null
	}
}

export async function getTransactionComplete(id: number) {
	try {
		const auth = authCookie().getData
		return transactionService.findAllComplete(id, auth)
	} catch (e: unknown) {
		console.error(e)
		return null
	}
}