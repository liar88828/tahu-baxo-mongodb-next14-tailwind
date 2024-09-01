'use client'
import React from 'react'

export default function Category() {
  return (
    <div>
      <div className="flex justify-between items-center w-full text-2xl mb-2 px-2">
        <h1 className={'font-bold text-xl'}>Category</h1>
        <button className={'btn btn-primary btn-sm'}>Select</button>
      </div>
      {/*justify-between*/}
      <div className=' flex flex-wrap gap-2  '>
        {dataCategory.map((item, i) => (
          <button
            key={i}
            className="btn btn-sm shadow"
          >{item.title}</button>
        ))}
      </div>
    </div>
  )
}
const dataCategory = [
  {title : "Food"},
  {title : "Drink"},
  {title : "Accessories"},
  {title : "Protection"},
  {title : "Tiny"},
  {title : "Health"},
  {title : "Electronics"},
  {title : "Clothing"},
  {title : "Home"},
  {title : "Beauty"},
  {title : "Sports"},
  {title : "Toys"},
  {title : "Books"},
  {title : "Music"},
  {title : "Outdoor"}
]
