import prisma from "@/lib/db/prisma";
import {TransactionCreate, TransactionSchema, transactionSchema} from "@/lib/schema/transaction.schema";

type transactionId = {
  idProduct: number,
  idOrder: string,
  idTransaction: number,
}

export class TransactionService {
  constructor(
    private valid: TransactionSchema
  ) {
  }

  async createOne(data: TransactionCreate
  ) {
    const {product, order} = this.valid.transactionValid(data)

    return prisma.$transaction(async (tx) => {

      const transactionDB = await tx.transactionDB.create({
        data: {
          jumlah: product.jumlah,
          productDBId: product.productId,
        }
      })

      const orderDB = await tx.orderanDB.create({
        data: {
          dari: order.alamatPenerima,
          alamatPenerima: order.alamatPenerima,
          lokasi: order.lokasi,
          guna: order.guna,
          pengirim: order.pengirim,
          hpPengirim: order.hpPengirim,
          penerima: order.penerima,
          hpPenerima: order.hpPenerima,
          pesan: order.pesan,
          waktuKirim: order.waktuKirim,
          namaPengiriman: order.namaPengiriman,
          ongkir: order.ongkir,
          typePembayaran: order.typePembayaran,
          totalBayar: order.totalBayar,
          transactionDBId: transactionDB.id,
          status: order.status,
          totalPenjualan: order.totalPenjualan,
        }
      })

      const productDB = await tx.productDB.update({
        where: {
          id: product.productId,
        },
        data: {
          jumlah: {
            decrement: transactionDB.jumlah
          },
        }
      })

      return {transactionDB, productDB, orderDB}
    })
  }

  async findId(id: transactionId) {
    return prisma.$transaction(async (tx) => {
      return {
        transactionDB: await tx.transactionDB.findUnique({where: {id: id.idTransaction}}),
        productDB: await tx.productDB.findUnique({where: {id: id.idProduct}}),
        orderDB: await tx.orderanDB.findUnique({where: {id: id.idOrder}})
      }
    })
  }

  async findAll(page: number, limit: number = 100) {
    return prisma.transactionDB.findMany({
        take: limit,
        skip: (page - 1) * limit,
      }
    )
  }

}

export const transactionService = new TransactionService(
  transactionSchema
)
