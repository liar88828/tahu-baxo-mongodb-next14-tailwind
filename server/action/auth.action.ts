'use server'
import { revalidatePath } from "next/cache";
import { userSchema } from "@/server/schema/user.schema";
import { apiLogin, apiLogout, apiRegister, } from "@/server/api/auth.api";
import { createSession } from "@/server/service/auth/cookie.service";
import { errorForm } from "@/lib/error/errorForm";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { ForgetFormError, LoginFormError, RegisterFormError, ResetFormError } from "@/interface/model/auth.type";
import { redirect } from "next/navigation";
import { forgetSanitize, loginSanitize, resetSanitize } from "@/server/sanitize/auth.sanitize";

export async function onLogin(prevState: any, formData: FormData): Promise<OnFormState<LoginFormError>> {
  try {
		const rawFormData = loginSanitize(formData)
    const form = userSchema.login.parse(rawFormData);
		const { data } = await apiLogin(form)
		createSession(data)
		redirect('/home')
  } catch (err) {
		return errorForm(err)
  }
}

export async function onRegister(prevState: any, formData: FormData): Promise<OnFormState<RegisterFormError>> {
  try {
    const rawFormData = Object.fromEntries(formData.entries())
		const res = userSchema.registerSchema.parse(rawFormData);
		const { data } = await apiRegister(res)
		createSession(data)
		redirect('/home')
  } catch (err) {
		return errorForm(err)
  }
}

export async function onForgot(prevState: any, formData: FormData): Promise<OnFormState<ForgetFormError>> {
  try {
		const rawFormData = forgetSanitize(formData)
    const data = userSchema.forgotSchema.parse(rawFormData);
    revalidatePath('/')
		// return { message: 'true' }
		redirect('/auth/reset');
  } catch (err) {
		console.error('on forget error')
		return errorForm(err)
  }
}

export async function onReset(prevState: any, formData: FormData): Promise<OnFormState<ResetFormError>> {
	try {
		// const form = Object.fromEntries(formData.entries())
		const rawFormData = resetSanitize(formData)
    const data = userSchema.resetSchema.parse(rawFormData);
		// return { message: 'true' }
		redirect('/auth/done')
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
		// deleteSession()
	}
}

