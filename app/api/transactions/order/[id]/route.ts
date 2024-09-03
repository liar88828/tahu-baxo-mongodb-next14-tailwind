import { NextRequest } from "next/server";
import { Params } from "@/interface/params";
import { transactionController } from "@/server/controller/transaction.controller";

export async function GET(req : NextRequest, param : Params) {
  return transactionController.findId(req, param)
}

export async function PUT(req : NextRequest, param : Params) {
  return transactionController.updateOne(req, param)
}

export async function DELETE(req : NextRequest, param : Params) {
  return transactionController.deleteOne(req, param)
}
