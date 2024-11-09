import { z } from "zod"
import { addressInit, descriptionInit, imageInit, nameInit, phoneInit, userId, } from "@/server/schema/init.schema"
import type { ISchema } from "@/interface/server/ISchema"
import { BankCreatePrisma, BankUpdatePrisma } from "@/interface/model/bank.type";

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
	}) satisfies z.Schema<BankUpdatePrisma>
	
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
	}) satisfies z.Schema<BankCreatePrisma>
	
	createValid(data: BankCreatePrisma): BankCreatePrisma {
		data = this.create.parse(data)
		if (!data) {
			throw new Error("data is not valid")
		}
		return data
	}
	
	updateValid(data: BankUpdatePrisma): BankUpdatePrisma {
		data = this.update.parse(data)
		if (!data) {
			throw new Error("data is not valid")
		}
		return data
	}
	
}

export const bankSchema = new BankSchema()
