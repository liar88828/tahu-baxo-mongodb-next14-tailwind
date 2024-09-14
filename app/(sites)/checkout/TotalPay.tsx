'use client'
import { useRouter } from "next/navigation";
import React, { useCallback, useContext } from "react";
import { ContextTrolley } from "@/components/provider/ProviderContext";
import { Rupiah } from "@/lib/utils/formatMoney";
import { onTransaction } from "@/server/action/transaction.action";

export function TotalPay() {
  const route = useRouter()
  const { state, getTotalPrice } = useContext(ContextTrolley)
  let price = useCallback(() => {
      return getTotalPrice()
    },
    [state.trolleyMany, state.description.price])
  
  console.log(state)
  const onCheckout = async () => {
    onTransaction({
      order: {
        name: state.user!!.name,
        from: state.user!!.address,
        status: 'Waiting',
        phone: state.user!!.phone,
        location: state.user!!.address,
        desc: state.description.note,
        shipping_cost: state.description.price,
        sender: state.delivery!!.name,
        total: price()
      },
      transaction: {
        receiverDBId: 1,
        deliveryDBId: state.delivery!!.id,
        bankDBId: state.bank!!.id,
      },
      trollyIds: state.trolleyMany.map(item => {
        return {
          id: item.id,
          userId: state.user!!.id
        }
      })
    })
    route.push('/transaction')
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
      <button
        onClick={ onCheckout }
        className='btn btn-primary w-full font-bold text-lg  '
      >
        Buy Now
      </button>
    </div>

  )
}
