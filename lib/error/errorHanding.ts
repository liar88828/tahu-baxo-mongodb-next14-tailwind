import { z } from 'Zod'
import { Prisma } from '@prisma/client'
import { ErrorAuth, ErrorProduct, ErrorTrolley, ErrorUser } from "@/lib/error/errorCustome";
import { ErrorStatus, errorStatus } from "@/lib/error/errorStatus";
import { errorPrisma } from "@/lib/error/errorPrisma";

const DataNotFound = (
	msg: string,
	code: ErrorStatus,
	from: string) => {
	if (msg === code)
		return Response.json(`Data ${ from } is Not found`, { status: Number(errorStatus.notFound) })
}

export function errorHanding(e: unknown): Response {
	if (e instanceof ErrorTrolley) {
		console.error(`hello error trolley : ${ e.message }`)
		const code = Number(e.message)
		if (code === errorStatus.notFound) {
			return Response.json(`Data Trolley is Not found`, { status: code })
		}
		if (code === errorStatus.conflict) {
			return Response.json(`Data Trolley is so maximum to add. please delete another trolley item for expand `, { status: code })
		}
		return Response.json(`Error Api Trolley `, { status: errorStatus.serviceUnavailable })
	}
	
	if (e instanceof ErrorProduct) {
		const code = Number(e.message)
		if (code == errorStatus.notFound) {
			return Response.json(`Data Product is Not found`, { status: code })
		}
		return Response.json(`Error Api Product`, { status: errorStatus.serviceUnavailable })
	}
	
	if (e instanceof ErrorUser) {
		const code = Number(e.message)
		if (code == errorStatus.notFound) {
			return Response.json(`Data User is Not found`, { status: code })
		}
		return Response.json(`Error Api Product`, { status: errorStatus.serviceUnavailable })
	}
	
	if (e instanceof z.ZodError) {
		return Response.json(e.issues,
			{ status: 400 })
	}
	
	if (e instanceof Prisma.PrismaClientKnownRequestError) {
		return errorPrisma(e.code)
	}
	
	if (e instanceof ErrorAuth) {
		return Response.json(e.message, { status: 400 })
	}
	
	if (e instanceof Error) {
		return Response.json(e.message, { status: 400 })
	}
	console.error(e)
	
	return Response.json("Server is Error", { status: errorStatus.internalServerError })
}
