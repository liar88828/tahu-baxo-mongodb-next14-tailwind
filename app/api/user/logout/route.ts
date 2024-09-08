import { authController } from "@/server/controller/auth.controller";
import { NextRequest } from "next/server";

// logout
export async function DELETE(req : NextRequest) {
  return authController.logout(req)
}

