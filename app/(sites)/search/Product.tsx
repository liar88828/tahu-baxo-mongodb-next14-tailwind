import React from 'react'
import { ProductItem } from "@/components/ProductItem";
import { TitleCard } from "@/components/TitleCard";
import { getProductsAll } from "@/server/action/product.action";

export default async function Product() {
  const data = await getProductsAll()
  if (!data) {
    return <h1>Data Bank is Not found</h1>
  }
  return (
    <div>
      <TitleCard
        title="Result : 1234"
        button={''}
      />
      <div className='grid grid-cols-2 gap-3'>
        {data.map((item, i) => {
          return <ProductItem item={item} key={item.id} />
        })}
      </div>
    </div>
  )
}
