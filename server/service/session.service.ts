import 'server-only'
import { cookies } from 'next/headers'
import { jwtService } from "@/server/service/jwt.service";
import { ErrorUser } from "@/lib/error/errorCustome";

export async function createSession(data: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	
	cookies().set('session', data, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	})
}

export async function updateSession() {
	const session = cookies().get('session')?.value
	const payload = jwtService.verifyAccessToken(session)
	
	if (!session || !payload) {
		throw new ErrorUser('unauthorized')
	}
	
	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	cookies().set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: 'lax',
		path: '/',
	})
}

export async function deleteSession() {
	cookies().delete('session')
}

export async function getSession() {
	const cookie = cookies().get('session')?.value
	if (!cookie) {
		throw new ErrorUser('unauthorized')
	}
	return cookie
}
