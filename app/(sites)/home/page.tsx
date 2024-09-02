import Carousel from './Carousel'
import Category from './Category'
import Product from './Product'
import { SearchInput } from "@/app/(sites)/search/SearchInput";
import React, { Suspense } from "react";
import NavButton from "@/app/(sites)/home/NavButton";

export default function page() {
  return (
    <>
      <div className='space-y-4 p-3 pb-20'>
        <SearchInput />
        <Carousel />
        <Category />
        <Suspense fallback={<h1>Loading Product...</h1>}>
          <Product />
        </Suspense>
      </div>
      <NavButton />
    </>
  )
}
