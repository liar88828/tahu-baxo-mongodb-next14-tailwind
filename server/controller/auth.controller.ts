import { LoginUser, RegisterUser } from '@/server/schema/user.schema'
import { RequestService } from '@/server/service/request.service'
import { userService, UserService } from '@/server/service/user.service'
import { NextRequest } from 'next/server'
import { errorHanding } from "@/lib/error/errorHanding";
import { JwtService, RefreshTokenPayload } from "@/server/service/jwt.service";
import { UserController } from "@/server/controller/user.controller";
import { createSession } from "@/server/service/session.service";
import { ResponseRegister } from "@/interface/user/UserPublic";


class AuthController extends UserController {
	constructor(
		protected serviceUser: UserService,
		protected serviceRequest: RequestService,
		private serviceJwt: JwtService
	) {
		super(
			serviceUser,
			serviceRequest,
		)
	}

// auth
	async register(req: NextRequest) {
		try {
			// validation
			let { data } = await this.serviceRequest.getData<RegisterUser>(req)
			this.serviceUser.validPassword(data)
			await this.serviceUser.foundEmail(data)
			// hash
			// token
			const { password, ...userDb } = await this.serviceUser.register(data,)
			const refreshToken = await this.serviceJwt.createRefreshToken({ userId: userDb.id })
			// console.log('-------- refresh token ---register')
			const accessToken = await this.serviceJwt.createAccessToken({ idToken: refreshToken.id, ...userDb, })
			// console.log('-------- access token ---register')
			
			const sendData: ResponseRegister = {
				accessToken,
				refreshToken,
				data: userDb
			}
			return Response.json(sendData)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async login(req: NextRequest) {
		try {
			// valid
			let { data } = await this.serviceRequest.getData<LoginUser>(req)
			const { password, ...userDb } = await this.serviceUser.findEmail(data)
			// token
			const refreshToken = await this.serviceJwt.createRefreshToken({ userId: userDb.id })
			console.log('---------- refresh token')
			const accessToken = await this.serviceJwt.createAccessToken({ ...userDb, idToken: refreshToken.id })
			console.log('---------- access token')
			// send
			await createSession(accessToken)
			return Response.json({
					accessToken,
					refreshToken,
					data: userDb
				}
			)
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
			// valid
			const token = this.serviceRequest.getTokenCookie(req)
			const refreshPayload = this.serviceJwt.jwtPayload(token) as RefreshTokenPayload
			await this.serviceJwt.deleteRefreshToken(refreshPayload.email)
			// send
			return Response.json("success logout",)
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
			const refreshToken = this.serviceJwt.jwtPayload(token) as RefreshTokenPayload
			
			return Response.json('test',)
		} catch (e) {
			return errorHanding(e)
		}
	}
	
}

export const authController = new AuthController(
	userService,
	new RequestService(),
	new JwtService()
)
