'use client'
import { Icon } from '@iconify/react'

import React from 'react';

function TitleCardProfile({title, text, click} : { title : string, text : string, click : () => void }) {
  return (
    <div className="flex justify-between items-center w-full text-2xl mb-2 ">
      <h1 className={'font-bold text-xl'}>{title}</h1>
      <button
        onClick={click}
        className={'btn btn-primary btn-sm'}
      >{text}</button>
    </div>
  );
}

export default ProfileInfo;

export function ProfileInfo() {
  return (
    <div>
      <TitleCardProfile
        title={'User Information'}
        text={'Select'}
        click={() => {
        }}
      />
      <div className='flex rounded-lg border-white/30 p-2 border-2 space-x-2 shadow'>
        <img
          src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
          alt='avatar'
          className='h-auto w-20 rounded-full'
        />
        <div className='flex  justify-between w-full'>
          <div className='space-y-2'>
            <h1 className='text-lg font-bold'>Username Jhon Doe</h1>
            <div className=''>
              <div className='flex space-x-3'>
                <h1 className='text-sm'>@johndoe</h1>
                <h1 className='text-sm'>012 1232 2133</h1>
              </div>
              <h1 className='text-xs font-light'>
                Jl Merpati II 42 RT 003/06, Dki Jakarta
              </h1>
            </div>
          </div>
          <button className='btn btn-circle btn-outline btn-sm'>
            {/* edit */}
            <Icon icon='material-symbols:edit' />
          </button>
        </div>
      </div>
    </div>
  )
}
