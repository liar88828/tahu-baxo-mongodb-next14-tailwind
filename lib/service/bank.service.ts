import {BankCreate, BankUpdate} from './../validator/schema/bank.schema'
import prisma from '@/lib/db/prisma'
import {BankDB} from '@prisma/client'

export class BankService {
  async findPaginate(page: number = 1, take: number = 100): Promise<BankDB[]> {
    return prisma.$transaction(async (tx) => {
      return tx.bankDB.findMany({
        take: take,
        skip: (page - 1) * take,
      })
    })
  }

  async findAll(): Promise<BankDB[]> {
    return prisma.bankDB.findMany({
      take: 100,
    })
  }

  async findId(id: number): Promise<BankDB> {
    const data = await prisma.bankDB.findUnique({where: {id}})
    if (!data) {
      throw new Error('Data Bank Is Not Found')
    }
    return data
  }

  async createOne(data: BankCreate): Promise<BankDB> {
    return prisma.bankDB.create({data: {...data}})
  }

  async updateOne(data: BankUpdate, id: number): Promise<BankDB> {
    // console.log('---------')
    // console.log(data,id)
    // console.log('---------')

    return prisma.bankDB.update({data: {...data}, where: {id}})
  }

  async deleteOne(id: number): Promise<BankDB> {
    return prisma.bankDB.delete({where: {id}})
    // if (!data) {
    //   throw 'Fail Delete data: the Data is Not Found '
    // }
    // return data
  }
}
