import { z } from 'zod'
import { ISchema } from '@/interface/ISchema'
import { DeliveryCreate, DeliveryUpdate } from "@/interface/delivery";
import { addressInit, descriptionInit, imageInit, nameInit, phoneInit } from "@/server/schema/init.schema";

export class DeliverSchema implements ISchema {
	id = z.number({ required_error: 'ID is required' }).optional()
	create = z.object({
		id: this.id,
		nama: nameInit,
		hp: phoneInit,
		lokasi: addressInit,
		img: imageInit,
		keterangan: descriptionInit,
		jenis: z.string({ required_error: 'Jenis is required' }).min(1).max(100),
		harga: z
			.number({ required_error: 'Harga is required' })
			.int()
			.nonnegative(),
		userId: z.string().min(1)
		
	}) satisfies z.Schema<DeliveryCreate>
	
	update = z.object({
		id: this.id,
		nama: nameInit,
		hp: phoneInit,
		lokasi: addressInit,
		jenis: z.string({ required_error: 'Jenis is required' }).min(1).max(100),
		img: imageInit,
		keterangan: descriptionInit,
		harga: z
			.number({ required_error: 'Harga is required' })
			.int()
			.nonnegative(),
	}) satisfies z.Schema<DeliveryUpdate>
	
	createValid(data: DeliveryCreate) {
		data = this.create.parse(data)
		if (!data) {
			throw new Error('data is not valid')
		}
		return data
	}
	
	updateValid(data: DeliveryUpdate) {
		data = this.update.parse(data)
		if (!data) {
			throw new Error('data is not valid')
		}
		return data
	}
	
	// idValid(id : number | undefined) : number {
	//   id = this.id.parse(id)
	//   if (!id) {
	//     throw new Error('id is not valid')
	//   }
	//   return id
	// }
}

export const deliverySchema = new DeliverSchema()
