import { productService, ProductService } from "@/server/service/product.service";
import { orderService, OrderService } from "@/server/service/order.service";

class DashboardController {
  constructor(
    private serviceProduct : ProductService,
    private serviceOrder : OrderService
  ) {
  }

  getAllTransactionToday(req : Request) {
    return Response.json('not implemented')

  }

  getIdTransactionToday(req : Request) {
    return Response.json('not implemented')

  }

  getEmptyStock(req : Request) {
    return Response.json('not implemented')

  }

  addStock(req : Request) {
    return Response.json('not implemented')
  }

  checkStock(req : Request) {
    return Response.json('not implemented')
  }
}

export const dashboardController = new DashboardController(
  productService,
  orderService
)
