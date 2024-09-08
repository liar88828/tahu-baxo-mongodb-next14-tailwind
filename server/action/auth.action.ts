'use server'
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { userSchema } from "@/server/schema/user.schema";
import { apiLogin, } from "@/server/api/auth";

export async function onLogin(prevState : any, formData : FormData) {
  try {
    const rawFormData = {
      email : formData.get('email'),
      password : formData.get('password'),
    }
    const form = userSchema.login.parse(rawFormData);
    const res = await apiLogin(form)
    return { message: ['true'], }
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err.flatten().fieldErrors);
      return err.flatten().fieldErrors
    }
  }
}

export async function onRegister(prevState : any, formData : FormData) {

  try {
    const rawFormData = Object.fromEntries(formData.entries())
    const data = userSchema.registerSchema.parse(rawFormData);
    return {message : ['true']}
  } catch (err) {
    if (err instanceof ZodError) {
      return err.flatten().fieldErrors
    }
  }
}

export async function onForgot(prevState : any, formData : FormData) {
  try {
    const rawFormData = {
      email : formData.get('email'),
    }
    const data = userSchema.forgotSchema.parse(rawFormData);
    // console.log(data, 'success')
    revalidatePath('/')
    return {message : ['true']}

  } catch (err) {
    if (err instanceof ZodError) {
      // console.log(err.flatten().fieldErrors);
      return err.flatten().fieldErrors
    }
  }
}

export async function onReset(prevState : any, formData : FormData) {
  const form = Object.fromEntries(formData.entries())
  console.log(form);
  try {
    const rawFormData = {
      password : formData.get('password'),
      confPass : formData.get('confPass'),
    }
    const data = userSchema.resetSchema.parse(rawFormData);
    console.log(data, 'success')
    return {message : ['true']}

  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err.flatten().fieldErrors);
      return err.flatten().fieldErrors

    }
  }
}
