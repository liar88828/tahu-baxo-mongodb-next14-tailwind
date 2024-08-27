import prisma from '@/lib/db/prisma';
import {TCREATEBANK, TUPDATEBANK} from '@/lib/validator/zod';

export class ServiceBank {
  async findPaginate(page: number, take: number) {
    return prisma.$transaction(async (tx) => {
      return tx.bank.findMany({
        take: take,
        skip: (page - 1) * take,
      })
    })
  }

  async findAll() {
    return prisma.bank.findAll()
  }

  async findOne(id: number) {
    return prisma.bank.findOne(id)
  }

  async createOne(data: TCREATEBANK) {
    return prisma.bank.create({data: {...data}})
  }

  async updateOne(data: TUPDATEBANK, id: string,) {
    return prisma.bank.update({data: {...data}, where: {id: id}})
  }

  async deleteOne(id: String) {
    return prisma.bank.findUnique({where: {id}})
  }
}
