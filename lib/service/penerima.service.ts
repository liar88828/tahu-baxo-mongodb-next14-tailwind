import {PenerimaCreate, penerimaSchema, PenerimaSchema} from "@/lib/schema/penerima.schema";
import prisma from "@/lib/db/prisma";


export class PenerimaService {
  constructor(
    private valid: PenerimaSchema
  ) {
  }

  async findAll(page: number, take: number) {
    return prisma.penerimaDB.findMany({
      take: take,
      skip: (page - 1) * take,
    })
  }

  async findOne(id: number) {
    id = this.valid.validId(id)
    const data = await prisma.penerimaDB.findUnique({where: {id}})
    if (!data) {
      throw new Error('Data Penerima is not found')
    }
    return data
  }

  async createOne(data: PenerimaCreate) {
    const {id, ...validData} = this.valid.validCreate(data)
    return prisma.penerimaDB.create({
      data: {
        nama: validData.nama,
        alamat: validData.alamat,
        hp: validData.hp,
        ...(id ? {id} : {})
      }
    })
  }

  async updateOne(data: any, id: number) {
    id = this.valid.validId(id)
    data = this.valid.validCreate(data)
    return prisma.penerimaDB.update({
      where: {id},
      data: {
        nama: data.nama,
        alamat: data.alamat,
        hp: data.hp,
      }
    })

  }

  async deleteOne(id: number) {
    id = this.valid.validId(id)
    const data = await prisma.penerimaDB.delete({where: {id}})
    if (!data) {
      throw new Error('Data Penerima is not found')
    }
    return data
  }


}

export const penerimaService = new PenerimaService(
  penerimaSchema
)
