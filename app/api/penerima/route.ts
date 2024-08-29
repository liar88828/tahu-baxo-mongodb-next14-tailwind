import {NextRequest} from 'next/server'
import {penerimaController} from "@/lib/controller/penerima.controller";

export async function GET(request: NextRequest) {
  return penerimaController.findAll(request)

}

export async function POST(request: NextRequest) {
  return penerimaController.createOne(request)
}
