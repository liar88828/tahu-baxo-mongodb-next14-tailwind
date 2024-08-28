// forgot password
import {NextRequest} from "next/server";
import {userController} from "@/lib/controller/user.controller";

export async function POST(req: NextRequest) {
  return userController.sendEmail(req)
}

export async function PUT(req: NextRequest) {
  return userController.newPassword(req)
}
