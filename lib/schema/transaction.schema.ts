import {z} from "zod";
import {OrderanDB, Prisma} from "@prisma/client";
import prisma from "@/lib/db/prisma";
import {productSchema, ProductSchema, ProductTransaction} from "@/lib/schema/product.schema";


export type OrderTransaction = Prisma.Args<
  typeof prisma.orderanDB,
  'create'
>['data']


export type TransactionCreate = {
  product: ProductTransaction,
  order: OrderTransaction
}

export class TransactionSchema {
  private transactionSchema = z.object({
    product: this.productSchema.productTransactionSchema,
    order: this.orderTransactionSchema,
  }) satisfies z.Schema<TransactionCreate>

  private orderTransactionSchema = z.object({
    id: z.string(),
    dari: z.string(),
    pengirim: z.string(),
    hpPengirim: z.string(),
    penerima: z.string(),
    alamatPenerima: z.string(),
    hpPenerima: z.string(),
    pesan: z.date(),
    waktuKirim: z.date(),
    guna: z.string(),
    lokasi: z.string(),
    namaPengiriman: z.string(),
    ongkir: z.number(),
    typePembayaran: z.string(),
    totalBayar: z.number(),
    totalPenjualan: z.number(),
    status: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    transactionDBId: z.number(),
  }) satisfies z.Schema<OrderTransaction>

  constructor(
    private productSchema: ProductSchema
  ) {
  }


  idProduct(id: number) {
    id = z.number().parse(id)
    if (!id) {
      throw new Error("data is Not valid")
    }
    return id
  }

  orderValid(data: OrderanDB) {
    data = this.orderTransactionSchema.parse(data)
    if (!data) {
      throw new Error("data is Not valid")
    }
    return data
  }

  idOrder(id: string) {
    id = z.string().parse(id)
    if (!id) {
      throw new Error("id is Not valid")
    }
    return id
  }

  transactionValid(data: TransactionCreate) {
    data = this.transactionSchema.parse(data)
    if (!data) {
      throw new Error("Data transaction schema is not valid")
    }
    return data

  }
}

export const transactionSchema = new TransactionSchema(
  productSchema
)
