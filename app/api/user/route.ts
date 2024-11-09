import { NextRequest } from "next/server";
import { userController } from "@/server/controller/user.controller";

export async function GET(request : NextRequest,) {
  return userController.getUserAll(request);
}
