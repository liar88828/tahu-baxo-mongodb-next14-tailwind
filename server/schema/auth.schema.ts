import { z } from "zod";

export const forgotSchema = z.object({
  email : z.string().email().min(1).max(50),
})

export const loginSchema = z.object({
  email : z.string().email().min(1).max(50),
  password : z.string().min(8).max(50),
})

export const registerSchema = z.object({
  fullname : z.string().min(1).max(100),
  email : z.string().email().min(1).max(50),
  password : z.string().min(8).max(50),
  confPass : z.string().min(8).max(50),
}).superRefine(
  ({confPass, password}, ctx) => {
    if (confPass !== password) {
      ctx.addIssue({
        code : "custom",
        message : "The passwords did not match",
        path : ['confPass']
      });
    }
  })

export const resetSchema = z.object({
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
export const otpSchema = z.object({
  otp : z.string().min(6).max(6),
})
export type LoginSchema = z.output<typeof loginSchema>
export type LoginError = z.inferFlattenedErrors<typeof loginSchema>
export type otpError = z.inferFlattenedErrors<typeof otpSchema>

export const initialState = {
  message : [''],
}
