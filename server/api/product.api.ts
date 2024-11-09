import { config } from "@/config/baseConfig";
import { errorApi } from "@/lib/error/errorApi";
import { ProductDB } from "@prisma/client";
import { PaginationDB } from "@/server/service/product.service";
import type { ProductCreate } from "@/interface/model/product.type";

export async function apiCreateProduct(data: ProductCreate, token: string) {
	const res = await fetch(`${ config.url }/api/product/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${ token }`,
		},
		body: JSON.stringify(data),
	})
	if (!res.ok) {
		errorApi(res.status, 'product', await res.json())
	}
	return {
		data: await res.json() as ProductDB,
		code: res.status
	}
}

export async function apiGetAllProduct() {
	const res = await fetch(`${ config.url }/api/product/`, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		errorApi(res.status, 'product', await res.json())
	}
	return {
		code: res.status,
		data: await res.json() as ProductDB
	}
}

export async function apiGetProductId(id: number) {
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
	return {
		code: res.status,
		data: await res.json() as ProductDB
	}
}

export async function apiGetProductsAllPrivate(search?: string, token?: string) {
	// console.log(token)
	const res = await fetch(`${ config.url }/api/product/user?search=${ search }`, {
		method: "GET",
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${ token }`
		},
		cache: "no-cache",
	})
	
	if (!res.ok) {
		errorApi(res.status, 'product', await res.json())
	}
	return await res.json() as PaginationDB<ProductDB>
}

export async function apiGetProductsAll(search?: string, category?: string) {
	const res = await fetch(`${ config.url }/api/product?search=${ search }&category=${ category }`, {
		method: "GET",
		headers: {
			'content-type': 'application/json',
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		errorApi(res.status, 'product', 'api product get all error')
	}
	return await res.json() as PaginationDB<ProductDB>
}

export async function apiUpdateProduct(id: number, data: ProductCreate, token: string) {
	const res = await fetch(
		`http://localhost:3000/api/product/${ id }`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ token }`,
			},
			body: JSON.stringify(data),
			
		}
	)
	return {
		code: res.status,
		data: await res.json(),
	}
}

export async function apiDeleteProduct(id: number, token: string) {
	const res = await fetch(
		`http://localhost:3000/api/product/${ id }`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ token }`,
			},
		}
	)
	return {
		code: res.status,
		data: await res.json(),
	}
}
