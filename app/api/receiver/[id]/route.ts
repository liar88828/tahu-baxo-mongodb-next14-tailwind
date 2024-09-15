import { NextRequest } from "next/server"
import { receiverController } from "@/server/controller/receiver.controller"
import type { Params } from "../../../../interface/server/param"

export async function GET(request: NextRequest, params: Params) {
	return receiverController.findId(request, params)
}

export async function PUT(request: NextRequest, params: Params) {
	return receiverController.updateOne(request, params)
}

export async function DELETE(request: NextRequest, params: Params) {
	return receiverController.deleteOne(request, params)
}
