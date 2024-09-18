import { BankCreateKey } from "@/interface/model/bank.type";

export const bankSanitize = (formData: FormData, userId: string): BankCreateKey => {
	// @ts-expect-error
	return {
		name: formData.get('name') ?? '',
		type: formData.get('type') ?? '',
		location: formData.get('location') ?? '',
		desc: formData.get('desc') ?? '',
		no_req: formData.get('no_req'),
		phone: formData.get('no_req'),
		userId,
	}
}

