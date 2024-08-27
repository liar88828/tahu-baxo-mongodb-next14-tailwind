import { NextRequest } from 'next/server'
import {bankController} from "@/lib/controller/bank.controller";

export async function GET(request: NextRequest) {
  return bankController.findOne(request)
}

export async function PUT(request: NextRequest) {
  return bankController.updateOne(request)
}

export async function DELETE(request: NextRequest) {
  return bankController.deleteOne(request)
}
