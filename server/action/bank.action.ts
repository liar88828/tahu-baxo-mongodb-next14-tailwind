'use server'
import { getAccess, getDataClient } from "@/server/service/auth/cookie/cookie.service";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { revalidatePath } from "next/cache";
import { errorForm } from "@/lib/error/errorForm";
import { BankCreateFormError, BankId } from "@/interface/model/bank.type";
import { bankService } from "@/server/service/bank.service";
import { errorGetData } from "@/lib/error/errorGetData";
import { apiGetBankAll, apiGetBankAllPrivate, apiGetBankId } from "@/server/api/bank.api";
import { bankSanitize } from "@/server/sanitize/bank.sanitize";
import { redirect } from "next/navigation";

export async function getBankAllPrivate(search: string) {
  
  const token = await getAccess()
  
  try {
    const { data } = await apiGetBankAllPrivate(search, token)
    return data
  } catch (err: unknown) {
    return errorGetData(err);
    
  }
}


export async function getBankAll() {
  try {
    const { data } = await apiGetBankAll()
    return data
  } catch (err : unknown) {
    return errorGetData(err);
    
  }
}

export async function getBankId(id : BankId) {
  try {
    const { data } = await apiGetBankId(id.id_bank)
    return data
  } catch (err : unknown) {
    return errorGetData(err);
    
  }
  }

export async function createBank(prevState: any, formData: FormData): Promise<OnFormState<BankCreateFormError>> {
  try {
    const user = await getDataClient()
    const rawFormData = bankSanitize(formData, user.id);
    const data = await bankService.createOne(rawFormData)
    
    console.log(data)
    revalidatePath('/')
    redirect('/profile/payment')
  } catch (err) {
    console.error('on get All error', err)
    return errorForm(err)
  }
  
}