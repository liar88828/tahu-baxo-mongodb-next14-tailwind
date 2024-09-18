import React from 'react'
import { getTrolleyPrivate } from "@/server/action/trolley.action";
import { ProductDB, TrolleyDB } from "@prisma/client";
import ErrorComponent from "@/components/error/ErrorComponent";
import { errorStatus } from "@/lib/error/errorStatus";
import { ProductItem } from "@/app/(sites)/trolley/ProductItem";

export async function Product() {
	const data = await getTrolleyPrivate()
	
	if (!data) {
		return <ErrorComponent
			code={ errorStatus.internalServerError }
			msg={ 'Service api maybe busy' }
			link={ '/home' }
			title={ 'Server Busy' }
		/>
	}
	
	return (
		<div data-testid="Product">
			<div className="flex justify-between items-center w-full text-2xl mb-2 ">
				<div className="flex space-x-2 items-center justify-between ">
					<input type="checkbox" defaultChecked className="checkbox checkbox-sm"/>
					<h1 className={ 'font-bold text-xl' }>Product List</h1>
				</div>
			</div>
			<ProductItem data={ data }/>
		</div>
	)
}

export type ProductListItemProps = { trolley: TrolleyDB, product: ProductDB, children?: React.ReactNode };
