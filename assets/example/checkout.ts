import { CheckoutCreateMany, CheckoutCreateSchema } from "@/interface/model/checkout.type";

export const checkoutCreateExample: CheckoutCreateSchema = {
	transaction: {
		userId: 'cm0ray6cb0001rsx0eaaiat90',
		qty: 123,
		receiverDBId: 123,
		deliveryDBId: 123,
		bankDBId: 123,
		productDBId: 123
	},
	order: {
		from: "John Doe",
		sender: "Doe Delivery",
		name: "Jane Smith",
		phone: "081234567890",
		desc: "Personal Use",
		location: "Jakarta",
		shipping_cost: 15000,
		status: "Shipped",
		total: 15000 * 123,
		sub_total: 134
	},
}
export const checkoutCreateManyExample: CheckoutCreateMany = {
	transaction: {
		userId: 'cm0ray6cb0001rsx0eaaiat90',
		receiverDBId: 123,
		deliveryDBId: 123,
		bankDBId: 123,
	},
	order: {
		from: "John Doe",
		sender: "Doe Delivery",
		name: "Jane Smith",
		phone: "081234567890",
		desc: "Personal Use",
		location: "Jakarta",
		shipping_cost: 15000,
		status: "Shipped",
		total: 15000 * 123,
		sub_total: 15000
	},
	trollyIds: [
		{
			id: 12,
			userId: ''
		},
		{
			id: 432,
			userId: ''
		}
	]
}