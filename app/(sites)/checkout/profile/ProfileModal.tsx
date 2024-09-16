'use client'
import React, { useState } from "react";
import { ReceiverDB } from "@prisma/client";
import { useReceiver } from "@/store/useReceiver";
import { ShippingAddressCheckout } from "@/app/(sites)/checkout/profile/shippingAddressCheckout";

export function ProfileModal({ data }: { data: ReceiverDB[] }) {
	const [search, setSearch] = useState('')
	const { addReceiver } = useReceiver()
	
	return (
		<>
			{/*<ProfileInfoItem/>*/ }
			<button
				data-testid={ 'checkout-ProfileModal-button' }
				className="btn btn-primary btn-sm" onClick={ () => {
				// @ts-expect-error
				document.getElementById('modalUserInfo').showModal()
			} }>
				Select
			</button>
			<dialog id="modalUserInfo" className="modal">
				<div
					data-testid={ 'checkout-ProfileModal-div' }
					className="modal-box">
					<h3 className="font-bold text-lg">Select User </h3>
					<input
						className="input input-sm w-full input-bordered"
						placeholder="Search Name user"
						type="text"
						value={ search }
						onChange={ (e) => setSearch(e.target.value) }
					/>
					{/*<p className="py-4">Press ESC key or click the button below to close</p>*/ }
					<div className="overflow-y-scroll space-y-2 ">
						{ data.map(item => <ShippingAddressCheckout
							key={ item.id }
							item={ item }
							add={ true }
							fun={ () => addReceiver(item) }
						/>)
						}
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

