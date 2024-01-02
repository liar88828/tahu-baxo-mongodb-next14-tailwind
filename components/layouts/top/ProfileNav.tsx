'use client'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function ProfileNav() {
  const { data: session } = useSession()
  if( !session ) {
    // console.log('not login', session)
  }
  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={ 0 } className="btn btn-ghost btn-circle ">
          <div className="indicator">
            <Icon icon={ 'mdi:cart-outline' } width={ 18 } height={ 18 }/>
            <span className="badge badge-sm  badge-info indicator-item">8</span>
          </div>
        </label>
        <div tabIndex={ 0 } className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div className="card-body">
            <span className="font-bold text-lg">8 Items</span>
            <span className="text-info">Subtotal: $999</span>
            <div className="card-actions">
              <button className="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown dropdown-end">

        <label tabIndex={ 0 } className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                session?.user.image ?? 'https://picsum.photos/200/200.webp'
              }
              alt={ 'profile' }
            />
          </div>
        </label>
        <ul tabIndex={ 0 } className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <Link
              href={ '/profile' } replace>Profile
              <span className='badge'>New</span>
            </Link>
          </li>
          <li><a>Settings</a></li>
          { session ? (
            <li>
              <LogoutButton/>
            </li>
          ) : (
              <li>
                <Link href={ 'api/auth/signin?callbackUrl=/profile' }>Login</Link>
              </li>
            ) }
        </ul>
      </div>
    </div>

  )
}

function LogoutButton() {
  return (
    <button
      onClick={ () => signOut() }
    >Logout Client</button>
  )
}
