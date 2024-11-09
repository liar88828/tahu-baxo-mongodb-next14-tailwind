import type { BankDB, ProductDB } from "@prisma/client"
import type { CreateDB } from "@/interface/model/transaction.type"
import type { ProductCreate } from "@/interface/model/product.type"
import { BankCreatePrisma } from "@/interface/model/bank.type";

export async function createBank(
  bank: CreateDB<BankCreatePrisma>,
  token: string
): Promise<BankDB> {
  const res = await fetch("http://localhost:3000/api/bank", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ token }`,
    },
    body: JSON.stringify(bank),
  })
  const code = res.status
  return await res.json()
}
export async function createProduct(
  product: CreateDB<ProductCreate>,
  token: string
): Promise<ProductDB> {
  const res = await fetch("http://localhost:3000/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ token }`,
    },
    body: JSON.stringify(product),
  })
  const code = res.status
  return await res.json()
}

