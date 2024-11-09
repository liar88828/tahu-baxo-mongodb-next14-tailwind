import React from 'react';
import Link from "next/link";

function Page() {
  return (
    <div
      data-testid="verify-Page"
      className="p-5 space-y-5">
      <div className="text-left">
        <h1 className={'text-3xl font-bold'}>Verify Your Email Address</h1>
        <p className={'text-lg font-light'}>We’ve sent a verification link to your email. Please check your inbox and
          click the link to verify your account.</p>
      </div>

      <div className=" space-y-5">

        <button className={'btn btn-block btn-primary'}>Set up Face ID</button>
        <button className={'btn btn-block btn-outline'}>Reset Password</button>
      </div>

      <div className="space-y-1 pt-1">
        <p>Didn’t receive the email? <Link
          href={'/auth/login'}
          className={' text-primary cursor-pointer  underline '}
        >Resend verification link</Link>

        </p>
        <p>Already verified? <Link
          href={'/auth/login'}
          className={' text-primary cursor-pointer  underline '}
        >Sign in here.</Link></p>
      </div>

    </div>
  );
}

export default Page;
