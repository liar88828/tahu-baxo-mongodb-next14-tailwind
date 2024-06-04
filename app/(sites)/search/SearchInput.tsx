'use client'
import { Icon } from "@iconify/react";

export function SearchInput() {
	return (
		<div className='join w-full '>
			<input
				className='input input-bordered join-item w-full  rounded-l-full '
				placeholder='Search'
			/>
			<button className='btn join-item rounded-r-full '>
				<Icon
					icon='ic:round-search'
					className='size-8'
				/>
			</button>
		</div>
	)
}
