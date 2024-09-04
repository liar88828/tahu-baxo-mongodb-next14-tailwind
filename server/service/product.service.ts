import {
	ProductCreate,
	ProductId,
	productSchema,
	ProductSchema,
	ProductTransaction,
	ProductUpdate
} from "@/server/schema/product.schema";
import { ProductDB } from ".prisma/client";
import prisma from "@/config/prisma";
import { IService } from "@/interface/IService";
import { AccessTokenPayload } from "@/server/service/jwt.service";

export class ProductService implements IService<ProductDB> {
	constructor(
		private valid: ProductSchema,
	) {
	}
	
	async findAll(page: number, take: number = 100) {
		return prisma.$transaction(async (tx) => {
			const data = await tx.productDB.findMany({
				take: take,
				skip: (page - 1) * take,
			})
			return { data, page, take }
		})
	}
	
	async findAllPrivate(page: number, take: number = 100, user: AccessTokenPayload) {
		return prisma.$transaction(async (tx) => {
			const data = await tx.productDB.findMany({
				where: { userId: user.id },
				take: take,
				skip: (page - 1) * take,
			})
			return { data, page, take }
		})
	}
	
	async findIdPublic(id: number): Promise<ProductDB> {
		const data = await prisma.productDB.findUnique({ where: { id } })
		if (!data) {
			throw new Error('Data Product is Not found ')
		}
		return data
	}
	
	async findIdPrivate({ id_product, id_user }: ProductId): Promise<ProductDB> {
		const data = await prisma.productDB.findUnique({
			where: { id: id_product, userId: id_user }
		})
		if (!data) {
			throw new Error('Data Product is Not found ')
		}
		return data
	}
	
	async createOne({ id, ...data }: ProductCreate) {
		data = this.valid.createValid(data)
		return prisma.productDB.create({
			data: {
				harga: data.harga,
				img: data.img,
				jenis: data.jenis,
				lokasi: data.lokasi,
				keterangan: data.keterangan,
				nama: data.nama,
				jumlah: data.jumlah,
				...(id ? { id } : {}),
				userId: data.userId,
			},
		})
	}
	
	async updateOne(data: ProductUpdate, { id_product, id_user }: ProductId) {
		data = this.valid.updateValid(data)
		return prisma.productDB.update({
			where: { id: id_product, userId: id_user },
			data: { ...data },
		})
	}
	
	async deleteOne({ id_product, id_user }: ProductId,) {
		return prisma.productDB.delete({ where: { id: id_product, userId: id_user } })
	}
	
	async addStock(data: ProductTransaction, { id_product, id_user }: ProductId) {
		data = this.valid.addStockValid(data)
		return prisma.productDB.update({
			where: { id: id_product, userId: id_user },
			data: { jumlah: data.jumlah },
		})
	}
	
}

export const productService = new ProductService(
	productSchema
)
