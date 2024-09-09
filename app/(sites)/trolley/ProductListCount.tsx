import { TrolleyDB } from "@prisma/client";
import { IconAdd, IconRemove } from "@/components/icon/IconMore";
import React from "react";
import { onDecrementTrolley, onIncrementTrolley } from "@/server/action/trolley.action";

export function ProductListCount({ item: { qty, id, productId } }: { item: TrolleyDB }) {
	
	return (
		<div className='flex space-x-2 justify-center items-center'>
			<form action={ onIncrementTrolley }>
				
				<input type="number"
							 name="id"
							 value={ id }
							 hidden={ true }
							 readOnly
				/>
				<input type="number"
							 name="productId"
							 value={ productId }
							 hidden={ true }
							 readOnly
				/>
				<button
					type={ 'submit' }
					className='btn btn-square btn-outline btn-sm'>
					<IconAdd/>
				</button>
			</form>
			<h1 className='font-bold text-xl'>{ qty }</h1>
			<form action={ onDecrementTrolley }>
				<input type="number"
							 name="id"
							 value={ id }
							 hidden={ true }
							 readOnly
				/>
				<input type="number"
							 name="productId"
							 value={ productId }
							 hidden={ true }
							 readOnly
				/>
				<button
					type={ 'submit' }
					className='btn btn-square btn-outline btn-sm'>
					{/* icon minus */ }
					<IconRemove/>
				</button>
			</form>
		</div>
	)
}