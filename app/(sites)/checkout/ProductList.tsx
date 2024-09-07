import React from 'react'
import { ProductListItem } from "@/app/(sites)/trolley/ProductList";
import { getTrolleyAll } from "@/server/action/trolley.action";
import { TrolleyDataId } from "@/interface/model/trolley.type";

export async function ProductList({ itemProps }: { itemProps: TrolleyDataId }) {
  const data = await getTrolleyAll(itemProps)
  if (!data) {
    return <h1>Data Bank is Not found</h1>
  }
  return (
    <div className="">
      <div className="flex justify-between items-center w-full text-2xl mb-2 ">
        <h1 className={'font-bold text-xl'}>Product List</h1>
        <button className={'btn btn-primary btn-sm'}>Show</button>
      </div>
      <div className='space-y-2 h-56 overflow-y-auto'>
        {
          data.map((item) => {
            return (item.Product ?
              <ProductListItem
                key={ item.productId }
                item={ item.Product }
              />
              : null)
          }) }
      </div>
      <textarea
        className={'textarea textarea-bordered w-full shadow mt-1'}
        placeholder='Write a description...'
      ></textarea>
    </div>
  )
}
