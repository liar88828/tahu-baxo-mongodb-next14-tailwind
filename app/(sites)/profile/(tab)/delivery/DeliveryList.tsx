import React from 'react'
import { TitleSearch } from "@/components/title/TitleSearch";
import { IconEdit, IconSearch } from "@/components/icon/IconMore";
import { Loading } from "@/components/loading/loading";
import { getDeliveryAllPrivate } from "@/server/action/delivery.action";
import { DeliveryDB } from "@prisma/client";
import ErrorComponent from "@/components/error/ErrorComponent";
import { Rupiah } from "@/lib/utils/formatMoney";
import Link from "next/link";

export async function DeliveryList({ search }: { search: string }) {
	const delivery = await getDeliveryAllPrivate(search)
	if (!delivery) {
		return <Loading/>
	}
	return (
		<div>
			<TitleSearch
				title={ `Result :${ delivery.data.length }` }
				button={ <IconSearch/> }
			/>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4'>
				
				{ delivery.data.length === 0
					? <ErrorComponent/>
					: delivery.data.map(item => <DeliveryListItem
						key={ item.id }
						item={ item }/>
					) }
				
			</div>
		</div>
	)
}

export function DeliveryListItem({ item }: { item: DeliveryDB }) {
	return (
		<div className="bg-base-100 rounded-lg shadow border p-4 ">
			{/* Header */ }
			<div className="flex items-center justify-between">
				<h1 className=" text-lg font-semibold text-gray-800">Delivery Details</h1>
				<Link
					href={ `/profile/delivery/edit/${ item.id }` }
					className="btn btn-circle btn-sm"
				><IconEdit/></Link>
			</div>
			<section className={ 'grid grid-cols-2 gap-2' }>
				
				<section>
					<DeliveryTitle title={ "Name Delivery" } text={ item.name } titleBold={ true }/>
					<DeliveryTitle title={ "Shipping Base" } text={ item.location }/>
					<DeliveryTitle title={ "Phone Number" } text={ item.phone }/>
				</section>
				
				<section>
					<div className="mt-4 row-span-2">
						<label className="block text-sm text-gray-600 ">Type</label>
						<p className="text-gray-700 mt-1">{ item.type }</p>
						<p className="text-gray-700 mt-1">{ item.type }</p>
					</div>
					<DeliveryTitle title={ "Price/kilo" } text={ Rupiah(item.price) }/>
					<DeliveryTitle title={ "Price/kg" } text={ Rupiah(item.price) }/>
				</section>
			
			</section>
			<div className="mt-4">
				<label className="block text-sm text-gray-600">Description</label>
				<p className="text-gray-700 mt-1">{ item.desc }</p>
			</div>
		</div>
	);
}

export function DeliveryTitle(
	{ title, text, titleBold = false }: { title: string, text: string, titleBold?: boolean }
) {
	return (
		<div className="mt-4">
			<label className="title-delivery">{ title }</label>
			<p className={ `text-lg text-gray-700 ${ titleBold && 'font-semibold' }` }>
				{ text }
			</p>
		</div>
	);
}



