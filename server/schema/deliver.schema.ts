import { z } from "zod"
import {
	addressInit,
	descriptionInit,
	imageInit,
	nameInit,
	phoneInit,
	priceInit,
	typeInit,
	userId,
} from "@/server/schema/init.schema"
import { ISchema } from "@/interface/server/ISchema";
import {
	DeliveryCreate,
	DeliveryCreatePrisma,
	DeliveryUpdate,
	DeliveryUpdatePrisma
} from "@/interface/model/delivery.type";

export class DeliverSchema implements ISchema {
	id = z.number({ required_error: "ID is required" }).optional()
	create = z.object({
		desc: descriptionInit,
		id: this.id,
		img: imageInit,
		location: addressInit,
		name: nameInit,
		phone: phoneInit,
		price: priceInit,
		type: typeInit,
		userId: userId,
	}) satisfies z.Schema<DeliveryCreatePrisma>
	
	update = z.object({
		// id: this.id,
		desc: descriptionInit,
		img: imageInit,
		location: addressInit,
		name: nameInit,
		phone: phoneInit,
		price: priceInit,
		type: typeInit,
	}) satisfies z.Schema<DeliveryUpdatePrisma>
	
	createValid(data: DeliveryCreate) {
		data = this.create.parse(data)
		if (!data) {
			throw new Error("data is not valid")
		}
		return data
	}
	
	updateValid(data: DeliveryUpdate) {
		data = this.update.parse(data)
		if (!data) {
			throw new Error("data is not valid")
		}
		return data
	}
	
}

export const deliverySchema = new DeliverSchema()
