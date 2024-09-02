import { NextRequest } from "next/server";
import { transactionController } from "@/server/controller/transaction.controller";

export async function POST(request : NextRequest,) {
  return transactionController.checkOut(request);
}
