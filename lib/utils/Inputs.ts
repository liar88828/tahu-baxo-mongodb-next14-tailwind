import { NextRequest } from "next/server"
import type { TMethod } from "@/interface/model/model"

export async function Inputs(request: NextRequest): Promise<{
	json?: any
	id?: string
	option?: string
	value: string
	pathname: string
	method: TMethod
  take: number
  page: number
}> {
	const url = new URL(request.url)
	const method = request.method as TMethod
	const pathname = url.pathname
	const searchParams = new URLSearchParams(url.search)
	const id = searchParams.get("id") as string
	const page = Number(searchParams.get("page"))
	const take = Number(searchParams.get("take"))
	const option = searchParams.get("option") as string
	const value = searchParams.get("value") as string
	
	if (["PATCH", "PUT", "POST", "DELETE"].includes(method)) {
    const json = await request.json()
		console.log(json)
    return { id, option, value, pathname, method, json, page, take }
  }
  return { id, option, value, pathname, method, page, take }
}
