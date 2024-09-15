import type { ResponseRegister as ResponseAuthUser } from "../../interface/user/UserPublic"
import { bcryptService, type BcryptService } from "../service/auth/bcrypt.service"
import {
	AccessTokenPayload,
	jwtService,
	type JwtService,
	type RefreshTokenPayload,
	UserBaseToken,
} from "@/server/service/auth/jwt.service"
import { UserService } from "../service/user.service"
import { userSchema, type UserSchema, } from "./user.schema"
import { LoginUser, RegisterUser } from "@/interface/model/auth.type";
import prisma from "@/config/prisma";
import { ErrorAuth } from "@/lib/error/errorCustome";
import { deleteSession } from "@/server/service/auth/session.service";

export class AuthService extends UserService {
	constructor(
		protected valid: UserSchema,
		protected serviceBcrypt: BcryptService,
		private serviceJwt: JwtService
	) {
		super(valid, serviceBcrypt)
	}
	
	async token(user: UserBaseToken) {
		const refreshToken = await this.serviceJwt.createRefreshToken({ userId: user.id })
		const accessToken = await this.serviceJwt.createAccessToken({ idToken: refreshToken.id, ...user })
		return { refreshToken, accessToken }
	}
	
	async register(data: RegisterUser): Promise<ResponseAuthUser> {
		data = this.valid.registerValid(data)
		super.validPassword(data)
		await super.foundEmail(data)
		const { password, ...userDb } = await super.createUser(data)
		const { refreshToken, accessToken } = await this.token(userDb)
		
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
		console.log("---------- refresh token")
		const { refreshToken, accessToken } = await this.token(userDb)
		// send
		return {
			accessToken,
			refreshToken,
			data: userDb,
		}
	}
	
	async logout(token: string) {
		token = await deleteSession()
		// this.serviceJwt.verifyRefreshToken()
		
		await this.serviceJwt.deleteRefreshToken(token)
		// send
		return {
			accessToken: "",
			refreshToken: "",
			data: "success logout",
		}
	}
	
	async refresh(idRefreshToken: string) {
		const token = await prisma.session.findUnique({
			where: { id: idRefreshToken },
			include: {
				user: {
					select: {
						name: true,
						email: true,
						id: true
					}
				}
			}
		})
		if (!token || !token.sessionToken || !token?.user?.id) {
			throw new ErrorAuth("unauthorized", 'id / session / user token is not valid')
		}
		
		const data = await this.serviceJwt.verifyRefreshToken(token.sessionToken) as RefreshTokenPayload
		return this.token({
			id: token.user.id,
			email: token.user.email,
			name: token.user.name,
		})
		
	}
	
	async refreshByUserId(tokenCookie: string) {
		const refreshToken = await this.serviceJwt.verifyRefreshToken(tokenCookie)
		const token = await prisma.session.findUnique({
			where: { userId: refreshToken.userId },
			include: {
				user: {
					select: {
						name: true,
						email: true,
						id: true
					}
				}
			}
		})
		if (!token || !token.sessionToken || !token?.user?.id) {
			throw new ErrorAuth('unauthorized', 'id / session / user token is not valid')
		}
		
		const data = await this.serviceJwt.verifyRefreshToken(token.sessionToken) as RefreshTokenPayload
		return this.token({
			id: token.user.id,
			email: token.user.email,
			name: token.user.name,
		})
		
	}
	
	
	async findByToken(user: AccessTokenPayload) {
		const data = await prisma.user.findUnique({
			where: { id: user.id },
			select: {
				email: true,
				name: true,
				id: true,
				// password: true,
				image: true,
				// trolleyId: true
			},
		})
		if (!data) {
			throw new Error("Email is not found")
		}
		return data
	}
	
	async rotateTokenXXX(tokenCookie: string) {
		const refreshToken = await this.serviceJwt.verifyRefreshToken(tokenCookie)
		console.log(refreshToken, 'refresh')
		const sessionID = await prisma.session.findUnique({ where: { userId: refreshToken.userId } })
		console.log(sessionID)
		if (!sessionID) {
			throw new Error("Refresh token not found")
		}
		return this.serviceJwt.createRefreshToken({ userId: sessionID.id })
	}
	
}

export const authService = new AuthService(
	userSchema,
	bcryptService,
	jwtService
)
