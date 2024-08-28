// register
import {NextRequest} from "next/server";
import {userController} from "@/lib/controller/user.controller";

// valid otp
export async function POST(req: NextRequest) {
  return userController.validOtp(req)
}


// get otp
export async function GET(req: NextRequest) {
  return userController.getOtp(req)
}

//  generate
export async function PUT(req: NextRequest) {
  return userController.getAgain(req)
}
