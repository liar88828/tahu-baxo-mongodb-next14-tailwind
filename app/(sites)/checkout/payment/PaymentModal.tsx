'use client'
import React, { useContext, useState } from "react";
import { PaymentItem } from "@/app/(sites)/checkout/payment/PaymentItem";
import { BankDB } from "@prisma/client";
import { ContextTrolley } from "@/components/provider/ProviderContext";
import { ItemNotFound } from "@/app/(sites)/checkout/ItemNotFound";

export function PaymentModal({ data }: { data: BankDB[] }) {
	const [search, setSearch] = useState('')
	const { addBank } = useContext(ContextTrolley)
	return (
		<>
			<button className="btn btn-primary btn-sm" onClick={ () => {
				// @ts-expect-error
				document.getElementById('modalPayment').showModal()
			} }>Select
			</button>
			<dialog id="modalPayment" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Select User </h3>
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
							<PaymentItem
								item={ item }
								add={ true }
								fun={ () => addBank(item) }
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

export function PaymentContext() {
	const { state, removeBank } = useContext(ContextTrolley)
	
	if (!state.bank) {
		return <ItemNotFound
			title={ "Please Add Payment" }
			
			fun={ () => {
				// @ts-expect-error
				document.getElementById('modalPayment').showModal()
			}
			
			}/>
	}
	return (
		<div>
			<PaymentItem
				item={ state.bank }
				fun={ removeBank }
				add={ false }/>
		</div>
	);
}

