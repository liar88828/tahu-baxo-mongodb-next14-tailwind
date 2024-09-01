'use client'
import { Icon } from '@iconify/react'
import React from 'react'

export default function Category() {
  return (
    <div className='rounded-lg shadow p-2 bg-base-200/40 overflow-y-scroll h-48'>
      <div className='grid grid-cols-4 gap-2 '>
        {categoryProduct.map((item, i) => {
          return (
            <div
              className='flex flex-col items-center '
              key={item.title}
            >
              <button
                className='btn btn-circle '
              >
                <Icon
                  icon={item.icon}
                  className='size-8'
                />
              </button>
              <h1 className='text-center font-bold text-neutral/80  mt-2 text-xs'>{item.title}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type CategoryProduct = { title : string, icon : string, link : string };
// Example array of CategoryProduct
export const categoryProduct : CategoryProduct[] = [
  {
    title : "Electronics",
    icon : "mdi:cellphone", // Example icon from Iconify
    link : "/search?category=electronics"
  },
  {
    title : "Fashion",
    icon : "mdi:tshirt-crew", // Example icon from Iconify
    link : "/search?category=fashion"
  },
  {
    title : "Home Appliances",
    icon : "mdi:fridge-outline", // Example icon from Iconify
    link : "/search?category=home-appliances"
  },
  {
    title : "Books",
    icon : "mdi:book-open-page-variant", // Example icon from Iconify
    link : "/search?category=books"
  },
  {
    title : "Toys",
    icon : "mdi:toy-brick-outline", // Example icon from Iconify
    link : "/search?category=toys"
  },
  {
    title : "Groceries",
    icon : "mdi:cart-outline", // Example icon from Iconify
    link : "/search?category=groceries"
  },
  {
    title : "Beauty & Health",
    icon : "mdi:heart-outline", // Example icon from Iconify
    link : "/search?category=beauty-health"
  },
  {
    title : "Sports & Outdoors",
    icon : "mdi:bike", // Example icon from Iconify
    link : "/search?category=sports-outdoors"
  },
  {
    title : "Automotive",
    icon : "mdi:car", // Example icon from Iconify
    link : "/search?category=automotive"
  },
  {
    title : "Jewelry",
    icon : "mdi:ring", // Example icon from Iconify
    link : "/search?category=jewelry"
  }
];
