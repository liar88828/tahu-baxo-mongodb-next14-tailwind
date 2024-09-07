import React from 'react'
import { TitleCard } from "@/components/TitleCard";
import { getProductsAll } from "@/server/action/product.action";
import { ProductItem } from "@/components/ProductItem";

export default async function Product() {
	// const data = await getProductsAll()
	// if (!data) {
	// 	return <h1>Error Bos</h1>
	// }
	// console.log(data)
	return (
		<div className=''>
			<TitleCard
				title={ 'Flash Sale' }
				button={ 'View more' }
			/>
			<div className='grid grid-cols-2 gap-3'>
				{/*{ data.data.map((item) => {*/ }
				<ProductItem/>
				{/*}) }*/ }
			</div>
		</div>
	)
}
