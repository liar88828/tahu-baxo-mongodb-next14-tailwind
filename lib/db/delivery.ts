import prisma from '@/lib/db/prisma';
import { TCREATEDELIVER, TUPDATEDELIVER } from '@/lib/validator/zod';

export class DeliveryRepo {

  async findPaginate( page: number, take: number ) {
    return prisma.$transaction( async ( tx ) => {
      const count = await tx.delivery.count()
      const res   = await tx.delivery.findMany( {
        take: take,
        skip: ( page - 1 ) * take,
      } )
      return { res, count }
    } )
  }
  async createOne( data: TCREATEDELIVER ) {
    return prisma.delivery.create( { data: { ...data } } )
  }
  async findAll() {
    return prisma.delivery.findMany()
  }
  async findOne( id: string ) {
    return prisma.delivery.findUnique( { where: { id } } )
  }

  async deleteOne( id: string ) {
    return prisma.delivery.delete( { where: { id } } )
  }

  async updateOne( data: TUPDATEDELIVER, id: string, ) {
    return prisma.delivery.update( { data: { ...data }, where: { id: id } } )
  }
}

export const delivery = new DeliveryRepo()