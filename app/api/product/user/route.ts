import { NextRequest } from "next/server";
import { productController } from "@/server/controller/product.controller";

export async function GET(request: NextRequest) {
	// NextResponse.json('this private')//
	return productController.findAllPrivate(request)
}