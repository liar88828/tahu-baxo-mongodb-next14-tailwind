import { cookies } from 'next/headers'
import { ErrorAuth } from "@/lib/error/errorCustome";
import prisma from "@/config/prisma";

export async function setSession(token: string, expires: Date) {
	return cookies().set('session', token, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: 'lax',
		path: '/',
	})
}

export async function getSession() {
	console.log()
	const cookie = cookies().get('session')?.value
	if (!cookie) {
		throw new ErrorAuth('unauthorized', "cookie is not stored")
	}
	return cookie
}

export async function deleteSession() {
	const data = await getSession()
	cookies().delete('session')
	return data
}

export async function createSession(token: string) {
	const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
	return setSession(token, expiresAt)
}

// export async function updateSession(token) {
// 	const session = cookies().get('session')?.value
// 	console.log("session")
// 	if (!session) {
// 		throw new ErrorAuth('Session is not store')
// 	}
// 	console.log("payload")
// 	const payload = await jwtService.verifyRefreshToken(session)
// 	if (!payload) {
// 		throw new ErrorAuth('token is not valid')
// 	}
//
// 	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
// 	const sessionDB = await findSessionByUserId(payload.userId)
//
// 	// return setSession(sessionDB?.sessionToken, expiresAt)
// }

export async function findSessionByUserId(userId: string) {
	const sessionDB = await prisma.session.findUnique({ where: { userId } })
	if (!sessionDB) {
		throw new ErrorAuth('unauthorized', 'session db is not found')
	}
	return sessionDB
}

