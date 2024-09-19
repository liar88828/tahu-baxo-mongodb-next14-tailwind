'use server'
import { TrolleyCreate, TrolleyDataId, TrolleyUpdate } from "@/interface/model/trolley.type";
import { revalidatePath } from "next/cache";
import { TrolleyDB } from "@prisma/client";
import { getAccess, getCookieUser } from "@/server/service/auth/cookie/cookie.service";
import { errorGetData } from "@/lib/error/errorGetData";
import {
	apiAddTrolley,
	apiCreateTrolley,
	apiDeleteTrolley,
	apiGetTrolleyAll,
	apiGetTrolleyPrivate,
	apiGetUserTrolley,
	apiOnDecrementTrolley,
	apiOnIncrementTrolley
} from "@/server/api/trolley.api";

export async function getTrolleyPrivate() {
	
	try {
		const { access } = getCookieUser()
		const { data } = await apiGetTrolleyPrivate(access)
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
		const auth = getAccess()
		const { data } = await apiDeleteTrolley(id, auth)
		revalidatePath('/trolley')
    return data
	} catch (e: unknown) {
		return errorGetData(e)
	}
}

export async function getUserTrolley() {
	try {
		const { access } = getCookieUser()
		const { data } = await apiGetUserTrolley(access)
		return data
	} catch (e) {
		return errorGetData(e)
	}
}

export async function onAddTrolley(id: number,) {
	
	try {
		const { user, access } = getCookieUser()
		const form: TrolleyCreate = {
			userId: user.id,
			qty: 1,
			productId: Number(id)
		}
		
		const { data } = await apiCreateTrolley(form, access)
		console.log(data, 'test data')
		revalidatePath('/product')
		return { id: 1 }
	} catch (e) {
		return errorGetData(e)
	}
}

export async function onIncrementTrolley({ id, productId }: TrolleyDB) {
	try {
		const { user, access } = getCookieUser()
		const setData: TrolleyUpdate = {
			id: id,
			productId: productId,
			qty: 1,
			userId: user.id
		}
		
		const { data } = await apiOnIncrementTrolley(id, setData, access)
		revalidatePath('/trolley')
		return data
	} catch (e) {
		return errorGetData(e)
	}
}

export async function onDecrementTrolley({ id, productId }: TrolleyDB) {
	try {
		const { user, access } = getCookieUser()
		const setData: TrolleyUpdate = {
			id: id,
			productId: productId,
			qty: 1,
			userId: user.id
		}
		const { data } = await apiOnDecrementTrolley(id, setData, access)
		revalidatePath('/trolley')
		return data
	} catch (e) {
		return errorGetData(e)
	}
}
