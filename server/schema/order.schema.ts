import { z } from "zod";
import { addressInit, descriptionInit, nameInit, phoneInit } from "@/server/schema/init.schema";
import { Prisma } from '@prisma/client'
import prisma from "@/config/prisma";
import { OrderanDB } from ".prisma/client";

export class OrderSchema {
	create = z.object({
		// id: z.string(),
		// waktuKirim : z.date(),
		// pesan : z.date(),
		dari: z.string(),
		nama: z.string(),
		pengirim: nameInit,
		hp: phoneInit,
		guna: descriptionInit,
		lokasi: addressInit,
		ongkir: z.number(),
		// typePembayaran: z.string(),
		// totalBayar: z.number(),
		// totalPenjualan: z.number(),
		status: z.string(),
		
		// penerima: z.string(),
		// alamatPenerima: z.string(),
		// hpPenerima: z.string(),
		// created_at: z.date(),
		// updated_at: z.date(),
		//
		// transactionDBId: z.number(),
		// bankDBId: z.number(),
		// deliveryDBId: z.number(),
		// penerimaDBId:z.number()
	}) satisfies z.Schema<OrderDBCreate>
	
	validCreate(data: OrderCreate): OrderCreate {
		data = this.create.parse(data)
		if (!data) {
			throw new Error('data order is not valid')
		}
		return data
	}
}

export const orderSchema = new OrderSchema()
export type OrderDBCreate = Prisma.Args<typeof prisma.orderanDB, 'create'>['data']

export type OrderCreate = z.infer<typeof orderSchema.create>
