'use client'
import React from 'react'

export default function NavBottom() {
	return (
		<div className='fixed bottom-0 right-0 left-0 bg-base-100 px-2'>
			<div className='flex justify-between items-center p-2'>
				<h1 className='text-lg '>Promo</h1>
				<h1 className='text-lg font-bold'>Rp21312.23</h1>
			</div>
			<div className='flex justify-between items-center p-2'>
				<h1 className='text-lg '>Discount</h1>
				<h1 className='text-lg font-bold'>Rp21312.23</h1>
			</div>
			<div className='flex justify-between items-center p-2'>
				<h1 className='text-lg font-semibold'>Total</h1>
				<h1 className='text-lg font-bold'>Rp21312.23</h1>
			</div>
			<button className='btn btn-primary w-full font-bold text-lg'>
				Checkout (Rp1231.23)
			</button>
		</div>
	)
}