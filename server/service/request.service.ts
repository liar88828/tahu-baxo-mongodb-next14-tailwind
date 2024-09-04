import { NextRequest } from 'next/server'
import { GetData, GetPage, GetUpdate, IServiceRequest, } from '../../interface/IServiceRequest'

import { Params } from "@/interface/params";
import { z } from "zod";
import { AccessTokenPayload, jwtService, JwtService } from "@/server/service/jwt.service";

export class RequestService implements IServiceRequest {
	
	getTokenCookie(req: NextRequest) {
		const token = req.cookies.get('token')
		const test = req.cookies.getAll()
		console.log('--------')
		console.log(req.cookies)
		console.log(token)
		console.log(test)
		console.log('--------')
		if (!token) {
			throw new Error("Not have token in Cookie",)
		}
		return token.value
	}
	
	getTokenBearer(req: NextRequest) {
		const Bearer = req.headers.get('Authorization')
		if (!Bearer) {
			throw new Error("Not have token in Bearer",)
		}
		return Bearer.split(' ')[1]
	}
	
	async getUpdate<D, >(request: NextRequest, params: Params): Promise<GetUpdate<D, string>> {
		// console.log(params)
		return {
			data: await this.getData<D>(request).then((res) => res.data),
			id: this.getId(params).id,
		}
	}
	
	async getUpdateInt<D>(request: NextRequest, params: Params): Promise<GetUpdate<D, number>> {
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
	
	getPage(request: NextRequest): GetPage {
		const searchParams = request.nextUrl.searchParams
		let page = Number(searchParams.get('page') ?? 1)
		const take = Number(searchParams.get('take') ?? 100)
		page = page < 0 ? 1 : page
		return {
			page,
			take,
		}
	}
	
	getEmail(request: NextRequest): { email: string } {
		const searchParams = request.nextUrl.searchParams
		let email = searchParams.get('email')
		if (!email) {
			throw new Error("please add email, this email empty")
		}
		
		return { email }
	}
	
	async getData<T>(request: NextRequest): Promise<GetData<T>> {
		return {
			data: await request.json()
		}
	}
	
	async getUserPayload(req: NextRequest) {
		const bearer = this.getTokenBearer(req)
		const user = await jwtService.verifyAccessToken(bearer,)
		return user as AccessTokenPayload
	}
}

export const requestService = new RequestService()
