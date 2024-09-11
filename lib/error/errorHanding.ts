import { z } from 'Zod'
import { Prisma } from '@prisma/client'
import { ErrorAuth, ErrorProduct, ErrorTrolley, ErrorUser } from "@/lib/error/errorCustome";
import { ErrorStatus, errorStatus } from "@/lib/error/errorStatus";
import { prismaError } from "@/lib/error/errorModel/prismaError";
import { productError } from "@/lib/error/errorModel/productError";
import { userError } from "@/lib/error/errorModel/userError";
import { trolleyError } from "@/lib/error/errorModel/trolleyError";
import { authError } from "@/lib/error/errorModel/authError";

export function errorHanding(e: unknown): Response {
	if (e instanceof ErrorAuth) {
		return authError(e)
	}
	if (e instanceof ErrorTrolley) {
		return trolleyError(e)
	}
	
	if (e instanceof ErrorProduct) {
		return productError(e)
	}
	
	if (e instanceof ErrorUser) {
		return userError(e)
	}
	

	if (e instanceof z.ZodError) {
		return Response.json(e.issues, { status: 400 })
	}
	if (e instanceof Prisma.PrismaClientKnownRequestError) {
		return prismaError(e.code)
	}
	
	if (e instanceof Error) {
		return Response.json(e.message, { status: 400 })
	}
	console.error(e)
	
	return Response.json("Server is Error", { status: errorStatus.internalServerError })
}

const DataNotFound = (
	msg: string,
	code: ErrorStatus,
	from: string) => {
	if (msg === code)
		return Response.json(`Data ${ from } is Not found`, { status: Number(errorStatus.notFound) })
}