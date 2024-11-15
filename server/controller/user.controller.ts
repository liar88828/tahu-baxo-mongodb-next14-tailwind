import { requestService, RequestService } from '@/server/service/request.service'
import { userService, UserService } from '@/server/service/user.service'
import { NextRequest, NextResponse } from 'next/server'
import { errorHanding } from "@/lib/error/errorHanding";
import { Params } from "@/interface/server/param";

export class UserController {
	constructor(
		protected serviceUser: UserService,
		protected serviceRequest: Pick<RequestService, "getIdCuid" | 'getTokenBearer'>
	) {
	}
	
	async getUserId(_: NextRequest, params: Params) {
		try {
			const { id } = this.serviceRequest.getIdCuid(params)
			return NextResponse.json(await this.serviceUser.findId({ id_user: id }))
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async getUserAll(_: NextRequest) {
		try {
			return NextResponse.json(await this.serviceUser.findAll())
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
}

export const userController = new UserController(
	userService,
	requestService,
)
