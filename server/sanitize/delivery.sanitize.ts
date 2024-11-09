import { UserPublic } from "@/interface/user/UserPublic";

export const deliverySanitize = <T>(formData: FormData, user: UserPublic): T => {
	// @ts-ignore
	return {
		name: formData.get('name') ?? '',
		type: formData.get('type') ?? '',
		location: formData.get('location') ?? '',
		desc: formData.get('desc') ?? '',
		price: Number(formData.get('price')),
		userId: user.id,
		phone: formData.get('phone'),
	}
}