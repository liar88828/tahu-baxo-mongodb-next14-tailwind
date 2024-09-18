'use server'
import { config } from "@/config/baseConfig";
import { TrolleyCreate, TrolleyDataId, TrolleyUpdate } from "@/interface/model/trolley.type";
import { revalidatePath } from "next/cache";
import { TrolleyDB } from "@prisma/client";
import { getAccess, getDataClient } from "@/server/service/auth/cookie.service";
import { errorApi } from "@/lib/error/errorApi";
import { errorGetData } from "@/lib/error/errorGetData";
import {
	apiAddTrolley,
	apiDeleteTrolley,
	apiGetTrolleyAll,
	apiGetTrolleyPrivate,
	apiGetUserTrolley,
	apiOnDecrementTrolley,
	apiOnIncrementTrolley
} from "@/server/api/trolley.api";

export async function getTrolleyPrivate() {
	
	try {
		const auth = await getAccess()
		const { data } = await apiGetTrolleyPrivate(auth)
		return data
	} catch (e: unknown) {
		return errorGetData(e)
	}
}

export async function getTrolleyAll() {
  try {
		const { data } = await apiGetTrolleyAll()
    return data
	} catch (e: unknown) {
		return errorGetData(e)
	}
}

export async function addTrolley(item: TrolleyDataId, id: TrolleyDataId) {
  try {
		const { data } = await apiAddTrolley(item, id)
    return data
	} catch (e: unknown) {
		return errorGetData(e)
	}
}

export async function deleteTrolley(id: number) {
  try {
		const auth = await getAccess()
		const { data } = await apiDeleteTrolley(id, auth)
		revalidatePath('/trolley')
    return data
	} catch (e: unknown) {
		return errorGetData(e)
	}
}

export async function getUserTrolley() {
	try {
		const access = await getAccess()
		const { data } = await apiGetUserTrolley(access)
		return data
	} catch (e) {
		return errorGetData(e)
	}
}

export async function onAddTrolley(id: number,) {
	try {
		const user = await getDataClient()
		const auth = await getAccess()
		const data: TrolleyCreate = {
			userId: user.id,
			qty: 1,
			productId: Number(id)
		}
		console.log(data)
		const res = await fetch(`${ config.url }/api/trolley`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + auth,
				
			},
			body: JSON.stringify(data),
		})
		if (!res.ok) {
			// console.log('---------------error')
			// console.log(await res.text(),)
			// console.log('---------------error')
			errorApi(res.status, 'trolley', await res.json())
		}
		revalidatePath('/')
		return { id: 1 }
	} catch (e) {
		return errorGetData(e)
	}
}

export async function onIncrementTrolley({ id, productId }: TrolleyDB) {
	try {
		const auth = await getAccess()
		const user = await getDataClient()
		
		const setData: TrolleyUpdate = {
			id: id,
			productId: productId,
			qty: 1,
			userId: user.id
		}
		
		const { data } = await apiOnIncrementTrolley(id, setData, auth)
		revalidatePath('/trolley')
		return data
	} catch (e) {
		return errorGetData(e)
	}
}

export async function onDecrementTrolley({ id, productId }: TrolleyDB) {
	try {
		const auth = await getAccess()
		const user = await getDataClient()
		const setData: TrolleyUpdate = {
			id: id,
			productId: productId,
			qty: 1,
			userId: user.id
		}
		const { data } = await apiOnDecrementTrolley(id, setData, auth)
		revalidatePath('/trolley')
		return data
	} catch (e) {
		return errorGetData(e)
	}
}
