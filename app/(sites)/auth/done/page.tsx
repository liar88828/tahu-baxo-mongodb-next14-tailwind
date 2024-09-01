import React from 'react';
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-5 space-y-8 ">
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

export function DoneAll() {
  return (
    <div className="text-left border rounded-lg p-5">
      <h1 className={'text-3xl font-bold'}>All Done !</h1>
      <p className={'text-lg font-light'}>We`ll send you reset instructors.</p>
      <Link
        href={'/home'}
        className={'btn btn-block btn-secondary'}
      >Done</Link>
    </div>
  );
}

export function AddMorePhone() {
  return (

    <div className="text-left border rounded-lg p-5 space-y-5">
      <div className="space-y-2">
        <h1 className={'text-3xl font-bold'}>Add/Verify Phone Number</h1>
        <p className={'text-lg font-light'}>Keep your account secure with SMS-based verification.</p>
      </div>
      <div className="space-y-5">
        <div>
          <label htmlFor="email">Phone Number</label>
          <input
            name={'phone'}
            type="tel"
            id={'phone'}
            className={'input input-bordered w-full'}
            placeholder="Enter Your Phone ..."
          />
        </div>
        <div className="space-y-2">
          <button className={'btn btn-block btn-primary'}>Send Verification Code</button>
          <p className={'text-sm'}>We will send a verification code to this number. Standard SMS charges may apply.</p>
        </div>
      </div>
    </div>
  );
}

export function SetEmail() {
  return (
    <div className="text-left border rounded-lg p-5 space-y-5">
      <div className="space-y-2">
        <h1 className={'text-3xl font-bold'}>Set Backup Email</h1>
        <p className={'text-lg font-light'}>Add a backup email to recover your account easily if you lose access to your
          primary email.</p>
      </div>
      <div className="space-y-5">
        <div>
          <label htmlFor="email">Backup Email Address</label>
          <input
            name={'email'}
            type="email"
            id={'email'}
            className={'input input-bordered w-full'}
            placeholder="Enter Your Email ..."
          />
        </div>
        <div className="space-y-2">
          <button className={'btn btn-block btn-primary'}>Verify Backup Email</button>
          <p className={'text-sm'}>A verification link will be sent to this email. Please check your inbox.</p>
        </ div>
      </div>
    </div>
  )

}

export function SetUpFace() {
  return (
    <div className="text-left border rounded-lg p-5 space-y-5">
      <div className="space-y-2">
        <h1 className={'text-3xl font-bold'}>Set Up Face ID</h1>
        <p className={'text-lg font-light'}>Unlock your account quickly and securely using Face ID.</p>
      </div>
      <div className="space-y-2">
        <button className={'btn btn-block btn-primary'}>Set Up Face ID</button>
        <p className={'text-sm'}>Make sure your device supports Face ID and follow the on-screen instructions.</p>
      </ div>
    </div>
  )
    ;
}
