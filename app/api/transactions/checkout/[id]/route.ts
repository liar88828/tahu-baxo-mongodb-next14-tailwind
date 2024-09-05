import { NextRequest } from "next/server";
import { transactionController } from "@/server/controller/transaction.controller";
import { Params } from "@/interface/params";

export async function DELETE(request: NextRequest, param: Params) {
	return transactionController.deleteOne(request, param);
}
