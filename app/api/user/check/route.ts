import { NextRequest } from "next/server";
import { authController } from "@/server/controller/auth.controller";

export async function GET(request: NextRequest,) {
	return authController.getUserByToken(request);
}
