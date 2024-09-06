import bcrypt, { hash } from 'bcrypt'

export class BcryptService {
	
	async hashPassword(data: { password: string }) {
    return hash(data.password, 12);
  }
	
	encrypt(): string {
    throw new Error("not implemented")
  }
	
	async decrypt(hash: String) {
    throw new Error("not implemented")
		
	}
	
	async comparePassword(passReq: string, passDb?: string | null) {
    if (!passDb) {
      throw new Error("Password is not found")
    }
    const passValid = await bcrypt.compare(passReq, passDb)
    if (!passValid) {
      throw new Error('Password is Not Valid')
    }
  }
}

export const bcryptService = new BcryptService()
