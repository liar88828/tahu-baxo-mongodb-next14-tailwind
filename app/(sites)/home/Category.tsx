'use client'
import { Icon } from '@iconify/react'
import React from 'react'
import Link from "next/link";
import { categoryProduct } from "@/assets/category";

export default function Category() {
	const categoryItem = categoryProduct.map((item,) => {
		return (
			<div
				className='flex flex-col items-center '
				key={ item.title }
			>
				<Link
					href={ item.link }
					className='btn btn-circle '
				>
					<Icon
						icon={ item.icon }
						className='size-8'
					/>
				</Link>
				<h1 className='text-center font-bold teexxt-neutral/80  mt-2 text-xs'>{ item.title }</h1>
			</div>
		)
	})
	return (
		<div className='rounded-lg shadow p-2 bg-base-200/40 overflow-y-scroll h-48'>
			<div
				className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9  gap-2 '>{ categoryItem }</div>
		</div>
	)
}

