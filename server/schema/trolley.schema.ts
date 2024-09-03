import { TrolleyOnProductDB } from "@prisma/client";
import { ProductDB } from ".prisma/client";
import { z } from "zod";

export type TrolleyData = {
  userId : string,
  trolleyId : number,
  productId : number,
  trolleyOnProductDBId : number,
  qty : number
}
export type TrolleyDataAll = Pick<TrolleyData, 'trolleyId'>
export type TrolleyDataId = Pick<TrolleyData, 'trolleyOnProductDBId'>
export type GetAllTrolley = TrolleyOnProductDB & { ProductDB : ProductDB | null }

export class TrolleySchema {
  create = z.object({
    userId : z.string().min(1),
    trolleyId : z.number().min(1),
    productId : z.number().min(1),
    trolleyOnProductDBId : z.number().min(1),
    qty : z.number().min(1),
  }) satisfies z.Schema<TrolleyData>

  validCreate(data : TrolleyData) {
    data = this.create.parse(data)
    if (!data) {
      throw new Error('Data penerima is not valid')
    }
    return data
  }

}

export const trolleySchema = new TrolleySchema()
