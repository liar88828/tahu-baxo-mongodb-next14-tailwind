import prisma from "@/config/prisma"

import { ErrorProduct, ErrorTrolley } from "@/lib/error/errorCustome"
import { AccessTokenPayload } from "@/server/service/jwt.service"
import { trolleySchema, type TrolleySchema } from "../schema/trolley.schema"
import {
	GetAllTrolley,
	TrolleyCreate,
	TrolleyDataId,
	TrolleyResponse,
	TrolleyUpdate
} from "@/interface/model/trolley.type";

export class TrolleyService {
	constructor(private serviceSchema: TrolleySchema) {
	}
	
	async getAll(user: AccessTokenPayload): Promise<GetAllTrolley[]> {
		return prisma.trolleyDB.findMany({
			include: { Product: true },
			where: {
				userId: user.id,
			},
		})
		
	}
	
	async getAllPublic(): Promise<GetAllTrolley[]> {
		return prisma.trolleyDB.findMany({
			include: { Product: true },
			where: {},
		})
		
	}
	
	async create(data: TrolleyCreate): Promise<TrolleyResponse> {
		data = this.serviceSchema.validCreate(data)
		return prisma.$transaction(async (tx) => {
			
			const trolleyDB = await tx.trolleyDB.count({
				where: { userId: data.userId },
			})
			
			if (trolleyDB >= 200) {
				throw new ErrorTrolley("conflict")
			}
			console.log(data)
			const res = await tx.trolleyDB.create({
				data: {
					userId: data.userId,
					productId: data.productId,
					qty: data.qty,
				},
			})
			return { data: res, status: "create data" }
			
		})
	}
	
	async increment(data: TrolleyUpdate, user: AccessTokenPayload): Promise<TrolleyResponse> {
		
		console.log(data)
		data = this.serviceSchema.validUpdate(data)
		return prisma.$transaction(async (tx) => {
			// check stock trolley
			const trolleyDB = await tx.trolleyDB.count({
				where: { userId: user.id },
			})
			if (trolleyDB >= 200) {
				throw new ErrorTrolley("conflict")
			}
			// find trolley
			const trolley = await tx.trolleyDB.findUnique({
				where: {
					id: data.id,
					userId: user.id,
					productId: data.productId,
				},
			})
			
			if (!trolley) {
				// create trolley
				throw new ErrorTrolley("notFound")
			} else {
				// update trolley
				const res = await tx.trolleyDB.update({
					where: {
						id: data.id,
						userId: user.id,
						productId: data.productId,
					},
					data: {
						userId: user.id,
						productId: data.productId,
						qty: { increment: data.qty },
					},
				})
				return { data: res, status: "update data" }
			}
		})
	}
	
	async decrement(data: TrolleyUpdate, user: AccessTokenPayload): Promise<TrolleyResponse> {
		data = this.serviceSchema.validUpdate(data)
		return prisma.$transaction(async (tx) => {
			const trolley = await tx.trolleyDB.findUnique({
				where: {
					id: data.id,
					userId: user.id,
					productId: data.productId,
				},
			})
			
			if (!trolley) {
				throw new ErrorTrolley("notFound")
			} else {
				const res = await tx.trolleyDB.update({
					where: {
						id: data.id,
						userId: user.id,
						productId: data.productId,
					},
					data: {
						userId: user.id,
						productId: data.productId,
						qty: { decrement: data.qty },
					},
				})
				return { data: res, status: "update data" }
			}
		})
	}
	
	async remove({ id }: TrolleyDataId, user: AccessTokenPayload): Promise<TrolleyResponse> {
		return {
			data: await prisma.trolleyDB.delete({ where: { id, userId: user.id } }),
			status: 'success Delete Data'
		}
	}
	
	protected async addxx2(
		data: TrolleyUpdate,
		user: AccessTokenPayload
	) {
		this.serviceSchema.validUpdate(data)
		return prisma.$transaction(async (tx) => {
			const trolleyDB = await prisma.trolleyDB.count({
				where: { userId: user.id },
			})
			console.log(trolleyDB)
			return tx.trolleyDB.upsert({
				where: {
					id: data.id,
					userId: user.id,
					
					productId: data.productId,
				},
				update: {
					userId: user.id,
					
					productId: data.productId,
					qty: { increment: data.qty },
				},
				create: {
					userId: user.id,
					
					productId: data.productId,
					qty: data.qty,
				},
			})
		})
	}
	
	protected async addxxx(
		data: TrolleyUpdate,
		{ id }: TrolleyDataId,
		user: AccessTokenPayload
	) {
		this.serviceSchema.validUpdate(data)
		const trolleyDB = await prisma.trolleyDB.findFirst({
			where: { userId: user.id },
		})
		if (!trolleyDB) {
			throw new ErrorTrolley("notFound")
		}
		const productDB = await prisma.productDB.findUnique({
			where: { id: data.id },
		})
		if (!productDB) {
			throw new ErrorProduct("notFound")
		}
		return prisma.$transaction(async (tx) => {
			const trolley = await tx.trolleyDB.findUnique({
				where: { id: data.id },
			})
			if (trolley) {
				console.log("will update")
				return tx.trolleyDB.update({
					where: { id: id },
					data: {
						userId: user.id,
						productId: productDB.id,
						qty: { increment: data.qty },
					},
				})
			} else {
				console.log("will create")
				return tx.trolleyDB.create({
					data: {
						userId: user.id,
						productId: productDB.id,
						qty: data.qty,
					},
				})
			}
			
			// return tx.trolleyDB.upsert({
			//   where : {id : id.trolleyId},
			//   update : {
			//     trolleyId : trolleyDB.id,
			//     productId : productDB.id,
			//     qty : {increment : data.qty},
			//   },
			//   create : {
			//     trolleyId : trolleyDB.id,
			//     productId : productDB.id,
			//     qty : data.qty
			//   }
			// })
			// return tx.trolleyDB.upsert({
			//   where : {id : id.trolleyId},
			//   update : {
			//     trolleyId : data.trolleyId,
			//     productId : data.productId,
			//     qty : {increment : data.qty},
			//   },
			//   create : {
			//     trolleyId : data.trolleyId,
			//     productId : data.productId,
			//     qty : data.qty
			//   }
			// })
		})
	}
}

export const trolleyService = new TrolleyService(trolleySchema)
