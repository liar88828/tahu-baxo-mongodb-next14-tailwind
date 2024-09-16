import React, { Suspense } from 'react'
import Product from './Product'
import { TabProduct } from './TabProduct'
import CategoryWrap from "@/app/(sites)/search/CategoryWrap";
import { ParamsProfile } from "@/interface/server/param";
import { LoadingBounce } from "@/components/loading/loading";

export default function page(params : ParamsProfile) {
  return (<>
      <div className='space-y-4 p-3'>
        <CategoryWrap />
        {/*<Category/>*/}
				<Suspense fallback={ <LoadingBounce/> }>
        <TabProduct params={params} />
					<Product params={ params }/>
				</Suspense>
      </div>
    </>
  )
}
