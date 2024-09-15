import { CheckoutCreateMany, CheckoutCreateSchema } from "@/interface/model/transaction.type";

// export const dataTransaction: CheckoutCreateSchema = {
// 	// penerima: {
// 	// 	nama: "Alice Johnson",
// 	// 	alamat: "Jl. Merdeka No. 123, Jakarta",
// 	// 	hp: "081234567893"
// 	// },
// 	transaction: {
// 		qty: 123,
// 		receiverDBId: 0,
// 		deliveryDBId: 0,
// 		bankDBId: 0,
// 		productDBId: 0,
// 	},
// 	order: {
// 		from: "John Doe",
// 		sender: "Doe Delivery",
// 		name: "Jane Smith",
// 		phone: "081234567890",
// 		desc: "Personal Use",
// 		location: "Jakarta",
// 		shipping_cost: 15000,
// 		status: "Shipped",
// 	},
// }
export const transactionCreateExample: CheckoutCreateSchema = {
	transaction: {
		userId: 'a1413',
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
		total: 15000 * 123
	},
}
export const transactionCreateManyExample: CheckoutCreateMany = {
	transaction: {
		userId: 'a1413',
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
		total: 15000 * 123
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