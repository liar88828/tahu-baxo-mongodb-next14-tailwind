'use client'
import React from 'react';
import { Input, InputTel, TextArea } from "@/components/elements/Input";
import { ReceiverDB } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import { updateReceiver } from "@/server/action/receiver.action";
import { initialState } from "@/interface/model/auth.type";

function FormUpdateReceiver({ item }: { item: ReceiverDB }) {
	const [state, formAction,] = useFormState(updateReceiver, initialState)
	const { pending } = useFormStatus();
	return (
		
		<form action={ formAction } className="space-y-5">
			
			<input
				name={ 'id_receiver' }
				defaultValue={ item.id } hidden readOnly/>
			
			
			<Input state={ state } title={ 'Name' } keys={ 'name' } type="text" defaultValue={ item.name }/>
			<InputTel state={ state } title={ 'Phone' } keys={ 'phone' } defaultValue={ item.phone }/>
			<TextArea state={ state } title={ 'Address' } keys={ 'address' } defaultValue={ item.address }/>
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

export default FormUpdateReceiver;