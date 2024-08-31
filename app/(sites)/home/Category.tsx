'use client'
import { repeat } from '@/lib/utils/repeat'
import { Icon } from '@iconify/react'
import React from 'react'

export default function Category() {
	return (
		<div className='rounded-lg'>
			<div className='grid grid-cols-4 gap-4'>
				{repeat(8).map((_, i) => {
					return (
						<div
							className='flex flex-col  items-center '
							key={i}>
							<button className='btn btn-circle btn-outline btn-md'>
								<Icon
									icon='ic:round-category'
									className='size-5'
								/>
							</button>
							<h1 className='font-semibold mt-2 text-sm'>Category </h1>
						</div>
					)
				})}
			</div>
		</div>
	)
}
