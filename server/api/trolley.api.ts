import { config } from "@/config/baseConfig";
import { errorApi } from "@/lib/error/errorApi";
import {
	GetAllTrolley,
	TrolleyCreate,
	TrolleyDataId,
	TrolleyResponse,
	TrolleyUpdate
} from "@/interface/model/trolley.type";
import { ResponseTrolleyCount } from "@/server/service/trolley.service";

export async function apiGetTrolleyPrivate(token: string) {
	const res = await fetch(`${ config.url }/api/trolley`, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		errorApi(res.status, 'trolley', await res.json())
		
	}
	return {
		data: await res.json() as GetAllTrolley[],
		code: res.status
	}
}

export async function apiGetTrolleyAll() {
	const res = await fetch(`${ config.url }/api/trolley`, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		errorApi(res.status, 'trolley', await res.json())
	}
	return {
		data: await res.json() as GetAllTrolley[],
		code: res.status
	}
}

export async function apiAddTrolley(item: TrolleyDataId, id: TrolleyDataId) {
	const res = await fetch(`${ config.url }/api/products/${ id.id }`, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
		},
		body: JSON.stringify(item),
	})
	if (!res.ok) {
		errorApi(res.status, 'trolley', await res.json())
	}
	
	return {
		data: await res.json() as TrolleyResponse,
		code: res.status
	}
}

export async function apiDeleteTrolley(id: number, token: string) {
	const res = await fetch(`${ config.url }/api/trolley/${ id }`, {
		method: "DELETE",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`,
		},
	})
	if (!res.ok) {
		errorApi(res.status, 'trolley', await res.json())
	}
	return {
		data: await res.json() as TrolleyResponse,
		code: res.status
	}
}

export async function apiGetUserTrolley(token: string) {
	const res = await fetch(`${ config.url }/api/trolley/count`, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token,
		},
		cache: "no-cache"
	})
	if (!res.ok) {
		errorApi(res.status, 'trolley', await res.json())
	}
	return {
		data: await res.json() as ResponseTrolleyCount,
		code: res.status
	}
}

export async function apiOnIncrementTrolley(id: number, data: TrolleyUpdate, token: string) {
	
	const res = await fetch(`${ config.url }/api/trolley/${ id }`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token,
		},
		body: JSON.stringify(data)
	})
	
	if (!res.ok) {
		errorApi(res.status, 'trolley', await res.json())
	}
	
	return {
		data: await res.json() as TrolleyResponse,
		code: res.status
	}
}

export async function apiOnDecrementTrolley(id: number, data: TrolleyUpdate, token: string) {
	
	const res = await fetch(`${ config.url }/api/trolley/${ data.id }`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + token,
		},
		body: JSON.stringify(data)
	})
	
	if (!res.ok) {
		errorApi(res.status, 'trolley', await res.json())
	}
	
	return {
		data: await res.json() as TrolleyResponse,
		code: res.status
	}
}

export async function apiCreateTrolley(data: TrolleyCreate, token: string) {
	const res = await fetch(`${ config.url }/api/api/trolley`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${ token }`,
			
		},
		
		body: JSON.stringify(data),
	})
	if (!res.ok) {
		errorApi(res.status, 'trolley', await res.json())
	}
	
	return {
		data: await res.json() as TrolleyResponse,
		code: res.status
	}
}

