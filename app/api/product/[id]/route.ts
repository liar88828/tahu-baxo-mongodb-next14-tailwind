import {NextRequest} from 'next/server'
import {productController} from '@/lib/controller/product.controller'
import {Params} from "@/interface/params";

export async function GET(request: NextRequest, params: Params) {
  return productController.findId(request, params)
}

export async function PUT(request: NextRequest, params: Params) {
  return productController.updateOne(request, params)
}

export async function DELETE(request: NextRequest, params: Params) {
  return productController.deleteOne(request, params)
}
