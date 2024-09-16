import prisma from "@/config/prisma"
import { orderSchema, OrderSchema } from "@/server/schema/order.schema"
import { AccessTokenPayload } from "@/server/service/auth/jwt.service"
import type { OrderCreate } from "@/interface/model/order.type"

export class OrderService {
	constructor(private valid: OrderSchema) {
	}
	
	async createOne(data: OrderCreate) {
    data = this.valid.validCreate(data)
    return prisma.orderanDB.create({
			data: {
				from: data.from,
				location: data.location,
				desc: data.desc,
				sender: data.sender,
				phone: data.phone,
				shipping_cost: data.shipping_cost,
				status: data.status,
				total: data.total,
				sub_total: data.sub_total
				// pesan: data.pesan,
				// waktuKirim: data.waktuKirim,
				// namaPengiriman: data.nama,
				// typePembayaran: data.typePembayaran,
				// totalBayar: data.totalBayar,
				// totalPenjualan: data.totalPenjualan,
			},
    })
  }
	
	async findAll(page: number, take: number = 100, user: AccessTokenPayload) {
		const data = await prisma.orderanDB.findMany({
			where: { id: user.id },
			take: take,
			skip: (page - 1) * take,
		})
		return { data, page, take }
  }
	
	async findId(id: string) {
    const data = await prisma.orderanDB.findUnique({
			where: { id },
		})
    if (!data) {
			throw new Error("Data Order is not found")
    }
    return data
  }
}

export const orderService = new OrderService(orderSchema)
