// forgot password
import { NextRequest } from "next/server";
import { forgetController } from "@/server/controller/forget.controller";

export async function DELETE(req: NextRequest) {
	return forgetController.remove(req)
}
