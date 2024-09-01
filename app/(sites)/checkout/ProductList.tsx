'use client'

import { repeat } from '@/lib/utils/repeat'

import React from 'react'
import { ProductListItem } from "@/app/(sites)/trolley/ProductList";

export function ProductList() {
  return (
    <div className="">
      <div className="flex justify-between items-center w-full text-2xl mb-2 ">
        <h1 className={'font-bold text-xl'}>Product List</h1>
        <button className={'btn btn-primary btn-sm'}>Show</button>
      </div>
      <div className='space-y-2 h-56 overflow-y-auto'>
        {repeat(20).map((_, index) => (
          <ProductListItem key={index} />
        ))}
      </div>
      <textarea
        className={'textarea textarea-bordered w-full shadow mt-1'}
        placeholder='Write a description...'
      ></textarea>
    </div>
  )
}
