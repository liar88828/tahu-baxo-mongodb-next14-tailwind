import {authController} from "@/lib/controller/auth.controller";
import {NextRequest} from "next/server";

// login
export async function POST(req: NextRequest) {
  return authController.login(req)
}
