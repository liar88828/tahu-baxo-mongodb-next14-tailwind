'use server'
import { DeliveryCreateFormError, DeliveryId } from "@/interface/model/delivery.type";
import { getAccess } from "@/server/service/auth/cookie/cookie.service";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { revalidatePath } from "next/cache";
import { errorForm } from "@/lib/error/errorForm";
import { deliveryService } from "@/server/service/delivery.service";
import { errorGetData } from "@/lib/error/errorGetData";
import { apiGetDeliveryAll, apiGetDeliveryAllPrivate, apiGetDeliveryId } from "@/server/api/delivery.api";
import { deliverySanitize } from "@/server/sanitize/delivery.sanitize";
import { redirect } from "next/navigation";

export async function getDeliveryAllPrivate(search: string) {
  try {
    const token = await getAccess()
    const { data } = await apiGetDeliveryAllPrivate(search, token)
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

export async function getDeliveryId(id : DeliveryId) {
  try {
    const { data } = await apiGetDeliveryId(id.id_delivery)
    return data
  } catch (err : unknown) {
    return errorGetData(err);
  }
}

export async function createDelivery(prevState: any, formData: FormData): Promise<OnFormState<DeliveryCreateFormError>> {
  try {
    // @ts-ignore
    const rawFormData = deliverySanitize(formData)
    const data = await deliveryService.createOne(rawFormData)
    console.log(data)
    revalidatePath('/')
    redirect('/profile/delivery')
    // return { message: 'true' }
  } catch (err) {
    console.error('on get All error', err)
    return errorForm(err)
  }
  
}
