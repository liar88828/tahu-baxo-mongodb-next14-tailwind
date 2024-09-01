'use client'
import React from "react";

export type TitleCardProps = {
  title : string,
  button? : React.ReactNode,
  click? : () => void,
}

export function TitleCard(
  {
    title, button = '', click = () => {
  }
  } : TitleCardProps) {
  return (
    <div className='flex justify-between px-2 mb-1'>
      <h1 className='font-bold text-xl'>{title}</h1>
      <button onClick={click}>
        {button}
      </button>
    </div>
  );
}
