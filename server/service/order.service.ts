import prisma from "@/config/prisma";
import { OrderCreate, orderSchema, OrderSchema } from "@/server/schema/order.schema";

export class OrderService {
  constructor(
    private valid : OrderSchema
  ) {
  }

  async createOne(data : OrderCreate) {
    data = this.valid.validCreate(data)
    return prisma.orderanDB.create({
      data : {
        dari : data.dari,
        lokasi : data.lokasi,
        guna : data.guna,
        pengirim : data.pengirim,
        hp : data.hp,
        pesan : data.pesan,
        waktuKirim : data.waktuKirim,
        // namaPengiriman: data.nama,
        ongkir : data.ongkir,
        typePembayaran : data.typePembayaran,
        totalBayar : data.totalBayar,
        status : data.status,
        totalPenjualan : data.totalPenjualan,
      }
    })

  }

  async findAll(page : number, take : number = 100) {
    return prisma.orderanDB.findMany({
      take : take,
      skip : (page - 1) * take,
    });
  }

  async findId(id : string) {

    const data = await prisma.orderanDB.findUnique({
      where : {id}
    });
    if (!data) {
      throw new Error('Data Order is not found')
    }
    return data
  }
}

export const orderService = new OrderService(
  orderSchema
)
