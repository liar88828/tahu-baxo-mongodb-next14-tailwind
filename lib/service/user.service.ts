import { LoginUser,RegisterUser } from './../validator/schema/user.schema'
import prisma from '../db/prisma'
import { User } from '@prisma/client'

export class UserService
{
	
		 validPassword(data: LoginUser) {
				if (data.confPassword !== data.password) {
					throw new Error('Password is not match')
				}
      }

	async register(data: RegisterUser): Promise<User> {
		return prisma.user.create({
			data: {
				name: data.name,
				password: data.password,
				email: data.email,
			},
		})
	}

	async findEmail(email: string): Promise<User> {
		const data = await prisma.user.findUnique({
			where: { email },
		})
		if (!data) {
			throw new Error('Email is not found')
		}
		return data
	}
	async findId(id: string): Promise<User> {
		const data = await prisma.user.findUnique({
			where: { id },
		})
		if (!data) {
			throw new Error('User is not found')
		}
		return data
	}

	async loginUser(data: LoginUser) {
		return this.findEmail(data.email)
	}
}
