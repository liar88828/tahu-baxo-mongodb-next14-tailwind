'use client'
import React, { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react';
import Link from "next/link";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { userSchema } from "@/server/schema/user.schema";
import { otpError } from "@/interface/model/auth.type";

export default function Page() {
  const route = useRouter()
  const [error, setError] = useState<otpError['fieldErrors']>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleOtpSubmit = (otp : string) => {
    setLoading(true)
    try {
      const data = userSchema.otpSchema.parse({otp})
      setError({...error, otp : ['']})
      console.log('Submitted OTP:', data);
      route.push('/auth/done')
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.flatten().fieldErrors)
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      data-testid="otp-Page"
      
      className="p-5 space-y-5">
      <div className="text-center">
        <h1 className={'text-3xl font-bold'}>Enter Your OTP</h1>
        <p className={'text-lg font-light'}>We`ve sent a One-Time Password (OTP) to your registered email/phone number.
          Please enter it below to proceed.</p>
      </div>

      <div className=" space-y-5">
        {/*<h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>*/}
        <OtpForm
          loading={loading}
          length={6} onSubmit={handleOtpSubmit}
        />
        {error?.otp &&
          <p className={'text-error text-xs'}>
            {error?.otp}
          </p>
        }
      </div>

      <div className="space-y-1 pt-1">
        <p>Remembered your password? <Link
          href={'/auth/login'}
          className={' text-primary cursor-pointer  underline '}
        >Sign in here.
        </Link>

        </p>
        <p>Need help? <Link
          href={'/auth/login'}
          className={' text-primary cursor-pointer underline '}
        >Sign in here.</Link></p>
      </div>
    </div>
  );
}

interface OtpFormProps {
  length? : number;
  loading : boolean;
  onSubmit : (otp : string) => void;
}

const OtpForm : React.FC<OtpFormProps> = ({length = 6, onSubmit, loading}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e : ChangeEvent<HTMLInputElement>, index : number) => {
    const {value} = e.target;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (e : KeyboardEvent<HTMLInputElement>, index : number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(otp.join(''));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        {otp.map((_, index) => (
          <input
            key={index}
            type="number"
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            //@ts-expect-error
            ref={(el : HTMLInputElement | null) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <button
        className={'btn btn-block btn-primary'}
        type="submit"
        disabled={loading}
      >
        Submit OTP
      </button>
    </form>
  );
};
