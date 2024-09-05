import { OrderCreate } from "@/server/schema/order.schema";
import { OrderanDB, PenerimaDB, ProductDB, TransactionDB } from "@prisma/client";
import { PenerimaCreate } from "@/server/schema/penerima.schema";

export type TransactionCreate = {
	transaction: Omit<TransactionDB, 'id' | 'orderanDBId'>,
	// product: ProductTransaction,
	// penerima: PenerimaCreate
	order: OrderCreate
}


export type ResponseTransaction = {
	orderanDB: OrderanDB,
	productDB: ProductDB,
	transactionDB: TransactionDB,
	// penerimaDB: PenerimaDB,
};