'use client'
import React, { useState } from "react";
import { usePageSearch } from "@/hook/usePageSearch";
import { IconSearch } from "@/components/icon/IconMore";

export type TitleCardProps = {
  title : string,
  button? : React.ReactNode,
}

export function TitleSearch({ title, button = '', }: TitleCardProps) {
  const [search, setSearch] = useState('')
  const { updateQueryParams } = usePageSearch()
  return (
		<div
			data-testid={ 'TitleSearch' }
			className='flex justify-between pl-1 mb-4 items-center'>
			<h1 className='font-semibold text-xl'>{ title }</h1>
			<div className="join w-1/2">
        <input
					className="input input-bordered join-item input-sm rounded-l-full w-full"
					placeholder="Search"
          onChange={ (e) => setSearch(e.target.value) }
        />
        <button
          onClick={ () => updateQueryParams('search', search) }
          className="btn join-item btn-sm rounded-r-full">
					<IconSearch/>
        </button>
      </div>
   
    </div>
  );
}

