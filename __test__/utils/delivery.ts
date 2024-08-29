import {DeliveryCreate} from "@/lib/schema/deliver.schema";


export const dataTestCreate: DeliveryCreate = {
  "id": 1,
  "nama": "Warung Makan Sederhana",
  "hp": "081234567890",
  "lokasi": "Jakarta, Indonesia",
  "jenis": "Restaurant",
  "harga": 50000,
  "img": "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
  "keterangan": "A popular spot for traditional Indonesian food."
}

export const dataTestCreate2: DeliveryCreate = {
  "id": 2,
  "nama": "Toko Buku Sejahtera",
  "hp": "081987654321",
  "lokasi": "Bandung, Indonesia",
  "jenis": "Bookstore",
  "harga": 100000,
  "img": "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
  "keterangan": "A well-stocked bookstore with a wide variety of genres."
}

export const dataTestUpdate = structuredClone(dataTestCreate)
dataTestUpdate.nama = "Kedai Kopi Nusantara"

export const dataTestError = structuredClone(dataTestCreate)
//@ts-expect-error
dataTestError.nama = 123
