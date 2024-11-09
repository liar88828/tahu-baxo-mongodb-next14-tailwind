"use server"
import { getCookieUser, getDataClient } from "@/server/service/auth/cookie/cookie.service"
import { transactionService, } from "@/server/service/transaction.service"
import { errorForm } from "@/lib/error/errorForm"
import { TCheckoutContext } from "@/components/provider/ProviderContext"
import { CheckoutCreateFormError, CheckoutCreateMany, } from "@/interface/model/checkout.type"
import { config } from "@/config/baseConfig";

export async function transactionCreate(token: string) {
  return fetch(`${ config.url }/api/transactions/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({}),
  })
}

export async function onTransaction(state: TCheckoutContext) {
  try {
    if (!state.bank) {
      return { message: "Payment method is required" }
    }
    if (!state.delivery) {
      return { message: "Delivery is required" }
    }
    if (!state.receiver) {
      return { message: "Receiver is required" }
    }
    if (state.trolley.length === 0) {
      return { message: "Please Add Trolley is required" }
    }
    const auth = await getDataClient()
    if (!auth) {
      return { message: "please login " }
    }
    
    const sanitize: CheckoutCreateMany = {
      order: {
        name: state.receiver.name,
        from: state.receiver.address,
        status: "Waiting",
        phone: state.receiver.phone,
        location: state.receiver.address,
        desc: state.description.note,
        shipping_cost: state.description.shippingCost,
        sender: state.delivery.name,
        sub_total: state.description.subTotal,
        total: state.description.totalPrice,
      },
      transaction: {
        receiverDBId: state.receiver.id,
        deliveryDBId: state.delivery.id,
        bankDBId: state.bank.id,
        userId: auth.id,
      },
      
      trollyIds: state.trolley.map((item) => {
        return {
          id: item.id,
          userId: auth.id,
        }
      }),
    }
    // console.log(sanitize)
    const res = await transactionService.createMany(sanitize, auth)
    return {
      data: res,
      message: "true",
      success: true
    }
    // return { message: "dtrue" }
    // redirect(`/transaction/${ res.transactionDB.id }`)
  } catch (e) {
    return {
      ...errorForm<CheckoutCreateFormError>(e) as { message: string },
      data: {},
      success: false
    }
  }
}

export async function getTransaction(limit: number = 10) {
  try {
    const { user } = getCookieUser()
    return await transactionService.findAll(1, limit, user)
  } catch (e: unknown) {
    console.error(e)
    return null
  }
}

export async function getTransactionAll(page: number = 1, limit: number = 100) {
  try {
    const auth = await getDataClient()
    return await transactionService.findAll(page, limit, auth)
  } catch (e: unknown) {
    console.error(e)
    return null
  }
}

export async function getTransactionCompleteById(id: number) {
  try {
    const { user } = getCookieUser()
    return transactionService.findCompleteById(id, user)
  } catch (e: unknown) {
    console.error(e)
    return null
  }
}

export async function getTransactionComplete() {
  try {
    const { user } = getCookieUser()
    return transactionService.findAllComplete(user)
  } catch (e: unknown) {
    console.error(e)
    return null
  }
}
