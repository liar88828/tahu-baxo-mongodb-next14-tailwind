'use client'
import { IconDelete } from "@/components/icon/IconMore";
import { Rupiah } from "@/lib/utils/formatMoney";
import { ProductCount } from "@/app/(sites)/trolley/ProductCount";
import React, { useContext } from "react";
import { ProductListItemProps } from "@/app/(sites)/trolley/Product";
import { ContextTrolley } from "@/components/provider/ProviderContext";
import { deleteTrolley } from "@/server/action/trolley.action";

export function ProductItem({ trolley, product, children }: ProductListItemProps) {
	const { addTrolley, state, removeTrolley, removeTrolleyMany, addTrolleyMany } = useContext(ContextTrolley);
	
	const found = state.trolleyMany.some(t => t.id === trolley.id)
	const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (state.trolley?.id !== trolley.id) {
			addTrolley({ ...trolley, price: product.harga })
		} else {
			removeTrolley()
		}
	}
	
	const handleCheckBoxMany = (e: React.ChangeEvent<HTMLInputElement>) => {
		// console.log(state.trolleyMany.find(t => t.id === trolley.id))
		if (!found) {
			addTrolleyMany({ ...trolley, price: product.harga })
		} else {
			removeTrolleyMany(trolley.id)
		}
	}
	return (
		<div
			className={ 'flex items-center ' }>
			<div className={ ' ' }>
				<input
					onChange={ handleCheckBoxMany }
					type="checkbox"
					defaultChecked={ found }
					className="checkbox checkbox-sm mr-2"/>
				
				{/*{ children }*/ }
			</div>
			<div className='flex rounded-lg p-2 space-x-2 w-full   border '>
				<img
					src='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
					alt='product image'
					className='h-auto w-20 rounded-full object-cover'
				/>
				<div className='flex  w-full'>
					<div className=' w-full'>
						<div className=' flex justify-between  w-full'>
							<div className=''>
								<h1 className='text-lg font-semibold text-base-content/80'>
									{ product.nama }
								</h1>
								<h2 className='text-sm font-bold text-base-content/50'>Red</h2>
							</div>
							<button
								onClick={ async () => deleteTrolley(trolley.id) }
								className='btn btn-circle btn-outline btn-sm'>
								<IconDelete/>
							</button>
						</div>
						<div className='flex justify-between items-center w-full '>
							<h1 className='text-lg font-bold'>{ Rupiah(product.harga) }</h1>
							<ProductCount item={ trolley }/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}