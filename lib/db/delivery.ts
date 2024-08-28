import prisma from '@/lib/db/prisma';
import {TCREATEDELIVER, TUPDATEDELIVER} from '@/lib/validator/zod';

export class DeliveryRepo {

  async findPaginate( page: number, take: number ) {
    return prisma.$transaction( async ( tx ) => {
      const count = await tx.deliveryDB.count()
      const res = await tx.deliveryDB.findMany({
        take: take,
        skip: ( page - 1 ) * take,
      } )
      return { res, count }
    } )
  }
  async createOne( data: TCREATEDELIVER ) {
    return prisma.deliveryDB.create({data: {...data}})
  }
  async findAll() {
    return prisma.deliveryDB.findMany()
  }

  async findOne(id: number) {
    return prisma.deliveryDB.findUnique({where: {id}})
  }

  async deleteOne(id: number) {
    return prisma.deliveryDB.delete({where: {id}})
  }

  async updateOne(data: TUPDATEDELIVER, id: number,) {
    return prisma.deliveryDB.update({data: {...data}, where: {id: id}})
  }
}

export const delivery = new DeliveryRepo()
