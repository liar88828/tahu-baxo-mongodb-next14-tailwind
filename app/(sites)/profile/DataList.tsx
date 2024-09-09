import React from 'react'
import { TitleSearch } from "@/components/TitleSearch";
import { IconSearch } from "@/components/icon/IconMore";
import { ParamsProfile } from "@/interface/server/param";
import { getProductsAllPrivate } from "@/server/action/product.action";
import { ProductItemPrivate } from "@/components/ProductItem";
import { Loading } from "@/components/loading";

export async function DataList({ params }: { params: ParamsProfile }) {
	const product = await getProductsAllPrivate(params.searchParams.search)
	if (!product) {
		return <Loading/>
	}
	return (
		<div>
			<TitleSearch
				title={ `Result :${ product.data.length }` }
				button={ <IconSearch/> }
			/>
			<div className='grid grid-cols-2 gap-2'>
				
				
				<ProductItemPrivate data={ product.data }/>
			</div>
		</div>
	)
}
