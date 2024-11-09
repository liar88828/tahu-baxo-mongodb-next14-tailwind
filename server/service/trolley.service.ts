import prisma from "@/config/prisma"

import { ErrorProduct, ErrorTrolley } from "@/lib/error/errorCustome"
import { AccessTokenPayload } from "@/server/service/auth/jwt.service"
import { trolleySchema, type TrolleySchema } from "../schema/trolley.schema"
import {
	GetAllTrolley,
	TrolleyCreate,
	TrolleyDataId,
	TrolleyResponse,
	TrolleyUpdate,
} from "@/interface/model/trolley.type"

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
	
	async getAllPrivate(user: AccessTokenPayload): Promise<GetAllTrolley[]> {
		return prisma.trolleyDB.findMany({
			include: { Product: true },
			where: {
				userId: user.id,
				isBuy: false
			},
		})
	}
	
	async create(data: TrolleyCreate): Promise<TrolleyResponse> {
		data = this.serviceSchema.validCreate(data)
		return prisma.$transaction(async (tx) => {
			const trolleyDB = await tx.trolleyDB.count({
				where: { userId: data.userId },
			})
			
			if (trolleyDB >= 200) {
				throw new ErrorTrolley(
					"badRequest",
					"the data trolley is maximum the count cannot more than 200 item"
				)
			}
			
			const createProduct = async () => {
				const trolleyDB = await tx.trolleyDB.findFirst({
					where: {
						userId: data.userId,
						productId: data.productId,
						isBuy: false,
					},
				})
				if (!trolleyDB) {
					return tx.trolleyDB.create({
						data: {
							userId: data.userId,
							productId: data.productId,
							qty: data.qty,
						},
					})
				} else {
					return tx.trolleyDB.update({
						where: { id: trolleyDB.id },
						data: {
							userId: data.userId,
							productId: data.productId,
							qty: { increment: data.qty },
						},
					})
				}
			}
			return { data: await createProduct(), status: "create data" }
		})
	}
	
	async increment(
		data: TrolleyUpdate,
		user: AccessTokenPayload
	): Promise<TrolleyResponse> {
		// console.log(data)
		data = this.serviceSchema.validUpdate(data)
		return prisma.$transaction(async (tx) => {
			// check stock trolley
			const trolleyDB = await tx.trolleyDB.count({
				where: { userId: user.id },
			})
			if (trolleyDB >= 200) {
				throw new ErrorTrolley(
					"badRequest",
					"the data trolley is maximum the count cannot more than 200 item"
				)
			}
			// find trolley
			const trolley = await tx.trolleyDB.findFirst({
				where: {
					userId: user.id,
					productId: data.productId,
				},
			})
			
			if (!trolley) {
				// create trolley
				throw new ErrorTrolley(
					"notFound",
					"data trolley is not found maybe user id or product id"
				)
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
	
	async decrement(
		data: TrolleyUpdate,
		user: AccessTokenPayload
	): Promise<TrolleyResponse> {
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
				throw new ErrorTrolley(
					"notFound",
					"data trolley is not found maybe product id or user id "
				)
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
	
	async remove(
		{ id }: TrolleyDataId,
		user: AccessTokenPayload
	): Promise<TrolleyResponse> {
		return {
			data: await prisma.trolleyDB.delete({ where: { id, userId: user.id } }),
			status: "success Delete Data",
		}
	}
	
	async getCount({ id }: AccessTokenPayload): Promise<ResponseTrolleyCount> {
		return prisma.trolleyDB.count({
			where: {
				userId: id,
				isBuy: false,
				
			},
		})
	}
	
	protected async addxx2(data: TrolleyUpdate, user: AccessTokenPayload) {
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
			throw new ErrorTrolley(
				"notFound",
				"the data trolley is not found search by id user"
			)
		}
		const productDB = await prisma.productDB.findUnique({
			where: { id: data.id },
		})
		if (!productDB) {
			throw new ErrorProduct(
				"notFound",
				"data product is is not found search by product id"
			)
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
export type ResponseTrolleyCount = number
