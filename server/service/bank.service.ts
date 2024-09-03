import { BankCreate, BankId, bankSchema, BankSchema, BankUpdate } from '@/server/schema/bank.schema'
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

  async findId({id_bank} : Pick<BankId, 'id_bank'>) : Promise<BankDB> {
    const data = await prisma.bankDB.findUnique({where : {id : id_bank}})
    if (!data) {
      throw new Error('Data Bank Is Not Found')
    }
    return data
  }

  async findIdPrivate({id_bank, id_user} : BankId) : Promise<BankDB> {
    const data = await prisma.bankDB.findUnique({where : {id : id_bank, userId : id_user}})
    if (!data) {
      throw new Error('Data Bank Is Not Found')
    }
    return data
  }

  async createOne(data : BankCreate) : Promise<BankDB> {
    data = this.valid.createValid(data)
    return prisma.bankDB.create({data : {...data}})
  }

  async updateOne(data : BankUpdate, {id_bank} : BankId) : Promise<BankDB> {
    data = this.valid.updateValid(data)
    return prisma.bankDB.update({data : {...data}, where : {id : id_bank}})
  }

  async deleteOne({id_bank} : BankId) : Promise<BankDB> {
    return prisma.bankDB.delete({where : {id : id_bank}})
  }
}

export const bankService = new BankService(
  bankSchema
)
