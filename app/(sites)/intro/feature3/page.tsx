import React from 'react';
import Link from "next/link";
import { OnBoarding3 } from "@/app/(sites)/intro/feature3/onBoarding3";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-w-fit">
      <img src="/intro/3.svg" alt="intro3"
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
