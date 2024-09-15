import React from 'react';
import { Content, } from "@/app/(sites)/profile/com/content";
import { ProfileTab } from "@/app/(sites)/profile/com/ProfileTab";
import Link from "next/link";
import { IconBack } from "@/components/icon/IconMore";
import { ProfileInfo, Shipping } from "@/app/(sites)/profile/com/serverCom";

export default async function Page() {
  return (
    <>
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <Link
            href='/home'
            className='btn btn-ghost btn-circle'
          >
            <IconBack/>
          </Link>
        </div>
        <div className='navbar-center'>
          <a className='btn btn-ghost text-xl'>Profile</a>
        </div>
        <div className='navbar-end'>
          <button className='btn btn-ghost btn-circle'>
          
          </button>
          <button className='btn btn-ghost btn-circle'>
            <div className='indicator'>
            
            </div>
          </button>
        </div>
      </div>
      {/**/ }
      <div className='space-y-2 p-2'>
        <div className="space-y-6">
          <section className="card card-compact card-bordered overflow-hidden ">
            <ProfileInfo/>
            <div className="p-2">
              <ProfileTab/>
            </div>
            <section className="~p-4/8">
              <Content/>
              <div className="mt-2">
                <Shipping/>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  )
}

