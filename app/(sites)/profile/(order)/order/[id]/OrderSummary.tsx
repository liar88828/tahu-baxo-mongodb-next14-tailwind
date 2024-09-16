'use client'
import React, { useState } from 'react';
import { IconAdd, IconRemove } from "@/components/icon/IconMore";
import { GetAllTrolleyContext } from "@/interface/model/trolley.type";
import { Rupiah } from "@/lib/utils/formatMoney";

export function OrderSummary({ trolley, subTotal }: { subTotal: number, trolley: GetAllTrolleyContext[] }) {
	const [isItemsExpanded, setIsItemsExpanded] = useState(false)
	return (
		<div>
			<h3 className="text-lg font-semibold mb-2">Order Summary</h3>
			<div className="flex justify-between items-center">
				<button
					onClick={ () => setIsItemsExpanded(!isItemsExpanded) }
					className=" btn btn-sm"
				>
					{ isItemsExpanded ? (
						<IconRemove className="mx-2"/>
					) : (
						<IconAdd className="mx-2"/>
					) }
					{ trolley.length } items
				</button>
				<span className="font-medium">${ Rupiah(subTotal) }</span>
			</div>
			{ isItemsExpanded && (
				<ul className="mt-2 space-y-2">
					{ trolley.map((item, index) => (
						<li
							key={ index }
							className="flex justify-between text-sm">
							<span>{ item.qty }x { item.Product.name }</span>
							<span>${ Rupiah(item.qty * item.Product.price) }</span>
						</li>
					)) }
				</ul>
			) }
		</div>
	
	);
}

