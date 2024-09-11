'use client'
import React, { useContext } from "react";
import { ContextTrolley } from "@/components/provider/ProviderContext";

export function DeliveryDesc() {
	const { description } = useContext(ContextTrolley)
	return (
		<div className="">
			<div className="grid grid-cols-2 gap-2">
				<input
					onChange={ e => description({ price: Number(e.target.value) }) }
					type="number"
					className={ 'input input-bordered ' } placeholder={ 'Add Price' }/>
				<input onChange={ e => description({ distance: e.target.value }) } type="text"
							 className={ 'input input-bordered' } placeholder={ 'Add Distance (1km - 22km)' }/>
			</div>
			<div className="mt-2">
				<select
					onChange={ e => description({ packing: e.target.value }) }
					className="select select-bordered w-full " defaultValue={ 'Select Packing' }>
					<option value={ "Cargo" }>Cargo</option>
					<option value={ "Driver" }>Driver</option>
					<option value={ "Expedition" }>Expedition</option>
				</select>
			</div>
		</div>
	);
}