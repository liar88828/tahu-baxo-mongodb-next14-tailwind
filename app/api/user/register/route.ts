import {userController} from "@/lib/controller/user.controller";
import {NextRequest} from "next/server";

// register
export async function POST(req: NextRequest) {
  return userController.register(req)
}
