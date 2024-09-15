'use client'
import React, { useCallback, useContext, useState } from "react";
import { ContextTrolley } from "@/components/provider/ProviderContext";
import { Rupiah } from "@/lib/utils/formatMoney";
import { onTransaction } from "@/server/action/transaction.action";

export function TotalPay() {
  const [message, setMessage] = useState()
  const { state, getTotalPrice, reduce } = useContext(ContextTrolley)
  let price = useCallback(() => {
      let priceState = getTotalPrice()
      // reduce(prevState => ({ ...prevState, description: { ...prevState.description, totalPrice: priceState } }))
      return priceState
    },
    [state.trolleyMany, state.description.price])
  
  const onCheckout = async () => {
    const res = await onTransaction({
      ...state,
      description: {
        ...state.description,
        totalPrice: price(),
      }
    })
    console.log(res, 'res------')
    // @ts-ignore
    setMessage(res?.message ?? '')
  }
  
  return (<div
      data-testid={ 'checkout-TotalPay' }
      className={ 'space-y-2 ' }>
      {/*<div className='flex justify-between items-center '>*/ }
      {/*  <h1 className='text-lg '>Promo</h1>*/ }
      {/*  <h1 className='text-lg font-bold'>Rp21312.23</h1>*/ }
      {/*</div>*/ }
      {/*<div className='flex justify-between items-center '>*/ }
      {/*  <h1 className='text-lg '>Discount</h1>*/ }
      {/*  <h1 className='text-lg font-bold'>Rp21312.23</h1>*/ }
      {/*</div>*/ }
      <div className='flex justify-between items-center pb-2'>
        <h1 className='text-lg font-semibold'>Total</h1>
        <h1 className='text-lg font-bold'>
          { price() ? Rupiah(price()) : 'Rp0' }
        </h1>
      </div>
      { message ? <p className={ ' text-error' }>{ message }</p> : null }
      <button
        onClick={ onCheckout }
        className='btn btn-primary w-full font-bold text-lg  '
      >
        Buy Now
      </button>
    </div>
  )
}
