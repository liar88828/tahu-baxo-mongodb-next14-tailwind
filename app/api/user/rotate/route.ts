import { authController } from "@/server/controller/auth.controller";
import { NextRequest } from "next/server";

// refresh
export async function GET(req : NextRequest) {
  return authController.rotateToken(req)
}
