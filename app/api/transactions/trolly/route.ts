import {NextRequest} from "next/server";
import {Params} from "@/interface/params";
import {transactionController} from "@/lib/controller/transaction.controller";

export async function GET(request: NextRequest, param: Params) {
  return transactionController.addTrolley(request, param);
}

export async function DELETE(request: NextRequest, param: Params) {
  return transactionController.addTrolley(request, param);
}
