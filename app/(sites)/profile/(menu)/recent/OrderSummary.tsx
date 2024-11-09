'use client'
import React, { useState } from 'react';
import { IconAdd, IconRemove } from "@/components/icon/IconMore";
import { GetAllTrolleyContext } from "@/interface/model/trolley.type";
import { Rupiah } from "@/lib/utils/formatMoney";

export function OrderSummary({ trolley, subTotal }: { subTotal?: number, trolley: GetAllTrolleyContext[] }) {
	const [isItemsExpanded, setIsItemsExpanded] = useState(false)
	return (
		<div>
			<h3 className="text-lg font-semibold mb-2">Order Summary</h3>
			<div className="flex justify-between items-center">
				
				{/*<button*/ }
				{/*	onClick={ () => setIsItemsExpanded(!isItemsExpanded) }*/ }
				{/*	className=" btn btn-sm"*/ }
				{/*>*/ }
				{/*	{ isItemsExpanded ? (*/ }
				{/*		<IconRemove className="mx-2"/>*/ }
				{/*	) : (*/ }
				{/*		<IconAdd className="mx-2"/>*/ }
				{/*	) }*/ }
				{/*	{ trolley.length } items*/ }
				{/*</button>*/ }
				
				
				<button
					className=" btn btn-sm z-10">
					
					<label className="swap">
						<input type="checkbox"
									 onClick={ () => setIsItemsExpanded(!isItemsExpanded) }
						/>
						<div className="swap-on"><IconRemove className="mx-2"/></div>
						<div className="swap-off"><IconAdd className="mx-2"/></div>
					</label>
					
					{ trolley.length } items
				</button>
				
				
				{ subTotal !== undefined
					? <span className="font-medium">${ Rupiah(subTotal) }</span>
					: null }
			</div>
			<div className="">
				{ //isItemsExpanded &&
					<ul
						className={ `mt-2 space-y-2 transform transition-transform duration-500 -z-10
					${ isItemsExpanded ? ' opacity-100    scale-100' : ' opacity-0  scale-95 h-0' }
					` }
						// ${ isItemsExpanded ? 'block' : 'hidden' }
					>
						{
							trolley.length === 0
								? <li className={ 'text-sm' }>Data is Empty</li>
								: trolley.map((item) => (
									<li
										key={ item.id }
										className="flex justify-between text-sm">
										<span>{ item.qty } x { item.Product.name }</span>
										<span>{ Rupiah(item.qty * item.Product.price) }</span>
									</li>
								)) }
					</ul>
				}
			</div>
		</div>
	
	);
}

export function OrderSummaryItem({ trolley, subTotal }: { subTotal?: number, trolley: GetAllTrolleyContext[] }) {
	const [isItemsExpanded, setIsItemsExpanded] = useState(false)
	return (
		<div className={ 'flex ' }>
			
			<div className="p-2">
				
				
				<button
					className=" btn btn-sm"
				>
					{/*{ isItemsExpanded*/ }
					{/*	? <IconRemove className="mx-2"/>*/ }
					{/*	: <IconAdd className="mx-2"/>*/ }
					{/*}*/ }
					
					<label className="swap">
						<input type="checkbox"
									 onClick={ () => setIsItemsExpanded(!isItemsExpanded) }
						/>
						<div className="swap-on"><IconRemove className="mx-2"/></div>
						<div className="swap-off"><IconAdd className="mx-2"/></div>
					</label>
					
					{ trolley.length } items
				</button>
				
				{ subTotal !== undefined
					? <span className="font-medium">${ Rupiah(subTotal) }</span>
					: null }
			</div>
			
			{
				// isItemsExpanded &&
				(
					<ul
						// className="mt-2 space-y-2 "
						// ${ isItemsExpanded ? 'opacity-100 scale-100 animate-bounce' : 'opacity-0 scale-95'}
						className={ `transition-all duration-500 transform
					${ isItemsExpanded ? 'opacity-100 scale-100  ' : 'opacity-0 scale-95  h-0' }
					` }
					
					>
						{
							trolley.length === 0
								? <li className={ 'text-sm' }>Data is Empty</li>
								: trolley.map((item) => (
									<li key={ item.id }
											className="text-sm wa flex items-center justify-between">
										<p>{ item.qty } x { item.Product.name }</p>
										<p>{ Rupiah(item.qty * item.Product.price) }</p>
									</li>
								)) }
				</ul>
			) }
		</div>
	
	);
}


