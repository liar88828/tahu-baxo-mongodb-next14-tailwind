'use client'
import { useRouter } from "next/navigation";
import React from "react";

export function TotalPay() {
  const route = useRouter()

  return (<div className={'space-y-2'}>
      <div className='flex justify-between items-center '>
        <h1 className='text-lg '>Promo</h1>
        <h1 className='text-lg font-bold'>Rp21312.23</h1>
      </div>
      <div className='flex justify-between items-center '>
        <h1 className='text-lg '>Discount</h1>
        <h1 className='text-lg font-bold'>Rp21312.23</h1>
      </div>
      <div className='flex justify-between items-center pb-2'>
        <h1 className='text-lg font-semibold'>Total</h1>
        <h1 className='text-lg font-bold'>Rp21312.23</h1>
      </div>
      <button
        onClick={() => route.push('/home')}
        className='btn btn-primary w-full font-bold text-lg  '
      >
        Buy Now
      </button>
    </div>

  )
}
