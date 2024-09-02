import { config } from "@/config/baseConfig";
import { GetAllTrolley, TrolleyData, TrolleyDataAll, TrolleyDataId } from "@/server/service/trolley.service";
import { TrolleyOnProductDB } from "@prisma/client";

export async function getTrolleyAll({trolleyId} : TrolleyDataAll) {
  try {
    const res = await fetch(`${config.url}/api/trolley?id=${trolleyId}`, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
      throw new Error('api error');
    }
    const data : GetAllTrolley[] = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
  }
}

export async function addTrolley(item : TrolleyData, id : TrolleyDataId) {
  try {
    const res = await fetch(`${config.url}/api/products/${id.trolleyOnProductDBId}`, {
      method : "POST",
      headers : {
        'Accept' : 'application/json',
      },
      body : JSON.stringify(item),
    })
    if (!res.ok) {
      throw new Error('api error');
    }
    const data : TrolleyOnProductDB = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
  }
}
export async function removeTrolley(id : number) {
  try {
    const res = await fetch(`${config.url}/api/products/${id}`, {
      method : "DELETE",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
      throw new Error('api error');
    }
    const data : TrolleyOnProductDB = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
  }

}
