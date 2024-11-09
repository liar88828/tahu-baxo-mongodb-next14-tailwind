import { NextRequest } from "next/server"
import { productController } from "@/server/controller/product.controller"
import type { Params } from "@/interface/server/param"

export async function GET(request: NextRequest, params: Params) {
	return productController.findStock(request, params)
}
