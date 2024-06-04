'use client'

import { repeat } from '@/lib/utils/repeat'
import { Icon } from '@iconify/react'

import React from 'react'

export function ProductList() {
	return (
		<div className='space-y-2'>
			{repeat(20).map((_, index) => (
				<ProductListItem key={index} />
			))}
		</div>
	)
}

export function ProductListItem() {
	return (
		<div>
			<div className='flex rounded-lg border-white/30 p-2 border-2 space-x-2'>
				{/*  image product */}
				<img
					src='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
					alt='product image'
					className='h-auto w-20 rounded-full object-fill'
				/>
				<div className='flex  w-full'>
					<div className=' w-full'>
						<div className=' flex justify-between  w-full'>
							<div className=''>
								<h1 className='text-lg font-semibold text-base-content/80'>
									Camera
								</h1>
								<h2 className='font-bold text-base-content/50'>Red</h2>
							</div>
							<button className='btn btn-circle btn-outline btn-sm'>
								<Icon
									icon='ic:round-delete'
									className='size-5'
								/>
							</button>
						</div>
						<div className='flex justify-between items-center w-full '>
							<h1 className='text-lg font-bold'>Rp. 1.000.000</h1>
							<ProductListCount />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export function ProductListCount() {
	return (
		<div className='flex space-x-2 justify-center items-center'>
			<button className='btn btn-square btn-outline btn-sm'>
				{/* icon plus */}
				<Icon
					icon='ic:round-add'
					className='size-5'
				/>
			</button>
			<h1 className='font-bold text-xl'>1</h1>
			<button className='btn btn-square btn-outline btn-sm'>
				{/* icon minus */}
				<Icon
					icon='ic:round-remove'
					className='size-5'
				/>
			</button>
		</div>
	)
}
