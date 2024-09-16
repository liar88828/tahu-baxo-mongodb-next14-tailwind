import { CheckoutCreateManySchema, CheckoutCreateSchema } from "@/interface/model/transaction.type";

export const transactionCreateExample: CheckoutCreateSchema = {
	qty: 123,
		receiverDBId: 123,
		deliveryDBId: 123,
		bankDBId: 123,
	productDBId: 123,
	userId: 'cm0ray6cb0001rsx0eaaiat90'
}
export const transactionCreateManyExample: CheckoutCreateManySchema = {
	userId: 'cm0ray6cb0001rsx0eaaiat90',
		receiverDBId: 123,
		deliveryDBId: 123,
		bankDBId: 123,
	
}