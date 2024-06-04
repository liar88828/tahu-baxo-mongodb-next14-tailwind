"use client";

import {signIn, useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, useState} from "react";
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const {data} = useSession()
  // console.log(data)
  if (data !== null) {
    router.replace('/')
  }


  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({email: "", password: ""});

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
          className={`${input_style}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className={`${input_style}`}
        />
      </div>
      <div className={'space-y-2'}>

        <button
          type="submit"
          // style={ { backgroundColor: `${ loading ? "#ccc" : "#3446eb" }` } }
          disabled={loading}
          className={` btn btn-primary w-full ${loading ? "btn-disabled" : " btn-primary"}`}
        >
          {loading ? "loading..." : "Login"}
        </button>

        <Link href='/register' className={'btn btn-secondary w-full text-white'}>
          Register
        </Link>
        <Link href='/forgot' className={'btn btn-error w-full text-white'}>
          Forget Password
        </Link>
      </div>

      {/*<Horizon text={'OR'}/>*/}
      {/*<div className={'space-y-2'}>*/}
      {/*  <a*/}
      {/*    className="btn btn-primary w-full"*/}

      {/*    onClick={() => signIn("google", {callbackUrl})}*/}
      {/*    role="button"*/}
      {/*  >*/}
      {/*    <Icon icon={'devicon:google'}/>*/}
      {/*    Continue with Google*/}
      {/*  </a>*/}
      {/*  <a*/}
      {/*    className="btn btn-warning w-full text-white"*/}
      {/*    onClick={() => signIn("github", {callbackUrl})}*/}
      {/*    role="button"*/}
      {/*  >*/}
      {/*    <Icon icon={'mdi:github'}/>*/}
      {/*    Continue with GitHub*/}
      {/*  </a>*/}
      {/*</div>*/}
    </form>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const {status, data} = useSession()
  console.log(data)
  if (status === 'authenticated' ||
    data !== undefined) {
    router.replace('/')
  }
  return (
    <>
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
          <LoginForm/>
        </div>
      </div>
    </>
  );
}
