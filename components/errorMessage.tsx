import React from "react";

export function ErrorMessage({ state }: { state?: string }) {
	return <>
		{ state && <p className={ "text-error text-xs" }>{ state }</p> }
	</>;
}