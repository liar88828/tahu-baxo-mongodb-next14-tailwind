import React from 'react'
import { ProductItem } from "@/components/ProductItem";
import { TitleCard } from "@/components/TitleCard";
import { IconFilter } from "@/components/icon/IconMore";
import { getProductsAll } from "@/server/action/product.action";

export async function DataList() {
  const data = await getProductsAll()
  if (!data) {
    return <h1>Data Product is Not found</h1>
  }
  return (
    <div>
      <TitleCard
        title={"Result : 123"}
        button={<IconFilter />}
        click={() => console.log("click")}
      />
      <div className='grid grid-cols-2 gap-2'>
        {data.map((item, i) => {
          return <ProductItem item={item} key={item.id} />
        })}
      </div>
    </div>
  )
}
