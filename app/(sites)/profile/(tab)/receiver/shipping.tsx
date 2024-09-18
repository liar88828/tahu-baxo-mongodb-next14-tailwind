'use client'
import { ReceiverDB } from "@prisma/client";
import { IconAdd, IconLocation, IconRemove } from "@/components/icon/IconMore";
import { deleteReceiver } from "@/server/action/receiver.action";
import Modal from "@/components/elements/modal";
import React from "react";

export interface ShippingProps {
	item: ReceiverDB;
	click: () => void;
	add?: boolean;
}

// @ts-ignore
export function ShippingAddress({ item, click, add = false }: ShippingProps) {
	return <div
		className={ "card card-bordered card-compact" }>
		<div className="card-body">
			<div className={ "card-title justify-between" }>
				<div className="flex items-center gap-2">
					<IconLocation/>
					Shipping Address
				</div>
				<Modal
					keys={ `modal_receiver_${ item.id }` }
					classNames={ "btn-sm btn-square" }
					buttonText={
						add ? <IconAdd/> : <IconRemove/>
					}>
					<button
						onClick={ click }
						className="btn mt-4 btn-square btn-sm">
					</button>
				</Modal>
			</div>
			<div>
				<h1 className={ "text-xl font-bold" }>{ item.name }</h1>
				<p>{ item.address }</p>
			</div>
		</div>
	</div>;
}

export function Shipping({ data }: { data: ReceiverDB[] }) {
	return <div className={ ' grid grid-cols-1 sm:grid-cols-2 gap-2' }>
		{ data.map(item => <ShippingAddress
			key={ item.id }
			item={ item }
			click={ () => deleteReceiver(item.id) }/>)
		}
	</div>
}

