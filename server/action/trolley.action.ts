import { config } from "@/config/baseConfig";
import { GetAllTrolley, TrolleyDataId, TrolleyResponse } from "@/interface/model/trolley.type";

export async function getTrolleyAll({ id }: TrolleyDataId) {
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
