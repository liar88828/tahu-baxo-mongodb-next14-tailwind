// import 'server-only'
import { jwtVerify, SignJWT } from "jose";
import { AccessTokenPayload } from "@/server/service/auth/jwt.service";

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
	// console.log(session,'decrypt')
	// try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		})
	if (_throw) {
		if (!payload) {
			throw new Error('jwt malformed')
		}
	}
		// console.log(payload,'payload')
		return payload
	// } catch (error) {
	// 	console.log('Failed to verify session')
	//
	// 	return error
	// }
}