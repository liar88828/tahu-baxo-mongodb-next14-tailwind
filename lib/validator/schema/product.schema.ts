import prisma from '@/lib/db/prisma'
import {z} from 'zod'
import {ISchema} from '@/interface/ISchema'
import {Prisma} from '@prisma/client'

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

  idValid(id: string): number {
    let validId = this.id.parse(Number(id))
    if (!validId) {
      throw new Error('data is not valid')
    }
    return validId
  }
}
