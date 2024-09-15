import type { z } from "zod";
import { bankSchema } from "@/server/schema/bank.schema";
import { BankDB, Prisma, User } from "@prisma/client";
import prisma from "@/config/prisma";
//
export type BankUpdate = Prisma.Args<typeof prisma.bankDB, "update">["data"]
export type BankCreate = Prisma.Args<typeof prisma.bankDB, "create">["data"]
//
export type BankId = {
	id_bank: BankDB["id"]
	id_user: User["id"]
}
export type BankData = Omit<BankDB, 'updated_at' | 'created_at'>
//
export type BankCreateFormError = z.inferFlattenedErrors<typeof bankSchema.create>['fieldErrors'];
//
export type BankCreateKey = Record<keyof BankCreate, any>
