import { config } from "@/config/baseConfig";
import { errorApi } from "@/lib/error/errorApi";
import { ResponseData } from "@/interface/server/IService";
import { BankDB, DeliveryDB } from "@prisma/client";
import type { DeliveryCreate } from "@/interface/model/delivery.type";

export async function apiGetDeliveryAllPrivate(search: string, token: string) {
	const res = await fetch(`${ config.url }/api/delivery/user?search=${ search }`, {
		method: "GET",
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${ token }`
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		errorApi(res.status, 'delivery', await res.json())
	}
	return {
		data: await res.json() as ResponseData<DeliveryDB>,
		code: res.status,
	}
}

export async function apiGetDeliveryAll() {
	const res = await fetch(`${ config.url }/api/delivery/`, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		errorApi(res.status, 'delivery', await res.json())
	}
	return {
		data: await res.json() as ResponseData<DeliveryDB>,
		code: res.status,
	}
}

export async function apiGetDeliveryId(id: number) {
	const res = await fetch(`${ config.url }/api/delivery/${ id }`, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		errorApi(res.status, 'delivery', await res.json())
	}
	return {
		data: await res.json() as BankDB,
		code: res.status,
	}
}

export async function apiDeleteDelivery(id: number, token: string) {
	const res = await fetch(`http://localhost:3000/api/delivery/${ id }`, {
		method: "DELETE",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
	})
	
	return {
		data: await res.json() as DeliveryDB,
		code: res.status,
	}
}

export async function apiUpdateDelivery(id: number, data: DeliveryCreate, token: string) {
	const res = await fetch(`http://localhost:3000/api/delivery/${ id }`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
		body: JSON.stringify(data),
	})
	
	return {
		data: await res.json() as DeliveryDB,
		code: res.status,
	}
}

export async function apiGetDeliveryIdPrivate(id: number, token: string) {
	const res = await fetch(`http://localhost:3000/api/delivery/${ id }`, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
	})
	
	return {
		data: await res.json() as DeliveryDB,
		code: res.status,
	}
}

export async function apiCreateDelivery(data: DeliveryCreate, token: string) {
	const res = await fetch("http://localhost:3000/api/delivery", {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
		body: JSON.stringify(data),
		cache: "no-cache",
	})
	if (!res.ok) {
		errorApi(res.status, 'delivery', await res.json())
	}
	return {
		data: await res.json() as BankDB,
		code: res.status,
	}
}
