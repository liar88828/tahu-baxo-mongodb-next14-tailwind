import React from 'react'
import { ProductItemPrivate } from "@/components/ProductItem";
import { TitleCard } from "@/components/TitleCard";
import { IconSearch } from "@/components/icon/IconMore";
import { ParamsProfile } from "@/interface/server/param";

export async function DataList({ params }: { params: ParamsProfile }) {
	
	return (
		<div>
			<TitleCard
				title={ "Result : 123" }
				button={ <IconSearch/> }
			/>
			<div className='grid grid-cols-2 gap-2'>
				<ProductItemPrivate search={ params.searchParams.search }/>
			</div>
		</div>
	)
}
