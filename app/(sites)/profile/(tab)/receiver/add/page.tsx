'use client'
import React from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { initialState } from "@/interface/model/auth.type";
import { createReceiver } from "@/server/action/receiver.action";
import { Input, InputTel, TextArea } from "@/components/elements/Input";

function Page() {
	const [state, formAction,] = useFormState(createReceiver, initialState)
	const { pending } = useFormStatus();
	return (
		<div className="p-5 space-y-5">
			<div className="text-left">
				<h1 className={ 'text-3xl font-bold' }>Add Receiver</h1>
				<p className={ 'text-lg font-light' }>Add New Receiver</p>
			</div>
			
			<form action={ formAction } className="space-y-5">
				<Input state={ state } title={ 'Name' } keys={ 'name' } type="text"/>
				<InputTel state={ state } title={ 'Phone' } keys={ 'phone' }/>
				<TextArea state={ state } title={ 'Address' } keys={ 'address' }/>
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