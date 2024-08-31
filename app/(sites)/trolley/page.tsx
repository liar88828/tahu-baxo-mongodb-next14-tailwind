'use client'
import Navbar from './Navbar'
import NavBottom from './NavBottom'
import { ProductList } from './ProductList'

export default function page() {
	return (
		<>
			<Navbar />
      <div className='p-5 space-y-2 pb-52'>
				<ProductList />
				<NavBottom />
			</div>
		</>
	)
}
