import { z } from 'zod'
import { ISchema } from '@/interface/ISchema'
import { ProductDB, User } from ".prisma/client";
import { addressInit, descriptionInit, imageInit, nameInit, userId } from "@/server/schema/init.schema";

export class ProductSchema implements ISchema {
  id = z.number({required_error : 'ID is required'}).optional()
  create = z.object({
    id : this.id,
    lokasi : addressInit,
    nama : nameInit,
    img : imageInit,
    keterangan : descriptionInit,
    harga : z.number({required_error : 'Harga is required'}).nonnegative(),
    jenis : z.string({required_error : 'Jenis is required'}).min(1).max(100),
    jumlah : z
      .number({required_error : 'Jumlah is required'})
      .int()
      .nonnegative(),
    userId : userId
  }) //satisfies z.Schema<ProductCreate>

  update = z.object({
    id : this.id,
		lokasi: addressInit,
		nama: nameInit,
		img: imageInit,
		keterangan: descriptionInit,
    harga : z.number({required_error : 'Harga is required'}).nonnegative(),
    jenis : z.string({required_error : 'Jenis is required'}).min(1).max(100),
    jumlah : z
      .number({required_error : 'Jumlah is required'})
      .int()
      .nonnegative(),
    userId : userId
 
  }) //satisfies z.Schema<ProductUpdate>

  productTransactionSchema = z.object({
    jumlah : z
      .number({required_error : 'Jumlah is required'})
      .int()
      .nonnegative(),
    productId : z.number()
  }) satisfies z.Schema<ProductTransaction>

  addStockValid(data : ProductTransaction) {
    data = this.productTransactionSchema.parse(data)
    if (!data) {
      throw new Error("data is Not valid")
    }
    return data
  }

  createValid(data : ProductCreate) : ProductCreate {
    data = this.create.parse(data)
    if (!data) {
      throw new Error('data is not valid')
    }
    return data
  }

  updateValid(data : ProductUpdate) : ProductUpdate {
    data = this.update.parse(data)
    if (!data) {
      throw new Error('data is not valid')
    }
    return data
  }

  // idValid(id : number | undefined) : number {
  //   id = this.id.parse(id)
  //   if (!id) {
  //     throw new Error('id is not valid')
  //   }
  //   return id
  // }
}

export const productSchema = new ProductSchema()

export type ProductCreate = z.output<typeof productSchema.create>
export type ProductUpdate = z.output<typeof productSchema.update>
export type ProductTransaction = {
  jumlah : number,
  productId : ProductDB['id'],
};
export type ProductId = {
  id_product : ProductDB['id'],
  id_user? : User['id']
}
// export type ProductCreate = Prisma.Args<
//   typeof prisma.productDB,
//   'create'
// >['data']

// export type ProductUpdate = Prisma.Args<
//   typeof prisma.productDB,
//   'update'
// >['data']
