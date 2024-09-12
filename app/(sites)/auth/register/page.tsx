'use client'
import React from 'react';
import Link from "next/link";
import { onRegister } from "@/server/action/auth.action";
import { useFormState, useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { initialState } from "@/interface/model/auth.type";

export type OnFormState<T> = {
  message?: string,
  err?: T
  
}

function Page() {
  const [state, formAction,] = useFormState(onRegister, initialState)
  const {pending} = useFormStatus();
  console.log(state)
  if (state?.message?.[0] === 'true') {
    redirect('/auth/otp')
  }
  return (
    <div
      data-testid="register-Page"
      className="p-5 space-y-5">
      <div className="text-left">
        <h1 className={'text-3xl font-bold'}>Create Your Account</h1>
        <p className={'text-lg font-light'}>Join us by creating a new account. It`s quick and easy!</p>
      </div>

      <form
        action={formAction}
        className=" space-y-5"
      >
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            name={'fullname'}
            type="text"
            className={'input input-bordered w-full'}
            placeholder="Enter Your Fullname ..."
          />
          { state.err?.fullname &&
            <p className={'text-error text-xs'}>
              { state.err.fullname }
            </p>
          }
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name={'email'}
            type="email"
            className={'input input-bordered w-full'}
            placeholder="Enter Your Email ..."
          />
          { state.err?.email &&
            <p className={'text-error text-xs'}>
              { state.err.email }
            </p>
          }
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name={'password'}
            type="password"
            className={'input input-bordered w-full'}
            placeholder="Enter Your Password ..."
          />
          { state.err?.password &&
            <p className={'text-error text-xs'}>
              { state.err.password }
            </p>
          }
        </div>
        <div>
          <label htmlFor="confPass">Confirm New Password</label>
          <input
            name={'confPass'}
            type="password"
            className={'input input-bordered w-full'}
            placeholder="Enter Your Confirm New Password ..."
          />
          { state.err?.confPass &&
            <p className={'text-error text-xs'}>
              { state.err.confPass }
            </p>
          }
        </div>
        <button className={'btn btn-block btn-primary'}>Sign Up</button>
      </form>
      <div className="space-y-1 mt-2">
        <p>Already have an account? <Link
          href={'/auth/login'}
          className={' text-primary cursor-pointer  underline '}
        >Sign in here.</Link></p>

        <p> By signing up, you agree to our <span className={'text-primary'}>Terms of Service</span> and <span
          className={'text-primary'}
        >Privacy Policy.</span></p>
      </div>

    </div>
  );
}

export default Page;
