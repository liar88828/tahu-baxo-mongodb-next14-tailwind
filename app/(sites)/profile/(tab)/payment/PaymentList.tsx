import { getBankAllPrivate } from "@/server/action/bank.action";
import { Loading } from "@/components/loading";
import { TitleSearch } from "@/components/TitleSearch";
import { IconSearch } from "@/components/icon/IconMore";
import React from "react";
import { BankDB } from "@prisma/client";

interface BankListProps {
	search: string
}

export async function PaymentList({ search }: BankListProps) {
	const payment = await getBankAllPrivate(search)
	if (!payment) {
		return <Loading/>
	}
	return (
		<div>
			<TitleSearch
				title={ `Result :${ payment.data.length }` }
				button={ <IconSearch/> }
			/>
			<div className='grid-card-bank'>
				<DeliveryItemPrivate data={ payment.data }/>
			</div>
		</div>
	)
}

interface BankItemPrivateProps {
	data: BankDB[]
}

export function DeliveryItemPrivate({ data }: BankItemPrivateProps) {
	return data.map(item => (
			// src/components/PaymentCard.jsx
			<div
				key={ item.id }
				className="w-full h-56 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg relative">
				{/* Card Logo */ }
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-xl font-bold tracking-wider">{ item.name }</h1>
					</div>
					<img
						src="https://via.placeholder.com/40"
						alt="Card Chip"
						className="w-10"
					/>
				</div>
				
				{/* Card Number */ }
				<div className="mt-6 text-lg tracking-widest font-semibold">
					{ item.no_req }
				</div>
				
				{/* Cardholder Name */ }
				<div className="mt-4">
					<div className="text-sm text-wrap w-52">{ item.phone }</div>
					<div className="font-semibold text-lg tracking-wider">{ item.type }</div>
				</div>
				
				{/* Expiry Date */ }
				<div className="absolute bottom-6 right-6">
					<div className="text-sm font-light">VALID THRU</div>
					<div className="text-lg font-semibold tracking-wide">12/24</div>
					<div className="text-sm ">{ item.location }</div>
				</div>
			</div>
		)
	)
		;
}

