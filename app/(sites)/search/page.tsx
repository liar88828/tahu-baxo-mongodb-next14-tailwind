'use client'
import React from 'react'
import Navbar from './Navbar'
import { SearchInput } from './SearchInput'
import Product from './Product'
import { TabProduct } from './TabProduct'
export default function page() {
	return (
		<div className='space-y-2'>
			<Navbar>
				<SearchInput />
			</Navbar>
			<TabProduct />
			<Product />
		</div>
	)
}
