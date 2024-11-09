'use server'
import { productService } from "@/server/service/product.service";
import { ProductCreateFormError, ProductCreateKey, ProductUpdateKey } from "@/interface/model/product.type";
import { getAccess, getCookieUser, getDataClient } from "@/server/service/auth/cookie/cookie.service";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { errorForm } from "@/lib/error/errorForm";
import { revalidatePath } from "next/cache";
import { errorGetData } from "@/lib/error/errorGetData";
import { productSanitize } from "@/server/sanitize/product.sanitize";
import { redirect } from "next/navigation";
import { apiGetProductId, apiGetProductsAll, apiGetProductsAllPrivate } from "@/server/api/product.api";

export async function getProductsAll(search?: string, category?: string) {
	try {
		return await apiGetProductsAll(search, category)
	} catch (err: unknown) {
		return errorGetData(err);
	}
}

export async function getProductsAllPrivate(search?: string) {
	try {
		const token = getAccess()
		return await apiGetProductsAllPrivate(search, token)
	} catch (err: unknown) {
		return null
	}
}

export async function getProductId(id: number) {
	try {
		
		const { data, } = await apiGetProductId(id)
		return data
	} catch (err: unknown) {
		return null
	}
}

export async function getProductIdPrivate(id_product: number) {
	try {
		const { user } = getCookieUser()
		const data = await productService.findIdPrivate({
			id_product: id_product,
			id_user: user.id
		},)
		return data
	} catch (err: unknown) {
		return null
	}
}


export async function createProduct(_: any, formData: FormData): Promise<OnFormState<ProductCreateFormError>> {
	try {
		const auth = getDataClient()
		const rawFormData = productSanitize<ProductCreateKey>(formData, auth)
		const data = await productService.createOne(rawFormData)
		console.log(data)
		revalidatePath('/')
		redirect('/profile')
		// return { message: 'true' }
	} catch (err) {
		return errorForm(err);
	}
}

export async function UpdateProduct(_: any, formData: FormData): Promise<OnFormState<ProductCreateFormError>> {
	try {
		const auth = getDataClient()
		const rawFormData = productSanitize<ProductUpdateKey>(formData, auth)
		const data = await productService.updateOne({
			id_product: Number(formData.get('id_product')),
			id_user: auth.id
		}, rawFormData)
		console.log(data)
		revalidatePath('/')
		redirect('/profile/product')
		// return { message: 'true' }
	} catch (err) {
		return errorForm(err);
	}
}

