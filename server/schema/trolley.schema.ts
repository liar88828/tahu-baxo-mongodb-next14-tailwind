import { z } from "zod"
import { TrolleyCreate, TrolleyCreatePrisma, TrolleyUpdate, TrolleyUpdatePrisma } from "@/interface/model/trolley.type";

export class TrolleySchema {
	create = z.object({
		productId: z.number().min(1),
		qty: z.number().nonnegative(),
		userId: z.string().min(1),
	}) satisfies z.Schema<TrolleyCreatePrisma>
	
	update = z.object({
		id: z.number().min(1),
		productId: z.number().min(1),
		qty: z.number().min(1),
		userId: z.string().min(1),
		// transactionId: z.number().min(1),
	}) satisfies z.Schema<TrolleyUpdatePrisma>
	
	validCreate(data: TrolleyCreate) {
		data = this.create.parse(data)
		if (!data) {
			throw new Error("Create Error Data Trolley is not match")
		}
		return data
	}
	
	validUpdate(data: TrolleyUpdate) {
		data = this.update.parse(data)
		if (!data) {
			throw new Error("Update Error Data Trolley is not match")
		}
		return data
	}
	
}

export const trolleySchema = new TrolleySchema()
