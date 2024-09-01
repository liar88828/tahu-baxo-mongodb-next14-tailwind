import React from 'react';
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-w-fit">
      <img src="/intro/3.svg" alt="intro1"
           className={'size-80'}
      />
      <div className="px-5">
        <OnBoarding3 />

        <div className="fixed bottom-0 left-0 right-0 p-2 space-y-2">
          <Link
            href='/intro/end'
            className={'btn btn-block btn-primary '}
          >Next</Link>
          <Link
            href='/intro/feature2'
            className={'btn btn-block btn-outline  '}
          >Back</Link>
        </div>
      </div>
    </div>
  )
}

export function OnBoarding3() {
  return (
    <div className="text-left space-y-2">
      <h1 className={'text-3xl font-bold'}>Why Choose Us?</h1>
      <ul className="list-disc list-inside space-y-5 pt-5 ">
        <li className={'  font-light'}>User-Friendly: Our platform is designed with you in mind. It`s easy to
          use and navigate.
        </li>
        <li className={'  font-light'}>Secure: Your privacy and security are our top priorities. We use the
          latest technologies to keep your data safe.
        </li>
        <li className={'  font-light'}>Supportive Community: Whether you`re here to learn, share, or grow, our
          community is always ready to
          help.
        </li>
      </ul>
    </div>

  );
}
