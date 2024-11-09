"use client"
import { IconDelete } from "@/components/icon/IconMore"
import { Rupiah } from "@/lib/utils/formatMoney"
import { ProductCount } from "@/app/(sites)/trolley/ProductCount"
import { deleteTrolley } from "@/server/action/trolley.action"
import { useTrolley } from "@/store/useTrolley"

import React, { useEffect, useState } from 'react';
import ErrorComponent, { message } from "@/components/error/ErrorComponent";
import { GetAllTrolley } from "@/interface/model/trolley.type";
import { ProductDB, TrolleyDB } from "@prisma/client";
import { SkeletonCardHorizontal } from "@/components/loading/Skeleton";

export function ProductItem({ data }: { data: GetAllTrolley[] }) {
	
	// const { addTrolleyMany, removeTrolleyMany, foundTrolley: foundTrolleyStore } = useTrolley()
	//
	// const foundTrolley = (item: TrolleyDB) => foundTrolleyStore(item)
	// const handleCheckBoxMany = (item: GetAllTrolley) => {
	//   if (!foundTrolley && item.Product) {
	//     addTrolleyMany({ ...item, Product: item.Product })
	//   } else {
	//     removeTrolleyMany(item.id)
	//   }
	// }
	
	return (
		
		<div className='space-y-4 '>
			{
				data.length === 0
					? <ErrorComponent msg={ 'Product Is Empty' } title={ message.trolley.empty }/>
					: data.map((item, index) => (
						
						item.Product
							? <ProductItems isCheck={ true } trolley={ item } product={ item.Product } key={ index }/>
							: <ErrorComponent/>))
			}
		</div>
	);
}

interface ProductItemProps {
	trolley: TrolleyDB;
	product: ProductDB;
	isCheck: boolean
	
	// handleCheckBoxMany: () => void
	// foundTrolley: boolean
}

export function ProductItems({ product, trolley, isCheck = true }: ProductItemProps) {
	// trolley
	const [foundTrolley, setFound] = useState<boolean>()
	const { addTrolleyMany, removeTrolleyMany, foundTrolley: foundTrolleyStore, trolley: store } = useTrolley()
	
	useEffect(() => {
		setFound(foundTrolleyStore(trolley))
	}, [store]);
	
	// console.log(foundTrolley)
	
	const handleCheckBoxMany = () => {
		if (!foundTrolley && product) {
			addTrolleyMany({ ...trolley, Product: product })
		} else {
			removeTrolleyMany(trolley.id)
		}
	}
	
	if (foundTrolley === undefined) {
		return <SkeletonCardHorizontal/>
	}
	return (
		<div className={ "flex items-center " }>
			{ isCheck
				? <input onChange={ handleCheckBoxMany } type="checkbox" defaultChecked={ foundTrolley }
								 className="checkbox checkbox-sm mr-2"/>
				: null
			}
			
			<div className="flex rounded-lg p-2 space-x-2 w-full border ">
				<img
					src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
					alt="product image"
					className="h-auto w-20 rounded-full object-cover"
				/>
				<div className="flex  w-full">
					<div className=" w-full">
						<div className=" flex justify-between  w-full">
							<div className="">
								<h1 className="~text-sm/lg  text-base-content/80">
									{ product.name }
								</h1>
								<h1 className="~text-base/2xl font-bold">
									{ Rupiah(product.price) }
								</h1>
							</div>
							{ isCheck
								? <button onClick={ async () => deleteTrolley(trolley.id) } className="btn btn-circle btn-sm">
									<IconDelete/>
								</button>
								: null }
						</div>
						<div className="flex justify-between items-center w-full ">
							<div className="">
								<h2 className="~text-sm/lg font-semibold text-base-content/50">
									{ product.type }
								</h2>
								{/*<h2 className='~text-sm/lg font-bold text-base-content/50'>xl</h2>*/ }
							</div>
							<ProductCount item={ trolley }/>
						
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

