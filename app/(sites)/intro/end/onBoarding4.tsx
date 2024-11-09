import Link from "next/link";
import React from "react";

export function OnBoarding4() {
  return (
    <div className="text-left space-y-2 ">
      <h1 className={'text-3xl font-bold py-8'}>What You Can Do Here:</h1>
      <Link
        href='/auth/login'
        className={'btn btn-block btn-primary'}
      >Sign In</Link>
      <Link
        href='/intro/feature3'
        className={'btn btn-block btn-outline '}
      >Back</Link>
      <p>
        If you have any questions or need assistance, feel free to <Link
        href={'#'}
        className={' text-primary cursor-pointer underline  '}
      >Contact Us.
      </Link>
      </p>
    </div>

  );
}
