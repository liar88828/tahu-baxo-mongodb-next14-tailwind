import {TCREATEPRODUCT} from '@/lib/validator/zod';
import prisma from '@/lib/db/prisma';

export class ProductRepo {
  async findPaginate( page: number, take: number ) {
    return prisma.$transaction( async ( tx ) => {
      const count = await tx.productDB.count()
      const res = await tx.productDB.findMany({
        take: take,
        skip: ( page - 1 ) * take,
      } )
      return { res, count }
    } )
  }
  async createOne( data: TCREATEPRODUCT ) {
    return prisma.productDB.create({
      data: {

        id        : data.id,
        harga     : data.harga,
        img       : data.img,
        jenis     : data.jenis,
        jumlah    : data.jumlah,
        keterangan: data.keterangan,
        lokasi    : data.lokasi,
        nama      : data.nama,

      }
    } )
  }
  async findAll() {
    return prisma.productDB.findMany()
  }

  async findOne(id: number) {
    return prisma.productDB.findUnique({where: {id}})
  }

  async deleteOne(id: number) {
    return prisma.productDB.delete({where: {id}})
  }

  // async updateOne( data: TUPDATEPRODUCT, id: number, ) {
  //   return prisma.productDB.update( { data: { ...data }, where: { id: id } } )
  // }
}

export const produk = new ProductRepo()
