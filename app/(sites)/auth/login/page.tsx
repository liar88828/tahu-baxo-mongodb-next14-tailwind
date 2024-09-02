'use client';
import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { onLogin } from "@/server/action/auth.action";
import { redirect } from "next/navigation";
import { initialState } from "@/server/schema/user.schema";

export default function Page() {
  const [state, formAction,] = useFormState(onLogin, initialState)
  const {pending} = useFormStatus();
  if (state?.message?.[0] === 'true') {
    redirect('/home')
  }
  return (
    <div className="p-5 space-y-5">
      <div className="text-left">
        <h1 className={'text-3xl font-bold'}>Welcome Back!</h1>
        <p className={'text-lg font-light'}>Please sign in to your account.</p>
      </div>

      <form
        action={formAction}
        className="space-y-5"
      >

        <div>
          <label htmlFor="email">Email</label>
          <input
            name={'email'}
            type="email"
            id={'email'}
            className={'input input-bordered w-full'}
            placeholder="Enter Your Email ..."
          />
          {state?.email &&
            <p className={'text-error text-xs'}>
              {state.email}
            </p>
          }
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            name={'password'}
            type="password"
            id={'password'}
            className={'input input-bordered w-full'}
            placeholder="Enter Your Password ..."
          />
          {state?.password &&
            <p className={'text-error text-xs'}>
              {state.password}
            </p>
          }
        </div>
        <button
          disabled={pending}
          type="submit" className={'btn btn-block btn-primary'}
        >Login
        </button>
      </form>

      <div className="space-y-1 mt-2">
        <p> Forgot your password? <Link
          href={'/auth/forgot'}
          className={' text-primary cursor-pointer  underline '}
        >Reset it here.</Link></p>
        <p>
          Don’t have an account? <Link
          href={'/auth/register'}
          className={' text-primary cursor-pointer underline  '}
        >Sign up.</Link>
        </p>

      </div>

    </div>
  );
}
