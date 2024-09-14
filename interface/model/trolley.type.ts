import { ProductDB, TrolleyDB } from "@prisma/client"
import { z } from "zod";
import { trolleySchema } from "@/server/schema/trolley.schema";

export type TrolleyUpdatePrisma = Omit<TrolleyDB, 'transactionId'>
export type TrolleyCreatePrisma = Omit<TrolleyDB, 'transactionId' | 'id'>
export type TrolleyUpdate = z.output<typeof trolleySchema.update>
export type TrolleyCreate = z.output<typeof trolleySchema.create>
export type TrolleyDataId = Pick<TrolleyDB, "id" | 'userId'>
export type GetAllTrolley = TrolleyDB & { Product: ProductDB | null }
export type GetAllTrolleyContext = TrolleyDB & { Product: ProductDB }

const id: TrolleyDataId = {
	id: 1,
	userId: ""
}
export type TrolleyResponse = { data: Omit<TrolleyDB, 'transactionId'>, status: string };