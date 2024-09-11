import { requestService, RequestService, } from "@/server/service/request.service"
import { NextRequest, NextResponse } from "next/server"
import { errorHanding } from "@/lib/error/errorHanding"
import { authService, type AuthService } from "../schema/auth.service"
import { LoginUser, RegisterUser } from "@/interface/model/auth.type";
import { Params } from "@/interface/server/param";

class AuthController {
	constructor(
		// protected serviceUser: UserService,
		protected serviceRequest: RequestService,
		protected serviceAuth: AuthService
	) {
	}
	
	// auth
	async register(req: NextRequest) {
		try {
			// validation
			let { data } = await this.serviceRequest.getData<RegisterUser>(req)
			const sendData = await this.serviceAuth.register(data)
			return Response.json(sendData)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async login(req: NextRequest) {
		try {
			// valid
			let { data } = await this.serviceRequest.getData<LoginUser>(req)
			// console.log(data,'data login')
			const sendData = await this.serviceAuth.login(data)
			return Response.json(sendData)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async logout(req: NextRequest) {
		try {
			
			const token = this.serviceRequest.getTokenCookie(req)
			// console.log(token)
			const sendData = await this.serviceAuth.logout(token)
			return Response.json(sendData)
		} catch (e) {
			return errorHanding(e)
		}
	}
	
	async refresh(_: NextRequest, params: Params) {
		try {
			const { id } = this.serviceRequest.getIdCuid(params)
			return NextResponse.json(await this.serviceAuth.refresh(id))
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async rotateToken(req: NextRequest) {
		
		try {
			const tokenCookie = this.serviceRequest.getTokenCookie(req)
			const data = await this.serviceAuth.refreshByUserId(tokenCookie)
			return NextResponse.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async getUserByToken(req: NextRequest) {
		try {
			const user = await this.serviceRequest.getUserPayload(req)
			return NextResponse.json(await this.serviceAuth.findByToken(user))
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
}

export const authController = new AuthController(requestService, authService)
