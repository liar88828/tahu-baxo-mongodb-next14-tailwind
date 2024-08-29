import {orderService, OrderService} from "@/lib/service/order.service";
import {productService, ProductService} from "@/lib/service/product.service";
import {userService, UserService} from "@/lib/service/user.service";
import {bankService, BankService} from "@/lib/service/bank.service";
import {NextRequest} from "next/server";
import {errorHanding} from "@/lib/utils/errorHanding";
import {Params} from "@/interface/params";
import {requestService, RequestService} from "@/lib/service/request.service";
import {transactionService, TransactionService} from "@/lib/service/transaction.service";
import {ProductTransaction} from "@/lib/schema/product.schema";
import {TransactionCreate} from "@/interface/transaction";

class TransactionController {
  constructor(
    private serviceReq: RequestService,
    private serviceOrder: OrderService,
    private serviceProduct: ProductService,
    private serviceUser: UserService,
    private serviceBank: BankService,
    private serviceTransaction: TransactionService,
  ) {
  }

  async checkOut(req: NextRequest) {
    try {
      let {data} = await this.serviceReq.getData<TransactionCreate>(req)
      const res = await this.serviceTransaction.createOne(data)
      return Response.json(res)
    } catch (e) {
      return errorHanding(e)
    }
  }

  findAll(req: NextRequest) {
    try {
      let {page, take} = this.serviceReq.getPage(req)
      const data = this.serviceOrder.findAll(page, take)
      return Response.json(data)
    } catch (e) {
      return errorHanding(e)
    }
  }

  async findId(req: NextRequest, param: Params) {
    try {
      let {id} = this.serviceReq.getId(param)
      const data = await this.serviceOrder.findId(id)
      return Response.json(data)
    } catch (e) {
      return errorHanding(e)
    }
  }

  deleteOne(req: NextRequest, param: Params) {
    return Promise.resolve(undefined);
  }

  updateOne(req: NextRequest, param: Params) {
    return Promise.resolve(undefined);
  }

  async addStockProduct(req: NextRequest, param: Params) {
    try {
      let {data, id} = await this.serviceReq.getUpdateInt<ProductTransaction>(req, param)
      const res = await this.serviceProduct.addStock(data, id)
      return Response.json(res)
    } catch (e) {
      return errorHanding(e)
    }
  }

  async getStockProduct(req: NextRequest, param: Params) {
    try {
      let {id} = this.serviceReq.getIdInt(param)
      const data = await this.serviceProduct.findId(id)
      return Response.json(data)
    } catch (e) {
      return errorHanding(e)
    }
  }

  addTrolley(request: NextRequest, param: Params) {
    return Promise.resolve(undefined);
  }
}

export const transactionController = new TransactionController(
  requestService,
  orderService,
  productService,
  userService,
  bankService,
  transactionService,
)
