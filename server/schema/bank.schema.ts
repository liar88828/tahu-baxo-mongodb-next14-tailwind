import prisma from "@/config/prisma"
import { z } from "zod"
import { BankDB, Prisma, User } from "@prisma/client"
import { addressInit, descriptionInit, imageInit, nameInit, phoneInit, userId, } from "@/server/schema/init.schema"
import type { ISchema } from "@/interface/server/ISchema"

export type BankUpdate = Prisma.Args<typeof prisma.bankDB, "update">["data"]
export type BankCreate = Prisma.Args<typeof prisma.bankDB, "create">["data"]
export type BankId = {
	id_bank: BankDB["id"]
	id_user: User["id"]
}

export class BankSchema implements ISchema {
	id = z.number({ required_error: "ID is required" }).optional()
	update = z.object({
		id: this.id,
		phone: phoneInit,
		img: imageInit,
		no_req: z.string({ required_error: "No is required" }).min(2).max(30),
		name: nameInit,
		location: addressInit,
		type: z.string({ required_error: "Jenis is required" }).min(2).max(30),
		desc: descriptionInit,
	}) satisfies z.Schema<BankUpdate>
	
	create = z.object({
		id: this.id,
		phone: phoneInit,
		img: imageInit,
		no_req: z.string({ required_error: "No is required" }).min(2).max(30),
		name: nameInit,
		location: addressInit,
		type: z.string({ required_error: "Jenis is required" }).min(2).max(30),
		desc: descriptionInit,
		userId: userId,
	}) satisfies z.Schema<BankCreate>
	
	createValid(data: BankCreate): BankCreate {
		data = this.create.parse(data)
		if (!data) {
			throw new Error("data is not valid")
		}
		return data
	}
	
	updateValid(data: BankUpdate): BankUpdate {
		data = this.update.parse(data)
		if (!data) {
			throw new Error("data is not valid")
		}
		return data
	}
	
}

export const bankSchema = new BankSchema()
