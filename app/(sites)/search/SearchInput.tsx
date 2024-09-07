'use client'

import { IconSearch } from "@/components/icon/IconMore";
import { usePageSearch } from "@/hook/usePageSearch";
import { useState } from "react";

export function SearchInput() {
	const { updateQueryParams } = usePageSearch();
	const [search, setSearch] = useState('')
	
	return (
		<div className='join w-full'>
			<input
				onChange={ (e) => {
					setSearch(e.target.value)
				} }
				className='input input-bordered join-item w-full  rounded-l-full '
				placeholder='Search ....'
			/>
			<button
				onClick={ () => updateQueryParams('search', search) }
				className='btn join-item rounded-r-full '>
				<IconSearch/>
			</button>
		</div>
	)
}
