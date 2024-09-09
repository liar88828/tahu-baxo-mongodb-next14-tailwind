'use client'

import { IconSearch } from "@/components/icon/IconMore";
import { usePageSearch } from "@/hook/usePageSearch";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hook/useDebounce";

export function SearchInput() {
	const { updateQueryParams } = usePageSearch();
	const [search, setSearch] = useState('')
	const value = useDebounce(search)
	
	useEffect(() => {
		updateQueryParams('search', search)
	}, [value])
	
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
				onClick={ () => {
					updateQueryParams('search', search)
				} }
				className='btn join-item rounded-r-full '>
				<IconSearch/>
			</button>
		</div>
	)
}

