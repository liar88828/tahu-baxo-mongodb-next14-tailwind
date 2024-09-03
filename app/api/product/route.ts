import { NextRequest } from 'next/server'
import { productController } from '@/server/controller/product.controller'

export async function GET(request : NextRequest) {
  return productController.findAll(request)

}

export async function POST(request : NextRequest) {
  return productController.createOne(request)
}