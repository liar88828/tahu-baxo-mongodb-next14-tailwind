import {ProductCreate, ProductUpdate} from './../db/prisma'
import prisma from '@/lib/db/prisma'
import {ProductDB} from '@prisma/client'

export class ProductService {
  async findAll(page: number, take: number = 100) {
    return prisma.$transaction(async (tx) => {
      const data = await tx.productDB.findMany({
        take: take,
        skip: (page - 1) * take,
      })
      return {data, page, take}
    })
  }

  // async findAll() {
  //   return prisma.bank.findAll()
  // }

  async findOne(id: number): Promise<ProductDB> {
    const data = await prisma.productDB.findUnique({where: {id}})
    if (!data) {
      throw new Error('Data Product is Not found ')
    }
    return data
  }

  async createOne({id, ...data}: ProductCreate) {
    return prisma.productDB.create({
      data: {
        harga: data.harga,
        img: data.img,
        jenis: data.jenis,
        lokasi: data.lokasi,
        keterangan: data.keterangan,
        nama: data.nama,
        jumlah: data.jumlah,
        ...(id ? {id} : {}),
      },
    })
  }

  async updateOne(data: ProductUpdate, id: number) {
    console.log("id : ", id)
    return prisma.productDB.update({data: {...data}, where: {id: id}})
  }

  async deleteOne(id: number) {
    return prisma.productDB.delete({where: {id}})
  }
}
