import { TCREATEPRODUCT, TUPDATEPRODUCT } from '@/lib/validator/zod';
import prisma from '@/lib/db/prisma';

export class ProductRepo {
  async findPaginate( page: number, take: number ) {
    return prisma.$transaction( async ( tx ) => {
      const count = await tx.product.count()
      const res   = await tx.product.findMany( {
        take: take,
        skip: ( page - 1 ) * take,
      } )
      return { res, count }
    } )
  }
  async createOne( data: TCREATEPRODUCT ) {
    return prisma.product.create( {
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
    return prisma.product.findMany()
  }

  async findOne( id: string ) {
    return prisma.product.findUnique( { where: { id } } )
  }

  async deleteOne( id: string ) {
    return prisma.product.delete( { where: { id } } )
  }

  async updateOne( data: TUPDATEPRODUCT, id: string, ) {
    return prisma.product.update( { data: { ...data }, where: { id: id } } )
  }
}

export const produk = new ProductRepo()