'use server'
import { config } from "@/config/baseConfig";
import { BankDB, DeliveryDB } from "@prisma/client";
import { DeliveryCreateFormError, DeliveryCreateKey, DeliveryId } from "@/interface/model/delivery.type";
import { ResponseData } from "@/interface/server/IService";
import { authCookie } from "@/server/api/authCookie";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { revalidatePath } from "next/cache";
import { errorForm } from "@/lib/error/errorForm";
import { deliveryService } from "@/server/service/delivery.service";
import { errorApi } from "@/lib/error/errorApi";
import { errorGetData } from "@/lib/error/errorGetData";

export async function getDeliveryAllPrivate(search: string) {
  const token = authCookie().getAuth()
  try {
    const res = await fetch(`${ config.url }/api/delivery/user?search=${ search }`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${ token.accessToken }`
      },
      cache: "no-cache",
    })
    if (!res.ok) {
      errorApi(res.status, 'trolley', await res.json())
    }
    const data: ResponseData<DeliveryDB> = await res.json()
    return data
  } catch (err: unknown) {
    return errorGetData(err);
  }
}

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
      errorApi(res.status, 'trolley', await res.json())
    }
    const data: ResponseData<DeliveryDB> = await res.json()
    return data
  } catch (err : unknown) {
    return errorGetData(err);
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
      errorApi(res.status, 'trolley', await res.json())
    }
    const data : BankDB = await res.json()
    return data
  } catch (err : unknown) {
    return errorGetData(err);
  }
}

export async function createDelivery(prevState: any, formData: FormData): Promise<OnFormState<DeliveryCreateFormError>> {
  try {
    // @ts-ignore
    const rawFormData: DeliveryCreateKey = {
      name: formData.get('name') ?? '',
      type: formData.get('type') ?? '',
      location: formData.get('location') ?? '',
      desc: formData.get('desc') ?? '',
      price: Number(formData.get('price')),
      userId: authCookie().getAuth().data.id,
      phone: formData.get('phone'),
    }
    // console.log(rawFormData)
    const data = await deliveryService.createOne(rawFormData)
    revalidatePath('/')
    console.log(data)
    return { message: 'true' }
  } catch (err) {
    console.error('on get All error', err)
    return errorForm(err)
  }
  
}
