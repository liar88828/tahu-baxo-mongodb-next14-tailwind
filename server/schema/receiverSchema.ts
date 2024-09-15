import { z } from "zod"
import { addressInit, nameInit, phoneInit, userId } from "@/server/schema/init.schema"
import { ReceiverCreate, ReceiverCreatePrisma, ReceiverUpdatePrisma } from "@/interface/model/receiver.type";

export class ReceiverSchema {
	id = z.number().optional()
	create = z.object({
		name: nameInit,
		address: addressInit,
		phone: phoneInit,
		userId: userId
	})satisfies z.Schema<ReceiverCreatePrisma>
	
	update = z.object({
		name: nameInit,
		address: addressInit,
		phone: phoneInit,
	})satisfies z.Schema<ReceiverUpdatePrisma>
	
	validCreate(data: ReceiverCreate): ReceiverCreate {
		data = this.create.parse(data)
		if (!data) {
			throw new Error("Data penerima is not valid")
		}
		return data
	}
	
	// validId(id: number | undefined) {
	// 	id = this.id.parse(id)
	// 	if (!id) {
	// 		throw new Error('id penerima is not valid')
	// 	}
	// 	return id
	// }
}

export const receiverSchema = new ReceiverSchema()
// export type PenerimaCreate = Prisma.Args<typeof prisma.penerimaDB, 'create'>['data']
