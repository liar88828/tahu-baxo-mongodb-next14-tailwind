import React from 'react';
import Link from "next/link";
import { OnBoarding2 } from "@/app/(sites)/intro/feature2/onBoarding2";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-w-fit">
      <img src="/intro/2.svg" alt="intro2"
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
