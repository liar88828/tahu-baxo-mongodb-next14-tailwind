import React from 'react';
import Link from "next/link";

function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-w-fit">
      <img src="/intro/4.svg" alt="intro1"
           className={'size-80'}
      />
      <div className="px-5">
        <OnBoarding4 />
      </div>

    </div>
  )
}

export function OnBoarding4() {
  return (
    <div className="text-left space-y-2 ">
      <h1 className={'text-3xl font-bold py-8   '}>What You Can Do Here:</h1>
      <Link
        className={'btn btn-block btn-primary'}
        href={'/auth/login'}
      >Sign In</Link>
      <Link
        href='/intro/feature3'
        className={'btn btn-block btn-outline '}
      >Back</Link>
      <p>
        If you have any questions or need assistance, feel free to <Link
        href={'#'}
        className={' text-primary cursor-pointer underline  '}
      >Contact Us.</Link>

      </p>
    </div>

  );
}
export default Page;
