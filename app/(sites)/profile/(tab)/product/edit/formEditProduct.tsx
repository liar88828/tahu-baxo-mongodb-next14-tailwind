'use client'
import React from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { UpdateProduct } from "@/server/action/product.action";
import { initialState } from "@/interface/model/auth.type";
import { ProductDB } from "@prisma/client";

function FormEditProduct({ item }: { item: ProductDB }) {
	const [state, formAction,] = useFormState(UpdateProduct, initialState)
	const { pending } = useFormStatus();
	return <form action={ formAction } className="space-y-5">
		<input
			name={ 'id_product' }
			defaultValue={ item.id } hidden readOnly/>
		<div>
			
			<label htmlFor="name">Name</label>
			<input
				defaultValue={ item.name }
				name={ 'name' }
				type="text"
				className={ 'input input-bordered w-full' }
				placeholder="Enter Name Product ..."
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
				placeholder="Enter Type Product ..."
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
				placeholder="Enter Location Product ..."
			/>
			{ state.err?.location &&
				<p className={ 'text-error text-xs' }>
					{ state.err.location }
				</p>
			}
		</div>
		
		
		<div>
			<label htmlFor="qty">Qty</label>
			<input
				defaultValue={ item.qty }
				min={ 0 }
				name={ 'qty' }
				type="number"
				className={ 'input input-bordered w-full' }
				placeholder="Enter Qty Product ..."
			/>
			{ state.err?.qty &&
				<p className={ 'text-error text-xs' }>
					{ state.err.qty }
				</p>
			}
		
		</div>
		
		
		<div>
			<label htmlFor="price">Price</label>
			<input
				defaultValue={ item.price }
				min={ 0 }
				name={ 'price' }
				type="number"
				className={ 'input input-bordered w-full' }
				placeholder="Enter Price Product ..."
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
				placeholder="Enter Description Product ..."
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
		>Edit
		</button>
	</form>
}

export default FormEditProduct;