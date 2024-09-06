import { NextRequest } from "next/server"
import { trolleyController } from "@/server/controller/trolley.controller"
import type { Params } from "../../../../interface/server/param"

export async function POST(req: NextRequest, params: Params) {
  return trolleyController.increment(req, params)
}

export async function PUT(req: NextRequest, params: Params) {
  return trolleyController.decrement(req, params)
}

export async function DELETE(req: NextRequest, params: Params) {
  return trolleyController.remove(req, params)
}
