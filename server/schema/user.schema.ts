import { z } from 'zod'
import { addressInit, nameInit, phoneInit } from "@/server/schema/init.schema";
import { LoginUser, RegisterUser, UserUpdate } from "@/interface/model/auth.type";

export class UserSchema {
	
	id = z.string({ required_error: 'ID is required' }).optional()
	register = z.object({
		fullname: nameInit,
		email: z.string().email().min(1).max(50),
		password: z.string().min(8).max(50),
		confPass: z.string().min(8).max(50),
		phone: phoneInit,
		address: addressInit,
		
	}) satisfies z.Schema<RegisterUser>
	registerSchema = this.register
		.superRefine(
			({ confPass, password }, ctx) => {
				if (confPass !== password) {
					ctx.addIssue({
						code: "custom",
						message: "The passwords did not match",
						path: ['confPass']
					});
				}
			})
	
	forgotSchema = z.object({
		email: z.string().email().min(1).max(50),
	})
	
	otpSchema = z.object({
		otp: z.string().min(6).max(6),
	})
	resetSchema = z.object({
		password: z.string().min(8).max(50),
		confPass: z.string().min(8).max(50),
	}).superRefine(
		({ confPass, password }, ctx) => {
			if (confPass !== password) {
				ctx.addIssue({
					code: "custom",
					message: "The passwords did not match",
					path: ['confirmPassword']
				});
			}
		})
	
	update = z.object({
		id: this.id,
		name: z.string().min(1).max(100),
		email: z.string().email(),
		image: z.string().min(1).max(300),
		role: z.string().min(1).max(300),
	}) satisfies z.Schema<UserUpdate>
	
	login = z.object({
		email: z.string().email().min(1).max(50),
		password: z.string().min(8).max(50),
	}) satisfies z.Schema<LoginUser>
	
	registerValid(data: RegisterUser) {
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
	
	// idValid<T>(id : any) : T {
	//   id = this.id.parse(id)
	//   if (!id) {
	//     throw new Error('data is not valid')
	//   }
	//   return id
	// }
}

export const userSchema = new UserSchema()

