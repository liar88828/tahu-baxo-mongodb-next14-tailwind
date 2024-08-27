import { DeliveryUpdate } from '../db/prisma';
import { DeliveryCreate } from '../validator/schema/deliver.schema';
import prisma from '@/lib/db/prisma';

export class ProductService
{
  async findAll ( page: number, take: number = 100 )
  {
    return prisma.$transaction( async ( tx ) =>
    {
      const count = await tx.product.count()
      const res = await tx.product.findMany( {
        take: take,
        skip: ( page - 1 ) * take,
      } )
      return { res, count }
    } )
  }

  // async findAll() {
  //   return prisma.bank.findAll()
  // }

  async findOne ( id: number )
  {
    return prisma.product.findUnique( { where: { id } } )
  }

  async createOne ( data: DeliveryCreate )
  {
    return prisma.product.create( { data: { ...data } } )
  }

  async updateOne ( data: DeliveryUpdate, id: string, )
  {
    return prisma.product.update( { data: { ...data }, where: { id: id } } )
  }

  async deleteOne ( id: String )
  {
    return prisma.product.delete( { where: { id } } )
  }
}
