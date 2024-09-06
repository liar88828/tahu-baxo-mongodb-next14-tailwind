import type { ResponseRegister as ResponseAuthUser } from "../../interface/user/UserPublic"
import { bcryptService, type BcryptService } from "../service/bcrypt.service"
import { jwtService, type JwtService, type RefreshTokenPayload, } from "../service/jwt.service"
import { createSession } from "../service/session.service"
import { UserService } from "../service/user.service"
import { userSchema, type UserSchema, } from "./user.schema"
import { LoginUser, RegisterUser } from "@/interface/model/auth.type";

export class AuthService extends UserService {
	constructor(
		protected valid: UserSchema,
		protected serviceBcrypt: BcryptService,
		private serviceJwt: JwtService
	) {
		super(valid, serviceBcrypt)
	}
	
	async register(data: RegisterUser): Promise<ResponseAuthUser> {
		data = this.valid.registerValid(data)
		
		super.validPassword(data)
		await super.foundEmail(data)
		// hash
		// token
		const { password, ...userDb } = await super.createUser(data)
		const refreshToken = await this.serviceJwt.createRefreshToken({
			userId: userDb.id,
		})
		// console.log('-------- refresh token ---register')
		const accessToken = await this.serviceJwt.createAccessToken({
			idToken: refreshToken.id,
			...userDb,
		})
		// console.log('-------- access token ---register')
		return {
			accessToken,
			refreshToken,
			data: userDb,
		}
	}
	
	async login(data: LoginUser): Promise<ResponseAuthUser> {
		data = this.valid.loginValid(data)
		const { password, ...userDb } = await super.findEmail(data)
		// token
		const refreshToken = await this.serviceJwt.createRefreshToken({
			userId: userDb.id,
		})
		console.log("---------- refresh token")
		const accessToken = await this.serviceJwt.createAccessToken({
			...userDb,
			idToken: refreshToken.id,
		})
		console.log("---------- access token")
		// send
		await createSession(accessToken)
		return {
			accessToken,
			refreshToken,
			data: userDb,
		}
	}
	
	async logout(token: string) {
		// valid
		const refreshPayload = this.serviceJwt.jwtPayload(
			token
		) as RefreshTokenPayload
		const data = await this.serviceJwt.deleteRefreshToken(refreshPayload.email)
		// send
		return {
			accessToken: "",
			refreshToken: "",
			data: "success logout",
		}
	}
	
	async refreshToken(token: string) {
		const refreshToken = this.serviceJwt.jwtPayload(
			token
		) as RefreshTokenPayload
		return refreshToken
	}
}

export const authService = new AuthService(
	userSchema,
	bcryptService,
	jwtService
)
