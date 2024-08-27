import prisma from '@/lib/db/prisma'
import { z } from 'zod'
import { Prisma, User } from '@prisma/client'

export type UserCreate = Prisma.Args<typeof prisma.user, 'create'>['data']
export type UserUpdate = Prisma.Args<typeof prisma.user, 'update'>['data']

export class UserSchema {
	id = z.string({ required_error: 'ID is required' }).optional()
	register = z.object({
		name: z.string().min(1).max(100),
		email: z.string().email(),
		password: z.string(),
		confPassword: z.string(),
	}) satisfies z.Schema<RegisterUser>

	update = z.object({
		id: this.id,
		name: z.string().min(1).max(100),
		email: z.string().email(),
		image: z.string().min(1).max(300),
		role: z.string().min(1).max(300),
	}) satisfies z.Schema<UserUpdate>

	login = z.object({
		email: z.string(),
		password: z.string(),
		confPassword: z.string(),
	}) satisfies z.Schema<LoginUser>

	createValid(data: RegisterUser) {
		data = this.register.parse(data)
		if (!data) {
			throw new Error('data is not valid')
		}
		return data
	}

	updateValid(data: Object) {
		data = this.update.parse(data)
		if (!data) {
			throw new Error('data is not valid')
		}
		return data
	}
	loginValid(data: LoginUser) {
		data = this.login.parse(data)
		if (!data) {
			throw new Error('data is not valid')
		}
		return data
	}

	idValid<T>(id: any): T {
		id = this.id.parse(id)
		if (!id) {
			throw new Error('data is not valid')
		}
		return id
	}
}
export type LoginUser = {
	email: string
	password: string
	confPassword: string
}
export type RegisterUser = {
	email: string
	password: string
	confPassword: string
	name: string
}

