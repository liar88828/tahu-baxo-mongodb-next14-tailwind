import { NextRequest } from "next/server";
import { trolleyController } from "@/server/controller/trolley.controller";
import { Params } from "@/interface/params";

export async function POST(req : NextRequest, params : Params) {
  return trolleyController.add(req, params)
}

export async function DELETE(req : NextRequest, params : Params) {
  return trolleyController.remove(req, params)
}
