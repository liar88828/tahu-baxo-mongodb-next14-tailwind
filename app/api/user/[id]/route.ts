// login
import { NextRequest } from "next/server";
import { authController } from "@/server/controller/auth.controller";
import { Params } from "@/interface/params";

export async function GET(req : NextRequest, params : Params) {
  console.log('test id user ')
  return authController.getUserId(req, params)
}
