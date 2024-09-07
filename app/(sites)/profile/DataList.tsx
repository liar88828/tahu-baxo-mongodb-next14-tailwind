import React from 'react'
import { ProductItem } from "@/components/ProductItem";
import { TitleCard } from "@/components/TitleCard";
import { IconFilter } from "@/components/icon/IconMore";

export async function DataList() {
	return (
		<div>
			<TitleCard
				title={ "Result : 123" }
				button={ <IconFilter/> }
			/>
			<div className='grid grid-cols-2 gap-2'>
				<ProductItem/>
			</div>
		</div>
	)
}
