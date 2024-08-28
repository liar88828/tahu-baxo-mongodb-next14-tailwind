import prisma from '@/lib/db/prisma'
import {z} from 'zod'
import {ISchema} from '@/interface/ISchema'
import {Prisma} from '@prisma/client'


export type ProductTransaction = {
  jumlah: number,
  productId: number,
};

export type ProductCreate = Prisma.Args<
  typeof prisma.productDB,
  'create'
>['data']

export type ProductUpdate = Prisma.Args<
  typeof prisma.productDB,
  'update'
>['data']


export class ProductSchema implements ISchema {


  id = z.number({required_error: 'ID is required'}).optional()
  create = z.object({
    id: this.id,
    lokasi: z.string({required_error: 'Lokasi is required'}).min(1).max(100),
    nama: z.string({required_error: 'Nama is required'}).min(1).max(100),
    harga: z.number({required_error: 'Harga is required'}).nonnegative(),
    img: z.string({required_error: 'Img is required'}).min(1).max(300),
    jenis: z.string({required_error: 'Jenis is required'}).min(1).max(100),
    jumlah: z
      .number({required_error: 'Jumlah is required'})
      .int()
      .nonnegative(),
    keterangan: z
      .string({required_error: 'Keterangan is required'})
      .min(1)
      .max(200),
  }) satisfies z.Schema<ProductCreate>

  update = z.object({
    id: this.id,
    lokasi: z.string({required_error: 'Lokasi is required'}).min(1).max(100),
    nama: z.string({required_error: 'Nama is required'}).min(1).max(100),
    harga: z.number({required_error: 'Harga is required'}).nonnegative(),
    img: z.string({required_error: 'Img is required'}).min(1).max(300),
    jenis: z.string({required_error: 'Jenis is required'}).min(1).max(100),
    jumlah: z
      .number({required_error: 'Jumlah is required'})
      .int()
      .nonnegative(),
    keterangan: z
      .string({required_error: 'Keterangan is required'})
      .min(1)
      .max(200),
  }) satisfies z.Schema<ProductUpdate>

  productTransactionSchema = z.object({
    jumlah: z
      .number({required_error: 'Jumlah is required'})
      .int()
      .nonnegative(),
    productId: z.number()
  }) satisfies z.Schema<ProductTransaction>

  addStockValid(data: ProductTransaction) {
    data = this.productTransactionSchema.parse(data)
    if (!data) {
      throw new Error("data is Not valid")
    }
    return data
  }

  createValid(data: ProductCreate): ProductCreate {
    data = this.create.parse(data)
    if (!data) {
      throw new Error('data is not valid')
    }
    return data
  }

  updateValid(data: ProductUpdate): ProductUpdate {
    data = this.update.parse(data)
    if (!data) {
      throw new Error('data is not valid')
    }
    return data
  }

  idValid(id: number | undefined): number {
    id = this.id.parse(id)
    if (!id) {
      throw new Error('id is not valid')
    }
    return id
  }
}

export const productSchema = new ProductSchema()
