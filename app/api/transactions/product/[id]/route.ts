import { transactionController } from "@/server/controller/transaction.controller"
import { NextRequest } from "next/server"
import type { Params } from "../../../../../interface/server/param"

export async function GET(req: NextRequest, param: Params) {
  return transactionController.getStockProduct(req, param)
}

export async function PUT(req: NextRequest, param: Params) {
  return transactionController.addStockProduct(req, param)
}
