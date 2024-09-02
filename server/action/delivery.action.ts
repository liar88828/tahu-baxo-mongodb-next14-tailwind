import { config } from "@/config/baseConfig";
import { BankDB, DeliveryDB } from "@prisma/client";
import { DeliveryId } from "@/server/schema/deliver.schema";

export async function getDeliveryAll() {
  try {
    const res = await fetch(`${config.url}/api/delivery/`, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
      throw new Error('api error');
    }
    const data : DeliveryDB[] = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
  }
}

export async function getDeliveryId(id : DeliveryId) {
  try {
    const res = await fetch(`${config.url}/api/bank/${id.id_delivery}`, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
      throw new Error('api error');
    }
    const data : BankDB = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
  }
}
