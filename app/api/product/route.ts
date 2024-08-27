import {NextRequest} from 'next/server'
import {productController} from '@/lib/controller/product.controller'

export async function GET(request: NextRequest) {
  return productController.findAll(request)

}

export async function POST(request: NextRequest) {
  return productController.createOne(request)
}
