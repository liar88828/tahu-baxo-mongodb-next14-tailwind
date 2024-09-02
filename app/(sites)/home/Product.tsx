import React from 'react'
import { ProductItem } from "@/components/ProductItem";
import { TitleCard } from "@/components/TitleCard";
import { getProductsAll } from "@/server/action/product.action";

export default async function Product() {
  const data = await getProductsAll()
  if (!data) {
    return <h1>Error Bos</h1>
  }
  return (
    <div className=''>
      <TitleCard
        title={'Flash Sale'}
        button={'View more'}
      />
      <div className='grid grid-cols-2 gap-3'>
        {data.map((item) => {
          return <ProductItem item={item} key={item.id} />
        })}
      </div>
    </div>
  )
}
