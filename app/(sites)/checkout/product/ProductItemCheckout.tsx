'use client'
import { useTrolley } from "@/store/useTrolley";
import { SkeletonCardHorizontal } from "@/components/loading/Skeleton";
import React from "react";
import { ProductItems } from "@/app/(sites)/trolley/ProductItem";

export function ProductItemCheckout() {
	const { trolley } = useTrolley()
	if (trolley === null) {
		return <SkeletonCardHorizontal/>
	}
	return (
		<div className='space-y-4 '>
			{ trolley.map((item, index) =>
				<ProductItems
					trolley={ item }
					product={ item.Product }
					key={ index }/>
			) }
		</div>
	);
}