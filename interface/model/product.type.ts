import type { z } from "zod"
import type { ProductDB, User } from "@prisma/client"
import type { productSchema } from "@/server/schema/product.schema"

export type ProductCreatePrisma = Omit<ProductDB, 'id' | "created_at" | "updated_at" | 'img'>
export type ProductUpdatePrisma = Omit<ProductDB, 'id' | "created_at" | "updated_at" | 'img'>
export type ProductCreate = z.output<typeof productSchema.create>
export type ProductUpdate = z.output<typeof productSchema.update>
export type ProductTransaction = {
	qty: ProductDB["qty"]
	productId: ProductDB["id"]
}
export type ProductId = {
	id_product: ProductDB["id"]
	id_user?: User["id"]
}

export type ProductCreateFormError = z.inferFlattenedErrors<typeof productSchema.create>['fieldErrors'];
