import { ProductDB } from "@prisma/client";
import Link from "next/link";
import { Rupiah } from "@/lib/utils/formatMoney";
import Rating from "@/components/elements/Rating";
import { IconMore } from "@/components/icon/IconMore";
import React from "react";

export function ProductItemCard({ item }: { item: ProductDB }) {
	return (
		<Link
			data-testid={ 'ProductItemCard' }
			key={ item.id }
			href={ `/product/${ item.id }` }
			className='rounded-lg bg-base-200/20 mb-1 shadow'
		>
			<div className=''>
				<img
					src='https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b'
					alt='image'
					className='h-auto w-full rounded-lg'
				/>
			</div>
			<div className=' p-2 '>
				{/* add status*/ }
				<div className="flex justify-between w-full py-1">
					<div className="badge badge-neutral badge-xs p-1">new</div>
					<div className="badge badge-xs p-1">123 sold</div>
				</div>
				<h1 className='font-light text-sm'>{ item.name }</h1>
				<div className='flex justify-between'>
					<div className="flex gap-1">
						<h2 className='font-bold text-lg'>{ Rupiah(item.price) }</h2>
						<h3 className='font-light text-sm line-through'>-50%</h3>
					</div>
				
				</div>
				<div className="flex w-full justify-between">
					<div className="">
						<Rating name={ `id_${ item.id }` }/> (56)
					</div>
					
					<button className={ 'btn  btn-circle btn-xs ' }>
						<IconMore/>
					</button>
				</div>
			</div>
		</Link>
	);
}