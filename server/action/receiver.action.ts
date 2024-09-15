'use server'
import { PaginationDB } from "@/server/service/product.service";
import { ReceiverDB } from "@prisma/client";
import { config } from "@/config/baseConfig";
import { errorApi } from "@/lib/error/errorApi";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { authCookie } from "@/server/api/authCookie";
import { revalidatePath } from "next/cache";
import { errorForm } from "@/lib/error/errorForm";
import { ReceiverCreateFormError, ReceiverCreateKey } from "@/interface/model/receiver.type";
import { receiverService } from "@/server/service/receiver.service";
import { redirect } from "next/navigation";

export async function getAllDataReceiver(search: string) {
	try {
		const res = await fetch(`${ config.url }/api/receiver?search=${ search }`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-cache",
		})
		const code = res.status
		if (!res.ok) {
			errorApi(code, 'receiver', await res.text())
		}
		return {
			code,
			...(await res.json() as PaginationDB<ReceiverDB>)
		}
	} catch (e) {
		return null
	}
}

export async function getDataReceiver(search: string) {
	const auth = authCookie().getData;
	// console.log(auth, 'auth-----')
	try {
		const res = await receiverService.findAllPrivate(
			{ page: 1, search: null, take: 100 },
			auth
		)
		// console.log(res, "res")
		return res
	} catch (e) {
		// console.error(e)
		return null
	}
}

export async function createReceiver(prevState: any, formData: FormData): Promise<OnFormState<ReceiverCreateFormError>> {
	try {
		const auth = authCookie().getAuth()
		// @ts-ignore
		const rawFormData: ReceiverCreateKey = {
			name: formData.get('name') ?? '',
			phone: formData.get('name') ?? '',
			address: formData.get('address') ?? '',
			userId: auth.data.id
		}
		const data = await receiverService.createOne(rawFormData, auth.data)
		revalidatePath('/')
		redirect('/profile/receiver')
	} catch (err) {
		return errorForm(err);
	}
}

export async function deleteReceiver(id: number): Promise<OnFormState<ReceiverCreateFormError>> {
	try {
		const auth = authCookie().getAuth()
		const data = await receiverService.deleteOne(id, auth.data)
		console.log(data, 'test')
		revalidatePath('/')
		redirect('/profile/receiver')
	} catch (err) {
		return errorForm(err);
	}
}
