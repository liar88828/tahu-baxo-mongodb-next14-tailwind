import { NextRequest } from "next/server";
import { transactionController } from "@/server/controller/transaction.controller";
import { Params } from "@/interface/params";

export async function GET(request : NextRequest, param : Params) {
  return transactionController.addStockProduct(request, param);
}