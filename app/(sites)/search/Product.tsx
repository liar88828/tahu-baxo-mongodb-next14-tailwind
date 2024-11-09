import React from 'react'
import { ProductItemSearch } from "@/components/product/ProductItem";
import { getProductsAll } from "@/server/action/product.action";
import { ParamsClient } from "@/interface/server/param";

export default async function Product({ params: { searchParams: { search, category } } }: { params: ParamsClient }) {
	const data = await getProductsAll(search, category)
	
	if (!data) {
		return <h1>Data Bank is Not found</h1>
	}
	return (
		<div>
			{/*<TitleSearch title={ `Result : ${ data.data.length }` }/>*/ }
			<div className='grid-card'>
				<ProductItemSearch data={ data.data }/>
			</div>
		</div>
	)
}
