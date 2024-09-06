import { z } from "zod"
import { TrolleyCreate, TrolleyCreatePrisma } from "@/interface/model/trolley.type";

export class TrolleySchema {
	create = z.object({
		id: z.number().min(1).optional(),
		productId: z.number().min(1),
		qty: z.number().min(1),
		userId: z.string().min(1),
		// transactionId: z.number().min(1),
	}) satisfies z.Schema<TrolleyCreatePrisma>
	
	validCreate(data: TrolleyCreate) {
		data = this.create.parse(data)
		if (!data) {
			throw new Error("Data penerima is not valid")
		}
		return data
	}
}

export const trolleySchema = new TrolleySchema()
