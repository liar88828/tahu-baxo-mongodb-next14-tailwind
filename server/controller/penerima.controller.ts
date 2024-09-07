import { penerimaService, PenerimaService, } from "@/server/service/penerima.service"
import { NextRequest, NextResponse } from "next/server"
import { errorHanding } from "@/lib/error/errorHanding"
import { requestService, RequestService, } from "@/server/service/request.service"
import { IController } from "@/interface/server/IController"
import type { Params } from "@/interface/server/param"
import type { PenerimaCreate } from "@/interface/model/penerima.type"

export class PenerimaController implements IController {
	constructor(
		private serviceReq: RequestService,
		private servicePenerima: PenerimaService
	) {
	}
	
	async findAll(req: NextRequest) {
		try {
			const { page, take } = this.serviceReq.getPage(req)
			let data = await this.servicePenerima.findAll(page, take)
			return NextResponse.json(data, { status: 200 })
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async findAllPrivate(req: NextRequest) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			const { page, take } = this.serviceReq.getPage(req)
			let data = await this.servicePenerima.findAll(page, take)
			return NextResponse.json(data, { status: 200 })
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async findId(req: NextRequest, params: Params) {
		try {
			let { id } = this.serviceReq.getIdInt(params)
			const data = await this.servicePenerima.findOne(id)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async findIdPrivate(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getIdInt(params)
			const data = await this.servicePenerima.findOne(id)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async createOne(req: NextRequest) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { data } = await this.serviceReq.getData<PenerimaCreate>(req)
			data = await this.servicePenerima.createOne(data, user)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async updateOne(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { data, id } = await this.serviceReq.getUpdateInt<PenerimaCreate>(
				req,
				params
			)
			data = await this.servicePenerima.updateOne(data, id)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async deleteOne(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getIdInt(params)
			const data = await this.servicePenerima.deleteOne(id, user)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
}

export const penerimaController = new PenerimaController(
	requestService,
	penerimaService
)
