import prisma from "@/config/prisma"
import { TransactionSchema, transactionSchema, } from "@/server/schema/transaction.schema"
import { AccessUserID } from "@/server/service/auth/jwt.service"
import { checkoutSchema, CheckoutSchema } from "@/server/schema/checkout.schema";
import { validIdNum, validUserId } from "@/server/schema/init.schema";
import { CheckoutCreateMany, CheckoutCreateSchema, ResponseCheckout } from "@/interface/model/checkout.type";

type transactionId = {
	idProduct: number
	idOrder: string
	idTransaction: number
}

export class TransactionService {
	constructor(
		private validTransaction: TransactionSchema,
		private validCheckout: CheckoutSchema,
	) {
	}
	
	async createOne(data: CheckoutCreateSchema, user: AccessUserID): Promise<ResponseCheckout> {
		const { order, transaction } = await this.validCheckout.checkoutValid(data)
		return prisma.$transaction(async (tx) => {
			// const penerimaDB = await tx.penerimaDB.create({
			// 	data: {
			// 		nama: penerima.nama,
			// 		hp: penerima.hp,
			// 		alamat: penerima.alamat
			// 	}
			// })
			// console.log('------- db penerima transaction')
			const orderanDB = await tx.orderanDB.create({
				data: {
					from: order.from,
					location: order.location,
					desc: order.desc,
					sender: order.sender,
					phone: order.phone,
					status: order.status,
					shipping_cost: order.shipping_cost,
					total: data.order.total,
					sub_total: data.order.sub_total
					// pesan: order.pesan,
					// waktuKirim: order.waktuKirim,
					// typePembayaran: order.typePembayaran,
					// totalBayar: order.totalBayar,
					// totalPenjualan: order.totalPenjualan,
					//
				},
			})
			console.log("------- db order transaction")
			
			const transactionDB = await tx.transactionDB.create({
				data: {
					// productDBId: transaction.productDBId,
					receiverDBId: transaction.receiverDBId,
					deliveryDBId: transaction.deliveryDBId,
					orderanDBId: orderanDB.id,
					bankDBId: transaction.bankDBId,
					userId: user.id,
					// create relational data
					TrolleyDB: {
						create: {
							userId: user.id,
							qty: transaction.qty,
							productId: transaction.productDBId,
						},
					},
				},
			})
			console.log("------- db transaction transaction")
			
			const productDB = await tx.productDB.update({
				where: {
					id: transaction.productDBId,
				},
				data: {
					qty: {
						decrement: transaction.qty,
					},
				},
			})
			console.log("------- db product transaction")
			
			return {
				orderanDB,
				productDB,
				transactionDB,
				// penerimaDB,
			}
		})
	}
	
	async createMany(data: CheckoutCreateMany, user: AccessUserID) {
		const { order, transaction, trollyIds } = await this.validCheckout.checkoutValidMany(data)
		return prisma.$transaction(async (tx) => {
			const orderanDB: ResponseCheckout['orderanDB'] = await tx.orderanDB.create({
				data: {
					from: order.from,
					location: order.location,
					desc: order.desc,
					sender: order.sender,
					phone: order.phone,
					status: order.status,
					shipping_cost: order.shipping_cost,
					total: order.total,
					sub_total: data.order.sub_total
					
				},
			})
			const transactionDB: ResponseCheckout['transactionDB'] = await tx.transactionDB.create({
				data: {
					receiverDBId: transaction.receiverDBId,
					deliveryDBId: transaction.deliveryDBId,
					orderanDBId: orderanDB.id,
					bankDBId: transaction.bankDBId,
					userId: user.id
					// create relational data
					
				},
			})
			const TrollyDB = await tx.trolleyDB.updateMany({
				where: {
					id: {
						in: trollyIds.map(d => d.id)
					}
				},
				data: {
					transactionId: transactionDB.id
				}
			})
			
			return {
				orderanDB,
				transactionDB,
				TrollyDB,
			}
		})
	}
	
	async findId(id: transactionId) {
		return prisma.$transaction(async (tx) => {
			return {
				transactionDB: await tx.transactionDB.findUnique({
					where: { id: id.idTransaction },
				}),
				productDB: await tx.productDB.findUnique({
					where: { id: id.idProduct },
				}),
				orderDB: await tx.orderanDB.findUnique({ where: { id: id.idOrder } }),
			}
		})
	}
	
	async findAll(page: number, limit: number = 100, user: AccessUserID) {
		return prisma.transactionDB.findMany({
			where: { userId: user.id },
			take: limit,
			skip: (page - 1) * limit,
		})
	}
	
	async findAllComplete(id: number, user: AccessUserID) {
		id = validIdNum(id)
		user = validUserId(user)
		const res = await prisma.transactionDB.findUnique({
			where: {
				id,
				userId: user.id
			},
			include: {
				BankDB: true,
				OrderanDB: true,
				ReceiverDB: true,
				TrolleyDB: {
					include: {
						Product: true
					}
				},
				
			}
		})
		if (!res) {
			throw new Error('data is not found')
		}
		return res
	}
	
}

export const transactionService = new TransactionService(
	transactionSchema,
	checkoutSchema
)
