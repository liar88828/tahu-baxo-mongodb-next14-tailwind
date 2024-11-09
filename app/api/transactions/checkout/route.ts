import { NextRequest } from "next/server";
import { transactionController } from "@/server/controller/transaction.controller";

export async function GET(request: NextRequest) {
	return transactionController.findAllCheckoutPrivate(request);
}

export async function POST(request: NextRequest) {
	return transactionController.createCheckoutPrivate(request);
}
