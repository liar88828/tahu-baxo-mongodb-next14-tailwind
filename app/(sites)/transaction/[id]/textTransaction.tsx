import React from "react";

export const TextTransaction = (
	{ title, text }:
		{
			title: string, text: string | number,
		}
) => {
	return (
		<div className="flex justify-between w-full">
			<h1 className={ 'text font-medium text-neutral/50' }>{ title }</h1>
			<h2 className={ 'text font-semibold text-neutral/80' }>{ text }</h2>
		</div>
	);
};