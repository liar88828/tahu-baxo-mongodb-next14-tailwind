import React from 'react'
import { TitleSearch } from "@/components/TitleSearch";
import { IconSearch } from "@/components/icon/IconMore";
import { getProductsAllPrivate } from "@/server/action/product.action";
import { ProductItemPrivate } from "@/components/ProductItem";
import { Loading } from "@/components/loading";

export async function ProductList({ search }: { search: string }) {
	const product = await getProductsAllPrivate(search)
	if (!product) {
		return <Loading/>
	}
	return (
		<div>
			<TitleSearch
				title={ `Result :${ product.data.length }` }
				button={ <IconSearch/> }
			/>
			<div className='grid-card'>
				<ProductItemPrivate data={ product.data }/>
			</div>
		</div>
	)
}
