import { z } from "zod";
import { Prisma } from "@prisma/client";
import prisma from "@/config/prisma";

export class PenerimaSchema {
  id = z.number().optional()
  create = z.object({
    id : this.id,
    nama : z.string().min(1).max(50),
    alamat : z.string().min(1).max(50),
    hp : z.string().min(1).max(20),

  }) satisfies z.Schema<PenerimaCreate>

  update = z.object({
    nama : z.string().min(1).max(50),
    alamat : z.string().min(1).max(50),
    hp : z.string().min(1).max(20),
  })satisfies z.Schema<PenerimaCreate>

  validCreate(data : PenerimaCreate) : PenerimaCreate {
    data = this.create.parse(data)
    if (!data) {
      throw new Error('Data penerima is not valid')
    }
    return data
  }

  validId(id : number | undefined) {
    id = this.id.parse(id)
    if (!id) {
      throw new Error('id penerima is not valid')
    }
    return id
  }
}

export type PenerimaCreate = Prisma.Args<typeof prisma.penerimaDB, 'create'>['data']

export const penerimaSchema = new PenerimaSchema()
