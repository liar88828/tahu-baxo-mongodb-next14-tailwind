import { BankCreate } from "@/server/schema/bank.schema"
import type { CreateDB } from "@/interface/model/transaction.type";
import { dataTestCreate } from "@/assets/example/bank";


export const dataTestUpdate = structuredClone(dataTestCreate)
dataTestUpdate.name = "name update"

export const dataTestError = structuredClone(dataTestCreate)
//@ts-expect-error
dataTestError.nama = 123
