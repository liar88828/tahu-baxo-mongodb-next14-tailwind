import { NextRequest } from "next/server"
import { penerimaController } from "@/server/controller/penerima.controller"
import type { Params } from "../../../../interface/server/param"

export async function GET(request: NextRequest, params: Params) {
  return penerimaController.findId(request, params)
}

export async function PUT(request: NextRequest, params: Params) {
  return penerimaController.updateOne(request, params)
}

export async function DELETE(request: NextRequest, params: Params) {
  return penerimaController.deleteOne(request, params)
}
