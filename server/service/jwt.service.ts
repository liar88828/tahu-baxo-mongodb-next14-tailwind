import jwt from "jsonwebtoken"
import { User } from "@prisma/client"
import { ErrorUser } from "@/lib/error/errorCustome"
import prisma from "@/config/prisma"
import { cookies } from "next/headers"
import { createSession } from "@/server/service/session.service";

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
	
	static jwtPayloadStatic(
		token: string
		// willThrow : boolean = true
	) {
		const data = jwt.decode(token, { json: true })
		if (!data) {
			throw new Error("Token is not verified")
		}
		return data
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
		return jwt.sign(data, this.accessSecret, {
			expiresIn: this.accessExp,
		})
	}
	
	async deleteRefreshToken(token: string,) {
		return prisma.session.delete({
			where: { sessionToken: token, }
		})
	}
	
	async verifySessionToken(): Promise<jwt.JwtPayload> {
		const cookie = cookies().get("session")?.value
		
		if (!cookie) {
			throw new ErrorUser("unauthorized")
		}
		// will return invalid not throw
		const data = await jwt.verify(cookie, this.accessSecret)
		if (!data || typeof data === "string") {
			throw new ErrorUser("unauthorized")
		}
		return data
	}
	
	async checkToken(token: string | undefined) {
		if (!token) {
			throw false
		}
		// will return invalid not throw
		const data = await jwt.verify(token, this.accessSecret)
		if (!data || typeof data === "string") {
			throw false
		}
		return true
	}
	
	async verifyAccessToken(token: string | undefined) {
		if (!token) {
			throw new Error("unauthorized not have access token")
		}
		// will return invalid not throw
		const data = jwt.verify(token, this.accessSecret)
		if (!data || typeof data === "string") {
			throw new ErrorUser("unauthorized")
		}
		return data as AccessTokenPayload
	}
	
	jwtPayload(token: string, willThrow: boolean = true) {
		return JwtService.jwtPayloadStatic(token)
	}
	
}

export const jwtService = new JwtService()
