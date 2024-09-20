'use server'
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { getCookieUser } from "@/server/service/auth/cookie/cookie.service";
import { revalidatePath } from "next/cache";
import { errorForm } from "@/lib/error/errorForm";
import { ReceiverCreateFormError, ReceiverCreateKey, ReceiverUpdateKey } from "@/interface/model/receiver.type";
import { receiverService } from "@/server/service/receiver.service";
import { redirect } from "next/navigation";
import { apiGetAllDataReceiver } from "@/server/api/receiver.api";
import { receiverCreateSanitize } from "@/server/sanitize/receiver.sanitize";

export async function getAllDataReceiver(search: string) {
	try {
		const { data, code } = await apiGetAllDataReceiver(search)
		return { code, data }
	} catch (e) {
		return null
	}
}

export async function getDataReceiver(search: string) {
	// console.log(auth, 'auth-----')
	try {
		const { user } = getCookieUser()
		
		const res = await receiverService.findAllPrivate(
			{ page: 1, search: null, take: 100 },
			user
		)
		return res
	} catch (e) {
		return null
	}
}

export async function getDataReceiverId(id_receiver: number) {
	try {
		const { user } = getCookieUser()
		const res = await receiverService.findOne({
				id_receiver: Number(id_receiver),
				id_user: user.id
			}
		)
		return res
	} catch (e) {
		return null
	}
}


export async function createReceiver(prevState: any, formData: FormData): Promise<OnFormState<ReceiverCreateFormError>> {
	try {
		
		const { user } = getCookieUser()
		const rawFormData = receiverCreateSanitize<ReceiverCreateKey>(formData, user.id);
		const data = await receiverService.createOne(rawFormData, user)
		revalidatePath('/')
		redirect('/profile/receiver')
	} catch (err) {
		return errorForm(err);
	}
}

export async function updateReceiver(prevState: any, formData: FormData): Promise<OnFormState<ReceiverCreateFormError>> {
	try {
		const { user } = getCookieUser()
		const form = receiverCreateSanitize<ReceiverUpdateKey>(formData, user.id);
		const data = await receiverService.updateOne({
			id_receiver: Number(formData.get('id_receiver')),
			id_user: user.id
		}, form)
		revalidatePath('/')
		redirect('/profile/receiver')
	} catch (err) {
		return errorForm(err);
	}
}

export async function deleteReceiver(id: number): Promise<OnFormState<ReceiverCreateFormError>> {
	try {
		const { user } = getCookieUser()
		const data = await receiverService.deleteOne(id, user)
		console.log(data, 'test')
		revalidatePath('/')
		redirect('/profile/receiver')
	} catch (err) {
		return errorForm(err);
	}
}
