'use client';
import { useFormState } from 'react-dom'
import { changePassword, createOTP, TAction } from '@/app/(pages)/(auths)/forgot/action';
import Horizon from '@/components/elements/Horizon';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const initialState: TAction = {
  message: '',
  success: false,
  data   : {}
}

function ForgetForm() {
  const [ stateOTP, formActionOTP ]   = useFormState<TAction | undefined, any>( createOTP, initialState )
  const [ statePass, formActionPass ] = useFormState<TAction | undefined, any>( changePassword, initialState )
  // const route                         = useRouter()
  if( statePass?.success ) {
    redirect( '/login' )

  }
  // console.log( timeOtp( 5 ))

  console.log( stateOTP, statePass )
  return <section className={ 'card bg-white static shadows sm:w-[70%] w-[100%]' }
                  data-theme={ 'light' }>
    <div className={ 'card-body  items-center text-center' }>

      <h1 className={ 'card-title' }>Forgot Password</h1>
      <p>Kamu akan mendapatkan nomor otp di email anda</p>

      <Horizon text={ 'Enter Email' }/>

      <form action={ formActionOTP }>
        <input type="email" required
               className={ 'input input-bordered' }
               placeholder={ 'Silahkan Masukkan Email ' }
               name={ 'email' }/>

        <button className='btn btn-primary'>
          Send
        </button>
      </form>

      <p className={ 'text-red-600' }>
        { stateOTP?.success && `Error ${ stateOTP?.message }` }
      </p>


      { stateOTP?.success &&
        <p>Check Your Otp in your Email
          <br/>
          <span className={ 'font-bold' }>
            Name : { stateOTP?.data.name }
          </span>
          <br/>
          <span className={ 'font-bold' }>
            Email : { stateOTP?.data.email }
          </span>
        </p> }


      {/*<Horizon text={ 'Enter OTP' }/>*/ }
      {/*<form action={ formActionPass }>*/ }
      {/*  <input type="number" required*/ }
      {/*         className={ 'input input-bordered w-fit' }*/ }
      {/*         placeholder={ 'Silahkan Masukkan OTP ' }*/ }
      {/*         name={ 'otp' }/>*/ }

      {/*  <button className='btn btn-primary'>*/ }
      {/*    Enter OTP*/ }
      {/*  </button>*/ }
      {/*</form>*/ }
      { stateOTP?.success && <>

        <Horizon text={ 'Change Password' }/>
        <form action={ formActionPass } className={ 'flex flex-col space-y-2 w-full' }>
          <input type="email" hidden
                 defaultValue={ stateOTP?.data?.email }
                 name={ 'email' }/>

          <input type="text"
                 className={ 'input input-bordered w-full' }
                 placeholder={ 'Silahkan Masukkan OTP ' }
                 name={ 'otp' }
            // minLength={6}
            // maxLength={6}
            //   minLength={6}
            //   maxLength={1}
                 minLength={ 5 }
          />

          <input type="password" required
                 className={ 'input input-bordered w-full' }
                 placeholder={ 'Silahkan Masukkan Password Baru' }
                 name={ 'password' }
                 minLength={ 8 }/>

          <input type="password" required
                 className={ 'input input-bordered w-full' }
                 placeholder={ 'Silahkan Masukkan Confirm Password ' }
                 name={ 'confirm-password' }
                 minLength={ 8 }
          />
          <button className='btn btn-primary'>
            Enter OTP
          </button>


        </form>
        <p className={ 'text-red-600' }>
          { statePass?.success && `Error ${ statePass?.message }` }
        </p>
        <p className={ 'text-red-600' }>
          { statePass?.success && `Error ${ statePass?.message }` }
        </p>
      </> }
      <Link className={ 'btn btn-neutral w-full' } href='/login'>back to Login</Link>
    </div>
  </section>
}

export default ForgetForm;