import type { DeliveryDB } from "@prisma/client"
import type { DeliveryCreate } from "@/interface/model/delivery.type"
import type { CreateDB } from "@/interface/model/transaction.type"
import { dataTestCreate } from "@/assets/example/delivery";


export const dataTestUpdate = structuredClone(dataTestCreate)
dataTestUpdate.name = "Kedai Kopi Nusantara"

export const dataTestError = structuredClone(dataTestCreate)
//@ts-expect-error
dataTestError.nama = 123
export async function createDelivery(
  delivery: CreateDB<DeliveryCreate>,
  token: string
): Promise<DeliveryDB> {
  const res = await fetch("http://localhost:3000/api/delivery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ token }`,
    },
    body: JSON.stringify(delivery),
  })
  const code = res.status
  return await res.json()
}
