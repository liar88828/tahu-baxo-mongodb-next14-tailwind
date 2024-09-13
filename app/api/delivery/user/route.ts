import { NextRequest } from "next/server";
import { deliveryController } from "@/server/controller/deliver.controller";

export async function GET(request: NextRequest,) {
	return deliveryController.findAllPrivate(request,)
}
