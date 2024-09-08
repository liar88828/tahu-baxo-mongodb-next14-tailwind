'use client'
import React, { useState } from "react";
import { usePageSearch } from "@/hook/usePageSearch";

export type TitleCardProps = {
  title : string,
  button? : React.ReactNode,
}

export function TitleCard(
  {
    title, button = '',
  } : TitleCardProps) {
  
  const [search, setSearch] = useState('')
  
  const { updateQueryParams } = usePageSearch()
  return (
    <div className='flex justify-between px-2 mb-1 items-center'>
      <h1 className='font-bold text-xl'>{ title }</h1>
      <div className="join">
        <input
          className="input input-bordered join-item input-sm rounded-l-full w-fit"
          placeholder="Email"
          onChange={ (e) => setSearch(e.target.value) }
        />
        <button
          onClick={ () => updateQueryParams('search', search) }
          className="btn join-item btn-sm rounded-r-full">
          { button }
        </button>
      </div>
   
    </div>
  );
}
