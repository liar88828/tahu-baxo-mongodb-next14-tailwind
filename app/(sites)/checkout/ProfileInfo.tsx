'use client'
import { Icon } from '@iconify/react'

import React from 'react';
import { getUserAll } from "@/server/action/user.action";
import { UserPublic } from "@/interface/user/UserPublic";
import { TitleCardProfile } from "@/app/(sites)/checkout/TitleCardProfile";

export async function ProfileInfo() {
  const data = await getUserAll()
  if (!data) {
    return <h1>User is Not found</h1>
  }
  return (
    <div>
      <TitleCardProfile
        title={'User Information'}
        text={'Select'}
      />
      <div className='flex rounded-lg border-white/30 p-2 border-2 space-x-2 shadow'>
        <img
          src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
          alt='avatar'
          className='h-auto w-20 rounded-full'
        />
        {data.map(item => (
          <ProfileInfoItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

interface ProfileInfoItemProps {
  item : UserPublic
}

function ProfileInfoItem({item} : ProfileInfoItemProps) {
  return (
    <div className='flex justify-between w-full'>
      <div className='space-y-2'>
        <h1 className='text-lg font-bold'>{item.name}</h1>
        <div className=''>
          <div className='flex space-x-3'>
            <h1 className='text-sm'>{item.email}</h1>
            <h1 className='text-sm'>{item.phone}</h1>
          </div>
          <h1 className='text-xs font-light'>
            {item.address}
          </h1>
        </div>
      </div>
      <button className='btn btn-circle btn-outline btn-sm'>
        {/* edit */}
        <Icon icon='material-symbols:edit' />
      </button>
    </div>
  );
}

export default ProfileInfo;
