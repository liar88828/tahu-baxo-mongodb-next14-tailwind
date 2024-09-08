'use server'
import { config } from "@/config/baseConfig";
import { ProductDB } from "@prisma/client";
import { PaginationDB } from "@/server/service/product.service";
import { authCookie } from "@/server/api/auth";
import { redirect } from "next/navigation";
import { ErrorAuth } from "@/lib/error/errorCustome";

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
			throw new Error('product api error');
		}
		const data: PaginationDB<ProductDB> = await res.json()
		console.log('------')
		console.log(data)
		console.log('------')
		return data
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log(err.message)
			return null
		}
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
				throw new ErrorAuth('unauthorized');
			}
			throw new Error('product private api error');
			
		}
		const data: PaginationDB<ProductDB> = await res.json()
		return data
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log(err.message)
			return null
		}
		if (err instanceof ErrorAuth) {
			redirect('/auth/login')
		}
		console.log('this error')
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
