import prisma from "@/config/prisma"

import { ErrorProduct, ErrorTrolley } from "@/lib/error/errorCustome"
import { AccessTokenPayload } from "@/server/service/jwt.service"
import { trolleySchema, type TrolleySchema } from "../schema/trolley.schema"
import type { GetAllTrolley, TrolleyCreate as TrolleyCreate, TrolleyDataId, } from "../../interface/model/trolley.type"
import { TrolleyDB } from "@prisma/client";

export type ResponseTrolley = { data: Omit<TrolleyDB, 'transactionId'>, status: string };

export class TrolleyService {
	constructor(private serviceSchema: TrolleySchema) {
	}
	
	async getAll(user: AccessTokenPayload): Promise<GetAllTrolley[]> {
		const trolleyDB = await prisma.trolleyDB.count({})
		return prisma.trolleyDB.findMany({
			include: { Product: true },
			where: { userId: user.id },
		})
	}
	
	async increment(data: TrolleyCreate, user: AccessTokenPayload): Promise<ResponseTrolley> {
		data = this.serviceSchema.validCreate(data)
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
				const res = await tx.trolleyDB.create({
					data: {
						userId: user.id,
						productId: data.productId,
						qty: data.qty,
					},
				})
				return { data: res, status: "create data" }
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
	
	async decrement(data: TrolleyCreate, user: AccessTokenPayload): Promise<ResponseTrolley> {
		data = this.serviceSchema.validCreate(data)
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
	
	protected async addxx2(
		data: TrolleyCreate,
		id: TrolleyDataId,
		user: AccessTokenPayload
	) {
		this.serviceSchema.validCreate(data)
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
		data: TrolleyCreate,
		{ id }: TrolleyDataId,
		user: AccessTokenPayload
	) {
		this.serviceSchema.validCreate(data)
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
	
	async remove({ id }: TrolleyDataId) {
		return prisma.trolleyDB.delete({
			where: { id },
		})
	}
}

export const trolleyService = new TrolleyService(trolleySchema)
