import { z } from "zod"
import { addressInit, descriptionInit, nameInit, phoneInit, } from "@/server/schema/init.schema"
import type { OrderCreate, OrderDBCreate, } from "@/interface/model/order.type"

export class OrderSchema {
	create = z.object({
		dari: z.string(),
		nama: z.string(),
		pengirim: nameInit,
		hp: phoneInit,
		guna: descriptionInit,
		lokasi: addressInit,
		ongkir: z.number(),
		status: z.string(),
	}) satisfies z.Schema<OrderDBCreate>
	
	validCreate(data: OrderCreate): OrderCreate {
		data = this.create.parse(data)
		if (!data) {
			throw new Error("data order is not valid")
		}
		return data
	}
}

export const orderSchema = new OrderSchema()
