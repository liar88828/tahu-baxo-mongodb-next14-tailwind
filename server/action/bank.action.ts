'use server'
import { getCookieUser } from "@/server/service/auth/cookie/cookie.service";
import { OnFormState } from "@/app/(sites)/auth/register/page";
import { revalidatePath } from "next/cache";
import { errorForm } from "@/lib/error/errorForm";
import { BankCreateFormError, BankCreateKey, BankUpdateFormError, BankUpdateKey } from "@/interface/model/bank.type";
import { bankService } from "@/server/service/bank.service";
import { errorGetData } from "@/lib/error/errorGetData";
import { apiGetBankAll, apiGetBankAllPrivate, apiGetBankId } from "@/server/api/bank.api";
import { bankSanitize } from "@/server/sanitize/bank.sanitize";
import { redirect } from "next/navigation";

export async function getBankAllPrivate(search: string) {
  try {
    const { access } = getCookieUser()
    const { data } = await apiGetBankAllPrivate(search, access)
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

export async function getBankIdPrivate(id: string | number) {
  try {
    const { access } = getCookieUser()
    const { data } = await apiGetBankId(Number(id), access)
    return data
  } catch (err : unknown) {
    return errorGetData(err);
  }
  }

export async function createBank(prevState: any, formData: FormData): Promise<OnFormState<BankCreateFormError>> {
  try {
    const { user } = getCookieUser()
    const rawFormData = bankSanitize<BankCreateKey>(formData, user.id);
    const data = await bankService.createOne(rawFormData, user)
    revalidatePath('/')
    redirect('/profile/payment')
  } catch (err) {
    // console.error('on get All error', err)
    return errorForm(err)
  }
  
}

export async function updateBank(prevState: any, formData: FormData): Promise<OnFormState<BankUpdateFormError>> {
  try {
    const { user } = getCookieUser()
    const rawFormData = bankSanitize<BankUpdateKey>(formData, user.id);
    
    const data = await bankService.updateOne({
      id_bank: Number(formData.get('id_bank')),
      id_user: user.id
    }, rawFormData)
    
    revalidatePath('/')
    redirect('/profile/payment')
  } catch (err) {
    // console.error('on get All error', err)
    return errorForm(err)
  }
  
}