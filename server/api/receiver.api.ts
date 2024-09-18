import { config } from "@/config/baseConfig";
import { errorApi } from "@/lib/error/errorApi";
import { PaginationDB } from "@/server/service/product.service";
import { ReceiverDB } from "@prisma/client";
import { PenerimaTransaction } from "@/__test__/utils/penerima";

export async function apiGetAllDataReceiver(search: string) {
	const res = await fetch(`${ config.url }/api/receiver?search=${ search }`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-cache",
	})
	const code = res.status
	if (!res.ok) {
		errorApi(code, 'receiver', await res.text())
	}
	const data = await res.json() as PaginationDB<ReceiverDB>
	return { code, data }
}

export async function apiGetReceiverId(id: number) {
	const res = await fetch(
		` ${ config.url }/api/receiver/${ id }`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
	return {
		code: res.status,
		data: await res.json(),
	}
}

export async function apiUpdateReceiver(id: number, data: PenerimaTransaction, token: string) {
	const res = await fetch(`${ config.url }/api/receiver/${ id }`,
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

export async function apiDeleteReceiver(id: number, token: string) {
	const res = await fetch(`${ config.url }/api/receiver/${ id }`,
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

export async function apiCreateReceiver(data: PenerimaTransaction, token: string) {
	const res = await fetch(`${ config.url }/api/receiver`,
		{
			method: "POST",
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

