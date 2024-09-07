import { requestService, RequestService, } from "@/server/service/request.service"
import { NextRequest } from "next/server"
import { errorHanding } from "@/lib/error/errorHanding"
import { authService, type AuthService } from "../schema/auth.service"
import { LoginUser, RegisterUser } from "@/interface/model/auth.type";

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
			const sendData = await this.serviceAuth.login(data)
			return Response.json(sendData)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async logout(req: NextRequest) {
		try {
			// const token = req.cookies.get('token')
			// if (!token) {
			//   return Response.json("user has logout", {status: 204})
			// }
			const token = this.serviceRequest.getTokenCookie(req)
			const sendData = await this.serviceAuth.logout(token)
			return Response.json(sendData)
		} catch (e) {
			return errorHanding(e)
		}
	}
	
	async refreshToken(req: NextRequest) {
		try {
			// valid
			const token = this.serviceRequest.getTokenCookie(req)
			// const refreshToken = this.serviceJwt.verifyRefresh(token)
			//
			this.serviceAuth.refreshToken(token)
			return Response.json("test")
		} catch (e) {
			return errorHanding(e)
		}
	}
}

export const authController = new AuthController(requestService, authService)
