import {transactionController} from "@/lib/controller/transaction.controller";
import {NextRequest} from "next/server";
import {Params} from "@/interface/params";


export async function GET(req: NextRequest, param: Params) {
  return transactionController.getStockProduct(req, param)
}


export async function PUT(req: NextRequest, param: Params) {
  return transactionController.addStockProduct(req, param)
}
