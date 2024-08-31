'use client'
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import React from "react";

export function ProductItem() {
  const route = useRouter()
  return (
    <div className='rounded-lg  bg-base-300'
         onClick={() => route.push('/product')}
    >
      <div className=''>
        <img
          src='https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b'
          alt='image'
          className='h-auto w-full rounded-lg'
        />
      </div>
      <div className='mt-1'>
        <h1 className='font-light text-md'>Lorem, ipsum dolor.</h1>
        <div className='flex'>
          <div className="">

            <h2 className='font-bold text-lg'>Rp400.00</h2>
            <h3 className='font-light text-sm line-through'>-50%</h3>
          </div>
          <button>
            <Icon icon='more-horiz'
                  className='size-5'
            />
          </button>
        </div>
      </div>
    </div>
  )
}
