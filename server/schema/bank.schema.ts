import prisma from "@/config/prisma"
import { z } from "zod"
import { BankDB, Prisma, User } from "@prisma/client"
import {
  addressInit,
  descriptionInit,
  imageInit,
  nameInit,
  phoneInit,
} from "@/server/schema/init.schema"
import type { ISchema } from "../../interface/server/ISchema"

export type BankUpdate = Prisma.Args<typeof prisma.bankDB, "update">["data"]
export type BankCreate = Prisma.Args<typeof prisma.bankDB, "create">["data"]
export type BankId = {
  id_bank: BankDB["id"]
  id_user: User["id"]
}

export class BankSchema implements ISchema {
  id = z.number({ required_error: "ID is required" }).optional()
  update = z.object({
    id: this.id,
    hp: phoneInit,
    img: imageInit,
    no: z.string({ required_error: "No is required" }).min(2).max(30),
    nama: nameInit,
    lokasi: addressInit,
    jenis: z.string({ required_error: "Jenis is required" }).min(2).max(30),
    keterangan: descriptionInit,
  }) satisfies z.Schema<BankUpdate>

  create = z.object({
    id: this.id,
    hp: phoneInit,
    img: imageInit,
    no: z.string({ required_error: "No is required" }).min(2).max(30),
    nama: nameInit,
    lokasi: addressInit,
    jenis: z.string({ required_error: "Jenis is required" }).min(2).max(30),
    keterangan: descriptionInit,
    userId: z.string().min(1),
  }) satisfies z.Schema<BankCreate>

  createValid(data: BankCreate): BankCreate {
    data = this.create.parse(data)
    if (!data) {
      throw new Error("data is not valid")
    }
    return data
  }

  updateValid(data: BankUpdate): BankUpdate {
    data = this.update.parse(data)
    if (!data) {
      throw new Error("data is not valid")
    }
    return data
  }

  // idValid(id : string) : number {
  //   let validId = this.id.parse(Number(id))
  //   if (!validId) {
  //     throw new Error("data is not valid")
  //   }
  //   return validId
  // }

  // idValidInt(id : number | undefined) : number {
  //   id = this.id.parse(id)
  //   if (!id) {
  //     throw new Error("data is not valid")
  //   }
  //   return id
  // }
}

export const bankSchema = new BankSchema()
