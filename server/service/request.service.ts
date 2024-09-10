import { NextRequest } from "next/server"

import { z } from "zod"
import { AccessTokenPayload, jwtService } from "@/server/service/auth/jwt.service"
import type { Params } from "@/interface/server/param"
import { cookies } from "next/headers";
import { GetData, GetPage, GetUpdate, IServiceRequest, } from "@/interface/server/IServiceRequest"
import { ErrorAuth } from "@/lib/error/errorCustome";

export class RequestService implements IServiceRequest {
	getTokenCookie(req: NextRequest) {
		// const token = req.cookies.get("session")
		const token = cookies().get("session")
		if (!token?.value) {
			throw new ErrorAuth("Not have token in Cookie")
		}
		// console.log(token.value)
		
		return token.value
	}
	
	getTokenBearer(req: NextRequest) {
		const Bearer = req.headers.get("Authorization")
		if (!Bearer) {
			throw new Error("Not have token in Bearer")
		}
		return Bearer.split(" ")[1]
	}
	
	async getUpdate<D>(
		request: NextRequest,
		params: Params
	): Promise<GetUpdate<D, string>> {
		// console.log(params)
		return {
			data: await this.getData<D>(request).then((res) => res.data),
			id: this.getId(params).id,
		}
	}
	
	async getUpdateInt<D>(
		request: NextRequest,
		params: Params
	): Promise<GetUpdate<D, number>> {
		return {
			data: await this.getData<D>(request).then((res) => res.data),
			id: this.getIdInt(params).id,
		}
	}
	
	getId({ params }: Params): { id: string } {
		return { id: z.string().min(1).parse(params.id) }
	}
	
	getIdCuid({ params }: Params): { id: string } {
		return { id: z.string().cuid().parse(params.id) }
	}
	
	getIdInt({ params }: Params): { id: number } {
		return { id: z.number().min(1).parse(Number(params.id)) }
	}
	
	getIdIntEx({ params }: Params): { id: number } {
		return { id: Number(params.id) }
	}
	
	getPage(request: NextRequest): GetPage {
		const searchParams = request.nextUrl.searchParams
		let page = Number(searchParams.get("page") ?? 1)
		let take = Number(searchParams.get("take") ?? 100)
		let search = searchParams.get("search") ?? null
		search = search === 'undefined' ? null : search
		page = page < 0 ? 1 : page
		return {
			page,
			take,
			search
		}
	}
	
	getEmail(request: NextRequest): { email: string } {
		const searchParams = request.nextUrl.searchParams
		let email = searchParams.get("email")
		if (!email) {
			throw new Error("please add email, this email empty")
		}
		
		return { email }
	}
	
	async getData<T>(request: NextRequest): Promise<GetData<T>> {
		return {
			data: await request.json(),
		}
	}
	
	async getUserPayload(req: NextRequest) {
		const bearer = this.getTokenBearer(req)
		// console.log('bearer------')
		const user = await jwtService.verifyAccessToken(bearer)
		// console.log('user------',user)
		// console.log(bearer)
		return user as AccessTokenPayload
	}
}

export const requestService = new RequestService()
