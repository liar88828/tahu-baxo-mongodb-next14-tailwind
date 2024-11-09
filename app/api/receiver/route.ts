import { NextRequest } from 'next/server'
import { receiverController } from "@/server/controller/receiver.controller";

export async function GET(request: NextRequest) {
	return receiverController.findAll(request)
	
}

export async function POST(request: NextRequest) {
	return receiverController.createOne(request)
}
