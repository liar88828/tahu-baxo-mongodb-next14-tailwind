'use client'
import React from 'react';
import { InputTel } from "@/components/elements/Input";
import { useFormState, useFormStatus } from "react-dom";
import { updateDelivery } from "@/server/action/delivery.action";
import { initialState } from "@/interface/model/auth.type";
import { DeliveryDB } from "@prisma/client";

function FormEditDelivery({ item }: { item: DeliveryDB }) {
	const [state, formAction,] = useFormState(updateDelivery, initialState)
	const { pending } = useFormStatus();
	return (
		<form action={ formAction } className="space-y-5">
			
			<input name={ 'id_delivery' } defaultValue={ item.id } hidden required readOnly/>
			
			<div>
				<label htmlFor="name">Name</label>
				<input
					defaultValue={ item.name }
					name={ 'name' }
					type="text"
					className={ 'input input-bordered w-full' }
					placeholder="Enter Name Delivery  ..."
				/>
				{ state.err?.name &&
					<p className={ 'text-error text-xs' }>
						{ state.err.name }
					</p>
				}
			</div>
			
			<div>
				<label htmlFor="type">Type</label>
				<input
					defaultValue={ item.type }
					name={ 'type' }
					type="text"
					className={ 'input input-bordered w-full' }
					placeholder="Enter Type Delivery ..."
				/>
				{ state.err?.type &&
					<p className={ 'text-error text-xs' }>
						{ state.err.type }
					</p>
				}
			</div>
			
			<div>
				<label htmlFor="location">Location</label>
				<input
					defaultValue={ item.location }
					name={ 'location' }
					type="text"
					className={ 'input input-bordered w-full' }
					placeholder="Enter Location Delivery ..."
				/>
				{ state.err?.location &&
					<p className={ 'text-error text-xs' }>
						{ state.err.location }
					</p>
				}
			</div>
			
			<InputTel state={ state } title={ 'Phone' } keys={ 'phone' } defaultValue={ item.phone }/>
			
			<div>
				<label htmlFor="price">Price</label>
				<input
					defaultValue={ item.price }
					min={ 0 }
					name={ 'price' }
					type="number"
					className={ 'input input-bordered w-full' }
					placeholder="Enter Price Delivery ..."
				/>
				{ state.err?.price &&
					<p className={ 'text-error text-xs' }>
						{ state.err.price }
					</p>
				}
			</div>
			
			<div>
				<label htmlFor="desc">Description</label>
				<textarea
					defaultValue={ item.desc }
					name={ 'desc' }
					className={ 'textarea textarea-bordered w-full' }
					placeholder="Enter Description Delivery ..."
				/>
				{ state.err?.desc &&
					<p className={ 'text-error text-xs' }>
						{ state.err.desc }
					</p>
				}
			</div>
			
			{ state.message &&
				<p className={ 'text-error text-xs' }>
					{ state.message }
				</p>
			}
			<button
				disabled={ pending }
				type="submit" className={ 'btn btn-block btn-primary' }
			>Add
			</button>
		</form>
	
	);
}

export default FormEditDelivery;