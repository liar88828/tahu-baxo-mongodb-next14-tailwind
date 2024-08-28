import {userController} from "@/lib/controller/user.controller";
import {NextRequest} from "next/server";


// login
export async function POST(req: NextRequest) {
  return userController.login(req)
}
