// forgot password
import { NextRequest } from "next/server";
import { forgetController } from "@/server/controller/forget.controller";

export async function POST(req : NextRequest) {
  return forgetController.sendEmail(req)
}

export async function PUT(req : NextRequest) {
  return forgetController.newPassword(req)
}
