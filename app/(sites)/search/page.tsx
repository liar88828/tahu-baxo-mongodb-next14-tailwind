import React from 'react'
import Product from './Product'
import { TabProduct } from './TabProduct'
import Category from "@/app/(sites)/search/Category";
import { ParamsProfile } from "@/interface/ParamsProfile";

export default function page(params : ParamsProfile) {
  return (<>
      <div className='space-y-4 p-3'>
        <Category />
        <TabProduct params={params} />
        <Product />
      </div>
    </>
  )
}
