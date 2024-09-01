import Link from "next/link";
import { Icon } from "@iconify/react";
import React from "react";
import { IconBack } from "@/components/icon/IconMore";
export default function page() {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <Link
          href='/home'
          className='btn btn-ghost btn-circle'
        >
          {/* back */}
          <IconBack />
        </Link>
      </div>
      <div className='navbar-center'>
        <a className='btn btn-ghost text-xl'>Transaction</a>
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
