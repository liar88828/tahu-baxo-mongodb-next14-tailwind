import { getBankAllPrivate } from "@/server/action/bank.action";
import { Loading } from "@/components/loading/loading";
import { TitleSearch } from "@/components/title/TitleSearch";
import { IconEdit, IconSearch } from "@/components/icon/IconMore";
import React from "react";
import { BankDB } from "@prisma/client";
import Link from "next/link";
import { DeliveryTitle } from "@/app/(sites)/profile/(tab)/delivery/DeliveryList";

export interface BankListProps {
	search: string
}

export async function PaymentList({ search }: BankListProps) {
	const data = await getBankAllPrivate(search)
	if (!data || data.data.length === 0) {
		return <Loading/>
	}
	return (
		<div>
			<TitleSearch
				title={ `Result :${ data.data.length }` }
				button={ <IconSearch/> }
			/>
			<div className='grid-card-bank'>
				{ data.data.map(item => <BankListItem
					item={ item }
					key={ item.id }
				/>) }
			</div>
		</div>
	)
}

export function BankListItem({ item }: { item: BankDB }) {
	return (
		<div className="bg-base-100 rounded-lg shadow border p-4 ">
			{/* Header */ }
			<div className="flex items-center justify-between">
				<h1 className=" text-lg font-semibold text-gray-800">Delivery Details</h1>
				<Link
					href={ `/profile/payment/edit/${ item.id }` }
					className="btn btn-circle btn-sm"
				><IconEdit/>
				</Link>
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
					{/*<DeliveryTitle title={ "Price/kilo" } text={ Rupiah(item.) }/>*/ }
					{/*<DeliveryTitle title={ "Price/kg" } text={ Rupiah(item.price) }/>*/ }
				</section>
			
			</section>
			<div className="mt-4">
				<label className="block text-sm text-gray-600">Description</label>
				<p className="text-gray-700 mt-1">{ item.desc }</p>
			</div>
		</div>
	);
}
