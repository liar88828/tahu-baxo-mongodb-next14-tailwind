'use client'
import { repeat } from '@/lib/utils/repeat'
import React from 'react'
import { ProductItem } from "@/components/ProductItem";

export default function Product() {
	return (
		<div className='p-2'>
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
