import {
  ProductCreate,
  productSchema,
  ProductSchema,
  ProductTransaction,
  ProductUpdate
} from "@/server/schema/product.schema";
import { ProductDB } from ".prisma/client";
import prisma from "@/config/prisma";

export class ProductService {
  constructor(
    private valid : ProductSchema,
  ) {
  }

  async findAll(page : number, take : number = 100) {
    return prisma.$transaction(async (tx) => {
      const data = await tx.productDB.findMany({
        take : take,
        skip : (page - 1) * take,
      })
      return {data, page, take}
    })
  }

  // async findAll() {
  //   return prisma.bank.findAll()
  // }

  async findId(id : number) : Promise<ProductDB> {
    id = this.valid.idValid(id)
    const data = await prisma.productDB.findUnique({where : {id}})
    if (!data) {
      throw new Error('Data Product is Not found ')
    }
    return data
  }

  async createOne({id, ...data} : ProductCreate) {
    data = this.valid.createValid(data)
    return prisma.productDB.create({
      data : {
        harga : data.harga,
        img : data.img,
        jenis : data.jenis,
        lokasi : data.lokasi,
        keterangan : data.keterangan,
        nama : data.nama,
        jumlah : data.jumlah,
        ...(id ? {id} : {}),
      },
    })
  }

  async updateOne(data : ProductUpdate, id : number) {
    id = this.valid.idValid(id)
    data = this.valid.updateValid(data)
    return prisma.productDB.update({data : {...data}, where : {id : id}})
  }

  async deleteOne(id : number) {
    id = this.valid.idValid(id)
    return prisma.productDB.delete({where : {id}})
  }

  async addStock(data : ProductTransaction, id : number) {
    data = this.valid.addStockValid(data)
    return prisma.productDB.update({
      data : {jumlah : data.jumlah},
      where : {id : id}
    })
  }

}

export const productService = new ProductService(
  productSchema
)
