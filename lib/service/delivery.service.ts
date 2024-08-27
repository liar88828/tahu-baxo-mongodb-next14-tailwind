import { DeliveryUpdate } from './../db/prisma';
import { DeliveryCreate } from './../validator/schema/deliver.schema';
import prisma from '@/lib/db/prisma';

export class ServiceDeliver {
  async findAll(page: number, take: number) {
    return prisma.$transaction(async (tx) => {
      return tx.bank.findMany({
        take: take,
        skip: (page - 1) * take,
      })
    })
  }

  // async findAll() {
  //   return prisma.bank.findAll()
  // }

  async findOne(id: number) {
    return prisma.bank.findOne(id)
  }

  async createOne ( data: DeliveryCreate ) {
    return prisma.bank.create({data: {...data}})
  }

  async updateOne ( data: DeliveryUpdate, id: string,) {
    return prisma.bank.update({data: {...data}, where: {id: id}})
  }

  async deleteOne(id: String) {
    return prisma.bank.findUnique({where: {id}})
  }
}
