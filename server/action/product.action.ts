import { ProductDB } from ".prisma/client";
import { config } from "@/config/baseConfig";

export async function getProductsAll() {
  try {
    const res = await fetch(`${config.url}/api/products`, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
      throw new Error('api error');
    }
    const data : ProductDB[] = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
  }
}

export async function getProductId(id : number) {
  try {
    const res = await fetch(`${config.url}/api/products/${id}`, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
      throw new Error('api error');
    }
    const data : ProductDB[] = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
  }

}
