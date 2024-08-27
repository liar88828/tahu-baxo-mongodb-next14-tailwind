import {NextRequest} from 'next/server'

import {Params} from "@/interface/params";

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

export type GetData<T > = {
	data: T
}

export type GetUpdate<D> = {
  data: D
  id: string
}
export interface IServiceRequest {
  getId(params: Params): GetId
	getPage(request: NextRequest): GetPage

  getData<T>(request: NextRequest): Promise<GetData<T>>

  getUpdate<T, U>(request: NextRequest, params: Params): Promise<GetUpdate<T, U>>
}
