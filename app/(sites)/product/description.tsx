import { repeat } from "@/lib/utils/repeat";
import React from "react";
import { ProductDB } from "@prisma/client";
import { Rupiah } from "@/lib/utils/formatMoney";

export function Description({ item }: { item: ProductDB }) {
	return (
		<div className=' space-y-4'>
			
			<div className="px-4   space-y-4 pt-4">
				<div className="">
					<h1 className={ 'font-bold line-clamp-2 text-ellipsis text-3xl' }>{ item.name }</h1>
					<p className="text-muted-foreground text-lg md:text-xl">
						The ultimate productivity tool for your workspace.
					</p>
				</div>
				{/*<div className=""><IconStart/></div>*/ }
				<div className="grid gap-2">
					<div className="flex items-center gap-2">
						<StarIcon className="size-5 fill-warning"/>
						<StarIcon className="size-5 fill-warning"/>
						<StarIcon className="size-5 fill-warning"/>
						<StarIcon className="size-5 stroke-muted-foreground"/>
						<StarIcon className="size-5 stroke-muted-foreground"/>
						<span className="text-muted-foreground text-sm">4.3 (124 reviews)</span>
					</div>
				</div>
				<div className="flex">
					<h2 className={ 'font-bold text-4xl ' }>{ Rupiah(item.price) }</h2>
					<p className={ 'font-light line-through' }>{ Rupiah(item.price) }</p>
				</div>
				
				<div className="space-x-1">
					<span className={ 'font-bold text-lg ' }>Size :</span>
					<span className={ 'font-light text-lg' }>XL</span>
				</div>
				
				<div className="overflow-x-auto flex space-x-2 mt-1">
					{ repeat()
						.map((_, i) => (
							<button key={ i } className={ 'btn btn-outline btn-square btn-sm font-bold text-md' }>S</button>)
						) }
				</div>
			</div>
			
			{/*------------*/ }
			<div className="px-4 bg-base-300 space-y-10 py-10">
				<div className="">
					<h1 className={ 'text-2xl font-bold  sm:text-3xl md:text-4xl' }>Description</h1>
					<p className={ 'text-justify' }>{ item.desc }</p>
					<p className={ 'text-justify' }>The Acme Deluxe Widget is a high-quality productivity tool designed to
						streamline your workflow and boost your efficiency. Crafted with precision and attention to detail, this
						widget is built to last and provide you with years of reliable performance.</p>
				</div>
				{/*	-----------*/ }
				<div className="space-y-4">
					<h2 className={ "text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl" }>Product Details</h2>
					
					<h3 className={ 'text-lg font-semibold' }>Specifications</h3>
					<ul className="list-disc space-y-2 pl-4 list-inside">
						<li>Bluetooth 5.0 connectivity</li>
						<li>Up to 30 hours of battery life</li>
						<li>Noise-cancelling technology</li>
						<li>Lightweight and comfortable design</li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Features</h3>
					<ul className="list-disc space-y-2 pl-4 list-inside">
						<li>Immersive sound experience</li>
						<li>Seamless pairing with all devices</li>
						<li>Intuitive touch controls</li>
						<li>Foldable for easy storage</li>
					</ul>
				</div>
			</div>
			{/*	-----------*/
			}
		</div>
	)
		;
}

export function StarIcon(props: any) {
	return (
		<svg
			{ ...props }
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
		</svg>
	)
}