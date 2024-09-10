import React from 'react'
import { ProductListItem } from "@/app/(sites)/trolley/ProductList";
import { getTrolleyPrivate } from "@/server/action/trolley.action";

export async function ProductList() {
	const data = await getTrolleyPrivate()
  if (!data) {
		return <h1>Product data is Not found</h1>
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
                trolley={ item }
                product={ item.Product }
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
