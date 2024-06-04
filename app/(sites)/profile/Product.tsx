'use client'
import { repeat } from '@/lib/utils/repeat'
import React from 'react'

export function Product() {
	return (
		<div>
			<div className='flex justify-between px-4'>
				<h1 className='font-bold text-xl'>Flash sale</h1>
				<p>View more</p>
			</div>
			<div className='grid grid-cols-2 gap-2'>
				{repeat(8).map((_, i) => {
					return <ProductItem key={i} />
				})}
			</div>
		</div>
	)
}

export function ProductItem() {
	return (
		<div className='rounded-lg p-1 '>
			<div className=''>
				<img
					src='https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b'
					alt='image'
					className='h-auto w-full rounded-lg'
				/>
			</div>
			<div className='mt-1'>
				<h1 className='font-light text-md'>Lorem, ipsum dolor.</h1>
				<div className='flex'>
					<h2 className='font-bold text-lg'>Rp400.00</h2>
					<h3 className='font-light text-sm line-through'>-50%</h3>
				</div>
			</div>
		</div>
	)
}
