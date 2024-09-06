import { trolleyService, TrolleyService, } from "@/server/service/trolley.service"
import { requestService, RequestService, } from "@/server/service/request.service"
import { NextRequest, NextResponse } from "next/server"
import { errorHanding } from "@/lib/error/errorHanding"
import { AccessTokenPayload } from "@/server/service/jwt.service"
import type { Params } from "@/interface/server/param"
import type { TrolleyCreate } from "@/interface/model/trolley.type"

export class TrolleyController {
	constructor(
		private serviceTrolley: TrolleyService,
		private serviceReq: RequestService
	) {
	}
	
	async getAll(req: NextRequest) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			// const {data} = await this.serviceReq.getData<TrolleyData>(req)
			return NextResponse.json(await this.serviceTrolley.getAll(user))
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async increment(req: NextRequest, params: Params) {
		try {
			const user: AccessTokenPayload = await this.serviceReq.getUserPayload(req)
			const { data } = await this.serviceReq.getData<TrolleyCreate>(req)
			const { id } = this.serviceReq.getIdIntEx(params)
			data.id = id
			data.userId = user.id
			const res = await this.serviceTrolley.increment(data, user)
			return NextResponse.json(res)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async decrement(req: NextRequest, params: Params) {
		try {
			const user: AccessTokenPayload = await this.serviceReq.getUserPayload(req)
			const { data } = await this.serviceReq.getData<TrolleyCreate>(req)
			const { id } = this.serviceReq.getIdInt(params)
			data.id = id
			data.userId = user.id
			const res = await this.serviceTrolley.decrement(data, user)
			return NextResponse.json(res)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async remove(req: NextRequest, params: Params) {
		try {
			const user = this.serviceReq.getUserPayload(req)
			const { id } = this.serviceReq.getIdInt(params)
			return NextResponse.json(
				this.serviceTrolley.remove({
					id: id,
				})
			)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
}

export const trolleyController = new TrolleyController(
	trolleyService,
	requestService
)
