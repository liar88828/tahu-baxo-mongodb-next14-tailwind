import jwt from 'jsonwebtoken'
import { User } from "@prisma/client";
import { ErrorUser } from "@/lib/error/errorCustome";
import prisma from "@/config/prisma";
import { Session } from ".prisma/client";
import { cookies } from "next/headers";

// type PayloadToken = {
//   email : string,
//   name : string,
//   id : string,
//   trolleyId : string,
// };
export type AccessTokenPayload = Pick<User, 'id' | 'email' | 'name' | 'trolleyId'> & { idToken: string }
export type RefreshTokenPayload = Omit<AccessTokenPayload, 'id' | 'trolleyId'>

export class JwtService {
	constructor(
		private accessSecret: string = process.env.ACCESSTOKENSECRET ?? "access",
		private refreshSecret: string = process.env.REFRESHTOKENSECRET ?? "refresh",
		private accessExp: string = '1h',
		private refreshExp: string = '7d',
	) {
	}
	
	private expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	
	static jwtPayloadStatic(token: string,
													// willThrow : boolean = true
	) {
		const data = jwt.decode(
			token,
			{ json: true })
		if (!data) {
			throw new Error("Token is not verified")
		}
		return data
	}
	
	verifyRefresh(token: string) {
		const data = jwt.verify(token, this.refreshSecret,)
		if (!data) {
			throw new Error("Token is not verified")
		}
		return data
	}
	
	async createRefreshToken({ userId }: Pick<Session, 'userId'>) {
		
		const token = await jwt.sign({ userId },
			this.refreshSecret,
			{ expiresIn: this.refreshExp }
		)
		const findToken = await prisma.session.findFirst({
			where: {
				userId: userId
			}
		})
		if (!findToken?.sessionToken) {
			return prisma.session.create({
				select: { id: true },
				data: {
					userId: userId,
					sessionToken: token,
					expires: this.expiresAt,
				}
			})
		} else {
			return prisma.session.update({
				where: {
					userId: userId,
					id: findToken.id
				},
				select: { id: true },
				data: {
					sessionToken: token,
					expires: this.expiresAt,
				}
			})
		}
	}
	
	async createAccessToken(data: AccessTokenPayload) {
		const token = await jwt.sign(data,
			this.accessSecret,
			{ expiresIn: this.accessExp }
		)
		// 3. Store the session in cookies for optimistic auth checks
		cookies().set('session', token, {
			httpOnly: true,
			secure: true,
			expires: this.expiresAt,
			sameSite: 'lax',
			path: '/',
		})
		return token
	}
	
	async deleteRefreshToken(idUser: string,) {
		cookies().delete('session')
		return prisma.session.update({
			where: {
				userId: idUser,
				id: idUser,
			},
			data: {
				sessionToken: '',
			},
		})
	}
	
	async verifySessionToken(): Promise<jwt.JwtPayload> {
		const cookie = cookies().get('session')?.value
		
		if (!cookie) {
			throw new ErrorUser('unauthorized')
		}
		// will return invalid not throw
		const data = await jwt.verify(
			cookie,
			this.accessSecret
		)
		if (!data || typeof data === 'string') {
			throw new ErrorUser("unauthorized")
		}
		return data
	}
	
	async verifyAccessToken(token: string | undefined): Promise<jwt.JwtPayload> {
		if (!token) {
			throw new ErrorUser('unauthorized')
		}
		// will return invalid not throw
		const data = await jwt.verify(token, this.accessSecret)
		if (!data || typeof data === 'string') {
			throw new ErrorUser("unauthorized")
		}
		return data as AccessTokenPayload
	}
	
	jwtPayload(token: string, willThrow: boolean = true) {
		return JwtService.jwtPayloadStatic(token,)
	}
	
}

export const jwtService = new JwtService()
