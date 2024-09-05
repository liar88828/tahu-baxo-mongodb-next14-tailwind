import { PenerimaCreate, penerimaSchema, PenerimaSchema } from "@/server/schema/penerima.schema";
import prisma from "@/config/prisma";
import { IService } from "@/interface/IService";
import { PenerimaDB } from "@prisma/client";

export class PenerimaService implements IService<PenerimaDB> {
	constructor(
		private valid: PenerimaSchema
	) {
	}
	
	async findAll(page: number, take: number) {
		const data = await prisma.penerimaDB.findMany({
			take: take,
			skip: (page - 1) * take,
		})
		return { data, page, take }
		
	}
	
	async findAllPrivate(page: number, take: number,) {
		const data = await prisma.penerimaDB.findMany({
			take: take,
			skip: (page - 1) * take,
		})
		return { data, page, take }
	}
	
	async findOne(id: number) {
		const data = await prisma.penerimaDB.findUnique({ where: { id } })
		if (!data) {
			throw new Error('Data Penerima is not found')
		}
		return data
	}
	
	async createOne(data: PenerimaCreate) {
		data = this.valid.validCreate(data)
		return prisma.penerimaDB.create({
			data: {
				nama: data.nama,
				alamat: data.alamat,
				hp: data.hp,
			}
		})
	}
	
	async updateOne(data: any, id: number) {
		data = this.valid.validCreate(data)
		return prisma.penerimaDB.update({
			where: { id },
			data: {
				nama: data.nama,
				alamat: data.alamat,
				hp: data.hp,
			}
		})
		
	}
	
	async deleteOne(id: number) {
		
		const data = await prisma.penerimaDB.delete({ where: { id } })
		if (!data) {
			throw new Error('Data Penerima is not found')
		}
		return data
	}
	
}

export const penerimaService = new PenerimaService(
	penerimaSchema
)
