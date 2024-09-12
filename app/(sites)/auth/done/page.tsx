import React from 'react';
import { DoneAll } from "@/app/(sites)/auth/done/doneAll";
import { AddMorePhone } from "@/app/(sites)/auth/done/addMorePhone";
import { SetEmail } from "@/app/(sites)/auth/done/setEmail";
import { SetUpFace } from "@/app/(sites)/auth/done/setUpFace";

export default function Page() {
  return (
    <div
      data-testid="done-Page"
      className="p-5 space-y-8 ">
      <DoneAll />
      <AddMorePhone />
      <SetEmail />
      <SetUpFace />
      {/**/}
      {/*<div className=" space-y-5">*/}
      {/*  <button className={'btn btn-block btn-outline'}>Reset Password</button>*/}
      {/*</div>*/}

    </div>
  );
}

