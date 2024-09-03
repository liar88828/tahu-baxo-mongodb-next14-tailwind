// login
import { NextRequest } from "next/server";
import { authController } from "@/server/controller/auth.controller";
import { Params } from "@/interface/params";

export async function GET(req : NextRequest, params : Params) {
  return authController.getUserId(req, params)
}
