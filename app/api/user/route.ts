import { NextResponse } from "next/server";
import prisma from '@/lib/db/prisma';
import { hash } from 'bcrypt';

export async function POST ( req: Request )
{
  try
  {
    const { name, email, password } = ( await req.json() ) as {
      name: string;
      email: string;
      password: string;
    };

    if ( !email.includes( '@gmail.com' ) )
    {
      return new NextResponse(
        JSON.stringify( {
          success: false,
          message: 'you must be used Gmail',
        } ),
        { status: 400 }
      );
    }

    const hashed_password = await hash( password, 12 );

    const user = await prisma.user.create( {
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        role: 'Unverified',
      },
    } );

    return NextResponse.json( {
      user: {
        name: user.name,
        email: user.email,
      },
    } );
  } catch ( error: any )
  {
    return new NextResponse(
      JSON.stringify( {
        status: "error",
        message: error.message,
      } ),
      { status: 500 }
    );
  }
}

// forgot password

// login
