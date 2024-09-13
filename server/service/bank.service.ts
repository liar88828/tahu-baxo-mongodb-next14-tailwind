import { bankSchema, BankSchema, } from "@/server/schema/bank.schema"
import prisma from "@/config/prisma"
import { BankDB } from "@prisma/client"
import { AccessTokenPayload } from "@/server/service/auth/jwt.service"
import type { IService, ResponseData } from "@/interface/server/IService"
import { GetPage } from "@/interface/server/IServiceRequest";
import { BankCreate, BankId, BankUpdate } from "@/interface/model/bank.type";

export class BankService implements IService<BankDB> {
	constructor(private valid: BankSchema) {
	}
	
	findAllPublic(page: GetPage): Promise<ResponseData<BankDB>> {
		throw new Error("Method not implemented.")
	}
	
	async findAll(page: number = 1, take: number = 100) {
		const data = await prisma.bankDB.findMany({
			take: take,
			skip: (page - 1) * take,
		})
		return { data, page, take }
  }
	
	async findAllPrivate(
		{ take, page, search }: GetPage,
		user: AccessTokenPayload
	) {
		const data = await prisma.bankDB.findMany({
			orderBy: { name: 'asc' },
			where: {
				userId: user.id,
				...(search ? { name: { contains: search } } : {})
			},
			take: take,
			skip: (page - 1) * take,
		})
		return { data, page, take }
  }
	
	async findId({ id_bank }: Pick<BankId, "id_bank">): Promise<BankDB> {
		const data = await prisma.bankDB.findUnique({ where: { id: id_bank } })
    if (!data) {
			throw new Error("Data Bank Is Not Found")
		}
		return data
	}
	
	async findIdPrivate({ id_bank, id_user }: BankId): Promise<BankDB> {
		const data = await prisma.bankDB.findUnique({
			where: { id: id_bank, userId: id_user },
		})
		if (!data) {
			throw new Error("Data Bank Is Not Found")
    }
    return data
  }
	
	async createOne(data: BankCreate): Promise<BankDB> {
    data = this.valid.createValid(data)
		return prisma.bankDB.create({ data: { ...data } })
  }
	
	async updateOne(data: BankUpdate, { id_bank }: BankId): Promise<BankDB> {
    data = this.valid.updateValid(data)
		return prisma.bankDB.update({ data: { ...data }, where: { id: id_bank } })
  }
	
	async deleteOne({ id_bank }: BankId): Promise<BankDB> {
		return prisma.bankDB.delete({ where: { id: id_bank } })
  }
}

export const bankService = new BankService(bankSchema)
