import { DeliverSchema, deliverySchema } from '@/server/schema/deliver.schema'
import prisma from '@/config/prisma'
import { DeliveryDB } from "@prisma/client";
import { DeliveryCreate, DeliveryId, DeliveryUpdate } from "@/interface/delivery";
import { IService } from "@/interface/IService";
import { AccessTokenPayload } from "@/server/service/jwt.service";

export class ServiceDeliver implements IService<DeliveryDB> {
	constructor(
		private valid: DeliverSchema,
	) {
	}
	
	async findAll(page: number, take: number) {
		const data = await prisma.$transaction(async (tx) => {
			return tx.deliveryDB.findMany({
				take: take,
				skip: (page - 1) * take,
			})
		})
		return { data, page, take }
	}
	
	async findAllPrivate(page: number, take: number, user: AccessTokenPayload) {
		const data = await prisma.$transaction(async (tx) => {
			return tx.deliveryDB.findMany({
				where: { userId: user.id },
				take: take,
				skip: (page - 1) * take,
			})
		})
		return { data, page, take }
	}
	
	async findIdPublic({ id_delivery }: Pick<DeliveryId, 'id_delivery'>): Promise<DeliveryDB> {
		const data = await prisma.deliveryDB.findUnique({ where: { id: id_delivery } })
		if (!data) {
			throw new Error("Data delivery is not found")
		}
		return data
	}
	
	async findIdPrivate({ id_delivery, id_user }: DeliveryId): Promise<DeliveryDB> {
		const data = await prisma.deliveryDB.findUnique({ where: { id: id_delivery, userId: id_user } })
		if (!data) {
			throw new Error("Data delivery is not found")
		}
		return data
	}
	
	async createOne(data: DeliveryCreate): Promise<DeliveryDB> {
		data = this.valid.createValid(data)
		return prisma.deliveryDB.create({ data: { ...data } })
	}
	
	async updateOne(data: DeliveryUpdate, { id_delivery }: DeliveryId): Promise<DeliveryDB> {
		data = this.valid.updateValid(data)
		return prisma.deliveryDB.update({ data: { ...data }, where: { id: id_delivery } })
	}
	
	async deleteOne({ id_delivery }: DeliveryId) {
		return prisma.deliveryDB.delete({ where: { id: id_delivery } })
	}
}

export const deliveryService = new ServiceDeliver(
	deliverySchema
)
