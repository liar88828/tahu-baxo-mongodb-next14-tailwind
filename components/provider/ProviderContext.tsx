"use client"
import React, { createContext, ReactNode, useState } from "react"
import { DeliveryDB, ReceiverDB, TrolleyDB } from "@prisma/client"
import { GetAllTrolleyContext } from "@/interface/model/trolley.type"
import { BankData } from "@/interface/model/bank.type"
import { DescriptionCheckout } from "@/store/useCheckout";

type TrolleyContext = TrolleyDB & { price: number }

export type TCheckoutContext = {
  receiver: ReceiverDB | null
  // trolley: TrolleyContext | null,
  trolley: GetAllTrolleyContext[]
  bank: BankData | null
  delivery: DeliveryDB | null
  description: DescriptionCheckout
}
export type TProviderCheckout = {
  state: TCheckoutContext
  reduce: React.Dispatch<React.SetStateAction<TCheckoutContext>>
  removeUser: () => void
  addUser: (user: ReceiverDB) => void
  // removeTrolley: () => void
  // addTrolley: (trolley: TrolleyContext) => void
  removeTrolleyMany: (trolleyId: number) => void
  addTrolleyMany: (trolley: GetAllTrolleyContext) => void
  removeBank: () => void
  addBank: (bank: BankData) => void
  removeDelivery: () => void
  addDelivery: (delivery: DeliveryDB) => void
  description: (item: Partial<DescriptionCheckout>) => void
  getTotalPrice: () => number
}
const initialState: TCheckoutContext = {
  receiver: null,
  // trolley: null,
  trolley: [],
  bank: null,
  delivery: null,
  description: {
    note: "",
    distance: "",
    packing: "",
    shippingCost: 0,
    totalPrice: 0,
    subTotal: 0
  },
}
const ContextTrolley = createContext<TProviderCheckout>({
  state: initialState,
  reduce: () => {
  },
  removeUser: () => {
  },
  addUser: () => {
  },
  // addTrolley: () => {
  // },
  // removeTrolley: () => {
  // },
  addTrolleyMany: () => {
  },
  removeTrolleyMany: () => {
  },
  addBank: () => {
  },
  removeBank: () => {
  },
  addDelivery: () => {
  },
  removeDelivery: () => {
  },
  description: () => {
  },
  getTotalPrice: () => 0,
})

export default function ProviderContext({ children }: { children: ReactNode }) {
  // is access token
  const [checkout, setCheckout] = useState<TCheckoutContext>(initialState)
  
  const addUser = (receiver: ReceiverDB) =>
    setCheckout((prevState) => ({
      ...prevState,
      receiver: receiver,
    }))
  
  const removeUser = () =>
    setCheckout((prevState) => ({
      ...prevState,
      user: null,
    }))
  
  // const addTrolley = (trolley: TrolleyContext,) => setCheckout(prevState => ({
  // 	...prevState, trolley: trolley
  // }))
  // const removeTrolley = () => setCheckout(prevState => ({
  // 	...prevState, trolley: null
  // }))
  //
  const addTrolleyMany = (trolley: GetAllTrolleyContext) =>
    setCheckout((prevState) => ({
      ...prevState,
      trolleyMany: [...prevState.trolley, trolley],
    }))
  
  const removeTrolleyMany = (trolleyId: number) =>
    setCheckout((prevState) => ({
      ...prevState,
      trolleyMany: prevState.trolley.filter((t) => t.id !== trolleyId),
    }))
  
  const addBank = (bank: BankData) =>
    setCheckout((prevState) => ({
      ...prevState,
      bank,
    }))
  const removeBank = () =>
    setCheckout((prevState) => ({
      ...prevState,
      bank: null,
    }))
  const addDelivery = (delivery: DeliveryDB) =>
    setCheckout((prevState) => ({
      ...prevState,
      delivery,
    }))
  const removeDelivery = () =>
    setCheckout((prevState) => ({
      ...prevState,
      delivery: null,
    }))
  const description = (value: Partial<DescriptionCheckout>) => {
    setCheckout((prevState) => ({
      ...prevState,
      description: {
        ...prevState.description,
        ...value,
      },
    }))
  }
  const getTotalPrice = () => {
    let totalProduct = checkout.trolley.reduce(
      (a, b) => a + b.Product.price * b.qty,
      0
    )
    // setCheckout(prevState => ({ ...prevState, description: { ...prevState.description, totalPrice: totalProduct } }))
    
    return totalProduct + checkout.description.totalPrice
  }
  // setCheckout(prevState => ({
  // 	...prevState,
  // 	description: {
  // 		...prevState.description,
  // 		price: totalProduct
  // 	}
  // }))
  
  return (
    <ContextTrolley.Provider
      value={ {
        state: checkout,
        reduce: setCheckout,
        addUser,
        removeUser,
        // addTrolley,
        // removeTrolley,
        addBank,
        removeBank,
        addDelivery,
        removeDelivery,
        removeTrolleyMany,
        addTrolleyMany,
        description,
        getTotalPrice,
      } }
    >
      { children }
    </ContextTrolley.Provider>
  )
}
