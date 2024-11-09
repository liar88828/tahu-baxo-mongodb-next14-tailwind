import { NextRequest } from "next/server";
import { trolleyController } from "@/server/controller/trolley.controller";

export async function GET(req: NextRequest,) {
	// console.log('count trolly')
	return trolleyController.getCount(req)
}