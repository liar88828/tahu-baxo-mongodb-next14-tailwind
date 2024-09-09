import React, { Suspense } from 'react'
import Product from './Product'
import { TabProduct } from './TabProduct'
import CategoryWrap from "@/app/(sites)/search/CategoryWrap";
import { ParamsProfile } from "@/interface/server/param";

export default function page(params : ParamsProfile) {
  return (<>
      <div className='space-y-4 p-3'>
        <CategoryWrap />
        {/*<Category/>*/}
				<Suspense fallback={ <div>Loading...</div> }>
        
        <TabProduct params={params} />
					<Product params={ params }/>
				</Suspense>
      </div>
    </>
  )
}
