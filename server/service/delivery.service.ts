import {
  DeliverSchema,
  DeliveryCreate,
  DeliveryId,
  deliverySchema,
  DeliveryUpdate
} from '@/server/schema/deliver.schema'
import prisma from '@/config/prisma'
import { DeliveryDB } from "@prisma/client";

export class ServiceDeliver {
  constructor(
    private valid : DeliverSchema,
  ) {
  }

  async findAll(page : number, take : number) : Promise<DeliveryDB[]> {
    return prisma.$transaction(async (tx) => {
      return tx.deliveryDB.findMany({
        take : take,
        skip : (page - 1) * take,
      })
    })
  }

  async findIdPublic({id_delivery} : Pick<DeliveryId, 'id_delivery'>) : Promise<DeliveryDB> {
    const data = await prisma.deliveryDB.findUnique({where : {id : id_delivery}})
    if (!data) {
      throw new Error("Data delivery is not found")
    }
    return data
  }

  async findIdPrivate({id_delivery, id_user} : DeliveryId) : Promise<DeliveryDB> {
    const data = await prisma.deliveryDB.findUnique({where : {id : id_delivery, userId : id_user}})
    if (!data) {
      throw new Error("Data delivery is not found")
    }
    return data
  }

  async createOne(data : DeliveryCreate) : Promise<DeliveryDB> {
    data = this.valid.createValid(data)
    return prisma.deliveryDB.create({data : {...data}})
  }

  async updateOne(data : DeliveryUpdate, {id_delivery} : DeliveryId) : Promise<DeliveryDB> {
    data = this.valid.updateValid(data)
    return prisma.deliveryDB.update({data : {...data}, where : {id : id_delivery}})
  }

  async deleteOne({id_delivery} : DeliveryId) {
    return prisma.deliveryDB.delete({where : {id : id_delivery}})
  }
}

export const deliveryService = new ServiceDeliver(
  deliverySchema
)
