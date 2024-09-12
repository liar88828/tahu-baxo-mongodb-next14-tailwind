import { penerimaSchema, PenerimaSchema } from "@/server/schema/penerima.schema"
import prisma from "@/config/prisma"
import type { AccessTokenPayload } from "@/server/service/auth/jwt.service"
import type { IService, ResponseData } from "@/interface/server/IService"
import type { PenerimaCreate } from "@/interface/model/penerima.type"
import { GetPage } from "@/interface/server/IServiceRequest";
import { ReceiverDB } from "@prisma/client";

export class PenerimaService implements IService<ReceiverDB> {
	constructor(private valid: PenerimaSchema) {
	}
	
	findAllPublic(page: GetPage): Promise<ResponseData<ReceiverDB>> {
		throw new Error("Method not implemented.")
	}
	
	async findAll(page: number, take: number) {
		const data = await prisma.receiverDB.findMany({
			take: take,
			skip: (page - 1) * take,
		})
		return { data, page, take }
	}
	
	async findAllPrivate({ page, take }: GetPage,) {
		const data = await prisma.receiverDB.findMany({
			take: take,
			skip: (page - 1) * take,
		})
		return { data, page, take }
	}
	
	async findOne(id: number) {
		const data = await prisma.receiverDB.findUnique({ where: { id } })
		if (!data) {
			throw new Error("Data Penerima is not found")
		}
		return data
	}
	
	async createOne(data: PenerimaCreate, user: AccessTokenPayload) {
		data = this.valid.validCreate(data)
		return prisma.receiverDB.create({
			data: {
				name: data.name,
				address: data.address,
				phone: data.phone,
				userId: user.id,
			},
		})
	}
	
	async updateOne(data: any, id: number) {
		data = this.valid.validCreate(data)
		return prisma.receiverDB.update({
			where: { id },
			data: {
				name: data.name,
				address: data.address,
				phone: data.phone,
			},
		})
	}
	
	async deleteOne(id: number, user: AccessTokenPayload) {
		const data = await prisma.receiverDB.delete({ where: { id, userId: user.id } })
		if (!data) {
			throw new Error("Data Penerima is not found")
		}
		return data
	}
}

export const penerimaService = new PenerimaService(penerimaSchema)
