'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { CreateUserSchemaZod, TCreateUserZod } from '@/lib/validator/zod';

export default function page() {
  return <UserForm method='POST' id=""/>
}


 function UserForm( {
  method,
  id,
}: {
  method: 'POST' | 'PUT'
  id: string
} ) {
  const {
          handleSubmit,
          formState: { errors },
          register,
        }                   = useForm<TCreateUserZod>( { resolver: zodResolver( CreateUserSchemaZod ) } )
  const router              = useRouter()
  const [ error, setError ] = useState<string>( '' )

  const handlerSubmit = async ( data: TCreateUserZod ) => {
    const res = await fetch( '/api/users', {
      method : 'POST',
      body   : JSON.stringify( data ),
      headers: {
        'Content-Type': 'application/json',
      },
    } )
    console.error( res.ok )
    if( !res.ok ) {
      const response = await res.json()
      setError( response.message )
    }
    else {
      router.refresh()
      router.push( '/' )
    }
  }

  const submit = ( data: TCreateUserZod ) => {
    handlerSubmit( data )
    console.log( data )
  }

  return (
    <div className='static card bg-base-200 '>
      <div className='card-body'>
        <form
          onSubmit={ handleSubmit( submit ) }
          className='flex flex-col items-center justify-center gap-5 mt-10'>
          <h1 className='card-title text-center'>Create New Account</h1>

          <input
            { ...register( 'name' ) }
            type='text'
            placeholder='Enter Your Name Title...'
            className='input input-bordered w-full max-w-lg'
          />
          { errors.name && <p className='text-red-600'>{ errors.name.message }</p> }

          <input
            { ...register( 'email' ) }
            type='email'
            placeholder='Enter Your Email Title...'
            className='input input-bordered w-full max-w-lg'
          />
          { errors.email && (
            <p className='text-red-600'>{ errors.email.message }</p>
          ) }

          <input
            { ...register( 'password' ) }
            type='password'
            placeholder='Enter Your Password Title...'
            className='input input-bordered w-full max-w-lg'
          />
          { errors.password && (
            <p className='text-red-600'>{ errors.password.message }</p>
          ) }

          <input
            { ...register( 'confirmPassword' ) }
            type='password'
            placeholder='Enter Your Confirm Password Title...'
            className='input input-bordered w-full max-w-lg'
          />
          { errors.confirmPassword && (
            <p className='text-red-600'>{ errors.confirmPassword.message }</p>
          ) }

          <button className='btn btn-primary w-full max-w-lg'>
            { method === 'POST' ? 'Create' : 'EDIT' }
          </button>
          <h1 className='text-red-500 text-lg'>{ error }</h1>
        </form>
      </div>
    </div>
  )
}
