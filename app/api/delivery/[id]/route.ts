import { NextRequest } from 'next/server'
import { deliveryController } from '@/server/controller/deliver.controller';
import { Params } from "@/interface/params";

export async function GET(request : NextRequest, params : Params) {
  return deliveryController.findId(request, params);
}

export async function DELETE(request : NextRequest, params : Params) {
  return deliveryController.deleteOne(request, params)
}

export async function PUT(request : NextRequest, params : Params) {
  return deliveryController.updateOne(request, params,)

}