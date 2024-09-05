import prisma from "@/config/prisma";
import { TransactionSchema, transactionSchema } from "@/server/schema/transaction.schema";
import { ResponseTransaction, TransactionCreate } from "@/interface/transaction";
import { AccessTokenPayload } from "@/server/service/jwt.service";

type transactionId = {
	idProduct: number,
	idOrder: string,
	idTransaction: number,
}

export class TransactionService {
	constructor(
		private valid: TransactionSchema,
	) {
	}
	
	async createOne(data: TransactionCreate, user: AccessTokenPayload): Promise<ResponseTransaction> {
		console.log('------- service transaction')
		const { order, transaction, } = this.valid.transactionValid(data)
		console.log('------- valid transaction')
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
				}
			})
			console.log('------- db order transaction')
			
			const productDB = await tx.productDB.update({
				where: {
					id: transaction.productDBId,
				},
				data: {
					jumlah: {
						decrement: transaction.jumlah
					},
				}
			})
			console.log('------- db product transaction')
			
			const transactionDB = await tx.transactionDB.create({
				data: {
					jumlah: transaction.jumlah,
					productDBId: transaction.productDBId,
					penerimaDBId: transaction.penerimaDBId,
					deliveryDBId: transaction.deliveryDBId,
					orderanDBId: orderanDB.id,
					bankDBId: transaction.bankDBId,
				}
			})
			console.log('------- db transaction transaction')
			
			return {
				orderanDB,
				productDB,
				transactionDB,
				// penerimaDB,
			}
		})
	}
	
	async findId(id: transactionId) {
		return prisma.$transaction(async (tx) => {
			return {
				transactionDB: await tx.transactionDB.findUnique({ where: { id: id.idTransaction } }),
				productDB: await tx.productDB.findUnique({ where: { id: id.idProduct } }),
				orderDB: await tx.orderanDB.findUnique({ where: { id: id.idOrder } })
			}
		})
	}
	
	async findAll(page: number, limit: number = 100) {
		return prisma.transactionDB.findMany({
				take: limit,
				skip: (page - 1) * limit,
			}
		)
	}
}

export const transactionService = new TransactionService(
	transactionSchema
)
