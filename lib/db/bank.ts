import prisma from '@/lib/db/prisma';
import { TCREATEBANK, TUPDATEBANK } from '@/lib/validator/zod';

export class BankRepo {
  async findPaginate( page: number, take: number ) {
    return prisma.$transaction( async ( tx ) => {
      const count = await tx.bank.count()
      const res   = await tx.bank.findMany( {
        take: take,
        skip: ( page - 1 ) * take,
      } )
      return { res, count }
    } )
  }
  static async deleteOne( id: string ) {
    return prisma.bank.delete( { where: { id } } )
  }
  async createOne( data: TCREATEBANK ) {
    return prisma.bank.create( { data: { ...data } } )
  }
  async findAll() {
    return prisma.bank.findMany()
  }
  async findOne( id: string ) {
    return prisma.bank.findUnique( { where: { id } } )
  }
  async deleteOne( id: string ) {
    return BankRepo.deleteOne( id )
  }

  async updateOne( data: TUPDATEBANK, id: string, ) {
    return prisma.bank.update( { data: { ...data }, where: { id: id } } )
  }

}

export const bank=new BankRepo()