import React, { Suspense } from 'react'
import Product from './Product'
import { TabProduct } from './TabProduct'
import CategoryWrap from "@/app/(sites)/search/CategoryWrap";
import { ParamsProfile } from "@/interface/server/param";
import { LoadingBounce } from "@/components/loading/loading";
import { getAllCategory } from "@/server/action/category.action";

export default async function page(params: ParamsProfile) {
	console.log(params)
	const category = await getAllCategory(10)
  return (<>
      <div className='space-y-4 p-3'>
				<CategoryWrap data={ category }/>
        {/*<Category/>*/}
				<Suspense fallback={ <LoadingBounce/> }>
        <TabProduct params={params} />
					<Product params={ params }/>
				</Suspense>
      </div>
    </>
  )
}
