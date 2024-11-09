import { transactionSchema } from "@/server/schema/transaction.schema";
import { z } from "zod";
import { orderSchema } from "@/server/schema/order.schema";
import { CheckoutCreate, CheckoutCreateMany } from "@/interface/model/checkout.type";

export class CheckoutSchema {
	create = z.object({
		transaction: transactionSchema.create,
		order: orderSchema.create,
	}) satisfies z.Schema<CheckoutCreate>
	
	createMany = z.object({
		transaction: transactionSchema.createForMany,
		order: orderSchema.create,
		trollyIds: z.object({
			id: z.number(),
			userId: z.string(),
		}).array()
	}) satisfies z.Schema<CheckoutCreateMany>
	
	async checkoutValid(data: CheckoutCreate) {
		const validData = await this.create.parseAsync(data)
		if (!validData) {
			
			throw new Error("Data transaction schema is not valid")
		}
		return validData
	}
	
	async checkoutValidMany(data: CheckoutCreateMany) {
		const validData = await this.createMany.parseAsync(data)
		if (!validData) {
			
			throw new Error("Data transaction schema is not valid")
		}
		return validData
	}
	
	async checkId(id: number) {
		const validData = await z.number().parseAsync(id)
		if (!validData) {
			throw new Error("Data transaction schema is not valid")
		}
		return validData
	}
	
}

export const checkoutSchema = new CheckoutSchema()