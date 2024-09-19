// import 'server-only'
import { jwtVerify, SignJWT } from "jose";
import { AccessTokenPayload } from "@/server/service/auth/jwt.service";
import { ErrorAuth } from "@/lib/error/errorCustome";

const secretKey = process.env.ACCESSTOKENSECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: AccessTokenPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1h')
		.sign(encodedKey)
}

export async function decrypt(session: string | undefined = '', _throw: boolean = false) {
	try {
		const payload = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		})
		return payload
	} catch (error) {
		return error
	}
}

export async function decryptAPI(session: string | undefined = '') {
	try {
		const payload = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
			
		})
		// console.log(payload, 'error')
		return payload.payload
	} catch (error) {
		// @ts-ignore
		if (error.code === 'ERR_JWT_EXPIRED') {
			console.error('ERR_JWT_EXPIRED')
			throw new ErrorAuth("unauthorized", 'Token is Expired')
		}
		// @ts-ignore
		if (error.code === 'ERR_JWS_INVALID') {
			console.error('ERR_JWS_INVALID')
			throw new ErrorAuth("unauthorized", 'Token is Invalid')
		}
	}
}

export async function decryptMiddleware(session: string | undefined = '', _throw: boolean = false) {
	if (!session) {
		throw null
	}
	try {
		return await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		})
	} catch (error) {
		
		// @ts-ignore
		if (error.code === 'ERR_JWT_EXPIRED') {
			// console.log('ERR_JWT_EXPIRED---test')
			throw new ErrorAuth('unauthorized', 'ERR_JWT_EXPIRED')
		}
		// console.error(error, ' is decryptMiddleware error')
		
		throw error
	}
}