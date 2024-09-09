'use client'
import React from 'react'
import { usePageSearch } from "@/hook/usePageSearch";
import { useSearchParams } from "next/navigation";
import { categoryProduct } from "@/assets/category";

export default function CategoryWrap() {
	const { addQueryParam, updateQueryParams } = usePageSearch()
	const searchParams = useSearchParams();
	
	return (
		<div>
			<div className="flex justify-between items-center w-full text-2xl mb-2 px-2">
				<h1 className={ 'font-bold text-xl' }>Category</h1>
				{/*<button className={ 'btn btn-primary btn-sm' }>Select</button>*/ }
			</div>
			{/*justify-between*/ }
			<div className=' flex flex-wrap gap-2  '>
				{ categoryProduct.map((item, i) => (
					<button
						onClick={ () => updateQueryParams('category', item.title) }
						key={ i }
						className={ `btn btn-sm shadow ${ searchParams.get('category') === item.title && 'btn-active' }` }
					>{ item.title }</button>
				)) }
			</div>
		</div>
	)
}
