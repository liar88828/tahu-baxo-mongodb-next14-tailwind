'use client'
import React from 'react'
import Navbar from './Navbar'
import { SearchInput } from './SearchInput'
import Product from './Product'
import { TabProduct } from './TabProduct'
import Category from "@/app/(sites)/search/Category";

export default function page() {
  return (<>
      <Navbar>
        <SearchInput />
      </Navbar>
      <div className='space-y-4 p-2'>
        <Category />
        <TabProduct />
        <Product />
      </div>
    </>
  )
}
