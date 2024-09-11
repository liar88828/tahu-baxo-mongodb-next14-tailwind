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
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { TrolleyDB } from "@prisma/client";
import { authCookie } from "@/server/api/authCookie";

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
			throw new Error('api error');
		}
		const data: GetAllTrolley[] = await res.json()
		return data
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log(err.message)
			return null
		}
		return null
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
      throw new Error('api error');
    }
    const data: GetAllTrolley[] = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
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
      throw new Error('api error');
    }
    const data: TrolleyResponse = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
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
      throw new Error('api error');
    }
		revalidatePath('/trolley')
    const data: TrolleyResponse = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
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
			throw new Error(await res.text())
		}
		return await res.json() as ResponseTrolleyCount
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes("jwt expired")) {
				// console.log('jwt is expired')
				redirect('/auth/login')
				// make new access token and fetch again
			}
		}
	}
}

export async function onAddTrolley({ id }: any, formData: FormData) {
	try {
		const auth = authCookie().getAuth()
		const data: TrolleyCreate = {
			// id: id,
			userId: auth.data.id,
			qty: 1,
			productId: Number(id)
		}
		console.log(data)
		const res = await fetch(`${ config.url }/api/trolley`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + auth.accessToken,
				
			},
			body: JSON.stringify(data),
		})
		if (!res.ok) {
			// console.log('------user--')
			throw new Error(await res.text())
			// console.log('------user--')
		}
		revalidatePath('/')
		return { id: 1 }
	} catch (e) {
		console.log(e)
		return { id: 0 }
		
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
			throw new Error(await res.text())
		}
		revalidatePath('/trolley')
	} catch (e) {
		console.log(e)
		return e
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
			// console.log('------user--')
			throw new Error(await res.text())
			// console.log('------user--')
		}
		revalidatePath('/trolley')
		return await res.json() as ResponseTrolleyCount
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes("jwt expired")) {
				// console.log('jwt is expired')
				redirect('/auth/login')
				// make new access token and fetch again
			}
		}
	}
}