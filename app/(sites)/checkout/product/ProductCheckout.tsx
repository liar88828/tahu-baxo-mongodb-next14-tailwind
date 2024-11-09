import React from 'react'
import { ProductItemCheckout } from "@/app/(sites)/checkout/product/ProductItemCheckout";

export function ProductCheckout() {
	return (
		<>
			<div
				data-testid={ 'checkout-ProductList' }
				className="flex justify-between items-center w-full text-2xl mb-2 ">
				<h1 className={ 'font-bold text-xl' }>Product List</h1>
				{/*<button className={'btn btn-primary btn-sm'}>Show</button>*/ }
			</div>
			<div className=' '>
				<ProductItemCheckout/>
			</div>
		</ >
	)
}

