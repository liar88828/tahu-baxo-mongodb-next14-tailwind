'use client'
import React, { useContext } from "react";
import { ContextTrolley } from "@/components/provider/ProviderContext";

export function ProductNote() {
	const { state, description } = useContext(ContextTrolley)
	return (
		<textarea
			
			data-testid={ 'checkout-ProductNote' }
			value={ state.description.note }
			onChange={ e => {
				// reduce(prevState => ({
				// 	...prevState, description: {
				// 		...prevState.description,
				// 		note: e.target.value,
				// 	}
				// }))
				description({ note: e.target.value })
			} }
			className={ 'textarea textarea-bordered w-full shadow mt-1' }
			placeholder='Write a note for product ...'
		></textarea>
	);
}