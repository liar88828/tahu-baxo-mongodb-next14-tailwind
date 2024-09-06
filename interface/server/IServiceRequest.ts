import { NextRequest } from "next/server"

import { AccessTokenPayload } from "@/server/service/jwt.service"
import type { Params } from "./param"

export type GetId = {
	id: string
}
export type GetIdInt = {
	id: number
}
export type GetPage = {
	page: number
	take: number
}

export type GetData<T> = {
	data: T
}

export type GetUpdate<D, I> = {
	data: D
	id: I
}

export interface IServiceRequest {
	getId(params: Params): GetId
	
	getPage(request: NextRequest): GetPage
	
	getData<T>(request: NextRequest): Promise<GetData<T>>
	
	getUpdate<T>(
		request: NextRequest,
		params: Params
	): Promise<GetUpdate<T, string>>
	
	getUserPayload(req: NextRequest): Promise<AccessTokenPayload>
}
