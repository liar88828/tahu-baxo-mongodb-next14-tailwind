import React from 'react';
import Link from "next/link";

function Page() {
  return (
    <div className="p-5 space-y-5">
      <div className="text-left">
        <h1 className={'text-3xl font-bold'}>Welcome to [My Website]!</h1>
        <p className={'text-lg font-light'}>We`re excited to have you here. [Your Website Name] is your go-to platform
          for [briefly describe your website`s purpose, e.g., connecting with like-minded individuals, exploring
          innovative solutions, etc.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="email">Email</label>
          <input
            name={'email'}
            type="email"
            className={'input input-bordered w-full'}
            placeholder="Enter Your Email ..."
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name={'password'}
            type="password"
            className={'input input-bordered w-full'}
            placeholder="Enter Your Password ..."
          />
        </div>

        <button className={'btn btn-block btn-primary'}>Login</button>
      </div>

      <div className="space-y-1 mt-2">
        <h1>Ready to Get Started?</h1>
        <p> Forgot your password?<Link
          href={'/auth/forgot'}
          className={' text-primary cursor-pointer  underline '}
        >Reset it here.</Link></p>
        <p>
          Don’t have an account?<Link
          href={'/auth/register'}
          className={' text-primary cursor-pointer underline  '}
        > Sign up.</Link>
        </p>

      </div>

    </div>
  );
}

export default Page;
