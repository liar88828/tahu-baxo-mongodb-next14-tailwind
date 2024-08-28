import {productService, ProductService} from "@/lib/service/product.service";
import {OrderService} from "@/lib/service/order.service";

class DashboardController {
  constructor(
    private serviceProduct: ProductService,
    private serviceOrder: OrderService
  ) {
  }

  getAllTransactionToday(req: Request) {
    return Response.json('not implemented')

  }

  getIdTransactionToday(req: Request) {
    return Response.json('not implemented')

  }

  getEmptyStock(req: Request) {
    return Response.json('not implemented')

  }

  addStock(req: Request) {
    return Response.json('not implemented')
  }

  checkStock(req: Request) {
    return Response.json('not implemented')
  }
}


export const dashboardController = new DashboardController(
  productService,
  new OrderService(),
)
