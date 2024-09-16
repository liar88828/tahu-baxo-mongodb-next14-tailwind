'use client'
import React from "react";
import { useCheckout } from "@/store/useCheckout";

export function Description() {
	const { setChange, description } = useCheckout()
	return (
		<div
			data-testid={ 'checkout-DeliveryDesc' }
			className="space-y-2">
			<div className="grid grid-cols-2 gap-2">
				<input
					value={ description.shippingCost }
					onChange={ e => setChange({ shippingCost: Number(e.target.value) }) }
					type="number"
					className={ 'input input-bordered ' }
					placeholder={ 'Add Price' }/>
				
				<input
					value={ description.distance }
					onChange={ e => setChange({ distance: e.target.value }) }
					type="text"
					className={ 'input input-bordered' }
					placeholder={ 'Add Distance (1km - 22km)' }/>
			</div>
			<div className="">
				<select
					value={ description.packing ? description.packing : "Cargo" }
					onChange={ e => setChange({ packing: e.target.value }) }
					className="select select-bordered w-full "
					// defaultValue={ 'Expedition' }
				>
					
					<option value={ "Cargo" }>Cargo</option>
					<option value={ "Driver" }>Driver</option>
					<option value={ "Expedition" }>Expedition</option>
				</select>
			</div>
			<textarea
				data-testid={ 'checkout-ProductNote' }
				value={ description.note }
				onChange={ e => setChange({ note: e.target.value }) }
				className={ 'textarea textarea-bordered w-full  ' }
				placeholder='Write a note for product ...'
			>
		</textarea>
		
		</div>
	);
}