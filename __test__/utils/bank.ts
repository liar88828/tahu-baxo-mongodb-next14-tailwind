import { BankCreate } from "@/server/schema/bank.schema"

export const dataTestCreate: BankCreate = {
  hp: "(024) 1233 1231 2 ",
  img: "not have image",
  no: "1230 1231 1231",
  nama: "mandiri",
  lokasi: "semarang",
  jenis: "atm",
  keterangan: "atm kui di gesek",
  userId: "asda",
}

export const dataTestCreate2: BankCreate = {
  hp: "(024) 1233 12343 ",
  img: "not have image",
  no: "1230 1231 1423",
  nama: "mandiri ku",
  lokasi: "semarang",
  jenis: "atm",
  keterangan: "atm kui di gesek",
  userId: "asda",
}

export const dataTestUpdate = structuredClone(dataTestCreate)
dataTestUpdate.nama = "name update"

export const dataTestError = structuredClone(dataTestCreate)
//@ts-expect-error
dataTestError.nama = 123
export const bankTransaction = {
  no: "1234-5678-9012-3456",
  hp: "081234567892",
  img: "https://example.com/payment_logo.jpg",
  jenis: "Credit Card",
  keterangan: "Mastercard ending in 3456",
  lokasi: "Jakarta",
  nama: "John Doe",
  userId: "",
}
