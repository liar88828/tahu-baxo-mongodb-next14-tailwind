import { ReceiverCreateKey } from "@/interface/model/receiver.type";

export const receiverCreateSanitize = <T>(formData: FormData, userId: string): T => {
	//@ts-ignore
	return {
		name: formData.get('name') ?? '',
		phone: formData.get('phone') ?? '',
		address: formData.get('address') ?? '',
		// id_receiver: Number(formData.get('id_receiver')),
		userId,
	} as ReceiverCreateKey
}

