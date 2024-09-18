import { ProductCreateKey } from "@/interface/model/product.type";
import { UserPublic } from "@/interface/user/UserPublic";

export const productSanitize = (formData: FormData, user: UserPublic): ProductCreateKey => {
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

