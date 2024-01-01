'use client'
import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function Profile() {
  const { data } = useSession( {
    required: true,
    onUnauthenticated() {
      redirect( '/api/auth/signin?callbackUrl=/profile' )
    },
  } )
  // if( !data ) {
  //  redirect( '/api/auth/signin?callbackUrl=/' )
  // }

  if( !data ) return ( <h1>Loading...</h1> )
  return (
    <div className='static card bg-base-200/70 card-body shadows'>
      <div className=' flex flex-wrap gap-5 justify-between px-6'>

        <div>
          <img
            className="rounded-xl"
            src={ data.user.image } alt={ 'profile' }/>
          <p>
            <span className='mr-2'>as</span>
            <span className={ data.user.role }>{ data.user.role }</span>
          </p>
        </div>

        <div className="space-y-2">
          <h1 className='card-title font-extrabold'>Personal</h1>
          <p>{ data.user.name }</p>
          <p>Data of Birth 12 June 2001</p>
          <p>Gender <span className={ 'badge badge-info' }> Male</span></p>
        </div>

        <div className="space-y-2">
          <h1 className='card-title font-extrabold'>Contact</h1>
          <p>{ data.user.email }</p>
          <p>Phone 123123123123</p>
          <p>Address jl.semarang indah no.12</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;