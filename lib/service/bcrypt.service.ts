import bcrypt from 'bcrypt'
export class BcryptService {
	encrypt(): string {
		return ''
	}
	async decrypt(hash: String) {
		return ''
	}
	async compare(passReq: string, passDb?: string|null) {
		if (!passDb) {
			throw new Error("Password is not found")
		}
		const passValid = await bcrypt.compare(passReq, passDb)
		if (!passValid) {
			throw new Error('Password is Not Valid')
		}
	}
}
