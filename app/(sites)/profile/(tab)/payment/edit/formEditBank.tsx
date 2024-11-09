'use client'
import React from 'react';
import usePhone from "@/hook/usePhone";
import useCredit from "@/hook/useCredit";
import { useFormState, useFormStatus } from "react-dom";
import { updateBank } from "@/server/action/bank.action";
import { initialState } from "@/interface/model/auth.type";
import { BankDB } from "@prisma/client";

function FormEditBank({ item }: { item: BankDB }) {
	const { setPhone, phone } = usePhone(item.phone)
	const { setCredit, credit } = useCredit(item.no_req)
	const [state, formAction,] = useFormState(updateBank, initialState)
	const { pending } = useFormStatus();
	// console.log(state)
	// if (state?.message === 'true') {
	// 	redirect('/profile/payment')
	// }
	return (
		<form action={ formAction } className="space-y-5">
			<input
				name={ 'id_bank' }
				defaultValue={ item.id } hidden readOnly/>
			
			<div>
				<label htmlFor="name">Name</label>
				<input
					defaultValue={ item.name }
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
					defaultValue={ item.type }
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
					defaultValue={ item.location }
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
					defaultValue={ item.desc }
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
	
	);
}

export default FormEditBank;