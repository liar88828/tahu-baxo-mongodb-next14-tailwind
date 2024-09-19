import { decryptMiddleware } from "@/server/service/auth/jose.service";
import { ErrorAuth } from "@/lib/error/errorCustome";
import prisma from "@/config/prisma";
import { apiRefresh } from "@/server/api/auth.api";
import { getAccess, getRefresh } from "@/server/service/auth/cookie/cookie.service";

export async function setRefresh() {
	const refresh = await getRefresh()
	return apiRefresh(refresh)
}



export async function sessionMiddleware() {
	try {
		const access = getAccess()
		return await decryptMiddleware(access)
	} catch (e) {
		if (e instanceof ErrorAuth) {
			if (e.message === 'ERR_JWT_EXPIRED') {
				const res = await setRefresh()
				console.log(res, 'response refresh token ')
			}
		}
		return false
	}
}

export async function findSessionByUserId(userId: string) {
	const sessionDB = await prisma.session.findUnique({ where: { userId } })
	if (!sessionDB) {
		throw new ErrorAuth('unauthorized', 'session db is not found')
	}
	return sessionDB
}

