import type { DeliveryDB, PenerimaDB } from "@prisma/client"

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
export const penerimaTransaction: PenerimaTransaction = {
  nama: "Alice Johnson",
  alamat: "Jl. Merdeka No. 123, Jakarta",
  hp: "081234567893",
  userId: "",
}
export type PenerimaTransaction = Omit<PenerimaDB, "id">

