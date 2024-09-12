// import 'server-only'
import jwt from "jsonwebtoken"
import { User } from "@prisma/client"
import prisma from "@/config/prisma"
import { createSession } from "@/server/service/auth/session.service";
import { decrypt, encrypt } from "@/server/service/auth/jose.service";

export type UserBaseToken = Pick<User, "id" | "email" | "name">

export type AccessTokenPayload = UserBaseToken & { idToken: string }

export type RefreshTokenPayload = { userId: string }


export class JwtService {
	private expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	
	constructor(
		private accessSecret: string = process.env.ACCESSTOKENSECRET ?? "access",
		private refreshSecret: string = process.env.REFRESHTOKENSECRET ?? "refresh",
		private accessExp: string = "1h",
		private refreshExp: string = "7d"
	) {
	}
	
	async verifyRefreshToken(token: string) {
		const data = await jwt.verify(token, this.refreshSecret)
		if (!data) {
			throw new Error("Token is not verified")
		}
		return data as RefreshTokenPayload
	}
	
	async createRefreshToken({ userId }: { userId: string }) {
		const token = jwt.sign(
			{ userId },
			this.refreshSecret,
			{ expiresIn: this.refreshExp })
		
		await createSession(token)
		// 3. Store the session in cookies for optimistic auth checks
		return prisma.session.upsert({
			where: {
				userId: userId
			},
			select: { id: true },
			update: {
				userId: userId,
				sessionToken: token,
			},
			create: {
				userId: userId,
				sessionToken: token,
			}
		})
		
	}
	
	async createAccessToken(data: AccessTokenPayload) {
		return encrypt(data)
	}
	
	async deleteRefreshToken(token: string,) {
		return prisma.session.delete({
			where: { sessionToken: token, }
		})
	}
	
	async verifyAccessToken(token: string | undefined) {
		return decrypt(token, true)
	}
	
}

export const jwtService = new JwtService()

export async function checkTokenMiddleware(token: string | undefined) {
	try {
		if (!token) {
			return false
		}
		// will return invalid not throw
		return jwt.decode(token, {
			json: false,
			complete: false
		});
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return error.message
		}
	}
}

export async function verifyTokenMiddleware(token: string | undefined) {
	try {
		if (!token) {
			return false
		}
		// will return invalid not throw
		return jwt.verify(token, process.env.ACCESSTOKENSECRET ?? '')
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return error.message
		}
	}
	
}