import prisma from "@/config/prisma";
import {
  GetAllTrolley,
  TrolleyData,
  TrolleyDataId,
  TrolleySchema,
  trolleySchema
} from "@/server/schema/trolley.schema";
import { ErrorProduct, ErrorTrolley } from "@/lib/error/errorCustome";
import { AccessTokenPayload } from "@/server/service/jwt.service";

export class TrolleyService {
  constructor(
    private serviceSchema : TrolleySchema,
  ) {

  }

  async getAll(user : AccessTokenPayload) : Promise<GetAllTrolley[]> {
    const trolleyDB = await prisma.trolleyOnProductDB.count({});
    return prisma.trolleyOnProductDB.findMany(
      {
        include : {ProductDB : true,},
        // where : {id : trolleyId}
      })
  }

  async increment(data : TrolleyData,) {
    data = this.serviceSchema.validCreate(data)
    return prisma.$transaction(async (tx) => {
      // check stock trolley
      const trolleyDB = await tx.trolleyOnProductDB.count({where : {trolleyId : data.trolleyId}});
      if (trolleyDB >= 200) {
        throw new ErrorTrolley('conflict')
      }
      // find trolley
      const trolleyOnProductDB = await tx.trolleyOnProductDB.findUnique({
        where : {
          id : data.trolleyOnProductDBId,
          trolleyId : data.trolleyId,
          productDBId : data.productId
        },
      })

      if (!trolleyOnProductDB) {
        // create trolley
        const res = await tx.trolleyOnProductDB.create({
          data : {
            trolleyId : data.trolleyId,
            productDBId : data.productId,
            qty : data.qty,
          },
        })
        return {res, status : 'create data'}
      } else {
        // update trolley
        const res = await tx.trolleyOnProductDB.update({
          where : {
            id : data.trolleyOnProductDBId,
            trolleyId : data.trolleyId,
            productDBId : data.productId
          },
          data : {
            trolleyId : data.trolleyId,
            productDBId : data.productId,
            qty : {increment : data.qty},
          }
        })
        return {res, status : 'update data'}
      }
    })
  }

  async decrement(data : TrolleyData,) {
    data = this.serviceSchema.validCreate(data)
    return prisma.$transaction(async (tx) => {
      const trolleyOnProductDB = await tx.trolleyOnProductDB.findUnique({
        where : {
          id : data.trolleyOnProductDBId,
          trolleyId : data.trolleyId,
          productDBId : data.productId
        },
      })

      if (!trolleyOnProductDB) {
        throw new ErrorTrolley('notFound')
      } else {
        const res = await tx.trolleyOnProductDB.update({
          where : {
            id : data.trolleyOnProductDBId,
            trolleyId : data.trolleyId,
            productDBId : data.productId
          },
          data : {
            trolleyId : data.trolleyId,
            productDBId : data.productId,
            qty : {decrement : data.qty},
          }
        })
        return {res, status : 'update data'}
      }
    })
  }

  protected async addxx2(data : TrolleyData, id : TrolleyDataId) {
    this.serviceSchema.validCreate(data)
    return prisma.$transaction(async (tx) => {
      const trolleyDB = await prisma.trolley.count({where : {id : data.trolleyId}});
      console.log(trolleyDB)
      return tx.trolleyOnProductDB.upsert({
        where : {
          id : data.trolleyOnProductDBId,
          trolleyId : data.trolleyId,
          productDBId : data.trolleyId
        },
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

  protected async addxxx(data : TrolleyData, id : TrolleyDataId) {
    this.serviceSchema.validCreate(data)
    const trolleyDB = await prisma.trolley.findUnique({where : {id : data.trolleyId}})
    if (!trolleyDB) {
      throw new ErrorTrolley('notFound')
    }
    const productDB = await prisma.productDB.findUnique({where : {id : data.productId}})
    if (!productDB) {
      throw new ErrorProduct("notFound")
    }
    return prisma.$transaction(async (tx) => {
      const trolleyOnProductDB = await tx.trolleyOnProductDB.findUnique({where : {id : data.trolleyOnProductDBId}})
      if (trolleyOnProductDB) {
        console.log('will update')
        return tx.trolleyOnProductDB.update({
          where : {id : id.trolleyOnProductDBId},
          data : {
            trolleyId : trolleyDB.id,
            productDBId : productDB.id,
            qty : {increment : data.qty},
          }
        })
      } else {
        console.log('will create')
        return tx.trolleyOnProductDB.create({
          data : {
            trolleyId : trolleyDB.id,
            productDBId : productDB.id,
            qty : data.qty
          }
        })
      }

      // return tx.trolleyOnProductDB.upsert({
      //   where : {id : id.trolleyOnProductDBId},
      //   update : {
      //     trolleyId : trolleyDB.id,
      //     productDBId : productDB.id,
      //     qty : {increment : data.qty},
      //   },
      //   create : {
      //     trolleyId : trolleyDB.id,
      //     productDBId : productDB.id,
      //     qty : data.qty
      //   }
      // })
      // return tx.trolleyOnProductDB.upsert({
      //   where : {id : id.trolleyOnProductDBId},
      //   update : {
      //     trolleyId : data.trolleyId,
      //     productDBId : data.productId,
      //     qty : {increment : data.qty},
      //   },
      //   create : {
      //     trolleyId : data.trolleyId,
      //     productDBId : data.productId,
      //     qty : data.qty
      //   }
      // })
    })

  }

  async remove({trolleyOnProductDBId} : TrolleyDataId) {
    return prisma.trolleyOnProductDB.delete({where : {id : trolleyOnProductDBId},})
  }
}

export const trolleyService = new TrolleyService(
  trolleySchema
);
