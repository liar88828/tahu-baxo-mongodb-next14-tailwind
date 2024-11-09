import prisma from "@/config/prisma"
import type { IService, ResponseData } from "@/interface/server/IService"
import { GetPage } from "@/interface/server/IServiceRequest";
import { ReceiverDB } from "@prisma/client";
import { IdReceiver, ReceiverCreate } from "@/interface/model/receiver.type";
import { AccessUserID } from "@/server/service/auth/jwt.service";
import { receiverSchema, ReceiverSchema } from "@/server/schema/receiver.schema";

export class ReceiverService implements IService<ReceiverDB> {
	constructor(private valid: ReceiverSchema) {
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
	
	async findAllPrivate({ page, take }: GetPage, user: AccessUserID): Promise<ResponseData<ReceiverDB>> {
		const data = await prisma.receiverDB.findMany({
			where: { userId: user.id },
			take: take,
			skip: (page - 1) * take,
		})
		return { data, page, take }
	}
	
	async findOne({ id_receiver, id_user }: IdReceiver) {
		const data = await prisma.receiverDB.findUnique({
			where: {
				id: id_receiver,
				userId: id_user,
			}
		})
		if (!data) {
			throw new Error("Data Penerima is not found")
		}
		return data
	}
	
	async createOne(data: ReceiverCreate, user: AccessUserID) {
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
	
	async updateOne({ id_receiver, id_user }: IdReceiver, data: any,) {
		data = this.valid.validCreate(data)
		return prisma.receiverDB.update({
			where: {
				id: id_receiver,
				userId: id_user
			},
			data: {
				name: data.name,
				address: data.address,
				phone: data.phone,
			},
		})
	}
	
	async deleteOne(id: number, user: AccessUserID) {
		const data = await prisma.receiverDB.delete({ where: { id, userId: user.id } })
		if (!data) {
			throw new Error("Data Penerima is not found")
		}
		return data
	}
}

export const receiverService = new ReceiverService(receiverSchema)
