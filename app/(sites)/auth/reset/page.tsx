'use client'
import React from 'react';
import Link from "next/link";
import { onReset } from "@/server/action/auth.action";
import { useFormState, useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { initialState } from "@/interface/model/auth.type";

function Page() {
  const [state, formAction,] = useFormState(onReset, initialState)
  const {pending} = useFormStatus();
  console.log(state)
  if (state?.message?.[0] === 'true') {
    redirect('/auth/done')
  }
  return (
    <div
      data-testid="reset-Page"
      className="p-5 space-y-5">
      <div className="text-left">
        <h1 className={'text-3xl font-bold'}>Set Your New Password</h1>
        <p className={'text-lg font-light'}>Please enter a new password for your account.</p>
      </div>

      <form
        action={formAction}
        className="p-2 space-y-5"
      >
        <div>
          <label htmlFor="New Password">New Password</label>
          <input
            name={'New Password'}
            type="password"
            className={'input input-bordered w-full'}
            placeholder="Enter Your New Password ..."
          />
					{ state.err?.password &&
            <p className={'text-error text-xs'}>
							{ state.err.password }
            </p>
          }
        </div>

        <div>
          <label htmlFor="Confirm New Password">Confirm New Password</label>
          <input
            name={'Confirm New Password'}
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
      </form>

      <div className="">
        <button
          disabled={pending}
          className={'btn btn-block btn-primary'}
        >Reset Password
        </button>

        <p> Remembered your password?<Link
          href={'/auth/login'}
          className={' text-primary cursor-pointer  underline '}
        >Sign in here.</Link></p>
      </div>

    </div>
  );
}

export default Page;
