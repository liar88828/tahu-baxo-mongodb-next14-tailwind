import { productSchema, ProductSchema } from "@/server/schema/product.schema"
import prisma from "@/config/prisma"
import { AccessTokenPayload } from "@/server/service/jwt.service"
import type { ProductDB } from "@prisma/client"
import type { IService } from "@/interface/server/IService"
import type { ProductCreate, ProductId, ProductTransaction, ProductUpdate, } from "@/interface/model/product.type"
import { GetPage } from "@/interface/server/IServiceRequest";

export type PaginationDB<T> = {
	data: T[]
	page: number
	take: number
}

export class ProductService implements IService<ProductDB> {
	constructor(private valid: ProductSchema) {
	}
	
	async findAllStock(
		page: number,
		take: number = 100,
		stock: string
	): Promise<PaginationDB<ProductDB>> {
		return prisma.$transaction(async (tx) => {
			const data = await tx.productDB.findMany({
				take: take,
				skip: (page - 1) * take,
			})
			return { data, page, take }
		})
	}
	
	async findAll(
		page: number,
		take: number = 100
	): Promise<PaginationDB<ProductDB>> {
		return prisma.$transaction(async (tx) => {
			const data = await tx.productDB.findMany({
				take: take,
				skip: (page - 1) * take,
			})
			return { data, page, take }
		})
	}
	
	async findAllPrivate({ page, take, search }: GetPage, user: AccessTokenPayload
	): Promise<PaginationDB<ProductDB>> {
		return prisma.$transaction(async (tx) => {
			const data = await tx.productDB.findMany({
				where: {
					// userId: user.id,
					...(search ? { nama: { contains: search } } : {})
					
				},
				take: take,
				skip: (page - 1) * take,
				// select:{_count: true},
				// include: {
				// 	_count: true
				// }
			})
			// console.log(data)
			return { data, page, take, }
		})
	}
	
	async findAllPublic({ page, take, search }: GetPage): Promise<PaginationDB<ProductDB>> {
		return prisma.$transaction(async (tx) => {
			const data = await tx.productDB.findMany({
				where: {
					...(search ? { nama: { contains: search } } : {})
				},
				take: take,
				skip: (page - 1) * take,
				
			})
			return { data, page, take, }
		})
	}
	
	async findIdPublic(id: number): Promise<ProductDB> {
		const data = await prisma.productDB.findUnique({ where: { id } })
		if (!data) {
			throw new Error("Data Product is Not found ")
		}
		return data
	}
	
	async findIdPrivate({ id_product, id_user }: ProductId): Promise<ProductDB> {
		const data = await prisma.productDB.findUnique({
			where: { id: id_product, userId: id_user },
		})
		if (!data) {
			throw new Error("Data Product is Not found ")
		}
		return data
	}
	
	async createOne(data: ProductCreate): Promise<ProductDB> {
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
				// ...(id ? { id } : {}),
				userId: data.userId,
			},
		})
	}
	
	async updateOne(
		data: ProductUpdate,
		{ id_product, id_user }: ProductId
	): Promise<ProductDB> {
		data = this.valid.updateValid(data)
		return prisma.productDB.update({
			where: { id: id_product, userId: id_user },
			data: { ...data },
		})
	}
	
	async deleteOne({ id_product, id_user }: ProductId): Promise<ProductDB> {
		return prisma.productDB.delete({
			where: { id: id_product, userId: id_user },
		})
	}
	
	async addStock(
		data: ProductTransaction,
		{ id_product, id_user }: ProductId
	): Promise<ProductDB> {
		data = this.valid.addStockValid(data)
		return prisma.productDB.update({
			where: { id: id_product, userId: id_user },
			data: { jumlah: data.jumlah },
		})
	}
}

export const productService = new ProductService(productSchema)
