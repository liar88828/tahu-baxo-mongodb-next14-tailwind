'use client'
import React from 'react'
import { usePageSearch } from "@/hook/usePageSearch";
import { useSearchParams } from "next/navigation";
import { CategoryProductDB } from "@prisma/client";
import Link from "next/link";

export default function CategoryWrap({ data }: { data: CategoryProductDB[] }) {
	const { updateQueryParams } = usePageSearch()
	const searchParams = useSearchParams();
	return (
		<div>
			<div className="flex justify-between items-center w-full text-2xl mb-2 px-2">
				<h1 className={ 'font-bold text-xl' }>Category</h1>
				{/*<button className={ 'btn btn-primary btn-sm' }>Select</button>*/ }
			</div>
			{/*justify-between*/ }
			<div className='flex flex-wrap gap-2'>
				<Link
					role='tab'
					href={ '/search' }
					className={ `btn btn-sm shadow ${ searchParams.get('category') === null && 'btn-active' }` }>
					All
				</Link>
				{ data.map((item, i) => (
					<button
						onClick={ () => updateQueryParams('category', item.id) }
						key={ i }
						className={ `btn btn-sm shadow ${ searchParams.get('category') === item.id && 'btn-active' }` }>
						{ item.id }
					</button>
				)) }
			</div>
		</div>
	)
}
