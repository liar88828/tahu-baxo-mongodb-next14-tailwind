import prisma from "@/lib/db/prisma";
import {TransactionSchema, transactionSchema} from "@/lib/schema/transaction.schema";
import {TransactionCreate} from "@/interface/transaction";

type transactionId = {
  idProduct: number,
  idOrder: string,
  idTransaction: number,
}

export class TransactionService {
  constructor(
    private valid: TransactionSchema,
  ) {
  }

  async createOne(data: TransactionCreate
  ) {
    const {order, transaction} = this.valid.transactionValid(data)
    return prisma.$transaction(async (tx) => {

      const orderDB = await tx.orderanDB.create({
        data: {
          dari: order.dari,
          lokasi: order.lokasi,
          guna: order.guna,
          pengirim: order.pengirim,
          hp: order.hp,
          pesan: order.pesan,
          waktuKirim: order.waktuKirim,
          ongkir: order.ongkir,
          typePembayaran: order.typePembayaran,
          totalBayar: order.totalBayar,
          status: order.status,
          totalPenjualan: order.totalPenjualan,
          //
        }
      })

      const productDB = await tx.productDB.update({
        where: {
          id: transaction.productDBId,
        },
        data: {
          jumlah: {
            decrement: transaction.jumlah
          },
        }
      })

      const transactionDB = await tx.transactionDB.create({
        data: {
          jumlah: transaction.jumlah,
          productDBId: transaction.productDBId,
          orderanDBId: orderDB.id,
          penerimaDBId: transaction.penerimaDBId,
          deliveryDBId: transaction.deliveryDBId,
          bankDBId: transaction.bankDBId,
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
