import { NextRequest } from "next/server";
import { productController } from "@/server/controller/product.controller";
import { Params } from "@/interface/params";

export async function GET(request: NextRequest, params: Params) {
	return productController.findStock(request, params)
	
}