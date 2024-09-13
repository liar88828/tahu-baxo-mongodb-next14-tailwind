'use server'
import { config } from "@/config/baseConfig";
import { BankDB } from "@prisma/client";
import { ResponseData } from "@/interface/server/IService";
import { authCookie } from "@/server/api/authCookie";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { revalidatePath } from "next/cache";
import { errorForm } from "@/lib/error/errorForm";
import { BankCreateFormError, BankCreateKey, BankId } from "@/interface/model/bank.type";
import { bankService } from "@/server/service/bank.service";
import { errorApi } from "@/lib/error/errorApi";
import { errorGetData } from "@/lib/error/errorGetData";

export async function getBankAllPrivate(search: string) {
  const token = authCookie().getAuth()
  
  try {
    const res = await fetch(`${ config.url }/api/bank/user?search=${ search }`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${ token.accessToken }`
      },
      cache: "no-cache",
    })
    if (!res.ok) {
      errorApi(res.status, 'product', await res.json())
    }
    const data: ResponseData<BankDB> = await res.json()
    return data
  } catch (err: unknown) {
    return errorGetData(err);
    
  }
}


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
    return errorGetData(err);
    
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
    return errorGetData(err);
    
  }
  }

export async function createBank(prevState: any, formData: FormData): Promise<OnFormState<BankCreateFormError>> {
  try {
    // const rawFormData = Object.fromEntries(formData.entries())
    // @ts-expect-error
    const rawFormData: BankCreateKey = {
      name: formData.get('name') ?? '',
      type: formData.get('type') ?? '',
      location: formData.get('location') ?? '',
      desc: formData.get('desc') ?? '',
      userId: authCookie().getAuth().data.id,
      no_req: formData.get('no_req'),
      phone: formData.get('no_req'),
      
    }
    // console.log(rawFormData)
    const data = await bankService.createOne(rawFormData)
    revalidatePath('/')
    console.log(data)
    // redirect('/profile')
    return { message: 'true' }
  } catch (err) {
    console.error('on get All error', err)
    return errorForm(err)
  }
  
}