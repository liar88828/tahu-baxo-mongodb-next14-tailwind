import { config } from "@/config/baseConfig";
import { BankDB } from "@prisma/client";
import { BankId, } from "@/server/schema/bank.schema";
import { ResponseData } from "@/interface/server/IService";

export async function getBankAll() {
  try {
    const res = await fetch(`${config.url}/api/bank/`, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
      throw new Error('bank api error');
    }
    const data: ResponseData<BankDB> = await res.json()
    return data
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.log(err.message)
      return null
    }
    return null
  }
}

export async function getBankId(id : BankId) {
  try {
    const res = await fetch(`${config.url}/api/bank/${id.id_bank}`, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
      },
      cache : "no-cache",
    })
    if (!res.ok) {
      throw new Error('bank api error');
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
