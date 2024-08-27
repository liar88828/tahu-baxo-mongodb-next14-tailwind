import prisma, {BankUpdate} from "@/lib/db/prisma";
import {z} from 'zod'
import {ISchema} from "@/interface/ISchema";

export type BankUpdate = Prisma.Args<typeof prisma.bank, 'update'>['data']
export type BankCreate = Prisma.Args<typeof prisma.bank, 'create'>['data']

export class BankSchema implements ISchema {
  id = z.string({required_error: 'ID is required',}).optional()
  update = z.object({
    id: this.id,
    hp: z.string({required_error: 'Hp is required',}).min(2).max(30),
    img: z.string({required_error: 'Img is required',}).min(2).max(300),
    no: z.string({required_error: 'No is required',}).min(2).max(30),
    nama: z.string({required_error: 'nama is required',}).min(2).max(30),
    lokasi: z.string({required_error: 'Lokasi is required',}).min(2).max(30),
    jenis: z.string({required_error: 'Jenis is required',}).min(2).max(30),
    keterangan: z.string({required_error: 'Keterangan is required',}).min(2).max(300),
  }) satisfies z.Schema<BankUpdate>

  create = z.object({
    id: this.id,
    hp: z.string({required_error: 'Hp is required',}).min(2).max(30),
    img: z.string({required_error: 'Img is required',}).min(2).max(300),
    no: z.string({required_error: 'No is required',}).min(2).max(30),
    nama: z.string({required_error: 'nama is required',}).min(2).max(30),
    lokasi: z.string({required_error: 'Lokasi is required',}).min(2).max(30),
    jenis: z.string({required_error: 'Jenis is required',}).min(2).max(30),
    keterangan: z.string({required_error: 'Keterangan is required',}).min(2).max(300),
  }) satisfies z.Schema<BankCreate>

  createValid(data: Object) {
    data = this.create.parse(data)
    if (!data) {
      throw new Error("data is not valid")
    }
    return data
  }

  updateValid(data: Object) {
    data = this.update.parse(data)
    if (!data) {
      throw new Error("data is not valid")
    }
    return data
  }

  idValid(id: Number) {
    id = this.id.parse(id)
    if (!id) {
      throw new Error("data is not valid")
    }
    return id
  }
}
