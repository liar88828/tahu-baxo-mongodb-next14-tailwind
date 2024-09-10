"use client"
import { TrolleyDB } from "@prisma/client";
import { IconAdd, IconRemove } from "@/components/icon/IconMore";
import { onDecrementTrolley, onIncrementTrolley } from "@/server/action/trolley.action";
import React from "react";

export function ProductListCount({ item }: { item: TrolleyDB }) {
	return (
		<div className='flex space-x-2 justify-center items-center'>
			
			<button
				onClick={ async () => onIncrementTrolley(item) }
					className='btn btn-square btn-outline btn-sm'>
					<IconAdd/>
				</button>
			
			<h1 className='font-bold text-xl'>{ item.qty }</h1>
			<form action={ async () => onDecrementTrolley(item) }>
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