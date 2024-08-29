import {NextRequest} from 'next/server'
import {Params} from "@/interface/params";
import {penerimaController} from "@/lib/controller/penerima.controller";

export async function GET(request: NextRequest, params: Params) {
  return penerimaController.findId(request, params)
}

export async function PUT(request: NextRequest, params: Params) {
  return penerimaController.updateOne(request, params)
}

export async function DELETE(request: NextRequest, params: Params) {
  return penerimaController.deleteOne(request, params)
}
