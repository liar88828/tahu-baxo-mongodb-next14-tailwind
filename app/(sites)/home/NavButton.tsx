'use client'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

export default function NavButton() {
  return (
		<div className='btm-nav bg-base-100 h-20'>
      <NavBottomItem
        title='Home'
        icon='ic:round-home'
        link='/home'
      />
      <NavBottomItem
        title='Search'
        icon='ic:round-search'
        link='/search'
      />
      <NavBottomItem
        title='trolly'
        icon='mdi:trolley'
        link='/trolley'

      />
      <NavBottomItem
        title='Profile'
        icon='ic:round-person'
        link='/profile'
      />
    </div>
  )
}

export function NavBottomItem(
  {title, icon, link} : {
    title : string
    icon : string
    link : string
  }) {
  return (
    <Link href={link} className=''>
      <Icon
        icon={icon}
        className='size-8'
      />
      <span className='btm-nav-label'>{title}</span>
    </Link>
  )
}
