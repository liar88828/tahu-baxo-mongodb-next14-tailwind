import Carousel from './Carousel'
import Category from './Category'
import Navbar from './Navbar'
import NavBottom from './NavBottom'
import Product from './Product'
import { SearchInput } from "@/app/(sites)/search/SearchInput";
import React from "react";

export default function page() {
	return (
		<>
			<Navbar />
			<div className='space-y-4 p-2 pb-20'>
				<SearchInput />
				<Carousel />
				<Category />
				<Product />
				<NavBottom />
			</div>
		</>
	)
}
