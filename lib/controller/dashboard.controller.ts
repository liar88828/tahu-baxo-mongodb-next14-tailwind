import {ProductService} from "@/lib/service/product.service";
import {OrderService} from "@/lib/service/order.service";

class DashboardController {
  constructor(
    private serviceProduct: ProductService,
    private serviceOrder: OrderService
  ) {
  }

  getAllTransactionToday(req: Request) {

  }

  getIdTransactionToday(req: Request) {

  }

  getEmptyStock(req: Request) {
    return Promise.resolve(undefined);
  }

  addStock(req: Request) {
    return Promise.resolve(undefined);
  }

  checkStock(req: Request) {
    return Promise.resolve(undefined);
  }
}


export const dashboardController = new DashboardController(
  new ProductService(),
  new OrderService(),
)
