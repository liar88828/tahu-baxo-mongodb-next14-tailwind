import { DeliverSchema, deliverySchema } from "@/server/schema/deliver.schema"
import prisma from "@/config/prisma"
import { DeliveryDB } from "@prisma/client"
import { AccessTokenPayload } from "@/server/service/auth/jwt.service"
import type { IService, ResponseData } from "@/interface/server/IService"
import type { DeliveryCreate, DeliveryId, DeliveryUpdate, } from "@/interface/model/delivery.type"
import { GetPage } from "@/interface/server/IServiceRequest";

export class ServiceDeliver implements IService<DeliveryDB> {
	constructor(private valid: DeliverSchema) {
	}
	
	findAllPublic(page: GetPage): Promise<ResponseData<DeliveryDB>> {
		throw new Error("Method not implemented.")
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
	
	async findAllPrivate({ page, take, search }: GetPage, user: AccessTokenPayload) {
		const data = await prisma.$transaction(async (tx) => {
      return tx.deliveryDB.findMany({
				orderBy: { name: 'asc' },
				where: {
					userId: user.id,
					...(search ? { name: { contains: search } } : {})
				},
				take: take,
				skip: (page - 1) * take,
      })
    })
		return { data, page, take }
  }
	
	async findIdPublic({
											 id_delivery,
										 }: Pick<DeliveryId, "id_delivery">): Promise<DeliveryDB> {
		const data = await prisma.deliveryDB.findUnique({
			where: { id: id_delivery },
		})
		if (!data) {
			throw new Error("Data delivery is not found")
		}
		return data
	}
	
	async findIdPrivate({
												id_delivery,
												id_user,
											}: DeliveryId): Promise<DeliveryDB> {
		const data = await prisma.deliveryDB.findUnique({
			where: { id: id_delivery, userId: id_user },
		})
    if (!data) {
      throw new Error("Data delivery is not found")
    }
    return data
  }
	
	async createOne(data: DeliveryCreate): Promise<DeliveryDB> {
    data = this.valid.createValid(data)
		return prisma.deliveryDB.create({ data: { ...data } })
  }
	
	async updateOne(
		{ id_delivery }: DeliveryId,
		data: DeliveryUpdate,
	): Promise<DeliveryDB> {
    data = this.valid.updateValid(data)
		return prisma.deliveryDB.update({
			data: { ...data },
			where: { id: id_delivery },
		})
  }
	
	async deleteOne({ id_delivery }: DeliveryId) {
		return prisma.deliveryDB.delete({ where: { id: id_delivery } })
  }
}

export const deliveryService = new ServiceDeliver(deliverySchema)
