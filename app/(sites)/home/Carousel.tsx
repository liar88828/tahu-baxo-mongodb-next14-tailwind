import React from 'react'
import { repeat } from "@/lib/utils/repeat";

export default function Carousel() {
  return (
    <div>
      <div className='carousel w-full space-x-2'>
        {repeat().map((item, i) => (
          <CarouselItem key={i} index={i} />))}
      </div>
      <div className='flex w-full justify-center gap-2 py-2'>
        {repeat().map((item, i) => (
          <a
            key={i}
            href={`#item_${i} `}
            className='btn btn-xs bg-white/50 btn-circle'
          >
          </a>))}
      </div>
    </div>
  )
}

export function CarouselItem({index} : { index : number }) {
  return (
    <div
      id={`item_${index}`}
      className='carousel-item w-full flex justify-center '
    >
      <div className={`rounded-xl h-40 w-full object-cover  flex  ${index % 2 === 0 ? 'bg-blue-400' : 'bg-red-400'}`}>
        <div className="py-5 pl-5 flex justify-between flex-col">
          <h1 className={'text-xl font-extrabold text-base-300/60'}>Up to 65% Off on All Products </h1>
          <h2 className={' text-md font-medium text-base-300/60'}>Lorem ipsum dolor sit amet</h2>
        </div>
        <img
          src='/xbox.png'
          className=' h-40 w-auto object-cover'
        />
      </div>
    </div>
  );
}
