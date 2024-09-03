// register
import { NextRequest } from "next/server";
import { forgetController } from "@/server/controller/forget.controller";

// valid otp
export async function POST(req : NextRequest) {
  return forgetController.validOtp(req)
}

// get otp
export async function GET(req : NextRequest) {
  return forgetController.getOtp(req)
}

//  generate
export async function PUT(req : NextRequest) {
  return forgetController.getAgain(req)
}
