'use client'
import React from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { initialState } from "@/interface/model/auth.type";
import { createProduct } from "@/server/action/product.action";
import { redirect } from "next/navigation";

function Page() {
	
	const [state, formAction,] = useFormState(createProduct, initialState)
	const { pending } = useFormStatus();
	console.log(state)
	if (state?.message === 'true') {
		redirect('/profile/product')
	}
	
	return (
		<div className="p-5 space-y-5">
			<div className="text-left">
				<h1 className={ 'text-3xl font-bold' }>Add Product</h1>
				<p className={ 'text-lg font-light' }>Add New Product</p>
			</div>
			
			<form
				action={ formAction }
				className="space-y-5"
			>
				<div>
					<label htmlFor="name">Name</label>
					<input
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
				>Add
				</button>
			</form>
		
		
		</div>
	);
}

export default Page;