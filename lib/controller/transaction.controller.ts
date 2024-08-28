import {OrderService} from "@/lib/service/order.service";
import {ProductService} from "@/lib/service/product.service";
import {UserService} from "@/lib/service/user.service";
import {BankService} from "@/lib/service/bank.service";
import {NextRequest} from "next/server";
import {errorHanding} from "@/lib/utils/errorHanding";
import {Params} from "@/interface/params";
import {RequestService} from "@/lib/service/request.service";
import {ProductTransaction, TransactionCreate, TransactionSchema} from "@/lib/validator/schema/transaction.schema";
import {TransactionService} from "@/lib/service/transaction.service";

class TransactionController {
  constructor(
    private serviceOrder: OrderService,
    private serviceProduct: ProductService,
    private serviceUser: UserService,
    private serviceBank: BankService,
    private serviceTransaction: TransactionService,
    private serviceReq: RequestService,
    private serviceZod: TransactionSchema,
  ) {
  }

  async createOne(req: NextRequest) {
    try {
      let {data} = await this.serviceReq.getData<TransactionCreate>(req)
      data = this.serviceZod.transactionValid(data)
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
      id = this.serviceZod.idOrder(id)
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
      data = this.serviceZod.addStockValid(data)
      const res = await this.serviceProduct.addStock(data, id)
      return Response.json(res)
    } catch (e) {
      return errorHanding(e)
    }
  }

  async getStockProduct(req: NextRequest, param: Params) {
    try {
      let {id} = this.serviceReq.getIdInt(param)
      id = this.serviceZod.idProduct(id)
      const data = await this.serviceProduct.findId(id)
      return Response.json(data)
    } catch (e) {
      return errorHanding(e)
    }
  }
}

export const transactionController = new TransactionController(
  new OrderService(),
  new ProductService(),
  new UserService(),
  new BankService(),
  new TransactionService(),
  new RequestService(),
  new TransactionSchema()
)
