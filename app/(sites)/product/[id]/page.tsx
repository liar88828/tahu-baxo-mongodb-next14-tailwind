import React from 'react'
import { CarouselImageDetail } from '../CarouselImageDetail'
import { Description } from "@/app/(sites)/product/description";
import NavBottom from "@/app/(sites)/product/NavBottom";
import { getProductId } from "@/server/action/product.action";
import { ParamsProduct } from "@/interface/server/param";

export default async function page({ params }: ParamsProduct) {
  const data = await getProductId(params.id)
  if (!data) {
    return <h1>Error Bos</h1>
  }
  // console.log(params);
  // console.log('------');
  // console.log(data);
  // console.log('------');
  return (
    <>
      <div className='p-2 space-y-2 pb-16'>
        <CarouselImageDetail />
        <Description item={ data }/>
      </div>
      <NavBottom />
    </>
  )
}
