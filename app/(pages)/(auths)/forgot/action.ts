'use server'
import z from 'zod';
import prisma, { PrismaError } from '@/lib/db/prisma';
import { hash } from 'bcrypt';
import { sendMail } from '@/lib/nodemail/config';
import { changePasswordSchema, schema } from '@/lib/validator/zod';
import { compareTime, timeOtp } from '@/lib/utils/formatDate';

export type TAction = { success: boolean, message: any, data?: any }

export async function createOTP
(
  prevState: any,
  formData: FormData
): Promise<TAction | undefined> {
  try {
    const validatedFields = schema.safeParse( {
      email: formData.get( 'email' ),
    } )

    if( !validatedFields.success ) {
      const errorEmail = validatedFields.error.flatten().fieldErrors.email?.pop()
      return {
        success: false,
        message: errorEmail ?? 'Invalid Email',
        // data: {}
      }
    }

    // console.log(validatedFields)
    const otpExist = await prisma.user.findUnique( {
      where : { email: validatedFields.data.email },
      select: {
        email     : true,
        otp       : true,
        name      : true,
        expiresOtp: true
      }
    } )

    if( otpExist === null ) {
      return {
        success: false,
        message: 'The Email is not found',
        data   : {}

      }
    }

    if( otpExist.expiresOtp !== null &&
      otpExist.otp !== null ) {
      // console.log('date')
      const dateValid = compareTime( otpExist.expiresOtp )
      console.log( dateValid )
      if( dateValid ) {
        return {
          message: 'The Otp is exist on Email',
          success: true,
          data   : { email: otpExist.email, name: otpExist.name },
        }
      }
    }

    console.log( 'test' )
    const otp    = Math.random() * 1000000
    const fixOtp = otp.toFixed( 0 )
    console.log( 'set otp' )

    const userEmail = await prisma.user.update( {
      data : {
        otp       : Number( fixOtp ),
        expiresOtp: timeOtp( 5 )
      },
      where: {
        email: validatedFields.data.email
      },

      select: {
        email: true,
        name : true,
        otp  : true
      },
    } )
    console.log( userEmail )

    console.log( 'get data' )
    if( !userEmail || !userEmail.otp || !userEmail.email || !userEmail.name ) {
      return {
        success: false,
        message: 'Email is not found',
        // data: {}

      }
    }
    await sendMail( {
      to     : userEmail.email,
      name   : userEmail.name,
      subject: 'OTP Verification for Reset Password',
      // body: compileWelcomeTemplate('Brian', 'youtube.com'),
      body: `<h1  >Is Your OPT number ${ userEmail.otp } </h1>`,
    } )

    return {
      success: true,
      data   : { email: userEmail.email, name: userEmail.name },
      message: 'OTP has been sent to your email'
    }
  }
  catch ( e ) {
    if( e instanceof z.ZodError ) {
      return {
        success: false,
        message: e.flatten().fieldErrors,
        // data: {}

      }
    }
    if( e instanceof PrismaError ) {
      // if( e.code === 'P2002' ) {
      return {
        success: false,
        message: 'Email is not found',
        // data: {}

      }
      // }
    }
  }
}

export async function changePassword
(
  prevState: any,
  formData: FormData
): Promise<TAction | undefined> {

  try {

    const validatedFields = changePasswordSchema.safeParse( {
      email   : formData.get( 'email' ),
      otp     : Number( formData.get( 'otp' ) ),
      password: formData.get( 'password' ),
      confPass: formData.get( 'confirm-password' ),
    } )

    if( !validatedFields.success ) {
      const errorConfPass = validatedFields.error.flatten().formErrors.pop()
      const errorEmail    = validatedFields.error.flatten().fieldErrors.email?.pop()
      return {

        success: false,
        message: errorEmail ?? errorConfPass ?? 'Invalid Email',
      }
    }
    else if( validatedFields.success ) {
      console.log( validatedFields )

      const userOtp: any = await prisma.user.findUnique( {
        where : {
          email: validatedFields.data.email,
          otp  : validatedFields.data.otp
        },
        select: {
          otp: true
        },

      } )

      console.log( userOtp )
      if( userOtp === null ) {
        return {
          success: false,
          message: 'Invalid OTP or Email or Not Exist',
        }
      }

      if( validatedFields.data.otp !== userOtp.otp ) {
        return {
          success: false,
          message: 'Invalid OTP',
        }
      }
    }
    const userOtp: any = await prisma.user.update( {
      where : {
        email: validatedFields.data.email,
        otp  : validatedFields.data.otp
      },
      select: {
        otp: true
      },
      data  : {
        password  : await hash( validatedFields.data.password, 12 ),
        otp       : null,
        expiresOtp: null
      }
    } )

    return {
      success: true,
      message: 'Success Change Password',
    }
  }
  catch ( e ) {
    if( e instanceof z.ZodError ) {
      return {
        success: false,
        message: e.flatten().fieldErrors,
      }
    }
    if( e instanceof PrismaError ) {
      // if( e.code === 'P2002' ) {
      return {
        success: false,
        message: 'Email is not found'
      }
      // }
    }
  }
}