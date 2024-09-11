'use server'
import { revalidatePath } from "next/cache";
import { userSchema } from "@/server/schema/user.schema";
import { apiLogin, apiLogout, } from "@/server/api/auth";
import { authCookie } from "@/server/api/authCookie";
import { OnLoginState } from "@/app/(sites)/auth/login/page";
import { errorForm } from "@/lib/error/errorForm";

export async function onLogin(prevState: any, formData: FormData): Promise<OnLoginState> {
  try {
    const rawFormData = {
      email : formData.get('email'),
      password : formData.get('password'),
    }
    const form = userSchema.login.parse(rawFormData);
    const res = await apiLogin(form)
		// console.error(res, 'error data client')
		return { message: 'true' }
  } catch (err) {
		console.error('on login error')
		return errorForm(err)
  }
}

export async function onRegister(prevState : any, formData : FormData) {

  try {
    const rawFormData = Object.fromEntries(formData.entries())
    const data = userSchema.registerSchema.parse(rawFormData);
    return {message : ['true']}
  } catch (err) {
		console.error('on register error')
		return errorForm(err)
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
		console.error('on forget error')
		return errorForm(err)
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
		console.error('on reset error')
		return errorForm(err)
  }
}

export async function onLogout() {
	try {
		await apiLogout()
		return true
	} catch (err) {
		console.error('on logout error')
		return errorForm(err)
	} finally {
		console.log('this finally')
		authCookie().deleteAuth()
	}
}

