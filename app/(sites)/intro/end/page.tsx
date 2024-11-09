import React from 'react';
import { OnBoarding4 } from "@/app/(sites)/intro/end/onBoarding4";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-w-fit">
      <img src="/intro/4.svg" alt="intro4"
           className={'size-80'}
      />
      <div className="px-5">
        <OnBoarding4 />
      </div>
    </div>
  )
}
