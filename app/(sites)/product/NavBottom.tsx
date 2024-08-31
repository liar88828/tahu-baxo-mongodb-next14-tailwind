'use client'
import React from 'react'
import { useRouter } from "next/navigation";

export default function NavBottom() {
  const route = useRouter()
  return (
    <div className='fixed bottom-0 right-0 left-0 bg-base-100 px-2 grid grid-cols-2 gap-2'>
      <button
        onClick={() => route.push('/trolley')}

        className='btn btn-outline w-full font-bold text-lg'
      >
        Add Trolley
      </button>
      <button
        className='btn btn-primary w-full font-bold text-lg'
      >
        Buy Now
      </button>
    </div>
  )
}
