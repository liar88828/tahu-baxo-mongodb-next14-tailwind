'use server'
import { config } from "@/config/baseConfig";
import { ProductDB } from "@prisma/client";
import { PaginationDB, productService } from "@/server/service/product.service";
import { redirect } from "next/navigation";
import { ErrorAuth } from "@/lib/error/errorCustome";
import { ProductCreate, ProductCreateFormError } from "@/interface/model/product.type";
import { authCookie } from "@/server/api/authCookie";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { errorForm } from "@/lib/error/errorForm";
import { errorApi } from "@/lib/error/errorApi";

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
		console.error('on get All error')
		return null
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
			const data = await res.json()
			if (data === 'jwt expired') {
				throw new ErrorAuth('unauthorized', 'jwt is expire maybe');
			}
			throw new Error('product private api error');
			
		}
		const data: PaginationDB<ProductDB> = await res.json()
		return data
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log(err.message)
		}
		if (err instanceof ErrorAuth) {
			redirect('/auth/login')
		}
		console.log('this error')
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
			throw new Error('api error');
		}
		const data: ProductDB = await res.json()
		return data
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log(err.message)
			return null
		}
		return null
	}
	
}

export async function createProduct(prevState: any, formData: FormData): Promise<OnFormState<ProductCreateFormError>> {
	try {
		//@ts-expect-error
		// const rawForm = Object.fromEntries(formData.entries())
		const rawFormData = {
			nama: formData.get('name'),
			jenis: formData.get('jenis'),
			lokasi: formData.get('lokasi'),
			keterangan: formData.get('keterangan'),
			jumlah: formData.get('jumlah'),
			harga: formData.get('harga'),
		} as ProductCreate
		// console.log(rawFormData);
		rawFormData.qty = Number(rawFormData.qty)
		rawFormData.price = Number(rawFormData.price)
		rawFormData.userId = authCookie().getAuth().data.id
		const data = await productService.createOne(rawFormData)
		console.log(data)
		
		return { message: 'true' }
	} catch (err) {
		console.error('on get All error')
		return errorForm(err)
	}
	
}