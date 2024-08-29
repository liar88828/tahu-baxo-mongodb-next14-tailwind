import {DeliveryUpdate} from './../db/prisma'
import {DeliverSchema, DeliveryCreate, deliverySchema} from '@/lib/schema/deliver.schema'
import prisma from '@/lib/db/prisma'

export class ServiceDeliver {
  constructor(
    private valid: DeliverSchema,
  ) {
  }

  async findAll(page: number, take: number) {
    return prisma.$transaction(async (tx) => {
      return tx.deliveryDB.findMany({
        take: take,
        skip: (page - 1) * take,
      })
    })
  }

  async findOne(id: number) {
    id = this.valid.idValid(id)
    const data = await prisma.deliveryDB.findUnique({where: {id}})
    if (!data) {
      throw new Error("Data delivery is not found")
    }
    return data
  }

  async createOne(data: DeliveryCreate) {
    data = this.valid.createValid(data)
    return prisma.deliveryDB.create({data: {...data}})
  }

  async updateOne(data: DeliveryUpdate, id: number) {
    data = this.valid.updateValid(data)
    id = this.valid.idValid(id)
    return prisma.deliveryDB.update({data: {...data}, where: {id: id}})
  }

  async deleteOne(id: number) {
    id = this.valid.idValid(id)
    return prisma.deliveryDB.delete({where: {id}})
  }
}


export const deliveryService = new ServiceDeliver(
  deliverySchema
)
