import React from "react";

export function ErrorMessage({ state }: { state?: string }) {
	return <>
		{ state && <p
			data-testid={ 'ErrorMessage' }
			className={ "text-error text-xs" }>{ state }</p> }
	</>;
}