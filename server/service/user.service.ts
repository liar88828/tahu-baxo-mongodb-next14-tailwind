import { userSchema, UserSchema, } from "@/server/schema/user.schema"
import prisma from "../../config/prisma"
import { bcryptService, BcryptService } from "@/server/service/auth/bcrypt.service"
import { UserId, UserPublic } from "@/interface/user/UserPublic"
import { ErrorAuth } from "@/lib/error/errorCustome"
import { LoginUser, NewPassword, RegisterUser, ResetSchema } from "@/interface/model/auth.type";

export type SelectPrisma<T> = Record<keyof T, true>

export class UserService {
	
	//
	selectPrismaUserPublic: SelectPrisma<UserPublic> = {
		id: true,
		name: true,
		email: true,
		emailVerified: true,
		image: true,
		role: true,
		createdAt: true,
		// trolleyId: true,
		
		phone: true,
		address: true,
	}

  constructor(
		protected valid: UserSchema,
		protected serviceBcrypt: BcryptService
	) {
	}
	
	validPassword(data: ResetSchema) {
    if (data.confPass !== data.password) {
			throw new Error("Password is not match")
    }
    return true
  }
	
	async createUser(data: RegisterUser) {
    data.password = await this.serviceBcrypt.hashPassword(data)
    return prisma.$transaction(async (tx) => {
			return tx.user.create({
				select: {
					name: true,
					email: true,
					image: true,
					password: true,
					id: true,
					// trolleyId: true
        },
				data: {
					name: data.fullname,
					password: data.password,
					email: data.email,
					address: data.address,
					phone: data.phone,
					// Trolley: {
					// 	create: {}
					// }
        },
      })
    })
  }
	
	// async createRefreshToken(id : string, token : string) {
	//   return prisma.user.update({
	//     where : {id},
	//     select : {name : true, email : true, id : true},
	//     data : {refresh_token : token},
	//   })
	// }
	
	async findEmail(userReq: LoginUser) {
    const data = await prisma.user.findUnique({
			where: { email: userReq.email },
			select: {
				email: true,
				name: true,
				id: true,
				password: true,
				image: true,
				// trolleyId: true
			},
    })
		// console.log(data, 'user db login')
    if (!data) {
			throw new ErrorAuth('notFound', "Email is not found")
    }
    await this.serviceBcrypt.comparePassword(userReq.password, data.password)
    return data
  }
	
	async findEmailOnly({ email }: { email: string }) {
    const data = await prisma.user.findUnique({
			where: { email },
			select: {
				email: true,
				name: true,
				id: true,
				password: true,
			},
    })
    if (!data) {
			throw new Error("Email is not found")
    }

    return data
  }
	
	async foundEmail(dataReq: RegisterUser) {
		dataReq = this.valid.registerValid(dataReq)
    const data = await prisma.user.findUnique({
			where: { email: dataReq.email },
			select: {
				email: true,
				name: true,
				id: true,
			},
    })
		console.log(data)

    if (data) {
      throw new Error(`Email is found used by ${data.name}`)
    }
  }
	
	async findId({ id_user }: UserId): Promise<UserPublic> {
    const data = await prisma.user.findUnique({
			where: { id: id_user },
			select: this.selectPrismaUserPublic,
    })
    if (!data) {
			throw new Error("User is not found")
    }
    return data
  }
	
	async findAll(): Promise<UserPublic[]> {
    const data = await prisma.user.findMany({
			select: this.selectPrismaUserPublic,
    })
    if (!data) {
			throw new ErrorAuth("notFound", 'user is not found')
    }
    return data
  }

  // async loginUser(data: LoginUser) {
  //   return this.findEmail(data)
  // }
	async newPassword(data: NewPassword): Promise<UserPublic> {
    data.password = await this.serviceBcrypt.hashPassword(data)
    return prisma.user.update({
			where: { email: data.email },
			data: { password: data.password },
			select: this.selectPrismaUserPublic,
    })
  }
}

export const userService = new UserService(userSchema, bcryptService)
