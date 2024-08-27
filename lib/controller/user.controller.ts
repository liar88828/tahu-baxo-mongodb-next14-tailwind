import { validPass } from './../validator/bcrypt'
import { RegisterUser } from '../validator/schema/user.schema'
import { LoginUser } from '../validator/schema/user.schema'
import { ServiceRequest } from './../utils/ServiceRequest'
import { UserSchema } from './../validator/schema/user.schema'
import { BcryptService } from '../service/bcrypt.service'
import { UserService } from '../service/user.service'
import { NextRequest } from 'next/server'

class UserController {
	constructor(
		private serviceUser: UserService,
		private serviceBcrypt: BcryptService,
		private serviceZod: UserSchema,
		private serviceRequest: ServiceRequest,
	) {}

	async register(req: NextRequest) {
		try {
			let { data } = await this.serviceRequest.getData<RegisterUser>(req)
			data = this.serviceZod.createValid(data)
			return this.serviceUser.register(data)
		} catch (e: unknown) {
			return e
		}
	}

	async findEmail(req: NextRequest) {
		try {
			let { id } = this.serviceRequest.getId<string>(req)
			const data = await this.serviceUser.findId(id)
			return data
		} catch (e: unknown) {
			return e
		}
	}

	async login(req: NextRequest) {
		try {
			let { data } = await this.serviceRequest.getData<LoginUser>(req)
			this.serviceUser.validPassword(data)
			const userDb = await this.serviceUser.findEmail(data.email)
			await this.serviceBcrypt.compare(data.password, userDb.password)
		} catch (e: unknown) {
			return e
		}
	}
}
export const userController = new UserController(
	new UserService(),
	new BcryptService(),
	new UserSchema(),
	new ServiceRequest(),
)
