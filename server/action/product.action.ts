'use server'
import { config } from "@/config/baseConfig";
import { ProductDB } from "@prisma/client";
import { PaginationDB, productService } from "@/server/service/product.service";
import { ProductCreateFormError, ProductCreateKey } from "@/interface/model/product.type";
import { authCookie } from "@/server/api/authCookie";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { errorForm } from "@/lib/error/errorForm";
import { errorApi } from "@/lib/error/errorApi";
import { revalidatePath } from "next/cache";
import { errorGetData } from "@/lib/error/errorGetData";

export async function getProductsAll(search?: string) {
	try {
		const res = await fetch(`${ config.url }/api/product?search=${ search }`, {
			method: "GET",
			headers: {
				'content-type': 'application/json',
			},
			cache: "no-cache",
		})
		if (!res.ok) {
			errorApi(res.status, 'product', 'api product get all error')
			
		}
		const data: PaginationDB<ProductDB> = await res.json()
		return data
	} catch (err: unknown) {
		return errorGetData(err);
	}
}

export async function getProductsAllPrivate(search?: string) {
	try {
		const token = authCookie().getAuth()
		// console.log(token)
		const res = await fetch(`${ config.url }/api/product/user?search=${ search }`, {
			method: "GET",
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${ token.accessToken }`
			},
			cache: "no-cache",
		})
		if (!res.ok) {
			errorApi(res.status, 'product', await res.json())
		}
		const data: PaginationDB<ProductDB> = await res.json()
		return data
	} catch (err: unknown) {
		return null
	}
}

export async function getProductId(id: number) {
	try {
		const res = await fetch(`${ config.url }/api/product/${ id }`, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
			},
			cache: "no-cache",
		})
		if (!res.ok) {
			errorApi(res.status, 'product', await res.json())
		}
		const data: ProductDB = await res.json()
		// const access = cookies().has('access')
		// await updateSession()
		return data
	} catch (err: unknown) {
		return null
		
	}
	
}

export async function createProduct(prevState: any, formData: FormData): Promise<OnFormState<ProductCreateFormError>> {
	try {
		// @ts-ignore
		// const rawFormData = Object.fromEntries(formData.entries())
		const rawFormData: ProductCreateKey = {
			name: formData.get('name') ?? '',
			type: formData.get('type') ?? '',
			location: formData.get('location') ?? '',
			desc: formData.get('desc') ?? '',
			qty: Number(formData.get('qty')),
			price: Number(formData.get('price')),
			userId: authCookie().getAuth().data.id
		}
		// console.log(rawFormData)
		const data = await productService.createOne(rawFormData)
		revalidatePath('/')
		console.log(data)
		// redirect('/profile')
		return { message: 'true' }
	} catch (err) {
		return errorForm(err);
	}
}