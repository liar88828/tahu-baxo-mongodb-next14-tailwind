import { OrderanDB, ProductDB, TransactionDB } from "@prisma/client"
import type { OrderCreate } from "./order.type"
import { z } from "zod";
import { checkoutSchema } from "@/server/schema/checkout.schema";
import { TrolleyDataId } from "@/interface/model/trolley.type";

export type CheckoutCreate = {
	transaction: Omit<TransactionDB, "id" | "orderanDBId">
	order: OrderCreate,
	
	// product: ProductTransaction,
	// penerima: PenerimaCreate
}

export type CheckoutCreateMany = {
	transaction: Omit<TransactionDB, "id" | "orderanDBId">
	order: OrderCreate,
	trollyIds: TrolleyDataId[]
	
	// product: ProductTransaction,
	// penerima: PenerimaCreate
}

export type ResponseCheckout = {
	orderanDB: OrderanDB
	productDB: ProductDB
	transactionDB: TransactionDB
	// penerimaDB: PenerimaDB,
}
export type CheckoutCreateSchema = z.output<typeof checkoutSchema.create>
export type CreateDB<T> = Omit<T, "userId">
