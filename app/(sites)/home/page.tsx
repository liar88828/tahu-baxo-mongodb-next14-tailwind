import Carousel from './Carousel'
import Category from './Category'
import Navbar from './Navbar'
import NavBottom from './NavBottom'
import Product from './Product'

export default function page() {
	return (
		<>
			<Navbar />
			<div className='space-y-2 p-2'>
				<Carousel />
				<Category />
				<Product />
				<NavBottom />
			</div>
		</>
	)
}
