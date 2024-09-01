'use client'
import { repeat } from '@/lib/utils/repeat'
import React from 'react'
import { ProductItem } from "@/components/ProductItem";
import { TitleCard } from "@/components/TitleCard";
import { IconFilter } from "@/components/icon/IconMore";

export function DataList() {
  return (
    <div>
      <TitleCard
        title={"Result : 123"}
        button={<IconFilter />}
        click={() => console.log("click")}
      />
      <div className='grid grid-cols-2 gap-2'>
        {repeat(8).map((_, i) => {
          return <ProductItem key={i} />
        })}
      </div>
    </div>
  )
}
