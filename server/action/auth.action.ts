'use server'
import { revalidatePath } from "next/cache";
import { userSchema } from "@/server/schema/user.schema";
import { apiLogin, apiLogout, apiRegister, } from "@/server/api/auth";
import { authCookie } from "@/server/api/authCookie";
import { errorForm } from "@/lib/error/errorForm";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { LoginFormError, RegisterFormError, ResetFormError } from "@/interface/model/auth.type";

export async function onLogin(prevState: any, formData: FormData): Promise<OnFormState<LoginFormError>> {
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
		// console.error('on login error')
		return errorForm(err)
  }
}

export async function onRegister(prevState: any, formData: FormData): Promise<OnFormState<RegisterFormError>> {

  try {
    const rawFormData = Object.fromEntries(formData.entries())
		const res = userSchema.registerSchema.parse(rawFormData);
		const data = await apiRegister(res)
		return { message: 'true' }
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

export async function onReset(prevState: any, formData: FormData): Promise<OnFormState<ResetFormError>> {
  const form = Object.fromEntries(formData.entries())
  console.log(form);
  try {
    const rawFormData = {
      password : formData.get('password'),
      confPass : formData.get('confPass'),
    }
    const data = userSchema.resetSchema.parse(rawFormData);
    console.log(data, 'success')
		return { message: 'true' }

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

