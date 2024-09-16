import { z } from "zod"
import { productSchema, ProductSchema } from "@/server/schema/product.schema"
import { orderSchema, OrderSchema } from "@/server/schema/order.schema"
import { userId } from "@/server/schema/init.schema";
import { TransactionPrisma } from "@/interface/model/transaction.type";
import { receiverSchema, ReceiverSchema } from "@/server/schema/receiver.schema";

export class TransactionSchema {
	
	create = z.object({
		qty: z.number(),
		productDBId: z.number(),
		receiverDBId: z.number(),
		deliveryDBId: z.number(),
		bankDBId: z.number(),
		userId: userId
	}) satisfies z.Schema<TransactionPrisma>
	
	createForMany = z.object({
		receiverDBId: z.number(),
		deliveryDBId: z.number(),
		bankDBId: z.number(),
		userId: userId
	}) satisfies z.Schema<TransactionPrisma>
	
	constructor(
		private productSchema: ProductSchema,
		private penerimaSchema: ReceiverSchema,
		private orderSchema: OrderSchema
	) {
	}
	
	// orderValid(data: OrderCreate) {
	// 	data = this.orderSchema.create.parse(data)
	// 	if (!data) {
	// 		throw new Error("data is Not valid")
	// 	}
	// 	return data
	// }
	
	orderValid(data: TransactionPrisma) {
		data = this.create.parse(data)
		if (!data) {
			throw new Error("data is Not valid")
		}
		return data
	}
	
	orderValidMany(data: TransactionPrisma) {
		data = this.createForMany.parse(data)
		if (!data) {
			throw new Error("data is Not valid")
		}
		return data
	}
	
	idProduct(id: number) {
		id = z.number().parse(id)
		if (!id) {
			throw new Error("data is Not valid")
		}
		return id
	}
	
}

export const transactionSchema = new TransactionSchema(
	productSchema,
	receiverSchema,
	orderSchema
)
export const order = {
	dari: "John Doe",
	pengirim: "Doe Delivery",
	nama: "Jane Smith",
	hp: "081234567890",
	pesan: new Date("2024-09-01T08:30:00Z"),
	waktuKirim: new Date("2024-09-02T10:00:00Z"),
	guna: "Personal Use",
	lokasi: "Jakarta",
	ongkir: 15000,
	typePembayaran: "Bank Transfer",
	totalBayar: 500000,
	totalPenjualan: 450000,
	status: "Shipped",
	created_at: new Date("2024-09-01T07:00:00Z"),
	updated_at: new Date("2024-09-01T08:00:00Z"),
}
