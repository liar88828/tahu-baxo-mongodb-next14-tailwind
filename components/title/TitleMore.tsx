import { usePageSearch } from "@/hook/usePageSearch";
import React from "react";
import { TitleCardProps } from "@/components/title/TitleSearch";

export function TitleMore({ title, button = '', }: TitleCardProps) {
	const { updateQueryParams } = usePageSearch()
	return (
		<div
			data-testid={ 'TitleMore' }
			className='flex justify-between px-2 mb-1 items-center'>
			<h1 className='font-bold text-xl'>{ title }</h1>
			<button
				onClick={ () => updateQueryParams('search', 'flash sale') }
				className="btn btn-xs">
				{ button }
			</button>
		</div>
	);
}