'use client'
import { useRouter } from "next/navigation";
import React, { useCallback, useContext } from "react";
import { ContextTrolley } from "@/components/provider/ProviderContext";
import { Rupiah } from "@/lib/utils/formatMoney";

export function TotalPay() {
  const route = useRouter()
  const { state } = useContext(ContextTrolley)
  let price = useCallback(() => {
      let totalProduct = state.trolleyMany.reduce((a, b) => a + (b.price * b.qty), 0)
      return totalProduct + state.description.price
    },
    [state.trolleyMany, state.description.price])
  
  console.log(state)
  return (<div className={'space-y-2 '}>
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
        onClick={ () => route.push('/transaction') }
        className='btn btn-primary w-full font-bold text-lg  '
      >
        Buy Now
      </button>
    </div>

  )
}
