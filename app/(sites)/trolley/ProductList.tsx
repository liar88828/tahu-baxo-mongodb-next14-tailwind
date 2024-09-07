import React from 'react'
import { IconAdd, IconDelete, IconRemove } from "@/components/icon/IconMore";
import { getTrolleyAll } from "@/server/action/trolley.action";
import { TrolleyDataId } from "@/interface/model/trolley.type";
import { ProductDB } from "@prisma/client";
import { Rupiah } from "@/lib/utils/formatMoney";

export async function ProductList(idTrolley: TrolleyDataId) {
  const data = await getTrolleyAll(idTrolley)
  if (!data) {
    return <h1>Error Bos</h1>
  }
  return (
    <div>
      <div className="flex justify-between items-center w-full text-2xl mb-2 ">
        <div className="flex space-x-2 items-center justify-between ">
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm"/>
          <h1 className={ 'font-bold text-xl' }>Product List</h1>
        </div>
        {/*<button className={'btn btn-primary btn-sm'}>Show</button>*/ }
      </div>
      <div className='space-y-4 '>
        { data.map((item, index) => (
          item.Product ? <ProductListItem
            item={ item.Product }
            key={ index }>
            <input type="checkbox" defaultChecked className="checkbox checkbox-sm mr-2"/>
          </ProductListItem> : null
        )) }
      </div>
    </div>
  )
}

export function ProductListItem({ item, children }: { item: ProductDB, children?: React.ReactNode }) {
  return (
    <div
      key={ item.id }
      className={ 'flex items-center ' }>
      <div className={ ' ' }>
        { children }
      </div>
      <div className='flex rounded-lg p-2 space-x-2 w-full   border '>
        <img
          src='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          alt='product image'
          className='h-auto w-20 rounded-full object-cover'
        />
        <div className='flex  w-full'>
          <div className=' w-full'>
            <div className=' flex justify-between  w-full'>
              <div className=''>
                <h1 className='text-lg font-semibold text-base-content/80'>
                  { item.nama }
                </h1>
                <h2 className='text-sm font-bold text-base-content/50'>Red</h2>
              </div>
              <button className='btn btn-circle btn-outline btn-sm'>
                <IconDelete/>
              </button>
            </div>
            <div className='flex justify-between items-center w-full '>
              <h1 className='text-lg font-bold'>{ Rupiah(item.harga) }</h1>
              <ProductListCount/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductListCount() {
  return (
    <div className='flex space-x-2 justify-center items-center'>
      <button className='btn btn-square btn-outline btn-sm'>
        {/* icon plus */ }
        <IconAdd/>
      </button>
      <h1 className='font-bold text-xl'>1</h1>
      <button className='btn btn-square btn-outline btn-sm'>
        {/* icon minus */ }
        <IconRemove/>
      </button>
    </div>
  )
}
