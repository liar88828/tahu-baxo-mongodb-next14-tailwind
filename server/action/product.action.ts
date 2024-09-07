import { config } from "@/config/baseConfig";
import { ProductDB } from "@prisma/client";
import { PaginationDB } from "@/server/service/product.service";

export async function getProductsAll(categoryProduct?: string) {
	try {
		const res = await fetch(`${ config.url }/api/product`, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
			},
			cache: "no-cache",
		})
		if (!res.ok) {
			throw new Error('api error');
		}
		const data: PaginationDB<ProductDB> = await res.json()
		return data
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log(err.message)
			return null
		}
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
