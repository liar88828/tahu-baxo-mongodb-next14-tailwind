'use client'
import { useFormState, useFormStatus } from 'react-dom';
import Link from "next/link";
import { onForgot } from "@/server/action/auth.action";
import { redirect } from "next/navigation";
import { initialState } from "@/interface/model/auth.type";

function Page() {
  const [state, formAction,] = useFormState(onForgot, initialState)
  const {pending} = useFormStatus();
  if (state?.message?.[0] === 'true') {
    redirect('/auth/reset');

  }
  console.log(pending)
  return (
    <div className="p-5 space-y-5">
      <div className="text-left">
        <h1 className={'text-3xl font-bold'}>Forgot Your Password?</h1>
        <p className={'text-lg font-light'}>No worries! Just enter the email address associated with your account, and
          we’ll send you a link to reset your password.</p>
      </div>

      <form
        action={formAction}
        className=" space-y-5"
      >
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            name={'email'}
            type="email"
            className={'input input-bordered w-full'}
            placeholder="Enter Your Email ..."
          />
        </div>
        <p aria-live="polite">{state?.message}</p>

        <button
          disabled={pending}
          className={'btn btn-block btn-primary'}
        >
          {pending ? 'Submitting...' : 'Reset Password '}
        </button>
      </form>

      <div className="space-y-1 pt-1">
        <p>Remembered your password?<Link
          href={'/auth/login'}
          className={' text-primary cursor-pointer  underline '}
        >Sign in here.
        </Link>

        </p>
        <p>Need help?<Link
          href={'/auth/login'}
          className={' text-primary cursor-pointer underline '}
        >Sign in here.</Link></p>
      </div>
    </div>
  );
}

export default Page;
