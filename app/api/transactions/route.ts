import { NextRequest } from "next/server"
import { transactionController } from "@/server/controller/transaction.controller"
import type { Params } from "../../../interface/server/param"

export async function GET(request: NextRequest, param: Params) {
	return transactionController.addStockProduct(request, param)
}
