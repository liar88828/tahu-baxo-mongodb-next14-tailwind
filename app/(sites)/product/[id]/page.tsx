import React from 'react'
import { CarouselImageDetail } from '../CarouselImageDetail'
import { Description } from "@/app/(sites)/product/description";
import NavBottom from "@/app/(sites)/product/NavBottom";
import { getProductId } from "@/server/action/product.action";
import { ParamsClient } from "@/interface/server/param";
import { ProductItem } from "@/components/product/ProductItem";

import { TitleMore } from "@/components/title/TitleMore";
import { EmptyComponent } from "@/components/error/EmptyComponent";

export default async function page({ params: { id } }: ParamsClient) {
	const data = await getProductId(Number(id))
	
	if (!data) return <EmptyComponent/>
	
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
			<NavBottom id_product={ Number(id) }/>
    </>
  )
}
