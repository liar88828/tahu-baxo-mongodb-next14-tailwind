'use client'
import { repeat } from '@/lib/utils/repeat'
import React from 'react'
import { ProductItem } from "@/components/ProductItem";
import { TitleCard } from "@/components/TitleCard";

export default function Product() {
  return (
    <div>
      <TitleCard
        title="Result : 1234"
        button={''}
      />
      <div className='grid grid-cols-2 gap-3'>
        {repeat(8).map((_, i) => {
          return <ProductItem key={i} />
        })}
      </div>
    </div>
  )
}
