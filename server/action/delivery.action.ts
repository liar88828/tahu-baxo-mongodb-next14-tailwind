'use server'
import { DeliveryCreateFormError, DeliveryCreateKey, DeliveryUpdateKey } from "@/interface/model/delivery.type";
import { getCookieUser } from "@/server/service/auth/cookie/cookie.service";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { revalidatePath } from "next/cache";
import { errorForm } from "@/lib/error/errorForm";
import { deliveryService } from "@/server/service/delivery.service";
import { errorGetData } from "@/lib/error/errorGetData";
import { apiGetDeliveryAll, apiGetDeliveryAllPrivate, apiGetDeliveryIdPrivate } from "@/server/api/delivery.api";
import { deliverySanitize } from "@/server/sanitize/delivery.sanitize";
import { redirect } from "next/navigation";

export async function getDeliveryAllPrivate(search: string) {
  try {
    const { access } = getCookieUser()
    const { data } = await apiGetDeliveryAllPrivate(search, access)
    return data
  } catch (err: unknown) {
    return errorGetData(err);
  }
}

export async function getDeliveryAll() {
  try {
    const { data } = await apiGetDeliveryAll()
    return data
  } catch (err : unknown) {
    return errorGetData(err);
  }
}

export async function getDeliveryIdPrivate(id_delivery: number) {
  try {
    const { access } = getCookieUser()
    const { data } = await apiGetDeliveryIdPrivate(id_delivery, access)
    return data
  } catch (err : unknown) {
    return errorGetData(err);
  }
}

export async function createDelivery(prevState: any, formData: FormData): Promise<OnFormState<DeliveryCreateFormError>> {
  try {
    const { user } = getCookieUser()
    const rawFormData = deliverySanitize<DeliveryCreateKey>(formData, user)
    const data = await deliveryService.createOne(rawFormData, user)
    console.log(data)
    revalidatePath('/')
    redirect('/profile/delivery')
    // return { message: 'true' }
  } catch (err) {
    console.error('on get All error', err)
    return errorForm(err)
  }
}

export async function updateDelivery(prevState: any, formData: FormData): Promise<OnFormState<DeliveryCreateFormError>> {
  try {
    const { user } = getCookieUser()
    const rawFormData = deliverySanitize<DeliveryUpdateKey>(formData, user)
    const data = await deliveryService.updateOne({
      id_delivery: Number(formData.get('id_delivery')),
      id_user: user.id
    }, rawFormData)
    console.log(data)
    revalidatePath('/')
    redirect('/profile/delivery')
    // return { message: 'true' }
  } catch (err) {
    console.error('on get All error', err)
    return errorForm(err)
  }
  
}

