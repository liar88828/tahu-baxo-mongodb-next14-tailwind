'use client'
import Navbar from './Navbar'
import NavBottom from './NavBottom'
import { ProductList } from './ProductList'

export default function page() {
	return (
		<>
			<Navbar />
			<div className='p-2 space-y-2'>
				<ProductList />
				<NavBottom />
			</div>
		</>
	)
}
