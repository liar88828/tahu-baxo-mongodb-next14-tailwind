import { NextRequest } from "next/server";
import { transactionController } from "@/server/controller/transaction.controller";

export async function GET(req : NextRequest) {
  return transactionController.findAll(req)
}

export async function POST(req : NextRequest) {
  return transactionController.checkOut(req)
}
