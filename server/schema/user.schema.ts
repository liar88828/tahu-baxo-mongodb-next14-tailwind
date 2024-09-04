import prisma from '@/config/prisma'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

export class UserSchema {

  id = z.string({required_error : 'ID is required'}).optional()
  register = z.object({
    fullname : z.string().min(1).max(100),
    email : z.string().email().min(1).max(50),
    password : z.string().min(8).max(50),
    confPass : z.string().min(8).max(50),
    phone : z.string().min(8).max(30),
    address : z.string().min(8).max(200),

  }) satisfies z.Schema<RegisterUser>
  registerSchema = this.register
    .superRefine(
      ({confPass, password}, ctx) => {
        if (confPass !== password) {
          ctx.addIssue({
            code : "custom",
            message : "The passwords did not match",
            path : ['confPass']
          });
        }
      })

  forgotSchema = z.object({
    email : z.string().email().min(1).max(50),
  })

  otpSchema = z.object({
    otp : z.string().min(6).max(6),
  })
  resetSchema = z.object({
    password : z.string().min(8).max(50),
    confPass : z.string().min(8).max(50),
  }).superRefine(
    ({confPass, password}, ctx) => {
      if (confPass !== password) {
        ctx.addIssue({
          code : "custom",
          message : "The passwords did not match",
          path : ['confirmPassword']
        });
      }
    })

  update = z.object({
    id : this.id,
    name : z.string().min(1).max(100),
    email : z.string().email(),
    image : z.string().min(1).max(300),
    role : z.string().min(1).max(300),
  }) satisfies z.Schema<UserUpdate>

  login = z.object({
    email : z.string().email().min(1).max(50),
    password : z.string().min(8).max(50),
  }) satisfies z.Schema<LoginUser>

  createValid(data : RegisterUser) {
    data = this.register.parse(data)
    if (!data) {
      throw new Error('data is not valid')
    }
    return data
  }

  updateValid(data : Object) {
    data = this.update.parse(data)
    if (!data) {
      throw new Error('data is not valid')
    }
    return data
  }

  loginValid(data : LoginUser) {
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

export type LoginUser = {
  email : string
  password : string
}
export type RegisterUser = {
  email : string
  password : string
  confPass : string
  fullname : string
  phone : string
  address : string

}

export type NewPassword = {
  email : string
  password : string
  confPass : string

}
export const userSchema = new UserSchema()

export type UserCreate = Prisma.Args<typeof prisma.user, 'create'>['data']
export type UserUpdate = Prisma.Args<typeof prisma.user, 'update'>['data']
export type ResetSchema = z.output<typeof userSchema.resetSchema>
export type otpError = z.inferFlattenedErrors<typeof userSchema.otpSchema>
type InitialFormState = {
  message : string[]
}
export const initialState : InitialFormState = {
  message : [''],
}
