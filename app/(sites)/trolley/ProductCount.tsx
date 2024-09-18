"use client"
import { TrolleyDB } from "@prisma/client";
import { IconAdd, IconRemove } from "@/components/icon/IconMore";
import { onDecrementTrolley, onIncrementTrolley } from "@/server/action/trolley.action";
import React from "react";
import { useTrolley } from "@/store/useTrolley";

export function ProductCount({ item }: { item: TrolleyDB }) {
	const { contextIncrementTrolley, } = useTrolley()
 
	async function onIncrement() {
		const res = await onIncrementTrolley(item)
		if (res) {
			contextIncrementTrolley(res.data.qty, item)
		}
	}
	
	async function onDecrement() {
		if (item.qty > 0) {
			const res = await onDecrementTrolley(item)
			if (res) {
				contextIncrementTrolley(res.data.qty, item)
			}
		}
	}
	
	return (
		<div
			data-testid={ "ProductCount" }
			className='flex space-x-2 justify-center items-center'>
			
			<button
				onClick={ onIncrement }
				className='btn btn-square btn-sm'>
					<IconAdd/>
				</button>
			
			<h1 className='font-bold text-xl'>{ item.qty }</h1>
			
			<button
				onClick={ onDecrement }
				className='btn btn-square btn-sm'>
					{/* icon minus */ }
					<IconRemove/>
				</button>
		
		</div>
	)
}