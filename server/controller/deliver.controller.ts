import { NextRequest, NextResponse } from 'next/server'
import { deliveryService, ServiceDeliver } from '@/server/service/delivery.service'
import { IController } from '@/interface/IController'
import { requestService, RequestService } from '@/server/service/request.service'
import { errorHanding } from "@/lib/error/errorHanding";
import { Params } from "@/interface/params";
import { DeliveryCreate, DeliveryUpdate } from "@/interface/delivery";

class DeliverController implements IController {
	constructor(
		private serviceDeliver: ServiceDeliver,
		private serviceReq: RequestService,
	) {
	}
	
	async findAll(req: NextRequest) {
		try {
			const { page, take } = this.serviceReq.getPage(req)
			let data = await this.serviceDeliver.findAll(page, take)
			return NextResponse.json(data, { status: 200 })
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async findId(req: NextRequest, params: Params) {
		try {
			let { id } = this.serviceReq.getIdInt(params)
			const data = await this.serviceDeliver.findIdPublic({ id_delivery: id })
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async findIdPrivate(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getIdInt(params)
			const data = await this.serviceDeliver.findIdPrivate({
				id_delivery: id, id_user: user.id
			})
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async createOne(req: NextRequest) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { data } = await this.serviceReq.getData<DeliveryCreate>(req)
			data.userId = user.id
			data = await this.serviceDeliver.createOne(data)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async updateOne(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { data, id } = await this.serviceReq.getUpdateInt<DeliveryUpdate>(req, params)
			data = await this.serviceDeliver.updateOne(data, {
				id_delivery: id,
				id_user: user.id
			})
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async deleteOne(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getIdInt(params)
			const data = await this.serviceDeliver.deleteOne({
				id_delivery: id,
				id_user: user.id
			})
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
}

export const deliveryController = new DeliverController(
	deliveryService,
	requestService,
)
