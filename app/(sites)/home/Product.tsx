import React from 'react'
import { ProductItem } from "@/components/product/ProductItem";
import { TitleMore } from "@/components/title/TitleMore";

export default async function Product() {
	
	return (
		<div className=''>
			<TitleMore
				title={ 'Flash Sale' }
				button={ 'View more' }
			/>
			<div className='grid-card'>
				<ProductItem/>
			</div>
		</div>
	)
}
