import { OrderCreate } from "@/interface/model/order.type";

export const orderTestCreate: OrderCreate = {
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
}