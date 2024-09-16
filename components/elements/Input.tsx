import { OnFormState } from "@/app/(sites)/auth/register/page";
import React from "react";
import usePhone from "@/hook/usePhone";

interface InputProp<T extends object> {
	state: OnFormState<T>
	title: string;
	keys: string
	type: React.HTMLInputTypeAttribute,
	
}

export const Input = <T extends object>({ state, title, keys, type }: InputProp<T>) => {
	return <div
		data-testid="InputDiv"
	>
		<label
			htmlFor={ keys }>{ title }</label>
		<input
			data-testid="InputValue"
			min={ 0 }
			name={ keys }
			type={ type }
			aria-label="cost-input"
			className={ "input input-bordered w-full" }
			placeholder={ `Enter ${ title } ...` }
		/>
		{/*@ts-ignore*/ }
		{ state.err?.[keys] &&
			<p className={ "text-error text-xs" }>
				{/*@ts-ignore*/ }
				{ state.err[keys] }
			</p>
		}
	</div>;
}

export function InputTel<T extends object>({ state, title, keys, }: Omit<InputProp<T>, 'type'>) {
	const { setPhone, phone } = usePhone()
	
	return <div>
		<label
			//@ts-ignore
			htmlFor={ keys }>{ title }</label>
		<input
			data-testid="InputDiv"
			
			value={ phone }
			onChange={ setPhone }
			min={ 0 }
			//@ts-ignore
			name={ keys }
			type={ 'tel' }
			aria-label="cost-input-phone"
			className={ "input input-bordered w-full" }
			placeholder={ `Enter ${ title } ...` }
		/>
		
		{/*@ts-ignore*/ }
		{ state.err?.[keys] &&
			<p className={ "text-error text-xs" }>
				{/*@ts-ignore*/ }
				{ state.err[keys] }
			</p>
		}
	</div>;
}

export function TextArea<T extends object>({ state, title, keys, }: Omit<InputProp<T>, 'type'>) {
	return <div
		data-testid="TextAreaDiv"
	>
		<label
			//@ts-ignore
			htmlFor={ keys }>{ title }</label>
		<textarea
			aria-label={ 'cost-textarea' }
			//@ts-ignore
			name={ keys }
			className={ 'textarea textarea-bordered w-full' }
			placeholder={ `Enter ${ title } ...` }
		/>
		{/*@ts-ignore*/ }
		{ state.err?.[keys] &&
			<p className={ 'text-error text-xs' }>
				{/*@ts-ignore*/ }
				{ state.err[keys] }
			</p>
		}
	</div>
}
