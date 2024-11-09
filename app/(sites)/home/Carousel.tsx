import React from 'react'
import { repeat } from "@/lib/utils/repeat";

export default function Carousel() {
	return (
		<div>
			<div className='carousel w-full space-x-2  px-5'>
				{ repeat().map((item, i) => (
					<CarouselItem key={ i } index={ i }/>)) }
			</div>
		</div>
	)
}

export function CarouselItem({ index }: { index: number }) {
	return (
		<div
			id={ `item_${ index }` }
			className='carousel-item w-full flex justify-center p-1'
		>
			<div
				className={ `rounded-xl h-40 w-full object-cover shadow-md flex  ${ index % 2 === 0 ? 'bg-blue-400' : 'bg-red-400' }` }
			>
				<div className="py-5 pl-5 flex justify-between flex-col">
					<h1 className={ 'text-xl font-extrabold text-base-300/80' }>Up to 65% Off on All Products </h1>
					<h2 className={ ' text-md font-medium text-base-300/60' }>Lorem ipsum dolor sit amet</h2>
				</div>
				<img
					src='/xbox.png'
					className=' h-40 w-auto object-cover'
				/>
			</div>
		</div>
	);
}
