import React from 'react';
import Link from "next/link";

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

function OnBoarding1() {
  return (
    <div className="text-center space-y-2">
      <h1 className={'text-3xl font-bold'}>Welcome to [My Website]!</h1>
      <p className={' font-light px-'}>We`re excited to have you here. [Your Website Name] is your go-to platform
        for [briefly describe your website`s purpose, e.g., connecting with like-minded individuals, exploring
        innovative solutions, etc.</p>
    </div>

  );
}
