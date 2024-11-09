import { authController } from "@/server/controller/auth.controller";
import { NextRequest } from "next/server";
import { Params } from "@/interface/server/param";

// refresh
export async function GET(req: NextRequest, params: Params) {
	return authController.refresh(req, params)
}
