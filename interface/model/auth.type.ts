import { Prisma } from "@prisma/client";
import prisma from "@/config/prisma";
import { z } from "zod";
import { userSchema } from "@/server/schema/user.schema";

export type LoginUser = {
	email: string
	password: string
}
export type RegisterUser = {
	email: string
	password: string
	confPass: string
	fullname: string
	phone: string
	address: string
	
}
export type NewPassword = {
	email: string
	password: string
	confPass: string
}
export type DeleteUser = {
	name: string
	email: string
	password: string
	confPass: string
}
export type UserCreate = Prisma.Args<typeof prisma.user, 'create'>['data']
export type UserUpdate = Prisma.Args<typeof prisma.user, 'update'>['data']
export type ResetSchema = z.output<typeof userSchema.resetSchema>

export type otpError = z.inferFlattenedErrors<typeof userSchema.otpSchema>
type InitialFormState = {
	message: string,
	// data: any
	
}
export const initialState: InitialFormState = {
	message: '',
	// data: {}
}

export type LoginFormError = z.inferFlattenedErrors<typeof userSchema.login>['fieldErrors'];
export type RegisterFormError = z.inferFlattenedErrors<typeof userSchema.register>['fieldErrors'];
export type ResetFormError = z.inferFlattenedErrors<typeof userSchema.resetSchema>['fieldErrors'];
