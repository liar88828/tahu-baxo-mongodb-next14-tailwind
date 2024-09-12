import { z } from "zod"
import {
	addressInit,
	descriptionInit,
	imageInit,
	nameInit,
	priceInit,
	qtyInit,
	userId,
} from "@/server/schema/init.schema"
import type { ISchema } from "@/interface/server/ISchema"
import type {
	ProductCreate,
	ProductCreatePrisma,
	ProductTransaction,
	ProductUpdate,
	ProductUpdatePrisma,
} from "@/interface/model/product.type"

export class ProductSchema implements ISchema {
	id = z.number({ required_error: "ID is required" }).optional()
	create = z.object({
		// id: this.id,
		price: priceInit,
		img: imageInit,
		type: z.string({ required_error: "Jenis is required" }).min(1).max(100),
		qty: qtyInit,
		desc: descriptionInit,
		location: addressInit,
		name: nameInit,
		userId: userId,
	}) satisfies z.Schema<ProductCreatePrisma>
	
	update = z.object({
		// id: this.id,
		price: priceInit,
		img: imageInit,
		type: z.string({ required_error: "Jenis is required" }).min(1).max(100),
		qty: qtyInit,
		desc: descriptionInit,
		location: addressInit,
		name: nameInit,
		userId: userId,
	}) satisfies z.Schema<ProductUpdatePrisma>
	
	productTransactionSchema = z.object({
		qty: qtyInit,
		productId: z.number(),
	}) satisfies z.Schema<ProductTransaction>
	
	addStockValid(data: ProductTransaction) {
		data = this.productTransactionSchema.parse(data)
		if (!data) {
			throw new Error("data is Not valid")
		}
		return data
	}
	
	createValid(data: ProductCreate): ProductCreate {
		data = this.create.parse(data)
		if (!data) {
			throw new Error("data is not valid")
		}
		return data
	}
	
	updateValid(data: ProductUpdate): ProductUpdate {
		data = this.update.parse(data)
		if (!data) {
			throw new Error("data is not valid")
		}
		return data
	}
	
}

export const productSchema = new ProductSchema()

