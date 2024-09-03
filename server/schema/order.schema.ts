import { z } from "zod";

export class OrderSchema {
  create = z.object({
    id : z.string(),
    dari : z.string(),
    pengirim : z.string(),
    nama : z.string(),
    hp : z.string(),
    // penerima: z.string(),
    // alamatPenerima: z.string(),
    // hpPenerima: z.string(),
    pesan : z.date(),
    waktuKirim : z.date(),
    guna : z.string(),
    lokasi : z.string(),
    ongkir : z.number(),
    typePembayaran : z.string(),
    totalBayar : z.number(),
    totalPenjualan : z.number(),
    status : z.string(),
    created_at : z.date(),
    updated_at : z.date(),
    //
    // transactionDBId: z.number(),
    // bankDBId: z.number(),
    // deliveryDBId: z.number(),
    // penerimaDBId:z.number()
  })

  validCreate(data : OrderCreate) : OrderCreate {
    data = this.create.parse(data)
    if (!data) {
      throw new Error('data order is not valid')
    }
    return data
  }
}

export const orderSchema = new OrderSchema()

export type OrderCreate = z.infer<typeof orderSchema.create>
