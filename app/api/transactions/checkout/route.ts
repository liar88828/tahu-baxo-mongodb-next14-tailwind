import {NextRequest} from "next/server";
import {transactionController} from "@/lib/controller/transaction.controller";

export async function POST(request: NextRequest,) {
  return transactionController.checkOut(request);
}
