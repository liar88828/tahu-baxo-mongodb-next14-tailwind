'use client'
import React from 'react'
import { usePageSearch } from "@/hook/usePageSearch";
import { useSearchParams } from "next/navigation";

export default function CategoryWrap() {
	const { addQueryParam, updateQueryParams } = usePageSearch()
	const searchParams = useSearchParams();
	
	return (
		<div>
			<div className="flex justify-between items-center w-full text-2xl mb-2 px-2">
				<h1 className={ 'font-bold text-xl' }>Category</h1>
				<button className={ 'btn btn-primary btn-sm' }>Select</button>
			</div>
			{/*justify-between*/ }
			<div className=' flex flex-wrap gap-2  '>
				{ dataCategory.map((item, i) => (
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
const dataCategory = [
	{ title: "Food" },
	{ title: "Drink" },
	{ title: "Accessories" },
	{ title: "Protection" },
	{ title: "Tiny" },
	{ title: "Health" },
	{ title: "Electronics" },
	{ title: "Clothing" },
	{ title: "Home" },
	{ title: "Beauty" },
	{ title: "Sports" },
	{ title: "Toys" },
	{ title: "Books" },
	{ title: "Music" },
	{ title: "Outdoor" }
]
