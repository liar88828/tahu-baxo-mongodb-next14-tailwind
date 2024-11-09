import { dataTestCreate } from "@/assets/example/bank";

export const dataTestUpdate = structuredClone(dataTestCreate)
dataTestUpdate.name = "name update"

export const dataTestError = structuredClone(dataTestCreate)
//@ts-expect-error
dataTestError.nama = 123
