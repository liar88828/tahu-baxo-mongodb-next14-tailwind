import Link from 'next/link'
import React from 'react'
import { SearchInput } from "@/app/(sites)/search/SearchInput";
import { IconBack } from "@/components/icon/IconMore";

export default function Navbar() {
  return (
    <div className='navbar bg-base-100 space-x-2'>
      <div className='flex-1'>
        <Link
          href='/home'
          className='btn btn-ghost btn-circle'
        >
          {/* back */}
          <IconBack />
        </Link>
      </div>
      <SearchInput />
    </div>
  )
}
