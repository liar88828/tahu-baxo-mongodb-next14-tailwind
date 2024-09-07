import { NextRequest } from "next/server";
import { trolleyController } from "@/server/controller/trolley.controller";

export async function GET(req : NextRequest,) {
  return trolleyController.getAllPublic(req)
}

export async function POST(req: NextRequest,) {
  return trolleyController.create(req)
}
