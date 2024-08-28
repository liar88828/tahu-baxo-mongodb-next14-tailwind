import prisma from "@/lib/db/prisma";
import {TransactionCreate} from "@/lib/validator/schema/transaction.schema";

// import {OrderanDB} from '@prisma/client'

export class OrderService {
  async createOne(data: TransactionCreate['order']) {
    return prisma.orderanDB.create({data: {...data}});

  }

  async findAll(page: number, take: number = 100) {
    return prisma.orderanDB.findMany({
      take: take,
      skip: (page - 1) * take,
    });
  }

  async findId(id: string) {
    const data = await prisma.orderanDB.findUnique({
      where: {id}
    });
    if (!data) {
      throw new Error('Data Order is not found')
    }
    return data
  }
}


export const orderService = new OrderService();
