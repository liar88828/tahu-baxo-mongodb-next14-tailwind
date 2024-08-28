import {transactionController} from "@/lib/controller/transaction.controller";
import {NextRequest} from "next/server";


export async function GET(req: NextRequest,) {
  return transactionController.getStockProduct(req)
}


// export async function POST(req: NextRequest,) {
//   return transactionController.addStockProduct(req)
// }
