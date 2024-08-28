import {BankCreate} from "@/lib/schema/bank.schema";


export const dataTestCreate: BankCreate = {
  hp: "(024) 1233 1231 2 ",
  img: "not have image",
  no: "1230 1231 1231",
  nama: "mandiri",
  lokasi: "semarang",
  jenis: "atm",
  keterangan: "atm kui di gesek",
}

export const dataTestCreate2: BankCreate = {
  hp: "(024) 1233 12343 ",
  img: "not have image",
  no: "1230 1231 1423",
  nama: "mandiri ku",
  lokasi: "semarang",
  jenis: "atm",
  keterangan: "atm kui di gesek",
}

export const dataTestUpdate = structuredClone(dataTestCreate)
dataTestUpdate.nama = 'name update'

export const dataTestError = structuredClone(dataTestCreate)
//@ts-expect-error
dataTestError.nama = 123
