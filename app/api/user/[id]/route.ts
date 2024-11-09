// login
import { NextRequest } from "next/server"
import { userController } from "@/server/controller/user.controller"
import type { Params } from "@/interface/server/param"

export async function GET(req: NextRequest, params: Params) {
  return userController.getUserId(req, params)
}
