import React from 'react'
import { CarouselImageDetail } from '../CarouselImageDetail'
import { Description } from "@/app/(sites)/product/description";
import NavBottom from "@/app/(sites)/product/NavBottom";
import { getProductId } from "@/server/action/product.action";
import { ParamsProduct } from "@/interface/server/param";
import { ProductItem } from "@/components/ProductItem";
import { TitleMore } from "@/components/TitleSearch";

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
					<div className="grid grid-cols-2 gap-2 ">
						<ProductItem/>
					</div>
				</div>
			</div>
			<NavBottom params={ params }/>
    </>
  )
}
