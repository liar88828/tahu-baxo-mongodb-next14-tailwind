import prisma from '@/lib/db/prisma';
import {TCREATEBANK, TUPDATEBANK} from '@/lib/validator/zod';

export class BankRepo {
  static async deleteOne(id: number) {
    return prisma.bankDB.delete({where: {id}})
  }

  async findPaginate( page: number, take: number ) {
    return prisma.$transaction( async ( tx ) => {
      const count = await tx.bankDB.count()
      const res = await tx.bankDB.findMany({
        take: take,
        skip: ( page - 1 ) * take,
      } )
      return { res, count }
    } )
  }

  async createOne( data: TCREATEBANK ) {
    return prisma.bankDB.create({data: {...data}})
  }
  async findAll() {
    return prisma.bankDB.findMany()
  }

  async findOne(id: number) {
    return prisma.bankDB.findUnique({where: {id}})
  }

  async deleteOne(id: number) {
    return BankRepo.deleteOne( id )
  }

  async updateOne(data: TUPDATEBANK, id: number,) {
    return prisma.bankDB.update({data: {...data}, where: {id: id}})
  }

}

export const bank=new BankRepo()
