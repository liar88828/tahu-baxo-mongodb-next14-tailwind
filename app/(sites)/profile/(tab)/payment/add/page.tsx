'use client'
import React from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { initialState } from "@/interface/model/auth.type";
import { redirect } from "next/navigation";
import { createBank } from "@/server/action/bank.action";
import usePhone from "@/hook/usePhone";
import useCredit from "@/hook/useCredit";

function Page() {
	const { setPhone, phone } = usePhone()
	const { setCredit, credit } = useCredit()
	const [state, formAction,] = useFormState(createBank, initialState)
	const { pending } = useFormStatus();
	console.log(state)
	if (state?.message === 'true') {
		redirect('/profile/payment')
	}
	
	return (
		<div className="p-5 space-y-5">
			<div className="text-left">
				<h1 className={ 'text-3xl font-bold' }>Add Payment</h1>
				<p className={ 'text-lg font-light' }>Add New Payment Method </p>
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
						placeholder="Enter Name Payment ..."
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
						placeholder="Enter Type Payment ..."
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
						placeholder="Enter Location Payment ..."
					/>
					{ state.err?.location &&
						<p className={ 'text-error text-xs' }>
							{ state.err.location }
						</p>
					}
				</div>
				
				
				<div>
					<label htmlFor="phone">Phone</label>
					<input
						value={ phone }
						onChange={ e => setPhone(e) }
						min={ 0 }
						name={ 'phone' }
						type="text"
						className={ 'input input-bordered w-full' }
						placeholder="Enter Phone Payment ..."
					/>
					{ state.err?.phone &&
						<p className={ 'text-error text-xs' }>
							{ state.err.phone }
						</p>
					}
				
				</div>
				
				
				<div>
					<label htmlFor="no_req">No Accounting/Rekening</label>
					<input
						value={ credit }
						onChange={ e => setCredit(e)
						}
						min={ 0 }
						name={ 'no_req' }
						type="text"
						className={ 'input input-bordered w-full' }
						placeholder="Enter Accounting Payment ..."
					/>
					{ state.err?.no_req &&
						<p className={ 'text-error text-xs' }>
							{ state.err.no_req }
						</p>
					}
				</div>
				
				<div>
					<label htmlFor="desc">Description</label>
					<textarea
						name={ 'desc' }
						className={ 'textarea textarea-bordered w-full' }
						placeholder="Enter Description Payment ..."
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