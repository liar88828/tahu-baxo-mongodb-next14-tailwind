import type { OrderCreate } from "@/interface/model/order.type";
import { TrolleyDataId } from "@/interface/model/trolley.type";
import { z } from "zod";
import { checkoutSchema } from "@/server/schema/checkout.schema";
import { OrderanDB, ProductDB, TransactionDB } from "@prisma/client";
import { TransactionPrisma } from "@/interface/model/transaction.type";

export type CheckoutCreate = {
	transaction: TransactionPrisma
	order: OrderCreate,
	
	// product: ProductTransaction,
	// penerima: PenerimaCreate
}
export type CheckoutCreateMany = {
	transaction: TransactionPrisma
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