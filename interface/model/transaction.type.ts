import { TransactionDB } from "@prisma/client"
import { z } from "zod";
import { transactionSchema } from "@/server/schema/transaction.schema";

export type TransactionPrisma = Omit<TransactionDB, "id" | "orderanDBId" | 'created_at' | 'updated_at'>;
export type CreateDB<T> = Omit<T, "userId">

export type CheckoutCreateSchema = z.output<typeof transactionSchema.create>
export type CheckoutCreateManySchema = z.output<typeof transactionSchema.createForMany>
