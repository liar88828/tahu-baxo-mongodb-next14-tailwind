import {DeliveryUpdate} from './../db/prisma'
import {DeliveryCreate} from './../validator/schema/deliver.schema'
import prisma from '@/lib/db/prisma'

export class ServiceDeliver {
  async findAll(page: number, take: number) {
    return prisma.$transaction(async (tx) => {
      return tx.deliveryDB.findMany({
        take: take,
        skip: (page - 1) * take,
      })
    })
  }

  async findOne(id: number) {
    const data = await prisma.deliveryDB.findUnique({where: {id}})

    if (!data) {
      throw new Error("Data delivery is not found")
    }
    return data
  }

  async createOne(data: DeliveryCreate) {
    return prisma.deliveryDB.create({data: {...data}})
  }

  async updateOne(data: DeliveryUpdate, id: number) {
    return prisma.deliveryDB.update({data: {...data}, where: {id: id}})
  }

  async deleteOne(id: number) {
    return prisma.deliveryDB.findUnique({where: {id}})
  }
}
