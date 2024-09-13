import { NextRequest } from "next/server";
import { bankController } from "@/server/controller/bank.controller";

export async function GET(request: NextRequest) {
	return bankController.findAllPrivate(request)
}