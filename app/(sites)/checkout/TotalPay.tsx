'use client'
import React, { useEffect, useState } from "react";
import { Rupiah } from "@/lib/utils/formatMoney";
import { onTransaction } from "@/server/action/transaction.action";
import { useDelivery } from "@/store/useDelivery";
import { useReceiver } from "@/store/useReceiver";
import { useBank } from "@/store/useBank";
import { useTrolley } from "@/store/useTrolley";
import { useCheckout } from "@/store/useCheckout";

export function TotalPay() {
  const [message, setMessage] = useState()
  const [rupiah, setRupiah] = useState<string>()
  const { delivery } = useDelivery()
  const { receiver } = useReceiver()
  const { bank } = useBank()
  const { trolley, totalTrolley, } = useTrolley()
  const { description, totalPay } = useCheckout()
  
  useEffect(() => {
    const total = totalTrolley()
    totalPay(total)
    setRupiah(description.totalPrice ? Rupiah(description.totalPrice) : 'Rp0')
  }, [trolley, description.shippingCost])
  
  const onCheckout = async () => {
    const data = { delivery, receiver, bank, trolley, description }
    const res = await onTransaction(data)
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
          { rupiah }
          
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
