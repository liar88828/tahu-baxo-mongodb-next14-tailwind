import { ReceiverCreateKey } from "@/interface/model/receiver.type";

export const productCreateSanitize = (formData: FormData, userId: string): ReceiverCreateKey => {
	return {
		name: formData.get('name') ?? '',
		phone: formData.get('name') ?? '',
		address: formData.get('address') ?? '',
		userId
	}
}

