import { authController } from "@/server/controller/auth.controller";
import { NextRequest } from "next/server";
import { Params } from "@/interface/server/param";

// logout
export async function DELETE(req: NextRequest, params: Params) {
	console.log('this logout route')
	return authController.logout(req, params)
}

