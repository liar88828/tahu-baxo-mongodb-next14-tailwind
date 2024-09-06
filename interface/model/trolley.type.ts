import type { ProductDB, TrolleyDB } from "@prisma/client"
import { z } from "zod";
import { trolleySchema } from "@/server/schema/trolley.schema";

export type TrolleyUpdatePrisma = Omit<TrolleyDB, 'transactionId'>
export type TrolleyCreatePrisma = Omit<TrolleyDB, 'transactionId' | 'id'>
export type TrolleyUpdate = z.output<typeof trolleySchema.update>
export type TrolleyCreate = z.output<typeof trolleySchema.create>
export type TrolleyDataId = Pick<TrolleyDB, "id">
export type GetAllTrolley = TrolleyDB & { Product: ProductDB | null }

const id: TrolleyDataId = {
	id: 1
}