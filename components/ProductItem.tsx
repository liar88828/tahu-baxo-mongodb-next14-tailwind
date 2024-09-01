'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { IconMore } from "@/components/icon/IconMore";

export function ProductItem() {
  const route = useRouter()
  return (
    <div className='rounded-lg bg-base-200/20 mb-1 shadow'
         onClick={() => route.push('/product')}
    >
      <div className=''>
        <img
          src='https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b'
          alt='image'
          className='h-auto w-full rounded-lg'
        />
      </div>
      <div className=' p-2 '>
        {/* add status*/}
        <div className="flex justify-between w-full py-1">
          <div className="badge badge-neutral badge-xs p-1">new</div>
          <div className="badge badge-xs p-1">123 sold</div>
        </div>
        <h1 className='font-light text-sm'>Lorem, ipsum dolor.</h1>
        <div className='flex justify-between'>
          <div className="flex">
            <h2 className='font-bold text-lg'>Rp400.00</h2>
            <h3 className='font-light text-sm line-through'>-50%</h3>
          </div>
          <button className={'btn  btn-circle btn-xs '}>
            <IconMore />
          </button>
        </div>
      </div>
    </div>
  )
}
