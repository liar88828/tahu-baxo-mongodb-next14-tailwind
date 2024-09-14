'use client'
import React, { useContext, useState } from "react";
import { ContextTrolley } from "@/components/provider/ProviderContext";
import { DeliveryItem } from "@/app/(sites)/checkout/delivery/DeliveryItem";
import { DeliveryDB } from "@prisma/client";
import { ItemNotFound } from "@/app/(sites)/checkout/ItemNotFound";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { deliveryAction } from "@/store/checkout/delivery";
import Link from "next/link";

export function DeliveryModal({ data }: { data: DeliveryDB [] }) {
	const [search, setSearch] = useState('')
	const { addDelivery } = useContext(ContextTrolley)
	const dispatch = useDispatch<AppDispatch>()
	
	return (
		<>
			
			<button
				data-testid={ 'checkout-DeliveryModal-button' }
				className="btn btn-primary btn-sm" onClick={ () => {
				// @ts-expect-error
				document.getElementById('modalDelivery').showModal()
			} }>
				Select
			</button>
			<Link href={ '/test' }>Go Link</Link>
			<dialog
				id="modalDelivery" className="modal">
				<div
					data-testid={ 'checkout-DeliveryModal-div' }
					className="modal-box">
					<h3 className="font-bold text-lg">Select Delivery</h3>
					<input
						className="input input-sm w-full input-bordered"
						placeholder="Search Name user"
						type="text"
						value={ search }
						onChange={ (e) => setSearch(e.target.value) }
					/>
					{/*<p className="py-4">Press ESC key or click the button below to close</p>*/ }
					<div className="overflow-y-scroll space-y-2 p-2">
						{ data.map(item => (
							<DeliveryItem
								item={ item }
								add={ true }
								fun={ () => {
									addDelivery(item)
									dispatch(deliveryAction.addDelivery(item))
								} }
								key={ item.id }/>
						)) }
					</div>
					<div className="modal-action">
						<form method="dialog">
							{/*if there is a button in form, it will close the modal  */ }
							<button className="btn">Close</button>
						</form>
					</div>
				
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export function DeliveryContext() {
	const { state, removeDelivery } = useContext(ContextTrolley)
	
	if (!state.delivery) {
		return <ItemNotFound
			title={ 'Please Add Delivery'
			
			}
			fun={ () => {
				// @ts-expect-error
				document.getElementById('modalDelivery').showModal()
			} }
		/>
	}
	
	return (
		<div>
			<DeliveryItem
				item={ state.delivery }
				fun={ removeDelivery }
				add={ false }/>
		</div>
	);
}
