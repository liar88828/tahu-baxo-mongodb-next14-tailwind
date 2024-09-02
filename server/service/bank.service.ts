import { BankCreate, bankSchema, BankSchema, BankUpdate } from '@/server/schema/bank.schema'
import prisma from '@/config/prisma'
import { BankDB } from '@prisma/client'

export class BankService {
  constructor(
    private valid : BankSchema
  ) {
  }

  async findPaginate(page : number = 1, take : number = 100) : Promise<BankDB[]> {
    return prisma.$transaction(async (tx) => {
      return tx.bankDB.findMany({
        take : take,
        skip : (page - 1) * take,
      })
    })
  }

  async findAll() : Promise<BankDB[]> {
    return prisma.bankDB.findMany({
      take : 100,
    })
  }

  async findId(id : number) : Promise<BankDB> {
    id = this.valid.idValidInt(id)
    const data = await prisma.bankDB.findUnique({where : {id}})
    if (!data) {
      throw new Error('Data Bank Is Not Found')
    }
    return data
  }

  async createOne(data : BankCreate) : Promise<BankDB> {
    data = this.valid.createValid(data)
    return prisma.bankDB.create({data : {...data}})
  }

  async updateOne(data : BankUpdate, id : number) : Promise<BankDB> {
    id = this.valid.idValidInt(id)
    data = this.valid.updateValid(data)

    console.log('service----')
    console.log(id, data)
    console.log('service----')
    return prisma.bankDB.update({data : {...data}, where : {id}})
  }

  async deleteOne(id : number) : Promise<BankDB> {
    id = this.valid.idValidInt(id)
    return prisma.bankDB.delete({where : {id}})
    // if (!data) {
    //   throw 'Fail Delete data: the Data is Not Found '
    // }
    // return data
  }
}

export const bankService = new BankService(
  bankSchema
)
