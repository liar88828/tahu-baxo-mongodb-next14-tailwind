import React from 'react';
import Link from "next/link";
import { OnBoarding1 } from "@/app/(sites)/intro/welcome/onBoarding1";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-w-fit">
      <img src="/intro/1.svg" alt="intro1"
           className={'size-80'}
      />
      <div className="px-5">
        <OnBoarding1 />
        <Link
          href='/intro/feature2'
          className={'btn btn-block btn-primary mt-20'}
        >Next</Link>

      </div>
    </div>
  )
}
