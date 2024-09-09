'use server'
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { userSchema } from "@/server/schema/user.schema";
import { apiLogin, apiLogout, authCookie, } from "@/server/api/auth";
import { ErrorAuth } from "@/lib/error/errorCustome";

export async function onLogin(prevState : any, formData : FormData) {
  try {
    const rawFormData = {
      email : formData.get('email'),
      password : formData.get('password'),
    }
    const form = userSchema.login.parse(rawFormData);
    const res = await apiLogin(form)
		// console.log(res)
		// return  redirect('/home')
    return { message: ['true'], }
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err.flatten().fieldErrors);
      return err.flatten().fieldErrors
    }
		// return err
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

export async function onLogout() {
	try {
		await apiLogout()
		return true
	} catch (err) {
		if (err instanceof ErrorAuth) {
			console.error(err.message)
		}
		return false
	} finally {
		authCookie().deleteAuth()
		
	}
}

