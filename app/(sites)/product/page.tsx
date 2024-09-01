import React from 'react'
import { CarouselImageDetail } from './CarouselImageDetail'
import { Description } from "@/app/(sites)/product/description";
import NavBottom from "@/app/(sites)/product/NavBottom";

export default function page() {
  return (
    <>
      <div className='p-2 space-y-2 pb-16'>
        <CarouselImageDetail />
        <Description />
      </div>
      <NavBottom />
    </>
  )
}
