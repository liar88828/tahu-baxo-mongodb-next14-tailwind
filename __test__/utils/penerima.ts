import { DeliveryDB, ReceiverDB } from "@prisma/client";

export async function createPenerima(
  penerima: PenerimaTransaction,
  token: string
): Promise<DeliveryDB> {
  const res = await fetch("http://localhost:3000/api/penerima", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ token }`,
    },
    body: JSON.stringify(penerima),
  })
  const code = res.status
  return await res.json()
}

export type PenerimaTransaction = Omit<ReceiverDB, "id">

