"use client"
import { TrolleyDB } from "@prisma/client";
import { IconAdd, IconRemove } from "@/components/icon/IconMore";
import { onDecrementTrolley, onIncrementTrolley } from "@/server/action/trolley.action";
import React, { useContext } from "react";
import { ContextTrolley } from "@/components/provider/ProviderContext";

export function ProductCount({ item }: { item: TrolleyDB }) {
	const { state, reduce } = useContext(ContextTrolley);
	// const found = state.trolleyMany.some(t => t.id === trolley.id)
	const contextIncrementTrolley = (add: number) => {
		reduce(prevState => ({
				...prevState,
				trolleyMany: prevState.trolleyMany
					.map(trolleyItem =>
						trolleyItem.id === item.id
							? {
								...trolleyItem,
								qty: trolleyItem.qty + add
							}
							: trolleyItem
					),
			}
		))
	}
	
	async function onIncrement() {
		console.log('click')
		const res = await onIncrementTrolley(item)
		console.log(res)
		if (res) {
			contextIncrementTrolley(+1)
		}
	}
	
	async function onDecrement() {
		if (item.qty > 0) {
			console.log('click')
			const res = await onDecrementTrolley(item)
			if (res) {
				contextIncrementTrolley(-1)
			}
		}
	}
	return (
		<div className='flex space-x-2 justify-center items-center'>
			
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