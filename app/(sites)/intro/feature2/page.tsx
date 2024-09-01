import React from 'react';
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-w-fit">
      <img src="/intro/2.svg" alt="intro1"
           className={'size-80'}
      />
      <div className="px-5">
        <OnBoarding2 />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-2 space-y-2">
        <Link
          href='/intro/feature3'
          className={'btn btn-block btn-primary '}
        >Next</Link>
        <Link
          href='/intro/welcome'
          className={'btn btn-block btn-outline  '}
        >Back</Link>
      </div>
    </div>
  )
}

export function OnBoarding2() {
  return (
    <div className="text-left space-y-2">
      <h1 className={'text-3xl font-bold '}>What You Can Do Here:</h1>
      <ul className="list-disc list-inside space-y-5 pt-5 ">
        <li className={'  font-light'}>Create an Account: Sign up to unlock all our features and start your
          journey with us.
        </li>
        <li className={'  font-light'}>Explore: Dive into our [products/services/community], and discover what
          we have to offer.
        </li>
        <li className={'  font-light'}>Connect: Join our vibrant community, share your ideas, and collaborate
          with others.
        </li>
      </ul>
    </div>

  );
}
