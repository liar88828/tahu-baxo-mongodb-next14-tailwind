import { NextRequest } from 'next/server'
import { bankController } from '@/server/controller/bank.controller'
import { Params } from "@/interface/params";

export async function GET(request : NextRequest, params : Params) {
  return bankController.findId(request, params)
}

export async function PUT(request : NextRequest, params : Params) {
  return bankController.updateOne(request, params)
}

export async function DELETE(request : NextRequest, params : Params) {
  return bankController.deleteOne(request, params)
}
