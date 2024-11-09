import { OnFormState } from "@/app/(sites)/auth/register/page";
import React from "react";
import usePhone from "@/hook/usePhone";
import { IconDelete } from "@/components/icon/IconMore";

interface InputProp<T extends object> {
	state: OnFormState<T>
	title: string;
	keys: string
	type: React.HTMLInputTypeAttribute,
	defaultValue?: string
}

export const Input = <T extends object>({ state, title, keys, type, defaultValue }: InputProp<T>) => {
	return <div
		data-testid="InputDiv"
	>
		<label
			htmlFor={ keys }>{ title }</label>
		<input
			defaultValue={ defaultValue }
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

export function InputTel<T extends object>({ state, title, keys, defaultValue = '' }: Omit<InputProp<T>, 'type'>) {
	const { phone, setPhone, onReset } = usePhone(defaultValue)
	
	return <>
		<div className={ 'flex flex-col' }>
		<label
			//@ts-ignore
			htmlFor={ keys }>{ title }</label>
			<div className="join">
				<input
					
					onKeyDown={ (e) => {
						if (e.key === 'Delete') onReset()
					} }
					data-testid="InputDiv"
					// defaultValue={ defaultValue }
					value={ phone }
					onChange={ setPhone }
					min={ 0 }
					//@ts-ignore
					name={ keys }
					type={ 'text' }
					aria-label="cost-input-phone"
					className={ "input input-bordered w-full join-item" }
					placeholder={ `Enter ${ title } ...` }
				/>
				<button
					type="button"
					onClick={ onReset }
					className="btn  btn-outline join-item  hover:btn-error">
					<IconDelete/>
				</button>
			</div>
			
			{/*@ts-ignore*/ }
			{ state.err?.[keys] &&
				<p className={ "text-error text-xs" }>
					{/*@ts-ignore*/ }
					{ state.err[keys] }
				</p>
			}
		</div>
	</>
}

export function TextArea<T extends object>({ state, title, keys, defaultValue }: Omit<InputProp<T>, 'type'>) {
	return <div
		data-testid="TextAreaDiv"
	>
		<label
			//@ts-ignore
			htmlFor={ keys }>{ title }</label>
		<textarea
			defaultValue={ defaultValue }
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
