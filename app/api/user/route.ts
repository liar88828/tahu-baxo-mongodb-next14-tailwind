import {userController} from "@/lib/controller/user.controller";
import {NextRequest} from "next/server";


// generateToken
export async function GET(req: NextRequest) {
  return userController.generateToken(req)
}

// logout
export async function DELETE(req: NextRequest) {
  return userController.logout(req)
}
