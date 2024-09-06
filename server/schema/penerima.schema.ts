import { z } from "zod"
import { addressInit, nameInit, phoneInit } from "@/server/schema/init.schema"
import { PenerimaCreate, PenerimaCreatePrisma } from "@/interface/model/penerima.type"

export class PenerimaSchema {
	id = z.number().optional()
	create = z.object({
		nama: nameInit,
		alamat: addressInit,
		hp: phoneInit,
	})satisfies z.Schema<PenerimaCreatePrisma>
	
	update = z.object({
		nama: nameInit,
		alamat: addressInit,
		hp: phoneInit,
	})satisfies z.Schema<PenerimaCreatePrisma>
	
	validCreate(data: PenerimaCreate): PenerimaCreate {
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

export const penerimaSchema = new PenerimaSchema()
// export type PenerimaCreate = Prisma.Args<typeof prisma.penerimaDB, 'create'>['data']
