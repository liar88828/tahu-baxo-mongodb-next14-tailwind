'use client'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <Link
          href='/home'
          className='btn btn-ghost btn-circle'
        >
          {/* back */}
          <Icon
            icon='ic:round-arrow-back'
            className='size-5'
          />
        </Link>
      </div>
      <div className='navbar-center'>
        <a className='btn btn-ghost text-xl'>daisyUI</a>
      </div>
      <div className='navbar-end'>
        <button className='btn btn-ghost btn-circle'>
          <Icon icon={'mdi:favorite'}
                className={'size-5'}
          />
        </button>

      </div>
    </div>
  )
}
