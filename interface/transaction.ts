import { OrderCreate } from "@/server/schema/order.schema";
import { TransactionDB } from "@prisma/client";

export type TransactionCreate = {
  transaction : TransactionDB,
  // product: ProductTransaction,
  order : OrderCreate
  // penerima: PenerimaCreate
}
