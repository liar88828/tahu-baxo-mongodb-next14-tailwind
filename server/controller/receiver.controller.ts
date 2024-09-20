import { NextRequest, NextResponse } from "next/server"
import { errorHanding } from "@/lib/error/errorHanding"
import { requestService, RequestService, } from "@/server/service/request.service"
import { IController } from "@/interface/server/IController"
import type { Params } from "@/interface/server/param"
import { ReceiverCreate } from "@/interface/model/receiver.type";
import { receiverService, ReceiverService } from "@/server/service/receiver.service";

export class ReceiverController implements IController {
	constructor(
		private serviceReq: RequestService,
		private serviceReceiver: ReceiverService
	) {
	}
	
	async findAll(req: NextRequest) {
		try {
			const { page, take } = this.serviceReq.getPage(req)
			let data = await this.serviceReceiver.findAll(page, take)
			return NextResponse.json(data, { status: 200 })
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async findAllPrivate(req: NextRequest) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			const { page, take } = this.serviceReq.getPage(req)
			let data = await this.serviceReceiver.findAll(page, take)
			return NextResponse.json(data, { status: 200 })
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async findId(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getIdInt(params)
			const data = await this.serviceReceiver.findOne({
				id_user: user.id,
				id_receiver: id
			})
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async findIdPrivate(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getIdInt(params)
			const data = await this.serviceReceiver.findOne({
				id_receiver: id,
				id_user: user.id
			})
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async createOne(req: NextRequest) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { data } = await this.serviceReq.getData<ReceiverCreate>(req)
			data = await this.serviceReceiver.createOne(data, user)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async updateOne(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { data, id } = await this.serviceReq.getUpdateInt<ReceiverCreate>(
				req,
				params
			)
			data = await this.serviceReceiver.updateOne({
				id_receiver: id,
				id_user: user.id
			}, data,)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async deleteOne(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getIdInt(params)
			const data = await this.serviceReceiver.deleteOne(id, user)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
}

export const receiverController = new ReceiverController(
	requestService,
	receiverService
)
