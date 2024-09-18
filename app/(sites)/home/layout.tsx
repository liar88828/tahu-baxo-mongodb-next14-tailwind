import React from "react";
import { IconBell, IconMenu, IconPerson } from "@/components/icon/IconMore";
import Link from "next/link";

import { cookieService } from "@/server/service/auth/cookie.service";

export default async function layout({ children }: { children: React.ReactNode }) {
  const auth = await cookieService()
	// console.log(auth)
  return (<>
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle'
          >
            <IconMenu/>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='navbar-center'>
        <a className='btn btn-ghost text-xl'>Home</a>
      </div>
      <div className='navbar-end'>
        <button className='btn btn-ghost btn-circle'>
          <div className='indicator'>
            <IconBell/>
            <span className='badge badge-xs badge-primary indicator-item'></span>
          </div>
        </button>
        <div className='dropdown  dropdown-end'>
          <div
            tabIndex={ 0 }
            role='button'
            className='btn btn-ghost btn-circle'
          >
            <IconPerson/>
          </div>
          <ul
            tabIndex={ 0 }
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3  p-2 shadow'
          >{ auth.checkAuth.data ? (<>
							<li>
								<Link href={ '/profile' }>Info</Link>
							</li>
							<li>
								<Link href={ '/auth/logout' }>Logout</Link>
							</li>
						</>
					) : (
						<>
            <li>
							<Link href={ '/auth/login' }>Login</Link>
            </li>
            <li>
							<Link href={ '/auth/register' }>Register</Link>
            </li>
						</>
					) }
          </ul>
        </div>
      </div>
    </div>
      { children }
    </>
  )
}
