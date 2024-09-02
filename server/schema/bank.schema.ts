import prisma from "@/config/prisma";
import { z } from 'zod'
import { ISchema } from "@/interface/ISchema";
import { BankDB, Prisma } from '@prisma/client'

export type BankUpdate = Prisma.Args<typeof prisma.bankDB, 'update'>[ 'data' ]
export type BankCreate = Prisma.Args<typeof prisma.bankDB, 'create'>[ 'data' ]
export type BankId = { id_bank : BankDB['id'] }

export class BankSchema implements ISchema {
  id = z.number({required_error : 'ID is required',}).optional()
  update = z.object({
    id : this.id,
    hp : z.string({required_error : 'Hp is required',}).min(2).max(30),
    img : z.string({required_error : 'Img is required',}).optional(),
    no : z.string({required_error : 'No is required',}).min(2).max(30),
    nama : z.string({required_error : 'nama is required',}).min(2).max(30),
    lokasi : z.string({required_error : 'Lokasi is required',}).min(2).max(30),
    jenis : z.string({required_error : 'Jenis is required',}).min(2).max(30),
    keterangan : z.string({required_error : 'Keterangan is required',}).min(2).max(300),
  }) satisfies z.Schema<BankUpdate>

  create = z.object({
    id : this.id,
    hp : z.string({required_error : 'Hp is required',}).min(2).max(18),
    img : z.string({required_error : 'Img is required',}).optional(),
    no : z.string({required_error : 'No is required',}).min(2).max(30),
    nama : z.string({required_error : 'nama is required',}).min(2).max(30),
    lokasi : z.string({required_error : 'Lokasi is required',}).min(2).max(30),
    jenis : z.string({required_error : 'Jenis is required',}).min(2).max(30),
    keterangan : z.string({required_error : 'Keterangan is required',}).min(2).max(300),
  }) satisfies z.Schema<BankCreate>

  createValid(data : BankCreate) : BankCreate {
    data = this.create.parse(data)
    if (!data) {
      throw new Error("data is not valid")
    }
    return data
  }

  updateValid(data : BankUpdate) : BankUpdate {
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
