import {authController} from "@/lib/controller/auth.controller";
import {NextRequest} from "next/server";


// logout
export async function DELETE(req: NextRequest) {
  return authController.logout(req)
}

// logout
// export async function GET(req: NextRequest) {
//   return userController.test(req)
// }
