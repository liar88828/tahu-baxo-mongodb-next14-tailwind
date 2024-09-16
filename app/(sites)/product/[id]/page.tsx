import React from 'react'
import { CarouselImageDetail } from '../CarouselImageDetail'
import { Description } from "@/app/(sites)/product/description";
import NavBottom from "@/app/(sites)/product/NavBottom";
import { getProductId } from "@/server/action/product.action";
import { ParamsProduct } from "@/interface/server/param";
import { ProductItem } from "@/components/product/ProductItem";

import { TitleMore } from "@/components/title/TitleMore";

export default async function page({ params }: ParamsProduct) {
  const data = await getProductId(params.id)
  if (!data) {
    return <h1>Error Bos</h1>
  }
	
	return (
    <>
			<div className=' space-y-2 pb-16'>
        <CarouselImageDetail />
        <Description item={ data }/>
				<div className="p-2">
					<TitleMore title={ 'Related Products' } button={ 'more' }/>
					<div className="grid-card ">
						<ProductItem/>
					</div>
				</div>
			</div>
			<NavBottom params={ params }/>
    </>
  )
}
