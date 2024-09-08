import prisma from "@/config/prisma"
import { TransactionSchema, transactionSchema, } from "@/server/schema/transaction.schema"
import { AccessTokenPayload } from "@/server/service/jwt.service"
import { CheckoutCreateMany, CheckoutCreateSchema, ResponseCheckout, } from "@/interface/model/transaction.type"
import { checkoutSchema, CheckoutSchema } from "@/server/schema/checkout.schema";

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
	
	async createOne(data: CheckoutCreateSchema, user: AccessTokenPayload): Promise<ResponseCheckout> {
		console.log("------- service transaction")
		const { order, transaction } = await this.validCheckout.checkoutValid(data)
		console.log("------- validTransaction transaction")
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
					dari: order.dari,
					lokasi: order.lokasi,
					guna: order.guna,
					pengirim: order.pengirim,
					hp: order.hp,
					status: order.status,
					ongkir: order.ongkir,
					
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
					jumlah: transaction.jumlah,
					// productDBId: transaction.productDBId,
					penerimaDBId: transaction.penerimaDBId,
					deliveryDBId: transaction.deliveryDBId,
					orderanDBId: orderanDB.id,
					bankDBId: transaction.bankDBId,
					// create relational data
					TrolleyDB: {
						create: {
							userId: user.id,
							qty: transaction.jumlah,
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
					jumlah: {
						decrement: transaction.jumlah,
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
	
	async createMany(data: CheckoutCreateMany, user: AccessTokenPayload) {
		const { order, transaction, trollyIds } = await this.validCheckout.checkoutValidMany(data)
		return prisma.$transaction(async (tx) => {
			
			const orderanDB: ResponseCheckout['orderanDB'] = await tx.orderanDB.create({
				data: {
					dari: order.dari,
					lokasi: order.lokasi,
					guna: order.guna,
					pengirim: order.pengirim,
					hp: order.hp,
					status: order.status,
					ongkir: order.ongkir,
				},
			})
			const transactionDB: ResponseCheckout['transactionDB'] = await tx.transactionDB.create({
				data: {
					jumlah: transaction.jumlah,
					// productDBId: transaction.productDBId,
					penerimaDBId: transaction.penerimaDBId,
					deliveryDBId: transaction.deliveryDBId,
					orderanDBId: orderanDB.id,
					bankDBId: transaction.bankDBId,
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
	
	async findAll(page: number, limit: number = 100) {
		return prisma.transactionDB.findMany({
			take: limit,
			skip: (page - 1) * limit,
		})
	}
}

export const transactionService = new TransactionService(
	transactionSchema,
	checkoutSchema
)
