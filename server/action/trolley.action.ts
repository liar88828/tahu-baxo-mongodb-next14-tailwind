'use server'
import { config } from "@/config/baseConfig";
import {
	GetAllTrolley,
	TrolleyCreate,
	TrolleyDataId,
	TrolleyResponse,
	TrolleyUpdate
} from "@/interface/model/trolley.type";
import { ResponseTrolleyCount } from "@/server/service/trolley.service";
import { revalidatePath } from "next/cache";
import { TrolleyDB } from "@prisma/client";
import { authCookie } from "@/server/api/authCookie";
import { errorApi } from "@/lib/error/errorApi";
import { errorGetData } from "@/lib/error/errorGetData";

export async function getTrolleyPrivate() {
	const auth = authCookie().getAccess()
	try {
		const res = await fetch(`${ config.url }/api/trolley`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + auth,
			},
			
			cache: "no-cache",
		})
		if (!res.ok) {
			errorApi(res.status, 'trolley', await res.json())
			
		}
		const data: GetAllTrolley[] = await res.json()
		return data
	} catch (e: unknown) {
		return errorGetData(e)
	}
}

export async function getTrolleyAll() {
  try {
    const res = await fetch(`${ config.url }/api/trolley`, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
			errorApi(res.status, 'trolley', await res.json())
		}
    const data: GetAllTrolley[] = await res.json()
    return data
	} catch (e: unknown) {
		return errorGetData(e)
	}
}

export async function addTrolley(item: TrolleyDataId, id: TrolleyDataId) {
  try {
    const res = await fetch(`${ config.url }/api/products/${ id.id }`, {
      method : "POST",
      headers : {
        'Accept' : 'application/json',
      },
      body : JSON.stringify(item),
    })
    if (!res.ok) {
			errorApi(res.status, 'trolley', await res.json())
		}
    const data: TrolleyResponse = await res.json()
    return data
	} catch (e: unknown) {
		return errorGetData(e)
	}
}

export async function deleteTrolley(id: number) {
  try {
		const res = await fetch(`${ config.url }/api/trolley/${ id }`, {
      method : "DELETE",
      headers : {
        'Accept' : 'application/json',
      },
			
		})
    if (!res.ok) {
			errorApi(res.status, 'trolley', await res.json())
		}
		revalidatePath('/trolley')
    const data: TrolleyResponse = await res.json()
    return data
	} catch (e: unknown) {
		return errorGetData(e)
	}
}

export async function getUserTrolley() {
	try {
		const access = authCookie().getAccess()
		const res = await fetch(`${ config.url }/api/trolley/count`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + access,
			}
		})
		if (!res.ok) {
			errorApi(res.status, 'trolley', await res.json())
		}
		return await res.json() as ResponseTrolleyCount
	} catch (e) {
		return errorGetData(e)
	}
}

export async function onAddTrolley(id: number,) {
	const auth = authCookie()
	try {
		const data: TrolleyCreate = {
			userId: auth.getAuth().data.id,
			qty: 1,
			productId: Number(id)
		}
		console.log(data)
		const res = await fetch(`${ config.url }/api/trolley`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + auth.getAccess(),
				
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
		const auth = authCookie().getAuth()
		const data: TrolleyUpdate = {
			id: id,
			productId: productId,
			qty: 1,
			userId: auth.data.id
		}
		const res = await fetch(`${ config.url }/api/trolley/${ data.id }`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + auth.accessToken,
			},
			body: JSON.stringify(data)
		})
		
		if (!res.ok) {
			errorApi(res.status, 'trolley', await res.json())
		}
		console.log('api trolley increment')
		console.log(res.status)
		console.log(await res.json())
		console.log('api trolley increment')
		revalidatePath('/trolley')
		return true
	} catch (e) {
		return errorGetData(e)
	}
}

export async function onDecrementTrolley({ id, productId }: TrolleyDB) {
	try {
		const auth = authCookie().getAuth()
		const data: TrolleyUpdate = {
			id: id,
			productId: productId,
			qty: 1,
			userId: auth.data.id
		}
		const res = await fetch(`${ config.url }/api/trolley/${ data.id }`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + auth.accessToken,
			},
			body: JSON.stringify(data)
		})
		if (!res.ok) {
			errorApi(res.status, 'trolley', await res.json())
		}
		revalidatePath('/trolley')
		return true
	} catch (e) {
		return errorGetData(e)
	}
}
