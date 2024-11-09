import { UserPublic } from "@/interface/user/UserPublic";

export const productSanitize = <T>(formData: FormData, user: UserPublic): T => {
	// @ts-ignore
	return {
		name: formData.get('name') ?? '',
		type: formData.get('type') ?? '',
		location: formData.get('location') ?? '',
		desc: formData.get('desc') ?? '',
		qty: Number(formData.get('qty')),
		price: Number(formData.get('price')),
		userId: user.id,
		// img: formData.get('img') ?? '',
	}
}

