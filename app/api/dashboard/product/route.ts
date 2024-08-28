import {dashboardController} from "@/lib/controller/dashboard.controller";

let querys: "getEmptyStock" | "addStock" | "checkStock"

export async function GET(req: Request,) {
  if (querys === "getEmptyStock") {
    return dashboardController.getEmptyStock(req)
  }
  if (querys === 'checkStock') {
    return dashboardController.checkStock(req)
  }
}
