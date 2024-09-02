import React from 'react'
import { CarouselImageDetail } from './CarouselImageDetail'
import { Description } from "@/app/(sites)/product/description";
import NavBottom from "@/app/(sites)/product/NavBottom";
import { getProductId } from "@/server/action/product.action";
import { ParamsProduct } from "@/interface/ParamsProfile";

export default async function page(params : ParamsProduct) {
  const data = await getProductId(params.searchParams.id)
  if (!data) {
    return <h1>Error Bos</h1>
  }
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
