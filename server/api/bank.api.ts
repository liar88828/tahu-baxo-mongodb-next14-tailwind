import { BankCreatePrisma, BankUpdate } from "@/interface/model/bank.type";
import { config } from "@/config/baseConfig";
import { errorApi } from "@/lib/error/errorApi";
import { ResponseData } from "@/interface/server/IService";
import { BankDB } from "@prisma/client";

export async function apiGetBankAllPrivate(search: string, token: string) {
	
	const res = await fetch(`${ config.url }/api/bank/user?search=${ search }`, {
		method: "GET",
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${ token }`
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		errorApi(res.status, 'bank', await res.json())
	}
	return {
		data: await res.json() as ResponseData<BankDB>,
		code: res.status,
	}
}

export async function apiGetBankAll() {
	const res = await fetch(`${ config.url }/api/bank`, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (!res.ok) {
		errorApi(res.status, 'bank', await res.json())
	}
	return {
		data: await res.json() as ResponseData<BankDB>,
		code: res.status,
		res
	};
}

export async function apiGetBankId(id: number) {
	const res = await fetch(`${ config.url }/api/bank/${ id }`, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
		},
		cache: "no-cache",
	})
	if (!res.ok) {
		errorApi(res.status, 'bank', await res.json())
	}
	return {
		data: await res.json() as BankDB,
		code: res.status,
	};
}

export async function createBank(data: BankCreatePrisma, token: string,) {
	const res = await fetch(`${ config.url }/api/bank`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
		body: JSON.stringify(data),
	})
	if (!res.ok) {
		errorApi(res.status, 'bank', await res.json())
	}
	const code = res.status
	const json = await res.json()
	return { code, data: json };
}

export async function updateBank(id: number, data: BankUpdate, token: string) {
	const res = await fetch(`${ config.url }/api/bank/${ id }`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
		body: JSON.stringify(data),
	})
	if (!res.ok) {
		errorApi(res.status, 'bank', await res.json())
	}
	const code = res.status
	const json = await res.json()
	return { code, data: json };
}

export async function deleteBank(id: number, token: string,) {
	const res = await fetch(`${ config.url }/api/bank/${ id }`, {
		method: "DELETE",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
	})
	if (!res.ok) {
		errorApi(res.status, 'bank', await res.json())
	}
	const code = res.status
	const json = await res.json()
	return { code, data: json };
}


