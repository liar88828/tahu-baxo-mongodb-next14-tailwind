import React from 'react'
import { TitleMore } from "@/components/TitleSearch";
import { ProductItem } from "@/components/ProductItem";

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
