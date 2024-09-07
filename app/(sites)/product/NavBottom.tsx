import React from 'react'
import Link from "next/link";

export default function NavBottom() {
  return (
    <div className='fixed bottom-0 right-0 left-0 bg-base-100 p-2 grid grid-cols-2 gap-2'>
      <Link
        href={'/trolley'}
        className='btn btn-outline w-full font-bold text-lg'
      >
        Add Trolley
      </Link>
      <button
        className='btn btn-primary w-full font-bold text-lg'
      >
        Buy Now
      </button>
    </div>
  )
}
