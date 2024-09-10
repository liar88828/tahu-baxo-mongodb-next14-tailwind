import React from 'react'
import { ProductItemSearch } from "@/components/ProductItem";
import { getProductsAll } from "@/server/action/product.action";
import { ParamsProfile } from "@/interface/server/param";

export default async function Product({ params: { searchParams: { search } } }: { params: ParamsProfile }) {
	const data = await getProductsAll(search)
	
	if (!data) {
		return <h1>Data Bank is Not found</h1>
	}
	return (
		<div>
			{/*<TitleSearch title={ `Result : ${ data.data.length }` }/>*/ }
			<div className='grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
				<ProductItemSearch data={ data.data }/>
			</div>
		</div>
	)
}
