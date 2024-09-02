'use client'
import React from "react";

export type TitleProfileProps = {
  title : string, text : string,
  // click : () => void
};
export function TitleCardProfile({title, text,} : TitleProfileProps) {
  return (
    <div className="flex justify-between items-center w-full text-2xl mb-2 ">
      <h1 className={'font-bold text-xl'}>{title}</h1>
      <button
        // onClick={click}
        className={'btn btn-primary btn-sm'}
      >{text}</button>
    </div>
  );
}
