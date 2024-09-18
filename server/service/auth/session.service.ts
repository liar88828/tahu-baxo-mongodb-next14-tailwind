import { getCookie } from "@/server/service/auth/cookie.service";
import { decryptMiddleware } from "@/server/service/auth/jose.service";
import { cookies } from "next/headers";
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
	const cookie = cookies().get('session')?.value
	if (!cookie) {
		throw new ErrorAuth('unauthorized', "cookie is not stored")
	}
	return cookie
}

export function deleteSession() {
	const cookie = cookies();
	cookie.delete('user')
	cookie.delete('access')
	cookie.delete('refresh')
}

export async function deleteSessionXXX() {
	const data = await getSession()
	cookies().delete('session')
	return data
}

export async function createSession(token: string) {
	const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
	return setSession(token, expiresAt)
}

async function getRefreshTokenUser() {
	
	const refresh = getCookie('refresh')
	console.log(refresh, 'refresh')
	if (!refresh) {
		throw false
	}
	
	// const resRefresh = await apiRefresh(refresh)
	// if (!resRefresh) {
	// 	throw false
	// }
	return true
	
}

export async function sessionMiddleware() {
	try {
		const access = cookies().get('access')?.value
		const token = await decryptMiddleware(access)
		// console.log(token, 'token -middleware')
		// if (!token) {
		// 	console.log('will get refresh token')
		// 	// return getRefreshTokenUser()
		// }
		return token
	} catch (e) {
		// console.error('sessionMiddleware-----')
		// console.log(e)
		
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

