import { authController } from "@/server/controller/auth.controller";
import { NextRequest } from "next/server";

// register
export async function POST(req : NextRequest) {
  return authController.register(req)
}
