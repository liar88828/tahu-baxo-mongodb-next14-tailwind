'use client'
import React from "react";
import Link from "next/link";

export type TitleCardProps = {
  title : string,
  button? : React.ReactNode,
}

export function TitleCard(
  {
    title, button = '',
  } : TitleCardProps) {
  return (
    <div className='flex justify-between px-2 mb-1'>
      <h1 className='font-bold text-xl'>{title}</h1>
      <Link
        href={ '' }>
        {button}
      </Link>
    </div>
  );
}
