import { NextRequest } from "next/server";
import { productController } from "@/server/controller/product.controller";
import { Params } from "@/interface/server/param";

export async function GET(request: NextRequest, param: Params) {
	// NextResponse.json('this private')//
	return productController.findIdPrivate(request, param)
}