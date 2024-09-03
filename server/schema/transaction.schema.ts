import { z } from "zod";
import { productSchema, ProductSchema } from "@/server/schema/product.schema";
import { PenerimaSchema, penerimaSchema } from "@/server/schema/penerima.schema";
import { OrderCreate, orderSchema, OrderSchema } from "@/server/schema/order.schema";
import { TransactionCreate } from "@/interface/transaction";

export class TransactionSchema {
  create = z.object({
    id : z.number(),
    jumlah : z.number(),
    productDBId : z.number(),
    // orderanDBId: z.string(),// because will add in transaction db
    penerimaDBId : z.number(),
    deliveryDBId : z.number(),
    bankDBId : z.number(),
  }) //satisfies z.Schema<TransactionDB>
  private transactionSchema = z.object({
    transaction : this.create,
    order : this.orderSchema.create,
    // product: this.productSchema.productTransactionSchema,
    // penerima: this.penerimaSchema.create

  }) //satisfies z.Schema<TransactionCreate>

  constructor(
    private productSchema : ProductSchema,
    private penerimaSchema : PenerimaSchema,
    private orderSchema : OrderSchema
  ) {
  }

  idProduct(id : number) {
    id = z.number().parse(id)
    if (!id) {
      throw new Error("data is Not valid")
    }
    return id
  }

  orderValid(data : OrderCreate) {
    data = this.orderSchema.create.parse(data)
    if (!data) {
      throw new Error("data is Not valid")
    }
    return data
  }

  idOrder(id : string) {
    id = z.string().parse(id)
    if (!id) {
      throw new Error("id is Not valid")
    }
    return id
  }

  transactionValid(data : TransactionCreate) {
    const validData = this.transactionSchema.parse(data)
    if (!validData) {
      throw new Error("Data transaction schema is not valid")
    }
    return validData

  }
}

export const transactionSchema = new TransactionSchema(
  productSchema,
  penerimaSchema,
  orderSchema
)
