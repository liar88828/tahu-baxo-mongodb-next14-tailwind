'use client'
import React from 'react'
import { useRouter } from "next/navigation";

export default function NavBottom() {
  const route = useRouter()
  return (
    <div className='fixed bottom-0 right-0 left-0  px-2 border-t-2 rounded-t-xl pb-2 bg-base-100 '>
      <div className='flex justify-between items-center p-2'>
        <h1 className='text-lg '>Promo</h1>
        <h1 className='text-lg font-bold'>Rp21312.23</h1>
      </div>
      <div className='flex justify-between items-center p-2'>
        <h1 className='text-lg '>Discount</h1>
        <h1 className='text-lg font-bold'>Rp21312.23</h1>
      </div>
      <div className='flex justify-between items-center p-2 mb-2'>
        <h1 className='text-lg font-semibold'>Total</h1>
        <h1 className='text-lg font-bold'>Rp21312.23</h1>
      </div>
      <button
        onClick={ () => route.push('/checkout') }
        className='btn btn-primary w-full font-bold text-lg'
      >
        Checkout (Rp1231.23)
      </button>
    </div>
  )
}
