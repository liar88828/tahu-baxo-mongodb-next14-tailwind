import React from 'react'
import { getTrolleyPrivate } from "@/server/action/trolley.action";
import { ProductItem } from "@/app/(sites)/trolley/ProductItem";
import { ProductNote } from "@/app/(sites)/checkout/product/ProductNote";

export async function ProductList() {
	const data = await getTrolleyPrivate()
  if (!data) {
		return <h1>Product data is Not found</h1>
  }
  return (
    <div className="">
      <div
        data-testid={ 'checkout-ProductList' }
        className="flex justify-between items-center w-full text-2xl mb-2 ">
        <h1 className={'font-bold text-xl'}>Product List</h1>
        <button className={'btn btn-primary btn-sm'}>Show</button>
      </div>
      <div className='space-y-2 h-56 overflow-y-auto'>
        {
          data.map((item) => {
            return (item.Product ?
              <ProductItem
                key={ item.productId }
                trolley={ item }
                product={ item.Product }
              />
              : null)
          }) }
      </div>
      <ProductNote/>
    </div>
  )
}

