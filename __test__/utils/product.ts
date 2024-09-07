import type { BankDB, ProductDB } from "@prisma/client"
import type { CreateDB } from "@/interface/model/transaction.type"
import type { BankCreate } from "@/server/schema/bank.schema"
import type { ProductCreate } from "@/interface/model/product.type"

export async function createBank(
  bank: CreateDB<BankCreate>,
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

export const productTransaction = {
  jumlah: 10,
  nama: "Laptop XYZ",
  lokasi: "Surabaya",
  jenis: "Electronics",
  harga: 7500000,
  keterangan: "Brand new laptop with 16GB RAM and 512GB SSD",
  id: 101,
  img: "https://example.com/laptop_xyz.jpg",
  userId: "",
}
