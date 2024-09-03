import prisma from "@/config/prisma";
import { TrolleyOnProductDB } from "@prisma/client";
import { ProductDB } from ".prisma/client";

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

export class TrolleyService {
  async getAll({trolleyId} : TrolleyDataAll) : Promise<GetAllTrolley[]> {
    return prisma.trolleyOnProductDB.findMany(
      {
        include : {ProductDB : true,},
        where : {id : trolleyId}
      })
  }

  async add(data : TrolleyData, id : TrolleyDataId) {
    return prisma.$transaction(async (tx) => {
      return tx.trolleyOnProductDB.upsert({
        where : {id : id.trolleyOnProductDBId},
        update : {
          trolleyId : data.trolleyId,
          productDBId : data.productId,
          qty : {increment : data.qty},
        },
        create : {
          trolleyId : data.trolleyId,
          productDBId : data.productId,
          qty : data.qty
        }
      })
    })

  }

  async remove({trolleyOnProductDBId} : TrolleyDataId) {
    return prisma.trolleyOnProductDB.delete({where : {id : trolleyOnProductDBId},})
  }
}

export const trolleyService = new TrolleyService();
