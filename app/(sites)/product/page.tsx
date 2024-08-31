import React from 'react'
import Navbar from './Navbar'
import { CarouselImageDetail } from './CarouselImageDetail'
import NavBottom from "@/app/(sites)/product/NavBottom";
import { Description } from "@/app/(sites)/product/description";

export default function page() {
  return (
    <>
      <Navbar />
      <div className='p-2 space-y-2'>
        <CarouselImageDetail />
        <Description />
        <NavBottom />
      </div>
    </>
  )
}
