'use server'
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { getDataClient } from "@/server/service/auth/cookie/cookie.service";
import { revalidatePath } from "next/cache";
import { errorForm } from "@/lib/error/errorForm";
import { ReceiverCreateFormError } from "@/interface/model/receiver.type";
import { receiverService } from "@/server/service/receiver.service";
import { redirect } from "next/navigation";
import { apiGetAllDataReceiver } from "@/server/api/receiver.api";
import { productCreateSanitize } from "@/server/sanitize/receiver.sanitize";

export async function getAllDataReceiver(search: string) {
	try {
		const { data, code } = await apiGetAllDataReceiver(search)
		return { code, data }
	} catch (e) {
		return null
	}
}

export async function getDataReceiver(search: string) {
	const auth = await getDataClient()
	// console.log(auth, 'auth-----')
	try {
		const res = await receiverService.findAllPrivate(
			{ page: 1, search: null, take: 100 },
			auth
		)
		return res
	} catch (e) {
		return null
	}
}

export async function createReceiver(prevState: any, formData: FormData): Promise<OnFormState<ReceiverCreateFormError>> {
	try {
		
		const auth = await getDataClient()
		const rawFormData = productCreateSanitize(formData, auth.id);
		const data = await receiverService.createOne(rawFormData, auth)
		revalidatePath('/')
		redirect('/profile/receiver')
	} catch (err) {
		return errorForm(err);
	}
}

export async function deleteReceiver(id: number): Promise<OnFormState<ReceiverCreateFormError>> {
	try {
		const auth = await getDataClient()
		const data = await receiverService.deleteOne(id, auth)
		console.log(data, 'test')
		revalidatePath('/')
		redirect('/profile/receiver')
	} catch (err) {
		return errorForm(err);
	}
}
